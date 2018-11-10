import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SaModule } from '@/app/sa.module';

import { routing } from './ui.routing';
import { PaginationModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';
import { UiComponent } from './ui.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { GridComponent } from './components/grid/grid.component';
import { IconsComponent } from './components/icons/icons.component';
import { ModalsComponent } from './components/modals/modals.component';
import { TypographyComponent } from './components/typography/typography.component';

import { FlatButtonsComponent } from './components/buttons/components/flatButtons';
import { RaisedButtonsComponent } from './components/buttons/components/raisedButtons';
import { SizedButtonsComponent } from './components/buttons/components/sizedButtons';
import { DisabledButtonsComponent } from './components/buttons/components/disabledButtons';
import { IconButtonsComponent } from './components/buttons/components/iconButtons';
import { LargeButtonsComponent } from './components/buttons/components/largeButtons';
import { DropdownButtonsComponent } from './components/buttons/components/dropdownButtons';
import { GroupButtonsComponent } from './components/buttons/components/groupButtons';
import { IconsService } from './components/icons/icons.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SaModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  declarations: [
    ButtonsComponent,
    GridComponent,
    IconsComponent,
    ModalsComponent,
    TypographyComponent,
    UiComponent,
    FlatButtonsComponent,
    RaisedButtonsComponent,
    SizedButtonsComponent,
    DisabledButtonsComponent,
    IconButtonsComponent,
    LargeButtonsComponent,
    DropdownButtonsComponent,
    GroupButtonsComponent
  ],
  providers: [
    IconsService
  ]
})
export default class UiModule {}
