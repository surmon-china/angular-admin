/**
 * @file 仪表盘页面路由
 * @module app/page/dashboard/routes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

export const routing = RouterModule.forChild(routes);
