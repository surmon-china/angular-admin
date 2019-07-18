/**
 * @file 主题加载服务
 * @desc app/services/theme-preloader
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class SaAppPreloaderService {

  private static loaders: Array<Promise<any>> = [];

  public static registerLoader(method: Promise<any>): void {
    SaAppPreloaderService.loaders.push(method);
  }

  public static clear(): void {
    SaAppPreloaderService.loaders = [];
  }

  public static load(): Promise<any> {
    return new Promise((resolve, reject) => {
      SaAppPreloaderService.executeAll(resolve);
    });
  }

  private static executeAll(done: () => any): void {
    setTimeout(() => {
      Promise.all(SaAppPreloaderService.loaders)
      .then(values => {
        done.call(null, values);
      }).catch(error => {
        console.error(error);
      });
    });
  }
}
