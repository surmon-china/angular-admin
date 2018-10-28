/**
 * @file 全局设置页面模块
 * @module app/page/options/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaModule } from '@/app/sa.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OptionsComponent } from './options.component';
import { routing } from './options.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaModule,
    routing
  ],
  providers: [],
  declarations: [
    OptionsComponent
  ]
})
export default class OptionsModule {}
