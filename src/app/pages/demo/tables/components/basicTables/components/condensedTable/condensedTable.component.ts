import { Component } from '@angular/core';
import { BasicTablesService } from '../../basicTables.service';

@Component({
  selector: 'box-condensed-table',
  template: require('./condensedTable.html')
})
export class CondensedTableComponent {

  peopleTableData: Array<any>;

  constructor(private _basicTablesService: BasicTablesService) {
    this.peopleTableData = _basicTablesService.peopleTableData;
  }
}
