/**
 * @file 开发环境配置
 * @author Surmon <https://github.com/surmon-china>
 */

import { DEVELOP_API } from '@/config';

export const api = DEVELOP_API;
export const environment = {
  production: false,
  development: true,
  hmr: true,
};
