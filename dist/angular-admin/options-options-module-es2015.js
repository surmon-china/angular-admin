(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["options-options-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/options/options.html":
/*!**********************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/options/options.html ***!
  \**********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-6 col-xs-12\">\n    <sa-card title=\"基本设置\" baCardClass=\"with-scroll\">\n      <div class=\"col-sm-12 col-xs-12\">\n        <form\n          class=\"form-horizontal option-form\"\n          [formGroup]=\"optionForm\" \n          (ngSubmit)=\"submitOptionForm(optionForm.value)\"\n        >\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(title)\">\n            <label for=\"blog-title\" class=\"col-sm-2 form-control-label\">站点标题</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"blog-title\" \n                placeholder=\"站点标题\"\n                [formControl]=\"title\"\n              />\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(sub_title)\">\n            <label for=\"blog-sub-title\" class=\"col-sm-2 form-control-label\">副标题</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"blog-sub-title\" \n                placeholder=\"副标题\"\n                [formControl]=\"sub_title\"\n              />\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(keywords)\">\n            <label for=\"blog-keywords\" class=\"col-sm-2 form-control-label\">关键词</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"blog-keywords\" \n                placeholder=\"关键词\"\n                [formControl]=\"keywords\"\n                (change)=\"handleKeywordsChange($event)\"\n              />\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(description)\">\n            <label for=\"blog-description\" class=\"col-sm-2 form-control-label\">描述</label>\n            <div class=\"col-sm-10\">\n              <textarea\n                type=\"text\" \n                class=\"form-control blog-description\" \n                id=\"blog-description\" \n                placeholder=\"描述\"\n                [formControl]=\"description\"\n              ></textarea>\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(site_url)\">\n            <label for=\"blog-site-url\" class=\"col-sm-2 form-control-label\">站点地址</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"blog-site-url\" \n                placeholder=\"站点地址（URL）\"\n                [formControl]=\"site_url\"\n              />\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(site_email)\">\n            <label for=\"blog-site-email\" class=\"col-sm-2 form-control-label\">电子邮件地址</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"blog-site-email\" \n                placeholder=\"博客邮件地址\"\n                [formControl]=\"site_email\"\n              />\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(site_icp)\">\n            <label for=\"blog-icp-id\" class=\"col-sm-2 form-control-label\">ICP备案号</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"blog-icp-id\" \n                placeholder=\"如：陕ICP备0000000号\"\n                [formControl]=\"site_icp\"\n              />\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(seo_ping_sites)\">\n            <label for=\"blog-ping-sites\" class=\"col-sm-2 form-control-label\">SEO更新服务</label>\n            <div class=\"col-sm-10\">\n              <textarea\n                id=\"blog-ping-sites\"\n                class=\"form-control blog-ping-sites\"\n                placeholder=\"在发表新文章时，NodePress会自动通知站点更新服务。用换行分隔多个服务URL。\"\n                [formControl]=\"seo_ping_sites\"\n                (change)=\"handlePingSitesChange($event)\"\n              ></textarea>\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(blacklist_ips)\">\n            <label for=\"blog-blacklist-ips\" class=\"col-sm-2 form-control-label\">黑名单 - IP</label>\n            <div class=\"col-sm-10\">\n              <textarea\n                id=\"blog-blacklist-ips\"\n                class=\"form-control blog-ping-sites\"\n                placeholder=\"这些IP来源的评论将被拒绝，用换行分隔多个IP地址。\"\n                [formControl]=\"blacklist_ips\"\n                (change)=\"handleCommentBlacklistIpsChange($event)\"\n              ></textarea>\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(blacklist_mails)\">\n            <label for=\"blog-blacklist-mails\" class=\"col-sm-2 form-control-label\">黑名单 - 邮箱</label>\n            <div class=\"col-sm-10\">\n              <textarea\n                id=\"blog-blacklist-mails\"\n                class=\"form-control blog-ping-sites\"\n                placeholder=\"这些邮箱来源的评论将被拒绝，用换行分隔多个邮箱地址。\"\n                [formControl]=\"blacklist_mails\"\n                (change)=\"handleCommentBlacklistMailsChange($event)\"\n              ></textarea>\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(blacklist_keywords)\">\n            <label for=\"blog-blacklist-keywords\" class=\"col-sm-2 form-control-label\">黑名单 - 关键字</label>\n            <div class=\"col-sm-10\">\n              <textarea\n                id=\"blog-blacklist-keywords\"\n                class=\"form-control blog-ping-sites\"\n                placeholder=\"包含这些关键字的的评论将被拒绝，用换行分隔多个关键词。\"\n                [formControl]=\"blacklist_keywords\"\n                (change)=\"handleCommentBlacklistKeywordsChange($event)\"\n              ></textarea>\n            </div>\n          </div>\n          <hr>\n          <div class=\"form-group row\">\n            <div class=\"offset-sm-2 col-sm-10\">\n              <button\n                type=\"submit\" \n                class=\"btn btn-default btn-with-icon\"\n                [disabled]=\"!optionForm.valid || fetching[Loading.Option]\"\n              >\n                <i class=\"ion-md-done-all\"></i>\n                <span>保存修改</span>\n              </button>\n            </div>\n          </div>\n        </form>\n      </div>\n    </sa-card>\n  </div>\n  <div class=\"col-md-6 col-xs-12\">\n    <sa-card title=\"个人设置\" baCardClass=\"with-scroll\">\n      <div class=\"col-sm-12 col-xs-12\">\n        <form\n          class=\"form-horizontal auth-form\"\n          [formGroup]=\"authForm\" \n          (ngSubmit)=\"submitAuthForm(authForm.value)\"\n        >\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(gravatar)\">\n            <label class=\"col-sm-2 form-control-label\">个人头像</label>\n            <div class=\"col-sm-10\">\n              <sa-picture-uploader\n                class=\"form-control auth-gravatar\"\n                [formControl]=\"gravatar\"\n              ></sa-picture-uploader>\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(name)\">\n            <label for=\"option-user-name\" class=\"col-sm-2 form-control-label\">姓名</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"option-user-name\"\n                placeholder=\"个人名字\"\n                [formControl]=\"name\"\n              >\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(slogan)\">\n            <label for=\"option-user-slogan\" class=\"col-sm-2 form-control-label\">个人签名</label>\n            <div class=\"col-sm-10\">\n              <input\n                type=\"text\" \n                class=\"form-control\" \n                id=\"option-user-slogan\" \n                placeholder=\"个人签名\"\n                [formControl]=\"slogan\"\n              >\n            </div>\n          </div>\n          <hr>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(password)\">\n            <label for=\"option-user-password\" class=\"col-sm-2 form-control-label\">旧密码</label>\n            <div class=\"col-sm-6\">\n              <input\n                type=\"password\" \n                class=\"form-control\" \n                id=\"option-user-password\" \n                placeholder=\"输入旧密码\"\n                autocomplete=\"password\"\n                [formControl]=\"password\"\n              >\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(new_password)\">\n            <label for=\"option-user-new-password\" class=\"col-sm-2 form-control-label\">新密码</label>\n            <div class=\"col-sm-6\">\n              <input\n                type=\"password\" \n                class=\"form-control\" \n                id=\"option-user-new-password\" \n                placeholder=\"输入新密码\"\n                autocomplete=\"new_password\"\n                [formControl]=\"new_password\"\n              >\n            </div>\n          </div>\n          <div class=\"form-group row\" [ngClass]=\"controlStateClass(rel_new_password)\">\n            <label for=\"option-user-rel-new-password\" class=\"col-sm-2 form-control-label\">确认新密码</label>\n            <div class=\"col-sm-6\">\n              <input\n                type=\"password\" \n                class=\"form-control\" \n                id=\"option-user-rel-new-password\" \n                placeholder=\"确认新密码\"\n                autocomplete=\"rel_new_password\"\n                [formControl]=\"rel_new_password\"\n              >\n            </div>\n          </div>\n          <hr>\n          <div class=\"form-group row\">\n            <div class=\"offset-sm-2 col-sm-10\">\n              <button\n                type=\"submit\" \n                class=\"btn btn-default  btn-with-icon\"\n                [disabled]=\"!authForm.valid || fetching[Loading.Auth]\"\n              >\n                <i class=\"ion-md-done-all\"></i>\n                <span>保存修改</span>\n              </button>\n            </div>\n          </div>\n        </form>\n      </div>\n    </sa-card>\n    <sa-card title=\"更新数据\" baCardClass=\"with-scroll\">\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <button\n            class=\"btn btn-default btn-with-icon\"\n            [disabled]=\"fetching[Loading.GithubCache]\"\n            (click)=\"updateGithubCache()\"\n          >\n            <i class=\"ion-md-refresh\"></i>\n            <span>更新 Github 缓存{{ fetching[Loading.GithubCache] ? '...' : '' }}</span>\n          </button>\n        </div>\n      </div>\n      <br>\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <button\n            class=\"btn btn-default btn-with-icon\"\n            [disabled]=\"fetching[Loading.MusicCache]\"\n            (click)=\"updateMusicCache()\"\n          >\n            <i class=\"ion-md-refresh\"></i>\n            <span>更新音乐缓存{{ fetching[Loading.MusicCache] ? '...' : '' }}</span>\n          </button>\n        </div>\n      </div>\n      <br>\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <button\n            class=\"btn btn-default btn-with-icon\"\n            [disabled]=\"fetching[Loading.BilibiliCache]\"\n            (click)=\"updateBilibiliCache()\"\n          >\n            <i class=\"ion-md-refresh\"></i>\n            <span>更新 Bilibili 缓存{{ fetching[Loading.BilibiliCache] ? '...' : '' }}</span>\n          </button>\n        </div>\n      </div>\n      <br>\n      <div class=\"row\">\n        <div class=\"col-sm-12\">\n          <button\n            class=\"btn btn-default btn-with-icon\"\n            [disabled]=\"fetching[Loading.SitemapCache]\"\n            (click)=\"updateSitemapCache()\"\n          >\n            <i class=\"ion-md-refresh\"></i>\n            <span>更新网站地图缓存{{ fetching[Loading.SitemapCache] ? '...' : '' }}</span>\n          </button>\n        </div>\n      </div>\n    </sa-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/options/options.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/options/options.component.ts ***!
  \****************************************************/
/*! exports provided: OptionsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OptionsComponent", function() { return OptionsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "./node_modules/lodash/lodash.js");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_constants_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @app/constants/api */ "./src/app/constants/api.ts");
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! js-base64 */ "./node_modules/js-base64/base64.js");
/* harmony import */ var js_base64__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(js_base64__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @/app/pages/pages.service */ "./src/app/pages/pages.service.ts");
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @app/services */ "./src/app/services/index.ts");
/**
 * @file 全局设置页面组件
 * @module app/page/options/component
 * @author Surmon <https://github.com/surmon-china>
 */









