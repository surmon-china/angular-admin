/**
 * @file markdown 编辑器组件
 * @desc app/component/markdownn-editor
 * @author Surmon <https://github.com/surmon-china>
 */

import marked from 'marked';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { AfterViewInit, ViewChild, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewEncapsulation } from '@angular/core';
import { isPostArticlePage, isAnnouncementPage } from '@app/discriminators/url';
import * as KEYCODE from '@app/constants/keycode';

const hljs = require('highlight.js');
const CodeMirror = require('codemirror');
const { store } = require('./libs/store.js');

enum EPreviewMode {
  none = 0,
  half = 1,
  full = 2
}

const EDIT_CONFIG = {
  draftTimer: 1600,
  autoTimer: 1000
};

(window as any).hljs = hljs;
(window as any).store = store;
(window as any).marked = marked;
(window as any).CodeMirror = CodeMirror;

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
require('codemirror/addon/edit/closetag.js');
require('codemirror/addon/edit/continuelist.js');
require('codemirror/addon/edit/closebrackets.js');
require('codemirror/addon/scroll/annotatescrollbar.js');
require('codemirror/addon/selection/active-line.js');
require('codemirror/addon/selection/mark-selection.js');
// require('codemirror/addon/search/searchcursor.js');
// require('codemirror/addon/search/matchesonscrollbar.js')；
// require('codemirror/addon/search/searchcursor.js');
// require('codemirror/addon/search/match-highlighter.js');
require('codemirror/addon/fold/foldcode.js');
require('codemirror/addon/fold/xml-fold.js');
require('codemirror/addon/fold/foldgutter.js');
require('codemirror/addon/fold/comment-fold.js');
require('codemirror/addon/fold/indent-fold.js');
require('codemirror/addon/fold/brace-fold.js');
require('codemirror/addon/fold/markdown-fold.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight(code, lang, callback) {
    return hljs.highlightAuto(code).value;
  }
});

