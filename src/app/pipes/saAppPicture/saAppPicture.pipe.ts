/**
 * @file 获取图片管道符
 * @module app/pipes/app-picture
 * @author Surmon <https://github.com/surmon-china>
 */

import { Pipe, PipeTransform } from '@angular/core';
import { ASSETS_IMAGE } from '@app/constants/url';

@Pipe({ name: 'saAppPicture' })
export class SaAppPicturePipe implements PipeTransform {

  transform(input: string): string {
    return ASSETS_IMAGE + input;
  }
}
