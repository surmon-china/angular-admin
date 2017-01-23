import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class ArticleEditService {

  private _apiUrl = `${API_ROOT}/article`;

  constructor(private http: AuthHttp,
              private _notificationsService: NotificationsService) {}

  // 成功处理
  private handleResponse = (response: any): Promise<any> => {
    const data = response.json();
    if(data.code) {
      this._notificationsService.success(data.message, '数据请求成功', { timeOut: 500 });
      return Promise.resolve(data);
    } else {
      this._notificationsService.error(data.message, data.debug ? data.debug.message : data.message);
      return Promise.reject(data);
    }
  }

  // 失败处理
  private handleError = (error: any): Promise<any> => {
    this._notificationsService.error('请求失败', !error.ok ? error._body : JSON.parse(error._body).message);
    return Promise.reject(error);
  }

  // 获取文章
  getArticle(article_id: string): Promise<any> {
    return this.http
      .get(`${this._apiUrl}/${article_id}`)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 发布文章
  addArticle(article: any): Promise<any> {
    return this.http
      .post(this._apiUrl, article)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 修改文章
  putArticle(article: any): Promise<any> {
    return this.http
      .put(`${ this._apiUrl }/${ article._id }`, article)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
