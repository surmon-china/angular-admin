/**
 * @file 仪表盘页面模块
 * @module app/page/dashboard/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaModule } from '@/app/sa.module';

import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';

import { SiteStatisticsComponent } from './siteStatistics';
import { SiteStatisticsService } from './siteStatistics/siteStatistics.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaModule,
    routing
  ],
  declarations: [
    DashboardComponent,
    SiteStatisticsComponent
  ],
  providers: [
    SiteStatisticsService
  ]
})
export default class DashboardModule {}
