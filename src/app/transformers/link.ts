/**
 * @file 链接获取器
 * @author Surmon <https://github.com/surmon-china>
 */

import { BLOG_HOST } from '@/config';

export function getTagPath(tagSlug: string): string {
  return `${BLOG_HOST}/tag/${tagSlug}`;
}

export function getCategoryPath(categorySlug: string): string {
  return `${BLOG_HOST}/category/${categorySlug}`;
}

export function getArticlePath(articleId: string | number): string {
  return `${BLOG_HOST}/article/${articleId}`;
}

export function getGuestbookPath(): string {
  return `${BLOG_HOST}/guestbook`;
}

