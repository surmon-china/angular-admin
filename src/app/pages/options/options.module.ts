import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule }     from '../../theme/nga.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Options }       from './options.component';
import { routing }       from './options.routing';
import { OptionsService } from './options.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  providers: [
    OptionsService
  ],
  declarations: [
    Options
  ]
})
export default class OptionsModule {}
