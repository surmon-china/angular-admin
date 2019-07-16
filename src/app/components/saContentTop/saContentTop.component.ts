/**
 * @file 内容区顶部标题
 * @module app/component/content-top
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component } from '@angular/core';
import { GlobalState } from 'app/global.state';

@Component({
  selector: 'sa-content-top',
  styleUrls: ['./saContentTop.component.scss'],
  templateUrl: './saContentTop.component.html',
})
export class SaContentTopComponent {

  public activePageTitle = '';

  constructor(private state: GlobalState) {
    this.state.subscribe('menu.activeLink', activeLink => {
      if (activeLink) {
        this.activePageTitle = activeLink.title || '黑页';
      }
    });
  }
}
