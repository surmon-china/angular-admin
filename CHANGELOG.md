
# Changelog
All notable changes to this project will be documented in this file.

### v3.4.2
- Upgrade deps
- Update CI
- TSLint to ESLint
- Remove GitHub/Music/Bilibili/Wallpaper action for option page

### v3.4.0
- Improve archive page toolbar
- Add AD Config in options page
- Update CI
- NPM to Yarn
- markdown support more config

### v3.3.0
- Support AOT [PR#39](https://github.com/surmon-china/angular-admin/pull/39) [issue#28](https://github.com/surmon-china/angular-admin/issues/28)
- Add token renewal service
- Add http loading service
- Upgrade sitemap API to syndication API
- Update to Angular9
- Update all dependencies
- Update checkbox component
- Update deploy scripts
- Upgrade Ionicons to v5
- Improve styles
- Remove HMR module

### v3.2.4
- Upgrade QINIU uploader to Aliyun OSS
- Upgrade UA transformer
- Add gravatar for comment page
- Add Google analytics

### v3.2.2
- Update menus
- Add database action button
- Fix qiniu upload token error

### v3.2.0
- 升级 Angular
- 升级 仪表盘，增加 GA 统计业务
- 修复 热替换 HMR
- 优化 GA 在生产环境不可用情况的可选逻辑
- 优化 侧边栏菜单激活逻辑
- 优化 Markdown 模块
- 移除 theme，替换为 style
- 移除 冗余资源、icon
- 新增 应用入口配置项

### v3.1.0
- 优化 API
- 规范代码格式

### v3.0.0
- update Angular to v7.x
- 重构 Typescript 部分
- 重构所有类型和接口
- 增加 `loading-bar` 组件
- 增加 `loading-spider` 组件
- 响应式适应移动端

### v2.0.0
- Angular 升级为 6.x 最新版本，并进行逻辑兼容
- 增加文章来源性质的选项的增加
- 剔除 JQuery 等不必要库的存在
- 移除 JWT 库，改为自兼容
- 重构网络服务机制，将请求拦截器升级为一体，将原本的业务内数据服务由统一的 ApiService 代替
- 更新密码加密机制
- 七牛重构为更简洁的 2.x
- 完善 Token 有效性检查机制

### v1.2.0
- 由于数据的准确性没有测试，分类和标签列表的与文章内容的先后顺序不同会导致标签和分类不会被勾选
- 升级至 Angular4 & Bootstrap4 最新测试版 
- 升级至 ngx-bootstrap，并优化 Markdown
- 全部升级为最新，一键安装构建

### v1.1.0
- 发布文章页，在标签和分类为空时缺少提示信息，文章的默认缩略图需调整
- 所有涉及发布的内容项，都需要增加自定义字段
- 程序截图 + 文档撰写 README.md

### v1.0.0
- 评论管理，增删改查功能
- 增加黑名单功能，优化设置部分表单体验
- 增加 Markdown 编辑器实时本地备份功能
- 弹窗的遮罩层把行为层挡住了
- 标签列表页，描述限制为一行超出隐藏
- 使用 codemirror 创建一个 Markdown 编辑器 https://github.com/jbt/markdown-editor/blob/master/index.html
- 可以适当性创建一些按钮，如图片、连接、标题、全屏、预览切换，highlight.js + marked 用于预览时的解析，
- codemirror 用于编辑模式下的编辑器，引入所有语言的语言包，
- 首次登陆，数据库无数据时，个人头像，名字等均为展示默认值
- 分类列表页的分类描述，超出一行之后，P 标签的行间距过大
- 发布文章页的分类目录选中图标，应该替换为 ionic 里的图标
- 标签项，需要增加 icon 自定义字段
- 取消文章在列表页的密码和缩略内容/内容字段
- 所有无用组件/代码的清理
- 数据结构变动如 article 的 count、data 字段
- 首页无用的都删掉
