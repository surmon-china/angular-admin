import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const marked = require('marked');
const CodeMirror = require('codemirror');
(<any>window).marked = marked;
(<any>window).CodeMirror = CodeMirror;

require('codemirror/mode/meta.js');
require('codemirror/mode/go/go.js');
require('codemirror/mode/gfm/gfm.js');
require('codemirror/mode/vue/vue.js');
require('codemirror/mode/css/css.js');
require('codemirror/mode/lua/lua.js');
require('codemirror/mode/php/php.js');
require('codemirror/mode/xml/xml.js');
require('codemirror/mode/jsx/jsx.js');
require('codemirror/mode/sql/sql.js');
require('codemirror/mode/pug/pug.js');
require('codemirror/mode/lua/lua.js');
require('codemirror/mode/sass/sass.js');
require('codemirror/mode/http/http.js');
require('codemirror/mode/perl/perl.js');
require('codemirror/mode/ruby/ruby.js');
require('codemirror/mode/nginx/nginx.js');
require('codemirror/mode/shell/shell.js');
require('codemirror/mode/clike/clike.js');
require('codemirror/mode/stylus/stylus.js');
require('codemirror/mode/python/python.js');
require('codemirror/mode/haskell/haskell.js');
require('codemirror/mode/markdown/markdown.js');
require('codemirror/mode/htmlmixed/htmlmixed.js');
require('codemirror/mode/javascript/javascript.js');

require('codemirror/addon/mode/overlay.js');
require('codemirror/addon/edit/closetag.js')
require('codemirror/addon/edit/continuelist.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/display/fullscreen.js');
require('codemirror/addon/scroll/annotatescrollbar.js')
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/selection/mark-selection.js');
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/matchesonscrollbar.js')；
require('codemirror/addon/search/searchcursor.js');
require('codemirror/addon/search/match-highlighter.js');
require('codemirror/addon/fold/foldcode.js');
require('codemirror/addon/fold/xml-fold.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/fold/comment-fold.js');
require('codemirror/addon/fold/indent-fold.js');
require('codemirror/addon/fold/brace-fold.js');
require('codemirror/addon/fold/markdown-fold.js');

@Component({
  selector: 'markdown-editor',
  template: require('./markdownEditor.html'),
  styles: [
    require('./markdownEditor.component.scss'),
    require('codemirror/lib/codemirror.css'),
    require('codemirror/theme/base16-dark.css'),
    require('codemirror/addon/display/fullscreen.css'),
    require('codemirror/addon/fold/foldgutter.css')
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BaMarkdownEditorComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class BaMarkdownEditorComponent implements AfterViewInit, ControlValueAccessor {

  // 基本数据
  editor:any;
  content:any = '';
  editorElem:HTMLElement;

  previewMode:number = 0;

  // 传入配置
  @Input() config: Object = {};

  // 派发事件
  @Output() ready: EventEmitter<any> = new EventEmitter();
  @Output() change: EventEmitter<any> = new EventEmitter();

  // ...
  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};

  // 注入Dom
  constructor(private elementRef: ElementRef) { }

  // 视图加载完成后执行初始化
  ngAfterViewInit() {
    this.editorElem = this.elementRef.nativeElement.children[0].children[1].children[0].children[0];
    this.editor = CodeMirror.fromTextArea(this.editorElem, {
      // 语言模式 github markdown扩展
      mode: 'gfm',
      // 行号
      lineNumbers: true,
      // 自动验证错误
      matchBrackets: true,
      // 是否换行
      lineWrapping: false,
      // 点击高亮正行
      styleActiveLine: true,
      // 配色
      theme: 'base16-dark',
      // 自动补全括号
      autoCloseBrackets: true,
      // 自动闭合标签
      autoCloseTags: true,
      // 自动高亮所有选中单词
      styleSelectedText: true,
      highlightSelectionMatches: { showToken: /w/, annotateScrollbar: true },
      // 展开折叠
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
      // 回车键自动补全上一步格式
      extraKeys: { 
        "Enter": "newlineAndIndentContinueMarkdownList",
        "F11"(cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },
        "Esc"(cm) {
          if (cm.getOption("fullScreen")) cm.setOption("fullScreen", false);
        }
      }
    });
    this.editor.on('change', cm => {
      const content = cm.getValue();
      if(!Object.is(content, this.content)) {
        this.content = content;
        this.change.emit({
          editor: this.editor,
          content: this.content
        });
      }
    });
  }

  // 写数据
  writeValue(currentValue: any = '') {
    if (currentValue && !Object.is(currentValue, this.content)) {
      this.content = currentValue;
      this.editor.setValue(this.content)
    }
  }

  // 注册事件
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  // 注册事件
  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
