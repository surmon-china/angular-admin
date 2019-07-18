/**
 * @file 仪表盘页面模块
 * @desc app/page/dashboard/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaBaseModule } from '@app/sa-base.module';
import { DashboardComponent } from './dashboard.component';
import { RoutingModule } from './dashboard.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaBaseModule,
    RoutingModule
  ],
  declarations: [
    DashboardComponent
  ]
})
export default class DashboardModule {}
