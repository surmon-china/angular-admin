import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { AuthService }   from '../../auth.service';

@Component({
  selector: 'auth-secret',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./secret.scss')],
  template: require('./secret.html')
})
export class AuthSecret {

  public password:String;
  public editMode:Boolean = false;
  public slogans = ['Done is better than perfect.', 'Code wins arguments.', 'Move fast and break things.'];
  public slogan:String = this.slogans[Math.floor(Math.random()*3)];

  constructor(public elem: ElementRef, private authService: AuthService) {}

  toEditMode(event:any) {
    this.editMode = !this.editMode;
  }

  quitEdit(event:any) {
    this.editMode = false;
  }

  onEnter(event:any) {
    this.editMode = false;
    if(!!this.password) this.onSubmit();
  }

  onSubmit() {
    console.log('提交', this, event);
    this.authService.login(this.password).then(auth => {
      console.log(auth);
      if(auth.code) {
        // 存储token
        // 跳转到首页
      }
    });
  }

  ngAfterViewChecked() {
    const input = this.elem.nativeElement.children[0].children[0].children[0].children[0]);
    input.focus();
  }
}
