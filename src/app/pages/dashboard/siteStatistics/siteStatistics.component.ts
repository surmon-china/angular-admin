/**
 * @file 仪表盘页面网站统计组件
 * @module app/page/dashboard/componennt/site-statistics
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';
import { SiteStatisticsService } from './siteStatistics.service';

@Component({
  selector: 'box-site-statistics',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./siteStatistics.scss')],
  template: require('./siteStatistics.html')
})
export class SiteStatisticsComponent {

  charts: any;

  constructor(private _siteStatisticsService: SiteStatisticsService) {
    this.charts = this._siteStatisticsService.getData();
  }
}
