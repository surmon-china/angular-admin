/**
 * @file 登陆页面模块
 * @desc app/page/auth/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaBaseModule } from '@app/sa-base.module';
import { RoutingModule } from './auth.routing';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaBaseModule,
    RoutingModule
  ],
  declarations: [
    AuthComponent
  ]
})
export default class AuthModule {}
