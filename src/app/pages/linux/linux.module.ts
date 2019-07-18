/**
 * @file 服务器管理页面模块
 * @desc app/page/linux/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaBaseModule } from '@app/sa-base.module';
import { RoutingModule } from './linux.routing';
import { LinuxComponent } from './linux.component';

@NgModule({
  imports: [
    CommonModule,
    SaBaseModule,
    RoutingModule
  ],
  declarations: [
    LinuxComponent
  ]
})
export default class LinuxModule {}
