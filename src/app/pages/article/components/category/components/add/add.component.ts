import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'article-category-add',
  template: require('./add.html')
})

export class ArticleCategoryAdd {

  @Input() category;
  @Output() submitArticle = new EventEmitter();

  submit() {
    this.submitArticle.emit();
  }

  constructor() {
  }

  ngOnInit() {
  }
}
