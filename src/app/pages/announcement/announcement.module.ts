import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule } from '../../theme/nga.module';

import { Announcement } from './announcement.component';
import { routing }       from './announcement.routing';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    ModalModule,
    FormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Announcement
  ]
})
export default class AnnouncementModule {}
