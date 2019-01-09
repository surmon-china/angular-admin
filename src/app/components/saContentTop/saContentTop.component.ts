/**
 * @file 内容区顶部标题
 * @module app/component/content-top
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component } from '@angular/core';
import { GlobalState } from 'app/global.state';

@Component({
  selector: 'sa-content-top',
  styles: [require('./saContentTop.scss')],
  template: require('./saContentTop.html'),
})
export class SaContentTopComponent {

  public activePageTitle = '';

  constructor(private state: GlobalState) {
    this.state.subscribe('menu.activeLink', (activeLink) => {
      if (activeLink) {
        this.activePageTitle = activeLink.title;
      }
    });
  }
}
