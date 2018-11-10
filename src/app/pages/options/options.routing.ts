/**
 * @file 全局设置页面路由
 * @module app/page/options/routes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';
import { OptionsComponent } from './options.component';

const routes: Routes = [
  { path: '', component: OptionsComponent }
];

export const routing = RouterModule.forChild(routes);
