import { Component } from '@angular/core';
import { BasicTablesService } from '../../basicTables.service';

@Component({
  selector: 'box-hover-table',
  template: require('./hoverTable.html')
})
export class HoverTableComponent {

  metricsTableData: Array<any>;

  constructor(private basicTablesService: BasicTablesService) {
    this.metricsTableData = basicTablesService.metricsTableData;
  }
}
