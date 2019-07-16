/**
 * @file 服务器管理页面路由
 * @module app/page/linux/routes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';
import { LinuxComponent } from './linux.component';

const routes: Routes = [
  { path: '', component: LinuxComponent }
];

export const RoutingModule = RouterModule.forChild(routes);
