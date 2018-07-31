import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { NgaModule }     from 'app/nga.module';

import { routing }       from './announcement.routing';

import { Announcement }  from './announcement.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    NgaModule,
    routing
  ],
  providers: [],
  declarations: [
    Announcement
  ]
})
export default class AnnouncementModule {}
