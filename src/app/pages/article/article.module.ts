/**
 * @file 文章管理页面模块
 * @module app/page/article/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule, BsDropdownModule, ModalModule } from 'ngx-bootstrap';

import { SaModule } from '@/app/sa.module';
import { routing } from './article.routing';

import { ArticleTagComponent } from './components/tag';
import { CategoryAddComponent } from './components/category/components/add';
import { CategoryListComponent } from './components/category/components/list';

import { ArticleEditComponent } from './components/edit';
import { ArticleEditMainComponent } from './components/edit/components/main';
import { ArticleEditExtendComponent } from './components/edit/components/extend';
import { ArticleEditSubmitComponent } from './components/edit/components/submit';
import { ArticleEditCategoryComponent } from './components/edit/components/category';

import { ArticleComponent } from './article.component';
import { ArticleCategoryComponent } from './components/category';
import { ArticleListComponent } from './components/list';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  declarations: [
    ArticleComponent,

    ArticleListComponent,
    ArticleTagComponent,

    ArticleCategoryComponent,
    CategoryAddComponent,
    CategoryListComponent,

    ArticleEditComponent,
    ArticleEditMainComponent,
    ArticleEditSubmitComponent,
    ArticleEditExtendComponent,
    ArticleEditCategoryComponent,
  ]
})
export default class ArticleModule {}
