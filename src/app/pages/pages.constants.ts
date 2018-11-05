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
