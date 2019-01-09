/**
 * @file 登陆页面组件
 * @module app/page/auth/component
 * @author Surmon <https://github.com/surmon-china>
 */

import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { SaHttpRequesterService } from '@app/services';
import { TApiPath } from '@app/pages/pages.constants';
import { TOKEN } from '@app/constants/auth';
import * as API_PATH from '@app/constants/api';

@Component({
  selector: 'page-auth',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./auth.scss')],
  template: require('./auth.html')
})
export class AuthComponent implements AfterViewChecked {

  @ViewChild('pwdInput') input: ElementRef;

  private loginApiPath: TApiPath = API_PATH.LOGIN;

  public password: string = '';
  public editMode: boolean = false;
  public slogans = [
    'Done is better than perfect.',
    '远离颠倒梦想，究竟涅槃',
    // 'དཀར་གསལ་ཟླ་བ་ཤར་བྱུང་།, ཤར་ཕྱོགས་རི་བོའི་རྩེ་ནས།',
    '应无所住，而生其心'
  ];
  public slogan: string = this.slogans[Math.floor(Math.random() * (this.slogans.length))];

  constructor(private router: Router, private httpService: SaHttpRequesterService) {}

  toEditMode() {
    this.editMode = true;
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
    this.httpService
    .post(this.loginApiPath, { password: Base64.encode(this.password) })
    .then(auth => {
      if (auth.result.access_token) {
        localStorage.setItem(TOKEN, auth.result.access_token);
        this.router.navigate(['/dashboard']);
      }
    })
    .catch(err => {
      console.warn('登陆系统失败！', err);
    });
  }

  ngAfterViewChecked() {
    return this.input && this.input.nativeElement && this.input.nativeElement.focus();
  }
}
