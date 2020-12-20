/**
 * @file 登陆页面组件
 * @desc app/page/auth/component
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { Base64 } from 'js-base64';
import { Router } from '@angular/router';
import { Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewChecked } from '@angular/core';
import { SaHttpRequesterService, SaHttpLoadingService, SaTokenService, SaRenewalService } from '@app/services';
import { AppState, EAppStoreKeys } from '@app/app.service';

const LoadingKey = 'Login';

@Component({
  selector: 'page-auth',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./auth.component.scss'],
  templateUrl: './auth.component.html',
  providers: [SaHttpLoadingService]
})
export class AuthComponent implements AfterViewChecked {

  @ViewChild('pwdInput', { static: false }) input: ElementRef;

  public password = '';
  public editMode = false;

  constructor(
    private router: Router,
    private appState: AppState,
    private tokenService: SaTokenService,
    private renewalService: SaRenewalService,
    private httpService: SaHttpRequesterService,
    private httpLoadingService: SaHttpLoadingService
  ) {}

  get waiting(): boolean {
    return this.httpLoadingService.isLoading(LoadingKey);
  }

  toEditMode() {
    this.editMode = true;
  }

  quitEdit() {
    this.editMode = false;
  }

  onEnter() {
    this.editMode = false;
    if (this.password) {
      this.httpLoadingService.promise(
        LoadingKey,
        this.fetchLogin(this.password)
      );
    }
  }

  fetchLogin(password: string): Promise<void> {
    return this.httpService
      .post(API_PATH.LOGIN, { password: Base64.encode(password) })
      .then(auth => {
        this.tokenService.setOrReplaceToken(
          auth.result.access_token,
          auth.result.expires_in
        );
        this.router.navigate(['/dashboard']);
        this.renewalService.autoRun();
        this.fetchAdminInfo();
      })
      .catch(error => {
        console.warn('登陆系统失败！', error);
        return Promise.reject(error);
      });
  }

  fetchAdminInfo() {
    return this.httpService
      .get(API_PATH.ADMIN_INFO)
      .then(({ result: adminInfo }) => {
        this.appState.set(EAppStoreKeys.AdminInfo, adminInfo);
      });
  }

  ngAfterViewChecked() {
    return (
      this.input &&
      this.input.nativeElement &&
      this.input.nativeElement.focus()
    );
  }
}
