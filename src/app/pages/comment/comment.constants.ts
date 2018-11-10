/**
 * @file 评论公共扩展
 * @module app/comment/utils
 * @author Surmon <https://github.com/surmon-china>
 */

import { IDataExtends } from '@app/pages/pages.constants';

// 评论状态
export enum ECommentState {
  all = 'all',
  auditing = 0, // 待审核
  published = 1, // 通过正常
  deleted = -1, // 已删除
  spam = -2 // 垃圾评论
}

// 评论宿主页面的 POST_ID 类型
export enum ECommentPostType {
  guestbook = 0 // 留言板
}

// 评论本身的类型
export enum ECommentParentType {
  self = 0 // 自身一级评论
}

// 排序状态
export enum ESortType {
  desc = -1, // 降序
  asc = 1, // 升序
  hot = 2 // 最热
}

// 喜欢类型
export enum ELikeType {
  comment = 1,
  page = 2
}

// 单个评论
export interface IComment {
  ip?: number;
  id?: number;
  _id?: string;
  pid?: number;
  post_id: number;
  content: string;
  agent: string;
  state: ECommentState;
  likes: number;
  is_top: boolean;
  author: {
    email: string;
    name: string;
    site?: string;
  };
  ip_location?: any;
  update_at?: string;
  create_at?: string;
  selected?: boolean;
  extends: IDataExtends[];
}

export type TCommentId = IComment['_id'];
export type TCommentPostId = IComment['post_id'];
