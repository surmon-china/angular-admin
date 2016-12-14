import { Component, ViewChild } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap';
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
    let categories = Array.from(this.categories.data);
    let toDoDeletes = [];

    // 级别数据构造
    categories.forEach(cate => {
      // 找到问题数据并添加标记
      cate.unrepaired = (!!cate.pid && !categories.find(c => Object.is(cate.pid, c._id)))
      categories.forEach(c => {
        if(Object.is(cate.pid, c._id)) {
          c.children = c.children || [];
          c.children.push(cate);
          toDoDeletes.push(cate);
        }
      })
    });

    // 扁平数据构造（同时添加级别标示）
    const levelBuildRun = cates => {
      let newCategories = [];
      const levelBuildOptimize = (cates, level) => {
        cates.forEach(c => {
          c.level = level;
          newCategories.push(c);
          if(c.children && c.children.length) levelBuildOptimize(c.children, level + 1);
        })
      }
      levelBuildOptimize(cates, 0);
      return newCategories;
    }

    // 开始执行
    this.categories.data = levelBuildRun(categories.filter(c => !toDoDeletes.includes(c)));
  };

  // 获取分类
  private _getCategories() {
    this._articleCategoryService
    .getCategories()
    .then(categories => {
      this.categories = categories.result;
      this._categoryLevelBuild();
    });
  }

  // 添加分类
  private _addCategory(category) {
    this.addCategoryState = { ing: true, success: false };
    this._articleCategoryService
    .addCategory(category)
    .then(_category => {
      this._getCategories();
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
    this._articleCategoryService
    .putCategory(Object.assign(this.editCategory, category))
    .then(category => {
      this._getCategories();
      this.editCategory = null;
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
