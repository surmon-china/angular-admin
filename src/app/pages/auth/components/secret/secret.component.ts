import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'auth-secret',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./secret.scss')],
  template: require('./secret.html'),
})
export class AuthSecret {

  public password:String;
  public sloganId:Number;
  // public submitted:boolean = false;

  constructor() {

    this.password = '';
    this.sloganId = Math.ceil(Math.random() * 3);
  }

  public onSubmit(values:Object):void {
    console.log('提交')
  }
}
