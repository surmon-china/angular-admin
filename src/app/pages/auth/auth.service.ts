import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class AuthService {

  private _authUrl = `${API_ROOT}/auth`;
  private _handleResponse = response => {
    const data = response.json();
    data.code && this._notificationsService.success(data.message, data.message, { timeOut: 500 });
    data.code || this._notificationsService.error(data.message, data.debug.message);
    return data;
  }
  private _handleError = error => {
    const err = JSON.parse(error._body);
    this._notificationsService.error('请求失败', err.message || '');
    return Promise.reject(new Error(err.message));
  }

  constructor(private http: AuthHttp,
              private _notificationsService: NotificationsService) {
  }

  login(password): Promise<any> {
    return this.http
      .post(this._authUrl, { password })
      .toPromise()
      .then(this._handleResponse)
      .catch(this._handleError);
  }
}
