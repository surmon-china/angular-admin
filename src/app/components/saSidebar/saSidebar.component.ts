/**
 * @file 侧边栏菜单组件
 * @module app/componennt/sidebar
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ElementRef, HostListener, ViewEncapsulation, OnInit, AfterViewInit } from '@angular/core';
import { GlobalState } from 'app/global.state';
import { layoutSizes } from 'app/theme';
import { MENU } from 'app/app.menu';
import * as lodash from 'lodash';

@Component({
  selector: 'sa-sidebar',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./saSidebar.scss')],
  template: require('./saSidebar.html')
})
export class SaSidebarComponent implements OnInit, AfterViewInit {

  public routes = lodash.cloneDeep(MENU);
  public menuHeight: number;
  public isMenuCollapsed: boolean = false;
  public isMenuShouldCollapsed: boolean = false;

  constructor(private _elementRef: ElementRef, private _state: GlobalState) {
    this._state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngOnInit(): void {
    if (this._shouldMenuCollapse()) {
      this.menuCollapse();
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.updateSidebarHeight());
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    const isMenuShouldCollapsed = this._shouldMenuCollapse();
    if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
      this.menuCollapseStateChange(isMenuShouldCollapsed);
    }
    this.isMenuShouldCollapsed = isMenuShouldCollapsed;
    this.updateSidebarHeight();
  }

  public menuExpand(): void {
    this.menuCollapseStateChange(false);
  }

  public menuCollapse(): void {
    this.menuCollapseStateChange(true);
  }

  public menuCollapseStateChange(isCollapsed: boolean): void {
    this.isMenuCollapsed = isCollapsed;
    this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public updateSidebarHeight(): void {
    this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 215;
  }

  private _shouldMenuCollapse(): boolean {
    return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
  }
}
