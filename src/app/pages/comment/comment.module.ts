/**
 * @file 评论页面模块
 * @desc app/page/comment/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SaBaseModule } from '@app/sa-base.module';
import { RoutingModule } from './comment.routing';

import { CommentComponent } from './comment.component';
import { CommentListComponent } from './components/list';
import { CommentDetailComponent } from './components/detail';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    SaBaseModule,
    RoutingModule,
  ],
  providers: [],
  declarations: [
    CommentComponent,
    CommentListComponent,
    CommentDetailComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CommentModule {}
