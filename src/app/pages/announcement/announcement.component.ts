/**
 * @file 公告管理页面组件
 * @desc app/page/announcement/component
 * @author Surmon <https://github.com/surmon-china>
 */

import marked from 'marked';
import * as lodash from 'lodash';
import * as API_PATH from '@app/constants/api';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EPublishState } from '@app/constants/state';
import { SaHttpRequesterService, SaHttpLoadingService, IRequestParams } from '@app/services';
import { mergeFormControlsToInstance, handleBatchSelectChange, handleItemSelectChange, formControlStateClass } from '@app/pages/pages.utils';
import { TApiPath, TSelectedIds, TSelectedAll, IResponsePaginationData } from '@app/pages/pages.interface';

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

type TResponseAnnouncement = IResponsePaginationData<IAnnouncement>;
enum Loading {
  GetList,
  Update
}

const DEFAULT_EDIT_FORM = {
  content: '',
  state: EPublishState.Published
};

const DEFAULT_SEARCH_FORM = {
  keyword: ''
};

@Component({
  selector: 'page-announcement',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./announcement.component.scss'],
  templateUrl: './announcement.component.html',
  providers: [SaHttpLoadingService]
})
export class AnnouncementComponent implements OnInit {

  public PublishState = EPublishState;
  public controlStateClass = formControlStateClass;
  private apiPath: TApiPath = API_PATH.ANNOUNCEMENT;

  @ViewChild('delModal', { static: false }) delModal: ModalDirective;

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
  public publishState: EPublishState = EPublishState.All;
  public announcements: TResponseAnnouncement = {
    data: [],
    pagination: null
  };

  constructor(
    private fb: FormBuilder,
    private httpService: SaHttpRequesterService,
    private httpLoadingService: SaHttpLoadingService
  ) {
    // 实例表单
    this.editForm = this.fb.group({
      content: [DEFAULT_EDIT_FORM.content, Validators.compose([Validators.required])],
      state: [DEFAULT_EDIT_FORM.state, Validators.compose([Validators.required])]
    });

    this.searchForm = this.fb.group({
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

  get isGettingList(): boolean {
    return this.httpLoadingService.isLoading(Loading.GetList);
  }

  get isUpdating(): boolean {
    return this.httpLoadingService.isLoading(Loading.Update);
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
      this.httpLoadingService.promise(
        Loading.Update,
        this.activeAnnouncement
          ? this.putAnnouncement(announcement)
          : this.addAnnouncement(announcement)
      );
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
  public cancelDelModal() {
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
  public getAnnouncements(params: IRequestParams = {}): Promise<void> {

    // 搜索
    if (this.keyword.value) {
      params.keyword = this.keyword.value;
    }

    // 非全部数据
    if (this.publishState !== EPublishState.All) {
      params.state = this.publishState;
    }

    return this.httpLoadingService.promise(
      Loading.GetList,
      this.httpService
        .get<TResponseAnnouncement>(this.apiPath, params)
        .then(announcements => {
          this.announcements = announcements.result;
          this.selectedAnnouncements = [];
          this.announcementsSelectAll = false;
        })
    );
  }

  // 添加公告
  public addAnnouncement(announcement: IAnnouncement): Promise<any> {
    return this.httpService.post<IAnnouncement>(this.apiPath, announcement)
      .then(() => {
        this.resetEditForm();
        this.refreshAnnouncements();
      });
  }

  // 更新公告
  public putAnnouncement(announcement: IAnnouncement): Promise<any> {
    return this.httpService.put<IAnnouncement>(
      `${this.apiPath}/${this.activeAnnouncement._id}`,
      Object.assign(this.activeAnnouncement, announcement)
    )
    .then(() => {
      this.resetEditForm();
      this.refreshAnnouncements();
      this.activeAnnouncement = null;
    });
  }

  // 删除公告
  public doDelAnnouncement() {
    this.httpService
    .delete<IAnnouncement>(`${this.apiPath}/${this.activeAnnouncement._id}`)
    .then(() => {
      this.delModal.hide();
      this.activeAnnouncement = null;
      this.refreshAnnouncements();
    })
    .catch(() => {
      this.delModal.hide();
    });
  }

  // 批量删除
  public doDelAnnouncements() {
    this.httpService
    .delete<any>(this.apiPath, { announcement_ids: this.selectedAnnouncements })
    .then(() => {
      this.delModal.hide();
      this.refreshAnnouncements();
      this.selectedAnnouncements = [];
    })
    .catch(() => {
      this.delModal.hide();
    });
  }
}
