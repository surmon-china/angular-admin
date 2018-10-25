import { Component, ViewChild, Input, Output, forwardRef, EventEmitter, ElementRef, Renderer, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { ApiService } from '@app/api.service';

import { NotificationsService } from 'angular2-notifications';
import { api } from '@/environments/environment';

import * as qiniu from 'qiniu-js';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'ba-picture-uploader',
  styles: [require('./baPictureUploader.scss')],
  template: require('./baPictureUploader.html'),
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => BaPictureUploader),
    multi: true
  }]
})
export class BaPictureUploader implements ControlValueAccessor {

   // 元素域
  @ViewChild('fileUpload') protected _fileUpload:ElementRef;

  // 输入
  @Input() canDelete: boolean = true;
  @Input() uploadSizeLimit: number = 3000000;
  @Input() defaultPicture:string = 'assets/img/theme/no-photo.png';

  // 输出事件
  @Output() onUpload:EventEmitter<any> = new EventEmitter();
  @Output() pictureChange:EventEmitter<any> = new EventEmitter();
  @Output() onUploadCompleted:EventEmitter<any> = new EventEmitter();

  // 初始化
  public  uptoken:string = '';
  public  picture:string = '';
  public  tokenOk:boolean = false;
  private uploadProgress:string = '0';
  public  uploadInProgress:boolean = false;
  public  onModelChange:Function = () => {};
  public  onModelTouched:Function = () => {};

  // 构造函数
  constructor(private _apiService: ApiService,
              private _renderer:Renderer,
              private _notificationsService:NotificationsService) {}

  ngOnInit() {
    this.getUpToken();
  }

  // 获取上传 token
  public getUpToken():any {
    this._apiService.get('/qiniu').then((res: any) => {
      if (res && res.result && res.result.uptoken) {
        this.tokenOk = true;
        this.uptoken = res.result.uptoken;
      }
    }).catch(err => {
      this.tokenOk = false;
    });
  }
 
  // 要上传的文件变更时（组件拦截）
  public onFiles():any {

    // 如果选择文件时 Token 是不可用的，再再试一次
    if (!this.tokenOk) {
      this.getUpToken();
      return false;
    }

    // 当前文件
    const file = this._fileUpload.nativeElement.files[0];
    if(!file) return false;

    // 大于限定尺寸，不上传
    if (file.size > this.uploadSizeLimit) {
      this._notificationsService.error('上传失败', '文件不合法！', { timeOut: 500 });
      return false;
    }

    // 如果图片小于1K，则输出base64，否则上传
    if(file.size <= 1000) {
      let reader = new FileReader();
      reader.onload = event => {
        const imgBase64 = (<any>event).target.result;
        this.emitPicture(imgBase64);
      }
      reader.readAsDataURL(file);
      return false;
    }

    // 判断完成调用 SDK 上传
    this.qiniuUploadPicture(file);
  }

  // 文件上传
  public qiniuUploadPicture(file):  any {

    // 上传
    const doUpload = (upFile) => {

      this._notificationsService.info('开始上传', '文件开始上传', { timeOut: 850 });

      const keyName = `nodepress/image/${upFile.name.replace(/ /ig, '')}`;
      const putExtra = { 
        params: {},
        fname: upFile.name,
        mimeType: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
      };

      const upOptions = {
        useCdnDomain: true
      };

      // 开始上传
      const observable = qiniu.upload(upFile, keyName, this.uptoken, putExtra, upOptions);

      this.uploadInProgress = true;

      // 监听上传流
      const subscription = observable.subscribe({
        next: res => {
          console.info('上传有一个新进度', res);
          this.uploadInProgress = true;
          if (res.total && res.total.percent) {
            this.uploadProgress = (res.total.percent || '').toString().slice(0, 5);
          }
        },
        error: err => {
          console.warn('上传失败', err);
          this.uploadInProgress = false;
          this._notificationsService.error('上传失败', err.message, { timeOut: 850 });
        },
        complete: res => {
          console.log('上传完成', res);
          const picture_url = `${api.STATIC_URL}/${res.key}`;
          this.uploadInProgress = false;
          this.onUploadCompleted.emit(picture_url);
          this.changePictureFromURL(picture_url);
          this._notificationsService.success('上传成功', '图片上传成功', { timeOut: 850 });
        }
      });
    }

    // 压缩
    qiniu.compressImage(file, {
      quality: 0.92,
      noCompressIfLarger: true
    })
    .then(data => doUpload(data.dist))
    .catch(err => doUpload(file));
  }

  // 点击自定义上传空间元素的时候调用 input 的 click 方法
  public bringFileSelector():any {
    if (this.uploadInProgress) {
      return false;
    }
    this.onModelTouched();
    this._renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
    return false;
  }

  // 根据url读取一张图片
  protected changePictureFromURL(url:string):any {
    const image = new Image();
    image.onload = event => {
      this.emitPicture(url);
    };
    image.onerror = event => {
      this._notificationsService.error('预览失败', '七牛问题！', { timeOut: 800 });
      this.emitPicture(url);
    };
    image.src = url;
  }

  // 根据base64读取一张图片
  protected changePictureFromDataURL(file:File):any {
    const reader = new FileReader();
    reader.addEventListener('load', (event:Event) => {
      // console.log(event);
      this.picture = (<any> event.target).result;
    }, false);
    reader.readAsDataURL(file);
  }

  // 删除图片方法
  public removePicture():any {
    this.onModelTouched();
    this.emitPicture('');
    return false;
  }

  // 更新及传出数据
  public emitPicture(picture:string):any {
    this.picture = picture;
    this.onModelChange(picture);
    this.pictureChange.emit(picture);
  }

  // 写数据
  writeValue(currentValue:any) {
    this.picture = currentValue;
  }

  // 注册事件
  registerOnChange(fn:Function):void {
    this.onModelChange = fn;
  }

  // 注册事件
  registerOnTouched(fn:Function):void {
    this.onModelTouched = fn;
  }
}
