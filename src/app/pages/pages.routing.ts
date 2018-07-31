import { Routes, RouterModule }  from '@angular/router';

import { Pages } from './pages.component';

const routes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module' },
  { path: '',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadChildren: './dashboard/dashboard.module' },
      { path: 'announcement', loadChildren: './announcement/announcement.module' },
      { path: 'article', loadChildren: './article/article.module' },
      { path: 'comment', loadChildren: './comment/comment.module' },
      { path: 'options', loadChildren: './options/options.module' },
      { path: 'linux', loadChildren: './linux/linux.module' },
      { path: 'auth', loadChildren: './auth/auth.module' },
      { path: 'demo',
        children: [
          { path: 'ui', loadChildren: './demo/ui/ui.module' },
          { path: 'forms', loadChildren: './demo/forms/forms.module' },
          { path: 'tables', loadChildren: './demo/tables/tables.module' }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
