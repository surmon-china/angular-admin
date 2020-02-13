/**
 * @file 页面路由
 * @desc app/page/routes
 * @author Surmon <https://github.com/surmon-china>
 */

import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
  { path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(mod => mod.DashboardModule) },
      { path: 'announcement', loadChildren: () => import('./announcement/announcement.module').then(mod => mod.AnnouncementModule) },
      { path: 'article', loadChildren: () => import('./article/article.module').then(mod => mod.ArticleModule) },
      { path: 'comment', loadChildren: () => import('./comment/comment.module').then(mod => mod.CommentModule) },
      { path: 'options', loadChildren: () => import('./options/options.module').then(mod => mod.OptionsModule) },
      { path: 'linux', loadChildren: () => import('./linux/linux.module').then(mod => mod.LinuxModule) },
      { path: 'auth', loadChildren: () => import('./auth/auth.module').then(mod => mod.AuthModule) },
      { path: 'demo',
        children: [
          { path: 'ui', loadChildren: () => import('./demo/ui/ui.module').then(mod => mod.UiModule) },
          { path: 'forms', loadChildren: () => import('./demo/forms/forms.module').then(mod => mod.FormsModule) },
          { path: 'tables', loadChildren: () => import('./demo/tables/tables.module').then(mod => mod.TablesModule) }
        ]
      }
    ]
  }
];

export const RoutingModule = RouterModule.forChild(routes);
