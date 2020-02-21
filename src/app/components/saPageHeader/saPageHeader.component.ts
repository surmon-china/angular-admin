/**
 * @file 顶部条
 * @desc app/component/page-header
 * @author Surmon <https://github.com/surmon-china>
 */

import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalState } from 'app/global.state';
import { AppState } from 'app/app.service';
import { SaTokenService } from 'app/services';
import { APP_TITLE } from '@/config';

type TCollapsedState = boolean;

@Component({
  selector: 'sa-page-header',
  styleUrls: ['./saPageHeader.component.scss'],
  templateUrl: './saPageHeader.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SaPageHeaderComponent {

  public APP_TITLE = APP_TITLE;

  public isScrolled: TCollapsedState = false;
  public isMenuCollapsed: TCollapsedState = false;

  constructor(
    private router: Router,
    private state: GlobalState,
    readonly appState: AppState,
    readonly tokenService: SaTokenService
  ) {
    this.state.subscribe('menu.isCollapsed', isCollapsed => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public logout() {
    console.log('退出系统');
    this.tokenService.removeToken();
    this.router.navigate(['/auth']);
  }

  public toggleMenu() {
    this.isMenuCollapsed = !this.isMenuCollapsed;
    this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    return false;
  }

  public scrolledChanged(isScrolled: TCollapsedState) {
    this.isScrolled = isScrolled;
  }
}
