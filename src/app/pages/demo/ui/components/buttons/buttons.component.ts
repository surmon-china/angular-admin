import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-buttons',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./buttons.scss')],
  template: require('./buttons.html'),
})
export class ButtonsComponent {

  constructor() {}
}
