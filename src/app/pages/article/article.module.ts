import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }           from '../../theme/nga.module';
import { PaginationModule, DropdownModule, ModalModule } from 'ng2-bootstrap';

import { routing }             from './article.routing';

import { ArticleTagService }   from './components/tag/tag.service';
import { ArticleListService }  from './components/list/list.service';
import { ArticleEditService }  from './components/edit/edit.service';
import { ArticleCategoryService } from './components/category/category.service';

import { Article }             from './article.component';
import { ArticleCategory }     from './components/category';
import { ArticleCategoryAdd }  from './components/category/components/add';
import { ArticleCategoryList } from './components/category/components/list';

import { ArticleEdit }          from './components/edit';
import { ArticleEditMain }      from './components/edit/components/main';
import { ArticleEditExtend }    from './components/edit/components/extend';
import { ArticleEditSubmit }    from './components/edit/components/submit';
import { ArticleEditCategory }  from './components/edit/components/category';

import { ArticleList }          from './components/list';
import { ArticleTag }           from './components/tag';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    PaginationModule.forRoot(),
    DropdownModule.forRoot(),
    ModalModule.forRoot(),
    routing
  ],
  providers: [
    ArticleTagService,
    ArticleListService,
    ArticleEditService,
    ArticleCategoryService
  ],
  declarations: [
    Article,

    ArticleCategory,
    ArticleCategoryAdd,
    ArticleCategoryList,

    ArticleEdit,
    ArticleEditMain,
    ArticleEditSubmit,
    ArticleEditExtend,
    ArticleEditCategory,

    ArticleList,
    ArticleTag
  ]
})
export default class ArticleModule {
}
