import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { NgaModule }     from '../../theme/nga.module';
import { routing }       from './duoshuo.routing';
import { Duoshuo }       from './duoshuo.component';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [
    Duoshuo
  ]
})
export default class DuoshuoModule {}
