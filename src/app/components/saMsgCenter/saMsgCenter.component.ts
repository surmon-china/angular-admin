/**
 * @file 消息中心组件
 * @module app/component/markdownn-editor
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component } from '@angular/core';
import { SaMsgCenterService } from './saMsgCenter.service';

@Component({
  selector: 'sa-msg-center',
  providers: [SaMsgCenterService],
  styles: [require('./saMsgCenter.scss')],
  template: require('./saMsgCenter.html')
})
export class SaMsgCenterComponent {

  public messages: Array<Object>;
  public notifications: Array<Object>;

  constructor(private saMsgCenterService: SaMsgCenterService) {
    this.messages = this.saMsgCenterService.getMessages();
    this.notifications = this.saMsgCenterService.getNotifications();
  }
}
