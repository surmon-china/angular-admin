/**
 * @file 公告管理模块
 * @desc app/page/announcement/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SaBaseModule } from '@app/sa-base.module';

import { RoutingModule } from './announcement.routing';
import { AnnouncementComponent } from './announcement.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SaBaseModule,
    RoutingModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    AnnouncementComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AnnouncementModule {}
