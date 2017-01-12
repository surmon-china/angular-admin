import { Routes, RouterModule }  from '@angular/router';

import { Page }                  from './page.component';
import { PageEdit }              from './components/edit';
import { PageList }              from './components/list';

const routes: Routes = [
  { path: '',
    component: Page,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: PageList }
      { path: 'post', component: PageEdit },
      { path: 'edit/:page_id', component: PageEdit },
    ]
  }
];

export const routing = RouterModule.forChild(routes);
