import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { EmailValidator, EqualPasswordsValidator } from '../../../../../../theme/validators';

@Component({
  selector: 'article-category-add',
  template: require('./add.html')
})

export class ArticleCategoryAdd {

  @Input() category;
  @Input() categories;
  @Input() submitState:any;
  @Output() categoryChange:EventEmitter<any> = new EventEmitter();
  @Output() submitCategory:EventEmitter<any> = new EventEmitter();
  @Output() submitStateChange:EventEmitter<any> = new EventEmitter();

  public form:FormGroup;
  public name:AbstractControl;
  public slug:AbstractControl;
  public pid:AbstractControl;
  public description:AbstractControl;

  constructor(fb:FormBuilder) {

    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required])],
      'slug': ['', Validators.compose([Validators.required])],
      'pid': ['', Validators.compose([])],
      'description': ['', Validators.compose([])]
    });

    this.name = this.form.controls['name'];
    this.slug = this.form.controls['slug'];
    this.pid = this.form.controls['pid'];
    this.description = this.form.controls['description'];
  }

  // 级别标记
  public categoryLevelMark = level => Array.from({ length: level }, () => '');

  // 重置
  public resetForm():void {
    this.form.reset({
      pid: '',
      name: '',
      slug: '',
      description: ''
    });
    if(!!this.category) {
      this.category = null;
      this.categoryChange.emit(this.category);
    }
    this.submitState.ing = false;
    this.submitState.success = false;
    this.submitStateChange.emit(this.submitState);
  }

  // 提交
  public onSubmit(category:Object):void {
    if (this.form.valid) return this.submitCategory.emit(category);
  }

  ngOnChanges(changes) {
    const submitOk = !!changes.submitState && !changes.submitState.currentValue.ing && changes.submitState.currentValue.success;
    const category = !!changes.category && !!changes.category.currentValue;
    if(submitOk) this.resetForm();
    if(category) {
      changes.category.currentValue.pid = changes.category.currentValue.pid || '';
      this.form.reset(changes.category.currentValue);
    }
  }
}
