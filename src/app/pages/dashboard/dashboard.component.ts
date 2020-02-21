/**
 * @file 仪表盘页面组件
 * @desc app/page/dashboard/component
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { SaHttpRequesterService, SaHttpLoadingService } from '@app/services';
import { TApiPath } from '@app/pages/pages.interface';

const { loadScript } = require('./ga.embed.lib.loader.js');

interface IStatistics {
  [key: string]: number;
}

enum Loading {
  GetStatistics,
  LoadingGA
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
    icon: 'eye',
    type: 'views'
  }, {
    description: '全站文章数',
    icon: 'copy',
    type: 'articles'
  }, {
    description: '全站标签数',
    icon: 'pricetags',
    type: 'tags'
  }, {
    description: '全站评论数',
    icon: 'chatbox-ellipses',
    type: 'comments'
  }
];

@Component({
  selector: 'page-dashboard',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
  providers: [SaHttpLoadingService]
})
export class DashboardComponent implements OnInit {

  private statisticApiPath: TApiPath = API_PATH.STATISTIC;
  private googleTokenApiPath: TApiPath = API_PATH.GOOGLE_TOKEN;

  public isShowSelectView = false;
  public defaultStatistics = DEFAULT_STATISTICS_DATA;
  public googleToken: string = null;
  public statistics: IStatistics = {};

  constructor(
    private httpService: SaHttpRequesterService,
    private httpLoadingService: SaHttpLoadingService
  ) {}

  get isLoadingGA(): boolean {
    return this.httpLoadingService.isLoading(Loading.LoadingGA)
  }

  getStatisticsData() {
    return this.httpLoadingService.promise(
      Loading.GetStatistics,
      this.httpService
        .get<IStatistics>(this.statisticApiPath)
        .then(statistics => {
          this.statistics = statistics.result;
        })
    );
  }

  getGAToken(): Promise<string> {
    return this.httpService
      .get<object>(this.googleTokenApiPath)
      .then(({ result: credentials }) => {
        return (credentials as any).access_token as string;
      });
  }

  async instanceGA(access_token: string): Promise<void> {
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
            'start-date': 'today',
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
    this.httpLoadingService.start(Loading.LoadingGA);
    if (!(window as any).gapi) {
      loadScript();
    }
    return this.httpLoadingService.promise(
      Loading.LoadingGA,
      this.getGAToken().then(this.instanceGA.bind(this))
    );
  }

  ngOnInit() {
    // TODO: 由于阿里云无法访问到 googleapis 服务，所以生产环境不可用，为了使其可退化，用 localStorage 存一个特殊字段来判断吧
    if (!localStorage.getItem('DISABLE_GA')) {
      this.initGAClient();
    }
    this.getStatisticsData();
  }
}
