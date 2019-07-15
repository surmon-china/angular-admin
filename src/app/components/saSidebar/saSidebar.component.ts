/**
 * @file 侧边栏菜单组件
 * @module app/component/sidebar
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
  styleUrls: ['./saSidebar.scss'],
  templateUrl: './saSidebar.html'
})
export class SaSidebarComponent implements OnInit, AfterViewInit {

  public routes = lodash.cloneDeep(MENU);
  public menuHeight: number;
  public isMenuCollapsed = false;
  public isMenuShouldCollapsed = false;

  constructor(private elementRef: ElementRef, private state: GlobalState) {
    this.state.subscribe('menu.isCollapsed', (isCollapsed: boolean) => {
      this.isMenuCollapsed = isCollapsed;
    });
  }

  public ngOnInit(): void {
    if (this.shouldMenuCollapse()) {
      this.menuCollapse();
    }
  }

  public ngAfterViewInit(): void {
    setTimeout(() => this.updateSidebarHeight());
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    const isMenuShouldCollapsed = this.shouldMenuCollapse();
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
    this.state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
  }

  public updateSidebarHeight(): void {
    this.menuHeight = this.elementRef.nativeElement.childNodes[0].clientHeight - 215;
  }

  private shouldMenuCollapse(): boolean {
    return window.innerWidth <= layoutSizes.resWidthCollapseSidebar;
  }
}
