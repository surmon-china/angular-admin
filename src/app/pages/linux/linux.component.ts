import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'linux',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./linux.scss')],
  template: require('./linux.html'),
})
export class Linux {
}
