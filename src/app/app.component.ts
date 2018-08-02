import { Router } from '@angular/router';
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';

import { NotificationsService } from 'angular2-notifications';

import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './services';
import { layoutPaths } from './theme/theme.constants';
import { BaThemeConfig } from './theme/theme.config';

import { AppState } from './app.service';
import { checkTokenIsOk } from './token.service';
import { ApiService } from '@app/api.service';

/*
 * 顶级入口组件
 */
 
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./theme/initial.scss'), require('./app.scss')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <simple-notifications [options]="notificationsOptions"></simple-notifications>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `,
  providers: [AppState]
})
export class App {

  isMenuCollapsed: boolean = false;
  optionIsInited: boolean = false;

  constructor(private _state: GlobalState,
              private _appState: AppState,
              private _apiService: ApiService,
              private _router: Router,
              private _config: BaThemeConfig,
              private _spinner: BaThemeSpinner,
              private _imageLoader: BaImageLoaderService,
              private viewContainerRef: ViewContainerRef,
              private _notificationsService: NotificationsService) {

    this._loadImages();

    this._state.subscribe('menu.isCollapsed', (isCollapsed) => {
      this.isMenuCollapsed = isCollapsed;
    });

    // 路由拦截器
    this._router.events.subscribe(event => {
      const url = this._router.url;
      // 如果是发生登录事件，则拉取初始化信息
      if (Object.is(url, '/dashboard') &&
          (<any>event).navigationTrigger &&
          Object.is((<any>event).navigationTrigger, 'imperative')) {
        this.initAppOptions();
      }
      // 如果发生非首页或登陆页的跳转事件，则执行 Token 全面检查
      if (!Object.is(url, '/') && !Object.is(url, '/auth')) {
        if (!checkTokenIsOk()) {
          this.remiveTokenToLogin();
        }
      }
    });
  }

  // 删除 Token 并跳转到登陆页
  public remiveTokenToLogin():void {
    localStorage.removeItem('id_token');
    setTimeout(() => {
      this._notificationsService.error('误闯禁地', '...', { timeOut: 1000 });
      this._router.navigate(['/auth']);
    }, 0);
  }

  // 初始化时拉取全局设置
  public initAppOptions():void {
    if (!this.optionIsInited) {
      this.optionIsInited = true;
      this._apiService.get('/auth')
      .then(({ result: adminInfo }) => {
        if(Object.keys(adminInfo).length) {
          this._appState.set('adminInfo', adminInfo);
        }
      })
      .catch(error => {
        if(Object.is(error.status, 403)) {
          this._router.navigate(['/auth']);
        }
      });
    }
  }

  // 初始化根据服务端验证 Token 有效性
  public checkTokenValidity():void  {
    this._apiService.patch('/auth')
    .then(({ result: tokenIsValidity }) => {
      console.log('远程 Token 验证结果：', tokenIsValidity);
      // 通过验证，则初始化 APP
      if (tokenIsValidity) {
        this.initAppOptions();
      } else {
        // 否则依然去登陆
        this.remiveTokenToLogin();
      }
    })
    .catch(error => {
      console.warn('Token 被验证是无效的，跳登陆页', error);
      this.remiveTokenToLogin();
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

  // 程序初始化，关闭加载状态
  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    BaThemePreloader.load().then((values) => {
      this._spinner.hide();
    });
  }

  private _loadImages(): void {
    // register some loaders
    const imageLoaer = this._imageLoader.load(layoutPaths.images.root + 'background.jpg');
    BaThemePreloader.registerLoader(imageLoaer);
  }
  
  // 初始化时重置路由
  ngOnInit() {
    // 程序初始化时检查本地 Token
    if (!checkTokenIsOk()) {
      this.remiveTokenToLogin();
    // 如果本地检查通过，则通过服务端检查有效性
    } else {
      this.checkTokenValidity();
    }
  }
}
