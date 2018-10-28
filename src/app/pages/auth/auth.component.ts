/**
 * @file 登陆页面组件
 * @module app/page/auth/component
 * @author Surmon <https://github.com/surmon-china>
 */

import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { Component, ElementRef, ViewEncapsulation, AfterViewChecked } from '@angular/core';

import { SaHttpRequesterService } from '@app/services';
import { TOKEN } from '@app/constants/auth';
import * as API_PATH from '@app/constants/api';

@Component({
  selector: 'page-auth',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./auth.scss')],
  template: require('./auth.html')
})
export class AuthComponent implements AfterViewChecked {

  private _apiPath = API_PATH.AUTH;

  public password: string = '';
  public editMode: boolean = false;
  public slogans = [
    'Done is better than perfect.',
    '远离颠倒梦想，究竟涅槃',
    'དཀར་གསལ་ཟླ་བ་ཤར་བྱུང་།, ཤར་ཕྱོགས་རི་བོའི་རྩེ་ནས།',
    '应无所住，而生其心'
  ];
  public slogan: string = this.slogans[Math.floor(Math.random() * (this.slogans.length))];

  constructor(public elem: ElementRef,
              private _router: Router,
              private _httpService: SaHttpRequesterService) {}

  toEditMode() {
    this.editMode = !this.editMode;
  }

  quitEdit() {
    this.editMode = false;
  }

  onEnter() {
    this.editMode = false;
    if (this.password) {
      this.onSubmit();
    }
  }

  onSubmit() {
    this._httpService
    .post(this._apiPath, { password: Base64.encode(this.password) })
    .then(auth => {
      if (auth.result.token) {
        localStorage.setItem(TOKEN, auth.result.token);
        this._router.navigate(['/dashboard']);
      }
    });
  }

  ngAfterViewChecked() {
    const inputs = this.elem.nativeElement.getElementsByTagName('input');
    if (inputs.length && inputs[0].focus) {
      inputs[0].focus();
    }
  }
}
