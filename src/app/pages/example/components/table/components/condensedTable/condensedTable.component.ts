import { Component } from '@angular/core';
import { TableService } from '../../table.service';

@Component({
  selector: 'box-condensed-table',
  templateUrl: './condensedTable.component.html'
})
export class CondensedTableComponent {

  peopleTableData: Array<any>;

  constructor(private tableService: TableService) {
    this.peopleTableData = tableService.peopleTableData;
  }
}
