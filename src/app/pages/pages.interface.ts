/**
 * @file 页面数据的业务类型常量
 * @desc app/pages/constants
 * @author Surmon <https://github.com/surmon-china>
 */

export type TApiPath = string;
export type TSelectedIds = string[];
export type TSelectedAll = boolean;

// 请求参数
export interface IGetParams {
  [key: string]: number | string;
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
  data: T;
}

// 数据体结构
export interface IResponsePaginationData<T> {
  data: T[];
  pagination?: IPagination;
}
