import { Component, Input } from '@angular/core';

@Component({
  selector: 'article-duoshuo',
  template: require('./duoshuo.html')
})

export class ArticleEditDuoshuo {
  @Input() duoshuo;

  constructor() {
  }

  ngOnInit() {
  }
}
