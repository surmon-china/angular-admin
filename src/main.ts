/**
 * @file 主程序入口文件
 * @module main
 * @author Surmon <https://github.com/surmon-china>
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';
import { environment, api } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('系统启动中...');

platformBrowserDynamic().bootstrapModule(AppModule)
.then(app => {
  const env = environment.production ? '生产' : '开发';
  console.log('系统启动成功！当前运行环境是：', env + '环境，API 为：', api, app);
})
.catch(err => {
  console.warn('系统启动失败！', err);
});
