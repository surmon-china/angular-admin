/**
 * @file App 全局状态
 * @desc global.state
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

type TFunc = (...args: any) => any;

@Injectable()
export class GlobalState {

  private data = new Subject<object>();
  private dataStream$ = this.data.asObservable();
  private subscriptions: Map<string, Array<TFunc>> = new Map<string, Array<TFunc>>();

  constructor() {
    this.dataStream$.subscribe((data) => this.onEvent(data));
  }

  notifyDataChanged(event, value) {
    const currentValue = this.data[event];
    if (currentValue !== value) {
      this.data[event] = value;
      this.data.next({
        event,
        data: this.data[event]
      });
    }
  }

  subscribe(event: string, callback: TFunc) {
    const subscribers = this.subscriptions.get(event) || [];
    subscribers.push(callback);
    this.subscriptions.set(event, subscribers);
  }

  onEvent(data: any) {
    const subscribers = this.subscriptions.get(data.event) || [];
    subscribers.forEach((callback) => {
      callback.call(null, data.data);
    });
  }
}
