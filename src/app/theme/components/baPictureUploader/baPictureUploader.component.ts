import { Component, ViewChild, Input, Output, forwardRef, EventEmitter, ElementRef, Renderer, OnChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { NotificationsService } from 'angular2-notifications';
import { API_ROOT, STATIC_URL } from 'src/config'
import './baPictureUploader.loader.ts';

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
  @Input() defaultPicture:string = 'assets/img/theme/no-photo.png';
  @Input() uploaderOptions:any = {};
  @Input() uploadSizeLimit: number = 3000000;

  // 输出事件
  @Output() pictureChange:EventEmitter<any> = new EventEmitter();
  @Output() onUpload:EventEmitter<any> = new EventEmitter();
  @Output() onUploadCompleted:EventEmitter<any> = new EventEmitter();

  // 初始化
  private qiniuUploader:any;
  private uploadProgress:number = 0;
  public  uploadInProgress:boolean = false;
  public  picture:string = '';
  public  onModelChange:Function = () => {};
  public  onModelTouched:Function = () => {};

  // 构造函数
  constructor(private renderer:Renderer,
              private _notificationsService:NotificationsService) {}

  ngOnInit() {
    // console.log(Qiniu, plupload, mOxie);
    this.qiniuUploader = Qiniu.uploader(Object.assign({
      // 设置一次只能选择一个文件
      multi_selection: false,
      // 上传模式,依次退化
      runtimes: 'html5 ,html4',
      // 上传选择的点选按钮，required
      browse_button: 'uploadFileBtn',
      // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
      uptoken_url: `${API_ROOT}/qiniu`,
      // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
      unique_names: false,
      // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
      save_key: false,
      // bucket 域名，下载资源时用到，required
      domain: 'http://upload.qiniu.com/',
      // 设置上传文件的时候是否每次都重新获取新的token
      get_new_uptoken: false,
      // 最大文件体积限制
      max_file_size: '10mb',
      // 上传失败最大重试次数
      max_retries: 3,
      // 开启可拖曳上传               
      dragdrop: false,
      // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
      // drop_element: 'container',
      // 分块上传时，每片的体积
      chunk_size: '4mb',
      // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
      auto_start: true,
      log_level: -1,
      // 回调函数              
      init: {
        // 文件添加进队列后,处理相关的事情
        'FilesAdded'(up, files) {
          // console.log('文件添加进队列', files);
        },
        // 每个文件上传前,处理相关的事情
        'BeforeUpload': (up, file) => {
          // console.log('文件上传前', this);
          this._notificationsService.info('开始上传', '文件正在上传', { timeOut: 850 });
        },
        // 每个文件上传时,处理相关的事情
        'UploadProgress': (up, file) => {
          // console.log('文件上传时', file);
          this.uploadInProgress = true;
          this.uploadProgress = file.percent;
        },
        // 每个文件上传成功后,处理相关的事情
        'FileUploaded': (up, file, info) => {
          // console.log('文件上传成功后', file);
          this.uploadInProgress = false;
          const data = `${STATIC_URL}/${JSON.parse(info).key}`;
          this.onUploadCompleted.emit(data);
          this.changePictureFromURL(data);
          this._notificationsService.success('上传成功', '图片上传成功', { timeOut: 850 });
        },
        // 上传出错时,处理相关的事情
        'Error': (up, err, errTip) => {
          this.uploadInProgress = false;
          this._notificationsService.error('上传失败', JSON.parse(err.response).error, { timeOut: 850 });
        },
        // 队列文件处理完毕后,处理相关的事情
        'UploadComplete': () => {
          this.uploadInProgress = false;
          // console.log('文件全部上传完毕');
        },
        // 若想在前端对每个文件的key进行个性化处理，可以配置该函数，该配置必须要在 unique_names: false , save_key: false 时才生效
        'Key'(up, file) {
          return `nodepress/image/${file.name}`;
        }
      }
    }, this.uploaderOptions));
  }
 
  // 要上传的文件变更时（组件拦截）
  public onFiles():any {

    // 当前文件
    const file = this._fileUpload.nativeElement.files[0];
    if(!file) return false;

    // 大于限定尺寸，不上传
    if (file.size > this.uploadSizeLimit) {
      this._notificationsService.error('上传失败', '文件不合法！', { timeOut: 500 });
      return false;
    }

    // 如果图片小于10K，则输出base64，否则上传
    if(file.size <= 10000) {
      let reader = new FileReader();
      reader.onload = event => {
        const imgBase64 = (<any>event).target.result;
        this.emitPicture(imgBase64);
      }
      reader.readAsDataURL(file);
      return false;
    }

    // 否则添加进队列，执行七牛上传
    this.qiniuUploader.addFile(file);
  }

  // 点击自定义上传空间元素的时候调用input的click方法
  public bringFileSelector():any {
    this.onModelTouched();
    this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
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
