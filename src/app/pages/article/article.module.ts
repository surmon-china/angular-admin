/**
 * @file 文章管理页面模块
 * @desc app/page/article/module
 * @author Surmon <https://github.com/surmon-china>
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SaBaseModule } from '@app/sa-base.module';
import { RoutingModule } from './article.routing';

import { ArticleComponent } from './article.component';

import { ArticleTagComponent } from './components/tag';
import { ArticleListComponent } from './components/list';

import { ArticleCategoryComponent } from './components/category';
import { ArticleCategoryAddComponent } from './components/category/components/add';
import { ArticleCategoryListComponent } from './components/category/components/list';

import { ArticleEditComponent } from './components/edit';
import { ArticleEditMainComponent } from './components/edit/components/main';
import { ArticleEditExtendComponent } from './components/edit/components/extend';
import { ArticleEditSubmitComponent } from './components/edit/components/submit';
import { ArticleEditCategoryComponent } from './components/edit/components/category';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SaBaseModule,
    RoutingModule,
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    ArticleComponent,
    ArticleListComponent,
    ArticleTagComponent,
    ArticleEditComponent,

    ArticleEditMainComponent,
    ArticleEditSubmitComponent,
    ArticleEditExtendComponent,
    ArticleEditCategoryComponent,

    ArticleCategoryComponent,
    ArticleCategoryAddComponent,
    ArticleCategoryListComponent
  ]
})
export class ArticleModule {}
