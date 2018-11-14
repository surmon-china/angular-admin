/**
 * @file 顶部条
 * @module app/component/page-top
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalState } from 'app/global.state';
import { AppState } from 'app/app.service';
import { TOKEN } from '@app/constants/auth';

type TCollapsedState = boolean;

@Component({
  selector: 'sa-page-top',
  styles: [require('./saPageTop.scss')],
  template: require('./saPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class SaPageTopComponent {

  public isScrolled: TCollapsedState = false;
  public isMenuCollapsed: TCollapsedState = false;
  public isProfileCollapsed: TCollapsedState = false;

  constructor(private _router: Router,
              private _state: GlobalState,
              private _appState: AppState) {
    this._state.subscribe('menu.isCollapsed', isCollapsed => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public logout() {
    console.log('退出系统');
    localStorage.removeItem(TOKEN);
    this._router.navigate(['/auth']);
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public toggleProfileMenu() {
    this.isProfileCollapsed = !this.isProfileCollapsed;
    return false;
  }

  public scrolledChanged(isScrolled: TCollapsedState) {
    this.isScrolled = isScrolled;
  }
}
