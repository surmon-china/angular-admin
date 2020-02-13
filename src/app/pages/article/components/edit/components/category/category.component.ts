/**
 * @file 文章编辑页面分类选择组件
 * @desc app/page/article/component/category
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { Component, ViewEncapsulation, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { ICategory, TResponsePaginationCategory, buildLevelCategories } from '@app/pages/article/article.service';
import { TApiPath, IFetching } from '@app/pages/pages.constants';
import { SaHttpRequesterService } from '@app/services';
import { humanizedLoading } from '@app/pages/pages.service';

enum ELoading {
  Get
}

@Component({
  selector: 'box-article-edit-category',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class ArticleEditCategoryComponent implements OnInit, OnChanges {

  @Input() category;
  @Output() categoryChange: EventEmitter<any> = new EventEmitter();

  public Loading = ELoading;
  private apiPath: TApiPath = API_PATH.CATEGORY;

  public categories: ICategory[] = [];
  public originalCategories: ICategory[] = [];
  public fetching: IFetching = {};

  constructor(private httpService: SaHttpRequesterService) {}

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges(changes) {
    this.buildLevelCategories();
  }

  buildLevelCategories() {
    this.categories = buildLevelCategories(this.originalCategories, this.category);
  }

  // 勾选动作
  public itemSelectChange() {
    this.category = this.categories
      .filter(category => category.checked)
      .map(category => category._id);
    this.categoryChange.emit(this.category);
  }

  // 获取所有分类
  public getCategories() {
    return humanizedLoading(
      this.fetching,
      ELoading.Get,
      this.httpService
        .get<TResponsePaginationCategory>(this.apiPath, { per_page: 666 })
        .then(categories => {
          this.originalCategories = categories.result.data;
          this.buildLevelCategories();
        })
    );
  }
}
