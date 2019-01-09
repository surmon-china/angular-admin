/**
 * @file 文章编辑页面状态选择及发布组件
 * @module app/page/article/component/submit
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { EOriginState, EPublicState, EPublishState } from '@app/constants/state';

@Component({
  selector: 'box-article-edit-submit',
  template: require('./submit.html')
})

export class ArticleEditSubmitComponent {

  OriginState = EOriginState;
  PublicState = EPublicState;
  PublishState = EPublishState;

  @Input() isEdit;
  @Input() state;
  @Input() origin;
  @Input() ppublic;
  @Input() password;
  @Output() stateChange: EventEmitter<any> = new EventEmitter();
  @Output() originChange: EventEmitter<any> = new EventEmitter();
  @Output() ppublicChange: EventEmitter<any> = new EventEmitter();
  @Output() passwordChange: EventEmitter<any> = new EventEmitter();
  @Output() submitArticle = new EventEmitter();

  constructor() {}
}
