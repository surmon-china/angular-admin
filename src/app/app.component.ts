/**
 * @file App 顶级入口组件
 * @desc app.component
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { Router } from '@angular/router';
import { Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { SaBootingSpinnerService, SaHttpRequesterService, SaTokenService, SaRenewalService } from '@app/services';
import { GlobalState } from '@app/global.state';
import { AppState, EAppStoreKeys } from '@app/app.service';
import { isIndexPage, isAuthPage } from '@app/discriminators/url';

type TMenuCollapsedState = boolean;

@Component({
  selector: 'app-admin',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./styles/app.scss'],
  template: `
    <main [ngClass]="isMenuCollapsed ? 'menu-collapsed': ''">
      <ngx-loading-bar color="#017170" height="4px" diameter="20px"></ngx-loading-bar>
      <simple-notifications [options]="notificationsOptions"></simple-notifications>
      <router-outlet></router-outlet>
    </main>
  `,
  providers: [AppState]
})
export class AppComponent implements AfterViewInit, OnInit {

  public isMenuCollapsed: TMenuCollapsedState = false;

  // 通知配置
  public notificationsOptions = {
    position: ['top', 'right'],
    timeOut: 300,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 5,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: false
  };

  constructor(
    private state: GlobalState,
    private appState: AppState,
    private router: Router,
    private tokenService: SaTokenService,
    private renewalService: SaRenewalService,
    private httpService: SaHttpRequesterService,
    private spinnerService: SaBootingSpinnerService,
    private notificationsService: NotificationsService
  ) {

    // 订阅菜单折叠事件
    this.state.subscribe('menu.isCollapsed', (isCollapsed: TMenuCollapsedState): void => {
      setTimeout(() => {
        this.isMenuCollapsed = isCollapsed;
      }, 0);
    });

    // 路由拦截器
    this.router.events.subscribe(event => {
      const url: string = this.router.url;
      // 如果发生 非首页或登陆页 的跳转事件，则执行 Token 全面检查
      if (!isIndexPage(url) && !isAuthPage(url) && !this.tokenService.isTokenValid()) {
        this.remiveTokenToLogin();
      }
    });
  }

  // 删除 Token 并跳转到登陆页
  public remiveTokenToLogin(): void {
    this.tokenService.removeToken();
    setTimeout(() => {
      this.notificationsService.error('久违', '...', { timeOut: 1000 });
      this.router.navigate(['/auth']);
    }, 0);
  }

  // 初始化时拉取全局设置
  public initAppOptions(): Promise<void> {
    return this.httpService
      .get(API_PATH.ADMIN_INFO)
      .then(({ result: adminInfo }) => {
        if (Object.keys(adminInfo).length) {
          this.appState.set(EAppStoreKeys.AdminInfo, adminInfo);
        }
      });
  }

  // 初始化根据服务端验证 Token 有效性
  public checkTokenValidity(): void  {
    this.httpService
      .post(API_PATH.CHECK_TOKEN)
      .then(_ => {
        // 通过验证，则初始化 APP
        console.info('远程 Token 验证成功，正常工作');
        this.initAppOptions();
        this.renewalService.autoRun();
      })
      .catch(error => {
        console.warn('Token 被验证是无效的，跳登陆页', error);
        this.remiveTokenToLogin();
      });
  }

  // 程序初始化，关闭加载状态
  ngAfterViewInit() {
    this.spinnerService.hide();
  }

  // 初始化时重置路由
  ngOnInit() {
    // 程序初始化时检查本地 Token
    this.tokenService.isTokenValid()
      ? this.checkTokenValidity()
      : this.remiveTokenToLogin();
  }
}
