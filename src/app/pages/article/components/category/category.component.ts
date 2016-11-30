import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ArticleCategoryService } from './category.service';

@Component({
  selector: 'article-category',
  encapsulation: ViewEncapsulation.Emulated,
  template: require('./category.html'),
})
export class ArticleCategory {

  public categories = { data: [] };
  public addCategoryIng:boolean = false;

  constructor(private _articleCategoryService:ArticleCategoryService) {}

  ngOnInit() {
    this._getCategories();
  }

  // 获取分类
  private _getCategories() {
    this._articleCategoryService.getCategories().then(categories => {
      this.categories = categories.result;
    });
  }

  // 添加分类
  private _addCategory(category) {
    this.addCategoryIng = true;
    this.addCategoryIng = false;
  }

  // 修改分类
  private _putCategory(category) {
    console.log(category);
  }

  // 删除分类
  private _delCategory(category) {
    console.log(category);
  }

  // 批量删除分类
  private _delCategories(categories) {
    console.log(categories);
  }
}
