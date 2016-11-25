import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'article-submit',
  template: require('./submit.html')
})

export class ArticleEditSubmit {

  @Input() article;
  @Output() submitArticle = new EventEmitter();

  submit() {
    this.submitArticle.emit();
  }

  constructor() {
  }

  ngOnInit() {
  }
}
