/**
 * @file 全局设置页面组件
 * @desc app/page/options/component
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import * as API_PATH from '@app/constants/api';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { humanizedLoading, mergeFormControlsToInstance, formControlStateClass } from '@app/pages/pages.service';
import { TApiPath, IFetching } from '@app/pages/pages.constants';
import { SaHttpRequesterService } from '@app/services';
import { AppState, EAppStoreKeys } from '@app/app.service';

interface IAuth {
  name: string;
  slogan: string;
  gravatar?: string;
  password?: string;
  new_password?: string;
  rel_new_password?: string;
}

const DEFAULT_AUTH_FORM = {
  name: '',
  slogan: '',
  gravatar: '',
  password: '',
  new_password: '',
  rel_new_password: ''
};

const DEFAULT_OPTION_FORM = {
  title: '',
  sub_title: '',
  keywords: [],
  description: '',
  site_url: '',
  site_email: '',
  site_icp: '',
  blacklist_ips: [],
  blacklist_mails: [],
  blacklist_keywords: []
};

enum ELoading {
  Auth,
  Option,
  MusicCache,
  BilibiliCache,
  DatabaseBackup,
  GithubCache,
  SitemapCache,
}

@Component({
  selector: 'page-options',
  encapsulation: ViewEncapsulation.Emulated,
  styleUrls: ['./options.component.scss'],
  templateUrl: './options.component.html'
})
export class OptionsComponent implements OnInit {

  public Loading = ELoading;
  public controlStateClass = formControlStateClass;
  private authApiPath: TApiPath = API_PATH.ADMIN_INFO;
  private optionApiPath: TApiPath = API_PATH.OPTION;
  public fetching: IFetching = {
    [ELoading.Auth]: false,
    [ELoading.Option]: false,
    [ELoading.MusicCache]: false,
    [ELoading.BilibiliCache]: false,
    [ELoading.DatabaseBackup]: false,
    [ELoading.GithubCache]: false,
    [ELoading.SitemapCache]: false,
  };

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
  public title: AbstractControl;
  public sub_title: AbstractControl;
  public keywords: AbstractControl;
  public description: AbstractControl;
  public site_url: AbstractControl;
  public site_email: AbstractControl;
  public site_icp: AbstractControl;
  public blacklist_ips: AbstractControl;
  public blacklist_mails: AbstractControl;
  public blacklist_keywords: AbstractControl;

  constructor(
    private router: Router,
    private appState: AppState,
    private fb: FormBuilder,
    private httpService: SaHttpRequesterService,
  ) {

    // authForm
    this.authForm = this.fb.group({
      name: [DEFAULT_AUTH_FORM.name, Validators.compose([Validators.required])],
      slogan: [DEFAULT_AUTH_FORM.slogan, Validators.compose([Validators.required])],
      gravatar: [DEFAULT_AUTH_FORM.gravatar],
      password: [DEFAULT_AUTH_FORM.password],
      new_password: [
        DEFAULT_AUTH_FORM.new_password,
        Validators.compose([this.vaildatePassword.bind(this)]),
      ],
      rel_new_password: [
        DEFAULT_AUTH_FORM.rel_new_password,
        Validators.compose([this.vaildatePassword.bind(this)])
      ],
    });
    mergeFormControlsToInstance(this, this.authForm);

    // optionForm
    this.optionForm = this.fb.group({
      title: [DEFAULT_OPTION_FORM.title, Validators.compose([Validators.required])],
      sub_title: [DEFAULT_OPTION_FORM.sub_title, Validators.compose([Validators.required])],
      keywords: [DEFAULT_OPTION_FORM.keywords, Validators.compose([Validators.required])],
      description: [DEFAULT_OPTION_FORM.description, Validators.compose([Validators.required])],
      site_url: [DEFAULT_OPTION_FORM.site_url, Validators.compose([Validators.required])],
      site_email: [
        DEFAULT_OPTION_FORM.site_email,
        Validators.compose([Validators.pattern('([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+')])
      ],
      site_icp: [DEFAULT_OPTION_FORM.site_icp],
      blacklist_ips: [DEFAULT_OPTION_FORM.blacklist_ips],
      blacklist_mails: [DEFAULT_OPTION_FORM.blacklist_mails],
      blacklist_keywords: [DEFAULT_OPTION_FORM.blacklist_keywords]
    });
    mergeFormControlsToInstance(this, this.optionForm);
  }

  // 验证重复输入密码
  private vaildatePassword(control: AbstractControl): ValidationErrors {
    if (
      (this.new_password && this.new_password.value) !==
      (this.rel_new_password && this.rel_new_password.value)
    ) {
      return { custom: '新密码不匹配' };
    }
    const target = control === this.new_password
      ? this.rel_new_password
      : this.new_password;
    // 当重复密码不匹配时，两者都异常，但对时，两个都要正常
    if (target && !control.invalid && target.invalid) {
      target.updateValueAndValidity();
    }
    return null;
  }

  // 长数据处理器
  private formatLongString(value: string): string {
    return value.replace(/\s+/g, ' ').replace(/\s/g, '\n');
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
    const newWords = event.target.value
      .split('\n')
      .map(keyword => lodash.trim(keyword))
      .filter(Boolean)
      .join('\n');
    this.keywords.setValue(newWords);
  }

  // 提交权限表单
  public submitAuthForm() {
    if (!this.authForm.valid) {
      return false;
    }
    const authFormData = lodash.cloneDeep(this.authForm.value);
    Object.keys(authFormData).forEach(key => {
      const value = authFormData[key];
      const isPassword = key.includes('password');
      authFormData[key] = isPassword ? Base64.encode(value) : value;
    });
    Reflect.deleteProperty(authFormData, 'rel_new_password');
    this.putAuth(authFormData);
  }

  // 提交设置表单
  public submitOptionForm() {
    if (!this.optionForm.valid) {
      return false;
    }
    const format = value => String(value).split('\n').filter(t => !!t);
    const {
      blacklist_ips,
      blacklist_keywords,
      blacklist_mails,
      keywords,
      ...other
    } = this.optionForm.value;
    const formValue = {
      ...other,
      keywords: format(keywords),
      blacklist: {
        ips: format(this.blacklist_ips.value),
        mails: format(this.blacklist_mails.value),
        keywords: format(this.blacklist_keywords.value)
      }
    };
    this.putOptions(formValue);
  }

  // 解析返回的权限表单数据
  public handleAuthChange(userAuthPromise) {
    userAuthPromise.then(({ result: adminInfo}) => {
      if (this.authForm.value.rel_new_password) {
        // tslint:disable-next-line:no-console
        console.info('密码更新成功，正跳转至登陆页');
        setTimeout(() => this.router.navigate(['/auth']), 960);
      } else {
        this.appState.set(EAppStoreKeys.AdminInfo, adminInfo);
        this.authForm.reset(Object.assign({}, DEFAULT_AUTH_FORM, adminInfo));
      }
    }).catch(error => {});
  }

  // 解析返回的设置表单数据
  public handleOptionChange(optionPromise: Promise<any>) {
    return optionPromise.then(({ result: options }) => {
      const format = value => value.toString().replace(/,/g, '\n');
      options.blacklist_ips = format(options.blacklist.ips);
      options.blacklist_mails = format(options.blacklist.mails);
      options.blacklist_keywords = format(options.blacklist.keywords);
      options.keywords = format(options.keywords);
      this.optionForm.reset(options);
    }).catch(error => {});
  }

  // 获取用户
  public getUserAuth() {
    this.handleAuthChange(
      humanizedLoading(
        this.fetching,
        ELoading.Auth,
        this.httpService.get(this.authApiPath)
      )
    );
  }

  // 更新用户
  public putAuth(auth: IAuth) {
    this.handleAuthChange(
      humanizedLoading(
        this.fetching,
        ELoading.Auth,
        this.httpService.put(this.authApiPath, auth)
      )
    );
  }

  // 获取配置
  public getOptions() {
    this.handleOptionChange(
      humanizedLoading(
        this.fetching,
        ELoading.Option,
        this.httpService.get(this.optionApiPath)
      )
    );
  }

  // 更新配置
  public putOptions(options: any) {
    this.handleOptionChange(
      humanizedLoading(
        this.fetching,
        ELoading.Option,
        this.httpService.put(this.optionApiPath, options)
      )
    );
  }

  // 更新数据库备份
  public updateDatabaseBackup() {
    return humanizedLoading(
      this.fetching,
      ELoading.DatabaseBackup,
      this.httpService.patch(API_PATH.DATA_BASE_BACKUP),
    );
  }

  // 更新音乐缓存
  public updateMusicCache() {
    return humanizedLoading(
      this.fetching,
      ELoading.MusicCache,
      this.httpService.patch(API_PATH.MUSIC_LIST_CACHE),
    );
  }

  // 更新 Bilibili 缓存
  public updateBilibiliCache() {
    return humanizedLoading(
      this.fetching,
      ELoading.BilibiliCache,
      this.httpService.patch(API_PATH.BILIBILI_LIST_CACHE),
    );
  }

  // 更新 Github 缓存
  public updateGithubCache() {
    return humanizedLoading(
      this.fetching,
      ELoading.GithubCache,
      this.httpService.patch(API_PATH.GITHUB),
    );
  }

  // 更新网站地图缓存
  public updateSitemapCache() {
    return humanizedLoading(
      this.fetching,
      ELoading.SitemapCache,
      this.httpService.patch(API_PATH.SITEMAP),
    );
  }

  ngOnInit() {
    this.getOptions();
    this.getUserAuth();
  }
}
