/**
 * @file 标签列表页面组件
 * @module app/page/article/componennt/tag
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, ViewChild, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { SaHttpRequesterService, IRequestParams } from '@app/services';
import { TApiPath, TSelectedIds, TSelectedAll, IResponseData, IFetching } from '@app/pages/pages.constants';
import { ITag } from '@/app/pages/article/article.service';
import * as API_PATH from '@app/constants/api';
import {
  mergeFormControlsToInstance,
  handleBatchSelectChange,
  handleItemSelectChange,
  formControlStateClass
} from '@/app/pages/pages.service';

const DEFAULT_EDIT_FORM = {
  name: '',
  slug: '',
  description: '',
  extends: [{ name: 'icon', value: 'icon-tag'}]
};

const DEFAULT_SEARCH_FORM = {
  keyword: ''
};

@Component({
  selector: 'page-article-tag',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./tag.scss')],
  template: require('./tag.html')
})
export class ArticleTagComponent implements OnInit {

  controlStateClass = formControlStateClass;

  @ViewChild('delModal') delModal: ModalDirective;

  private _apiPath: TApiPath = API_PATH.TAG;

  public editForm: FormGroup;
  public searchForm: FormGroup;

  // searchForm
  public keyword: AbstractControl;

  // editForm
  public name: AbstractControl;
  public slug: AbstractControl;
  public description: AbstractControl;
  public extends: AbstractControl;

  // 其他初始化
  public activeTag: ITag;
  public tagsSelectAll: TSelectedAll = false;
  public selectedTags: TSelectedIds = [];
  public tags: IResponseData<ITag> = {
    data: [],
    pagination: null
  };
  public fetching: IFetching = {
    get: false,
    post: false
  };

  // 构造函数
  constructor(private _fb: FormBuilder, private _httpService: SaHttpRequesterService) {

    this.editForm = this._fb.group({
      name: [DEFAULT_EDIT_FORM.name, Validators.compose([Validators.required])],
      slug: [DEFAULT_EDIT_FORM.slug, Validators.compose([Validators.required])],
      description: [DEFAULT_EDIT_FORM.description, Validators.compose([Validators.required])],
      extends: [DEFAULT_EDIT_FORM.extends]
    });

    this.searchForm = this._fb.group({
      keyword: [DEFAULT_SEARCH_FORM.keyword, Validators.compose([Validators.required])]
    });

    mergeFormControlsToInstance(this, this.editForm);
    mergeFormControlsToInstance(this, this.searchForm);
  }

  // 删除自定义配置项目
  public delExtendItem(index: number) {
    this.extends.value.splice(index, 1);
  }

  // 增加自定义配置项目
  public addExtendItem() {
    this.extends.setValue([...this.extends.value, {}]);
  }

  // 多选切换
  public batchSelectChange(isSelect: boolean) {
    const data = this.tags.data;
    const selectedIds = this.selectedTags;
    this.selectedTags = handleBatchSelectChange({ data, selectedIds, isSelect });
  }

  // 单个切换
  public itemSelectChange() {
    const data = this.tags.data;
    const selectedIds = this.selectedTags;
    const result = handleItemSelectChange({ data, selectedIds });
    this.tagsSelectAll = result.all;
    this.selectedTags = result.selectedIds;
  }

  // 重置编辑表单
  public resetEditForm(): void {
    this.editForm.reset(DEFAULT_EDIT_FORM);
    this.activeTag = null;
  }

  // 重置搜索表单
  public resetSearchForm(): void {
    this.searchForm.reset(DEFAULT_SEARCH_FORM);
  }

  // 提交表单
  public handleSubmitTag(tag: ITag): void {
    if (this.editForm.valid) {
      this.activeTag ? this.doPutTag(tag) : this.addTag(tag);
    }
  }

  // 分页获取标签
  public handlePageChanged(event: any): void {
    this.getTags({ page: event.page });
  }

  // 刷新本页本类型标签
  public refreshTags(): void {
    this.getTags({ page: this.tags.pagination.current_page });
  }

  // 提交搜索
  public searchTags(): void {
    if (this.searchForm.valid) {
      this.getTags();
    }
  }

  // 修改标签
  public putTag(tag: ITag) {
    this.activeTag = lodash.cloneDeep(tag);
    this.editForm.reset(tag);
  }

  // 删除标签弹窗
  public delTagModal(tag: ITag) {
    this.activeTag = lodash.cloneDeep(tag);
    this.delModal.show();
  }

  // 删除弹窗取消
  public canceldDelTagModal() {
    this.delModal.hide();
    this.activeTag = null;
  }

  // 批量删除标签弹窗
  public delTagsModal() {
    this.activeTag = null;
    this.delModal.show();
  }

  // 获取标签
  public getTags(params: IRequestParams = {}): Promise<any> {

    // 搜索词
    if (this.keyword.value) {
      params.keyword = this.keyword.value;
    }

    // 请求
    this.fetching.get = true;

    return this._httpService.get(this._apiPath, params)
      .then(tags => {
        this.tags = tags.result;
        this.selectedTags = [];
        this.tagsSelectAll = false;
        this.fetching.get = false;
      })
      .catch(_ => {
        this.fetching.get = false;
      });
  }

  // 添加标签
  public addTag(tag: ITag) {
    this.fetching.post = true;
    this._httpService.post(this._apiPath, tag)
      .then(_ => {
        this.fetching.post = false;
        this.resetEditForm();
        this.resetSearchForm();
        this.getTags();
      })
      .catch(_ => {
        this.fetching.post = false;
      });
  }

  // 修改标签提交
  public doPutTag(tag: ITag) {
    this.fetching.post = true;
    const newTag = Object.assign({}, this.activeTag, tag);
    this._httpService.put(`${this._apiPath}/${tag._id}`, newTag)
    .then(_ => {
      this.refreshTags();
      this.resetEditForm();
      this.activeTag = null;
      this.fetching.post = false;
    })
    .catch(_ => {
      this.fetching.post = false;
    });
  }

  // 确认删除标签
  public doDelTag() {
    this._httpService.delete(`${this._apiPath}/${this.activeTag._id}`)
    .then(_ => {
      this.delModal.hide();
      this.activeTag = null;
      this.refreshTags();
    })
    .catch(_ => {
      this.delModal.hide();
    });
  }

  // 确认批量删除
  public doDelTags() {
    this._httpService.delete(this._apiPath, { tags: this.selectedTags })
    .then(_ => {
      this.delModal.hide();
      this.refreshTags();
    })
    .catch(_ => {
      this.delModal.hide();
    });
  }

  ngOnInit() {
    this.getTags();
  }
}

