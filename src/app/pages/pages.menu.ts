export const PAGES_MENU = [
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        data: {
          menu: {
            title: '仪表盘',
            icon: 'ion-android-home',
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
            icon: 'ion-radio-waves',
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
            icon: 'ion-pin',
            order: 2,
          }
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                icon: 'ion-ios-list-outline',
                title: '所有文章',
              }
            }
          },
          {
            path: 'category',
            data: {
              menu: {
                icon: 'ion-ios-folder',
                title: '分类目录',
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
                icon: 'ion-compose',
                title: '发布文章',
              }
            }
          },
          {
            path: 'tag',
            data: {
              menu: {
                icon: 'ion-pricetags',
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
            title: '多说评论',
            icon: 'ion-chatbox-working',
            order: 4
          }
        },
        children: [
          {
            path: 'manage',
            data: {
              menu: {
                title: '评论管理',
                icon: 'ion-ios-list-outline'
              }
            }
          },
          {
            path: 'thread',
            data: {
              menu: {
                title: '多说文章',
                icon: 'ion-ios-list-outline'
              }
            }
          },
          {
            path: 'users',
            data: {
              menu: {
                title: '多说用户',
                icon: 'ion-ios-list-outline'
              }
            }
          },
          {
            path: 'preferences',
            data: {
              menu: {
                title: '个性化设置',
                icon: 'ion-ios-flame'
              }
            }
          },
          {
            path: 'tools',
            data: {
              menu: {
                title: '开发工具',
                icon: 'ion-wrench'
              }
            }
          },
          {
            path: 'statistics',
            data: {
              menu: {
                title: '评论统计',
                icon: 'ion-stats-bars'
              }
            }
          },
          {
            path: 'user',
            data: {
              menu: {
                title: '个人资料',
                icon: 'ion-person'
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
            icon: 'ion-gear-a',
            order: 10,
          }
        }
      },
      {
        path: 'linux',
        data: {
          menu: {
            title: 'Aliyun管理',
            icon: 'ion-social-tux',
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
            title: '百度统计',
            url: 'https://tongji.baidu.com/web',
            icon: 'ion-ios-pie',
            order: 800,
            target: '_blank'
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: 'Web-OS',
            url: 'https://os.surmon.me',
            icon: 'ion-social-windows',
            order: 800,
            target: '_blank'
          }
        }
      },
      {
        path: '',
        data: {
          menu: {
            title: '子站快链',
            icon: 'ion-android-apps',
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: '公网IP',
                url: 'http://121.42.55.33',
                icon: 'ion-android-globe',
                order: 800,
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Vue-Blog',
                url: 'https://surmon.me',
                icon: 'ion-android-exit',
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
                url: 'https://github.com/surmon-china',
                icon: 'ion-social-github',
                target: '_blank'
              }
            }
          }
        ]
      },
      {
        path: 'demo',
        data: {
          menu: {
            title: 'Demo开发',
            icon: 'ion-ios-more',
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
                icon: 'ion-android-exit',
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
                icon: 'ion-android-laptop',
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
            ]
          },
          {
            path: 'forms',
            data: {
              menu: {
                title: '表单组件',
                icon: 'ion-compose',
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
                icon: 'ion-grid',
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
              },
              {
                path: 'smarttables',
                data: {
                  menu: {
                    title: '智能表格',
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
