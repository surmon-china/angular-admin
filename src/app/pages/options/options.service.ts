import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class OptionsService {

  private _authApiUrl = `${API_ROOT}/auth`;
  private _optionApiUrl = `${API_ROOT}/options`;

  constructor(private http: AuthHttp,
              private _notificationsService: NotificationsService) {}

  // 成功处理
  private handleResponse = (response: any): Promise<any> => {
    const data = response.json();
    if(data.code) {
      this._notificationsService.success(data.message, '数据请求成功');
      return Promise.resolve(data);
    } else {
      this._notificationsService.error(data.message, data.debug ? data.debug.message : data.message);
      return Promise.reject(data);
    }
  }

  // 失败处理
  private handleError = (error: any): Promise<any> => {
    const errmsg = [500, 504].indexOf(error.status) > -1 ? error._body : JSON.parse(error._body).message;
    this._notificationsService.error('请求失败', errmsg);
    return Promise.reject(error);
  }

  // 更新设置
  putOptions(options: any): Promise<any> {
    return this.http
      .put(this._optionApiUrl, options)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 更新权限和用户信息
  putAuth(auth: any): Promise<any> {
    return this.http
      .put(this._authApiUrl, auth)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
