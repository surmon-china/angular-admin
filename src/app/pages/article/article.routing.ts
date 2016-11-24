import { Routes, RouterModule }  from '@angular/router';

import { Article }       from './article.component';
import { Catrgory }      from './components/category';
import { Edit }          from './components/edit';
import { List }          from './components/list';
import { Tag }            from './components/tag';

const routes: Routes = [
  {
    path: '',
    component: Article,
    children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: Catrgory },
      { path: 'edit', component: Edit },
      { path: 'list', component: List },
      { path: 'tag', component: Tag }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

