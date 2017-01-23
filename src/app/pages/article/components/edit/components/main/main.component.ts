import { Component, EventEmitter, ViewEncapsulation, Input, Output } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ArticleTagService } from '../../../tag/tag.service';

@Component({
  selector: 'article-edit-main',
  encapsulation: ViewEncapsulation.None,
	styles: [require('./main.scss')],
  template: require('./main.html')
})
export class ArticleEditMain {

	// input
  @Input() tag;
  @Input() title;
  @Input() content;
  @Input() keywords;
  @Input() description;
  @Output() tagChange:EventEmitter<any> = new EventEmitter();
  @Output() titleChange:EventEmitter<any> = new EventEmitter();
  @Output() contentChange:EventEmitter<any> = new EventEmitter();
  @Output() keywordsChange:EventEmitter<any> = new EventEmitter();
  @Output() descriptionChange:EventEmitter<any> = new EventEmitter();

  // form
  public editForm: FormGroup;
	public _title: AbstractControl;
	public _content: AbstractControl;
	public _keywords: AbstractControl;
	public _description: AbstractControl;

	// init
	public tags: any = { dta: [] };
  public editorConfig: any = { placeholder: "输入文章内容，支持html" };

  constructor(private _fb: FormBuilder,
							private _articleTagService: ArticleTagService) {
  	this.editForm = _fb.group({
			'_title': ['', Validators.compose([Validators.required])],
			'_content': ['', Validators.compose([Validators.required])],
			'_keywords': [[], Validators.compose([Validators.required])],
			'_description': ['', Validators.compose([Validators.required])]
		});
		this._title = this.editForm.controls['_title'];
		this._content = this.editForm.controls['_content'];
		this._keywords = this.editForm.controls['_keywords'];
		this._description = this.editForm.controls['_description'];
  }

  // 初始化
  ngOnInit() {
    this.getTags();
  	this.resetEditForm();
  }

  // 数据更新后重新初始化表单
  ngOnChanges(changes) {
    this.resetEditForm();
    // console.log(changes);
    if(changes.content && !changes.content.previousValue && !!changes.content.currentValue) {
      // console.log('过');
      // this.resetEditForm();
    }
  }

  // 重置数据
  public resetEditForm() {
    this.editForm.reset({
      _title: this.title,
      // _content: this.content,
      _keywords: this.keywords,
      _description: this.description
    });
  }

  // 标题格式化
  public titleChangeHandle(event) {
    const newTitle = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
    this._title.setValue(newTitle);
    this.titleChange.emit(newTitle);
  }

  // 关键词格式化
  public keywordsChangeHandle(event) {
  	const newWords = event.target.value.replace(/\s/g, '').split(',');
  	this._keywords.setValue(newWords);
  	this.keywordsChange.emit(newWords);
  }

  // 描述内容格式化
  public descriptionChangeHandle(event) {
    const newDescription = event.target.value.replace(/(^\s*)|(\s*$)/g, '');
    this._description.setValue(newDescription);
    this.descriptionChange.emit(newDescription);
  }

  // 标签选择格式化
  public tagChangeHandle() {
    const selectedTags = Array.from(this.tags.data.filter(t => t.selected), t => t._id);
    this.tagChange.emit(selectedTags);
  }

  // 内容格式化
  public contentChangeHandle({ quill, html, text }) {
    // this.content = html;
    // if(!Object.is(this.content, html) && !Object.is(this.content, text)) {
      // this.contentChange.emit(html);
    // }
    console.log(html, this.content, this._content.value);
    // this.contentChange.emit(html);
  }

  // 获取所有标签
  public getTags() {
  	this._articleTagService.getTags({ per_page: 1000 })
  	.then(tags => {
  		this.tags = tags.result;
      this.tags.data.forEach(tag => {
        if(this.tag.includes(tag._id)) {
          tag.selected = true;
        }
      });
  	})
  	.catch(error => {})
  }
}
