/**
 * @file 文章编辑页面分类选择组件
 * @desc app/page/article/component/category
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { Component, ViewEncapsulation, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { SaHttpRequesterService, SaHttpLoadingService } from '@app/services';
import { ICategory, TResponsePaginationCategory, buildLevelCategories } from '@app/pages/article/article.utils';
import { TApiPath } from '@app/pages/pages.interface';

const LoadingKey = 'Getting';

@Component({
  selector: 'box-article-edit-category',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [SaHttpLoadingService]
})

export class ArticleEditCategoryComponent implements OnInit, OnChanges {

  @Input() category;
  @Output() categoryChange: EventEmitter<any> = new EventEmitter();

  private apiPath: TApiPath = API_PATH.CATEGORY;
  public categories: ICategory[] = [];
  public originalCategories: ICategory[] = [];

  constructor(
    private httpService: SaHttpRequesterService,
    private httpLoadingService: SaHttpLoadingService
  ) {}

  get isLoading(): boolean {
    return this.httpLoadingService.isLoading(LoadingKey);
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
    return this.httpLoadingService.promise(
      LoadingKey,
      this.httpService
        .get<TResponsePaginationCategory>(this.apiPath, { per_page: 666 })
        .then(categories => {
          this.originalCategories = categories.result.data;
          this.buildLevelCategories();
        })
    );
  }

  buildLevelCategories() {
    this.categories = buildLevelCategories(this.originalCategories, this.category);
  }

  ngOnInit() {
    this.getCategories();
  }

  ngOnChanges() {
    this.buildLevelCategories();
  }
}
