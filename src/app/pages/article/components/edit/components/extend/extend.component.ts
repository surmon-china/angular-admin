import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'box-article-edit-extend',
  template: require('./extend.html'),
  styles: [require('./extend.scss')]
})

export class ArticleEditExtendComponent {

  @Input() extends;
  @Output() extendsChange: EventEmitter<any> = new EventEmitter();

  constructor() {}

  // 删除自定义配置项目
  public delExtendItem(index) {
    this.extends.splice(index, 1);
    this.emitExtendData();
  }

  // 增加自定义配置项目
  public addExtendItem() {
    this.extends = [...this.extends, {}];
    this.emitExtendData();
  }

  // 改变数据后emit事件
  public emitExtendData() {
    this.extendsChange.emit(this.extends);
  }
}
