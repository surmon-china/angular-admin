/**
 * @file 页面公共扩展
 * @module app/pages/utils
 * @author Surmon <https://github.com/surmon-china>
 */

import { FormGroup, AbstractControl } from '@angular/forms';
import { TSelectedIds } from './pages.constants';

interface ISelectChangeOptions {
  data: any[];
  selectedIds: TSelectedIds;
  isSelect?: boolean;
}

interface IItemSelectChangeResult {
  selectedIds: TSelectedIds;
  all: boolean;
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
export const handleBatchSelectChange = (options: ISelectChangeOptions): TSelectedIds => {
  const { data, isSelect } = options;
  if (!data.length) {
    return;
  }
  data.forEach(item => (item.selected = isSelect));
  options.selectedIds = isSelect ? data.map(item => item._id) : [];
  return options.selectedIds;
};

// 对单个勾选进行更新操作
export const handleItemSelectChange = (options: ISelectChangeOptions): IItemSelectChangeResult => {
  const { data } = options;
  options.selectedIds = data.filter(item => item.selected).map(item => item._id);
  return {
    selectedIds: options.selectedIds,
    all: options.selectedIds.length === data.length
  };
};

// 表单验证
export const formControlStateClass = (control: AbstractControl, errClassName?: string, isSubmited?: boolean): string => {
    if (control.touched || control.root.touched || control.dirty || control.root.dirty || isSubmited) {
      if (control.valid) {
        return 'has-success';
      } else {
        return errClassName || 'has-error';
      }
    }
};
