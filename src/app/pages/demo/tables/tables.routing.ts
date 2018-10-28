import { Routes, RouterModule } from '@angular/router';

import { Tables } from './tables.component';
import { BasicTablesComponent } from './components/basicTables/basicTables.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Tables,
    children: [
      { path: 'basictables', component: BasicTablesComponent },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
