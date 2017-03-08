import { Routes, RouterModule }  from '@angular/router';

import { Comment }               from './comment.component';
import { CommentList }          from './components/list';
import { CommentDetail }          from './components/detail';

const routes: Routes = [
  {
    path: '',
    component: Comment,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CommentList },
      { path: 'post', redirectTo: 'post/0', pathMatch: 'full' },
      { path: 'post/:post_id', component: CommentList },
      { path: 'detail/:comment_id', component: CommentDetail }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

