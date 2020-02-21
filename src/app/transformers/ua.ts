/**
 * @file UA 解析器
 * @author Surmon <https://github.com/surmon-china>
 */

import { UAParser } from 'ua-parser-js';

const parser = new UAParser();

// 浏览器解析
export function browserParser(ua: string): string {
  parser.setUA(ua);
  const result = parser.getBrowser();
  return `${result.name} | ${result.version}`;
}

// os解析
export function osParser(ua: string): string {
  parser.setUA(ua);
  const result = parser.getOS();
  return `${result.name} | ${result.version}`;
}
