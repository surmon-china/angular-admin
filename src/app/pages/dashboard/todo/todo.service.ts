import { Injectable } from '@angular/core';

@Injectable()
export class TodoService {

  private _todoList = [
    { text: '标签项，需要增加icon自定义字段' },
    { text: '发布文章页，在标签和分类为空时缺少提示信息，文章的默认缩略图需调整' },
    { text: '仪表盘信息聚合（系统信息聚合、百度统计api信息聚合、多说信息聚合）' },
    { text: '文章发布后自动ping给搜索引擎xml' },
    { text: '所有无用组件/代码的清理' },
    { text: '程序截图 + 文档撰写' },
    { text: 'Get in touch with akveo team' },
    { text: '...' }
  ];

  getTodoList() {
    return this._todoList;
  }
}
