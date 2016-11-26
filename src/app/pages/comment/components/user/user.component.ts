import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'user',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./user.scss')],
  template: require('./user.html'),
})
export class CommentUser {}
