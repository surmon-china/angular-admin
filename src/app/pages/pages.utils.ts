/**
 * @file 页面公共扩展
 * @module app/pages/utils
 * @author Surmon <https://github.com/surmon-china>
 */

// 合并 form 到实例本身
export const mergeFormControlsToInstance = (instance, form) => {
  Object.keys(form.controls).forEach(keyword => {
    instance[keyword] = form.controls[keyword];
  });
};
