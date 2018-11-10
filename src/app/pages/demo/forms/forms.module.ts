/**
 * @file Demo 表单演示模块
 * @module app/page/demo/component/forms/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { SaModule } from '@/app/sa.module';

import { routing } from './forms.routing';

import { RatingModule } from 'ngx-bootstrap';
import { FormsComponent } from './forms.component';
import { InputsComponent } from './components/inputs';
import { LayoutsComponent } from './components/layouts';

import { StandardInputsComponent } from './components/inputs/components/standardInputs';
import { ValidationInputsComponent } from './components/inputs/components/validationInputs';
import { GroupInputsComponent } from './components/inputs/components/groupInputs';
import { CheckboxInputsComponent } from './components/inputs/components/checkboxInputs';
import { RatingComponent } from './components/inputs/components/ratinginputs';
import { SelectInputsComponent } from './components/inputs/components/selectInputs';

import { InlineFormComponent } from './components/layouts/components/inlineForm';
import { BlockFormComponent } from './components/layouts/components/blockForm';
import { HorizontalFormComponent } from './components/layouts/components/horizontalForm';
import { BasicFormComponent } from './components/layouts/components/basicForm';
import { WithoutLabelsFormComponent } from './components/layouts/components/withoutLabelsForm';

@NgModule({
  imports: [
    CommonModule,
    AngularFormsModule,
    SaModule,
    RatingModule.forRoot(),
    routing
  ],
  declarations: [
    LayoutsComponent,
    InputsComponent,
    FormsComponent,
    StandardInputsComponent,
    ValidationInputsComponent,
    GroupInputsComponent,
    CheckboxInputsComponent,
    RatingComponent,
    SelectInputsComponent,
    InlineFormComponent,
    BlockFormComponent,
    HorizontalFormComponent,
    BasicFormComponent,
    WithoutLabelsFormComponent
  ]
})
export default class FormsModule {}
