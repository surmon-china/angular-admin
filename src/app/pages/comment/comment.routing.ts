import { Routes, RouterModule }  from '@angular/router';
import { Comment }               from './comment.component';

const routes: Routes = [
    { path: '', redirectTo: 'manage', pathMatch: 'full' },
    { path: 'manage', data: { name: 'manage' }, component: Comment },
    { path: 'thread', data: { name: 'thread' }, component: Comment },
    { path: 'users', data: { name: 'users' }, component: Comment },
    { path: 'preferences', data: { name: 'preferences' }, component: Comment },
    { path: 'tools', data: { name: 'tools' }, component: Comment },
    { path: 'statistics', data: { name: 'statistics' }, component: Comment },
    { path: 'user', data: { name: 'user' }, component: Comment }
  }
];

export const routing = RouterModule.forChild(routes);
