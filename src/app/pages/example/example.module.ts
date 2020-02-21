/**
 * @file UI Example 页面
 * @desc app/page/example/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SaBaseModule } from '@app/sa-base.module';
import { RoutingModule } from './example.routing';

import { ExampleComponent } from './example.component';
import { ButtonsComponent } from './components/buttons';
import { GridComponent } from './components/grid';
import { IconsComponent } from './components/icons';
import { ModalsComponent } from './components/modals';
import { TypographyComponent } from './components/typography';
import { OtherComponent } from './components/other';

import { FlatButtonsComponent } from './components/buttons/components/flatButtons';
import { RaisedButtonsComponent } from './components/buttons/components/raisedButtons';
import { SizedButtonsComponent } from './components/buttons/components/sizedButtons';
import { DisabledButtonsComponent } from './components/buttons/components/disabledButtons';
import { IconButtonsComponent } from './components/buttons/components/iconButtons';
import { LargeButtonsComponent } from './components/buttons/components/largeButtons';
import { DropdownButtonsComponent } from './components/buttons/components/dropdownButtons';
import { GroupButtonsComponent } from './components/buttons/components/groupButtons';

import { FormInputsComponent } from './components/forms/inputs';
import { FormLayoutsComponent } from './components/forms/layouts';
import { StandardInputsComponent } from './components/forms/inputs/components/standardInputs';
import { ValidationInputsComponent } from './components/forms/inputs/components/validationInputs';
import { GroupInputsComponent } from './components/forms/inputs/components/groupInputs';
import { CheckboxInputsComponent } from './components/forms/inputs/components/checkboxInputs';
import { SelectInputsComponent } from './components/forms/inputs/components/selectInputs';

import { InlineFormComponent } from './components/forms/layouts/components/inlineForm';
import { BlockFormComponent } from './components/forms/layouts/components/blockForm';
import { HorizontalFormComponent } from './components/forms/layouts/components/horizontalForm';
import { BasicFormComponent } from './components/forms/layouts/components/basicForm';
import { WithoutLabelsFormComponent } from './components/forms/layouts/components/withoutLabelsForm';

import { TableComponent } from './components/table';
import { ResponsiveTableComponent } from './components/table/components/responsiveTable';
import { StripedTableComponent } from './components/table/components/stripedTable';
import { BorderedTableComponent } from './components/table/components/borderedTable';
import { HoverTableComponent } from './components/table/components/hoverTable';
import { CondensedTableComponent } from './components/table/components/condensedTable';
import { ContextualTableComponent } from './components/table/components/contextualTable';
import { TableService } from './components/table/table.service';

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
    ExampleComponent,
    FlatButtonsComponent,
    RaisedButtonsComponent,
    SizedButtonsComponent,
    DisabledButtonsComponent,
    IconButtonsComponent,
    LargeButtonsComponent,
    DropdownButtonsComponent,
    GroupButtonsComponent,
    OtherComponent,
    FormInputsComponent,
    FormLayoutsComponent,
    StandardInputsComponent,
    ValidationInputsComponent,
    GroupInputsComponent,
    CheckboxInputsComponent,
    SelectInputsComponent,
    InlineFormComponent,
    BlockFormComponent,
    HorizontalFormComponent,
    BasicFormComponent,
    WithoutLabelsFormComponent,
    TableComponent,
    ResponsiveTableComponent,
    StripedTableComponent,
    BorderedTableComponent,
    HoverTableComponent,
    CondensedTableComponent,
    ContextualTableComponent
  ],
  providers: [TableService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ExampleModule {}
