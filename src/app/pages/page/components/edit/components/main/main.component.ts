import { Component, Input } from '@angular/core';

import './main.loader.ts';

@Component({
  selector: 'page-edit-main',
  template: require('./main.html')
})
export class PageEditMain {

  @Input() page;

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
