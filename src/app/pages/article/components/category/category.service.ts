import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class ArticleCategoryService {

  private _categorysUrl = `${API_ROOT}/category`;
  private handleResponse = response => {
    const data = response.json();
    data.code && this._notificationsService.success(data.message, '', { timeOut: 500 });
    data.code || this._notificationsService.error(data.message, data.debug.message);
    return data;
  }
  private handleError = error => {
    const err = JSON.parse(error._body);
    console.log(err);
    this._notificationsService.error('请求失败', err.message || '');
    return Promise.reject(new Error(err.message));
  }

  constructor(private http: AuthHttp,
              private _notificationsService: NotificationsService) {
  }

  getCategories(): Promise<any> {
    return this.http
      .get(this._categorysUrl)
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
    console.log(category);
    return this.http
      .put(`${ this._categorysUrl }/${ category._id }`, JSON.stringify(category))
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delCategory(category_id: string): Promise<void> {
    console.log(category_id);
    return this.http
      .delete(`${ this._categorysUrl }/${ category_id }`)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delCategories(categories_ids: string): Promise<void> {
    console.log(categories_ids);
    return this.http.delete(this._categorysUrl, {  })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }
}
