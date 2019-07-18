/**
 * @file App module
 * @desc app.module
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PagesModule } from '@app/pages/pages.module';
import { SaBaseModule } from '@app/sa-base.module';
import { AppComponent } from '@app/app.component';
import { RoutingModule } from '@app/app.routing';
import { GlobalState } from '@app/global.state';
import { AppState, TInternalState } from '@app/app.service';

export interface IAppStore {
  state: TInternalState;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

// App 入口模块
@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    RoutingModule,
    HttpClientModule,
    LoadingBarHttpClientModule,
    SimpleNotificationsModule.forRoot(),
    SaBaseModule.forRoot(),
  ],
  providers: [
    AppState,
    GlobalState
  ]
})
export class AppModule {}
