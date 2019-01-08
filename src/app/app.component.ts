/**
 * @file App 顶级入口组件
 * @module app.component
 * @author Surmon <https://github.com/surmon-china>
 */

import { Router } from '@angular/router';
import { Component, ViewEncapsulation, AfterViewInit, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { GlobalState } from '@app/global.state';
import { layoutPaths } from '@app/theme/theme.constants';
import { SaThemeConfig } from '@app/theme/theme.config';
import { SaImageLoaderService, SaThemePreloaderService, SaThemeSpinnerService, SaHttpRequesterService } from '@app/services';
import { AppState } from '@app/app.service';
import { TOKEN } from '@app/constants/auth';
import { NO_PERMISSION } from '@/app/constants/http';
import { checkTokenIsOk } from '@app/discriminators/token';
import { isIndexPage, isAuthPage, isDashboardPage } from '@app/discriminators/url';
import * as API_PATH from '@app/constants/api';

type TMenuCollapsedState = boolean;

@Component({
  selector: 'app-admin',
  encapsulation: ViewEncapsulation.None,
  styles: [
    require('normalize.css'),
    require('./theme/initial.scss'),
    require('./app.scss')
  ],
  template: `
    <main [ngClass]="_isMenuCollapsed ? 'menu-collapsed': ''" saThemeRun>
      <ngx-loading-bar color="#017170" height="4px" diameter="20px"></ngx-loading-bar>
      <simple-notifications [options]="notificationsOptions"></simple-notifications>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `,
  providers: [AppState]
})
export class AppComponent implements AfterViewInit, OnInit {

  private _isOptionInited = false;
  private _isMenuCollapsed: TMenuCollapsedState = false;

  constructor(
    private _state: GlobalState,
    private _appState: AppState,
    private _router: Router,
    private _config: SaThemeConfig,
    private _spinner: SaThemeSpinnerService,
    private _imageLoader: SaImageLoaderService,
    private _httpService: SaHttpRequesterService,
    private _notificationsService: NotificationsService) {

    // 初始化加载图片
    this._loadImages();

    // 订阅菜单折叠事件
    this._state.subscribe('menu.isCollapsed', (isCollapsed: TMenuCollapsedState): void => {
      setTimeout(() => {
        this._isMenuCollapsed = isCollapsed;
      }, 0);
    });

    // 路由拦截器
    this._router.events.subscribe(event => {

      const url: string = this._router.url;

      // 如果是发生登录事件，则拉取初始化信息
      if (isDashboardPage(url) &&
         (event as any).navigationTrigger &&
         (event as any).navigationTrigger === 'imperative') {
        this.initAppOptions();
      }

      // 如果发生 非首页或登陆页 的跳转事件，则执行 Token 全面检查
      if (!isIndexPage(url) && !isAuthPage(url) && !checkTokenIsOk()) {
        this.remiveTokenToLogin();
      }
    });
  }

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

  // 删除 Token 并跳转到登陆页
  public remiveTokenToLogin(): void {
    localStorage.removeItem(TOKEN);
    setTimeout(() => {
      this._notificationsService.error('久违', '...', { timeOut: 1000 });
      this._router.navigate(['/auth']);
    }, 0);
  }

  // 初始化时拉取全局设置
  public initAppOptions(): void {
    if (this._isOptionInited) {
      return;
    }
    this._isOptionInited = true;
    this._httpService
      .get(API_PATH.ADMIN_INFO)
      .then(({ result: adminInfo }) => {
        if (Object.keys(adminInfo).length) {
          this._appState.set('adminInfo', adminInfo);
        }
      })
      .catch(error => {
        if (error.status === NO_PERMISSION) {
          this._router.navigate(['/auth']);
        }
      });
  }

  // 初始化根据服务端验证 Token 有效性
  public checkTokenValidity(): void  {
    this._httpService.post(API_PATH.CHECK_TOKEN)
    .then(({ result: tokenIsValidity }) => {
      console.log('远程 Token 验证结果：', tokenIsValidity);
      // 通过验证，则初始化 APP
      tokenIsValidity
        ? this.initAppOptions()
        : this.remiveTokenToLogin();
    })
    .catch(error => {
      console.warn('Token 被验证是无效的，跳登陆页', error);
      this.remiveTokenToLogin();
    });
  }

  private _loadImages(): void {
    // register some loaders
    const imageLoaer = this._imageLoader.load(layoutPaths.images.root + 'background.jpg');
    SaThemePreloaderService.registerLoader(imageLoaer);
  }

  // 程序初始化，关闭加载状态
  ngAfterViewInit() {
    SaThemePreloaderService.load().then(_ => {
      this._spinner.hide();
    });
  }

  // 初始化时重置路由
  ngOnInit() {
    // 程序初始化时检查本地 Token
    checkTokenIsOk()
      ? this.checkTokenValidity()
      : this.remiveTokenToLogin();
  }
}
