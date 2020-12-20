/**
 * @file 页面组件
 * @desc app/componnents-page
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
      <sa-back-top position="200"></sa-back-top>
    </div>
    <footer class="al-footer clearfix">
      <div class="al-footer-right">
        <span>Built with</span>
        <ion-icon class="icon" name="heart"></ion-icon>
      </div>
      <div class="al-footer-main clearfix">
        <div class="al-copy">&copy; <a href="${BLOG_SITE}">Surmon</a> 2021</div>
      </div>
    </footer>
  `
})
export class PagesComponent {
  constructor() {}
}
