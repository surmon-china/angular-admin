/**
 * @file 页面边栏菜单组件
 * @author Surmon <https://github.com/surmon-china>
 */

import { BLOG_SITE } from '@/config';

export const PAGES_MENU = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: '仪表盘',
            icon: 'home',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'announcement',
        data: {
          menu: {
            title: '公告管理',
            icon: 'volume-high',
            selected: false,
            expanded: false,
            order: 1,
          }
        }
      },
      {
        path: 'article',
        data: {
          menu: {
            title: '文章管理',
            icon: 'brush',
            order: 2,
          }
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                icon: 'copy',
                title: '所有文章',
              }
            }
          },
          {
            path: 'category',
            data: {
              menu: {
                icon: 'folder',
                title: '分类目录',
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
                icon: 'create',
                title: '发布文章',
              }
            }
          },
          {
            path: 'tag',
            data: {
              menu: {
                icon: 'pricetags',
                title: '文章标签',
              }
            }
          },
        ]
      },
      {
        path: 'comment',
        data: {
          menu: {
            title: '评论管理',
            icon: 'chatbox-ellipses-sharp',
            order: 3
          }
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                title: '所有评论',
                icon: 'document-text-sharp'
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
                title: '留言评论',
                icon: 'clipboard-sharp'
              }
            }
          }
         ]
      },
      {
        path: 'options',
        data: {
          menu: {
            title: '全局设置',
            icon: 'settings',
            order: 4,
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Blog',
            url: BLOG_SITE,
            icon: 'code-slash',
            target: '_blank',
            order: 9
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Repositorie',
            url: 'https://github.com/surmon-china/angular-admin',
            icon: 'logo-github',
            target: '_blank',
            order: 10
          }
        }
      },
      {
        path: 'example',
        data: {
          menu: {
            title: '组件示例',
            icon: 'logo-angular',
            order: 11
          }
        },
        children: [
          {
            path: 'typography',
            data: {
              menu: {
                title: '排版',
                icon: 'newspaper'
              }
            }
          },
          {
            path: 'buttons',
            data: {
              menu: {
                title: '按钮',
                icon: 'radio-button-on'
              }
            }
          },
          {
            path: 'modals',
            data: {
              menu: {
                title: '弹窗',
                icon: 'tablet-landscape'
              }
            }
          },
          {
            path: 'grid',
            data: {
              menu: {
                title: '栅格',
                icon: 'grid'
              }
            }
          },
          {
            path: 'icons',
            data: {
              menu: {
                title: '图标',
                icon: 'logo-ionic'
              }
            }
          },
          {
            path: 'table',
            data: {
              menu: {
                title: '表格',
                icon: 'apps'
              }
            }
          },
          {
            path: 'forms',
            data: {
              menu: {
                title: '表单',
                icon: 'help-circle',
                selected: false,
                expanded: false,
                order: 400,
              }
            },
            children: [
              {
                path: 'inputs',
                data: {
                  menu: {
                    title: '表单元素',
                    icon: 'information-circle'
                  }
                }
              },
              {
                path: 'layouts',
                data: {
                  menu: {
                    title: '表单布局',
                    icon: 'information-circle'
                  }
                }
              }
            ]
          },
          {
            path: 'other',
            data: {
              menu: {
                title: '其他',
                icon: 'keypad'
              }
            }
          }
        ]
      }
    ]
  }
];
