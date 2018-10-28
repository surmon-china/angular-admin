/**
 * @file 仪表盘页面用户地图组件
 * @module app/page/dashboard/component/user-map
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { UsersMapService } from './usersMap.service';

@Component({
  selector: 'box-users-map',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./usersMap.scss')],
  template: require('./usersMap.html')
})
export class UsersMapComponent {

  mapData: Object;

  constructor(private _usersMapService: UsersMapService) {
    this.mapData = this._usersMapService.getData();
  }
}
