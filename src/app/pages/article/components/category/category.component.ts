import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { ArticleCategoryService } from './category.service';

@Component({
  selector: 'article-category',
  template: require('./category.html'),
})
export class ArticleCategory {

  @ViewChild('delModal') delModal: ModalDirective;

  public categories = { data: [] };
  public addCategoryState = { ing: false, success: false };
  public delCategory:any;
  public editCategory:any;
  public delCategories:any;

  constructor(private _articleCategoryService:ArticleCategoryService,
              private _notificationsService: NotificationsService) {}

  ngOnInit() {
    this._getCategories();
  }

  // 分类级别递归排序
  private _categoryLevelBuild = () => {

    // 初始化数据
    const categories = this.categories.data;
    let cates = Array.from(categories);
    // let cates = categories.filter((c, i) => !c.pid);
    // let subCates = categories.filter((c, i) => !!c.pid);

    // 级别数据构造
    const levelBuild = (sub, cates, level) => {

      // 遍历传入的父级分类
      cates.forEach(c => {
        // 如果当前分类的pid是父分类
        if(Object.is(sub.pid, c._id)) {
          // 则把自己加入到父分类的children中
          // console.log(sub.slug);
          c.level = level;
          sub.level = level + 1;
          c.children = c.children || [];
          c.children.push(sub);
          // console.log(c)
          // subCates.splice(subCates.findIndex((c) => Object.is(c, sub)), 1);
        } else {
          // 否则，如果父分类有子级，则继续递归子级
          let hasChildren = c.children && c.children.length;
          hasChildren && levelBuild(sub, c.children, level + 1);
          hasChildren || (c.level = level);
        }
      })
    };

    // 执行级别数据构造
    cates.forEach(cate => { levelBuild(cate, cates, 0)});

    // 扁平数据构造
    const levelBuildRun = cates => {
      let newCategories = [];
      const levelBuildOptimize = cates => {
        cates.forEach(c => {
          newCategories.push(c);
          if(c.children && c.children.length) levelBuildOptimize(c.children);
        })
      }
      levelBuildOptimize(cates);
      return newCategories;
    }

    // 开始执行
    this.categories.data = levelBuildRun([...cates, ...[]]);
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
      this.addCategoryState = { ing: false, success: !!_category.code };
    });
  }

  // 修改分类
  private _putCategory(category) {
    this.editCategory = category;
  }

  // 确认修改分类
  private _doPutCategory(category) {
    this.addCategoryState = { ing: true, success: false };
    this._articleCategoryService.putCategory(Object.assign(this.editCategory, category)).then(category => {
      if(category.code) {
        this._getCategories();
        this.editCategory = null;
      }
      this.addCategoryState = { ing: false, success: !!category.code };
    });
  }

  // 删除分类弹窗
  private _delCategory(category) {
    this.delCategory = category;
    this.delModal.show();
  }

  // 分类弹窗取消
  private _canceldDelCategory(category) {
    this.delCategory = null;
    this.delModal.hide();
  }

  // 确认删除分类
  private _doDelCategory() {
    this._articleCategoryService.delCategory(this.delCategory._id).then(category => {
      this.delCategory = null;
      this.delModal.hide();
      this._getCategories();
    });
  }

  // 批量删除分类
  private _delCategories(categories) {
    this.delCategories = categories;
    this.delCategory = null;
    this.delModal.show();
  }

  // 确认批量删除
  private _doDelCategories() {
    this._articleCategoryService.delCategories(this.delCategories).then(categories => {
      this.delCategories = null;
      this.delModal.hide();
      this._getCategories();
    });
  }
}
