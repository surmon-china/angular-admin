import { Component } from '@angular/core';
import { BasicTablesService } from '../../basicTables.service';

@Component({
  selector: 'box-condensed-table',
  templateUrl: './condensedTable.component.html'
})
export class CondensedTableComponent {

  peopleTableData: Array<any>;

  constructor(private basicTablesService: BasicTablesService) {
    this.peopleTableData = basicTablesService.peopleTableData;
  }
}
