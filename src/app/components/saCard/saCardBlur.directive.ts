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

  private bodyBgSize: BgMetrics;

  constructor(
    private el: ElementRef,
    private saConfig: SaThemeConfigProvider,
    private saCardBlurHelper: SaCardBlurHelperService
  ) {
    if (this.getEnabledState()) {
      this.saCardBlurHelper.init();
      this.getBodyImageSizesOnBgLoad();
      this.recalculateCardStylesOnBgLoad();
      this.isEnabled = true;
    }
  }

  @HostListener('window:resize')
  _onWindowResize(): void {
    if (this.getEnabledState()) {
      this.bodyBgSize = this.saCardBlurHelper.getBodyBgImageSizes();
      this.recalculateCardStyle();
    }
  }

  private getBodyImageSizesOnBgLoad(): void {
    this.saCardBlurHelper.bodyBgLoad().subscribe(() => {
      this.bodyBgSize = this.saCardBlurHelper.getBodyBgImageSizes();
    });
  }

  private recalculateCardStylesOnBgLoad(): void {
    this.saCardBlurHelper.bodyBgLoad().subscribe((event) => {
      setTimeout(this.recalculateCardStyle.bind(this));
    });
  }

  private recalculateCardStyle(): void {
    if (!this.bodyBgSize) {
      return;
    }
    const sizeX = Math.round(this.bodyBgSize.width) + 'px ';
    const sizeY = Math.round(this.bodyBgSize.height) + 'px';
    this.el.nativeElement.style.backgroundSize = sizeX + sizeY;
    const positionX = Math.floor(this.bodyBgSize.positionX) + 'px ';
    const positionY = Math.floor(this.bodyBgSize.positionY) + 'px';
    this.el.nativeElement.style.backgroundPosition = positionX + positionY;
  }

  private getEnabledState() {
    return this.saConfig.get().theme.name === 'blur';
  }
}
