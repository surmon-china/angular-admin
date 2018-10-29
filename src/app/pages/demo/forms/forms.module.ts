import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule as AngularFormsModule } from '@angular/forms';
import { SaModule } from '@/app/sa.module';

import { routing } from './forms.routing';

import { RatingModule } from 'ngx-bootstrap';
import { FormsComponent } from './forms.component';
import { InputsComponent } from './components/inputs';
import { LayoutsComponent } from './components/layouts';

import { StandardInputs } from './components/inputs/components/standardInputs';
import { ValidationInputs } from './components/inputs/components/validationInputs';
import { GroupInputs } from './components/inputs/components/groupInputs';
import { CheckboxInputs } from './components/inputs/components/checkboxInputs';
import { Rating } from './components/inputs/components/ratinginputs';
import { SelectInputs } from './components/inputs/components/selectInputs';

import { InlineForm } from './components/layouts/components/inlineForm';
import { BlockForm } from './components/layouts/components/blockForm';
import { HorizontalForm } from './components/layouts/components/horizontalForm';
import { BasicFormComponent } from './components/layouts/components/basicForm';
import { WithoutLabelsForm } from './components/layouts/components/withoutLabelsForm';

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
    StandardInputs,
    ValidationInputs,
    GroupInputs,
    CheckboxInputs,
    Rating,
    SelectInputs,
    InlineForm,
    BlockForm,
    HorizontalForm,
    BasicFormComponent,
    WithoutLabelsForm
  ]
})
export default class FormsModule {
}
