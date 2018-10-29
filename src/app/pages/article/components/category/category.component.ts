/**
 * @file 分类页面组件
 * @module app/page/article/componennt/category
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, ViewChild, OnInit } from '@angular/core';
import { SaHttpRequesterService } from '@app/services';
import { TApiPath, IFetching, IDataExtends, IResponseData } from '@app/pages/pages.constants';
import * as API_PATH from '@app/constants/api';

// 公告
export interface ICategory {
  id?: number;
  _id?: string;
  pid?: string;
  count?: number;
  name: string;
  slug: string;
  description: string;
  update_at: string;
  create_at: string;
  selected?: boolean;
  extends: IDataExtends[];
}

@Component({
  selector: 'page-article-category',
  template: require('./category.html'),
})
export class ArticleCategoryComponent implements OnInit {

  @ViewChild('delModal') delModal: ModalDirective;
  @ViewChild('editCategoryForm') editCategoryForm;

  private _apiPath: TApiPath = API_PATH.CATEGORY;

  public categories: IResponseData<ICategory> = {
    data: []
  };
  public fetching: IFetching = {
    get: false,
    post: false
  };
  public todoDelCategory: ICategory;
  public todoEditCategory: ICategory;
  public todoDelCategories: string[];

  constructor(private _httpService: SaHttpRequesterService) {}

  ngOnInit() {
    this.getCategories();
  }

  // 重置编辑数据
  public resetEditForm() {
    this.todoEditCategory = null;
    this.editCategoryForm.resetEditForm();
  }

  // 分类级别递归排序
  public buildCategoryLevel = () => {

    // 初始化数据
    const categories: any = Array.from(this.categories.data);
    const toDoDeletes = [];

    // 级别数据构造
    categories.forEach(cate => {
      // 找到问题数据并添加标记
      cate.unrepaired = (!!cate.pid && !categories.find(c => Object.is(cate.pid, c._id)));
      categories.forEach(c => {
        if (Object.is(cate.pid, c._id)) {
          c.children = c.children || [];
          c.children.push(cate);
          toDoDeletes.push(cate);
        }
      });
    });

    // 扁平数据构造（同时添加级别标示）
    const levelBuildRun = cates => {
      const newCategories = [];
      const levelBuildOptimize = (child, level) => {
        child.forEach(c => {
          c.level = level;
          newCategories.push(c);
          if (c.children && c.children.length) { levelBuildOptimize(c.children, level + 1); }
        });
      };
      levelBuildOptimize(cates, 0);
      return newCategories;
    };

    // 开始执行
    this.categories.data = levelBuildRun(categories.filter(c => toDoDeletes.indexOf(c) === -1));
  }

  // 修改分类
  public editCategory(category: ICategory) {
    this.todoEditCategory = lodash.cloneDeep(category);
  }

  // 删除分类弹窗
  public delCategory(category: ICategory) {
    this.todoDelCategory = lodash.cloneDeep(category);
    this.delModal.show();
  }

  // 分类弹窗取消
  public canceldDelCategory() {
    this.todoDelCategory = null;
    this.delModal.hide();
  }

  // 批量删除分类
  public delCategories(categories) {
    this.todoDelCategories = categories;
    this.todoDelCategory = null;
    this.delModal.show();
  }

  // 添加或更新的相应处理
  public handlePostRequest(request: Promise<any>) {
    request
      .then(_ => {
        this.getCategories();
        this.resetEditForm();
        this.fetching.post = false;
        console.log('执行什么了');
      })
      .catch(_ => {
        console.log('难道么有执行');
        this.fetching.post = false;
      });
  }

  // 获取分类
  public getCategories() {
    this.fetching.get = true;
    this._httpService.get(this._apiPath, { per_page: 100 }).then(categories => {
      this.categories = categories.result;
      this.fetching.get = false;
      this.buildCategoryLevel();
    });
  }

  // 添加分类
  public addCategory(category: ICategory) {
    this.fetching.post = true;
    const request = this._httpService.post(this._apiPath, category);
    this.handlePostRequest(request);
  }

  // 修改分类
  public doEditCategory(category: ICategory) {
    this.fetching.post = true;
    const newCategory = Object.assign(this.todoEditCategory, category);
    const request = this._httpService.put(`${ this._apiPath }/${ newCategory._id }`, newCategory);
    this.handlePostRequest(request);
  }

  // 删除分类
  public doDelCategory() {
    this._httpService.delete(`${ this._apiPath }/${ this.todoDelCategory._id }`)
    .then(_ => {
      this.todoDelCategory = null;
      this.delModal.hide();
      this.getCategories();
    })
    .catch(_ => {
      this.delModal.hide();
    });
  }

  // 批量删除
  public doDelCategories() {
    this._httpService.delete(this._apiPath, { categories: this.todoDelCategories })
    .then(_ => {
      this.todoDelCategories = null;
      this.delModal.hide();
      this.getCategories();
    })
    .catch(_ => {
      this.delModal.hide();
    });
  }
}