const DEFAULT_AUTH_FORM = {
    name: '',
    slogan: '',
    gravatar: '',
    password: '',
    new_password: '',
    rel_new_password: ''
};
const DEFAULT_OPTION_FORM = {
    title: '',
    sub_title: '',
    keywords: [],
    description: '',
    site_url: '',
    site_email: '',
    site_icp: '',
    seo_ping_sites: [],
    blacklist_ips: [],
    blacklist_mails: [],
    blacklist_keywords: []
};
var ELoading;
(function (ELoading) {
    ELoading[ELoading["Auth"] = 0] = "Auth";
    ELoading[ELoading["Option"] = 1] = "Option";
    ELoading[ELoading["MusicCache"] = 2] = "MusicCache";
    ELoading[ELoading["BilibiliCache"] = 3] = "BilibiliCache";
    ELoading[ELoading["GithubCache"] = 4] = "GithubCache";
    ELoading[ELoading["SitemapCache"] = 5] = "SitemapCache";
})(ELoading || (ELoading = {}));
let OptionsComponent = class OptionsComponent {
    constructor(router, fb, httpService) {
        this.router = router;
        this.fb = fb;
        this.httpService = httpService;
        this.Loading = ELoading;
        this.controlStateClass = _app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["formControlStateClass"];
        this.authApiPath = _app_constants_api__WEBPACK_IMPORTED_MODULE_2__["ADMIN_INFO"];
        this.optionApiPath = _app_constants_api__WEBPACK_IMPORTED_MODULE_2__["OPTION"];
        this.fetching = {
            [ELoading.Auth]: false,
            [ELoading.Option]: false,
            [ELoading.MusicCache]: false,
            [ELoading.BilibiliCache]: false,
            [ELoading.GithubCache]: false,
            [ELoading.SitemapCache]: false,
        };
        // authForm
        this.authForm = this.fb.group({
            name: [DEFAULT_AUTH_FORM.name, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required])],
            slogan: [DEFAULT_AUTH_FORM.slogan, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required])],
            gravatar: [DEFAULT_AUTH_FORM.gravatar],
            password: [DEFAULT_AUTH_FORM.password],
            new_password: [
                DEFAULT_AUTH_FORM.new_password,
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([this.vaildatePassword.bind(this)]),
            ],
            rel_new_password: [
                DEFAULT_AUTH_FORM.rel_new_password,
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([this.vaildatePassword.bind(this)])
            ],
        });
        Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["mergeFormControlsToInstance"])(this, this.authForm);
        // optionForm
        this.optionForm = this.fb.group({
            title: [DEFAULT_OPTION_FORM.title, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required])],
            sub_title: [DEFAULT_OPTION_FORM.sub_title, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required])],
            keywords: [DEFAULT_OPTION_FORM.keywords, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required])],
            description: [DEFAULT_OPTION_FORM.description, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required])],
            site_url: [DEFAULT_OPTION_FORM.site_url, _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].required])],
            site_email: [
                DEFAULT_OPTION_FORM.site_email,
                _angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_6__["Validators"].pattern('([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+')])
            ],
            site_icp: [DEFAULT_OPTION_FORM.site_icp],
            seo_ping_sites: [DEFAULT_OPTION_FORM.seo_ping_sites],
            blacklist_ips: [DEFAULT_OPTION_FORM.blacklist_ips],
            blacklist_mails: [DEFAULT_OPTION_FORM.blacklist_mails],
            blacklist_keywords: [DEFAULT_OPTION_FORM.blacklist_keywords]
        });
        Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["mergeFormControlsToInstance"])(this, this.optionForm);
    }
    // 验证重复输入密码
    vaildatePassword(control) {
        if ((this.new_password && this.new_password.value) !==
            (this.rel_new_password && this.rel_new_password.value)) {
            return { custom: '新密码不匹配' };
        }
        const target = control === this.new_password
            ? this.rel_new_password
            : this.new_password;
        // 当重复密码不匹配时，两者都异常，但对时，两个都要正常
        if (target && !control.invalid && target.invalid) {
            target.updateValueAndValidity();
        }
        return null;
    }
    // 长数据处理器
    formatLongString(value) {
        return value.replace(/\s+/g, ' ').replace(/\s/g, '\n');
    }
    // ping 地址解析处理
    handlePingSitesChange(event) {
        this.seo_ping_sites.setValue(this.formatLongString(event.target.value));
    }
    // 黑名单 ip 解析处理
    handleCommentBlacklistIpsChange(event) {
        this.blacklist_ips.setValue(this.formatLongString(event.target.value));
    }
    // 黑名单邮箱解析处理
    handleCommentBlacklistMailsChange(event) {
        this.blacklist_mails.setValue(this.formatLongString(event.target.value));
    }
    // 黑名单关键词解析处理
    handleCommentBlacklistKeywordsChange(event) {
        this.blacklist_keywords.setValue(this.formatLongString(event.target.value));
    }
    // 关键词计息处理
    handleKeywordsChange(event) {
        const newWords = event.target.value.replace(/\s/g, '').split(',');
        this.keywords.setValue(newWords);
    }
    // 提交权限表单
    submitAuthForm() {
        if (!this.authForm.valid) {
            return false;
        }
        const authFormData = lodash__WEBPACK_IMPORTED_MODULE_1__["cloneDeep"](this.authForm.value);
        Object.keys(authFormData).forEach(key => {
            const value = authFormData[key];
            const isPassword = key.includes('password');
            authFormData[key] = isPassword ? js_base64__WEBPACK_IMPORTED_MODULE_3__["Base64"].encode(value) : value;
        });
        Reflect.deleteProperty(authFormData, 'rel_new_password');
        console.log('authFormData', authFormData);
        this.putAuth(authFormData);
    }
    // 提交设置表单
    submitOptionForm() {
        if (!this.optionForm.valid) {
            return false;
        }
        const format = value => String(value).split('\n').filter(t => !!t);
        const formValue = Object.assign({
            ping_sites: format(this.seo_ping_sites.value),
            blacklist: {
                ips: format(this.blacklist_ips.value),
                mails: format(this.blacklist_mails.value),
                keywords: format(this.blacklist_keywords.value)
            }
        }, this.optionForm.value);
        this.putOptions(formValue);
    }
    // 解析返回的权限表单数据
    handleAuthChange(userAuthPromise) {
        userAuthPromise.then(({ result: { name, slogan, gravatar } }) => {
            if (this.authForm.value.rel_new_password) {
                // tslint:disable-next-line:no-console
                console.info('密码更新成功，正跳转至登陆页');
                setTimeout(() => this.router.navigate(['/auth']), 960);
            }
            else {
                this.authForm.reset(Object.assign({}, DEFAULT_AUTH_FORM, { name, slogan, gravatar }));
            }
        }).catch(error => { });
    }
    // 解析返回的设置表单数据
    handleOptionChange(optionPromise) {
        return optionPromise.then(({ result: options }) => {
            const format = value => value.toString().replace(/,/g, '\n');
            options.seo_ping_sites = format(options.ping_sites);
            options.blacklist_ips = format(options.blacklist.ips);
            options.blacklist_mails = format(options.blacklist.mails);
            options.blacklist_keywords = format(options.blacklist.keywords);
            this.optionForm.reset(options);
        }).catch(error => { });
    }
    // 获取用户
    getUserAuth() {
        this.handleAuthChange(Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.Auth, this.httpService.get(this.authApiPath)));
    }
    // 更新用户
    putAuth(auth) {
        this.handleAuthChange(Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.Auth, this.httpService.put(this.authApiPath, auth)));
    }
    // 获取配置
    getOptions() {
        this.handleOptionChange(Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.Option, this.httpService.get(this.optionApiPath)));
    }
    // 更新配置
    putOptions(options) {
        this.handleOptionChange(Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.Option, this.httpService.put(this.optionApiPath, options)));
    }
    // 更新音乐缓存
    updateMusicCache() {
        return Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.MusicCache, this.httpService.patch(_app_constants_api__WEBPACK_IMPORTED_MODULE_2__["MUSIC_LIST_CACHE"]));
    }
    // 更新 Bilibili 缓存
    updateBilibiliCache() {
        return Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.BilibiliCache, this.httpService.patch(_app_constants_api__WEBPACK_IMPORTED_MODULE_2__["BILIBILI_LIST_CACHE"]));
    }
    // 更新 Github 缓存
    updateGithubCache() {
        return Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.GithubCache, this.httpService.patch(_app_constants_api__WEBPACK_IMPORTED_MODULE_2__["GITHUB"]));
    }
    // 更新网站地图缓存
    updateSitemapCache() {
        return Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_7__["humanizedLoading"])(this.fetching, ELoading.SitemapCache, this.httpService.patch(_app_constants_api__WEBPACK_IMPORTED_MODULE_2__["SITEMAP"]));
    }
    ngOnInit() {
        this.getOptions();
        this.getUserAuth();
    }
};
OptionsComponent.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"] },
    { type: _app_services__WEBPACK_IMPORTED_MODULE_8__["SaHttpRequesterService"] }
];
OptionsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_5__["Component"])({
        selector: 'page-options',
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_5__["ViewEncapsulation"].Emulated,
        template: __webpack_require__(/*! raw-loader!./options.html */ "./node_modules/raw-loader/index.js!./src/app/pages/options/options.html"),
        styles: [__webpack_require__(/*! ./options.scss */ "./src/app/pages/options/options.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormBuilder"],
        _app_services__WEBPACK_IMPORTED_MODULE_8__["SaHttpRequesterService"]])
], OptionsComponent);



