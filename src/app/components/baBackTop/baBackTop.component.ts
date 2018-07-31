import {Component, ViewChild, HostListener, Input, ElementRef} from '@angular/core';

@Component({
  selector: 'ba-back-top',
  styles: [require('./baBackTop.scss')],
  template: `
    <i #baBackTop
       class="back-top ba-back-top ion-md-arrow-up" 
       title="Back to Top"
       [ngStyle]="{ display: isShow ? 'block' : 'none' }"></i>
  `
})
export class BaBackTop {

  public isShow:boolean = false;

  @Input() position:number = 400;
  @Input() showSpeed:number = 500;
  @Input() moveSpeed:number = 1000;

  @ViewChild('baBackTop') private _selector:ElementRef;

  ngAfterViewInit () {
    this._onWindowScroll();
  }

  @HostListener('click')
  _onClick():boolean {
    window.scrollTo(0, 0);
    return false;
  }

  @HostListener('window:scroll')
  _onWindowScroll():void {
    const el = this._selector.nativeElement;
    this.isShow = window.scrollY > this.position;
  }
}
