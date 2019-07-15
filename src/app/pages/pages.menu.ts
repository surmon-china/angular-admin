/**
 * @file 页面边栏菜单组件
 * @module app/page/menu
 * @author Surmon <https://github.com/surmon-china>
 */

export const PAGES_MENU = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: '仪表盘',
            icon: 'ion-md-home',
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
            icon: 'ion-md-sunny',
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
            icon: 'ion-md-create',
            order: 2,
          }
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                icon: 'ion-md-list',
                title: '所有文章',
              }
            }
          },
          {
            path: 'category',
            data: {
              menu: {
                icon: 'ion-md-folder',
                title: '分类目录',
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
                icon: 'ion-md-done-all',
                title: '发布文章',
              }
            }
          },
          {
            path: 'tag',
            data: {
              menu: {
                icon: 'ion-md-pricetags',
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
            icon: 'ion-md-text',
            order: 4
          }
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                title: '所有评论',
                icon: 'ion-md-list'
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
                title: '留言评论',
                icon: 'ion-md-list'
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
            icon: 'ion-md-settings',
            order: 10,
          }
        }
      },
      {
        path: 'linux',
        data: {
          menu: {
            title: 'Aliyun DMS',
            icon: 'ion-logo-tux',
            selected: false,
            expanded: false,
            order: 9
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Aliyun ECS',
            url: 'https://s.click.taobao.com/L0VDd9w',
            icon: 'ion-md-cloud',
            order: 700,
            target: '_blank'
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'SRE service',
            url: 'https://sre.surmon.me',
            icon: 'ion-md-construct',
            order: 800,
            target: '_blank'
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Google Analytics',
            url: 'https://analytics.google.com',
            icon: 'ion-logo-google',
            order: 800,
            target: '_blank'
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Blog',
            url: 'https://surmon.me',
            icon: 'ion-md-ribbon',
            order: 800,
            target: '_blank'
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Github',
            url: 'https://github.com/surmon-china/angular-admin',
            icon: 'ion-logo-github',
            target: '_blank'
          }
        }
      },
      {
        path: 'demo',
        data: {
          menu: {
            title: 'Demo开发',
            icon: 'ion-logo-angular',
            selected: false,
            expanded: false,
            order: 11,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: '官方文档',
                url: 'https://akveo.github.io/ng2-admin/',
                icon: 'ion-md-school',
                order: 800,
                target: '_blank'
              }
            }
          },
          {
            path: 'ui',
            data: {
              menu: {
                title: 'UI 展示',
                icon: 'ion-md-color-fill',
                selected: false,
                expanded: false,
                order: 300,
              }
            },
            children: [
              {
                path: 'typography',
                data: {
                  menu: {
                    title: '排版',
                  }
                }
              },
              {
                path: 'buttons',
                data: {
                  menu: {
                    title: '按钮',
                  }
                }
              },
              {
                path: 'modals',
                data: {
                  menu: {
                    title: '弹窗',
                  }
                }
              },
              {
                path: 'grid',
                data: {
                  menu: {
                    title: '栅格',
                  }
                }
              },
              {
                path: 'icons',
                data: {
                  menu: {
                    title: '图标',
                  }
                }
              },
            ]
          },
          {
            path: 'forms',
            data: {
              menu: {
                title: '表单组件',
                icon: 'ion-md-clipboard',
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
                  }
                }
              },
              {
                path: 'layouts',
                data: {
                  menu: {
                    title: '表单布局',
                  }
                }
              }
            ]
          },
          {
            path: 'tables',
            data: {
              menu: {
                title: '表格',
                icon: 'ion-md-grid',
                selected: false,
                expanded: false,
                order: 500,
              }
            },
            children: [
              {
                path: 'basictables',
                data: {
                  menu: {
                    title: '基本表格',
                  }
                }
              }
            ]
          }
        ]
      }
    ]
  }
];
