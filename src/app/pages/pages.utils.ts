/**
 * @file 页面公共扩展
 * @module app/pages/utils
 * @author Surmon <https://github.com/surmon-china>
 */

import { FormGroup } from '@angular/forms';
import { TSelectedIds, TSelectedAll } from './pages.constants';

interface ISelectChangeOptions {
  data: any[];
  selectedIds: TSelectedIds;
  isSelect?: boolean;
}

// 合并 form 到实例本身
export const mergeFormControlsToInstance = (instance, form) => {
  if (form instanceof FormGroup) {
    Object.keys(form.controls).forEach(keyword => {
      instance[keyword] = form.controls[keyword];
    });
  }
};

// 对批量操作进行更新操作
export const handleBatchSelectChange = (options: ISelectChangeOptions): void => {
  const { data, isSelect } = options;
  if (!data.length) {
    return;
  }
  data.forEach(item => (item.selected = isSelect));
  options.selectedIds = isSelect ? data.map(item => item._id) : [];
};

// 对单个勾选进行更新操作
export const handleItemSelectChange = (options: ISelectChangeOptions): TSelectedAll => {
  const { data } = options;
  options.selectedIds = data.filter(item => item.selected).map(item => item._id);
  console.log(options.selectedIds.length, data.length);
  return options.selectedIds.length === data.length;
};

// 其他
