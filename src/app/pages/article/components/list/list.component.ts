import { Component } from '@angular/core';
// import { ArticleService } from '../../../theme/services/article';

@Component({
  selector: 'list',
  template: require('./list.html')
})

export class ArticleList {

  public articles = {
    result: {
      data: [{
        meta: {

        }
      }]
    }
  }

  /*

  constructor(private articleService: ArticleService) {
    this.articles = {
      result: {
        data: []
      }
    };
  }

  public getArticles(params) {
    this.articleService.getLists().subscribe(res => {
      console.log(res);
      this.articles = res;
    }, err => {
      console.log(err);
    }));
  }

  // 组件初始化
  ngOnInit() {

    console.log('init');

    // 获取文章列表
    this.getArticles()
  }

  ngOnDestroy() {
    console.log('销毁');
  }

  ngDoCheck() {
    // Custom change detection
  }

  ngOnChanges(changes) {
    // Called right after our bindings have been checked but only
    // if one of our bindings has changed.
    //
    // changes is an object of the format:
    // {
    //   'prop': PropertyUpdate
    // }
  }

  ngAfterContentInit() {
    // Component content has been initialized
  }

  ngAfterContentChecked() {
    // Component content has been Checked
  }

  ngAfterViewInit() {
    // Component views are initialized
  }

  ngAfterViewChecked() {
    // Component views have been checked
  }

  */
}
