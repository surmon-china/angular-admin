/**
 * @file 主程序入口文件
 * @desc main
 * @author Surmon <https://github.com/surmon-china>
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment, api } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.info('系统启动中...');

platformBrowserDynamic().bootstrapModule(AppModule).then(() => {
  console.info(`系统启动成功！当前运行环境是：${environment.production ? '生产' : '开发'}环境，API 为：`, api);
}).catch(error => {
  console.warn('系统启动失败！', error);
});
