import { Component } from '@angular/core';
import { TableService } from '../../table.service';

@Component({
  selector: 'box-bordered-table',
  templateUrl: './borderedTable.component.html',
})
export class BorderedTableComponent {

  metricsTableData: Array<any>;

  constructor(private tableService: TableService) {
    this.metricsTableData = tableService.metricsTableData;
  }
}
