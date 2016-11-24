import { Component, Input } from '@angular/core';
// import { DOM } from '@angular/platform-browser/src/dom/dom_adapter';

@Component({
  selector: 'article-category-list',
  template: require('./list.html')
})

export class CategoryList {

  @Input() categories;

  editCategory(params) {
    let target = event.target || event.srcElement || event.currentTarget;
    // console.log('编辑分类', params, target, DOM);
  }

  constructor() {
  }

  ngOnInit() {
  }
}
