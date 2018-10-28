/**
 * @file 服务器管理页面组件
 * @module app/page/linux/componennt
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-linux',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./linux.scss')],
  template: require('./linux.html'),
})
export class LinuxComponent {}
