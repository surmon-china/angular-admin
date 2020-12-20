/**
 * @file UA 解析器
 * @author Surmon <https://github.com/surmon-china>
 */

import { UAParser } from 'ua-parser-js';

const parser = new UAParser();

// 浏览器解析
export const browserParser = (ua: string): string => {
  parser.setUA(ua);
  const result = parser.getBrowser();
  if (!result.name && !result.version) {
    return ua;
  } else {
    return `${result.name || '未知'} | ${result.version || '未知'}`;
  }
};

// OS 解析
export const osParser = (ua: string): string => {
  parser.setUA(ua);
  const result = parser.getOS();
  if (!result.name && !result.version) {
    return ua;
  } else {
    return `${result.name || '未知'} | ${result.version || '未知'}`;
  }
};
