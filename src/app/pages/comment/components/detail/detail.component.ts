/**
 * @file 评论详情页面组件
 * @desc app/page/comment/component/detail
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import * as API_PATH from '@app/constants/api';
import { ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { IArticle } from '@app/pages/article/article.service';
import { TApiPath, IFetching } from '@app/pages/pages.constants';
import { SaHttpRequesterService, IRequestParams } from '@app/services';
import { browserParser, osParser } from '@app/transforms/ua';
import { humanizedLoading, mergeFormControlsToInstance, formControlStateClass } from '@app/pages/pages.service';
import {
  IComment,
  TCommentId,
  ECommentState,
  ECommentPostType,
  ECommentParentType,
  TResponsePaginationComment
} from '@app/pages/comment/comment.constants';

const DEFAULT_COMMENT: IComment = {
  pid: ECommentParentType.Self,
  post_id: null,
  state: ECommentState.Published,
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

enum ELoading { GetDetail, Update, GetList, GetArticle }

@Component({
  selector: 'page-comment-detail',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./detail.component.scss'],
  templateUrl: './detail.component.html'
})
export class CommentDetailComponent implements OnInit {

  private Loading = ELoading;
  private CommentState = ECommentState;
  private CommentPostType = ECommentPostType;
  private controlStateClass = formControlStateClass;
  private apiPath: TApiPath = API_PATH.COMMENT;

  public osParser = osParser;
  public browserParser = browserParser;

  // 评论内容
  public comment_id: TCommentId = null;
  public comments: TResponsePaginationComment = null;
  public article: IArticle = null;
  public comment: IComment = lodash.cloneDeep(DEFAULT_COMMENT);
  public fetching: IFetching = {};

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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private httpService: SaHttpRequesterService
  ) {

    this.editForm = this.fb.group({
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
    humanizedLoading(
      this.fetching,
      ELoading.GetDetail,
      this.httpService
        .get<IComment>(`${this.apiPath}/${this.comment_id}`)
        .then(comment => {
          this.comment = comment.result;
          this.updateEditForm(this.comment);
          if (this.comment.post_id !== ECommentPostType.Guestbook) {
            this.getCommentArticleDetail();
          }
          this.getComments({ post_id: this.comment.post_id, per_page: 1000 });
        })
    );
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

    humanizedLoading(
      this.fetching,
      ELoading.Update,
      this.httpService
        .put(`${this.apiPath}/${putComment._id}`, putComment)
        .then(newComment => {
          this.comment = newComment.result;
        })
    );
  }

  // 获取评论列表
  public getComments(params: IRequestParams) {
    humanizedLoading(
      this.fetching,
      ELoading.GetList,
      this.httpService
        .get<TResponsePaginationComment>(this.apiPath, params)
        .then(comments => {
          this.comments = comments.result;
        })
    );
  }

  // 获取文章详情
  public getCommentArticleDetail() {
    humanizedLoading(
      this.fetching,
      ELoading.GetArticle,
      this.httpService
        .get<IArticle>(`/article/${this.comment.post_id}`)
        .then(article => {
          this.article = article.result;
        })
    );
  }

  // 初始化
  ngOnInit() {
    this.route.params.subscribe(({ comment_id }) => {
      if (comment_id) {
        this.comment_id = comment_id;
      }
      this.getCommentDetail();
    });
  }
}
