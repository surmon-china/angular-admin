/**
 * @file 服务器管理页面模块
 * @module app/page/linux/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaModule } from '@/app/sa.module';
import { routing } from './linux.routing';
import { LinuxComponent } from './linux.component';

@NgModule({
  imports: [
    CommonModule,
    SaModule,
    routing
  ],
  declarations: [
    LinuxComponent
  ]
})
export default class LinuxModule {}
