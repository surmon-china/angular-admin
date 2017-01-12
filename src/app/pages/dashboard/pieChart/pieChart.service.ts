import {Injectable} from '@angular/core';
import {BaThemeConfigProvider, colorHelper} from '../../../theme';

@Injectable()
export class PieChartService {

  constructor(private _baConfig:BaThemeConfigProvider) {
  }

  getData() {
    let pieColor = this._baConfig.get().colors.custom.dashboardPieChart;
    return [
      {
        color: pieColor,
        description: '今日浏览人数',
        stats: '57,820',
        icon: 'person',
      }, {
        color: pieColor,
        description: '今日留言数',
        stats: '89,745',
        icon: 'money',
      }, {
        color: pieColor,
        description: '今天新文章',
        stats: '178,391',
        icon: 'face',
      }, {
        color: pieColor,
        description: '我也不知道',
        stats: '32,592',
        icon: 'refresh',
      }
    ];
  }
}
