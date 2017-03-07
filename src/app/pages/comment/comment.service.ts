import { Injectable } from '@angular/core';
import { Headers, Http, URLSearchParams, RequestOptions } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { NotificationsService } from 'angular2-notifications';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class CommentService {

  private _apiUrl = `${API_ROOT}/comment`;

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

  // 获取评论列表/根据post_id获取列表
  public getComments(get_params:any): Promise<any> {
    let params: URLSearchParams = new URLSearchParams();
    if (get_params) {
      Object.keys(get_params).forEach(k => { 
        params.set(k, get_params[k])
      });
    }
    return this.http
      .get(this._apiUrl, { search: params })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 对状态进行各种操作
  // state:（0待审核/1通过正常/-1已删除/-2标为垃圾评论）
  public updateCommentState(comments: any, state) {
    return this.http
      .patch(this._apiUrl,{ comments, state })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 彻底删除评论
  public delComments(comments: any) {
    return this.http
      .delete(this._apiUrl, new RequestOptions({ body: { comments }}))
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 根据id获取和自己相关的所有评论，并树状展示
  public getCommentDetail(get_params) {
    let params: URLSearchParams = new URLSearchParams();
    if (get_params) {
      Object.keys(get_params).forEach(k => { 
        params.set(k, get_params[k])
      });
    }
    return this.http
      .get(`this._apiUrl/${ get_params.comment_id }`, { search: params })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 更新评论信息
  public updateCommentDetail(comments) {
    return this.http
      .put(this._apiUrl, { comments })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
