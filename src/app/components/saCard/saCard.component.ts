/**
 * @file 卡片组件
 * @module app/component/card
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'sa-card',
  styles: [require('./saCard.scss')],
  template: require('./saCard.html'),
  encapsulation: ViewEncapsulation.None
})
export class SaCardComponent {
  @Input() title: String;
  @Input() baCardClass: String;
}
