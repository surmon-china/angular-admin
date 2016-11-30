import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { API_ROOT } from 'src/config'

@Injectable()
export class ArticleCategoryService {

  private _categorysUrl = `${API_ROOT}/category`;
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

  constructor(private http:Http) {}

  getCategories(): Promise<any> {
    return this.http.get(this._categorysUrl)
             .toPromise()
             .then(response => response.json())
             .catch(this.handleError);
  }

  // 添加分类
  addCategory(category) {
    console.log(category);
    return this.http.post(this._categorysUrl, category)
            .toPromise()
            .then(res => res.json())
            .catch(this.handleError);
  }

  // 修改分类
  putCategory(category) {
    console.log(category);
  }

  // 删除分类
  delCategory(category) {
    console.log(category);
  }

  // 批量删除分类
  delCategories(categories) {
    console.log(categories);
  }
}
