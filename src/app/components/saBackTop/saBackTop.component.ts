/**
 * @file 返回顶部组件
 * @desc app/component/back-top
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, AfterViewInit, HostListener, Input } from '@angular/core';

@Component({
  selector: 'sa-back-top',
  styleUrls: ['./saBackTop.component.scss'],
  template: `
    <span
      #baBackTop
      title="返回顶部"
      class="back-cover-top sa-back-top"
      [ngStyle]="{ display: isShow ? 'inline-flex' : 'none' }"
    >
      <ion-icon class="icon" name="caret-up"></ion-icon>
    </span>
  `
})
export class SaBackTopComponent implements AfterViewInit {

  public isShow = false;

  @Input() position = 400;
  @Input() showSpeed = 500;
  @Input() moveSpeed = 1000;

  ngAfterViewInit() {
    setTimeout(() => {
      this.onWindowScroll();
    });
  }

  @HostListener('click')
  onClick(): boolean {
    window.scrollTo(0, 0);
    return false;
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isShow = window.scrollY > this.position;
  }
}
