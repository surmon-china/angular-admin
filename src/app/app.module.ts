import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { isDevMode, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ApiService } from '@app/api.service';

import { SimpleNotificationsModule } from 'angular2-notifications';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

// App is our top level component
import { App } from './app.component';
import { NgaModule } from './nga.module';
import { PagesModule } from './pages/pages.module';
import { GlobalState } from './global.state';
import { AppState, InternalStateType } from './app.service';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState,
  ApiService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

// app入口模块
@NgModule({
  bootstrap: [App],
  declarations: [
    App
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PagesModule,
    routing,
    HttpClientModule,
    SimpleNotificationsModule.forRoot(),
    NgaModule.forRoot()
  ],
  // expose our Services and Providers into Angular's dependency injection
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
  ]
})

export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
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

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
