import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaBaseModule } from '@/app/sa-base.module';

import { RoutingModule } from './tables.routing';
import { TablesComponent } from './tables.component';
import { BasicTablesComponent } from './components/basicTables/basicTables.component';
import { ResponsiveTableComponent } from './components/basicTables/components/responsiveTable';
import { StripedTableComponent } from './components/basicTables/components/stripedTable';
import { BorderedTableComponent } from './components/basicTables/components/borderedTable';
import { HoverTableComponent } from './components/basicTables/components/hoverTable';
import { CondensedTableComponent } from './components/basicTables/components/condensedTable';
import { ContextualTableComponent } from './components/basicTables/components/contextualTable';

import { BasicTablesService } from './components/basicTables/basicTables.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaBaseModule,
    RoutingModule
  ],
  declarations: [
    TablesComponent,
    BasicTablesComponent,
    HoverTableComponent,
    BorderedTableComponent,
    CondensedTableComponent,
    StripedTableComponent,
    ContextualTableComponent,
    ResponsiveTableComponent
  ],
  providers: [
    BasicTablesService,
  ]
})
export default class TablesModule {}
