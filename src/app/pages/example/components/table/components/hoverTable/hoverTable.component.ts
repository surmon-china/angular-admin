import { Component } from '@angular/core';
import { TableService } from '../../table.service';

@Component({
  selector: 'box-hover-table',
  templateUrl: './hoverTable.component.html'
})
export class HoverTableComponent {

  metricsTableData: Array<any>;

  constructor(private tableService: TableService) {
    this.metricsTableData = tableService.metricsTableData;
  }
}
