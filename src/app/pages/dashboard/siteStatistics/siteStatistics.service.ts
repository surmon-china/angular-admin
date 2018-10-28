/**
 * @file 仪表盘页面网站统计组件数据服务
 * @module app/page/dashboard/componennt/site-statistics-service
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';

@Injectable()
export class SiteStatisticsService {

  constructor() {}

  getData() {
    return [
      {
        description: '今日浏览人数',
        stats: '57,820',
        icon: 'person',
      }, {
        description: '今日留言数',
        stats: '89,745',
        icon: 'money',
      }, {
        description: '今天新文章',
        stats: '178,391',
        icon: 'face',
      }, {
        description: '我也不知道',
        stats: '32,592',
        icon: 'refresh',
      }
    ];
  }
}
