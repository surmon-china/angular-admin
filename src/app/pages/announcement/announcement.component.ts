import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap';
import { AnnouncementService } from './announcement.service';
const marked = require('marked');

@Component({
	selector: 'announcement',
	encapsulation: ViewEncapsulation.None,
	styles: [require('./announcement.scss')],
	template: require('./announcement.html')
})
export class Announcement {

	@ViewChild('delModal') delModal: ModalDirective;

	public searchState:any = 'all';
	public editForm:FormGroup;
	public searchForm:FormGroup;
	public state:AbstractControl;
	public keyword:AbstractControl;
	public content:AbstractControl;
	public announcements = { 
		data: [],
		pagination: {
			current_page: 1,
			total_page: 0,
			per_page: 10,
			total: 0
		}
	};
	public fetching = {
		announcement: false
	};
	public del_announcement:any;
	public edit_announcement:any;
	public announcementsSelectAll:boolean = false;
	public selectedAnnouncements = [];

	constructor(private _fb:FormBuilder,
							private _announcementService:AnnouncementService) {

		this.editForm = _fb.group({
			'content': ['', Validators.compose([Validators.required])],
			'state': ['1', Validators.compose([Validators.required])]
		});

		this.searchForm = _fb.group({
			'keyword': ['', Validators.compose([Validators.required])]
		});

		this.state = this.editForm.controls['state'];
		this.content = this.editForm.controls['content'];
		this.keyword = this.searchForm.controls['keyword'];
	}

	ngOnInit() {
		marked.setOptions({
			renderer: new marked.Renderer(),
			gfm: true,
			tables: true,
			breaks: false,
			pedantic: false,
			sanitize: false,
			smartLists: true,
			smartypants: false
		});
		this.getAnnouncements();
	}

	// 解析Markdown
	public parseMarkdown(content) {
		return marked(content);
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

	// 切换公告类型
	public switchState(state: any): void {
		if(state == undefined || Object.is(state, this.searchState)) return;
		this.searchState = state;
		this.getAnnouncements();
	}

	// 重置编辑表单
	public resetForm(): void {
		this.editForm.reset({
			content: '',
			state: '1'
		});
		this.edit_announcement = null;
	}

	// 重置搜索
	public resetSearchForm():void {
		this.searchForm.reset({ keyword: '' });
	}

	// 提交表单
	public submitAnnouncement(values:Object):void {
		if (this.editForm.valid) {
			this.edit_announcement ? this.doPutAnnouncement(values) : this.addAnnouncement(values);
		}
	}

	// 提交搜索
	public searchAnnouncements(values: Object): any {
		if (this.searchForm.valid) {
			this.getAnnouncements();
		}
	}

	// 刷新本页本类型公告
	public refreshAnnouncements(): any {
		this.getAnnouncements({ page: this.announcements.pagination.current_page });
	}

	// 分页获取公告
	public pageChanged(event: any): any {
		this.getAnnouncements({ page: event.page });
	}

	// 获取公告
	public getAnnouncements(params: any = {}) {
		// 是否搜索
		if(this.keyword.value) {
			params.keyword = this.keyword.value;
		}
		// 如果请求的是全部数据，则优化参数
		if(!Object.is(this.searchState, 'all')) {
			params.state = this.searchState
		}
		// 如果请求的是第一页，则设置翻页组件的当前页为第一页
		if(!params.page || Object.is(params.page, 1)) {
			this.announcements.pagination.current_page = 1;
		}
		this.fetching.announcement = true;
		this._announcementService.getAnnouncements(params)
		.then(announcements => {
			this.announcements = announcements.result;
			this.selectedAnnouncements = [];
			this.announcementsSelectAll = false;
			this.fetching.announcement = false;
		})
		.catch(error => {
			this.fetching.announcement = false;
		});
	}

	// 添加公告
	public addAnnouncement(announcement) {
		this._announcementService.addAnnouncement(announcement)
		.then(_announcement => {
			this.resetForm();
			this.getAnnouncements();
		})
		.catch(error => {});
	}

	// 修改公告
	public putAnnouncement(announcement) {
		this.edit_announcement = announcement;
		this.editForm.reset(announcement);
	}

	// 修改公告提交
	public doPutAnnouncement(announcement) {
		this._announcementService.putAnnouncement(Object.assign(this.edit_announcement, announcement))
		.then(_announcement => {
			this.getAnnouncements({ page: this.announcements.pagination.current_page });
			this.edit_announcement = null;
			this.resetForm();
		})
		.catch(error => {});;
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
			this.getAnnouncements({ page: this.announcements.pagination.current_page });
		})
		.catch(err => {
			this.delModal.hide();
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
			this.getAnnouncements({ page: this.announcements.pagination.current_page });
		})
		.catch(err => {
			this.delModal.hide();
		});
	}
}
