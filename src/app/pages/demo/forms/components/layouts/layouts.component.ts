import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'page-layouts',
  encapsulation: ViewEncapsulation.None,
  styles: [],
  template: require('./layouts.html'),
})
export class LayoutsComponent {

  public picture = 'assets/img/theme/no-photo.png';

  constructor() {}
}
