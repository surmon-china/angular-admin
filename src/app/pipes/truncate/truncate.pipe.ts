/**
 * @file 字节超出隐藏管道符
 * @desc app/pipes/truncate
 * @author Surmon <https://github.com/surmon-china>
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: any = 10, trail: string = '...'): string {
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}
