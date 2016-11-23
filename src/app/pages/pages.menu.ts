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
        // 路径
        path: 'article',
        // 数据
        data: {
          // 菜单
          menu: {
            // 菜单名称
            title: '文章管理',
            icon: 'ion-pin',
            // 是否选中
            selected: false,
            // 是否可伸展
            expanded: false,
            //排序值
            order: 2,
          }
        },
        children: [
          {
            path: 'all',
            data: {
              menu: {
                title: '所有文章',
              }
            }
          },
          {
            path: 'category',
            data: {
              menu: {
                title: '分类目录',
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
                title: '发布文章',
              }
            }
          },
          {
            path: 'tag',
            data: {
              menu: {
                title: '文章标签',
              }
            }
          },
        ]
      },
      {
        // 路径
        path: 'page',
        // 数据
        data: {
          // 菜单
          menu: {
            // 菜单名称
            title: '页面管理',
            icon: 'ion-document-text',
            // 是否选中?
            selected: false,
            // 是否可伸展
            expanded: false,
            //排序值
            order: 3,
          }
        },
        children: [
          {
            path: 'all',
            data: {
              menu: {
                title: '所有页面',
              }
            }
          },
          {
            path: 'post',
            data: {
              menu: {
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
            title: '评论管理',
            icon: 'ion-chatbox-working',
            selected: false,
            expanded: false,
            order: 4
          }
        }
      },
      {
        path: 'menu',
        data: {
          menu: {
            title: '菜单管理',
            icon: 'ion-android-menu',
            selected: false,
            expanded: false,
            order: 5
          }
        }
      },
      {
        path: 'file',
        data: {
          menu: {
            title: '文件管理',
            icon: 'ion-document',
            selected: false,
            expanded: false,
            order: 7
          }
        }
      },
      {
        path: 'plugin',
        data: {
          menu: {
            title: '扩展管理',
            icon: 'ion-android-apps',
            selected: false,
            expanded: false,
            order: 8
          }
        }
      },
      {
        path: 'code',
        data: {
          menu: {
            title: '代码管理',
            icon: 'ion-code-working',
            selected: false,
            expanded: false,
            order: 9
          }
        }
      },
      {
        // 路径
        path: 'option',
        // 数据
        data: {
          // 菜单
          menu: {
            // 菜单名称
            title: '全局设置',
            icon: 'ion-gear-a',
            // 是否选中?
            selected: false,
            // 是否可伸展
            expanded: false,
            //排序值
            order: 10,
          }
        },
        children: [
          {
            path: 'system',
            data: {
              menu: {
                title: '程序设置',
              }
            }
          },
          {
            path: 'base',
            data: {
              menu: {
                title: '基本设置',
              }
            }
          },
          {
            path: 'senior',
            data: {
              menu: {
                title: '高级设置',
              }
            }
          },
          {
            path: 'other',
            data: {
              menu: {
                title: '其他设置',
              }
            }
          },
        ]
      },
      {
        path: 'demo',
        data: {
          menu: {
            title: 'Demo演示',
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
                title: 'Editors',
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
               title: 'Components',
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
                title: 'Charts',
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
                title: 'UI Features',
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
                    title: 'Typography',
                  }
                }
              },
              {
                path: 'buttons',
                data: {
                  menu: {
                    title: 'Buttons',
                  }
                }
              },
              {
                path: 'icons',
                data: {
                  menu: {
                    title: 'Icons',
                  }
                }
              },
              {
                path: 'modals',
                data: {
                  menu: {
                    title: 'Modals',
                  }
                }
              },
              {
                path: 'grid',
                data: {
                  menu: {
                    title: 'Grid',
                  }
                }
              },
            ]
          },
          {
            path: 'forms',
            data: {
              menu: {
                title: 'Form Elements',
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
                    title: 'Form Inputs',
                  }
                }
              },
              {
                path: 'layouts',
                data: {
                  menu: {
                    title: 'Form Layouts',
                  }
                }
              }
            ]
          },
          {
            path: 'tables',
            data: {
              menu: {
                title: 'Tables',
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
                    title: 'Basic Tables',
                  }
                }
              },
              {
                path: 'smarttables',
                data: {
                  menu: {
                    title: 'Smart Tables',
                  }
                }
              }
            ]
          },
          {
            path: 'maps',
            data: {
              menu: {
                title: 'Maps',
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
          },
          {
            path: '',
            data: {
              menu: {
                title: '其他页面',
                icon: 'ion-document',
                selected: false,
                expanded: false,
                order: 650,
              }
            },
            children: [
              {
                path: ['auth/login'],
                data: {
                  menu: {
                    title: '登陆'
                  }
                }
              },
              {
                path: ['auth/register'],
                data: {
                  menu: {
                    title: '注册'
                  }
                }
              }
            ]
          }
        ]
      },
      {
        path: '',
        data: {
          menu: {
            title: '站外链接',
            icon: 'ion-ios-more',
            selected: false,
            expanded: false,
            order: 700,
          }
        },
        children: [
          {
            path: '',
            data: {
              menu: {
                title: 'ftp管理',
                url: 'http://ftp.surmon.me',
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
                title: '二级菜单',
                url: '#'
              }
            },
            children: [
              {
                path: '',
                data: {
                  menu: {
                    title: '三级菜单',
                    url: '#'
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
