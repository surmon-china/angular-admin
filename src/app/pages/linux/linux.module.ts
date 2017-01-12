import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule }     from '../../theme/nga.module';
import { Linux }         from './linux.component';
import { routing }       from './linux.routing';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [
    Linux
  ]
})
export default class LinuxModule {}
