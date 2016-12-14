import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ng2-bootstrap';
import { NotificationsService } from 'angular2-notifications';
import { AnnouncementsService } from './announcement.service';

@Component({
  selector: 'announcement',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [require('./announcement.scss')],
  template: require('./announcement.html')
})
export class Announcement {

  @ViewChild('delModal') delModal: ModalDirective;

  public data = 'padlpasd';
  public form:FormGroup;
  public content:AbstractControl;
  public state:AbstractControl;
  public announcements = { data: [] };
  public del_announcement:any;
  public edit_announcement:any;
  public announcementsSelectAll:boolean = false;
  public selectedAnnouncements = [];
  public wangEditorConfig = {
    printLog: false,
    menus: ['source', '|', 'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|', 'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|', 'link', 'unlink', 'table', 'img', 'video', 'insertcode', '|', 'undo', 'redo', 'fullscreen'],
    uploadImgUrl: 'asdad'
  };

  constructor(private _fb:FormBuilder,
              private _announcementService:AnnouncementsService) {

    this.form = _fb.group({
      'content': ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      'state': ['1', Validators.compose([Validators.required])]
    });

    this.content = this.form.controls['content'];
    this.state = this.form.controls['state'];
  }

  ngOnInit() {
    this.getAnnouncements();
  }

  // 多选切换
  public batchSelectChange(is_select) {
    if(!this.announcements.data.length) return;
    this.selectedAnnouncements = [];
    this.announcements.data.forEach(item => { item.selected = is_select; is_select && this.selectedAnnouncements.push(item._id) });
  }

  // 单个切换
  public itemSelectChange() {
    this.selectedAnnouncements = [];
    const announcements = this.announcements.data;
    announcements.forEach(item => { item.selected && this.selectedAnnouncements.push(item._id) });
    if(!this.selectedAnnouncements.length) this.announcementsSelectAll = false;
    if(!!this.selectedAnnouncements.length && this.selectedAnnouncements.length == announcements.length) this.announcementsSelectAll = true;
  }

  // 重置表单
  public resetForm():void {
    this.form.reset({
      content: '',
      state: '1'
    });
  }

  // 提交表单
  public submitAnnouncement(values:Object):void {
    if (this.form.valid) {
      this.edit_announcement ? this.doPutAnnouncement(values) : this.addAnnouncement(values);
    }
  }

  // 获取公告
  public getAnnouncements() {
    this._announcementService.getAnnouncements()
    .then(announcements => {
      this.announcements = announcements.result;
    })
    .catch(error => {});
  }

  // 添加公告
  public addAnnouncement(announcement) {
    this._announcementService.addAnnouncement(announcement)
    .then(_announcement => {
      this.resetForm();
      this.getAnnouncements();
    });
  }

  // 修改公告弹窗
  public putAnnouncementModal(announcement) {
    this.edit_announcement = announcement;
    this.form.reset(announcement);
  }

  // 确认修改公告
  public doPutAnnouncement(announcement) {
    this._announcementService.putAnnouncement(Object.assign(this.edit_announcement, announcement))
    .then(_announcement => {
      this.getAnnouncements();
      this.edit_announcement = null;
      this.resetForm();
    });
  }

  // 删除公告弹窗
  public delAnnouncementModal(announcement) {
    this.del_announcement = announcement;
    this.delModal.show();
  }

  // 删除弹窗取消
  public canceldDelAnnouncementModal(announcement) {
    this.delModal.hide();
    this.del_announcement = null;
  }

  // 确认删除公告
  public doDelAnnouncement() {
    this._announcementService.delAnnouncement(this.del_announcement._id)
    .then(announcement => {
      this.delModal.hide();
      this.del_announcement = null;
      this.getAnnouncements();
    });
  }

  // 批量删除公告弹窗
  public delAnnouncementsModal(announcements) {
    this.del_announcement = null;
    this.delModal.show();
  }

  // 确认批量删除
  public doDelAnnouncements() {
    this._announcementService.delAnnouncements(this.selectedAnnouncements)
    .then(announcements => {
      this.delModal.hide();
      this.getAnnouncements();
    })
    .catch(err => {
      this.delModal.hide();
    });
  }
}
