import { Component } from '@angular/core';
import { BasicTablesService } from '../../basicTables.service';

@Component({
  selector: 'box-striped-table',
  template: require('./stripedTable.html')
})
export class StripedTableComponent {

  smartTableData: Array<any>;

  constructor(private basicTablesService: BasicTablesService) {
    this.smartTableData = basicTablesService.smartTableData;
  }
}
