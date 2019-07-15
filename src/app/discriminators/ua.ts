/**
 * @file App ua 判定器
 * @author Surmon <https://github.com/surmon-china>
 */

export const isMobile = () => (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase());
