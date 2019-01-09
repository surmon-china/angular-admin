/**
 * @file 菜单组件
 * @module app/component/menu
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { Router, Routes, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { AppState } from 'app/app.service';
import { SaMenuService } from './saMenu.service';
import { GlobalState } from 'app/global.state';

@Component({
  selector: 'sa-menu',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./saMenu.scss')],
  template: require('./saMenu.html'),
  providers: [SaMenuService]
})
export class SaMenuComponent implements OnInit, OnDestroy {

  @Input() menuRoutes: Routes = [];
  @Input() sidebarCollapsed = false;
  @Input() menuHeight: number;

  @Output() expandMenu = new EventEmitter<any>();

  public menuItems: any[];
  public showHoverElem: boolean;
  public hoverElemHeight: number;
  public hoverElemTop: number;
  public outOfArea = -200;
  protected onRouteChange: Subscription;

  constructor(private router: Router,
              private service: SaMenuService,
              private state: GlobalState,
              private appState: AppState) {
    this.onRouteChange = this.router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        if (this.menuItems) {
          this.selectMenuAndNotify();
        } else {
          setTimeout(() => this.selectMenuAndNotify());
        }
      }
    });
  }

  public selectMenuAndNotify(): void {
    if (this.menuItems) {
      this.menuItems = this.service.selectMenuItem(this.menuItems);
      this.state.notifyDataChanged('menu.activeLink', this.service.getCurrentItem());
    }
  }

  public ngOnInit(): void {
    this.menuItems = this.service.convertRoutesToMenus(this.menuRoutes);
  }

  public ngOnDestroy(): void {
    this.onRouteChange.unsubscribe();
  }

  public hoverItem($event): void {
    this.showHoverElem = true;
    this.hoverElemHeight = $event.currentTarget.clientHeight;
    this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 45;
  }

  public toggleSubMenu($event): boolean {

    if (this.sidebarCollapsed) {
      this.expandMenu.emit(null);

      if (!$event.item.expanded) {
        $event.item.expanded = true;
      }
    } else {
      // todo 缺少切换动画
      $event.item.expanded = !$event.item.expanded;
    }

    return false;
  }
}
