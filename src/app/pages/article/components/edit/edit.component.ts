/**
 * @file 文章编辑页面组件
 * @module app/page/article/component/edit
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as API_PATH from '@app/constants/api';
import { SaHttpRequesterService } from '@app/services';
import { IArticle, TArticleId } from '@/app/pages/article/article.service';
import { TApiPath, EOriginState, EPublicState, EPublishState, IFetching } from '@app/pages/pages.constants';

const DEFAULT_ARTICLE = {
  title: '',
  keywords: [],
  description: '',
  content: '',
  thumb: '',
  origin: EOriginState.original,
  state: EPublishState.published,
  public: EPublicState.public,
  password: '',
  tag: [],
  category: [],
  extends: []
};

@Component({
  selector: 'page-article-edit',
  template: require('./edit.html')
})

export class ArticleEditComponent implements OnInit {

  @ViewChild('editForm') editFormMain: ElementRef;

  private _apiPath: TApiPath = API_PATH.ARTICLE;

  // 文章内容
  public article_id: TArticleId = null;
  public article: IArticle = DEFAULT_ARTICLE;
  public fetching: IFetching = {
    get: false,
    post: false
  };

  constructor(public elem: ElementRef,
              private _router: Router,
              private _route: ActivatedRoute,
              private _httpService: SaHttpRequesterService) {}

  // 提交文章
  public submitArticle(): void {
    if ((this.editFormMain as any).editForm.invalid) {
      return;
    }
    this.fetching.post = true;
    const isSubmitNewPost = !this.article._id;
    const request = this.article._id
      ? this._httpService.put(`${this._apiPath}/${this.article._id}`, this.article)
      : this._httpService.post(this._apiPath, this.article);
    request
      .then(article => {
        this.fetching.post = false;
        if (isSubmitNewPost) {
          this._router.navigate([`/article/edit/${article.result._id}`]);
        } else {
          this.article = article.result;
        }
      })
      .catch(_ => {
        this.fetching.post = false;
      });
  }

  // 获取文章信息
  public getArticle(article_id: string) {
    this.fetching.get = true;
    this._httpService
      .get<IArticle>(`${this._apiPath}/${article_id}`)
      .then(article => {
        this.fetching.get = false;
        this.article = article.result;
      })
      .catch(_ => {
        this.fetching.get = false;
      });
  }

  // 初始化
  ngOnInit() {
    // 如果是修改，则请求文章数据
    this._route.params.subscribe(({ article_id }) => {
      this.article_id = article_id;
      if (article_id) {
        this.getArticle(article_id);
      }
    });
  }
}
