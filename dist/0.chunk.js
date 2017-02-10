webpackJsonpac__name_([0],{

/***/ "./src/app/pages/auth/auth.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var auth_service_1 = __webpack_require__("./src/app/pages/auth/auth.service.ts");
var Auth = (function () {
    function Auth(elem, _router, _authService) {
        this.elem = elem;
        this._router = _router;
        this._authService = _authService;
        this.editMode = false;
        this.slogans = ['Done is better than perfect.', 'Code wins arguments.', 'Move fast and break things.'];
        this.slogan = this.slogans[Math.floor(Math.random() * 3)];
    }
    Auth.prototype.toEditMode = function (event) {
        this.editMode = !this.editMode;
    };
    Auth.prototype.quitEdit = function (event) {
        this.editMode = false;
    };
    Auth.prototype.onEnter = function (event) {
        this.editMode = false;
        if (!!this.password) {
            this.onSubmit();
        }
    };
    Auth.prototype.onSubmit = function () {
        var _this = this;
        this._authService.getToken(this.password)
            .then(function (auth) {
            if (auth.result.token) {
                localStorage.setItem('id_token', auth.result.token);
                _this._router.navigate(['/dashboard']);
            }
        })
            .catch(function (error) { });
    };
    Auth.prototype.ngAfterViewChecked = function () {
        var input = this.elem.nativeElement.children[0].children[0].children[0].children[0];
        input.focus();
    };
    Auth = __decorate([
        core_1.Component({
            selector: 'auth',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/pages/auth/auth.scss")],
            template: __webpack_require__("./src/app/pages/auth/auth.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof auth_service_1.AuthService !== 'undefined' && auth_service_1.AuthService) === 'function' && _c) || Object])
    ], Auth);
    return Auth;
    var _a, _b, _c;
}());
exports.Auth = Auth;


/***/ },

/***/ "./src/app/pages/auth/auth.html":
/***/ function(module, exports) {

module.exports = "<div class=\"auth-main\">\n  <div class=\"auth-block\">\n    <div class=\"secret-titles\">\n      <div class=\"title\" *ngIf=\"!editMode\" (dblclick)=\"toEditMode($event)\">\n        <span>{{ slogan || '-----------' }}</span>\n      </div>\n      <input type=\"password\"\n             class=\"input\"\n             id=\"password\"\n             autocomplete\n             *ngIf=\"editMode\"\n             [(ngModel)]=\"password\"\n             (keyup.esc)=\"quitEdit($event)\"\n             (keyup.enter)=\"onEnter($event)\"\n             (dblclick)=\"toEditMode($event)\">\n    </div>\n  </div>\n</div>\n"

/***/ },

/***/ "./src/app/pages/auth/auth.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/.2.1.1@@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/.2.1.1@@angular/forms/index.js");
var nga_module_1 = __webpack_require__("./src/app/theme/nga.module.ts");
var auth_routing_1 = __webpack_require__("./src/app/pages/auth/auth.routing.ts");
var auth_service_1 = __webpack_require__("./src/app/pages/auth/auth.service.ts");
var auth_component_1 = __webpack_require__("./src/app/pages/auth/auth.component.ts");
var AuthModule = (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                nga_module_1.NgaModule,
                auth_routing_1.routing
            ],
            providers: [
                auth_service_1.AuthService
            ],
            declarations: [
                auth_component_1.Auth
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AuthModule);
    return AuthModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuthModule;


/***/ },

/***/ "./src/app/pages/auth/auth.routing.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var auth_component_1 = __webpack_require__("./src/app/pages/auth/auth.component.ts");
var routes = [
    { path: '', data: { name: 'auth' }, component: auth_component_1.Auth }
];
exports.routing = router_1.RouterModule.forChild(routes);


/***/ },

/***/ "./src/app/pages/auth/auth.scss":
/***/ function(module, exports) {

module.exports = ".auth-main {\n  display: flex;\n  align-items: center;\n  height: 100%;\n  width: 100%;\n  position: absolute; }\n\n.auth-block {\n  width: 540px;\n  margin: 0 auto;\n  border-radius: 5px;\n  background: rgba(0, 0, 0, 0.55);\n  color: #fff;\n  padding: 32px; }\n  .auth-block h1 {\n    font-weight: 300;\n    margin-bottom: 28px;\n    text-align: center; }\n  .auth-block p {\n    font-size: 16px; }\n  .auth-block a {\n    text-decoration: none;\n    outline: none;\n    transition: all 0.2s ease;\n    color: #017170; }\n    .auth-block a:hover {\n      color: #01605f; }\n  .auth-block .control-label {\n    padding-top: 11px;\n    color: #ffffff; }\n  .auth-block .form-group {\n    margin-bottom: 12px; }\n  .auth-block > .secret-titles > .title,\n  .auth-block > .secret-titles > .input {\n    text-align: center;\n    display: block;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    border: none;\n    background: none;\n    font-size: 32px;\n    height: 35px;\n    line-height: 35px;\n    color: #fff; }\n\n.auth-input {\n  width: 300px;\n  margin-bottom: 24px; }\n  .auth-input input {\n    display: block;\n    width: 100%;\n    border: none;\n    font-size: 16px;\n    padding: 4px 10px;\n    outline: none; }\n\na.forgot-pass {\n  display: block;\n  text-align: right;\n  margin-bottom: -20px;\n  float: right;\n  z-index: 2;\n  position: relative; }\n\n.auth-link {\n  display: block;\n  font-size: 16px;\n  text-align: center;\n  margin-bottom: 33px; }\n\n.auth-sep {\n  margin-top: 36px;\n  margin-bottom: 24px;\n  line-height: 20px;\n  font-size: 16px;\n  text-align: center;\n  display: block;\n  position: relative; }\n  .auth-sep > span {\n    display: table-cell;\n    width: 30%;\n    white-space: nowrap;\n    padding: 0 24px;\n    color: #ffffff; }\n    .auth-sep > span > span {\n      margin-top: -12px;\n      display: block; }\n  .auth-sep:before, .auth-sep:after {\n    border-top: solid 1px #ffffff;\n    content: \"\";\n    height: 1px;\n    width: 35%;\n    display: table-cell; }\n\n.al-share-auth {\n  text-align: center; }\n  .al-share-auth .al-share {\n    float: none;\n    margin: 0;\n    padding: 0;\n    display: inline-block; }\n    .al-share-auth .al-share li {\n      margin-left: 24px; }\n      .al-share-auth .al-share li:first-child {\n        margin-left: 0; }\n      .al-share-auth .al-share li i {\n        font-size: 24px; }\n\n.btn-auth {\n  color: #ffffff !important; }\n"

/***/ },

/***/ "./src/app/pages/auth/auth.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var http_1 = __webpack_require__("./node_modules/.2.1.1@@angular/http/index.js");
var angular2_jwt_1 = __webpack_require__("./node_modules/.0.1.28@angular2-jwt/angular2-jwt.js");
var angular2_notifications_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/components.js");
__webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/add/operator/toPromise.js");
var config_1 = __webpack_require__("./src/config.ts");
var AuthService = (function () {
    function AuthService(http, _notificationsService) {
        var _this = this;
        this.http = http;
        this._notificationsService = _notificationsService;
        this._authUrl = config_1.API_ROOT + "/auth";
        // 成功处理
        this.handleResponse = function (response) {
            var data = response.json();
            if (data.code) {
                _this._notificationsService.success(data.message, '数据请求成功', { timeOut: 1000 });
                return Promise.resolve(data);
            }
            else {
                _this._notificationsService.error(data.message, data.debug ? data.debug.message : data.message, { timeOut: 1000 });
                return Promise.reject(data);
            }
        };
        // 失败处理
        this.handleError = function (error) {
            var errmsg = [500, 504].indexOf(error.status) > -1 ? error._body : JSON.parse(error._body).message;
            _this._notificationsService.error('请求失败', errmsg, { timeOut: 1000 });
            return Promise.reject(error);
        };
    }
    AuthService.prototype.getToken = function (password) {
        return this.http
            .post(this._authUrl, { password: password })
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    AuthService.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    AuthService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof angular2_notifications_1.NotificationsService !== 'undefined' && angular2_notifications_1.NotificationsService) === 'function' && _b) || Object])
    ], AuthService);
    return AuthService;
    var _a, _b;
}());
exports.AuthService = AuthService;


/***/ }

});
//# sourceMappingURL=0.map