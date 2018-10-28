/**
 * @file 登陆页面路由
 * @module app/page/auth/toutes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', data: { name: 'auth' }, component: AuthComponent }
];

export const routing = RouterModule.forChild(routes);
