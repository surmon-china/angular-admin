/**
 * @file 图片上传组件
 * @module app/component/picture-uploader
 * @author Surmon <https://github.com/surmon-china>
 */

import * as qiniu from 'qiniu-js';
import * as API_PATH from '@app/constants/api';
import { Component, ViewChild, Input, Output, OnInit, forwardRef, EventEmitter, ElementRef, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { api as ENV_API } from '@/environments/environment';
import { SaHttpRequesterService } from '@app/services';
import 'rxjs/add/operator/toPromise';

type TPictureUrl = string;

@Component({
  selector: 'sa-picture-uploader',
  styles: [require('./saPictureUploader.scss')],
  template: require('./saPictureUploader.html'),
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SaPictureUploaderComponent),
    multi: true
  }]
})
export class SaPictureUploaderComponent implements OnInit, ControlValueAccessor {

  // 上传进度
  private uploadProgress: string = '0';

  // 元素域
  @ViewChild('fileUpload') protected fileUpload: ElementRef;

  // 输入
  @Input() canDelete: boolean = true;
  @Input() uploadSizeLimit: number = 3000000;
  @Input() defaultPicture: TPictureUrl = 'assets/img/theme/no-photo.png';

  // 输出事件
  @Output() handleUpload: EventEmitter<any> = new EventEmitter();
  @Output() pictureChange: EventEmitter<any> = new EventEmitter();
  @Output() handleUploadCompleted: EventEmitter<any> = new EventEmitter();

  // 初始化
  public upToken: string = '';
  public tokenOk: boolean = false;
  public picture: TPictureUrl = '';
  public uploadInProgress: boolean = false;
  public onModelChange: Function = () => {};
  public onModelTouched: Function = () => {};

  // 构造函数
  constructor(
    private renderer: Renderer,
    private httpService: SaHttpRequesterService,
    private notificationsService: NotificationsService
  ) {}

  ngOnInit() {
    this.getUpToken();
  }

  // 获取上传 token
  public getUpToken(): void {
    this.httpService.get(API_PATH.UP_TOKEN).then((res: any) => {
      if (res && res.result && res.result.upToken) {
        this.tokenOk = true;
        this.upToken = res.result.upToken;
      }
    }).catch(_ => {
      this.tokenOk = false;
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
        const imgBase64 = (<any>event).target.result;
        this.emitPicture(imgBase64);
      };
      reader.readAsDataURL(file);
      return false;
    }

    // 判断完成调用 SDK 上传
    this.qiniuUploadPicture(file);
  }

  // 文件上传
  public qiniuUploadPicture(file: File): void {

    // 上传
    const doUpload = upFile => {

      this.notificationsService.info('开始上传', '文件开始上传', { timeOut: 850 });

      const keyName = `nodepress/image/${upFile.name.replace(/ /ig, '')}`;
      const putExtra = {
        params: {},
        fname: upFile.name,
        mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      };

      const upOptions = { useCdnDomain: true };

      // 开始上传
      const observable = qiniu.upload(upFile, keyName, this.upToken, putExtra, upOptions);

      this.uploadInProgress = true;

      // 监听上传流
      const subscription = observable.subscribe({
        next: res => {
          console.warn('上传有一个新进度', res);
          this.uploadInProgress = true;
          if (res.total && res.total.percent) {
            this.uploadProgress = (res.total.percent || '').toString().slice(0, 5);
          }
        },
        error: err => {
          console.warn('上传失败', err);
          this.uploadInProgress = false;
          this.notificationsService.error('上传失败', err.message, { timeOut: 850 });
        },
        complete: res => {
          console.warn('上传完成', res);
          const picture_url = `${ENV_API.STATIC_URL}/${res.key}`;
          this.uploadInProgress = false;
          this.handleUploadCompleted.emit(picture_url);
          this.changePictureFromURL(picture_url);
          this.notificationsService.success('上传成功', '图片上传成功', { timeOut: 850 });
        }
      });
    };

    // 压缩
    qiniu.compressImage(file, {
      quality: 0.92,
      noCompressIfLarger: true
    })
    .then(data => doUpload(data.dist))
    .catch(err => doUpload(file));
  }

  // 点击自定义上传空间元素的时候调用 input 的 click 方法
  public bringFileSelector(): boolean {
    if (this.uploadInProgress) {
      return false;
    }
    this.onModelTouched();
    this.renderer.invokeElementMethod(this.fileUpload.nativeElement, 'click');
    return false;
  }

  // 根据 url 读取一张图片
  public changePictureFromURL(url: string): void {
    const image = new Image();
    image.onload = _ => {
      this.emitPicture(url);
    };
    image.onerror = _ => {
      this.notificationsService.error('预览失败', '七牛问题！', { timeOut: 800 });
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
  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  // 注册事件
  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }
}
