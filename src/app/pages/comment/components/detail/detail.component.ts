import { ActivatedRoute } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SaHttpRequesterService } from '@app/services';
import { UAParse, OSParse } from '../../comment.ua';

@Component({
  selector: 'page-comment-detail',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./detail.scss')],
  template: require('./detail.html')
})

export class CommentDetailComponent implements OnInit {

  private _apiPath = '/comment';

  // 评论内容
  public UAParse = UAParse;
  public OSParse = OSParse;
  public comment_id = null;
  public comments = null;
  public article = null;
  public comment = {
    pid: '',
    post_id: '',
    state: '',
    is_top: '',
    likes: 0,
    content: '',
    author: {
      name: '',
      email: '',
      site: ''
    },
    extends: []
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
    this.editForm = _fb.group({
      'pid': ['0', Validators.compose([Validators.required])],
      'state': ['', Validators.compose([Validators.required])],
      'is_top': ['', Validators.compose([Validators.required])],
      'likes': [0],
      'content': ['', Validators.compose([Validators.required])],
      'user_name': ['', Validators.compose([Validators.required])],
      'user_email': ['', Validators.compose([Validators.required])],
      'user_site': [''],
      'extends': [[]]
    });
    this.pid = this.editForm.controls['pid'];
    this.state = this.editForm.controls['state'];
    this.is_top = this.editForm.controls['is_top'];
    this.likes = this.editForm.controls['likes'];
    this.content = this.editForm.controls['content'];
    this.user_name = this.editForm.controls['user_name'];
    this.user_email = this.editForm.controls['user_email'];
    this.user_site = this.editForm.controls['user_site'];
    this.extends = this.editForm.controls['extends'];
  }

  // 重置表单
  public updateEditForm() {
    this.pid.setValue(this.comment.pid);
    this.state.setValue(this.comment.state);
    this.is_top.setValue(this.comment.is_top);
    this.likes.setValue(this.comment.likes);
    this.content.setValue(this.comment.content);
    this.user_name.setValue(this.comment.author.name);
    this.user_email.setValue(this.comment.author.email);
    this.user_site.setValue(this.comment.author.site);
    this.extends.setValue(this.comment.extends.filter(e => !!e && !!e.name && e.value));
  }

  // 删除自定义配置项目
  public delExtendItem(index) {
    this.extends.value.splice(index, 1);
  }

  // 增加自定义配置项目
  public addExtendItem() {
    this.extends.setValue([...this.extends.value, {}]);
  }

  // 提交修改评论
  public submitComment(comment) {
    if (this.editForm.valid) {
      Object.assign(this.comment, {
        pid: Number(comment.pid),
        likes: Number(comment.likes),
        state: Number(comment.state),
        is_top: Boolean(comment.is_top),
        author: {
          name: comment.user_name,
          email: comment.user_email
        },
        content: comment.content,
        extends: comment.extends.filter(e => !!e && !!e.name && e.value)
      });
      if (!!comment.user_site) {
        this.comment.author.site = comment.user_site;
      }
      // console.log(this.comment);
      // return false;
      this._httpService.put(`${this._apiPath}/${(<any>this.comment)._id}`, this.comment)
      .then(comment => {
        this.comment = (<any>comment).result;
      })
      .catch(error => {});
    }
  }

  // 获取评论列表
  public getComments(params) {
    this._httpService.get(this._apiPath, params)
    .then(comments => {
      this.comments = (<any>comments).result;
    })
    .catch(error => {});
  }

  // 获取评论信息
  public getCommentDetail() {
    this._httpService.get(`${this._apiPath}/${this.comment_id}`)
    .then(comment => {
      this.comment = (<any>comment).result;
      this.updateEditForm();
      if (!Object.is(this.comment.post_id, 0)) {
        this.getCommentArticleDetail();
      }
      this.getComments({ post_id: this.comment.post_id, per_page: 1000 });
    })
    .catch(error => {});
  }

  // 获取文章详情
  public getCommentArticleDetail() {
    this._httpService.get(`/article/${this.comment.post_id}`)
    .then(article => {
      this.article = (<any>article).result;
    })
    .catch(error => {});
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
