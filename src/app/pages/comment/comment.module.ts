import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }           from '../../theme/nga.module';
import { PaginationModule, DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing }             from './comment.routing';

import { CommentService }      from './comment.service';

import { Comment }             from './comment.component';
import { CommentList }         from './components/list';
import { CommentDetail }       from './components/detail';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    PaginationModule,
    DropdownModule,
    ModalModule,
    routing
  ],
  providers: [
    CommentService
  ],
  declarations: [
    Comment,
    CommentList,
    CommentDetail
  ]
})
export default class CommentModule {
}
