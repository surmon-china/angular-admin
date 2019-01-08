/**
 * @file API service
 * @module app/api-service
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { NotificationsService } from 'angular2-notifications';
import { checkTokenIsOk } from '@app/discriminators/token';
import { api as ENV_API } from '@/environments/environment';
import { isAuthPage } from '@app/discriminators/url';
import { TOKEN, TOKEN_HEADER } from '@app/constants/auth';

import 'rxjs/add/operator/toPromise';

// 路径和数据
type TRequestUrlPath = string;
type TRequestData = object;

// 响应状态
export enum EHttpStatus {
  Error = 'error',
  Success = 'success',
}

// 请求参数
export interface IRequestParams {
  [key: string]: string | number;
}

// 响应体
export interface IResponse {
  status: number;
  statusText?: string;
  message?: string;
  error?: any;
}

// 响应数据
export interface IResponseData<T> {
  status: EHttpStatus;
  debug?: any;
  error: string;
  message: string;
  result: T;
}

@Injectable()
export class SaHttpRequesterService {

  // 默认 token 和 headers
  private _token = '';
  private _headers: HttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private _http: HttpClient, private _notificationsService: NotificationsService) {}

  // 成功处理
  private handleResponseSuccess<T>(response: IResponseData<T>): Promise<IResponseData<T>> {
    if (response.status === EHttpStatus.Success) {
      this._notificationsService.success(
        response.message,
        '数据请求成功',
        { timeOut: 1000 }
      );
      return Promise.resolve(response);
    } else {
      this._notificationsService.error(
        response.message,
        response.error,
        { timeOut: 1000 }
      );
      return Promise.reject(response);
    }
  }

  // 失败处理
  private handleReponseError(response: IResponse): Promise<IResponse> {
    const error = response.error;
    const errorMessage = (error && error.message) || '请求失败';
    const errorDetail = (error && error.error) || response.message || response.statusText;
    this._notificationsService.error(errorMessage, errorDetail, { timeOut: 1000 });
    console.warn('数据请求失败：', response);
    return Promise.reject(response);
  }

  // 请求前检查条件
  private checkRequestCondition(url?: TRequestUrlPath): void {

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
      this._notificationsService.warn('Token 无效', 'Token 不存在或是无效的', { timeOut: 1000 });
    }
  }

  // 构造请求 Url
  private buildRequestUrl(url: TRequestUrlPath): TRequestUrlPath {
    return `${ENV_API.API_ROOT}${url}`;
  }

  // 请求包装器
  private handleRequest<T>(request): Promise<IResponseData<T>> {
    return request
      .toPromise()
      .then(this.handleResponseSuccess.bind(this))
      .catch(this.handleReponseError.bind(this));
  }

  get<T>(url: TRequestUrlPath, getParams?: IRequestParams): Promise<IResponseData<T>> {
    let params: HttpParams = new HttpParams();
    if (getParams) {
      Object.keys(getParams).forEach(k => {
        params = params.set(k, String(getParams[k]));
      });
    }
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.get(requestUrl, { params, headers: this._headers });
    return this.handleRequest<T>(request);
  }

  post<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T | any>> {
    this.checkRequestCondition(url);
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.post(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  put<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T | any>> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.put(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  patch<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T | any>> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.patch(requestUrl, data, { headers: this._headers });
    return this.handleRequest(request);
  }

  delete<T>(url: TRequestUrlPath, data?: TRequestData): Promise<IResponseData<T | any>> {
    this.checkRequestCondition();
    const requestUrl = this.buildRequestUrl(url);
    const request = this._http.request('delete', requestUrl, { body: data, headers: this._headers });
    return this.handleRequest(request);
  }
}
