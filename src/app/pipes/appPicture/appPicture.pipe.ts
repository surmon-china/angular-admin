/**
 * @file 获取图片管道符
 * @desc app/pipes/app-picture
 * @author Surmon <https://github.com/surmon-china>
 */

import { Pipe, PipeTransform } from '@angular/core';
import { ASSETS_IMAGE } from '@app/constants/url';

@Pipe({ name: 'appPicture' })
export class AppPicturePipe implements PipeTransform {

  transform(input: string): string {
    return ASSETS_IMAGE + input;
  }
}
