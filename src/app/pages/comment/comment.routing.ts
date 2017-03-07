import { Routes, RouterModule }  from '@angular/router';

import { Comment }               from './comment.component';
import { CommentList }          from './components/list';
// import { CommentPost }           from './components/post';
// import { CommentDetail }          from './components/detail';

const routes: Routes = [
  {
    path: '',
    component: Comment,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CommentList },
      // { path: 'post', component: CommentPost },
      // { path: 'detail/:comment_id', component: CommentDetail }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

