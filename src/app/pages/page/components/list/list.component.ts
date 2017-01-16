import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { PagelistService } from './list.service';

@Component({
  selector: 'page-list',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./list.scss')],
  template: require('./list.html')
})

export class PageList {

  // 删除弹窗
  @ViewChild('delModal') delModal: ModalDirective;

  public searchState:any = 'all';
  public searchForm:FormGroup;
  public state:AbstractControl;
  public keyword:AbstractControl;
  public pages = { 
    data: [],
    pagination: {
      current_page: 1,
      total_page: 0,
      per_page: 10,
      total: 0
    }
  };
  public del_page:any;
  public pagesSelectAll:boolean = false;
  public selectedPages = [];

  constructor(private _fb:FormBuilder,
              private _pageListService:PagelistService) {

    this.searchForm = _fb.group({
      'keyword': ['', Validators.compose([Validators.required])]
    });

    this.keyword = this.searchForm.controls['keyword'];
  }

  ngOnInit() {
    this.getPages();
  }

  // 多选切换
  public batchSelectChange(is_select) {
    if(!this.pages.data.length) return;
    this.selectedPages = [];
    this.pages.data.forEach(item => { item.selected = is_select; is_select && this.selectedPages.push(item._id) });
  }

  // 单个切换
  public itemSelectChange() {
    this.selectedPages = [];
    const pages = this.pages.data;
    pages.forEach(item => { item.selected && this.selectedPages.push(item._id) });
    if(!this.selectedPages.length) this.pagesSelectAll = false;
    if(!!this.selectedPages.length && this.selectedPages.length == pages.length) this.pagesSelectAll = true;
  }

  // 切换页面类型
  public switchState(state:any):void {
    if(state == undefined || Object.is(state, this.searchState)) return;
    this.searchState = state;
    this.getPages();
  }


  // 提交搜索
  public searchPages(values:Object):void {
    if (this.searchForm.valid) {
      this.getPages(values);
    }
  }

  // 刷新本页本类型页面
  public refreshPages():void {
    this.getPages({ page: this.pages.pagination.current_page });
  }

  // 分页获取页面
  public pageChanged(event:any):void {
    this.getPages({ page: event.page });
  }

  // 获取页面
  public getPages(params:any = {}) {
    // 如果没有搜索词，则清空搜索框
    if(!params || !params.keyword) {
      this.searchForm.reset({ content: '' });
    }
    // 如果请求的是全部数据，则优化参数
    if(!Object.is(this.searchState, 'all')) {
      params.state = this.searchState
    }
    // 如果请求的是第一页，则设置翻页组件的当前页为第一页
    if(!params.page || Object.is(params.page, 1)) {
      this.pages.pagination.current_page = 1;
    }
    this._pageListService.getPages(params)
    .then(pages => {
      this.pages = pages.result;
    })
    .catch(error => {});
  }

  // 添加页面
  public addPage(page) {
    this._pageListService.addPage(page)
    .then(_page => {
      this.resetForm();
      this.getPages();
    })
    .catch(error => {});;
  }

  // 删除页面弹窗
  public delPageModal(page) {
    this.del_page = page;
    this.delModal.show();
  }

  // 删除弹窗取消
  public canceldDelPageModal(page) {
    this.delModal.hide();
    this.del_page = null;
  }

  // 确认删除页面
  public doDelPage() {
    this._pageListService.delPage(this.del_page._id)
    .then(page => {
      this.delModal.hide();
      this.del_page = null;
      this.getPages();
    });
  }

  // 批量删除页面弹窗
  public delPagesModal(pages) {
    this.del_page = null;
    this.delModal.show();
  }

  // 确认批量删除
  public doDelPages() {
    this._pageListService.delPages(this.selectedPages)
    .then(pages => {
      this.delModal.hide();
      this.getPages();
      this.selectedPages = [];
      this.pagesSelectAll = false;
    })
    .catch(err => {
      this.delModal.hide();
    });
  }
}
