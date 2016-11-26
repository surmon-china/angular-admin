import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
const routes: Routes = [
  { path: 'auth', loadChildren: () => System.import('./auth/auth.module') },
  { path: '',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },
      { path: 'announcement', loadChildren: () => System.import('./announcement/announcement.module') },
      { path: 'article', loadChildren: () => System.import('./article/article.module') },
      // { path: 'page', loadChildren: () => System.import('./page/page.module') },
      { path: 'comment', loadChildren: () => System.import('./comment/comment.module') },
      // { path: 'plugin', loadChildren: () => System.import('./plugin/plugin.module') },
      { path: 'options', loadChildren: () => System.import('./options/options.module') },
      { path: 'linux', loadChildren: () => System.import('./linux/linux.module') },
      { path: 'demo',
        children: [
          { path: 'editors', loadChildren: () => System.import('./demo/editors/editors.module') },
          { path: 'components', loadChildren: () => System.import('./demo/components/components.module') }
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
