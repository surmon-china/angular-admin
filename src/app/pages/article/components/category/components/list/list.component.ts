/**
 * @file 分类页面列表组件
 * @module app/page/article/componennt/category/list
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'box-category-list',
  encapsulation: ViewEncapsulation.Emulated,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})

export class ArticleCategoryListComponent {

  @Input() categories;
  @Output() delCategoryRequest = new EventEmitter();
  @Output() delCategoriesRequest = new EventEmitter();
  @Output() editCategoryRequest = new EventEmitter();
  @Output() refreshList = new EventEmitter();

  public categoriesSelectAll: boolean = false;
  public selectedCategories = [];

  constructor() {}

  // 级别标记
  public categoryLevelMark = level => Array.from({ length: level }, () => '');

  // 多选切换
  public batchSelectChange(is_select: boolean): void {
    if (!this.categories.data.length) {
      return;
    }
    this.selectedCategories = is_select ? this.categories.data.map(item => item._id) : [];
    this.categories.data.forEach(item => (item.selected = is_select));
  }

  // 单个切换
  public itemSelectChange(): void {
    const categories = this.categories.data;
    this.selectedCategories = categories.filter(item => item.selected).map(item => item._id);
    this.categoriesSelectAll = this.selectedCategories.length === categories.length;
  }

  // 编辑分类
  public editCategory(category) {
    this.editCategoryRequest.emit(category);
  }

  // 删除分类
  public delCategory(category) {
    this.delCategoryRequest.emit(category);
  }

  // 批量删除
  public delCategories() {
    this.delCategoriesRequest.emit(this.selectedCategories);
  }
}
