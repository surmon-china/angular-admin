/**
 * @file 时间本地化处理管道符
 * @desc app/pipes/date-handle
 * @author Surmon <https://github.com/surmon-china>
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'dataToLocale' })
export class DataToLocalePipe implements PipeTransform {

  transform(input: any): string {
    const date = new Date(input);
    const ymd = date.toLocaleDateString().replace(/\//ig, '-');
    const timeString = date.toLocaleTimeString();
    const time = timeString.slice(0, timeString.length - 3);
    return `${ymd} ${time}`
  }
}
