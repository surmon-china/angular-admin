import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('系统启动中...');

platformBrowserDynamic()
.bootstrapModule(AppModule)
.then(app => {
  console.log('系统启动成功！当前运行环境是：', environment.production ? '生产' : '开发' + '环境', app);
})
.catch(err => {
  console.warn('系统启动失败！', err);
});
