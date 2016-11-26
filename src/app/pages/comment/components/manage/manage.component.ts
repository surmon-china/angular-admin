import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'manage',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./manage.scss')],
  template: require('./manage.html'),
})
export class CommentManage {}
