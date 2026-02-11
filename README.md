<p align="center">
  <a href="https://github.com/angular/angular" target="blank">
    <img src="https://angular.io/assets/images/logos/angular/angular.svg" height="160" alt="Angular logo" />
  </a>
</p>

# ⚠️ DEPRECATED

**This project has been deprecated!**

Please use the new admin project instead: [**surmon.me.admin**](https://github.com/surmon-china/surmon.me.admin)

# Angular Admin

[![nodepress](https://raw.githubusercontent.com/surmon-china/nodepress/main/branding/badge.svg)](https://github.com/surmon-china/nodepress)
&nbsp;
[![GitHub stars](https://img.shields.io/github/stars/surmon-china/angular-admin.svg?style=for-the-badge)](https://github.com/surmon-china/angular-admin/stargazers)
&nbsp;
[![GitHub issues](https://img.shields.io/github/issues-raw/surmon-china/angular-admin.svg?style=for-the-badge)](https://github.com/surmon-china/angular-admin/issues)
&nbsp;
[![GitHub license](https://img.shields.io/github/license/surmon-china/angular-admin.svg?style=for-the-badge)](/LICENSE)

**An admin panel for [surmon.me](https://github.com/surmon-china/surmon.me), built with [Angular](https://github.com/angular/angular) and [Bootstrap 4](https://github.com/twbs/bootstrap).**

**适用于 [surmon.me](https://github.com/surmon-china/surmon.me) 的后台管理系统（旧版），使用 [Angular](https://github.com/angular/angular) 和 [Bootstrap 4](https://github.com/twbs/bootstrap) 进行开发。** 

[CHANGELOG.md](./CHANGELOG.md)

**Related projects**
- [NodePress](https://github.com/surmon-china/nodepress) — RESTful API service (CMS core)
- [surmon.me](https://github.com/surmon-china/surmon.me) — SSR blog website
- [surmon.me.native](https://github.com/surmon-china/surmon.me.native) — Blog native app

This project was originally forked from [ng2-admin](https://akveo.github.io/ng2-admin/). 项目最初基于 [ng2-admin](https://akveo.github.io/ng2-admin/)。

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
