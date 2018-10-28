/**
 * @file App service 模块
 * @module app/app-service
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

// 普通对象模型
export interface IinternalState {
  [key: string]: any;
}

@Injectable()
export class AppState {

  // 状态机
  private stateChange = new Subject();
  state$ = this.stateChange.asObservable();

  _state: IinternalState = {
    adminInfo: {
      name: '管理员',
      slogan: '博客管理后台',
      gravatar: 'assets/img/app/profile/Admin.jpg'
    }
  };

  constructor() {}

  get state() {
    return this._state = this._clone(this._state);
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

  private _clone(object: IinternalState) {
    return JSON.parse(JSON.stringify(object));
  }
}
