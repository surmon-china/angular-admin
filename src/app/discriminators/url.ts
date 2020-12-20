/**
 * @file App discriminators url 目标判定器
 * @author Surmon <https://github.com/surmon-china>
 */

// 路径参数
type TUrlPath = string;

// 权限页面
export const isAuthPage = (url: TUrlPath) => url === '/auth';

// 首页
export const isIndexPage = (url: TUrlPath) => url === '/';

// 仪表盘
export const isDashboardPage = (url: TUrlPath) => url === '/dashboard';

// 发布文章页面
export const isPostArticlePage = (url: TUrlPath) => url === '/article/post';

// 公告页面
export const isAnnouncementPage = (url: TUrlPath) => url === '/announcement';

export const isOptionsPage = (url: TUrlPath) => url === '/options';
