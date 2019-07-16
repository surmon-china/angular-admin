/**
 * @file 局部记载组件
 * @module app/component/loading-spider
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'sa-loading-spider',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./saLoadingSpider.component.scss'],
  template: `
  <div class="sa-loading-spider" [ngClass]="className">
    <div class="loader-mask"></div>
    <div class="loader-inner line-scale-pulse-out-rapid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
  `
})
export class SaLoadingSpiderComponent {

  @Input() type = 400;
  @Input() show = false;

  get className() {
    return this.show ? 'flex' : 'none';
  }
}
