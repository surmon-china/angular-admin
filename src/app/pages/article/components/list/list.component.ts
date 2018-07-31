import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap';
import { ApiService } from '@app/api.service';

@Component({
  selector: 'article-list',
  encapsulation: ViewEncapsulation.None,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})
export class ArticleList {

  @ViewChild('delModal') delModal: ModalDirective;

  // _apiUrl
  private _tagUrl = '/tag';
  private _articleUrl = '/article';
  private _categoryUrl = '/category';

  // 搜索参数
  public searchForm:FormGroup;
  public keyword:AbstractControl;
  public getParams:any = {
    tag: 'all',
    state: 'all',
    public: 'all',
    category: 'all',
    origin: 'all'
  };

  // 初始化数据
  public tags = { data: [] };
  public categories = { data: [] };
  public articles = { 
    data: [],
    pagination: {
      current_page: 1,
      total_page: 0,
      per_page: 10,
      total: 0
    }
  };

   public fetching = {
     article: false
   };

  // 其他数据
  public del_articles:any;
  public articlesSelectAll:boolean = false;
  public selectedArticles = [];

  constructor(private _fb:FormBuilder,
              private _apiService:ApiService) {

    this.searchForm = _fb.group({
      'keyword': ['', Validators.compose([Validators.required])]
    });

    this.keyword = this.searchForm.controls['keyword'];
  }

  // 初始化
  ngOnInit() {
    this.getTags();
    this.getArticles();
    this.getCategories();
  }

  // 文章列表多选切换
  public batchSelectChange(is_select): void {
    if(!this.articles.data.length) return;
    this.selectedArticles = [];
    this.articles.data.forEach(item => { 
      item.selected = is_select;
      is_select && this.selectedArticles.push(item._id);
    });
  }

  // 文章列表单个切换
  public itemSelectChange(): void {
    this.selectedArticles = [];
    const articles = this.articles.data;
    articles.forEach(item => { 
      item.selected && this.selectedArticles.push(item._id);
    });
    if(!this.selectedArticles.length) {
      this.articlesSelectAll = false;
    }
    if(!!this.selectedArticles.length && this.selectedArticles.length == articles.length) {
      this.articlesSelectAll = true;
    }
  }

  // 分类级别标记
  public categoryLevelMark(level):any { 
    return Array.from({ length: level }, () => '')
  };

  // 分类级别递归排序
  public categoryLevelBuild(): void {

    // 初始化数据
    let categories = Array.from(this.categories.data);
    let toDoDeletes = [];

    // 级别数据构造
    categories.forEach(cate => {
      // 找到问题数据并添加标记
      cate.unrepaired = (!!cate.pid && !categories.find(c => Object.is(cate.pid, c._id)))
      categories.forEach(c => {
        if(Object.is(cate.pid, c._id)) {
          c.children = c.children || [];
          c.children.push(cate);
          toDoDeletes.push(cate);
        }
      })
    });

    // 扁平数据构造（同时添加级别标示）
    const levelBuildRun = cates => {
      let newCategories = [];
      const levelBuildOptimize = (cates, level) => {
        cates.forEach(c => {
          c.level = level;
          newCategories.push(c);
          if(c.children && c.children.length) levelBuildOptimize(c.children, level + 1);
        })
      }
      levelBuildOptimize(cates, 0);
      return newCategories;
    }

    // 开始执行
    this.categories.data = levelBuildRun(categories.filter(c => toDoDeletes.indexOf(c) == -1));
  };

  // 切换文章类型
  public switchState(state:any):void {
    if(state == undefined || Object.is(state, this.getParams.state)) return;
    this.getParams.state = state;
    this.getArticles();
  }

  // 提交搜索
  public searchArticles(values: Object): void {
    if (this.searchForm.valid) {
      this.getArticles();
    }
  }

  // 清空搜索条件
  public resetGetParams(): void {
    this.searchForm.reset({ keyword: '' });
    this.getParams.tag = 'all';
    this.getParams.public = 'all';
    this.getParams.origin = 'all';
    this.getParams.category = 'all';
  }

  // 刷新文章列表
  public refreshArticles(): void {
    this.getArticles({ page: this.articles.pagination.current_page });
  }

  // 分页获取标签
  public pageChanged(event: any):void {
    this.getArticles({ page: event.page });
  }

  // 获取文章列表
  public getArticles(params: any = {}): void {
    // 如果没有搜索词，则清空搜索框
    if(this.keyword.value) {
      params.keyword = this.keyword.value;
    }
    // 如果请求的是全部数据，则优化参数
    Object.keys(this.getParams).forEach(key => {
      if(!Object.is(this.getParams[key], 'all')) {
        params[key] = this.getParams[key];
      }
    })
    // 如果请求的是第一页，则设置翻页组件的当前页为第一页
    if(!params.page || Object.is(params.page, 1)) {
      this.articles.pagination.current_page = 1;
    }
    this.fetching.article = true;
    // 请求文章
    this._apiService.get(this._articleUrl, params)
    .then(articles => {
      this.articles = articles.result;
      this.articlesSelectAll = false;
      this.selectedArticles = [];
      this.fetching.article = false;
    })
    .catch(error => {
      this.fetching.article = false;
    });
  }

  // 获取标签列表
  public getTags(): void {
    this._apiService.get(this._tagUrl)
    .then(tags => {
      this.tags = tags.result;
    })
    .catch(error => {});
  }

  // 获取分类列表
  public getCategories(): void {
    this._apiService.get(this._categoryUrl)
    .then(categories => {
       this.categories = categories.result;
       this.categoryLevelBuild();
    })
    .catch(error => {});
  }

  // 移至回收站
  public moveToRecycle(articles: any) {
    this._apiService.patch(this._articleUrl, { articles, action: 1 })
    .then(do_result => this.getArticles({ page: this.articles.pagination.current_page }))
    .catch(error => {});
  }

  // 恢复文章（移至草稿）
  public moveToDraft(articles: any) {
    this._apiService.patch(this._articleUrl, { articles, action: 2 })
    .then(do_result => this.getArticles({ page: this.articles.pagination.current_page }))
    .catch(error => {});
  }

  // 快速发布（移至已发布）
  public moveToPublished(articles: any) {
    this._apiService.patch(this._articleUrl, { articles, action: 3 })
    .then(do_result => this.getArticles({ page: this.articles.pagination.current_page }))
    .catch(error => {});
  }

  // 彻底删除文章
  public delArticles() {
    const articles = this.del_articles || this.selectedArticles;
    this._apiService.delete(this._articleUrl, { articles })
    .then(do_result => {
      this.delModal.hide();
      this.del_articles = null;
      this.getArticles({ page: this.articles.pagination.current_page });
    })
    .catch(error => {
      this.delModal.hide();
    });
  }

  // 弹窗
  public delArticleModal(article) {
    this.del_articles = article;
    this.delModal.show();
  }

  // 弹窗取消
  public cancelArticleModal() {
    this.delModal.hide();
    this.del_articles = null;
  }
}
