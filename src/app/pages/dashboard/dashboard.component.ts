/**
 * @file 仪表盘页面组件
 * @module app/page/dashboard/component
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SaHttpRequesterService } from '@app/services';
import { TApiPath, IFetching } from '@app/pages/pages.constants';
import { humanizedLoading } from '@app/pages/pages.service';

const { loadScript } = require('./ga.embed.lib.loader.js');

interface IStatistics {
  [key: string]: number;
}

const DEFAULT_STATISTICS_DATA = [
  {
    description: '今日文章阅读',
    icon: 'ion-md-eye',
    type: 'views'
  }, {
    description: '全站文章数',
    icon: 'ion-md-list',
    type: 'articles'
  }, {
    description: '全站标签数',
    icon: 'ion-md-pricetags',
    type: 'tags'
  }, {
    description: '全站评论数',
    icon: 'ion-md-text',
    type: 'comments'
  }
];

enum ELoading {
  Statistics
}

@Component({
  selector: 'page-dashboard',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  private statisticApiPath: TApiPath = API_PATH.STATISTIC;
  private googleTokenApiPath: TApiPath = API_PATH.GOOGLE_TOKEN;

  public defaultStatistics = DEFAULT_STATISTICS_DATA;
  public googleToken: string = null;
  public isGaReady: boolean = false;
  public statistics: IStatistics = {};
  public fetching: IFetching = {};

  constructor(private httpService: SaHttpRequesterService) {}

  getStatisticsData() {
    return humanizedLoading(
      this.fetching,
      ELoading.Statistics,
      this.httpService
        .get<IStatistics>(this.statisticApiPath)
        .then(statistics => {
          this.statistics = statistics.result;
        })
    );
  }

  getGaToken(): Promise<string> {
    return this.httpService
      .get<object>(this.googleTokenApiPath)
      .then(({ result: credentials }) => {
        return (credentials as any).access_token as string;
      });
  }

  instanceGa(access_token: string) {
    const self = this;
    const gapi = (window as any).gapi;
    gapi.analytics.ready(() => {

      // 服务端授权立即生效，无需事件处理
      gapi.analytics.auth.authorize({
        serverAuth: { access_token }
      });

      const viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector'
      });
      viewSelector.execute();

      const timeline = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          dimensions: 'ga:hour',
          metrics: 'ga:sessions',
          'start-date': 'today',
          'end-date': 'today',
        },
        chart: {
          type: 'LINE',
          container: 'timeline',
          options: {
            width: '100%',
            chartArea: {
              left: '25',
              right: '25',
            }
          },
        }
      });

      const getPieChart = (dimensions: string, container: string, title: string) => {
        return new gapi.analytics.googleCharts.DataChart({
          query: {
            dimensions,
            metrics: 'ga:sessions',
            'start-date': 'today',
            'end-date': 'today',
            'max-results': 10,
            sort: '-ga:sessions',
          },
          chart: {
            container,
            type: 'PIE',
            options: {
              title,
              width: '100%',
              pieHole: 4 / 9,
              chartArea: {
                left: '25'
              },
              backgroundColor: {
                fillOpacity: 0
              },
              titleTextStyle: {
                color: '#fff',
              },
              pieSliceTextStyle: {
                color: '#fff',
              },
              legend: {
                textStyle: {
                  color: '#fff',
                }
              },
            },
          },
        });
      };

      const countryChart = getPieChart('ga:country', 'pie-country', '国家地区');
      const cityChart = getPieChart('ga:city', 'pie-city', '城市');
      const browserChart = getPieChart('ga:browser', 'pie-browser', '浏览器');

      viewSelector.on('change', ids => {
        const newIds = {
          query: { ids }
        };
        self.isGaReady = true;
        timeline.set(newIds).execute();
        countryChart.set(newIds).execute();
        cityChart.set(newIds).execute();
        browserChart.set(newIds).execute();
      });
    });
  }

  async initGAClient() {
    if (!(window as any).gapi) {
      loadScript();
    }
    this.getGaToken().then(this.instanceGa.bind(this));
  }

  ngOnInit() {
    this.initGAClient();
    this.getStatisticsData();
  }
}
