/**
 * @file 分类页面组件
 * @desc app/page/article/component/category
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import * as API_PATH from '@app/constants/api';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, ViewChild, OnInit } from '@angular/core';
import { SaHttpRequesterService, SaHttpLoadingService } from '@app/services';
import { ICategory, TResponsePaginationCategory, buildLevelCategories } from '@app/pages/article/article.utils';
import { TApiPath, TSelectedIds } from '@app/pages/pages.interface';

enum Loading {
  Get,
  Post
}

@Component({
  selector: 'page-article-category',
  templateUrl: './category.component.html',
  providers: [SaHttpLoadingService]
})
export class ArticleCategoryComponent implements OnInit {

  @ViewChild('delModal', { static: false }) delModal: ModalDirective;
  @ViewChild('editCategoryForm', { static: false }) editCategoryForm;

  public Loading = Loading;
  private apiPath: TApiPath = API_PATH.CATEGORY;

  public categories: TResponsePaginationCategory = {
    data: []
  };
  public todoDelCategory: ICategory;
  public todoEditCategory: ICategory;
  public todoDelCategories: TSelectedIds;

  constructor(
    private httpService: SaHttpRequesterService,
    private httpLoadingService: SaHttpLoadingService
  ) {}

  ngOnInit() {
    this.getCategories();
  }

  // 重置编辑数据
  public resetEditForm() {
    this.todoEditCategory = null;
    this.editCategoryForm.resetEditForm();
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
  public cancelDelCategory() {
    this.todoDelCategory = null;
    this.delModal.hide();
  }

  // 批量删除分类
  public delCategories(categories: TSelectedIds) {
    this.todoDelCategories = categories;
    this.todoDelCategory = null;
    this.delModal.show();
  }

  // 添加或更新的相应处理
  public handlePostDone() {
    this.getCategories();
    this.resetEditForm();
  }

  // 获取分类
  public getCategories() {
    this.httpLoadingService.promise(
      Loading.Get,
      this.httpService
        .get<TResponsePaginationCategory>(this.apiPath, { per_page: 100 })
        .then(categories => {
          this.categories = categories.result;
          this.categories.data = buildLevelCategories(this.categories.data);
        })
    );
  }

  // 添加分类
  public addCategory(category: ICategory) {
    this.httpLoadingService.promise(
      Loading.Post,
      this.httpService
        .post(this.apiPath, category)
        .then(() => this.handlePostDone())
    );
  }

  // 修改分类
  public doEditCategory(category: ICategory) {
    const newCategory = Object.assign(this.todoEditCategory, category);
    this.httpLoadingService.promise(
      Loading.Post,
      this.httpService
        .put(`${ this.apiPath }/${ newCategory._id }`, newCategory)
        .then(() => this.handlePostDone())
    );
  }

  // 删除分类
  public doDelCategory() {
    this.httpService.delete(`${ this.apiPath }/${ this.todoDelCategory._id }`)
    .then(() => {
      this.todoDelCategory = null;
      this.delModal.hide();
      this.getCategories();
    })
    .catch(() => {
      this.delModal.hide();
    });
  }

  // 批量删除
  public doDelCategories() {
    this.httpService.delete(this.apiPath, { categorie_ids: this.todoDelCategories })
    .then(() => {
      this.todoDelCategories = null;
      this.delModal.hide();
      this.getCategories();
    })
    .catch(() => {
      this.delModal.hide();
    });
  }

  public isLoading(key: Loading): boolean {
    return this.httpLoadingService.isLoading(key);
  }
}
