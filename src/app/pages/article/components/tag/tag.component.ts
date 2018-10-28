import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ModalDirective } from 'ngx-bootstrap';
import { SaHttpRequesterService } from '@app/services';

@Component({
  selector: 'page-article-tag',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./tag.scss')],
  template: require('./tag.html')
})
export class ArticleTagComponent {

  @ViewChild('delModal') delModal: ModalDirective;


  private _apiPath = '/tag';

  public editForm: FormGroup;
  public searchForm: FormGroup;

  // editForm
  public name: AbstractControl;
  public slug: AbstractControl;
  public description: AbstractControl;
  public extends: AbstractControl;

  // searchForm
  public keyword: AbstractControl;
  public tags = {
    data: [],
    pagination: {
      current_page: 1,
      total_page: 0,
      per_page: 10,
      total: 0
    }
  };

  // 其他初始化
  public del_tag: any;
  public edit_tag: any;
  public tagsSelectAll: boolean = false;
  public selectedTags = [];
  public fetching = {
    tag: false
  };

  // 构造函数
  constructor(private _fb: FormBuilder, private _httpService: SaHttpRequesterService) {

    this.editForm = this._fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'slug': ['', Validators.compose([Validators.required])],
      'description': ['', Validators.compose([Validators.required])],
      'extends': [[{ name: 'icon', value: 'icon-tag'}]]
    });

    this.searchForm = this._fb.group({
      'keyword': ['', Validators.compose([Validators.required])]
    });

    this.name = this.editForm.controls.name;
    this.slug = this.editForm.controls.slug;
    this.extends = this.editForm.controls.extends;
    this.keyword = this.searchForm.controls.keyword;
    this.description = this.editForm.controls.description;
  }

  ngOnInit() {
    this.getTags();
  }

  // 删除自定义配置项目
  public delExtendItem(index) {
    this.extends.value.splice(index, 1);
  }

  // 增加自定义配置项目
  public addExtendItem() {
    this.extends.setValue([...this.extends.value, {}]);
  }

  // 多选切换
  public batchSelectChange(is_select) {
    if (!this.tags.data.length) { return; }
    this.selectedTags = [];
    this.tags.data.forEach(item => {
      item.selected = is_select;
      is_select && this.selectedTags.push(item._id);
    });
  }

  // 单个切换
  public itemSelectChange() {
    this.selectedTags = [];
    const tags = this.tags.data;
    tags.forEach(item => {
      item.selected && this.selectedTags.push(item._id);
    });
    if (!this.selectedTags.length) {
      this.tagsSelectAll = false;
    } else if (!!this.selectedTags.length && this.selectedTags.length === tags.length) {
      this.tagsSelectAll = true;
    }
  }

  // 重置编辑表单
  public resetEditForm(): void {
    this.editForm.reset({
      name: '',
      slug: '',
      description: '',
      extends: [{ name: 'icon', value: 'icon-tag'}]
    });
    this.edit_tag = null;
  }

  // 重置搜索表单
  public resetSearchForm(): void {
    this.searchForm.reset({
      keyword: ''
    });
  }

  // 提交表单
  public submitTag(values: Object): void {
    if (this.editForm.valid) {
      this.edit_tag ? this.doPutTag(values) : this.addTag(values);
    }
  }

  // 提交搜索
  public searchTags(values: Object): void {
    if (this.searchForm.valid) {
      this.getTags();
    }
  }

  // 刷新本页本类型标签
  public refreshTags(): void {
    this.getTags();
  }

  // 分页获取标签
  public pageChanged(event: any): void {
    this.getTags({ page: event.page });
  }

  // 获取标签
  public getTags(params: any = {}) {
    // 搜索词具有高优先级
    if (this.keyword.value) {
      params.keyword = this.keyword.value;
    }
    // 如果请求的是第一页，则设置翻页组件的当前页为第一页
    if (!params.page || Object.is(params.page, 1)) {
      this.tags.pagination.current_page = 1;
    }
    // 如果没有指定页数，则请求当前页
    if (!params.page) {
      params.page = this.tags.pagination.current_page;
    }
    // 固定每页请求的数量
    params.per_page = this.tags.pagination.per_page;
    // 请求
    this.fetching.tag = true;
    this._httpService.get(this._apiPath, params)
    .then(tags => {
      this.tags = tags.result;
      this.selectedTags = [];
      this.tagsSelectAll = false;
      this.fetching.tag = false;
    })
    .catch(error => {
      this.fetching.tag = false;
    });
  }

  // 添加标签
  public addTag(tag) {
    this._httpService.post(this._apiPath, tag)
    .then(_tag => {
      this.resetEditForm();
      this.resetSearchForm();
      this.getTags();
    });

  }

  // 修改标签
  public putTag(tag) {
    this.edit_tag = tag;
    this.editForm.reset(tag);
  }

  // 修改标签提交
  public doPutTag(tag) {
    tag = Object.assign(this.edit_tag, tag);
    this._httpService.put(`${this._apiPath}/${tag._id}`, tag)
    .then(_tag => {
      this.getTags({ page: this.tags.pagination.current_page });
      this.resetEditForm();
      this.edit_tag = null;
    });

  }

  // 删除标签弹窗
  public delTagModal(tag) {
    this.del_tag = tag;
    this.delModal.show();
  }

  // 删除弹窗取消
  public canceldDelTagModal(tag) {
    this.delModal.hide();
    this.del_tag = null;
  }

  // 确认删除标签
  public doDelTag() {
    this._httpService.delete(`${this._apiPath}/${this.del_tag._id}`)
    .then(tag => {
      this.delModal.hide();
      this.del_tag = null;
      this.getTags({ page: this.tags.pagination.current_page });
    })
    .catch(err => {
      this.delModal.hide();
    });
  }

  // 批量删除标签弹窗
  public delTagsModal() {
    this.del_tag = null;
    this.delModal.show();
  }

  // 确认批量删除
  public doDelTags() {
    this._httpService.delete(this._apiPath, { tags: this.selectedTags })
    .then(tags => {
      this.delModal.hide();
      this.getTags({ page: this.tags.pagination.current_page });
    })
    .catch(err => {
      this.delModal.hide();
    });
  }
}

