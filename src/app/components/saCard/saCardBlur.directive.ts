/**
 * @file 卡片指令
 * @module app/component/card-directive
 * @author Surmon <https://github.com/surmon-china>
 */

import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';
import { SaThemeConfigProvider } from 'app/theme';

import { SaCardBlurHelperService } from './saCardBlurHelper.service';
import { BgMetrics } from './bgMetrics';

@Directive({
  selector: '[saCardBlur]',
  providers: [SaCardBlurHelperService]
})
export class SaCardBlurDirective {

  @HostBinding('class.card-blur') isEnabled = false;

  private _bodyBgSize: BgMetrics;

  constructor(private _el: ElementRef,
              private _saConfig: SaThemeConfigProvider,
              private _saCardBlurHelper: SaCardBlurHelperService) {
    if (this._isEnabled()) {
      this._saCardBlurHelper.init();
      this._getBodyImageSizesOnBgLoad();
      this._recalculateCardStylesOnBgLoad();
      this.isEnabled = true;
    }
  }

  @HostListener('window:resize')
  _onWindowResize(): void {
    if (this._isEnabled()) {
      this._bodyBgSize = this._saCardBlurHelper.getBodyBgImageSizes();
      this._recalculateCardStyle();
    }
  }

  private _getBodyImageSizesOnBgLoad(): void {
    this._saCardBlurHelper.bodyBgLoad().subscribe(() => {
      this._bodyBgSize = this._saCardBlurHelper.getBodyBgImageSizes();
    });
  }

  private _recalculateCardStylesOnBgLoad(): void {
    this._saCardBlurHelper.bodyBgLoad().subscribe((event) => {
      setTimeout(this._recalculateCardStyle.bind(this));
    });
  }

  private _recalculateCardStyle(): void {
    if (!this._bodyBgSize) {
      return;
    }
    const sizeX = Math.round(this._bodyBgSize.width) + 'px ';
    const sizeY = Math.round(this._bodyBgSize.height) + 'px';
    this._el.nativeElement.style.backgroundSize = sizeX + sizeY;
    const positionX = Math.floor(this._bodyBgSize.positionX) + 'px ';
    const positionY = Math.floor(this._bodyBgSize.positionY) + 'px';
    this._el.nativeElement.style.backgroundPosition = positionX + positionY;
  }

  private _isEnabled() {
    return this._saConfig.get().theme.name === 'blur';
  }
}
