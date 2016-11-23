
# angular-admin
Admin panel framework based on Angular 2, Bootstrap 4 and Webpack


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
# 执行命令
```bash
cnpm install
npm start 
npm build
```