import { Component } from '@angular/core';
import { ArticleEditService } from './edit.service';

@Component({
  selector: 'article-edit',
  template: require('./edit.html')
})

export class ArticleEdit {

  // 文章内容
  public article = {
    title: '世界，你好！',
    keywords: [],
    description: '',
    content: '',
    thumb: '',
    state: '1',
    public: '1',
    password: '',
    tag: [],
    category: []
  }

  public defaultPicture = 'assets/img/theme/palette.png';
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

  constructor(private _articleEditService: ArticleEditService) {}

  // 提交文章
  public submitArticle(event) {
    // console.log('提交文章', this.article);
    const { title, content } = this.article;
    if(title && content) {
      this._articleEditService.addArticle(this.article)
      .then(article => {
        this.article = article;
        console.log(article);
      })
      .catch(error => {})
    }
  }

  ngOnInit() {
  }
}
