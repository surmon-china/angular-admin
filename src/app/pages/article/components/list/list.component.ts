/**
 * @file 文章列表页面组件
 * @module app/page/article/component/list
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import * as API_PATH from '@app/constants/api';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { SaHttpRequesterService } from '@app/services';
import { IGetParams } from '@app/pages/pages.constants';
import { humanizedLoading, handleBatchSelectChange, handleItemSelectChange } from '@/app/pages/pages.service';
import { buildLevelCategories, TResponsePaginationTag, TResponsePaginationArticle, TResponsePaginationCategory } from '@/app/pages/article/article.service';
import { TApiPath, TSelectedIds, TSelectedAll, IFetching } from '@app/pages/pages.constants';
import { EPublishState, EPublicState, EOriginState, ESortType } from '@app/constants/state';

const DEFAULT_SEARCH_FORM = {
  keyword: ''
};

const DEFAULT_GET_PARAMS = {
  tag: 'all',
  category: 'all',
  sort: ESortType.Desc,
  state: EPublishState.All,
  public: EPublicState.All,
  origin: EOriginState.All
};

enum ELoading {
  GetList,
  PatchState,
  GetTagList,
  GetCategoryList
}

@Component({
  selector: 'page-article-list',
  encapsulation: ViewEncapsulation.None,
  template: require('./list.html'),
  styles: [require('./list.scss')]
})
export class ArticleListComponent implements OnInit {

  Loading = ELoading;
  SortType = ESortType;
  OriginState = EOriginState;
  PublicState = EPublicState;
  PublishState = EPublishState;

  @ViewChild('delModal') delModal: ModalDirective;

  private tagApiPath: TApiPath = API_PATH.TAG;
  private articleApiPath: TApiPath = API_PATH.ARTICLE;
  private categoryApiPath: TApiPath = API_PATH.CATEGORY;

  // 搜索参数
  public searchForm: FormGroup;
  public keyword: AbstractControl;
  public getParams: IGetParams = lodash.cloneDeep(DEFAULT_GET_PARAMS);

  // 初始化数据
  public tags: TResponsePaginationTag = {
    data: []
  };
  public categories: TResponsePaginationCategory = {
    data: []
  };
  public articles: TResponsePaginationArticle = {
    data: [],
    pagination: null
  };
  public fetching: IFetching = {};

  // 其他数据
  public todoDelArticleId: string = null;
  public articlesSelectAll: TSelectedAll = false;
  public selectedArticles: TSelectedIds = [];

  constructor(private fb: FormBuilder, private httpService: SaHttpRequesterService) {
    this.searchForm = this.fb.group({
      keyword: [DEFAULT_SEARCH_FORM.keyword, Validators.compose([Validators.required])]
    });
    this.keyword = this.searchForm.controls.keyword;
  }

  // 当前数据数量
  get currentListTotal(): number {
    const pagination = this.articles.pagination;
    return pagination && pagination.total || 0;
  }

  // 判断数据类型
  public isState(state: EPublishState): boolean {
    return this.getParams.state === state;
  }

  // 文章列表多选切换
  public batchSelectChange(isSelect: boolean): void {
    const data = this.articles.data;
    const selectedIds = this.selectedArticles;
    this.selectedArticles = handleBatchSelectChange({ data, selectedIds, isSelect });
  }

  // 文章列表单个切换
  public itemSelectChange(): void {
    const data = this.articles.data;
    const selectedIds = this.selectedArticles;
    const result = handleItemSelectChange({ data, selectedIds });
    this.articlesSelectAll = result.all;
    this.selectedArticles  = result.selectedIds;
  }

  // 清空搜索条件
  public resetGetParams(): void {
    this.searchForm.reset(DEFAULT_SEARCH_FORM);
    this.getParams = lodash.cloneDeep(DEFAULT_GET_PARAMS);
  }

  // 弹窗
  public delArticleModal(articleId: string) {
    this.todoDelArticleId = articleId;
    this.delModal.show();
  }

  // 弹窗取消
  public cancelArticleModal() {
    this.delModal.hide();
    this.todoDelArticleId = null;
  }

  // 切换文章类型
  public switchState(state: EPublishState): void {
    if (state === undefined || state === this.getParams.state) {
      return;
    }
    this.getParams.state = state;
    this.getArticles();
  }

  // 提交搜索
  public searchArticles(): void {
    if (this.searchForm.valid) {
      this.getArticles();
    }
  }

  // 刷新文章列表
  public refreshArticles(): void {
    this.getArticles({ page: this.articles.pagination.current_page });
  }

  // 分页获取标签
  public handlePageChanged(event: any): void {
    this.getArticles({ page: event.page });
  }

  // 获取文章列表
  public getArticles(params: IGetParams = {}): void {

    // 如果没有搜索词，则清空搜索框
    if (this.keyword.value) {
      params.keyword = this.keyword.value;
    }

    // 如果请求的是全部数据，则优化参数
    const getParams = this.getParams;
    Object.keys(getParams).forEach(key => {
      if (getParams[key] !== 'all') {
        params[key] = getParams[key];
      }
    });

    humanizedLoading(
      this.fetching,
      ELoading.GetList,
      this.httpService
        .get<TResponsePaginationArticle>(this.articleApiPath, params)
        .then(articles => {
          this.articles = articles.result;
          this.articlesSelectAll = false;
          this.selectedArticles = [];
        })
    );
  }

  // 获取标签列表
  public getTags(): void {
    humanizedLoading(
      this.fetching,
      ELoading.GetTagList,
      this.httpService
        .get<TResponsePaginationTag>(this.tagApiPath, { per_page: 666 })
        .then(tags => {
          this.tags = tags.result;
        })
    );
  }

  // 获取分类列表
  public getCategories(): void {
    humanizedLoading(
      this.fetching,
      ELoading.GetCategoryList,
      this.httpService
        .get<TResponsePaginationCategory>(this.categoryApiPath, { per_page: 666 })
        .then(categories => {
          this.categories = categories.result;
          this.categories.data = buildLevelCategories(this.categories.data);
        })
    );
  }

  // 对于所有修改进行相应统一处理
  public patchArticles(data: Object): void {
    humanizedLoading(
      this.fetching,
      ELoading.PatchState,
      this.httpService.patch(this.articleApiPath, data).then(_ => {
        this.refreshArticles();
      })
    );
  }

  // 移至回收站
  public moveToRecycle(articleIds?: TSelectedIds) {
    const article_ids = articleIds || this.selectedArticles;
    const state = EPublishState.Recycle;
    this.patchArticles({ article_ids, state });
  }

  // 恢复文章（移至草稿）
  public moveToDraft(articleIds?: TSelectedIds) {
    const article_ids = articleIds || this.selectedArticles;
    const state = EPublishState.Draft;
    this.patchArticles({ article_ids, state });
  }

  // 快速发布（移至已发布）
  public moveToPublished(articleIds?: TSelectedIds) {
    const article_ids = articleIds || this.selectedArticles;
    const state = EPublishState.Published;
    this.patchArticles({ article_ids, state });
  }

  // 彻底删除文章（批量删除）
  public delArticles() {
    const article_ids: TSelectedIds = this.todoDelArticleId ? [this.todoDelArticleId] : this.selectedArticles;
    this.httpService.delete(this.articleApiPath, { article_ids })
      .then(_ => {
        this.delModal.hide();
        this.todoDelArticleId = null;
        this.refreshArticles();
      })
      .catch(_ => {
        this.delModal.hide();
      });
  }

  // 初始化
  ngOnInit() {
    this.getTags();
    this.getArticles();
    this.getCategories();
  }
}
