import { Routes, RouterModule }  from '@angular/router';
import { Comment }               from './comment.component';

const routes: Routes = [
    { path: '', redirectTo: 'manage', pathMatch: 'full' },
    { path: 'manage', component: Comment },
    { path: 'thread', component: Comment },
    { path: 'users', component: Comment },
    { path: 'preferences', component: Comment },
    { path: 'tools', component: Comment },
    { path: 'statistics', component: Comment },
    { path: 'user', component: Comment }
  }
];

export const routing = RouterModule.forChild(routes);
