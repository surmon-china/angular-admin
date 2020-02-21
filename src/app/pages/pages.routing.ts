/**
 * @file 页面路由
 * @desc app/page/routes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth').then(module => module.AuthModule) },
  { path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard').then(module => module.DashboardModule) },
      { path: 'announcement', loadChildren: () => import('./announcement').then(module => module.AnnouncementModule) },
      { path: 'article', loadChildren: () => import('./article').then(module => module.ArticleModule) },
      { path: 'comment', loadChildren: () => import('./comment').then(module => module.CommentModule) },
      { path: 'options', loadChildren: () => import('./options').then(module => module.OptionsModule) },
      { path: 'linux', loadChildren: () => import('./linux').then(module => module.LinuxModule) },
      { path: 'auth', loadChildren: () => import('./auth').then(module => module.AuthModule) },
      { path: 'example', loadChildren: () => import('./example').then(module => module.ExampleModule) }
    ]
  }
];

export const RoutingModule = RouterModule.forChild(routes);
