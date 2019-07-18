/**
 * Bussniss constants.
 * @file 业务数据表常量接口
 * @desc constants/state
 * @author Surmon <https://github.com/surmon-china>
 */

// 发布状态
export enum EPublishState {
  All = 'all',
  Draft = 0, // 草稿
  Published = 1, // 已发布
  Recycle = -1, // 回收站
}

// 公开状态
export enum EPublicState {
  All = 'all',
  Password = 0, // 需要密码
  Public = 1, // 公开状态
  Secret = -1, // 私密
}

// 转载状态
export enum EOriginState {
  All = 'all',
  Original = 0, // 原创
  Reprint = 1, // 转载
  Hybrid = 2, // 混合
}

// 排序状态
export enum ESortType {
  Asc = 1, // 升序
  Desc = -1, // 降序
  Hot = 2, // 最热
}
