/**
 * @file 全局设置页面模块
 * @module app/page/options/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SaBaseModule } from '@app/sa-base.module';
import { OptionsComponent } from './options.component';
import { RoutingModule } from './options.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaBaseModule,
    RoutingModule
  ],
  providers: [],
  declarations: [
    OptionsComponent
  ]
})
export default class OptionsModule {}
