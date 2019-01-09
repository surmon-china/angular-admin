/**
 * @file 顶部条
 * @module app/component/page-top
 * @author Surmon <https://github.com/surmon-china>
 */

import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
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

  constructor(
    private router: Router,
    private state: GlobalState,
    private appState: AppState
  ) {
    this.state.subscribe('menu.isCollapsed', isCollapsed => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public logout() {
    console.log('退出系统');
    localStorage.removeItem(TOKEN);
    this.router.navigate(['/auth']);
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
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
