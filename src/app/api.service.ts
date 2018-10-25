/**
 * @file API service 模块
 * @module app/api-service
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { NotificationsService } from 'angular2-notifications';
import { checkTokenIsOk } from './token.service';
import { api } from '@/environments/environment';
import { TOKEN } from '@app/constants/auth';

import 'rxjs/add/operator/toPromise';

type RequestUrlPath = string
type RequestData = object

interface IReponeseParams {
  [key: string]: string
};

interface IReponese {
  status: number
  error?: any
};

interface IReponeseData {
  code: 1 | 0
  debug?: any
  message: string,
  result?: object | any[]
};

@Injectable()
export class ApiService {

  private _token: string = '';
  private _headers: HttpHeaders = new HttpHeaders({ 'Content-Type':'application/json; charset=utf-8' });

  // 成功处理
  private handleResponseSuccess = (response: IReponeseData): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (response.code) {
        this._notificationsService.success(
          response.message,
          '数据请求成功',
          { timeOut: 1000 }
        );
        return resolve(response);
      } else {
        this._notificationsService.error(
          response.message,
          response.debug ? (response.debug.message || response.message) : response.message,
          { timeOut: 1000 }
        );
        return reject(response);
      }
    });
  }

  // 失败处理
  private handleReponseError = (response: IReponese): Promise<any> => {
    return new Promise((_, reject) => {
      const isNotOk = [500, 504].includes(response.status);
      const errMsg =  response.error && response.error.message;
      if (isNotOk && errMsg) {
        this._notificationsService.error('请求失败', errMsg, { timeOut: 1000 });
      }
      return reject(response);
    });
  }

  // 构造函数
  constructor(private _http: HttpClient,
              private _notificationsService: NotificationsService) {}

  // 请求前检查条件
  checkRequestCondition(url?: RequestUrlPath): void {

    // 检查是否是登陆，用于创建一个合理的头；登陆 = /auth + POST
    const isToAuthPage = url && url === '/auth';

    // 跳转登陆
    if (isToAuthPage) {
      this._headers = this._headers.delete('Authorization');
      return;
    }

    // 检查 token
    if (checkTokenIsOk()) {
      this._token = localStorage.getItem(TOKEN);
      this._headers = this._headers.set('Authorization', `Bearer ${this._token}`);
    } else {
      this._notificationsService.error('Token 无效', 'Token 不存在或是无效的', { timeOut: 1000 });
    }
  }

  // 构造请求 Url
  buildRequestUrl(url: RequestUrlPath): RequestUrlPath {
    return `${api.API_ROOT}${url}`
  }

  // 请求包装器
  handleRequest(request): Promise<any> {
    return request
      .toPromise()
      .then(this.handleResponseSuccess)
      .catch(this.handleReponseError);
  }

  get(url: RequestUrlPath, getParams?: IReponeseParams): Promise<any> {
    let params: HttpParams = new HttpParams();
    if (getParams) {
      Object.keys(getParams).forEach(k => {
        params = params.set(k, getParams[k] as string);
      });
    }
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.get(requestUrl, { params, headers: this._headers });
    return this.handleRequest(request);
  }

  post(url: RequestUrlPath, data?: RequestData): Promise<any> {
    this.checkRequestCondition(url);
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.post(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  put(url: RequestUrlPath, data?: RequestData): Promise<any> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.put(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  patch(url: RequestUrlPath, data?: RequestData): Promise<any> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.patch(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  delete(url: RequestUrlPath, data?: RequestData): Promise<any> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.request('delete', requestUrl, { body: data, headers: this._headers });
    return this.handleRequest(request);
  }
}