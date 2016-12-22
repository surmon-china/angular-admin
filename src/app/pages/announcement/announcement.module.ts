import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';
import { NgaModule }     from '../../theme/nga.module';
import { QuillEditorModule } from '../../theme/components/ng2-quill-editor';

import { routing }       from './announcement.routing';

import { Announcement }  from './announcement.component';
import { AnnouncementsService } from './announcement.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    ModalModule,
    FormsModule,
    NgaModule,
    routing,
    QuillEditorModule
  ],
  providers: [
    AnnouncementsService
  ],
  declarations: [
    Announcement
  ]
})
export default class AnnouncementModule {}
