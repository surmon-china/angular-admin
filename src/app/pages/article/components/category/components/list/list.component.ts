import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'article-category-list',
  encapsulation: ViewEncapsulation.Emulated,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})

export class ArticleCategoryList {

  @Input() categories;
  @Output() delCategoryRequest = new EventEmitter();
  @Output() delCategoriesRequest = new EventEmitter();
  @Output() editCategoryRequest = new EventEmitter();
  @Output() refreshList = new EventEmitter();

  public categoriesSelectAll:boolean = false;
  public selectedCategories = [];

  constructor() {}

  // 级别标记
  public categoryLevelMark = level => Array.from({ length: level }, () => '');

  // 多选切换
  public batchSelectChange(is_select) {
    if(!this.categories.data.length) return;
    this.selectedCategories = [];
    this.categories.data.forEach(item => { item.selected = is_select; is_select && this.selectedCategories.push(item._id) });
  }

  // 单个切换
  public itemSelectChange() {
    this.selectedCategories = [];
    const categories = this.categories.data;
    categories.forEach(item => { item.selected && this.selectedCategories.push(item._id) });
    if(!this.selectedCategories.length) this.categoriesSelectAll = false;
    if(!!this.selectedCategories.length && this.selectedCategories.length == categories.length) this.categoriesSelectAll = true;
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
