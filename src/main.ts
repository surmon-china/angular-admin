/**
 * @file 主程序入口文件
 * @module main
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModuleRef, ApplicationRef, enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { createNewHosts } from '@angularclass/hmr';

import { AppModule } from './app/app.module';
import { environment, api } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

console.log('系统启动中...');

function bootstrap() {
  return platformBrowserDynamic().bootstrapModule(AppModule);
}

function handleBootstrap(promise: Promise<any>, isHmr?: boolean) {
  promise.then(() => {
    const env = environment.production ? '生产' : '开发';
    console.info(`系统启动成功！当前运行环境是：${env}环境，${isHmr ? '已' : '未'}开启 Hmr，API 为：`, api);
  }).catch(error => {
    console.warn('系统启动失败！', error);
  });
}

if (environment.hmr && (module as any).hot) {
  let ngModule: NgModuleRef<any>;
  (module as any).hot.accept();

  handleBootstrap(
    bootstrap().then(mod => {
      ngModule = mod;
      return mod;
    }),
    true
  );

  (module as any).hot.dispose(() => {
    const appRef: ApplicationRef = ngModule.injector.get(ApplicationRef);
    const elements = appRef.components.map(c => c.location.nativeElement);
    const makeVisible = createNewHosts(elements);
    ngModule.destroy();
    makeVisible();
  });
} else {
  handleBootstrap(bootstrap());
}
