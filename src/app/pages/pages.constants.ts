/**
 * @file 页面数据的业务类型常量
 * @module app/pages/constants
 * @author Surmon <https://github.com/surmon-china>
 */

export type TApiPath = string;
export type TSelectedIds = string[];
export type TSelectedAll = boolean;

// 请求参数
export interface IGetParams {
  [key: string]: number | string;
}

// 请求状态
export interface IFetching {
  [key: string]: boolean;
}

export interface IDataExtends {
  _id: string;
  name: string;
  value: string;
}

export interface IPagination {
  current_page: number;
  total_page: number;
  per_page: number;
  total: number;
}

// 数据体结构
export interface IResponseData<T> {
  data: T[];
  pagination?: IPagination;
}

// 发布状态
export enum EPublishState {
  all = 'all',
  draft = 0, // 草稿
  published = 1, // 已发布
  recycle = -1 // 回收站
}

// 公开状态
export enum EPublicState {
  all = 'all',
  password = 0, // 需要密码
  public = 1, // 公开状态
  secret = -1 // 私密
}

// 转载状态
export enum EOriginState {
  all = 'all',
  original = 0, // 原创
  reprint = 1, // 转载
  hybrid = -1 // 混合
}

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
