import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class ArticleCategoryService {

  private _categorysUrl = `${API_ROOT}/category`;
  private handleResponse = response => {
    const data = response.json();
    data.code && this._notificationsService.success(data.message, '数据请求成功', { timeOut: 500 });
    data.code || this._notificationsService.error(data.message, data.debug ? data.debug.message : data.message);
    return data;
  }
  private handleError = error => {
    const err = JSON.parse(error._body);
    this._notificationsService.error('请求失败', err.message || '');
    return Promise.reject(new Error(err.message));
  }

  constructor(private http: AuthHttp,
              private _notificationsService: NotificationsService) {
  }

  getCategories(): Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('per_page', '100');
    return this.http
      .get(this._categorysUrl, { search: params})
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  addCategory(category:any): Promise<any> {
    return this.http
      .post(this._categorysUrl, category)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  putCategory(category: any): Promise<any> {
    return this.http
      .put(`${ this._categorysUrl }/${ category._id }`, category)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delCategory(category_id: string): Promise<void> {
    return this.http
      .delete(`${ this._categorysUrl }/${ category_id }`)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delCategories(categories: any): Promise<void> {
    return this.http
      .delete(this._categorysUrl, new RequestOptions({ body: { categories }}))
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
