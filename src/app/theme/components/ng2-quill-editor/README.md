[![GitHub issues](https://img.shields.io/github/issues/surmon-china/ng2-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/ng2-quill-editor/issues)
[![GitHub forks](https://img.shields.io/github/forks/surmon-china/ng2-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/ng2-quill-editor/network)
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/ng2-quill-editor.svg?style=flat-square)](https://github.com/surmon-china/ng2-quill-editor/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)](https://raw.githubusercontent.com/surmon-china/ng2-quill-editor/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/surmon-china/ng2-quill-editor.svg?style=social?style=flat-square)](https://twitter.com/intent/tweet?text=Wow:&url=%5Bobject%20Object%5D)

[![NPM](https://nodei.co/npm/ng2-quill-editor.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/ng2-quill-editor/)


# Ng2-Quill-Editor
Quill editor for Angular2，基于Quill、适用于Angular2的富文本编辑器。

# Example
[Demo Page](https://surmon-china.github.io/ng2-quill-editor/)


### Installation

``` bash
npm install ng2-quill-editor --save
```


### Sample
Include QuillEditorModule in your main module :
``` javascript
import { QuillEditorModule } from 'ng2-quill-editor';

@NgModule({
  // ...
  imports: [
    QuillEditorModule
  ],
  // ...
})
export class AppModule {}
```

Then use it in your component :

``` html
<!-- use with ngModel -->
<quill-editor [(ngModel)]="editorContent"
              [config]="editorConfig"
              (ready)="onEditorCreated($event)"
              (change)="onContentChanged($event)"></quill-editor>


<!-- or use with formControl -->
<quill-editor class="form-control"
              [formControl]="editorContent"
              [config]="editorConfig"
              (ready)="onEditorCreated($event)"
              (change)="onContentChanged($event)"></quill-editor>
```

``` javascript
import { Component } from '@angular/core';

@Component({
  selector: 'sample',
  template: require('./sample.html')
})
export class Sample{
  constructor(){
    this.editorContent = `<p>My HTML</p>`;
    this.editorConfig = {
      placeholder: "输入公告内容，支持html"
    };
  }
  onEditorCreated(quill) {
    console.log('this is quill object', quill);
  }
  onContentChanged(quill, html, text) {
    console.log(quill, html, text);
  }
}
```


### Configuration
- config : The configuration object for quill see https://quilljs.com/docs/quickstart/


# Author Blog
[Surmon](http://surmon.me)
