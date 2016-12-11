import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }           from '../../theme/nga.module';
import { CKEditorModule }      from 'ng2-ckeditor';
import { DropdownModule, ModalModule } from 'ng2-bootstrap/ng2-bootstrap';

import { routing }             from './article.routing';

import { ArticleTagService } from './components/tag/tag.service';
import { ArticleListService } from './components/list/list.service';
// import { ArticleEditService } from './components/edit/edit.service';
import { ArticleCategoryService } from './components/category/category.service';

import { Article }             from './article.component';
import { ArticleCategory }     from './components/category';
import { ArticleCategoryAdd }  from './components/category/components/add';
import { ArticleCategoryList } from './components/category/components/list';

import { ArticleEdit }          from './components/edit';
import { ArticleEditMain }      from './components/edit/components/main';
import { ArticleEditThumb }     from './components/edit/components/thumb';
import { ArticleEditSubmit }    from './components/edit/components/submit';
import { ArticleEditDuoshuo }   from './components/edit/components/duoshuo';
import { ArticleEditCategory }  from './components/edit/components/category';

import { ArticleList }          from './components/list';
import { ArticleTag }           from './components/tag';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    CKEditorModule,
    DropdownModule,
    ModalModule,
    routing
  ],
  providers: [
    ArticleTagService,
    ArticleListService,
    // ArticleEditService,
    ArticleCategoryService
  ],
  declarations: [
    Article,

    ArticleCategory,
    ArticleCategoryAdd,
    ArticleCategoryList,

    ArticleEdit,
    ArticleEditMain,
    ArticleEditThumb,
    ArticleEditSubmit,
    ArticleEditDuoshuo,
    ArticleEditCategory,

    ArticleList,
    ArticleTag
  ]
})
export default class ArticleModule {
}
