import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-edit-main',
  template: require('./main.html')
})
export class PageEditMain {

  @Input() page;

  constructor() {
  }

  ngOnInit() {
  }
}
