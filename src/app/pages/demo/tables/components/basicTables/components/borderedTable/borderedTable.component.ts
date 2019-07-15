import { Component } from '@angular/core';
import { BasicTablesService } from '../../basicTables.service';

@Component({
  selector: 'box-bordered-table',
  templateUrl: './borderedTable.html',
})
export class BorderedTableComponent {

  metricsTableData: Array<any>;

  constructor(private basicTablesService: BasicTablesService) {
    this.metricsTableData = basicTablesService.metricsTableData;
  }
}
