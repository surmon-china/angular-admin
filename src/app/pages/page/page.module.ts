import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }           from '../../theme/nga.module';
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { PagelistService }     from './components/list/list.service';

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
  ],
  providers: [
    PagelistService
  ]
})
export default class PageModule {
}
