/**
 * @file 局部记载组件
 * @module app/component/loading-spider
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, AfterViewInit, ViewChild, ViewEncapsulation, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'sa-loading-spider',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./saLoadingSpider.scss')],
  template: `
  <div #loadingSpider class="sa-loading-spider" [ngClass]="className">
    <div class="loader-mask"></div>
    <div class="loader-inner line-scale-pulse-out-rapid">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>`
})
export class SaLoadingSpiderComponent implements AfterViewInit {

  @Input() type = 400;
  @Input() show = false;

  @ViewChild('loadingSpider') private _loadingSpider: ElementRef;

  get className() {
    return this.show ? 'flex' : 'none';
  }

  ngAfterViewInit () {
    // console.log('加载动画就行了', this._loadingSpider);
  }
}
