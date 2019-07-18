/**
 * @file Http loading service
 * @desc app/http-loading
 * @author Surmon <https://github.com/surmon-china>
 */

import { Injectable } from '@angular/core';

function replaceMethod(replacer) {
  return (target, propertyKey, descriptor) => {
    descriptor.value = replacer(descriptor.value);
    return descriptor;
  };
}

export type TLoading = boolean;
export type TLoadingName = string | number;

@Injectable()
export class SaHttpLoadingService {

  private loadings: Map<TLoadingName, boolean> = new Map();

  constructor(...names: TLoadingName[]) {
    names.forEach(name => this.add(name));
  }

  get names(): IterableIterator<TLoadingName> {
    return this.loadings.keys();
  }

  add(name: TLoadingName): void {
    if (!this.loadings.has(name)) {
      this.loadings.set(name, false);
    }
  }

  start(name: TLoadingName): void {
    this.loadings.set(name, true);
  }

  stop(name: TLoadingName): void {
    this.loadings.set(name, false);
  }

  isLoading(name: TLoadingName): boolean {
    return !!(this.loadings.has(name) && this.loadings.get(name));
  }

  isFinished(name: TLoadingName): boolean {
    return !this.isLoading(name);
  }

  isAllFinished(): boolean {
    const values = [];
    this.loadings.forEach(value => values.push(value));
    return values.every(Boolean);
  }

  promise<T>(name: TLoadingName, promise: Promise<T>): Promise<T> {
    this.start(name);
    const stopLoading = () => this.stop(name);
    promise.then(stopLoading, stopLoading);
    return promise;
  }

  handle(name: string) {
    const loadings = this;
    return replaceMethod((origin) => function(...args) {
      const promise = origin.apply(this, args);
      return loadings.promise(name, promise);
    });
  }
}
