import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { ArticleCategoryService } from './category.service';

@Component({
  selector: 'article-category',
  template: require('./category.html'),
})
export class ArticleCategory {

  @ViewChild('delModal') delModal: ModalDirective;

  public categories = { data: [] };
  public addCategoryState = { ing: false, success: false };

  constructor(private _articleCategoryService:ArticleCategoryService) {}

  ngOnInit() {
    this._getCategories();
  }

  // 分类级别递归排序
  private _categoryLevelBuild = () => {
    const categories = this.categories.data;
    let cates = categories.filter((c, i) => !c.pid);
    let subCates = categories.filter((c, i) => !!c.pid);
    const levelBuild = (sub, cates, level) => {
      cates.forEach(c => {
        if(Object.is(c._id, sub.pid)) {
          c.level = level;
          sub.level = level + 1;
          c.children = c.children || [];
          c.children.push(sub);
        } else {
          let hasChildren = c.children && c.children.length;
          hasChildren && levelBuild(sub, c.children, level + 1);
          hasChildren || (c.level = level);
        }
      })
    };
    subCates.forEach(sub => { levelBuild(sub, cates, 0)});
    let newCategories = [];
    const levelBuildOptimize = cates => {
      cates.forEach(c => {
        newCategories.push(c);
        if(c.children && c.children.length) levelBuildOptimize(c.children);
      })
    }
    levelBuildOptimize(cates);
    this.categories.data = newCategories;
  };

  // 获取分类
  private _getCategories() {
    this._articleCategoryService.getCategories().then(categories => {
      this.categories = categories.result;
      this._categoryLevelBuild();
    });
  }

  // 添加分类
  private _addCategory(category) {
    this.addCategoryState = { ing: true, success: false };
    this._articleCategoryService.addCategory(category).then(_category => {
      if(_category.code) this._getCategories();
      this.addCategoryState = { ing: false, success: true };
    });
  }

  // 修改分类
  private _putCategory(category) {
    console.log(category);
  }

  // 删除分类
  private _delCategory(category) {
    console.log(category);
    this.delModal.show();
  }

  // 批量删除分类
  private _delCategories(categories) {
    console.log(this);
  }
}
