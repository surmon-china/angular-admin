/**
 * @file 评论详情页面组件
 * @module app/page/comment/componennt/detail
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import * as API_PATH from '@app/constants/api';
import { IArticle } from '@/app/pages/article/article.service';
import { TApiPath, IFetching } from '@app/pages/pages.constants';
import { SaHttpRequesterService, IRequestParams } from '@app/services';
import { browserParse, osParse } from '@app/pages/comment/comment.ua.service';
import { mergeFormControlsToInstance, formControlStateClass } from '@/app/pages/pages.service';
import { IComment, TCommentId, ECommentState, ECommentPostType, ECommentParentType } from '@app/pages/comment/comment.constants';

const DEFAULT_COMMENT: IComment = {
  pid: ECommentParentType.self,
  post_id: null,
  state: ECommentState.published,
  is_top: false,
  likes: 0,
  agent: '',
  content: '',
  author: {
    name: '',
    email: '',
    site: ''
  },
  extends: []
};

@Component({
  selector: 'page-comment-detail',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./detail.scss')],
  template: require('./detail.html')
})
export class CommentDetailComponent implements OnInit {

  CommentState = ECommentState;
  CommentPostType = ECommentPostType;
  controlStateClass = formControlStateClass;

  private _apiPath: TApiPath = API_PATH.COMMENT;

  public osParse = osParse;
  public browserParse = browserParse;

  // 评论内容
  public comment_id: TCommentId = null;
  public comments: IComment[] = null;
  public article: IArticle = null;
  public comment: IComment = lodash.cloneDeep(DEFAULT_COMMENT);
  public fetching: IFetching = {
    get: false,
    put: false,
    comments: false,
    article: false
  };

  // form
  public editForm: FormGroup;
  public pid: AbstractControl;
  public state: AbstractControl;
  public is_top: AbstractControl;
  public likes: AbstractControl;
  public content: AbstractControl;
  public user_name: AbstractControl;
  public user_email: AbstractControl;
  public user_site: AbstractControl;
  public extends: AbstractControl;

  constructor(private _fb: FormBuilder,
              private _route: ActivatedRoute,
              private _httpService: SaHttpRequesterService) {

    this.editForm = this._fb.group({
      pid: [DEFAULT_COMMENT.pid, Validators.compose([Validators.required])],
      state: [DEFAULT_COMMENT.state, Validators.compose([Validators.required])],
      is_top: [DEFAULT_COMMENT.is_top, Validators.compose([Validators.required])],
      likes: [DEFAULT_COMMENT.likes],
      content: [DEFAULT_COMMENT.content, Validators.compose([Validators.required])],
      user_name: [DEFAULT_COMMENT.author.name, Validators.compose([Validators.required])],
      user_email: [DEFAULT_COMMENT.author.email, Validators.compose([Validators.required])],
      user_site: [DEFAULT_COMMENT.author.site],
      extends: [DEFAULT_COMMENT.extends]
    });
    mergeFormControlsToInstance(this, this.editForm);
  }

  // 重置表单
  public updateEditForm(comment: IComment) {
    this.editForm.reset(Object.assign(
      {},
      { ...comment },
      {
        user_name: comment.author.name,
        user_email: comment.author.email,
        user_site: comment.author.site,
        extends: comment.extends.filter(extend => extend && extend.name && extend.value)
      }
    ));
  }

  // 增加自定义配置项目
  public addExtendItem() {
    this.extends.setValue([...this.extends.value, {}]);
  }

  // 删除自定义配置项目
  public delExtendItem(index) {
    this.extends.value.splice(index, 1);
  }

  // 获取评论信息
  public getCommentDetail() {
    this.fetching.get = true;
    this._httpService.get(`${this._apiPath}/${this.comment_id}`)
    .then(comment => {
      this.fetching.get = false;
      this.comment = comment.result;
      this.updateEditForm(this.comment);
      if (this.comment.post_id !== ECommentPostType.guestbook) {
        this.getCommentArticleDetail();
      }
      this.getComments({ post_id: this.comment.post_id, per_page: 1000 });
    })
    .catch(_ => {
      this.fetching.get = false;
    });
  }

  // 提交修改评论
  public submitComment(): void {
    if (!this.editForm.valid) {
      return;
    }

    const comment = this.editForm.value;
    const putComment: IComment = Object.assign({}, this.comment, {
      pid: Number(comment.pid),
      likes: Number(comment.likes),
      state: Number(comment.state),
      is_top: Boolean(comment.is_top),
      author: {
        name: comment.user_name,
        email: comment.user_email,
        site: comment.user_site
      },
      content: comment.content,
      extends: comment.extends.filter(extend => extend && extend.name && extend.value)
    });

    this.fetching.put = true;
    this._httpService.put(`${this._apiPath}/${putComment._id}`, putComment)
    .then(newComment => {
      this.comment = newComment.result;
      this.fetching.put = false;
    })
    .catch(_ => {
      this.fetching.put = false;
    });
  }

  // 获取评论列表
  public getComments(params: IRequestParams) {
    this.fetching.comments = true;
    this._httpService.get(this._apiPath, params)
    .then(comments => {
      this.comments = comments.result;
      this.fetching.comments = false;
    })
    .catch(_ => {
      this.fetching.comments = false;
    });
  }

  // 获取文章详情
  public getCommentArticleDetail() {
    this.fetching.article = true;
    this._httpService.get(`/article/${this.comment.post_id}`)
    .then(article => {
      this.article = article.result;
      this.fetching.article = false;
    })
    .catch(_ => {
      this.fetching.article = false;
    });
  }

  // 初始化
  ngOnInit() {
    this._route.params.subscribe(({ comment_id }) => {
      if (comment_id) {
        this.comment_id = comment_id;
      }
      this.getCommentDetail();
    });
  }
}
