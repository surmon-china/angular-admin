/**
 * @file 内容区顶部标题
 * @desc app/component/content-header
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component } from '@angular/core';
import { GlobalState } from 'app/global.state';

@Component({
  selector: 'sa-content-header',
  styleUrls: ['./saContentHeader.component.scss'],
  templateUrl: './saContentHeader.component.html',
})
export class SaContentHeaderComponent {

  public activePageTitle = '';

  constructor(private state: GlobalState) {
    this.state.subscribe('menu.activeLink', activeLink => {
      if (activeLink) {
        this.activePageTitle = activeLink.title || '黑页';
      }
    });
  }
}
