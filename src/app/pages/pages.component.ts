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
        <div class="al-copy">&copy; <a href="https://surmon.me">NodePress</a> 2018</div>
        <ul class="al-share clearfix" *ngIf="false">
          <li><i class="socicon socicon-facebook"></i></li>
          <li><i class="socicon socicon-twitter"></i></li>
          <li><i class="socicon socicon-google"></i></li>
          <li>
            <a href="https://github.com/surmon-china" target="_blank"><i class="socicon socicon-github"></i></a>
          </li>
        </ul>
      </div>
    </footer>
    <sa-back-top position="200"></sa-back-top>
  `
})
export class PagesComponent {
  constructor() {}
}
