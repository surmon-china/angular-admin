/**
 * @file App routes
 * @desc app.routes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

export const RoutingModule = RouterModule.forRoot(routes, { useHash: false, relativeLinkResolution: 'legacy' });
