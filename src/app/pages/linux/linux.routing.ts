import { Routes, RouterModule }  from '@angular/router';
import { Linux } from './linux.component';

const routes: Routes = [
  { path: '', component: Linux }
];

export const routing = RouterModule.forChild(routes);
