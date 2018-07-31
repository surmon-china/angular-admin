import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { GlobalState } from 'app/global.state';
import { AppState } from 'app/app.service';

@Component({
  selector: 'ba-page-top',
  styles: [require('./baPageTop.scss')],
  template: require('./baPageTop.html'),
  encapsulation: ViewEncapsulation.None
})
export class BaPageTop {

  public isScrolled:boolean = false;
  public isMenuCollapsed:boolean = false;
  public isProfileCollapsed:boolean = false;

  constructor(private _router: Router,
              private _state:GlobalState,
              private _appState:AppState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public logout() {
    console.log('退出系统');
    localStorage.removeItem('id_token');
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

  public scrolledChanged(isScrolled) {
    this.isScrolled = isScrolled;
  }
}
