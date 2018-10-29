/**
 * @file 文章编辑页面组件
 * @module app/page/article/componennt/edit
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SaHttpRequesterService } from '@app/services';

@Component({
  selector: 'page-article-edit',
  template: require('./edit.html')
})

export class ArticleEditComponent implements OnInit {

  private _apiPath = '/article';

  // 文章内容
  public article_id: any = null;
  public article = {
    title: '',
    keywords: [],
    description: '',
    content: '',
    thumb: '',
    origin: '0',
    state: '1',
    public: '1',
    password: '',
    tag: [],
    category: [],
    extends: []
  };

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              private _httpService: SaHttpRequesterService) {}

  // 提交文章
  public submitArticle(event) {
    let isSubmitNewPost = false;
    const { title, content } = this.article;
    if (title && content) {
      ((() => {
        if ((<any>this.article)._id) {
          isSubmitNewPost = false;
          return this._httpService.put(`${this._apiPath}/${(<any>this.article)._id}`, this.article);
        } else {
          isSubmitNewPost = true;
          return this._httpService.post(this._apiPath, this.article);
        }
      })())
      .then(article => {
        this.article = article.result;
        if (isSubmitNewPost) {
          this._router.navigate([`/article/edit/${article.result._id}`]);
        }
      })
      .catch(error => {});
    }
  }

  // 获取文章信息
  public getArticle(article_id: string) {
    this._httpService.get(`${this._apiPath}/${article_id}`)
    .then(article => {
      this.article = article.result;
    })
    .catch(error => {});
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
