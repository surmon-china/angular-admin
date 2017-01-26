import { Routes, RouterModule }  from '@angular/router';

import { Auth } from './auth.component';

const routes: Routes = [
  { path: '', component: Auth }
];

export const routing = RouterModule.forChild(routes);
