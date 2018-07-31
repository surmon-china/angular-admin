import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule }     from 'app/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Options }       from './options.component';
import { routing }       from './options.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  providers: [],
  declarations: [
    Options
  ]
})
export default class OptionsModule {}
