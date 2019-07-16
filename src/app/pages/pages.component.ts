/**
 * @file 页面组件
 * @module app/componnents-page
 * @author Surmon <https://github.com/surmon-china>
 */

import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pages',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [],
  template: `
    <sa-sidebar></sa-sidebar>
    <sa-page-top></sa-page-top>
    <div class="al-main">
      <div class="al-content">
        <sa-content-top></sa-content-top>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-md-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="https://surmon.me">NodePress</a> 2019</div>
      </div>
    </footer>
    <sa-back-top position="200"></sa-back-top>
  `
})
export class PagesComponent {
  constructor() {}
}
