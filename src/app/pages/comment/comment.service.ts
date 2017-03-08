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

  public unique(arr, newArr) {
    let num;
    if (-1 == arr.indexOf(num = arr.shift())) newArr.push(num);
    arr.length && this.unique(arr, newArr);
   }

  // 对状态进行各种操作
  // state:（0待审核/1通过正常/-1已删除/-2标为垃圾评论）
  public updateCommentState(comments: any, post_ids: any, state: any) {
    let _post_ids = [];
    this.unique(post_ids, _post_ids);
    post_ids = _post_ids;
    return this.http
      .patch(this._apiUrl, { comments, post_ids, state })
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 彻底删除评论
  public delComments(comments: any, post_ids: any) {
    let _post_ids = [];
    this.unique(post_ids, _post_ids);
    post_ids = _post_ids;
    return this.http
      .delete(this._apiUrl, new RequestOptions({ body: { comments, post_ids }}))
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 获取评论详情
  public getCommentDetail(comment_id) {
    return this.http
      .get(`${this._apiUrl}/${comment_id}`)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 更新评论信息
  public updateCommentDetail(comment) {
    return this.http
      .put(`${this._apiUrl}/${comment._id}`, comment)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  // 获取文章信息
  public getCommentArticleDetail(post_id) {
    return this.http
      .get(`${API_ROOT}/article/${post_id}`)
      .toPromise()
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
