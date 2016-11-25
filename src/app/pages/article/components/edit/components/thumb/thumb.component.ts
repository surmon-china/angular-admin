import { Component, Input } from '@angular/core';

@Component({
  selector: 'article-thumb',
  template: require('./thumb.html')
})

export class ArticleEditThumb {

  @Input() articleThumb;

  public defaultThumb = 'assets/img/theme/no-photo.png';
  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };

  constructor() {
  }

  ngOnInit() {
  }
}
