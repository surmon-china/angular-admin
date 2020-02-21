/**
 * @file Http loading service
 * @desc app/http-loading
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';

export type Loading = boolean;
export type LoadingName = string | number;

@Injectable()
export class SaHttpLoadingService {

  private loadings: Map<LoadingName, boolean> = new Map();

  constructor() {}

  get names(): IterableIterator<LoadingName> {
    return this.loadings.keys();
  }

  add(name: LoadingName): void {
    if (!this.loadings.has(name)) {
      this.loadings.set(name, false);
    }
  }

  start(name: LoadingName): void {
    this.loadings.set(name, true);
  }

  stop(name: LoadingName): void {
    this.loadings.set(name, false);
  }

  isLoading(name: LoadingName): boolean {
    return !!(this.loadings.has(name) && this.loadings.get(name));
  }

  isFinished(name: LoadingName): boolean {
    return !this.isLoading(name);
  }

  isAllFinished(): boolean {
    const values = [];
    this.loadings.forEach(value => values.push(value));
    return values.every(Boolean);
  }

  promise<T>(name: LoadingName, promise: Promise<T>): Promise<T> {
    this.start(name);
    promise.finally(() => this.stop(name));
    return promise;
  }
}
