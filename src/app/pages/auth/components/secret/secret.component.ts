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

  constructor() {
  }

   onKey(event:any) {
    console.log(event)
  }

  public onSubmit(values:Object):void {
    console.log('提交')
  }
}
