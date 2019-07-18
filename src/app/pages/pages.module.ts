/**
 * @file 页面模块
 * @desc app/page
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { RoutingModule } from './pages.routing';
import { SaBaseModule } from '../sa-base.module';

@NgModule({
  imports: [CommonModule, RoutingModule, SaBaseModule],
  declarations: [PagesComponent]
})
export class PagesModule {}
