/**
 * @file 仪表盘页面组件
 * @module app/page/dashboard/componennt
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class DashboardComponent {

  constructor() {}
}
