/**
 * @file 图片加载服务
 * @desc app/services/image-loader
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';
import { SaHttpRequesterService } from '../saHttpRequester';
import { SaTokenService } from './saToken.service';
import * as API_PATH from '@app/constants/api';

@Injectable()
export class SaRenewalService {

  private renewalTask = null;

  constructor(
    private tokenService: SaTokenService,
    private httpService: SaHttpRequesterService
  ) {}

  public stop(): void {
    window.clearTimeout(this.renewalTask);
  }

  // 自动续约 token
  public autoRun(): void {
    this.stop();
    const countdown = this.tokenService.getCountdown();
    const seconds = countdown - 10;
    console.info(`Token 自动续约正在工作，Token 将在 ${seconds}s 后自动更新！`);
    this.renewalTask = window.setTimeout(() => {
      this.httpService.post(API_PATH.RENEWAL_TOKEN).then(auth => {
        this.tokenService.setOrReplaceToken(
          auth.result.access_token,
          auth.result.expires_in
        );
        this.autoRun();
      });
    }, seconds * 1000);
  }
}
