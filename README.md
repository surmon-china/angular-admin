
# angular-admin
Admin panel framework based on Angular 2, Bootstrap 4 and Webpack

# Todos && Issues
- ~~首次登陆，数据库无数据时，个人头像，名字等均为展示默认值~~
- ~~分类列表页的分类描述，超出一行之后，P标签的行间距过大~~
- ~~发布文章页的分类目录选中图标，应该替换为ionic里的图标~~
- ~~标签项，需要增加icon自定义字段~~
- 所有涉及发布的内容项，都需要增加自定义字段
- 发布文章页，在标签和分类为空时缺少提示信息，文章的默认缩略图需调整
- 仪表盘信息聚合（系统信息聚合、百度统计api信息聚合、多说信息聚合）
- 仪表盘图表组件和echarts整合
- 文章发布后自动ping给搜索引擎xml
- ~~所有无用组件/代码的清理~~
- 程序截图 + 文档撰写

# 程序结构

## 资源服务
   - 一个类
   - 一堆方法
   - 返回promise
   - 用第三方组件配合来实现res/err的处理

## 自定义组件的双向绑定如何实现
   - 云云云...

## 路由管理和拦截
   - 集中管理路由
   - 在app根组件中，注入router对象订阅event的事件流，从而实现"拦截"，此方法无法中断

## auth验证
   - 本地token库会验证两点，1：是否存在 2：是否有效 3：是否过期
   - 可选一些配置，见作者github
   - 在登录页，需要使用ng2的http服务，否则无法发起请求

## 组件与页面构成
   - 页面
   - 组件、过滤器、指令、公共服务、验证...

## 数据流
   - 略复杂...
   - to promise

## 管道过滤器
   - 简单，都一样

## 自定义指令
   - 简单

## 七牛上传组件的封装
   - 服务端token的获取
   - 上传的整个流程
   - 上传后的后续处理，用image对象获取图片，成功后再emit事件和更新数据
   - 由于设置了防盗链导致的403错误

## 表单验证构造和使用
   - 依赖哪些组件、类、基本类、验证类、...
   - 基本的构造方法是怎样的
   - 自定义正则验证规则

## 模块/组件/服务之间的关系
   - 模块为普通内聚单位，可包含多种其他元素
   - 组件为view的控制器映射，负责view的直接逻辑
   - service属工具性质，本项目中用来获取/管理资源/状态
   - service可以抽象为公共服务，但是多次注入会被多次实例化，导致无法订阅数据流，暂没找到更好方法

## 一些要注意的坑
   - 变量声明（声明前的判断，和调用时可能出现的错误）
   - ```(<any>window).aaa = {}```，这里不能用global判断，global在webpack中是可用的，本项目也依赖了虚拟的dom对象，编译后global关键字被自动替换为window引入，所以只能如上写法，当然还有一种try catch的方法也能做到
   - 在项目中使用jquery，或其他js库
   - 暴露类的构造和意义，如ngOnInit这样的钩子函数
   - cnpm和npm安装的区别，会导致重复引用无法编译的问题，主要是由于cnpm的版本管理机制不一样导致的，cnpm是空文件夹+快捷方式的方法乱搞

## 其他命令
   - 其他的不重要的一些命令



# 执行命令
```bash
cnpm install
npm start
npm run build:prod
npm run serve:prod
```

# 目录结构
```
angular-admin/
   |
   ├──config/                    * webpack构建配置
   │   |
   │   ├──head-config.common.js  * 配置index.html的头部元信息
   │   │
   │   ├──helpers.js             * 配置文件的辅助函数
   │   │
   │   ├──webpack.dev.js         * webpack开发环境配置
   │   │
   │   ├──webpack.prod.js        * webpack生产环境配置
   │   │
   │   ├──webpack.test.js        * webpack测试环境配置
   │   │
   │   ├──electron/              * electron webpack config（桌面客户端配置）
   │   │
   │   └──html-elements-plugin/  * html elements plugin
   │
   ├──src/                       * 源文件最终编译为javascript
   │   |
   │   ├──custom-typings.d.ts    * 第三方模块的自定义类型
   │   │
   │   ├──desktop.ts             * electron窗口的初始化入口文件
   │   │
   │   ├──index.html             * 入口文件
   │   │
   │   ├──main.browser.ts        * 浏览器环境入口文件
   │   │
   │   ├──package.json           * electrons项目
   │   │
   │   ├──polyfills.browser.ts   * 浏览器降级支持polyfills file
   │   │
   │   ├──vendor.browser.ts      * 基础模块（供应商）
   │   │
   │   ├──app/                   * application code - our working directory
   │   │   │
   │   │   ├──app.component.ts   * app入口组件
   │   │   │
   │   │   ├──app.loader.ts      * 应用程序加载阶段)、，初始化时用的样式
   │   │   │
   │   │   ├──app.menu.ts        * 页面的菜单/路由
   │   │   │
   │   │   ├──app.module.ts      * app入口模块
   │   │   │
   │   │   ├──app.routes.ts      * app路由
   │   │   │  
   │   │   ├──global.state.ts    * 组件之间交换的全局应用状态
   │   │   │
   │   │   ├──environment.ts     * 环境提供
   │   │   │
   │   │   ├──app.scss           * 样式入口文件 
   │   │   │
   │   │   ├──pages/             * application pages components, place where you can create pages and fill them with components
   │   │   │
   │   │   └──theme/             * 模板/全局通用组件、指令、过滤器、样式
   │   │
   │   └──assets/                * 静态资源
   │
   │
   ├──tslint.json                * typescript lint 配置
   │
   ├──typedoc.json               * typescript文档生成器
   │
   ├──tsconfig.json              * config that webpack uses for typescript
   │
   │──package.json               * what npm uses to manage it's dependencies
   │
   │──Dockerfile                 * Docker镜像生成文件
   │
   │──build.sh                   * Docker构建命令
   │
   │──.travis.yml                * Travis 持续集成配置
   │
   │──.gitignore                 * Git忽略文件配置
   │
   │──.editorconfig              * 编码风格配置
   │
   └──.bootstraprc               * bootstrap-loader文件配置

```