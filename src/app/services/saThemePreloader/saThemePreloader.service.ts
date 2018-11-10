/**
 * @file 主题加载服务
 * @module app/services/theme-preloader
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class SaThemePreloaderService {

  private static _loaders: Array<Promise<any>> = [];

  public static registerLoader(method: Promise<any>): void {
    SaThemePreloaderService._loaders.push(method);
  }

  public static clear(): void {
    SaThemePreloaderService._loaders = [];
  }

  public static load(): Promise<any> {
    return new Promise((resolve, reject) => {
      SaThemePreloaderService._executeAll(resolve);
    });
  }

  private static _executeAll(done: Function): void {
    setTimeout(() => {
      Promise.all(SaThemePreloaderService._loaders)
      .then(values => {
        done.call(null, values);
      }).catch(error => {
        console.error(error);
      });
    });
  }
}
