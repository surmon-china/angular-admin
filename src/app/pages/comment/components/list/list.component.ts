import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ModalDirective } from 'ng2-bootstrap';
import { CommentService } from '../../comment.service';
import { UAParse, OSParse } from '../../comment.ua';

@Component({
  selector: 'comment-list',
  encapsulation: ViewEncapsulation.None,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})
export class CommentList {

  @ViewChild('delModal') delModal: ModalDirective;

  // 搜索参数
  public UAParse = UAParse;
  public OSParse = OSParse;
  public searchForm:FormGroup;
  public keyword:AbstractControl;
  public getParams:any = {
    sort: '-1',
    state: 'all'
  };

  // 初始化数据
  public tags = { data: [] };
  public categories = { data: [] };
  public comments = { 
    data: [],
    pagination: {
      current_page: 1,
      total_page: 0,
      per_page: 50,
      total: 0
    }
  };

  // 其他数据
  public del_comments:any;
  public commentsSelectAll:boolean = false;
  public selectedComments = [];

  constructor(private _fb:FormBuilder,
              private _commentService:CommentService) {

    this.searchForm = _fb.group({
      'keyword': ['', Validators.compose([Validators.required])]
    });

    this.keyword = this.searchForm.controls['keyword'];
  }

  // 初始化
  ngOnInit() {
    this.getComments();
  }

  // 评论列表多选切换
  public batchSelectChange(is_select): void {
    if(!this.comments.data.length) return;
    this.selectedComments = [];
    this.comments.data.forEach(item => { 
      item.selected = is_select;
      is_select && this.selectedComments.push(item._id);
    });
  }

  // 评论列表单个切换
  public itemSelectChange(): void {
    this.selectedComments = [];
    const comments = this.comments.data;
    comments.forEach(item => { 
      item.selected && this.selectedComments.push(item._id);
    });
    if(!this.selectedComments.length) {
      this.commentsSelectAll = false;
    }
    if(!!this.selectedComments.length && this.selectedComments.length == comments.length) {
      this.commentsSelectAll = true;
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

  // 切换评论类型
  public switchState(state:any):void {
    if(state == undefined || Object.is(state, this.getParams.state)) return;
    this.getParams.state = state;
    this.getComments();
  }

  // 提交搜索
  public searchComments(values: Object): void {
    if (this.searchForm.valid) {
      this.getComments();
    }
  }

  // 清空搜索条件
  public resetGetParams(): void {
    this.searchForm.reset({ keyword: '' });
    this.getParams.sort = '-1';
  }

  // 刷新评论列表
  public refreshComments(): void {
    this.getComments({ page: this.comments.pagination.current_page });
  }

  // 分页获取标签
  public pageChanged(event: any):void {
    this.getComments({ page: event.page });
  }

  // 获取评论列表
  public getComments(params: any = {}): void {
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
      this.comments.pagination.current_page = 1;
    }
    // 请求评论
    this._commentService.getComments(params)
    .then(comments => {
      this.comments = comments.result;
      this.commentsSelectAll = false;
      this.selectedComments = [];
    })
    .catch(error => {});
  }

  // 更新评论状态
  public updateCommentState(comments: any, state: number) {
    this._commentService.updateCommentState(comments, state)
    .then(do_result => {
      this.getComments({ page: this.comments.pagination.current_page });
    })
    .catch(error => {});
  }

  // 彻底删除评论
  public delComments() {
    const comments = this.del_comments || this.selectedComments;
    this._commentService.delComments(comments)
    .then(do_result => {
      this.delModal.hide();
      this.del_comments = null;
      this.getComments({ page: this.comments.pagination.current_page });
    })
    .catch(error => {
      this.delModal.hide();
    });
  }

  // 弹窗
  public delCommentModal(comment) {
    this.del_comments = comment;
    this.delModal.show();
  }

  // 弹窗取消
  public cancelCommentModal() {
    this.delModal.hide();
    this.del_comments = null;
  }
}
