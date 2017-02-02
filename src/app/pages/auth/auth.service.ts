import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class AuthService {

  private _authUrl = `${API_ROOT}/auth`;

  // 成功处理
  private handleResponse = (response:any):Promise<any> => {
    const data = response.json();
    if(data.code) {
      this._notificationsService.success(data.message, '数据请求成功', { timeOut: 1000 });
      return Promise.resolve(data);
    } else {
      this._notificationsService.error(data.message, data.debug ? data.debug.message : data.message, { timeOut: 1000 });
      return Promise.reject(data);
    }
  }

  // 失败处理
  private handleError = (error:any):Promise<any> => {
    const errmsg = [500, 504].indexOf(error.status) > -1 ? error._body : JSON.parse(error._body).message;
    this._notificationsService.error('请求失败', errmsg, { timeOut: 1000 });
    return Promise.reject(error);
  }

  constructor(private http: Http,
              private _notificationsService: NotificationsService) {}

  getToken(password:any):Promise<any> {
    return this.http
      .post(this._authUrl, { password })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  loggedIn() {
    return tokenNotExpired();
  }
}
