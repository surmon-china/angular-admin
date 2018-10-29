/**
 * @file 局部记载组件
 * @module app/component/loading-spider
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, AfterViewInit, ViewChild, HostListener, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'sa-loading-spider',
  styles: [require('./saLoadingSpider.scss')],
  template: `<div #loadingSpider class="sa-loading-spider [ngStyle]="{ display: show ? 'block' : 'none' }"></div>`
})
export class SaLoadingSpiderComponent implements AfterViewInit {

  @Input() type = 400;
  @Input() show = false;

  @ViewChild('loadingSpider') private _loadingSpider: ElementRef;

  ngAfterViewInit () {
    console.log('加载动画就行了', this._loadingSpider);
  }
}
