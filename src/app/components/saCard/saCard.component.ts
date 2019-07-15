/**
 * @file 卡片组件
 * @module app/component/card
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'sa-card',
  templateUrl: './saCard.html',
  styleUrls: ['./saCard.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaCardComponent {
  @Input() title: string;
  @Input() baCardClass: string;
}
