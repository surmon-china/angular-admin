import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'article-category-add',
  // directives: [],
  template: require('./add.html')
})

export class CategoryAdd {

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