/**
 * @file 文章编辑页面核心组件
 * @desc app/page/article/component/main
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, ViewEncapsulation, Input, Output, OnInit, OnChanges } from '@angular/core';
import { mergeFormControlsToInstance, formControlStateClass } from '@app/pages/pages.utils';
import { SaHttpRequesterService, SaHttpLoadingService } from '@app/services';
import { ITag, TResponsePaginationTag } from '@app/pages/article/article.utils';

const LoadingTagKey = 'GetTag';

@Component({
  selector: 'box-article-edit-main',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./main.component.scss'],
  templateUrl: './main.component.html',
  providers: [SaHttpLoadingService]
})
export class ArticleEditMainComponent implements OnInit, OnChanges {

  public controlStateClass = formControlStateClass;

  @Input() isSubmited;
  @Input() tag;
  @Input() title;
  @Input() content;
  @Input() keywords;
  @Input() description;
  @Output() tagChange: EventEmitter<any> = new EventEmitter();
  @Output() titleChange: EventEmitter<any> = new EventEmitter();
  @Output() contentChange: EventEmitter<any> = new EventEmitter();
  @Output() keywordsChange: EventEmitter<any> = new EventEmitter();
  @Output() descriptionChange: EventEmitter<any> = new EventEmitter();

  // form
  public editForm: FormGroup;
  public formTitle: AbstractControl;
  public formContent: AbstractControl;
  public formKeywords: AbstractControl;
  public formDescription: AbstractControl;

  public tags: ITag[] = [];

  constructor(
    private fb: FormBuilder,
    private httpService: SaHttpRequesterService,
    private httpLoadingService: SaHttpLoadingService
  ) {
    this.editForm = this.fb.group({
      formTitle: ['', Validators.compose([Validators.required])],
      formContent: ['', Validators.compose([Validators.required])],
      formKeywords: [[], Validators.compose([Validators.required])],
      formDescription: ['', Validators.compose([Validators.required])]
    });
    mergeFormControlsToInstance(this, this.editForm);
  }

  get isLoadingTag(): boolean {
    return this.httpLoadingService.isLoading(LoadingTagKey);
  }

  // 重置数据
  public resetEditForm() {
    this.formTitle.setValue(this.title);
    this.formContent.setValue(this.content);
    this.formKeywords.setValue(this.keywords);
    this.formDescription.setValue(this.description);
  }

  // 标题格式化
  public handleTitleChange(event) {
    const newTitle = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
    this.formTitle.setValue(newTitle);
    this.titleChange.emit(newTitle);
  }

  // 关键词格式化
  public handleKeywordsChange(event) {
    const newWords = event.target.value.replace(/\s/g, '').split(',');
    this.formKeywords.setValue(newWords);
    this.keywordsChange.emit(newWords);
  }

  // 描述内容格式化
  public handleDescriptionChange(event) {
    const newDescription = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
    this.formDescription.setValue(newDescription);
    this.descriptionChange.emit(newDescription);
  }

  // 文章内容格式化
  public handleContentChange(event) {
    if (event.content != null) {
      this.contentChange.emit(event.content);
    }
  }

  // 标签选择格式化
  public handleTagChange() {
    const selectedTags = this.tags.filter(t => t.selected).map(t => t._id);
    this.tagChange.emit(selectedTags);
  }

  // 选择标签
  public resetTagsCheck() {
    this.tags.forEach(tag => {
      tag.selected = this.tag.includes(tag._id);
    });
  }

  // 获取所有标签
  public getTags() {
    return this.httpLoadingService.promise(
      LoadingTagKey,
      this.httpService
        .get<TResponsePaginationTag>(API_PATH.TAG, { per_page: 666 })
        .then(tags => {
          this.tags = tags.result.data;
          this.resetTagsCheck();
        })
    );
  }

  // 初始化
  ngOnInit() {
    this.getTags();
    this.resetEditForm();
  }

  // 数据更新后重新初始化表单
  ngOnChanges() {
    this.resetEditForm();
    this.resetTagsCheck();
  }
}
