/**
 * @file 卡片组件
 * @desc app/component/card
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'sa-card',
  templateUrl: './saCard.component.html',
  styleUrls: ['./saCard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SaCardComponent {
  @Input() name: string;
  @Input() baCardClass: string;
}
