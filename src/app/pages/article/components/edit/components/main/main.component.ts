import { Component, Input } from '@angular/core';

import './main.loader.ts';

@Component({
  selector: 'article-edit-main',
  template: require('./main.html')
})
export class ArticleEditMain {

  @Input() article;

  // 编辑器配置
  public ckeditorConfig = {
    uiColor: '#F0F3F4',
    height: '600'
  }

  constructor() {
  }

  ngOnInit() {
  }
}
