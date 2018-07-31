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
      if(!Object.is(url, '/') && !Object.is(url, '/auth')) {
        this.routeCheck();
      }
    });
  }

  // 初始化时拉取全局设置
  public initAppOptions():void {
    this.optionIsInited = true;
    this._apiService.get('/option')
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

  // 路由检查
  routeCheck() {
    // 如果 token 不存在 或 存在不合法，则拦截路由
    if(!checkTokenIsOk()) {
      localStorage.removeItem('id_token');
      setTimeout(() => {
        this._notificationsService.error('误闯禁地', '...', { timeOut: 1000 });
        this._router.navigate(['/auth']);
      }, 0);
    } else if (!this.optionIsInited) {
      this.initAppOptions();
      // 因为检查 token 无效后没有删除 Token，所以如果这里跳首页，会导致无限循环
    }
  }
  
  // 初始化时重置路由
  ngOnInit() {
    this.routeCheck();
  }
}
