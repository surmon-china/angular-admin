/**
 * @file 主题指令
 * @module app/directives/theme-run
 * @author Surmon <https://github.com/surmon-china>
 */

import { Directive, HostBinding, OnInit } from '@angular/core';
import { SaThemeConfigProvider, isMobile } from '../../theme';

@Directive({
  selector: '[saThemeRun]'
})
export class SaThemeRunDirective implements OnInit {

  private _classes: Array<string> = [];
  @HostBinding('class') classesString: string;

  constructor(private _saConfig: SaThemeConfigProvider) {}

  public ngOnInit(): void {
    this._assignTheme();
    this._assignMobile();
  }

  private _assignTheme(): void {
    this._addClass(this._saConfig.get().theme.name);
  }

  private _assignMobile(): void {
    if (isMobile()) {
      this._addClass('mobile');
    }
  }

  private _addClass(cls: string) {
    this._classes.push(cls);
    this.classesString = this._classes.join(' ');
  }
}
