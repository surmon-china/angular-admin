import {Component, ViewEncapsulation} from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { OptionsService } from './options.service';

@Component({
  selector: 'options',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [require('./options.scss')],
  template: require('./options.html'),
})
export class Options {

	public authForm:FormGroup;
	public name:AbstractControl;
	public slogan:AbstractControl;
	public gravatar:AbstractControl;
	public password:AbstractControl;
	public newPassword:AbstractControl;
	public relNewPassword:AbstractControl;

  constructor(private _fb: FormBuilder,
  						private _optionsService: OptionsService) {
		this.authForm = _fb.group({
			'name': ['', Validators.compose([Validators.required])],
			'slogan': ['', Validators.compose([Validators.required])],
			'gravatar': ['', Validators.compose([Validators.required])],
			'password': [''],
			'newPassword': [''],
			'relNewPassword': [''],
		});
		this.name = this.authForm.controls['name'];
		this.slogan = this.authForm.controls['slogan'];
		this.gravatar = this.authForm.controls['gravatar'];
		this.password = this.authForm.controls['password'];
		this.newPassword = this.authForm.controls['newPassword'];
		this.relNewPassword = this.authForm.controls['relNewPassword'];
	}

	// 提交权限表单
	public submitAuthForm(values: any) {
		if (this.authForm.valid) {
			this.putAuth(this.authForm.value);
		}
	}

	public handleAuthChange = userAuthPromise => {
		userAuthPromise.then(({ result: { name, slogan, gravatar }}) => {
			this.authForm.reset({
				name,
				slogan,
				gravatar,
				password: '',
				newPassword: '',
				relNewPassword: ''
			});
		})
		.catch(error => {});;
	}

	// 获取用户
	public getUserAuth() {
		this.handleAuthChange(this._optionsService.getUser());
	}

	// 更新用户
	public putAuth(auth: any) {
		this.handleAuthChange(this._optionsService.putAuth(auth));
	}

	ngOnInit () {
		this.getUserAuth();
	}
}
