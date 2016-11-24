import { Component } from '@angular/core';
// import { BaCard } from '../../../theme/components/baCard';
import { CategoryList } from './components/list';
import { CategoryAdd } from './components/add';
import { CategoryService } from '../../../theme/services/category';

@Component({
  selector: 'category',
  // directives: [BaCard, CategoryList, CategoryAdd],
  providers: [CategoryService],
  // template: require('./category.html')
})

export class ArticleCategory {

  /*

  constructor(private categoryService: CategoryService) {
    this.categories = {
      result: {
        data: []
      }
    };
  }

  public getCategories(params) {
    this.categoryService.getLists().subscribe(res => {
      console.log(res);
      this.categories = res.result;
    }, err => {
      console.log(err);
    }));
  }

  // 组件初始化
  ngOnInit() {

    console.log('init');

    // 获取文章列表
    this.getCategories()
  }

  */

}
