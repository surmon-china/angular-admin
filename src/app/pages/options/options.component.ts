import {Component, ViewEncapsulation} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'options',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [require('./options.scss')],
  template: require('./options.html'),
})
export class Options {

	public authForm:FormGroup;
	public userName:AbstractControl;
	public userSlogan:AbstractControl;
	public userGravatar:AbstractControl;
	public userPassword:AbstractControl;
	public userNewPassword:AbstractControl;
	public userRelNewPassword:AbstractControl;

  public defaultThumb = 'assets/img/theme/no-photo.png';
  public uploaderOptions:any = {
    // url: 'http://website.com/upload'
  };

  constructor(private _fb:FormBuilder) {
		this.authForm = _fb.group({
			'userName': ['', Validators.compose([Validators.required])],
			'userSlogan': ['', Validators.compose([Validators.required])],
			'userGravatar': ['assets/img/theme/no-photo.png', Validators.compose([Validators.required])],
			'userPassword': [''],
			'userNewPassword': [''],
			'userRelNewPassword': [''],
		});
		this.userName = this.authForm.controls['userName'];
		this.userSlogan = this.authForm.controls['userSlogan'];
		this.userGravatar = this.authForm.controls['userGravatar'];
		this.userPassword = this.authForm.controls['userPassword'];
		this.userNewPassword = this.authForm.controls['userNewPassword'];
		this.userRelNewPassword = this.authForm.controls['userRelNewPassword'];
	}

	// 提交权限表单
	public submitAuthForm(values: any) {
		if (this.authForm.valid) {
			console.log(this.authForm);
		}
	}
}
