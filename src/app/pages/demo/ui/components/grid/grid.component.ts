import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-grid',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./grid.scss')],
  template: require('./grid.html'),
})
export class GridComponent {

  constructor() {}
}
