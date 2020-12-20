/**
 * @file 链接转换
 * @author Surmon <https://github.com/surmon-china>
 */

import { BLOG_HOST } from '@/config';

export const getTagPath = (tagSlug: string): string => `${BLOG_HOST}/tag/${tagSlug}`;

export const getCategoryPath = (categorySlug: string): string => `${BLOG_HOST}/category/${categorySlug}`;

export const getArticlePath = (articleId: string | number): string => `${BLOG_HOST}/article/${articleId}`;

export const getGuestbookPath = (): string => `${BLOG_HOST}/guestbook`;
