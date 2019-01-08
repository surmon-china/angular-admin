/**
 * @file 分类页面发布组件
 * @module app/page/article/component/category/add
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { IFetching, IResponsePaginationData } from '@app/pages/pages.constants';
import { mergeFormControlsToInstance, formControlStateClass } from '@/app/pages/pages.service';
import { ICategory } from '@/app/pages/article/article.service';

const DEFAULT_FORM = {
  name: '',
  slug: '',
  pid: null,
  description: '',
  extends: [{ name: 'icon', value: 'icon-category'}]
};

@Component({
  selector: 'box-category-add',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./add.scss')],
  template: require('./add.html')
})
export class ArticleCategoryAddComponent implements OnChanges {

  controlStateClass = formControlStateClass;

  @Input() fetching: IFetching;
  @Input() category: ICategory;
  @Input() categories: IResponsePaginationData<ICategory>;
  @Output() resetForm: EventEmitter<any> = new EventEmitter();
  @Output() submitForm: EventEmitter<any> = new EventEmitter();

  public editForm: FormGroup;
  public name: AbstractControl;
  public slug: AbstractControl;
  public pid: AbstractControl;
  public description: AbstractControl;
  public extends: AbstractControl;

  constructor(fb: FormBuilder) {
    this.editForm = fb.group({
      pid: [DEFAULT_FORM.pid, Validators.compose([])],
      name: [DEFAULT_FORM.name, Validators.compose([Validators.required])],
      slug: [DEFAULT_FORM.slug, Validators.compose([Validators.required])],
      description: [DEFAULT_FORM.description, Validators.compose([])],
      extends: [DEFAULT_FORM.extends]
    });
    mergeFormControlsToInstance(this, this.editForm);
  }

  // 是否禁用分类选择
  public isDisableCateSelect(cate): boolean {
    const category = this.category;
    return category
      ? category._id === cate._id || category._id === cate.pid
      : false;
  }

  // 删除自定义配置项目
  public delExtendItem(index) {
    this.extends.value.splice(index, 1);
  }

  // 增加自定义配置项目
  public addExtendItem() {
    this.extends.setValue([...this.extends.value, {}]);
  }

  // 重置表单
  public resetEditForm(emit: boolean): void {
    this.editForm.reset(DEFAULT_FORM);
    return emit && this.resetForm.emit(true);
  }

  // 提交表单
  public submitEditForm(): void {
    if (this.editForm.valid) {
      return this.submitForm.emit(this.editForm.value);
    }
  }

  ngOnChanges(changes) {
    const { category } = changes;
    const newCategory = category && category.currentValue;
    return newCategory && this.editForm.reset(newCategory);
  }
}
