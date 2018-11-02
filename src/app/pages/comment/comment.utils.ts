/**
 * @file 评论公共扩展
 * @module app/comment/utils
 * @author Surmon <https://github.com/surmon-china>
 */

import { IDataExtends } from '@app/pages/pages.constants';

// 文章数据
export interface IComment {
  ip?: number;
  id?: number;
  _id?: string;
  pid?: number;
  post_id: number;
  content: string;
  agent: string;
  state: number;
  likes: number;
  is_top: boolean;
  author: {
    email: string;
    name: string;
    site?: string;
  };
  ip_location: any;
  update_at: string;
  create_at: string;
  selected?: boolean;
  extends: IDataExtends[];
}

export enum EArticlePatchAction {
  ToRecycle = 1, // 移回收站
  ToDraft = 2, // 移草稿
  ToPublished = 3 // 移已发布
}
