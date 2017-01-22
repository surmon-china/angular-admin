import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dataToLocale'})
export class DataToLocalePipe implements PipeTransform {

  transform(input: any): string {
    return new Date(input).toLocaleString();
  }
}
