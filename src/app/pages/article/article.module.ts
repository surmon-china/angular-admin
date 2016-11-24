import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgaModule }     from '../../theme/nga.module';

import { routing }       from './article.routing';

import { Article }       from './article.component';
import { Catrgory }      from './components/category';
import { Edit }          from './components/edit';
import { List }          from './components/list';
import { Tag }            from './components/tag';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgaModule,
    routing
  ],
  declarations: [
    Article,
    Catrgory,
    Edit,
    List,
    Tag
  ]
})
export default class ArticleModule {
}
