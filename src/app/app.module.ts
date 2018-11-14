/**
 * @file App module 模块
 * @module app/app-module
 * @author Surmon <https://github.com/surmon-china>
 */

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

import { SaModule } from '@app/sa.module';
import { ENV_PROVIDERS } from '@app/environment';
import { AppComponent } from '@app/app.component';
import { PagesModule } from '@app/pages/pages.module';
import { GlobalState } from '@app/global.state';
import { RoutingModule } from '@app/app.routing';
import { AppState, IinternalState } from '@app/app.service';

// Application wide providers
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
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})
export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: IStore) {
    if (!store || !store.state)  {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      const restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    Reflect.deleteProperty(store, 'state');
    Reflect.deleteProperty(store, 'restoreInputValues');
  }

  hmrOnDestroy(store: IStore) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: IStore) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
