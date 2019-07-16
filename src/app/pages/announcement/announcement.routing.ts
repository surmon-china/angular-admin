/**
 * @file 公告管理路由
 * @module app/page/annoucement/routes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';
import { AnnouncementComponent } from './announcement.component';

const routes: Routes = [
  { path: '', component: AnnouncementComponent }
];

export const RoutingModule = RouterModule.forChild(routes);
