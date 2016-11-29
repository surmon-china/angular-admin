import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'page-edit-submit',
  template: require('./submit.html')
})

export class PageEditSubmit {

  @Input() page;
  @Output() submitPage = new EventEmitter();

  submit() {
    this.submitPage.emit();
  }

  constructor() {
  }

  ngOnInit() {
  }
}
