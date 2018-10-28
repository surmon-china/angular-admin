/**
 * @file 返回顶部组件
 * @module app/component/back-top
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, AfterViewInit, ViewChild, HostListener, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'sa-back-top',
  styles: [require('./saBackTop.scss')],
  template: `
    <i #baBackTop
       class="back-top sa-back-top ion-md-arrow-up"
       title="Back to Top"
       [ngStyle]="{ display: isShow ? 'block' : 'none' }"></i>
  `
})
export class SaBackTopComponent implements AfterViewInit {

  public isShow = false;

  @Input() position = 400;
  @Input() showSpeed = 500;
  @Input() moveSpeed = 1000;

  @ViewChild('baBackTop') private _selector: ElementRef;

  ngAfterViewInit () {
    this.onWindowScroll();
  }

  @HostListener('click')
  onClick(): boolean {
    window.scrollTo(0, 0);
    return false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const el = this._selector.nativeElement;
    this.isShow = window.scrollY > this.position;
  }
}
