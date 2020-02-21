/**
 * @file 文章编辑页面组件
 * @desc app/page/article/component/edit
 * @author Surmon <https://github.com/surmon-china>
 */

import * as API_PATH from '@app/constants/api';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { EPublishState, EPublicState, EOriginState } from '@app/constants/state';
import { SaHttpRequesterService, SaHttpLoadingService } from '@app/services';
import { IArticle, TArticleId } from '@app/pages/article/article.utils';
import { TApiPath } from '@app/pages/pages.interface';

const DEFAULT_ARTICLE = {
  title: '',
  keywords: [],
  description: '',
  content: '',
  thumb: '',
  origin: EOriginState.Original,
  state: EPublishState.Published,
  public: EPublicState.Public,
  password: '',
  tag: [],
  category: [],
  extends: []
};

enum Loading {
  Get,
  Post
}

@Component({
  selector: 'page-article-edit',
  templateUrl: './edit.component.html',
  providers: [SaHttpLoadingService]
})

export class ArticleEditComponent implements OnInit {

  @ViewChild('editForm', { static: false }) editFormMain: ElementRef;

  public isSubmited: boolean = false;
  private apiPath: TApiPath = API_PATH.ARTICLE;

  // 文章内容
  public article_id: TArticleId = null;
  public article: IArticle = DEFAULT_ARTICLE;

  constructor(
    public elem: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private httpService: SaHttpRequesterService,
    private httpLoadingService: SaHttpLoadingService
  ) {}

  get isUpdating(): boolean {
    return this.httpLoadingService.isLoading(Loading.Post);
  }

  // 提交文章
  public submitArticle(): void {
    if ((this.editFormMain as any).editForm.invalid) {
      this.isSubmited = true;
      window.scrollTo(0, 0);
      return;
    }
    const isSubmitNewPost = !this.article._id;
    this.httpLoadingService.promise(
      Loading.Post,
      (isSubmitNewPost
        ? this.httpService.post(this.apiPath, this.article)
        : this.httpService.put(`${this.apiPath}/${this.article._id}`, this.article)
      ).then(article => {
        if (isSubmitNewPost) {
          this.router.navigate([`/article/edit/${article.result._id}`]);
        } else {
          this.article = article.result;
        }
      })
    );
  }

  // 获取文章信息
  public getArticle(article_id: string) {
    this.httpLoadingService.promise(
      Loading.Get,
      this.httpService
        .get<IArticle>(`${this.apiPath}/${article_id}`)
        .then(article => {
          this.article = article.result;
        })
    );
  }

  // 初始化
  ngOnInit() {
    // 如果是修改，则请求文章数据
    this.route.params.subscribe(({ article_id }) => {
      this.article_id = article_id;
      if (article_id) {
        this.getArticle(article_id);
      }
    });
  }
}
