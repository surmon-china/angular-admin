import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }           from '../../theme/nga.module';
import { CKEditorModule }      from 'ng2-ckeditor';
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing }             from './page.routing';

import { Page }                from './page.component';
import { PageList }            from './components/list';
import { PageEdit }            from './components/edit';
import { PageEditMain }        from './components/edit/components/main';
import { PageEditSubmit }      from './components/edit/components/submit';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    CKEditorModule,
    DropdownModule,
    ModalModule,
    routing
  ],
  declarations: [
    Page,
    PageList,
    PageEdit,
    PageEditMain,
    PageEditSubmit
  ]
})
export default class PageModule {
}
