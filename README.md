<p align="center">
  <a href="https://github.com/angular/angular" target="blank">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" height="100" alt="Angular logo" />
  </a>
</p>

# DEPRECATED‼️

👉 **The new admin project [surmon.me.admin](https://github.com/surmon-china/surmon.me.admin)**

**此项目已废弃，请关注 [surmon.me.admin](https://github.com/surmon-china/surmon.me.admin)**

---

# Angular Admin

[![nodepress](https://raw.githubusercontent.com/surmon-china/nodepress/main/branding/badge.svg)](https://github.com/surmon-china/nodepress)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/angular-admin.svg?style=for-the-badge)](https://github.com/surmon-china/angular-admin/stargazers)
&nbsp;
[![GitHub issues](https://img.shields.io/github/issues-raw/surmon-china/angular-admin.svg?style=for-the-badge)](https://github.com/surmon-china/angular-admin/issues)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/surmon-china/angular-admin.svg?style=for-the-badge)](/LICENSE)

**Admin client for [surmon.me](https://github.com/surmon-china/surmon.me) blog, powered by [Angular](https://github.com/angular/angular) and [Bootstrap4](https://github.com/twbs/bootstrap).** 

**适用于 [surmon.me](https://github.com/surmon-china/surmon.me) 管理员后台的前端应用，使用 [Angular](https://github.com/angular/angular) 和 [Bootstrap4](https://github.com/twbs/bootstrap) 进行开发。** 

The project forked from [ng2-admin](https://akveo.github.io/ng2-admin/). 项目原始来自 [ng2-admin](https://akveo.github.io/ng2-admin/)。


**其他相关项目：**
- **RESTful API service:** [nodepress](https://github.com/surmon-china/nodepress) powered by [nestjs](https://github.com/nestjs/nest)
- **web client for user:** [surmon.me](https://github.com/surmon-china/surmon.me) powered by [Vue (3)](https://vuejs.org/)
- **native app client:** [surmon.me.native](https://github.com/surmon-china/surmon.me.native) powered by [react-native](https://github.com/facebook/react-native)

**更新记录：[CHANGELOG.md](https://github.com/surmon-china/angular-admin/blob/master/CHANGELOG.md#changelog)**

## Screenshot

![](https://raw.githubusercontent.com/surmon-china/angular-admin/master/presses/dashboard-dark.png)


## Development setup

```bash
# install dependencies
yarn

# serve with hot reload at localhost:4200 
yarn dev

# lint
yarn lint

# test
yarn test
yarn e2e

# build
yarn build

# CD (local build)
yarn local:build:tar
# CD (remote deploy)
yarn local:deploy
```

## Actions setup

**Rule:**
- `any PR open` → `CI:Build test`
- `master PR close & merged` → `CI:Deploy to server`

**Example:**
- `local:develop(local:build:tar)` → `remote:develop` → `CI:Build test`
- `remote:develop/master` → `remote:master` → `merged` → `CI:Deploy to server`
