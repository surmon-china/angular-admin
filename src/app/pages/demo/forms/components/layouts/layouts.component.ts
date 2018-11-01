/**
 * @file Demo Layout 表单演示页面
 * @module app/page/demo/componennt/forms/layout
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-layouts',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: require('./layouts.html'),
})
export class LayoutsComponent {

  public picture = 'assets/img/theme/no-photo.png';

  constructor() {}
}
