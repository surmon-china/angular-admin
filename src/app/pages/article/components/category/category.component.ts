import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'article-category',
  encapsulation: ViewEncapsulation.None,
  template: require('./category.html'),
})
export class ArticleCategory {

  public categories = [];

  constructor() {
    console.log(this)
  }
}
