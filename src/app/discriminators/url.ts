/**
 * @file App discriminators url 目标判定器
 * @author Surmon <https://github.com/surmon-china>
 */

// 路径参数
type TUrlPath = string;

// 权限页面
export function isAuthPage(url: TUrlPath): boolean {
  return url && url === '/auth';
}

// 首页
export function isIndexPage(url: TUrlPath): boolean {
  return url && url === '/';
}

// 仪表盘
export function isDashboardPage(url: TUrlPath): boolean {
  return url && url === '/dashboard';
}

// 发布文章页面
export function isPostArticlePage(url: TUrlPath): boolean {
  return url && url === '/article/post';
}

// 公告页面
export function isAnnouncementPage(url: TUrlPath): boolean {
  return url && url === '/announcement';
}

export function isOptionsPage(url: TUrlPath): boolean {
  return url && url === '/options';
}
