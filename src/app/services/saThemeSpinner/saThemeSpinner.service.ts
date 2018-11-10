/**
 * @file 主题预加载状态服务
 * @module app/services/theme-spinner
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class SaThemeSpinnerService {

  private _element: HTMLElement;
  private _selector: string = 'preloader';

  constructor() {
    this._element = document.getElementById(this._selector);
  }

  public show(): void {
    this._element.style.display = 'block';
  }

  public hide(delay: number = 0): void {
    setTimeout(() => {
      if (this._element) {
        this._element.style.display = 'none';
      }
    }, delay);
  }
}
