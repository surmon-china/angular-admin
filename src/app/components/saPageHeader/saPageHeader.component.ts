/**
 * @file 顶部条
 * @desc app/component/page-header
 * @author Surmon <https://github.com/surmon-china>
 */

import { Router } from '@angular/router';
import { Component, ViewEncapsulation } from '@angular/core';
import { GlobalState } from 'app/global.state';
import { AppState } from 'app/app.service';
import { TOKEN } from '@app/constants/auth';
import { APP_TITLE } from '@/config';

type TCollapsedState = boolean;

@Component({
  selector: 'sa-page-header',
  styleUrls: ['./saPageHeader.component.scss'],
  templateUrl: './saPageHeader.component.html',
  encapsulation: ViewEncapsulation.None
})
export class SaPageHeaderComponent {

  private APP_TITLE = APP_TITLE;

  public isScrolled: TCollapsedState = false;
  public isMenuCollapsed: TCollapsedState = false;

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

  public scrolledChanged(isScrolled: TCollapsedState) {
    this.isScrolled = isScrolled;
  }
}
