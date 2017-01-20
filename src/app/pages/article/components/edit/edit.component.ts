import { Component } from '@angular/core';

@Component({
  selector: 'article-edit',
  template: require('./edit.html')
})

export class ArticleEdit {

  // 文章内容
  public article = {
    title: '',
    keyword: [],
    description: '',
    content: '',
    thumb: 'assets/img/app/profile/Nasta.png',
    slug: '',
    state: '-1',
    public: '1',
    password: '',
    tag: [],
    category: ['587ccc6476c440094b824390']
  }

  public defaultPicture = 'assets/img/theme/no-photo.png';
  public uploaderOptions: any = {
    // url: 'http://website.com/upload'
  };

  /*
  var reader = new FileReader();
   
  // 绑定load事件
  reader.onload = function(e) {
    console.log(e.target.result);
  }
 
  // 读取File对象的数据
  reader.readAsDataURL(files[0]);
  */

  constructor() {
  }

  public submitArticle(event) {
    console.log('提交文章', this.article);
  }

  ngOnInit() {
  }
}
