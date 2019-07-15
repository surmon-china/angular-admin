/**
 * @file 仪表盘页面组件
 * @module app/page/dashboard/component
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SaHttpRequesterService } from '@app/services';
import { TApiPath, IFetching } from '@app/pages/pages.constants';
import { humanizedLoading } from '@/app/pages/pages.service';

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
  Statistics,
  Articles,
  Comments,
  Guestbooks,
}

@Component({
  selector: 'page-dashboard',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  private Loading = ELoading;
  private statisticApiPath: TApiPath = API_PATH.STATISTIC;
  private analyticsApiPath: TApiPath = API_PATH.COMMENT;

  public defaultStatistics = DEFAULT_STATISTICS_DATA;
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
    return Promise.resolve('token');
  }

  instanceGa(token: string) {
    const gapi = (window as any).gapi;
    gapi.analytics.ready(() => {

      gapi.analytics.auth.authorize({
        container: 'auth-button',
        clientid: '984332218909-j1ool2q13e32865ttu1es9ih9i7s2e5e.apps.googleusercontent.com',
        // serverAuth: {
        //   access_token: '{{ ACCESS_TOKEN_FROM_SERVICE_ACCOUNT }}'
        // }
      });

      const viewSelector = new gapi.analytics.ViewSelector({
        container: 'view-selector'
      });

      const timeline = new gapi.analytics.googleCharts.DataChart({
        reportType: 'ga',
        query: {
          dimensions: 'ga:hour',
          'metrics': 'ga:sessions',
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
              // backgroundColor: {
              //   fillOpacity: 0
              // },
              // titleTextStyle: {
              //   color: '#fff',
              // },
              // pieSliceTextStyle: {
              //   color: '#fff',
              // },
              // legend: {
              //   textStyle: {
              //     color: '#fff',
              //   }
              // },
            },
          },
        });
      };

      const countryChart = getPieChart('ga:country', 'pie-country', '国家地区');
      const cityChart = getPieChart('ga:city', 'pie-city', '城市');
      const browserChart = getPieChart('ga:browser', 'pie-browser', '浏览器');

      gapi.analytics.auth.on('success', () => {
        viewSelector.execute();
        console.log('viewSelector.execute();');
      });

      viewSelector.on('change', ids => {
        const newIds = {
          query: {
            ids: ids
          }
        };
        timeline.set(newIds).execute();
        countryChart.set(newIds).execute();
        cityChart.set(newIds).execute();
        browserChart.set(newIds).execute();
        console.log('browserChart.execute();');
      });

      // 日期选择器更新后，就 set
      // timeline.set({ query: { end-date: ' } }).execute();
      console.log('不 reay 啦', gapi.analytics);
    });
  }

  initGaScript() {
    (function(w, d, s, g, js, fjs) {
      g = w.gapi || (w.gapi = {}); g.analytics = {q: [], ready: function(cb) {this.q.push(cb); }};
      js = d.createElement(s); fjs = d.getElementsByTagName(s)[0];
      js.src = 'https://apis.google.com/js/platform.js';
      fjs.parentNode.insertBefore(js, fjs); js.onload = function() {g.load('analytics'); };
    }(window as any, document, 'script'));
  }

  async initGAClient() {
    if (!(window as any).gapi) {
      this.initGaScript();
    }
    this.getGaToken().then(this.instanceGa);
  }

  ngOnInit() {
    this.initGAClient();
    this.getStatisticsData();
  }
}
