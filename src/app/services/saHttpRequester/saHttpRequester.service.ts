/**
 * @file API service 模块
 * @module app/api-service
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { NotificationsService } from 'angular2-notifications';
import { checkTokenIsOk } from '@app/discriminators/token';
import { TOKEN, TOKEN_HEADER } from '@app/constants/auth';
import { SERVER_ERROR, GATEWAY_TIMEOUT, UNKNOWN_ERROR } from '@/app/constants/http';
import { isAuthPage } from '@app/discriminators/url';
import { api } from '@/environments/environment';

import 'rxjs/add/operator/toPromise';

// 路径和数据
type TRequestUrlPath = string;
type TRequestData = object;

// 请求参数
export interface IRequestParams {
  [key: string]: string | number;
}

// 响应体
interface IReponese {
  status: number;
  statusText?: string;
  message?: string;
  error?: any;
}

// 响应数据
interface IReponeseData {
  code: 1 | 0;
  debug?: any;
  message: string;
  result?: object | any[];
}

@Injectable()
export class SaHttpRequesterService {

  // 默认 token 和 headers
  private _token = '';
  private _headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

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
      const responseError = [SERVER_ERROR, GATEWAY_TIMEOUT, UNKNOWN_ERROR].includes(response.status);
      if (responseError) {
        const errMessage = response.message || response.statusText;
        this._notificationsService.error('请求失败', errMessage, { timeOut: 1000 });
      }
      return reject(response);
    });
  }

  constructor(private _http: HttpClient, private _notificationsService: NotificationsService) {}

  // 请求前检查条件
  checkRequestCondition(url?: TRequestUrlPath): void {

    // 跳转去登陆
    if (isAuthPage(url)) {
      this._headers = this._headers.delete(TOKEN_HEADER);
      return;
    }

    // 检查 token，创建一个合理的头
    if (checkTokenIsOk()) {
      this._token = localStorage.getItem(TOKEN);
      this._headers = this._headers.set(TOKEN_HEADER, `Bearer ${this._token}`);
    } else {
      this._notificationsService.error('Token 无效', 'Token 不存在或是无效的', { timeOut: 1000 });
    }
  }

  // 构造请求 Url
  buildRequestUrl(url: TRequestUrlPath): TRequestUrlPath {
    return `${api.API_ROOT}${url}`;
  }

  // 请求包装器
  handleRequest(request): Promise<any> {
    return request
      .toPromise()
      .then(this.handleResponseSuccess)
      .catch(this.handleReponseError);
  }

  get(url: TRequestUrlPath, getParams?: IRequestParams): Promise<any> {
    let params: HttpParams = new HttpParams();
    if (getParams) {
      Object.keys(getParams).forEach(k => {
        params = params.set(k, String(getParams[k]));
      });
    }
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.get(requestUrl, { params, headers: this._headers });
    return this.handleRequest(request);
  }

  post(url: TRequestUrlPath, data?: TRequestData): Promise<any> {
    this.checkRequestCondition(url);
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.post(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  put(url: TRequestUrlPath, data?: TRequestData): Promise<any> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.put(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  patch(url: TRequestUrlPath, data?: TRequestData): Promise<any> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.patch(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  delete(url: TRequestUrlPath, data?: TRequestData): Promise<any> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.request('delete', requestUrl, { body: data, headers: this._headers });
    return this.handleRequest(request);
  }
}
