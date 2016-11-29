import { Component } from '@angular/core';
// import { PageService } from '../../../theme/services/page';

@Component({
  selector: 'page-list',
  template: require('./list.html')
})

export class PageList {

  pages = {
    result: {
      data: [{
        meta: {

        }
      }]
    }
  };

  /*

  constructor(private pageService: PageService) {
    this.pages = {
      result: {
        data: []
      }
    };
  }

  public getPages(params) {
    this.pageService.getLists().subscribe(res => {
      console.log(res);
      this.pages = res;
    }, err => {
      console.log(err);
    }));
  }

  // 组件初始化
  ngOnInit() {

    console.log('init');

    // 获取文章列表
    this.getPages()
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
