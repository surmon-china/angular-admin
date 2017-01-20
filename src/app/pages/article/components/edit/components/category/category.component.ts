import { Component, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';
import { ArticleTagService } from '../../../tag/tag.service';
import { ArticleCategoryService } from '../../../category/category.service';

@Component({
  selector: 'article-edit-category',
  encapsulation: ViewEncapsulation.None,
  template: require('./category.html'),
  styles: [require('./category.scss')]
})

export class ArticleEditCategory {

  @Input() category;
  @Input() categories = { data: [] };
  @Output() categoryChange: EventEmitter<any> = new EventEmitter();

  constructor(private _articleTagService: ArticleTagService,
              private _articleCategoryService: ArticleCategoryService) {
  }

  ngOnInit() {
  	this.getCategories();
  }

  // 分类级别标记
  public categoryLevelMark(level): void { 
    return Array.from({ length: level }, () => '')
  };

  // 分类级别递归排序
  public categoryLevelBuild(): void {

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
          c.checked = this.category.indexOf(c._id) > -1;
          if(c.children && c.children.length) levelBuildOptimize(c.children, level + 1);
        })
      }
      levelBuildOptimize(cates, 0);
      return newCategories;
    }

    // 开始执行
    this.categories.data = levelBuildRun(categories.filter(c => toDoDeletes.indexOf(c) == -1));
  };

  // 勾选动作
  public itemSelectChange(checked, category) {
    let cateIndex = this.category.indexOf(category._id);
    let hasCate = !Object.is(cateIndex, -1);
    if(checked) {
      if(!hasCate) {
        this.category.push(category._id);
      }
    } else {
      if(hasCate) {
        this.category.splice(cateIndex, 1);
      }
    }
    this.categoryChange.emit(this.category);
  }

  // 获取所有分类
  public getCategories() {
  	this._articleCategoryService.getCategories()
  	.then(categories => {
  		this.categories = categories.result;
  		this.categoryLevelBuild();
  	})
  	.catch(error => {})
  }
}
