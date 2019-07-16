/**
 * @file App service
 * @module app.service
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum EAppStoreKeys {
  AdminInfo = 'adminInfo'
}

export type TInternalState = Record<EAppStoreKeys, any>;

@Injectable()
export class AppState {

  private stateChange = new Subject();
  private _state: TInternalState = {
    adminInfo: {
      name: '管理员',
      slogan: '博客管理后台',
      gravatar: 'assets/images/profile/logo.png'
    }
  };

  get state() {
    return this.clone(this._state);
  }

  set state(value) {
    throw new Error('do not mutate the `.state` directly');
  }

  get(prop?: any) {
    const state = this.state;
    return state.hasOwnProperty(prop) ? state[prop] : state;
  }

  set(prop: string, value: any) {
    this.stateChange.next(value);
    return this._state[prop] = value;
  }

  private clone(object: TInternalState) {
    return JSON.parse(JSON.stringify(object));
  }
}
