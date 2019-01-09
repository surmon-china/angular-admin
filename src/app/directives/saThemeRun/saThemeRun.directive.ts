/**
 * @file 主题指令
 * @module app/directives/theme-run
 * @author Surmon <https://github.com/surmon-china>
 */

import { Directive, HostBinding, OnInit } from '@angular/core';
import { SaThemeConfigProvider, isMobile } from 'app/theme';

@Directive({
  selector: '[saThemeRun]'
})
export class SaThemeRunDirective implements OnInit {

  private classes: Array<string> = [];
  @HostBinding('class') classesString: string;

  constructor(private saConfig: SaThemeConfigProvider) {}

  public ngOnInit(): void {
    this.assignTheme();
    this.assignMobile();
  }

  private assignTheme(): void {
    this.addClass(this.saConfig.get().theme.name);
  }

  private assignMobile(): void {
    if (isMobile()) {
      this.addClass('mobile');
    }
  }

  private addClass(cls: string) {
    this.classes.push(cls);
    this.classesString = this.classes.join(' ');
  }
}
