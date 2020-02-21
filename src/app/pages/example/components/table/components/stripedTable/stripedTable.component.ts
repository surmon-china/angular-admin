import { Component } from '@angular/core';
import { TableService } from '../../table.service';

@Component({
  selector: 'box-striped-table',
  templateUrl: './stripedTable.component.html'
})
export class StripedTableComponent {

  smartTableData: Array<any>;

  constructor(private tableService: TableService) {
    this.smartTableData = tableService.smartTableData;
  }
}
