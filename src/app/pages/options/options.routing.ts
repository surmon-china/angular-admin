import { Routes, RouterModule }  from '@angular/router';
import { Options } from './options.component';

const routes: Routes = [
  { path: '', component: Options }
];

export const routing = RouterModule.forChild(routes);
