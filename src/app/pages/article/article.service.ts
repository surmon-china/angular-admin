/**
 * @file 页面公共扩展
 * @module app/pages/utils
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import { IDataExtends, EPublicState, EPublishState, EOriginState } from '@app/pages/pages.constants';

// 文章数据
export interface IArticle {
  id?: number;
  _id?: string;
  name: string;
  title: string;
  description: string;
  content?: string;
  keywords: string[];
  meta: {
    likes: number;
    views: number;
    comments: number;
  };
  origin: EOriginState;
  public: EPublicState;
  state: EPublishState;
  update_at: string;
  create_at: string;
  tag: ITag[];
  category: ICategory[];
  extends: IDataExtends[];
}

// 分类数据
export interface ICategory {
  id?: number;
  _id?: string;
  pid?: string;
  name: string;
  slug: string;
  count?: number;
  description: string;
  update_at: string;
  create_at: string;
  selected?: boolean;
  extends: IDataExtends[];
  children?: ICategory[];
}

// 标签数据
export interface ITag {
  id?: number;
  _id?: string;
  name: string;
  slug: string;
  count?: number;
  description: string;
  update_at: string;
  create_at: string;
  selected?: boolean;
}

export enum EArticlePatchAction {
  ToRecycle = 1, // 移回收站
  ToDraft = 2, // 移草稿
  ToPublished = 3 // 移已发布
}

// 构建有级别的分类数据（保证两级数据可用）
export const buildLevelCategories = (categories: ICategory[]): ICategory[] => {

  const todoDeletes = [];
  const newCategories = [];
  const todoCategories = lodash.cloneDeep(categories);

  // 级别数据构造
  todoCategories.forEach(category => {
    todoCategories.forEach(child => {
      if (category.pid === child._id) {
        child.children = child.children || [];
        child.children.push(category);
        todoDeletes.push(category);
      }
    });
  });

  // 扁平数据构造（同时添加级别标示）
  const runBuildLevelAndOptimize = (parent, level) => {
    parent.forEach(child => {
      child.level = level;
      newCategories.push(child);
      if (child.children && child.children.length) {
        runBuildLevelAndOptimize(child.children, level + 1);
      }
    });
  };

  const todoBuildCategories = todoCategories.filter(child => !todoDeletes.includes(child));
  runBuildLevelAndOptimize(todoBuildCategories, 0);

  return newCategories;
};
