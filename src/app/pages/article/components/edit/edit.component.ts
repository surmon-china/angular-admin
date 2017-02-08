import { Component } from '@angular/core';
import { ArticleEditService } from './edit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'article-edit',
  template: require('./edit.html')
})

export class ArticleEdit {

  // 文章内容
  public article_id: any = null;
  public article = {
    title: '',
    keywords: [],
    description: '',
    content: '',
    thumb: '',
    state: '1',
    public: '1',
    password: '',
    tag: [],
    category: [],
    extends: [{}]
  }

  constructor(private _route: ActivatedRoute,
              private _articleEditService: ArticleEditService) {}

  // 提交文章
  public submitArticle(event) {
    const { title, content } = this.article;
    if(title && content) {
      this._articleEditService[this.article_id ? 'putArticle' : 'addArticle'](this.article)
      .then(article => {
        this.article = article.result;
      })
      .catch(error => {})
    }
  }

  // 获取文章信息
  public getArticle(article_id: string) {
    this._articleEditService.getArticle(article_id)
    .then(article => {
      this.article = article.result;
    })
    .catch(error => {})
  }

  // 初始化
  ngOnInit() {
    // 如果是修改，则请求文章数据
    this._route.params.subscribe(({ article_id }) => {
      this.article_id = article_id;
      if(article_id) this.getArticle(article_id);
    });
  }
}
