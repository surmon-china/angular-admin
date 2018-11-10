/**
 * @file 公告管理页面组件
 * @module app/page/annoucement/component
 * @author Surmon <https://github.com/surmon-china>
 */

import marked from 'marked';
import * as lodash from 'lodash';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import * as API_PATH from '@app/constants/api';
import { SaHttpRequesterService, IRequestParams } from '@app/services';
import { TApiPath, TSelectedIds, TSelectedAll, EPublishState, IResponseData, IFetching } from '@app/pages/pages.constants';
import { mergeFormControlsToInstance, handleBatchSelectChange, handleItemSelectChange, formControlStateClass } from '@/app/pages/pages.service';

// 公告
interface IAnnouncement {
  id?: number;
  _id?: string;
  state: number;
  content: string;
  update_at: string;
  create_at: string;
  selected?: boolean;
}

const DEFAULT_EDIT_FORM = {
  content: '',
  state: EPublishState.published
};

const DEFAULT_SEARCH_FORM = {
  keyword: ''
};

@Component({
  selector: 'page-announcement',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./announcement.scss')],
  template: require('./announcement.html')
})
export class AnnouncementComponent implements OnInit {

  PublishState = EPublishState;
  controlStateClass = formControlStateClass;

  @ViewChild('delModal') delModal: ModalDirective;

  private _apiPath: TApiPath = API_PATH.ANNOUNCEMENT;

  // 表单
  public editForm: FormGroup;
  public searchForm: FormGroup;
  public state: AbstractControl;
  public keyword: AbstractControl;
  public content: AbstractControl;

  // 业务
  public activeAnnouncement: IAnnouncement = null;
  public announcementsSelectAll: TSelectedAll = false;
  public selectedAnnouncements: TSelectedIds = [];
  public publishState: EPublishState = EPublishState.all;
  public fetching: IFetching = { get: false };
  public announcements: IResponseData<IAnnouncement> = {
    data: [],
    pagination: null
  };

  constructor(private _fb: FormBuilder, private _httpService: SaHttpRequesterService) {

    // 实例表单
    this.editForm = this._fb.group({
      content: [DEFAULT_EDIT_FORM.content, Validators.compose([Validators.required])],
      state: [DEFAULT_EDIT_FORM.state, Validators.compose([Validators.required])]
    });

    this.searchForm = this._fb.group({
      keyword: [DEFAULT_SEARCH_FORM.keyword, Validators.compose([Validators.required])]
    });

    mergeFormControlsToInstance(this, this.editForm);
    mergeFormControlsToInstance(this, this.searchForm);
  }

  ngOnInit() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false
    });
    this.getAnnouncements();
  }

  // 当前数据数量
  get currentListTotal(): number {
    const pagination = this.announcements.pagination;
    return pagination && pagination.total || 0;
  }

  // 解析 Markdown
  public parseMarkdown(content: string): string {
    return marked(content);
  }

  // 判断公告类型
  public isState(state: EPublishState): boolean {
    return this.publishState === state;
  }

  // 切换公告类型
  public switchState(state: EPublishState): void {
    if (state === this.publishState) {
      return;
    }
    this.publishState = state;
    this.getAnnouncements();
  }

  // 重置编辑表单
  public resetEditForm(): void {
    this.editForm.reset(DEFAULT_EDIT_FORM);
    this.activeAnnouncement = null;
  }

  // 重置搜索
  public resetSearchForm(): void {
    this.searchForm.reset(DEFAULT_SEARCH_FORM);
  }

  // 修改公告
  public editAnnouncement(announcement: IAnnouncement) {
    this.activeAnnouncement = lodash.cloneDeep(announcement);
    this.editForm.reset(announcement);
  }

  // 提交表单
  public submitEditForm(announcement: IAnnouncement): void {
    if (this.editForm.valid) {
      this.activeAnnouncement
        ? this.putAnnouncement(announcement)
        : this.addAnnouncement(announcement);
    }
  }

  // 提交搜索
  public submitSearchForm(): void {
    if (this.searchForm.valid) {
      this.getAnnouncements();
    }
  }

  // 删除公告弹窗
  public openDelModal(announcement) {
    this.activeAnnouncement = lodash.cloneDeep(announcement);
    this.delModal.show();
  }

  // 删除弹窗取消
  public canceldDelModal() {
    this.delModal.hide();
    this.activeAnnouncement = null;
  }

  // 批量删除公告弹窗
  public openBatchDelModal() {
    this.activeAnnouncement = null;
    this.delModal.show();
  }

  // 多选切换
  public handleBatchSelectChange(isSelect: boolean) {
    const data = this.announcements.data;
    const selectedIds = this.selectedAnnouncements;
    this.selectedAnnouncements = handleBatchSelectChange({ data, selectedIds, isSelect });
  }

  // 单个切换
  public handleItemSelectChange(): void {
    const data = this.announcements.data;
    const selectedIds = this.selectedAnnouncements;
    const result = handleItemSelectChange({ data, selectedIds });
    this.announcementsSelectAll = result.all;
    this.selectedAnnouncements = result.selectedIds;
  }

  // 分页获取公告
  public handlePageChanged(event: any): void {
    this.getAnnouncements({ page: event.page });
  }

  // 刷新
  public refreshAnnouncements(): void {
    this.getAnnouncements({ page: this.announcements.pagination.current_page });
  }

  // 获取公告
  public getAnnouncements(params: IRequestParams = {}): Promise<any> {

    // 搜索
    if (this.keyword.value) {
      params.keyword = this.keyword.value;
    }

    // 非全部数据
    if (this.publishState !== EPublishState.all) {
      params.state = this.publishState;
    }

    this.fetching.get = true;

    return this._httpService.get(this._apiPath, params)
      .then(announcements => {
        this.announcements = announcements.result;
        this.selectedAnnouncements = [];
        this.announcementsSelectAll = false;
        this.fetching.get = false;
      })
      .catch(_ => {
        this.fetching.get = false;
      });
  }

  // 添加公告
  public addAnnouncement(announcement: IAnnouncement): Promise<any> {
    return this._httpService.post(this._apiPath, announcement)
      .then(_ => {
        this.resetEditForm();
        this.refreshAnnouncements();
      });
  }

  // 更新公告
  public putAnnouncement(announcement: IAnnouncement): Promise<any> {
    return this._httpService.put(
      `${this._apiPath}/${this.activeAnnouncement._id}`,
      Object.assign(this.activeAnnouncement, announcement)
    )
    .then(_ => {
      this.resetEditForm();
      this.refreshAnnouncements();
      this.activeAnnouncement = null;
    });
  }

  // 删除公告
  public doDelAnnouncement() {
    this._httpService.delete(`${this._apiPath}/${this.activeAnnouncement._id}`)
    .then(_ => {
      this.delModal.hide();
      this.activeAnnouncement = null;
      this.refreshAnnouncements();
    })
    .catch(_ => {
      this.delModal.hide();
    });
  }

  // 批量删除
  public doDelAnnouncements() {
    this._httpService.delete(this._apiPath, { announcements: this.selectedAnnouncements })
    .then(_ => {
      this.delModal.hide();
      this.refreshAnnouncements();
      this.selectedAnnouncements = [];
    })
    .catch(_ => {
      this.delModal.hide();
    });
  }
}