@Component({
  selector: 'sa-markdown-editor',
  templateUrl: './markdownEditor.component.html',
  styleUrls: [
    './markdownEditor.component.scss'
  ],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SaMarkdownEditorComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class SaMarkdownEditorComponent implements AfterViewInit, ControlValueAccessor {

  // 基本数据
  editor: any;
  content = '';
  markedHtml = '';
  editorElem: HTMLElement;

  previewMode: EPreviewMode = EPreviewMode.none;
  fullscreen = false;

  // 计时器
  public timer = null;
  public modelConfirm: boolean = false;

  @ViewChild('bakModal', { static: false }) bakModal: ModalDirective;

  // 传入配置
  @Input() config: object;

  // 派发事件
  @Output() ready: EventEmitter<any> = new EventEmitter();
  // tslint:disable-next-line:no-output-native
  @Output() change: EventEmitter<any> = new EventEmitter();

  // ...
  onModelChange: any = () => {};
  onModelTouched: any = () => {};

  constructor(private elementRef: ElementRef) {}

  // 使用本地草稿
  useArticleBak() {
    this.content = store.get(location.pathname);
    this.editor.setValue(this.content);
    this.markedHtml = marked(this.content);
    this.bakModal.hide();
  }

  // 关闭草稿弹窗
  cancelBakModal() {
    this.editor.setValue(this.content);
    this.markedHtml = marked(this.content);
    this.bakModal.hide();
  }

  // 视图加载完成后执行初始化
  ngAfterViewInit() {
    if (this.editor) {
      return false;
    }

    this.editorElem = this.elementRef.nativeElement.children[0].children[1].children[0].children[0];
    this.editor = CodeMirror.fromTextArea(this.editorElem, Object.assign({
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
      // styleSelectedText: true,
      // highlightSelectionMatches: { showToken: /w/, annotateScrollbar: true },
      // 展开折叠
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
      // 回车键自动补全上一步格式
      extraKeys: {
        Enter: 'newlineAndIndentContinueMarkdownList'
      }
    }, this.config));

    this.editor.on('blur', cm => {
      this.onModelTouched();
    });

    this.editor.on('change', cm => {
      const content = cm.getValue();
      if (content !== this.content) {
        this.content = content;
        this.change.emit({
          editor: this.editor,
          content: this.content
        });
        this.onModelChange(this.content);
        if (this.previewMode !== EPreviewMode.none) {
          this.parseMarked();
          // console.log('应该是发现了本地数据的变化');
        }
      }
      // 自动保存草稿
      if (this.timer) {
        clearTimeout(this.timer);
      }
      if (content !== store.get(location.pathname)) {
        this.timer = setTimeout(() => {
          store.set(location.pathname, content);
        }, EDIT_CONFIG.draftTimer);
      }
    });

    // 如果是发布页面，有本地存储，则直接读取存储
    const url = location.pathname;
    if (isPostArticlePage(url) || isAnnouncementPage(url)) {
      const bak = store.get(location.pathname);
      if (bak) {
        this.content = bak;
        this.editor.setValue(this.content);
        // this.markedHtml = marked(this.content);
      }
    } else {
    // 如果是编辑页面，没有弹窗，则设置
      setTimeout(() => {
        if (!this.bakModal.isShown) {
          this.editor.setValue(this.content);
          this.markedHtml = marked(this.content);
        }
      }, EDIT_CONFIG.autoTimer);
    }

    /*
    const dropZone = this.elementRef.nativeElement.children[0].children[1];
    dropZone.addEventListener('drop', event => {
      event.preventDefault();
      event.stopPropagation();
      let reader = new FileReader();
      reader.onload = e => {
        console.log(e);
        // this.editor.setValue(e.target.result);
      };
      reader.readAsText(event.dataTransfer.files[0]);
    }, false);
    */
  }

  // 解析markeddown
  parseMarked() {
    this.markedHtml = marked(this.content);
  }

  // 写数据
  writeValue(currentValue: any) {
    const bak = store.get(location.pathname);
    if (currentValue !== undefined && currentValue !== this.content) {
      // 如果是公告页就啥也不干
      if (isAnnouncementPage(location.pathname)) {
        this.content = currentValue;
        this.editor.setValue(this.content);
        return false;
      }
      if (bak && currentValue !== bak && !this.modelConfirm) {
        this.bakModal.show();
        this.modelConfirm = true;
      }
      this.content = currentValue;
    } else if (bak) {
      this.content = bak;
    }
  }

  // 保存文件
  saveFile(code, name) {
    const blob = new Blob([code], { type: 'text/plain' });
    if ((window as any).saveAs) {
      (window as any).saveAs(blob, name);
    } else if ((navigator as any).saveBlob) {
      (navigator as any).saveBlob(blob, name);
    } else {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', name);
      const event = document.createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, (window as any), 1, 0, 0, 0, 0, false, false, false, false, 0, null);
      link.dispatchEvent(event);
    }
  }

  // 保存为markdown
  saveAsMarkdown() {
    const now = new Date();
    const data = now.toLocaleDateString();
    const time = now.toLocaleTimeString();
    this.saveFile(this.content, `${data + time}.md`);
  }

  // 按键listen
  keyDownListen(event) {

    // 退出全屏
    if (event.keyCode === KEYCODE.ESC) {
      this.fullscreen = false;
    }

    // 全屏
    if (event.keyCode === KEYCODE.F5) {
      this.fullscreen = !this.fullscreen;
    }

    // 保存
    if (event.keyCode === KEYCODE.S && (event.ctrlKey || event.metaKey || event.shiftKey)) {
      this.saveAsMarkdown();
      event.preventDefault();
      return false;
    }
  }

  // 插入内容
  updateCodeMirror(data) {
    const codemirror = this.editor;
    codemirror.replaceSelection(data);
    const startPoint = codemirror.getCursor('start');
    const endPoint = codemirror.getCursor('end');
    codemirror.setSelection(startPoint, endPoint);
    codemirror.focus();
    /*
    let doc = codemirror.getDoc();
    let cursor = doc.getCursor(); // gets the line number in the cursor position
    let line = doc.getLine(cursor.line); // get the line contents
    let pos = { // create a new object to avoid mutation of the original selection
      line: cursor.line,
      ch: line.length - 1 // set the character position to the end of the line
    }
    doc.replaceRange('\n' + data + '\n', pos); // adds a new line
    */
  }

  // 替换光标选中项内容
  replaceSelection(cm, active, start, end) {
    let text;
    const startPoint = cm.getCursor('start');
    const endPoint = cm.getCursor('end');
    if (active) {
      text = cm.getLine(startPoint.line);
      start = text.slice(0, startPoint.ch);
      end = text.slice(startPoint.ch);
      cm.setLine(startPoint.line, start + end);
    } else {
      text = cm.getSelection();
      cm.replaceSelection(start + text + end);
      startPoint.ch += start.length;
      endPoint.ch += start.length;
    }
    cm.setSelection(startPoint, endPoint);
    cm.focus();
  }

  // 分析编辑器当前的光标位置
  getState(cm, pos) {
    pos = pos || cm.getCursor('start');
    const stat = cm.getTokenAt(pos);
    if (!stat.type || !stat.type.split) { return {}; }
    const types = stat.type.split(' ');
    const ret = {};
    // tslint:disable-next-line:one-variable-per-declaration
    let data, text;
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < types.length; i++) {
      data = types[i];
      if (data === 'strong') {
        (ret as any).bold = true;
      } else if (data === 'letiable-2') {
        text = cm.getLine(pos.line);
        if (/^\s*\d+\.\s/.test(text)) {
          ret['ordered-list'] = true;
        } else {
          ret['unordered-list'] = true;
        }
      } else if (data === 'atom') {
        (ret as any).quote = true;
      } else if (data === 'em') {
        (ret as any).italic = true;
      }
    }
    return ret;
  }

  // 粗体
  toggleBold() {
    const codemirror = this.editor;
    const stat = this.getState(codemirror, codemirror.getCursor());

    let text;
    const start = '**';
    const end = '**';

    const startPoint = codemirror.getCursor('start');
    const endPoint = codemirror.getCursor('end');
    if ((stat as any).bold) {
      /*
      text = codemirror.getLine(startPoint.line);
      start = text.slice(0, startPoint.ch);
      end = text.slice(startPoint.ch);

      start = start.replace(/^(.*)?(\*|\_){2}(\S+.*)?$/, '$1$3');
      end = end.replace(/^(.*\S+)?(\*|\_){2}(\s+.*)?$/, '$1$3');
      startPoint.ch -= 2;
      endPoint.ch -= 2;
      // console.log('text', text, 'start', start, 'end', end, startPoint, endPoint);
      // codemirror.setLine(startPoint.line, start + end);
      // codemirror.replaceRange(end, endPoint);
      */
    } else {
      text = codemirror.getSelection();
      codemirror.replaceSelection(start + text + end);

      startPoint.ch += 2;
      endPoint.ch += 2;
    }
    codemirror.setSelection(startPoint, endPoint);
    codemirror.focus();
  }

  // 斜体
  toggleItalic() {
    const codemirror = this.editor;
    const stat = this.getState(codemirror, codemirror.getCursor());

    let text;
    const start = '*';
    const end = '*';

    const startPoint = codemirror.getCursor('start');
    const endPoint = codemirror.getCursor('end');
    if ((stat as any).italic) {
      /*
      text = codemirror.getLine(startPoint.line);
      start = text.slice(0, startPoint.ch);
      end = text.slice(startPoint.ch);

      start = start.replace(/^(.*)?(\*|\_)(\S+.*)?$/, '$1$3');
      end = end.replace(/^(.*\S+)?(\*|\_)(\s+.*)?$/, '$1$3');
      startPoint.ch -= 1;
      endPoint.ch -= 1;
      // codemirror.setLine(startPoint.line, start + end);
      */
    } else {
      text = codemirror.getSelection();
      codemirror.replaceSelection(start + text + end);

      startPoint.ch += 1;
      endPoint.ch += 1;
    }
    codemirror.setSelection(startPoint, endPoint);
    codemirror.focus();
  }

  // 插入链接
  drawLink() {
    const codemirror = this.editor;
    const position = codemirror.getCursor();
    const stat = this.getState(codemirror, position);
    this.replaceSelection(codemirror, (stat as any).link, '[', '](https://)');
  }

  // 插入图片
  drawImage() {
    const codemirror = this.editor;
    const position = codemirror.getCursor();
    const stat = this.getState(codemirror, position);
    this.replaceSelection(codemirror, (stat as any).image, '![](', ')');
  }

  // 插入引用
  drawQuote() {
    const codemirror = this.editor;
    const position = codemirror.getCursor();
    const stat = this.getState(codemirror, position);
    this.replaceSelection(codemirror, (stat as any).quote, '> ', '\n');
  }

  // 插入代码
  drawCode() {
    const codemirror = this.editor;
    const position = codemirror.getCursor();
    const stat = this.getState(codemirror, position);
    this.replaceSelection(codemirror, (stat as any).code, '```\n', '\n```');
  }

  // 插入h3标题
  drawH3Title(data) {
    const codemirror = this.editor;
    const position = codemirror.getCursor();
    const stat = this.getState(codemirror, position);
    this.replaceSelection(codemirror, (stat as any).h3, '### ', '\n');
    // this.updateCodeMirror(data);
  }

  // 撤销
  undo() {
    const codemirror = this.editor;
    codemirror.undo();
    codemirror.focus();
  }

  // 回退
  redo() {
    const codemirror = this.editor;
    codemirror.redo();
    codemirror.focus();
  }

  // 注册事件
  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  // 注册事件
  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
}
