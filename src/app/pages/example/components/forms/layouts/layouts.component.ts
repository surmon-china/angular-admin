/**
 * @file Demo Layout 表单演示页面
 * @desc app/page/demo/component/forms/layout
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-layouts',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  templateUrl: './layouts.component.html',
})
export class FormLayoutsComponent {

  public picture = 'assets/images/profile/no-photo.png';

  constructor() {}
}
