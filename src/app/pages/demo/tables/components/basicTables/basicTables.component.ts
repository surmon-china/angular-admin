import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-basic-tables',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./BasicTables.scss')],
  template: require('./BasicTables.html')
})
export class BasicTablesComponent {

  constructor() {}
}
