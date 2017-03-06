import { Routes, RouterModule }  from '@angular/router';
import { Duoshuo }               from './duoshuo.component';

const routes: Routes = [
    { path: '', redirectTo: 'manage', pathMatch: 'full' },
    { path: 'manage', data: { name: 'manage' }, component: Duoshuo },
    { path: 'thread', data: { name: 'thread' }, component: Duoshuo },
    { path: 'users', data: { name: 'users' }, component: Duoshuo },
    { path: 'preferences', data: { name: 'preferences' }, component: Duoshuo },
    { path: 'tools', data: { name: 'tools' }, component: Duoshuo },
    { path: 'statistics', data: { name: 'statistics' }, component: Duoshuo },
    { path: 'user', data: { name: 'user' }, component: Duoshuo }
];

export const routing = RouterModule.forChild(routes);
