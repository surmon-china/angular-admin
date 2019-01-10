/**
 * @file 文章编辑页面组件
 * @module app/page/article/component/edit
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IArticle, TArticleId } from '@/app/pages/article/article.service';
import { TApiPath, IFetching } from '@app/pages/pages.constants';
import { SaHttpRequesterService } from '@app/services';
import { EPublishState, EPublicState, EOriginState } from '@app/constants/state';

const DEFAULT_ARTICLE = {
  title: '',
  keywords: [],
  description: '',
  content: '',
  thumb: '',
  origin: EOriginState.Original,
  state: EPublishState.Published,
  public: EPublicState.Public,
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

  private apiPath: TApiPath = API_PATH.ARTICLE;

  // 文章内容
  public article_id: TArticleId = null;
  public article: IArticle = DEFAULT_ARTICLE;
  public fetching: IFetching = {
    get: false,
    post: false
  };

  constructor(
    public elem: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: SaHttpRequesterService
  ) {}

  // 提交文章
  public submitArticle(): void {
    if ((this.editFormMain as any).editForm.invalid) {
      window.scrollTo(0, 0);
      return;
    }
    this.fetching.post = true;
    const isSubmitNewPost = !this.article._id;
    const request = this.article._id
      ? this.httpService.put(`${this.apiPath}/${this.article._id}`, this.article)
      : this.httpService.post(this.apiPath, this.article);
    request
      .then(article => {
        this.fetching.post = false;
        if (isSubmitNewPost) {
          this.router.navigate([`/article/edit/${article.result._id}`]);
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
    this.httpService
      .get<IArticle>(`${this.apiPath}/${article_id}`)
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
    this.route.params.subscribe(({ article_id }) => {
      this.article_id = article_id;
      if (article_id) {
        this.getArticle(article_id);
      }
    });
  }
}
