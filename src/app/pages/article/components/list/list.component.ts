import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';

import { ArticleListService } from './list.service';
import { ArticleTagService } from '../tag/tag.service';
import { ArticleCategoryService } from '../category/category.service';

@Component({
  selector: 'article-list',
  template: require('./list.html'),
  styles: [require('./list.scss')]
})
export class ArticleList {

  @ViewChild('delModal') delModal: ModalDirective;

  public tags = { data: [] };
  public articles = { data: [] };
  public categories = { data: [] };
  public articlesSelectAll: boolean = false;
  public selectedArticles = [];
  public getParams = {};

  constructor(private _articleTagService:ArticleTagService,
              private _articleListService:ArticleListService,
              private _articleCategoryService:ArticleCategoryService,
              private _notificationsService: NotificationsService) {}

  ngOnInit() {
    // this._getTags();
    this._getArticles();
    this._getCategories();
  }

  // 文章列表多选切换
  public batchSelectChange(is_select): void {
    if(!this.articles.data.length) return;
    this.selectedCategories = [];
    this.articles.data.forEach(item => { item.selected = is_select; is_select && this.selectedCategories.push(item._id) });
  }

  // 文章列表单个切换
  public itemSelectChange(): void {
    this.selectedCategories = [];
    const articles = this.articles.data;
    articles.forEach(item => { item.selected && this.selectedCategories.push(item._id) });
    if(!this.selectedCategories.length) this.articlesSelectAll = false;
    if(!!this.selectedCategories.length && this.selectedCategories.length == articles.length) this.categoriesSelectAll = true;
  }

  // 分类级别标记
  public categoryLevelMark(level): void { return Array.from({ length: level }, () => '') };

  // 分类级别递归排序
  private _categoryLevelBuild(): void {

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
    this.categories.data = levelBuildRun(categories.filter(c => !toDoDeletes.includes(c)));
  };

  // 获取文章列表
  private _getArticles(): void {
    this._articleListService
    .getArticles()
    .then(articles => {
      this.articles = articles.result;
    })
    .catch(error => {
      // console.log(error);
    });
  }

  // 获取标签列表
  private _getTags(): void {
    this._articleTagService
    .getTags()
    .then(tags => {
      this.tags = tags.result;
    });
  }

  // 获取分类列表
  private _getCategories(): void {
    this._articleCategoryService
    .getCategories()
    .then(categories => {
       this.categories = categories.result;
       this._categoryLevelBuild();
    });
  }
}
