import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { NotificationsService } from 'angular2-notifications';
import { checkTokenIsOk } from './token.service';
import { API_ROOT } from '@config';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ApiService {

  private _token:String = '';
  private _headers:HttpHeaders = new HttpHeaders({ 'Content-Type':'application/json; charset=utf-8' });

  // 成功处理
  private handleResponse = (data:any):Promise<any> => {
    if (data.code) {
      this._notificationsService.success(
        data.message,
        '数据请求成功',
        { timeOut: 1000 }
      );
      return Promise.resolve(data);
    } else {
      this._notificationsService.error(
        data.message,
        data.debug ? (data.debug.message || data.message) : data.message,
        { timeOut: 1000 }
      );
      return Promise.reject(data);
    }
  }

  // 失败处理
  private handleError = (res:any):Promise<any> => {
    const isNotOk = [500, 504].includes(res.status);
    const errmsg =  res.error && res.error.message;
    if (isNotOk && errmsg) {
      this._notificationsService.error('请求失败', errmsg, { timeOut: 1000 });
    }
    return Promise.reject(res);
  }

  constructor(private _http: HttpClient,
              private _notificationsService: NotificationsService) {}

  // 请求前检查条件
  checkRequestCondition(url?) {

    // 检查是否是登陆，用于创建一个合理的头；登陆 = /auth + POST
    if (url && url === '/auth') {
      this._headers = this._headers.delete('Authorization');
    } else {

      // 检查 token
      if (checkTokenIsOk()) {
        this._token = localStorage.getItem('id_token');
        this._headers = this._headers.set('Authorization', `Bearer ${this._token}`);
      } else {
        this._notificationsService.error('Token 无效', 'Token 不存在或是无效的', { timeOut: 1000 });
      }
    }
  }

  get(url, getParams?) {
    let params: HttpParams = new HttpParams();
    if (getParams) {
      Object.keys(getParams).forEach(k => {
        params = params.set(k, getParams[k]);
      });
    }
    this.checkRequestCondition();
    return this._http
      .get(`${API_ROOT}${url}`, { params, headers: this._headers })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  post(url, data = {}) {
    this.checkRequestCondition(url);
    return this._http.post(`${API_ROOT}${url}`, data, { headers: this._headers })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  put(url, data = {}) {
    this.checkRequestCondition();
    return this._http.put(`${API_ROOT}${url}`, data, { headers: this._headers })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  patch(url, data = {}) {
    this.checkRequestCondition();
    return this._http.patch(`${API_ROOT}${url}`, data, { headers: this._headers })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delete(url, data = {}) {
    this.checkRequestCondition();
    return this._http
      .request('delete', `${API_ROOT}${url}`, { body: data, headers: this._headers })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}