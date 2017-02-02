import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { Dashboard } from './dashboard.component';
import { routing }       from './dashboard.routing';

import { siteStatistics } from './siteStatistics';
// import { TrafficChart } from './trafficChart';
// import { UsersMap } from './usersMap';
import { LineChart } from './lineChart';
import { Todo } from './todo';

import { LineChartService } from './lineChart/lineChart.service';
import { SiteStatisticsService } from './siteStatistics/siteStatistics.service';
import { TodoService } from './todo/todo.service';
// import { TrafficChartService } from './trafficChart/trafficChart.service';
// import { UsersMapService } from './usersMap/usersMap.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    siteStatistics,
    // TrafficChart,
    // UsersMap,
    LineChart,
    Todo,
    Dashboard
  ],
  providers: [
    LineChartService,
    SiteStatisticsService,
    TodoService,
    // TrafficChartService,
    // UsersMapService
  ]
})
export default class DashboardModule {}
