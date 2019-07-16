import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { BasicTablesComponent } from './components/basicTables/basicTables.component';

const routes: Routes = [
  {
    path: '',
    component: TablesComponent,
    children: [
      { path: 'basictables', component: BasicTablesComponent },
    ]
  }
];

export const RoutingModule = RouterModule.forChild(routes);
