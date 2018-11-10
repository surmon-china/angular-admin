/**
 * @file 评论列表页面组件
 * @module app/page/comment/component/list
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import { ModalDirective } from 'ngx-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import * as API_PATH from '@app/constants/api';
import { SaHttpRequesterService } from '@app/services';
import { IGetParams } from '@app/pages/pages.constants';
import { browserParse, osParse } from '@app/pages/comment/comment.ua.service';
import { handleBatchSelectChange, handleItemSelectChange } from '@/app/pages/pages.service';
import { TApiPath, TSelectedIds, TSelectedAll, IResponseData, IFetching } from '@app/pages/pages.constants';
import { IComment, TCommentId, TCommentPostId, ESortType, ECommentState, ECommentPostType } from '@app/pages/comment/comment.constants';

const DEFAULT_GET_PARAMS = {
  sort: ESortType.desc,
  state: ECommentState.all
};

@Component({
  selector: 'page-comment-list',
  encapsulation: ViewEncapsulation.None,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})
export class CommentListComponent implements OnInit {

  SortType = ESortType;
  CommentState = ECommentState;

  @ViewChild('delModal') public delModal: ModalDirective;

  private _apiPath: TApiPath = API_PATH.COMMENT;

  // 搜索参数
  public osParse = osParse;
  public browserParse = browserParse;

  public searchForm: FormGroup;
  public keyword: AbstractControl;
  public getParams: IGetParams = lodash.cloneDeep(DEFAULT_GET_PARAMS);

  // 初始化数据
  public post_id: TCommentPostId = null;
  public comments: IResponseData<IComment> = {
    data: [],
    pagination: null
  };
  public fetching: IFetching = {
    get: false,
    put: false
  };

  // 其他数据
  public todoDelCommentId: TCommentId = null;
  public commentsSelectAll: TSelectedAll = false;
  public selectedComments: TSelectedIds = [];
  public selectedPostIds: TCommentPostId[] = [];

  constructor(private _fb: FormBuilder,
              private _route: ActivatedRoute,
              private _httpService: SaHttpRequesterService) {

    this.searchForm = this._fb.group({
      keyword: ['', Validators.compose([Validators.required])]
    });
    this.keyword = this.searchForm.controls.keyword;
  }

  // 初始化
  ngOnInit() {
    // 如果是修改，则请求文章数据
    this._route.params.subscribe(({ post_id }) => {
      this.post_id = post_id;
      this.getComments();
    });
  }

  // 当前数据数量
  get currentListTotal(): number {
    const pagination = this.comments.pagination;
    return pagination && pagination.total || 0;
  }

  // 判断是留言板
  public isGuestbook(postId: TCommentPostId): boolean {
    return Number(postId) === Number(ECommentPostType.guestbook);
  }

  // 判断公告类型
  public isState(state: ECommentState): boolean {
    return this.getParams.state === state;
  }

  // 评论列表多选切换
  public batchSelectChange(isSelect: boolean): void {
    const data = this.comments.data;
    const selectedIds = this.selectedComments;
    this.selectedComments = handleBatchSelectChange({ data, selectedIds, isSelect });
    this.selectedPostIds = isSelect ? data.map(comment => comment.post_id) : [];
  }

  // 评论列表单个切换
  public itemSelectChange(): void {
    const data = this.comments.data;
    const selectedIds = this.selectedComments;
    const result = handleItemSelectChange({ data, selectedIds });
    this.commentsSelectAll = result.all;
    this.selectedComments = result.selectedIds;
    this.selectedPostIds = data.filter(comment => comment.selected).map(comment => comment.post_id);
  }

  // 弹窗
  public delCommentModal(comment?: TCommentId) {
    this.todoDelCommentId = comment ? comment : null;
    this.delModal.show();
  }

  // 弹窗取消
  public cancelCommentModal() {
    this.delModal.hide();
    this.todoDelCommentId = null;
  }

  // 切换评论类型
  public switchState(state: ECommentState): void {
    if (state === undefined || state === this.getParams.state) {
      return;
    }
    this.getParams.state = state;
    this.getComments();
  }

  // 提交搜索
  public searchComments(): void {
    if (this.searchForm.valid) {
      this.getComments();
    }
  }

  // 清空搜索条件
  public resetGetParams(): void {
    this.searchForm.reset({ keyword: '' });
    this.getParams.sort = ESortType.desc;
  }

  // 刷新评论列表
  public refreshComments(): void {
    this.getComments({ page: this.comments.pagination.current_page });
  }

  // 分页获取标签
  public pageChanged(event: any): void {
    this.getComments({ page: event.page });
  }

  // 获取评论列表
  public getComments(params: IGetParams = {}): void {

    // 如果没有搜索词，则清空搜索框
    if (this.keyword.value) {
      params.keyword = this.keyword.value;
    }

    // 如果请求的是全部数据，则优化参数
    Object.keys(this.getParams).forEach(key => {
      if (this.getParams[key] !== 'all') {
        params[key] = this.getParams[key];
      }
    });

    // 请求的是否为某post页面的列表
    if (this.post_id) {
      params.post_id = this.post_id;
    }

    this.fetching.get = true;

    // 请求评论
    this._httpService.get(this._apiPath, params)
      .then(comments => {
        this.comments = comments.result;
        this.commentsSelectAll = false;
        this.selectedComments = [];
        this.selectedPostIds = [];
        this.fetching.get = false;
      })
      .catch(_ => {
        this.fetching.get = false;
      });
  }

  // 更新评论状态
  public updateCommentsState(state: ECommentState, comment: IComment) {
    const comments = comment ? [comment._id] : this.selectedComments;
    const post_ids = (comment ? [comment.post_id] : lodash.uniq(this.selectedPostIds)).filter(id => id);
    this.fetching.put = true;
    this._httpService.patch(this._apiPath, { comments, post_ids, state })
    .then(_ => {
      this.refreshComments();
      this.fetching.put = false;
    })
    .catch(_ => {
      this.fetching.put = false;
    });
  }

  // 彻底删除评论
  public delComments() {
    const delSingleComment = this.todoDelCommentId;
    const todoDelComment = this.comments.data.find(c => delSingleComment === c._id);
    const comments = this.todoDelCommentId ? [this.todoDelCommentId] : this.selectedComments;
    const post_ids = (delSingleComment && todoDelComment ? [todoDelComment.post_id] : lodash.uniq(this.selectedPostIds)).filter(id => id);
    this._httpService.delete(this._apiPath, { comments, post_ids })
    .then(_ => {
      this.todoDelCommentId = null;
      this.delModal.hide();
      this.refreshComments();
    })
    .catch(_ => {
      this.delModal.hide();
    });
  }
}
