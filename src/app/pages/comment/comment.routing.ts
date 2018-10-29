import { Routes, RouterModule } from '@angular/router';

import { CommentComponent } from './comment.component';
import { CommentListComponent } from './components/list';
import { CommentDetailComponent } from './components/detail';

const routes: Routes = [
  {
    path: '',
    component: CommentComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: CommentListComponent },
      { path: 'post', redirectTo: 'post/0', pathMatch: 'full' },
      { path: 'post/:post_id', component: CommentListComponent },
      { path: 'detail/:comment_id', component: CommentDetailComponent }
    ]
  }
];

export const routing = RouterModule.forChild(routes);

