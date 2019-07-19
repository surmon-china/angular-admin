/**
 * @file 仪表盘页面组件
 * @desc app/page/dashboard/component
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

const GOOGLE_CHART_BG_OPACITY = 0.05;
const GOOGLE_CHART_COLORS = [
  '#017170',
  '#2fc32f',
  '#b0dc0b',
  '#eab404',
  '#de672c',
  '#ec2e2e',
  '#d5429b',
  '#6f52b8',
  '#1c7cd5',
  '#56b9f7',
  '#0ae8eb'
];

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
  private isShowSelectView = false;

  public defaultStatistics = DEFAULT_STATISTICS_DATA;
  public googleToken: string = null;
  public isLoadingGa: boolean = true;
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
      })
      .catch(error => {
        this.isLoadingGa = false;
        return Promise.reject(error);
      });
  }

  instanceGa(access_token: string) {
    const gapi = (window as any).gapi;
    gapi.analytics.ready(() => {

      this.isLoadingGa = false;

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
          'start-date': 'yesterday',
          'end-date': 'today',
        },
        chart: {
          type: 'LINE',
          container: 'timeline',
          options: {
            colors: GOOGLE_CHART_COLORS,
            width: '100%',
            chartArea: {
              left: '25',
              right: '25',
            },
            focusTarget: 'category',
            dataOpacity: 0.6,
            pointSize: 14,
            vAxis: {
              gridlines: {
                color: '#454545'
              },
              baselineColor: '#454545',
              textStyle: {
                color: '#fff'
              }
            },
            hAxis: {
              textStyle: {
                color: '#fff'
              }
            },
            backgroundColor: {
              fillOpacity: GOOGLE_CHART_BG_OPACITY
            },
            tooltip: {
              textStyle: {
                fontSize: 13
              }
            },
            legend: {
              textStyle: {
                color: '#fff',
              }
            },
          },
        }
      });

      const getPieChart = (dimensions: string, container: string, title: string) => {
        return new gapi.analytics.googleCharts.DataChart({
          query: {
            dimensions,
            metrics: 'ga:sessions',
            'start-date': 'yesterday',
            'end-date': 'today',
            'max-results': 15,
            sort: '-ga:sessions',
          },
          chart: {
            container,
            type: 'PIE',
            options: {
              title,
              width: '100%',
              pieHole: 0.5,
              colors: GOOGLE_CHART_COLORS,
              chartArea: {
                left: '25'
              },
              annotations: {
                stem: {
                  color: 'transparent',
                  length: 120
                },
                textStyle: {
                  color: '#9E9E9E',
                  fontSize: 18
                }
              },
              backgroundColor: {
                fillOpacity: GOOGLE_CHART_BG_OPACITY
              },
              titleTextStyle: {
                color: '#fff',
              },
              pieSliceBorderColor: 'transparent',
              pieSliceTextStyle: {
                color: '#fff',
              },
              tooltip: {
                showColorCode: true,
                textStyle: {
                  fontSize: 12
                }
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
      const osChart = getPieChart('ga:operatingSystem', 'pie-os', '操作系统');

      viewSelector.on('change', ids => {
        const newIds = {
          query: { ids }
        };
        timeline.set(newIds).execute();
        countryChart.set(newIds).execute();
        cityChart.set(newIds).execute();
        browserChart.set(newIds).execute();
        osChart.set(newIds).execute();
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