/***/ }),

/***/ "./src/app/pages/options/options.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/options/options.module.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _app_sa_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/sa.module */ "./src/app/sa.module.ts");
/* harmony import */ var _options_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./options.component */ "./src/app/pages/options/options.component.ts");
/* harmony import */ var _options_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./options.routing */ "./src/app/pages/options/options.routing.ts");
/**
 * @file 全局设置页面模块
 * @module app/page/options/module
 * @author Surmon <https://github.com/surmon-china>
 */







let OptionsModule = class OptionsModule {
};
OptionsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
            _app_sa_module__WEBPACK_IMPORTED_MODULE_4__["SaModule"],
            _options_routing__WEBPACK_IMPORTED_MODULE_6__["routing"]
        ],
        providers: [],
        declarations: [
            _options_component__WEBPACK_IMPORTED_MODULE_5__["OptionsComponent"]
        ]
    })
], OptionsModule);
/* harmony default export */ __webpack_exports__["default"] = (OptionsModule);


/***/ }),

/***/ "./src/app/pages/options/options.routing.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/options/options.routing.ts ***!
  \**************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _options_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./options.component */ "./src/app/pages/options/options.component.ts");
/**
 * @file 全局设置页面路由
 * @module app/page/options/routes
 * @author Surmon <https://github.com/surmon-china>
 */


