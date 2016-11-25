import { Routes, RouterModule }  from '@angular/router';

import { Article }               from './article.component';
import { ArticleCategory }       from './components/category';
import { ArticleEdit }          from './components/edit';
import { ArticleList }          from './components/list';
import { ArticleTag }           from './components/tag';

const routes: Routes = [
  {
    path: '',
    component: Article,
    children: [
      { path: '', redirectTo: 'category', pathMatch: 'full' },
      { path: 'category', component: ArticleCategory },
      { path: 'post', component: ArticleEdit },
      { path: 'edit/:article_id', component: ArticleEdit },
      { path: 'list', component: ArticleList },
      { path: 'tag', component: ArticleTag }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

