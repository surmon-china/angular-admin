/**
 * @file 图片上传组件
 * @desc app/component/picture-uploader
 * @author Surmon <https://github.com/surmon-china>
 */

import * as OSS from 'ali-oss';
import * as API_PATH from '@app/constants/api';
import { ALIYUN_OSS_REGION, ALIYUN_OSS_BUCKET } from '@/config';
import { Component, ViewChild, Input, Output, OnInit, forwardRef, EventEmitter, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { api as ENV_API } from '@/environments/environment';
import { SaHttpRequesterService } from '@app/services';
import 'rxjs/add/operator/toPromise';

type TPictureUrl = string;
type TEventFunc = (...args: any) => any;

export interface IUpToken {
  AccessKeyId: string;
  AccessKeySecret: string;
  SecurityToken: string;
  Expiration: string;
}

@Component({
  selector: 'sa-picture-uploader',
  styleUrls: ['./saPictureUploader.component.scss'],
  templateUrl: './saPictureUploader.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SaPictureUploaderComponent),
    multi: true
  }]
})
export class SaPictureUploaderComponent implements OnInit, ControlValueAccessor {

  // 元素域
  @ViewChild('fileUpload', { static: false }) protected fileUpload: ElementRef;

  // 输入
  @Input() canDelete = true;
  @Input() uploadSizeLimit = 3000000;
  @Input() defaultPicture: TPictureUrl = 'assets/images/profile/no-photo.png';

  // 输出事件
  @Output() handleUpload: EventEmitter<any> = new EventEmitter();
  @Output() pictureChange: EventEmitter<any> = new EventEmitter();
  @Output() handleUploadCompleted: EventEmitter<any> = new EventEmitter();

  // 初始化
  public tokenOk = false;
  public upToken: IUpToken = null;
  public picture: TPictureUrl = '';
  public uploadInProgress = false;
  public uploadProgress = 0;
  public onModelChange: TEventFunc = () => {};
  public onModelTouched: TEventFunc = () => {};

  // 构造函数
  constructor(
    private httpService: SaHttpRequesterService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.getUpToken();
  }

  // 获取上传 token
  public getUpToken(): void {
    this.httpService.get(API_PATH.UP_TOKEN)
      .then((res: any) => {
        if (res && res.result) {
          this.tokenOk = true;
          this.upToken = res.result;
        }
      })
      .catch(() => {
        this.tokenOk = false;
      });
  }

  // 文件上传
  public doUploadPicture(file: File): void {

    // 上传
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const fileKey = `thumbnail/${file.name.replace(/ /ig, '')}`;
    let client = new OSS({
      region: ALIYUN_OSS_REGION,
      bucket: ALIYUN_OSS_BUCKET,
      accessKeyId: this.upToken.AccessKeyId,
      accessKeySecret: this.upToken.AccessKeySecret,
      stsToken: this.upToken.SecurityToken,
      secure: true,
    });

    this.notificationsService.info('开始上传', '文件开始上传', { timeOut: 850 });
    this.uploadInProgress = true;
    this.uploadProgress = 0;

    client.multipartUpload(fileKey, file, {
      // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
      async progress(progress) {
        // console.info('上传有一个新进度', progress);
        self.uploadInProgress = true;
        self.uploadProgress = progress * 100;
      }}
    )
    .then(result => {
      console.info('上传完成', result);
      const pictureUrl = `${ENV_API.STATIC_URL}/${result.name}`;
      this.handleUploadCompleted.emit(pictureUrl);
      this.changePictureFromURL(pictureUrl);
      this.notificationsService.success('上传成功', '图片上传成功', { timeOut: 850 });
    })
    .catch(error => {
      console.warn('上传失败', error);
      this.notificationsService.error('上传失败', error.message, { timeOut: 850 });
    })
    .finally(() => {
      this.uploadInProgress = false;
      client = null;
    });
  }

  // 要上传的文件变更时（组件拦截）
  public onFiles(): any {

    // 如果选择文件时 Token 是不可用的，再再试一次
    if (!this.tokenOk) {
      this.getUpToken();
      return false;
    }

    // 当前文件
    const file = this.fileUpload.nativeElement.files[0];
    if (!file) {
      return false;
    }

    // 大于限定尺寸，不上传
    if (file.size > this.uploadSizeLimit) {
      this.notificationsService.error('上传失败', '文件不合法！', { timeOut: 500 });
      return false;
    }

    // 如果图片小于1K，则输出base64，否则上传
    if (file.size <= 1000) {
      const reader = new FileReader();
      reader.onload = event => {
        const imgBase64 = (event as any).target.result;
        this.emitPicture(imgBase64);
      };
      reader.readAsDataURL(file);
      return false;
    }

    // 判断完成调用 SDK 上传
    this.doUploadPicture(file);
  }

  // 点击自定义上传控件元素的时候调用 input 的 click 方法
  public bringFileSelector(): boolean {
    if (this.uploadInProgress) {
      return false;
    }
    this.onModelTouched();
    this.fileUpload.nativeElement.click();
    return false;
  }

  // 根据 url 读取一张图片
  public changePictureFromURL(url: string): void {
    const image = new Image();
    image.onload = () => {
      this.emitPicture(url);
    };
    image.onerror = () => {
      this.notificationsService.error('预览失败', '存储源问题！', { timeOut: 800 });
      this.emitPicture(url);
    };
    image.src = url;
  }

  // 根据 base64 读取一张图片
  public changePictureFromDataURL(file: File): void {
    const reader = new FileReader();
    reader.addEventListener('load', (event: Event) => {
      this.picture = (event.target as any).result;
    }, false);
    reader.readAsDataURL(file);
  }

  // 删除图片方法
  public removePicture(): boolean {
    this.onModelTouched();
    this.emitPicture('');
    return false;
  }

  // 更新及传出数据
  public emitPicture(picture: TPictureUrl): void {
    this.picture = picture;
    this.onModelChange(picture);
    this.pictureChange.emit(picture);
  }

  // 手动输入的图片地址发生了变化
  public inputImageUrlChange(picture: TPictureUrl): void {
    this.emitPicture(picture);
  }

  // 写数据
  writeValue(currentValue: any) {
    this.picture = currentValue;
  }

  // 注册事件
  registerOnChange(fn: TEventFunc): void {
    this.onModelChange = fn;
  }

  // 注册事件
  registerOnTouched(fn: TEventFunc): void {
    this.onModelTouched = fn;
  }
}
