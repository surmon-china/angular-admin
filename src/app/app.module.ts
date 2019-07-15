/**
 * @file App module
 * @module app.module
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
import { SaModule } from '@app/sa.module';
import { AppComponent } from '@app/app.component';
import { PagesModule } from '@app/pages/pages.module';
import { GlobalState } from '@app/global.state';
import { RoutingModule } from '@app/app.routing';
import { AppState, IinternalState } from '@app/app.service';

const APP_PROVIDERS = [
  AppState,
  GlobalState
];

interface IStore {
  state: IinternalState;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

// App 入口模块
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    RoutingModule,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    LoadingBarHttpClientModule,
    SaModule.forRoot()
  ],
  providers: [
    APP_PROVIDERS,
  ]
})
export class AppModule {}
