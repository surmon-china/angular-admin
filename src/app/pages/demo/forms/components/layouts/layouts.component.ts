import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'layouts',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: require('./layouts.html'),
})
export class Layouts {

  public picture = 'assets/img/theme/no-photo.png';

  constructor() {
  }

  ngOnInit() {
  }
}
