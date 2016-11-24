import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
const routes: Routes = [
  // 用户权限
  { path: 'auth', loadChildren: () => System.import('./auth/auth.module') },
  {
    path: '',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // 仪表盘
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      // 公告管理
      { path: 'announcement', loadChildren: () => System.import('./announcement/announcement.module') },
      // 文章管理
      // { path: 'article', loadChildren: () => System.import('./article/article.module') },
      // 页面管理
      // { path: 'page', loadChildren: () => System.import('./page/page.module') },
      // demo演示
      {
        path: 'demo',
        children: [
          { path: 'editors', loadChildren: () => System.import('./demo/editors/editors.module') },
          // { path: 'components', loadChildren: () => System.import('./demo/components/components.module') }
          { path: 'charts', loadChildren: () => System.import('./demo/charts/charts.module') },
          { path: 'ui', loadChildren: () => System.import('./demo/ui/ui.module') },
          { path: 'forms', loadChildren: () => System.import('./demo/forms/forms.module') },
          { path: 'tables', loadChildren: () => System.import('./demo/tables/tables.module') },
          { path: 'maps', loadChildren: () => System.import('./demo/maps/maps.module') }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