const routes = [
    { path: '', component: _options_component__WEBPACK_IMPORTED_MODULE_1__["OptionsComponent"] }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/pages/options/options.scss":
/*!********************************************!*\
  !*** ./src/app/pages/options/options.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".option-form .blog-description,\n.option-form .blog-ping-sites {\n  height: 10em;\n  line-height: 1.8em;\n}\n\n.auth-form .auth-gravatar {\n  padding: 0;\n  display: inline-block;\n  width: 200px;\n  height: auto;\n  min-height: 40px;\n  background-color: transparent;\n  border: none;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdXJtb24vUHJvamVjdHMvQmxvZy9hbmd1bGFyLWFkbWluL3NyYy9hcHAvcGFnZXMvb3B0aW9ucy9vcHRpb25zLnNjc3MiLCJzcmMvYXBwL3BhZ2VzL29wdGlvbnMvb3B0aW9ucy5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVFOztFQUVFLFlBQUE7RUFDQSxrQkFBQTtBQ0RKOztBRE9FO0VBQ0UsVUFBQTtFQUNBLHFCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLDZCQUFBO0VBQ0EsWUFBQTtBQ0pKIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvb3B0aW9ucy9vcHRpb25zLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIub3B0aW9uLWZvcm0ge1xuXG4gIC5ibG9nLWRlc2NyaXB0aW9uLFxuICAuYmxvZy1waW5nLXNpdGVzIHtcbiAgICBoZWlnaHQ6IDEwZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuOGVtO1xuICB9XG59XG5cbi5hdXRoLWZvcm0ge1xuXG4gIC5hdXRoLWdyYXZhdGFyIHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMjAwcHg7XG4gICAgaGVpZ2h0OiBhdXRvO1xuICAgIG1pbi1oZWlnaHQ6IDQwcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyOiBub25lO1xuICB9XG59IiwiLm9wdGlvbi1mb3JtIC5ibG9nLWRlc2NyaXB0aW9uLFxuLm9wdGlvbi1mb3JtIC5ibG9nLXBpbmctc2l0ZXMge1xuICBoZWlnaHQ6IDEwZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjhlbTtcbn1cblxuLmF1dGgtZm9ybSAuYXV0aC1ncmF2YXRhciB7XG4gIHBhZGRpbmc6IDA7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDIwMHB4O1xuICBoZWlnaHQ6IGF1dG87XG4gIG1pbi1oZWlnaHQ6IDQwcHg7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IG5vbmU7XG59Il19 */"

/***/ })

}]);
//# sourceMappingURL=options-options-module-es2015.js.map