import { Component, Input } from '@angular/core';

@Component({
  selector: 'article-edit-main',
  template: require('./main.html')
})
export class ArticleEditMain {

  @Input() article;

  constructor() {
  }

  ngOnInit() {
  }
}
