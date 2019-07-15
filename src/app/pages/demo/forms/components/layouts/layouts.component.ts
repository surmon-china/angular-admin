/**
 * @file Demo Layout 表单演示页面
 * @module app/page/demo/component/forms/layout
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-layouts',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  templateUrl: './layouts.html',
})
export class LayoutsComponent {

  public picture = 'assets/images/theme/no-photo.png';

  constructor() {}
}
