import { Routes, RouterModule }  from '@angular/router';

import { Auth } from './auth.component';

const routes: Routes = [
  { path: '', data: { name: 'auth' }, component: Auth }
];

export const routing = RouterModule.forChild(routes);
