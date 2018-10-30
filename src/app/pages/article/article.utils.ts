/**
 * @file 页面公共扩展
 * @module app/pages/utils
 * @author Surmon <https://github.com/surmon-china>
 */

import * as lodash from 'lodash';
import { IDataExtends } from '@app/pages/pages.constants';

// 分类数据
export interface ICategory {
  id?: number;
  _id?: string;
  pid?: string;
  count?: number;
  name: string;
  slug: string;
  description: string;
  update_at: string;
  create_at: string;
  selected?: boolean;
  extends: IDataExtends[];
  children?: ICategory[];
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
