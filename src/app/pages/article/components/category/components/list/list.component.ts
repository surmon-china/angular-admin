import { Component, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'article-category-list',
  encapsulation: ViewEncapsulation.Emulated,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})

export class ArticleCategoryList {

  @Input() categories;
  @Output() deleteRequest = new EventEmitter();

  categoriesSelectAll:boolean = false;
  selectedCategories = [];

  constructor() {
  }

  ngOnInit() {
    // console.log(this, '分类列表初始化完毕')
  }

  // 级别标记
  public categoryLevelMark = level => Array.from({ length: level }, () => '');

  editCategory(params) {
    // let target = event.target || event.srcElement || event.currentTarget;
    // console.log('编辑分类', params, target, DOM);
  }

  // 多选切换
  batchSelectChange(is_select) {
    if(!this.categories.data.length) return;
    this.selectedCategories = [];
    this.categories.data.forEach(item => { item.selected = is_select; is_select && this.selectedCategories.push(item._id) });
  }

  // 单个切换
  itemSelectChange() {
    this.selectedCategories = [];
    const categories = this.categories.data;
    categories.forEach(item => { item.selected && this.selectedCategories.push(item._id) });
    if(!this.selectedCategories.length) this.categoriesSelectAll = false;
    if(!!this.selectedCategories.length && this.selectedCategories.length == categories.length) this.categoriesSelectAll = true;
  }
}
