import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { siteStatistics } from './siteStatistics';
import { SiteStatisticsService } from './siteStatistics/siteStatistics.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    siteStatistics,
    Dashboard
  ],
  providers: [
    SiteStatisticsService
  ]
})
export default class DashboardModule {}
