import { Routes, RouterModule }  from '@angular/router';
import { Pages } from './pages.component';
// noinspection TypeScriptValidateTypes
const routes: Routes = [
  { path: 'auth/login', loadChildren: () => System.import('./login/login.module')},
  { path: 'auth/register', loadChildren: () => System.import('./register/register.module')},
  {
    path: '',
    component: Pages,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: 'announcement', loadChildren: () => System.import('./announcement/announcement.module') },
      // { path: 'article', loadChildren: () => System.import('./article/article.module') }, children
      // { path: 'page', loadChildren: () => System.import('./page/page.module') },children
      { path: 'dashboard', loadChildren: () => System.import('./dashboard/dashboard.module') },

      {
        path: 'demo',
        // component: Pages,
        children: [
          { path: '', redirectTo: 'editors', pathMatch: 'full' },
          { path: 'editors', loadChildren: () => System.import('./editors/editors.module') },
          // { path: 'components', loadChildren: () => System.import('./components/components.module') }
          { path: 'charts', loadChildren: () => System.import('./charts/charts.module') },
          { path: 'ui', loadChildren: () => System.import('./ui/ui.module') },
          { path: 'forms', loadChildren: () => System.import('./forms/forms.module') },
          { path: 'tables', loadChildren: () => System.import('./tables/tables.module') },
          { path: 'maps', loadChildren: () => System.import('./maps/maps.module') }
        ]
      }
    ]
  }
];

export const routing = RouterModule.forChild(routes);
