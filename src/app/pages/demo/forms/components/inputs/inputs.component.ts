/**
 * @file Demo Input 表单演示页面
 * @module app/page/demo/componennt/forms/input
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-inputs',
  encapsulation: ViewEncapsulation.None,
  template: require('./inputs.html'),
})
export class InputsComponent {

  constructor() {}
}
