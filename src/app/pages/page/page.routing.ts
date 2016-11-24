import { Routes, RouterModule }  from '@angular/router';

import { Announcement } from './announcement.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Announcement
  }
];

export const routing = RouterModule.forChild(routes);
