/**
 * @file 公告管理模块
 * @module app/page/annoucement/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { SaModule } from '@/app/sa.module';

import { routing } from './announcement.routing';
import { AnnouncementComponent } from './announcement.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    SaModule,
    routing
  ],
  providers: [],
  declarations: [
    AnnouncementComponent
  ]
})
export default class AnnouncementModule {}
