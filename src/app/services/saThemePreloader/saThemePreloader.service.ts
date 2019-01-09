/**
 * @file 主题加载服务
 * @module app/services/theme-preloader
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class SaThemePreloaderService {

  private static loaders: Array<Promise<any>> = [];

  public static registerLoader(method: Promise<any>): void {
    SaThemePreloaderService.loaders.push(method);
  }

  public static clear(): void {
    SaThemePreloaderService.loaders = [];
  }

  public static load(): Promise<any> {
    return new Promise((resolve, reject) => {
      SaThemePreloaderService.executeAll(resolve);
    });
  }

  private static executeAll(done: Function): void {
    setTimeout(() => {
      Promise.all(SaThemePreloaderService.loaders)
      .then(values => {
        done.call(null, values);
      }).catch(error => {
        console.error(error);
      });
    });
  }
}
