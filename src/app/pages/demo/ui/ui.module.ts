/**
 * @file UI Demo 页面
 * @desc app/page/ui/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SaBaseModule } from '@app/sa-base.module';
import { RoutingModule } from './ui.routing';

import { UiComponent } from './ui.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { GridComponent } from './components/grid/grid.component';
import { IconsComponent } from './components/icons/icons.component';
import { ModalsComponent } from './components/modals/modals.component';
import { TypographyComponent } from './components/typography/typography.component';
import { OtherComponent } from './components/other/other.component';

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
    SaBaseModule,
    RoutingModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
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
    GroupButtonsComponent,
    OtherComponent
  ],
  providers: [
    IconsService
  ]
})
export class UiModule {}
