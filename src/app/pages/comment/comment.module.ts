import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaModule }           from '@/app/sa.module';
import { PaginationModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';

import { routing }             from './comment.routing';


import { Comment }             from './comment.component';
import { CommentList }         from './components/list';
import { CommentDetail }       from './components/detail';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  providers: [],
  declarations: [
    Comment,
    CommentList,
    CommentDetail
  ]
})
export default class CommentModule {
}
