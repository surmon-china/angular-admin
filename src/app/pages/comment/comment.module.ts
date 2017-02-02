import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule }     from '../../theme/nga.module';
import { routing }       from './comment.routing';

import { Comment }       from './comment.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [
    Comment
  ]
})
export default class CommentModule {}
