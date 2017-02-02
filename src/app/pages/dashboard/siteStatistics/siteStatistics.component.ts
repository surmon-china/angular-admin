import { Component, ViewEncapsulation } from '@angular/core';
import { SiteStatisticsService } from './siteStatistics.service';

@Component({
  selector: 'site-statistics',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./siteStatistics.scss')],
  template: require('./siteStatistics.html')
})
export class siteStatistics {

	charts:any;

  constructor(private _siteStatisticsService: SiteStatisticsService) {
    this.charts = this._siteStatisticsService.getData();
  }
}
