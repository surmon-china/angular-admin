/**
 * @file 仪表盘页面组件
 * @module app/page/dashboard/component
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import * as API_PATH from '@app/constants/api';
import { SaHttpRequesterService } from '@app/services';
import { IArticle } from '@app/pages/article/article.service';
import { IComment } from '@app/pages/comment/comment.constants';
import { TApiPath, IFetching } from '@app/pages/pages.constants';

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

@Component({
  selector: 'page-dashboard',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dashboard.scss')],
  template: require('./dashboard.html')
})
export class DashboardComponent  implements OnInit {

  private _statisticApiPath: TApiPath = API_PATH.STATISTIC;
  private _articleApiPath: TApiPath = API_PATH.ARTICLE;
  private _commentApiPath: TApiPath = API_PATH.COMMENT;

  public defaultStatistics = DEFAULT_STATISTICS_DATA;
  public statistics: IStatistics = {};
  public articles: IArticle[] = [];
  public comments: IComment[] = [];
  public guestbooks: IComment[] = [];
  public fetching: IFetching = {
    statistics: false,
    articles: false,
    comments: false,
    guestbooks: false
  };

  constructor(private _httpService: SaHttpRequesterService) {}

  getStatisticsData() {
    this.fetching.statistics = true;
    return this._httpService.get(this._statisticApiPath)
      .then(statistics => {
        this.statistics = statistics.result;
        this.fetching.statistics = false;
      })
      .catch(_ => {
        this.fetching.statistics = false;
      });
  }

  getArticlesData() {
    this.fetching.articles = true;
    return this._httpService.get(this._articleApiPath)
      .then(articles => {
        this.articles = articles.result.data;
        this.fetching.articles = false;
      })
      .catch(_ => {
        this.fetching.articles = false;
      });
  }

  getCommentsData(guestbook?: boolean) {
    const type = guestbook ? 'guestbooks' : 'comments';
    const params = guestbook ? { post_id: 0 } : {};
    this.fetching[type] = true;
    return this._httpService.get(this._commentApiPath, params)
      .then(comments => {
        this[type] = comments.result.data;
        this.fetching[type] = false;
      })
      .catch(_ => {
        this.fetching[type] = false;
      });
  }

  ngOnInit() {
    this.getStatisticsData();
    this.getArticlesData();
    this.getCommentsData();
    this.getCommentsData(true);
  }
}
