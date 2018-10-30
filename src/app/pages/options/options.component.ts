/**
 * @file 全局设置页面组件
 * @module app/page/options/componennt
 * @author Surmon <https://github.com/surmon-china>
 */

import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Base64 } from 'js-base64';
import * as lodash from 'lodash';

import { SaHttpRequesterService } from '@app/services';
import { mergeFormControlsToInstance } from '@app/pages/pages.utils';
import * as API_PATH from '@app/constants/api';

@Component({
  selector: 'page-options',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [require('./options.scss')],
  template: require('./options.html')
})
export class OptionsComponent implements OnInit {

  // api
  private _authApiPath = API_PATH.AUTH;
  private _optionApiPath = API_PATH.OPTION;

  // authForm
  public authForm: FormGroup;
  public name: AbstractControl;
  public slogan: AbstractControl;
  public gravatar: AbstractControl;
  public password: AbstractControl;
  public new_password: AbstractControl;
  public rel_new_password: AbstractControl;

  // optionForm
  public optionForm: FormGroup;
  public _id: AbstractControl;
  public title: AbstractControl;
  public sub_title: AbstractControl;
  public keywords: AbstractControl;
  public description: AbstractControl;
  public site_url: AbstractControl;
  public site_email: AbstractControl;
  public site_icp: AbstractControl;
  public seo_ping_sites: AbstractControl;
  public blacklist_ips: AbstractControl;
  public blacklist_mails: AbstractControl;
  public blacklist_keywords: AbstractControl;

  constructor(private _router: Router,
              private _fb: FormBuilder,
              private _httpService: SaHttpRequesterService) {

    // authForm
    this.authForm = this._fb.group({
      name: ['', Validators.compose([Validators.required])],
      slogan: ['', Validators.compose([Validators.required])],
      gravatar: [''],
      password: [''],
      new_password: [''],
      rel_new_password: [''],
    });
    mergeFormControlsToInstance(this, this.authForm);

    // optionForm
    this.optionForm = this._fb.group({
      _id: [null],
      title: ['', Validators.compose([Validators.required])],
      sub_title: ['', Validators.compose([Validators.required])],
      keywords: [[], Validators.compose([Validators.required])],
      description: ['', Validators.compose([Validators.required])],
      site_url: ['', Validators.compose([Validators.required])],
      site_email: ['', Validators.compose([Validators.pattern('([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+')])],
      site_icp: [''],
      seo_ping_sites: [[]],
      blacklist_ips: [[]],
      blacklist_mails: [[]],
      blacklist_keywords: [[]]
    });
    mergeFormControlsToInstance(this, this.optionForm);
  }

  // 长数据处理器
  public formatLongString(value: string): string {
    return value.replace(/\s+/g, ' ').replace(/\s/g, '\n');
  }

  // ping 地址解析处理
  public handlePingSitesChange(event) {
    this.seo_ping_sites.setValue(this.formatLongString(event.target.value));
  }

  // 黑名单 ip 解析处理
  public handleCommentBlacklistIpsChange(event) {
    this.blacklist_ips.setValue(this.formatLongString(event.target.value));
  }

  // 黑名单邮箱解析处理
  public handleCommentBlacklistMailsChange(event) {
    this.blacklist_mails.setValue(this.formatLongString(event.target.value));
  }

  // 黑名单关键词解析处理
  public handleCommentBlacklistKeywordsChange(event) {
    this.blacklist_keywords.setValue(this.formatLongString(event.target.value));
  }

  // 关键词计息处理
  public handleKeywordsChange(event) {
    const newWords = event.target.value.replace(/\s/g, '').split(',');
    this.keywords.setValue(newWords);
  }

  // 提交权限表单
  public submitAuthForm() {
    if (this.authForm.valid) {
      const authFormData = lodash.cloneDeep(this.authForm.value);
      Object.keys(authFormData).forEach(key => {
        const value = authFormData[key];
        const isPassword = key.includes('password');
        authFormData[key] = isPassword ? Base64.encode(value) : value;
      });
      this.putAuth(authFormData);
    }
  }

  // 提交设置表单
  public submitOptionForm() {
    if (!this.optionForm.valid) {
      return false;
    }
    const format = value => String(value).split('\n').filter(t => !!t);
    const formValue = Object.assign({
      ping_sites: format(this.seo_ping_sites.value),
      blacklist: {
        ips: format(this.blacklist_ips.value),
        mails: format(this.blacklist_mails.value),
        keywords: format(this.blacklist_keywords.value)
      }
    }, this.optionForm.value);
    this.putOptions(formValue);
  }

  // 解析返回的权限表单数据
  public handleAuthChange = userAuthPromise => {
    userAuthPromise.then(({ result: { name, slogan, gravatar }}) => {
      if (this.authForm.value.rel_new_password) {
        // tslint:disable-next-line:no-console
        console.info('密码更新成功，正跳转至登陆页');
        setTimeout(() => this._router.navigate(['/auth']), 960);
      } else {
        this.authForm.reset({
          name,
          slogan,
          gravatar,
          password: '',
          new_password: '',
          rel_new_password: ''
        });
      }
    });
  }

  // 解析返回的设置表单数据
  public handleOptionChange = optionPromise => {
    optionPromise.then(({ result: options }) => {
      const format = value => value.toString().replace(/,/g, '\n');
      options.seo_ping_sites = format(options.ping_sites);
      options.blacklist_ips = format(options.blacklist.ips);
      options.blacklist_mails = format(options.blacklist.mails);
      options.blacklist_keywords = format(options.blacklist.keywords);
      this.optionForm.reset(options);
    });
  }

  // 获取用户
  public getUserAuth() {
    this.handleAuthChange(this._httpService.get(this._authApiPath));
  }

  // 更新用户
  public putAuth(auth: any) {
    this.handleAuthChange(this._httpService.put(this._authApiPath, auth));
  }

  // 获取配置
  public getOptions() {
    this.handleOptionChange(this._httpService.get(this._optionApiPath));
  }

  // 更新配置
  public putOptions(options: any) {
    this.handleOptionChange(this._httpService.put(this._optionApiPath, options));
  }

  ngOnInit() {
    this.getOptions();
    this.getUserAuth();
  }
}
