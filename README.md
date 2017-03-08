
# angular-admin
Admin panel framework based on Angular 2, Bootstrap 4 and Webpack.

If you want to run the applaction, you need install the [nodepress](https://github.com/surmon-china/nodepress) service.

# 上几张图

标签管理

![](https://raw.githubusercontent.com/surmon-china/angular-admin/master/screenshot/tag-list.png)

发布文章

![发布文章](https://raw.githubusercontent.com/surmon-china/angular-admin/master/screenshot/submit-article.png)

全局设置

![](https://raw.githubusercontent.com/surmon-china/angular-admin/master/screenshot/setting.png)

文章列表

![](https://raw.githubusercontent.com/surmon-china/angular-admin/master/screenshot/article-list.png)

评论管理

![](https://raw.githubusercontent.com/surmon-china/angular-admin/master/screenshot/comment.png)

markdown编辑器

![](https://raw.githubusercontent.com/surmon-china/angular-admin/master/screenshot/markdown.png)

# Todos && Issues 更新维护记录

- 仪表盘信息聚合（系统/文章信息聚合，echarts）？
- 需要增加一个数据库导出功能

- ~~评论管理，增删改查功能~~
- ~~增加黑名单功能，优化设置部分表单体验~~
- ~~增加Markdown编辑器实时本地备份功能~~
- ~~弹窗的遮罩层把行为层挡住了~~
- ~~标签列表页，描述限制为一行超出隐藏~~
- ~~使用codemirror创建一个markdown编辑器 https://github.com/jbt/markdown-editor/blob/master/index.html~~
- ~~可以适当性创建一些按钮，如图片、连接、标题、全屏、预览切换，highlight.js + marked用于预览时的解析，~~
- ~~codemirror用于编辑模式下的编辑器，引入所有语言的语言包，~~
- ~~首次登陆，数据库无数据时，个人头像，名字等均为展示默认值~~
- ~~分类列表页的分类描述，超出一行之后，P标签的行间距过大~~
- ~~发布文章页的分类目录选中图标，应该替换为ionic里的图标~~
- ~~标签项，需要增加icon自定义字段~~
- ~~取消文章在列表页的密码和缩略内容/内容字段~~
- ~~仪表盘图表组件和echarts整合~~
- ~~所有无用组件/代码的清理~~
- ~~数据结构变动如article的count，data字段~~
- ~~首页无用的都删掉~~
- ~~发布文章页，在标签和分类为空时缺少提示信息，文章的默认缩略图需调整~~
- ~~所有涉及发布的内容项，都需要增加自定义字段~~
- ~~程序截图 + 文档撰写 readme~~
- ~~由于数据的准确性没有测试，分类和标签列表的与文章内容的先后顺序不同会导致标签和分类不会被勾选~~

# 程序结构（踩坑记录）

## 资源服务
   - 一个类
   - 一堆方法
   - 返回promise
   - 用第三方组件配合来实现res/err的处理
   - 定制化的http服务是需要自己封装的，如果你想实现拦截器，auth控制的话，必须封装，项目中用了三方的[angular2-jwt][2]

## 自定义组件的双向绑定如何实现
   - 框架基本都同质化了，和vue实现原理相差无几
   - "盒子里的香蕉" [(ngModel)] = [ngModelChange] + (model)
   - 一句话：用既定内置的api做预期的事
   - [看这里有实现文件][3]

## 路由管理和拦截
   - 路由管理可以集中内聚管理，也可以模块化碎片化，项目中两者都有
   - 在app根组件中，注入router对象订阅event的事件流，从而实现"拦截"，此方法无法中断
   - 因为我暂时没找到管方提供的类似拦截的api，欢迎pr

## auth验证
   - 本地token库[angular2-jwt][4]会验证两点，1：是否存在 2：是否有效 3：是否过期
   - 可选一些配置，见作者[github][5]
   - 在登录页，需要使用ng2的http服务，否则无法发起请求，原因：
        1：token不存在，存在也被验证为失效，不然怎么来登录页的，怎么初始化的
        2：angular2-jwt只要验证不通过就return false了，当然你可以配置
   - 这也就是前面所说的http服务可以有多个，什么地方用哪一个，取决于你自己

## 组件/模块与页面构成
   - 组件和vue一样，以文件夹为内聚单位，而不是单文件
   - 比组件高一个维度但又不是一个维度的元素：模块，模块可以理解为一个完整功能的内聚单位
   - 组件、过滤器、指令、公共服务、验证...

## 数据流
   - 略复杂...我也没搞很明白
   - 简单的话，就to promise，项目中是这么做的

## 管道过滤器
   - 简单，都一样

## 自定义指令
   - 简单

## 七牛上传组件的封装
   - 无奈还是使用了官方提供的js插件，具体看官方
   - token从服务端sdk生成获取
   - 拿token上传文件
   - 上传后的后续处理：用image对象获取图片，成功后再emit事件和更新数据，可以保证，我们看到成功提示那一刻，图片已经成功加载到本地了
   - 由于设置了防盗链导致本地调试403错误

## 表单验证构造和使用
   - 依赖form里面的类、基本类、验证类、...
   - 基本的构造方法是怎样的，看官方文档
   - 自定义正则验证规则，看官方文档

## 模块/组件/服务之间的关系
   - 模块为完整功能的内聚单位，可包含多种其他元素，如组件、路由、服务、指令...
   - 组件包含view，类似view + 控制器映射，负责view的直接逻辑
   - service属数据工具性质，本项目中用来获取/管理资源/状态，但没有使用service实现数据共享，仅仅是封装了resource部分
   - 原计划将部分service抽象为公共服务，但是多次注入会被多次实例化，导致无法订阅数据流，暂没找到更好方法

## 一些要注意的坑
   - 变量声明（声明前的判断，和调用时可能出现的错误）
   - ```(<any>window).aaa = {}```，这里不能用global判断，global在webpack中是可用的，本项目也依赖了虚拟的dom对象，编译后global关键字被自动替换为window引入，所以只能如上写法，当然还有一种try catch的方法也能做到
   - 在项目中使用jquery，或其他js库，记得声明变量，`declare var jQuery:any;`
   - 内置了一些如ngOnInit这样的周期性钩子函数，不要冲突
   - cnpm和npm安装文件结构不一样，会导致重复引用无法编译的问题，主要是由于cnpm的版本管理机制不一样导致的，cnpm是空文件夹+快捷方式的方法乱搞，所以遇到模块引用的错误，一般删掉对应文件夹，用npm重装就可以了


# 执行命令
```bash
# 能用npm还是不要用cnpm的好
cnpm install

# 开发
npm start

# 构建
npm run build:prod

# 生产，可以用nginx映射dist，不必要开node进程
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
   │   └──html-elements-plugin/  * html elements plugin
   │
   ├──src/                       * 源文件最终编译为javascript
   │   |
   │   ├──custom-typings.d.ts    * 第三方模块的自定义类型
   │   │
   │   ├──index.html             * 入口文件
   │   │
   │   ├──main.browser.ts        * 浏览器环境入口文件
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


  [2]: https://github.com/auth0/angular2-jwt
  [3]: https://github.com/surmon-china/angular-admin/blob/master/src/app/theme/components/baMarkdownEditor/markdownEditor.component.ts
  [4]: https://github.com/auth0/angular2-jwt
  [5]: https://github.com/auth0/angular2-jwt