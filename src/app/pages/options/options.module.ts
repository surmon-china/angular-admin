import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule }     from '../../theme/nga.module';
import { TreeModule }    from 'angular2-tree-component';

import { Options }       from './options.component';
import { routing }       from './options.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    TreeModule,
    routing
  ],
  declarations: [
    Options
  ]
})
export default class OptionsModule {}
