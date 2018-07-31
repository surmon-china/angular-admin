import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap';

import { ApiService } from '@app/api.service';
import { UAParse, OSParse } from '../../comment.ua';

@Component({
  selector: 'comment-list',
  encapsulation: ViewEncapsulation.None,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})
export class CommentList {

  @ViewChild('delModal') public delModal: ModalDirective;

  // _apiUrl
  private _apiUrl = '/comment';

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
  public post_id:any = null;
  public comments = { 
    data: [],
    pagination: {
      current_page: 1,
      total_page: 0,
      per_page: 50,
      total: 0
    }
  };

  public fetching = {
    comment: false
  };

  // 其他数据
  public del_comments:any;
  public commentsSelectAll:boolean = false;
  public selectedComments = [];
  public selectedPostIds = [];

  public unique(arr, newArr) {
    let num;
    if (-1 == arr.indexOf(num = arr.shift())) newArr.push(num);
    arr.length && this.unique(arr, newArr);
  }

  constructor(private _fb:FormBuilder,
              private _route: ActivatedRoute,
              private _apiService:ApiService) {

    this.searchForm = _fb.group({
      'keyword': ['', Validators.compose([Validators.required])]
    });

    this.keyword = this.searchForm.controls['keyword'];
  }

  // 初始化
  ngOnInit() {
    // 如果是修改，则请求文章数据
    this._route.params.subscribe(({ post_id }) => {
      this.post_id = post_id;
      this.getComments();
    });
  }

  // 评论列表多选切换
  public batchSelectChange(is_select): void {
    if(!this.comments.data.length) return;
    this.selectedComments = [];
    this.selectedPostIds = [];
    this.comments.data.forEach(item => { 
      item.selected = is_select;
      is_select && this.selectedComments.push(item._id);
      is_select && this.selectedPostIds.push(item.post_id);
    });
  }

  // 评论列表单个切换
  public itemSelectChange(): void {
    this.selectedComments = [];
    this.selectedPostIds = [];
    const comments = this.comments.data;
    comments.forEach(item => { 
      item.selected && this.selectedComments.push(item._id);
      item.selected && this.selectedPostIds.push(item.post_id);
    });
    if(!this.selectedComments.length) {
      this.commentsSelectAll = false;
    }
    if(!!this.selectedComments.length && this.selectedComments.length == comments.length) {
      this.commentsSelectAll = true;
    }
  }

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
    // 请求的是否为某post页面的列表
    if(this.post_id) {
      params.post_id = this.post_id;
    }
    this.fetching.comment = true;
    // 请求评论
    this._apiService.get(this._apiUrl, params)
    .then(comments => {
      this.comments = comments.result;
      this.commentsSelectAll = false;
      this.selectedComments = [];
      this.selectedPostIds = [];
      this.fetching.comment = false;
    })
    .catch(error => {
      this.fetching.comment = false;
    });
  }

  // 更新评论状态
  public updateCommentState(comments: any, post_ids: any, state: number) {
    let _post_ids = [];
    this.unique(post_ids, _post_ids);
    post_ids = _post_ids;
    this._apiService.patch(this._apiUrl, { comments, post_ids, state })
    .then(do_result => {
      this.getComments({ page: this.comments.pagination.current_page });
    })
    .catch(error => {});
  }

  // 彻底删除评论
  public delComments() {
    const comments = this.del_comments || this.selectedComments;
    let post_ids = [];
    let _post_ids = [];
    if(Object.is(comments.length, 1)) {
      let currentComment = this.comments.data.find(c => Object.is(comments[0], c._id));
      if(!!currentComment) {
        post_ids = [currentComment.post_id];
      }
    } else {
      post_ids = this.selectedPostIds;
    }
    this.unique(post_ids, _post_ids);
    post_ids = _post_ids;
    this._apiService.delete(this._apiUrl, { comments, post_ids })
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
