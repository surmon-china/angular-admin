import {Component, ViewEncapsulation} from '@angular/core';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'article-category',
  encapsulation: ViewEncapsulation.Emulated,
  template: require('./category.html'),
})
export class ArticleCategory {

  public categories = {
    "pagination": {
      "total": 3,
      "current_page": 1,
      "total_page": 1,
      "per_page": 12
    },
    "data": [
      {
        "_id": "583d8d01fac72d3cc83b1a32",
        "id": 1,
        "name": "code",
        "slug": "code",
        "description": "编程分类",
        "__v": 0,
        "extend": [],
        "created_at": "2016-11-29T14:13:21.342Z",
        "pid": null
      },
      {
        "_id": "583d9238fac72d3cc83b1a33",
        "id": 2,
        "name": "think",
        "slug": "think",
        "description": "思考分类",
        "__v": 0,
        "extend": [],
        "created_at": "2016-11-29T14:35:36.983Z",
        "pid": null
      },
      {
        "_id": "583d9244fac72d3cc83b1a34",
        "id": 3,
        "name": "movie",
        "slug": "movie",
        "description": "电影分类",
        "__v": 0,
        "extend": [],
        "created_at": "2016-11-29T14:35:48.783Z",
        "pid": null
      }
    ]
  }

  constructor() {
    console.log(this)
  }
}
