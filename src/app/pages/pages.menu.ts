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
        path: 'page',
        data: {
          menu: {
            title: '页面管理',
            icon: 'ion-document-text',
            order: 3,
          }
        },
        children: [
          {
            path: 'list',
            data: {
              menu: {
                icon: 'ion-ios-list-outline',
                title: '所有页面',
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
                icon: 'ion-compose',
                title: '新建页面',
              }
            }
          }
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
            title: 'Web-OS',
            url: 'http://os.surmon.me',
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
                url: 'http://121.42.55.33/',
                icon: 'fa fa-sitemap',
                order: 800,
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: '部署服务器',
                url: 'http://deploy.surmon.me',
                icon: 'fa fa-git',
                order: 800,
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'Wordpress',
                url: 'http://wordpress.surmon.me',
                icon: 'fa fa-wordpress',
                order: 800,
                target: '_blank'
              }
            }
          },
          {
            path: '',
            data: {
              menu: {
                title: 'NodePress',
                url: 'http://api.surmon.me',
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
                title: 'Vue-Blog',
                url: 'http://n.surmon.me',
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
                title: '学天下',
                url: 'http://xtx.surmon.me',
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
                icon: 'fa fa-github',
                target: '_blank'
              }
            }
          }
        ]
      },
      {
        path: 'auth',
        data: {
          menu: {
            title: '权限页面',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 650,
          }
        },
        children: [
          {
            path: 'secret',
            data: {
              menu: {
                icon: 'ion-person',
                title: '私密'
              }
            }
          },
          {
            path: 'login',
            data: {
              menu: {
                icon: 'ion-person',
                title: '登陆'
              }
            }
          },
          {
            path: 'register',
            data: {
              menu: {
                icon: 'ion-person',
                title: '注册'
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
            path: 'editors',
            data: {
              menu: {
                title: '编辑器',
                icon: 'ion-edit',
                selected: false,
                expanded: false,
                order: 100,
              }
            },
            children: [
              {
                path: 'ckeditor',
                data: {
                  menu: {
                    title: 'CKEditor',
                  }
                }
              }
            ]
          },
          {
           path: 'components',
           data: {
             menu: {
               title: '组件库',
               icon: 'ion-gear-a',
               selected: false,
               expanded: false,
               order: 250,
             }
           },
           children: [
             {
               path: 'treeview',
               data: {
                 menu: {
                   title: 'Tree View',
                 }
               }
             }
           ]
          },
          {
            path: 'charts',
            data: {
              menu: {
                title: '图表',
                icon: 'ion-stats-bars',
                selected: false,
                expanded: false,
                order: 200,
              }
            },
            children: [
              {
                path: 'chartist-js',
                data: {
                  menu: {
                    title: 'Chartist.Js',
                  }
                }
              }
            ]
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
                path: 'icons',
                data: {
                  menu: {
                    title: '图表',
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
                    title: '小型表格',
                  }
                }
              }
            ]
          },
          {
            path: 'maps',
            data: {
              menu: {
                title: '地图',
                icon: 'ion-ios-location-outline',
                selected: false,
                expanded: false,
                order: 600,
              }
            },
            children: [
              {
                path: 'googlemaps',
                data: {
                  menu: {
                    title: 'Google Maps',
                  }
                }
              },
              {
                path: 'leafletmaps',
                data: {
                  menu: {
                    title: 'Leaflet Maps',
                  }
                }
              },
              {
                path: 'bubblemaps',
                data: {
                  menu: {
                    title: 'Bubble Maps',
                  }
                }
              },
              {
                path: 'linemaps',
                data: {
                  menu: {
                    title: 'Line Maps',
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
