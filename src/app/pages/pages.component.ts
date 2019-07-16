/**
 * @file 页面组件
 * @module app/componnents-page
 * @author Surmon <https://github.com/surmon-china>
 */

import { BLOG_SITE } from '@/config';
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-pages',
  encapsulation: ViewEncapsulation.Emulated,
  styles: [],
  template: `
    <sa-sidebar></sa-sidebar>
    <sa-page-header></sa-page-header>
    <div class="al-main">
      <div class="al-content">
        <sa-content-header></sa-content-header>
        <router-outlet></router-outlet>
      </div>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">Created with <i class="ion-md-heart"></i></div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="${BLOG_SITE}">Surmon</a> 2019</div>
      </div>
    </footer>
    <sa-back-top position="200"></sa-back-top>
  `
})
export class PagesComponent {
  constructor() {}
}
