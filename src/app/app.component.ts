import './app.loader.ts';
import { Component, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { GlobalState } from './global.state';
import { BaImageLoaderService, BaThemePreloader, BaThemeSpinner } from './theme/services';
import { layoutPaths } from './theme/theme.constants';
import { BaThemeConfig } from './theme/theme.config';
import { NotificationsService } from 'angular2-notifications';
import { tokenNotExpired } from 'angular2-jwt';
import { Router } from '@angular/router';

import { AppState } from './app.service';
import { OptionsService } from './pages/options/options.service';
/*
 * 顶级入口组件
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styles: [require('normalize.css'), require('./app.scss')],
  template: `
    <main [ngClass]="{'menu-collapsed': isMenuCollapsed}" baThemeRun>
      <simple-notifications [options]="notificationsOptions"></simple-notifications>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
  `,
  providers: [OptionsService, AppState]
})
export class App {

  isMenuCollapsed: boolean = false;
  optionIsInited: boolean = false;

  constructor(private _state: GlobalState,
              private _appState: AppState,
              private _optionsService: OptionsService,
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
    this._router.events.subscribe((event) => {
      const url = this._router.url;
      if(!Object.is(url, '/') && !Object.is(url, '/auth')) {
        this.routeCheck();
      }
    });
  }

  // 初始化时拉取全局设置
  public initAppOptions():void {
    this.optionIsInited = true;
    this._optionsService.getUserAuth()
    .then(({ result: adminInfo }) => {
      this._appState.set('adminInfo', adminInfo);
    })
    .catch(error => {});
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
    BaThemePreloader.registerLoader(this._imageLoader.load(layoutPaths.images.root + 'sky-bg.jpg'));
  }

  loggedIn() {
    return tokenNotExpired();
  }

  // 路由检查
  routeCheck() {
    if(!this.loggedIn()) {
      setTimeout(() => {
        this._notificationsService.error('误闯禁地', '...', { timeOut: 1000 });
        this._router.navigate(['/auth']);
      }, 0);
    } else if (!this.optionIsInited) {
      this.initAppOptions();
    }
  }
  
  // 初始化时重置路由
  ngOnInit() {
    this.routeCheck();
  }
}
