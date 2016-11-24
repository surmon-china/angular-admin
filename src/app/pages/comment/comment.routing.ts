import { Routes, RouterModule }  from '@angular/router';

import { Comment } from './comment.component';

// noinspection TypeScriptValidateTypes
const routes: Routes = [
  {
    path: '',
    component: Comment
  }
];

export const routing = RouterModule.forChild(routes);
