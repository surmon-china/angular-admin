import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'auth',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./auth.scss')],
  template: require('./auth.html')
})
export class Auth {

  public password:String;
  public editMode:Boolean = false;
  public slogans = ['Done is better than perfect.', 'Code wins arguments.', 'Move fast and break things.'];
  public slogan:String = this.slogans[Math.floor(Math.random()*3)];

  constructor(public elem:ElementRef, 
              private _router: Router,
              private _authService:AuthService) {}

  toEditMode(event:any) {
    this.editMode = !this.editMode;
  }

  quitEdit(event:any) {
    this.editMode = false;
  }

  onEnter(event:any) {
    this.editMode = false;
    if(!!this.password) {
      this.onSubmit();
    }
  }

  onSubmit() {
    this._authService.getToken(this.password)
    .then(auth => {
      if(auth.result.token) {
        localStorage.setItem('id_token', auth.result.token);
        this._router.navigate(['/dashboard']);
      }
    })
    .catch(error => {});
  }

  ngAfterViewChecked() {
    const input = this.elem.nativeElement.children[0].children[0].children[0].children[0]);
    input.focus();
  }
}
