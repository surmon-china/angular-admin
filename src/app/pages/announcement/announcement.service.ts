import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class AnnouncementService {

  private _apiUrl = `${API_ROOT}/announcement`;

  constructor(private http: AuthHttp,
              private _notificationsService: NotificationsService) {
  }

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
    const errmsg = [500, 504].indexOf(error.status) > -1 ? error._body : JSON.parse(error._body).message;
    this._notificationsService.error('请求失败', errmsg);
    return Promise.reject(error);
  }

  // 获取分类
  getAnnouncements(get_params): Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    if(get_params) Object.keys(get_params).forEach(k => { params.set(k, get_params[k])});
    return this.http
      .get(this._apiUrl, { search: params })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  addAnnouncement(announcement:any): Promise<any> {
    return this.http
      .post(this._apiUrl, announcement)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  putAnnouncement(announcement: any): Promise<any> {
    return this.http
      .put(`${ this._apiUrl }/${ announcement._id }`, announcement)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delAnnouncement(announcement_id: any): Promise<void> {
    return this.http
      .delete(`${ this._apiUrl }/${ announcement_id }`)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  delAnnouncements(announcements: any): Promise<void> {
    return this.http
      .delete(this._apiUrl, new RequestOptions({ body: { announcements }}))
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
