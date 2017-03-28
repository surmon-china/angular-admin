import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, DropdownModule, ModalModule } from 'ng2-bootstrap';
import { NgaModule }     from '../../theme/nga.module';

import { routing }       from './announcement.routing';

import { Announcement }  from './announcement.component';
import { AnnouncementService } from './announcement.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    NgaModule,
    routing
  ],
  providers: [
    AnnouncementService
  ],
  declarations: [
    Announcement
  ]
})
export default class AnnouncementModule {}
