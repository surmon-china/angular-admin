var ac_main =
webpackJsonpac__name_([11],{

/***/ "./node_modules/.0.1.28@angular2-jwt/angular2-jwt.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var http_1 = __webpack_require__("./node_modules/.2.1.1@@angular/http/index.js");
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Observable_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Observable.js");
__webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/add/observable/fromPromise.js");
__webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/add/operator/mergeMap.js");
var AuthConfigConsts = (function () {
    function AuthConfigConsts() {
    }
    AuthConfigConsts.DEFAULT_TOKEN_NAME = 'id_token';
    AuthConfigConsts.DEFAULT_HEADER_NAME = 'Authorization';
    AuthConfigConsts.HEADER_PREFIX_BEARER = 'Bearer ';
    return AuthConfigConsts;
}());
exports.AuthConfigConsts = AuthConfigConsts;
var AuthConfigDefaults = {
    headerName: AuthConfigConsts.DEFAULT_HEADER_NAME,
    headerPrefix: null,
    tokenName: AuthConfigConsts.DEFAULT_TOKEN_NAME,
    tokenGetter: function () { return localStorage.getItem(AuthConfigDefaults.tokenName); },
    noJwtError: false,
    noClientCheck: false,
    globalHeaders: [],
    noTokenScheme: false
};
/**
 * Sets up the authentication configuration.
 */
var AuthConfig = (function () {
    function AuthConfig(config) {
        config = config || {};
        this._config = objectAssign({}, AuthConfigDefaults, config);
        if (this._config.headerPrefix) {
            this._config.headerPrefix += ' ';
        }
        else if (this._config.noTokenScheme) {
            this._config.headerPrefix = '';
        }
        else {
            this._config.headerPrefix = AuthConfigConsts.HEADER_PREFIX_BEARER;
        }
        if (config.tokenName && !config.tokenGetter) {
            this._config.tokenGetter = function () { return localStorage.getItem(config.tokenName); };
        }
    }
    AuthConfig.prototype.getConfig = function () {
        return this._config;
    };
    return AuthConfig;
}());
exports.AuthConfig = AuthConfig;
var AuthHttpError = (function (_super) {
    __extends(AuthHttpError, _super);
    function AuthHttpError() {
        _super.apply(this, arguments);
    }
    return AuthHttpError;
}(Error));
exports.AuthHttpError = AuthHttpError;
/**
 * Allows for explicit authenticated HTTP requests.
 */
var AuthHttp = (function () {
    function AuthHttp(options, http, defOpts) {
        var _this = this;
        this.http = http;
        this.defOpts = defOpts;
        this.config = options.getConfig();
        this.tokenStream = new Observable_1.Observable(function (obs) {
            obs.next(_this.config.tokenGetter());
        });
    }
    AuthHttp.prototype.mergeOptions = function (providedOpts, defaultOpts) {
        var newOptions = defaultOpts || new http_1.RequestOptions();
        if (this.config.globalHeaders) {
            this.setGlobalHeaders(this.config.globalHeaders, providedOpts);
        }
        newOptions = newOptions.merge(new http_1.RequestOptions(providedOpts));
        return newOptions;
    };
    AuthHttp.prototype.requestHelper = function (requestArgs, additionalOptions) {
        var options = new http_1.RequestOptions(requestArgs);
        if (additionalOptions) {
            options = options.merge(additionalOptions);
        }
        return this.request(new http_1.Request(this.mergeOptions(options, this.defOpts)));
    };
    AuthHttp.prototype.requestWithToken = function (req, token) {
        if (!this.config.noClientCheck && !tokenNotExpired(undefined, token)) {
            if (!this.config.noJwtError) {
                return new Observable_1.Observable(function (obs) {
                    obs.error(new AuthHttpError('No JWT present or has expired'));
                });
            }
        }
        else {
            req.headers.set(this.config.headerName, this.config.headerPrefix + token);
        }
        return this.http.request(req);
    };
    AuthHttp.prototype.setGlobalHeaders = function (headers, request) {
        if (!request.headers) {
            request.headers = new http_1.Headers();
        }
        headers.forEach(function (header) {
            var key = Object.keys(header)[0];
            var headerValue = header[key];
            request.headers.set(key, headerValue);
        });
    };
    AuthHttp.prototype.request = function (url, options) {
        var _this = this;
        if (typeof url === 'string') {
            return this.get(url, options); // Recursion: transform url from String to Request
        }
        // else if ( ! url instanceof Request ) {
        //   throw new Error('First argument must be a url string or Request instance.');
        // }
        // from this point url is always an instance of Request;
        var req = url;
        var token = this.config.tokenGetter();
        if (token instanceof Promise) {
            return Observable_1.Observable.fromPromise(token).mergeMap(function (jwtToken) { return _this.requestWithToken(req, jwtToken); });
        }
        else {
            return this.requestWithToken(req, token);
        }
    };
    AuthHttp.prototype.get = function (url, options) {
        return this.requestHelper({ body: '', method: http_1.RequestMethod.Get, url: url }, options);
    };
    AuthHttp.prototype.post = function (url, body, options) {
        return this.requestHelper({ body: body, method: http_1.RequestMethod.Post, url: url }, options);
    };
    AuthHttp.prototype.put = function (url, body, options) {
        return this.requestHelper({ body: body, method: http_1.RequestMethod.Put, url: url }, options);
    };
    AuthHttp.prototype.delete = function (url, options) {
        return this.requestHelper({ body: '', method: http_1.RequestMethod.Delete, url: url }, options);
    };
    AuthHttp.prototype.patch = function (url, body, options) {
        return this.requestHelper({ body: body, method: http_1.RequestMethod.Patch, url: url }, options);
    };
    AuthHttp.prototype.head = function (url, options) {
        return this.requestHelper({ body: '', method: http_1.RequestMethod.Head, url: url }, options);
    };
    AuthHttp.prototype.options = function (url, options) {
        return this.requestHelper({ body: '', method: http_1.RequestMethod.Options, url: url }, options);
    };
    AuthHttp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [AuthConfig, http_1.Http, http_1.RequestOptions])
    ], AuthHttp);
    return AuthHttp;
}());
exports.AuthHttp = AuthHttp;
/**
 * Helper class to decode and find JWT expiration.
 */
var JwtHelper = (function () {
    function JwtHelper() {
    }
    JwtHelper.prototype.urlBase64Decode = function (str) {
        var output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0: {
                break;
            }
            case 2: {
                output += '==';
                break;
            }
            case 3: {
                output += '=';
                break;
            }
            default: {
                throw 'Illegal base64url string!';
            }
        }
        return this.b64DecodeUnicode(output);
    };
    // credits for decoder goes to https://github.com/atk
    JwtHelper.prototype.b64decode = function (str) {
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var output = '';
        str = String(str).replace(/=+$/, '');
        if (str.length % 4 == 1) {
            throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
        }
        for (var bc = 0, bs = void 0, buffer = void 0, idx = 0; 
        // get next character
        buffer = str.charAt(idx++); 
        // character found in table? initialize bit storage and add its ascii value;
        ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
            // and if not first of each 4 characters,
            // convert the first 8 bits to one ascii character
            bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0) {
            // try to find character in table (0-63, not found => -1)
            buffer = chars.indexOf(buffer);
        }
        return output;
    };
    // https://developer.mozilla.org/en/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
    JwtHelper.prototype.b64DecodeUnicode = function (str) {
        return decodeURIComponent(Array.prototype.map.call(this.b64decode(str), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    };
    JwtHelper.prototype.decodeToken = function (token) {
        var parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('JWT must have 3 parts');
        }
        var decoded = this.urlBase64Decode(parts[1]);
        if (!decoded) {
            throw new Error('Cannot decode the token');
        }
        return JSON.parse(decoded);
    };
    JwtHelper.prototype.getTokenExpirationDate = function (token) {
        var decoded;
        decoded = this.decodeToken(token);
        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }
        var date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);
        return date;
    };
    JwtHelper.prototype.isTokenExpired = function (token, offsetSeconds) {
        var date = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;
        if (date == null) {
            return false;
        }
        // Token expired?
        return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    };
    return JwtHelper;
}());
exports.JwtHelper = JwtHelper;
/**
 * Checks for presence of token and that token hasn't expired.
 * For use with the @CanActivate router decorator and NgIf
 */
function tokenNotExpired(tokenName, jwt) {
    if (tokenName === void 0) { tokenName = AuthConfigConsts.DEFAULT_TOKEN_NAME; }
    var token = jwt || localStorage.getItem(tokenName);
    var jwtHelper = new JwtHelper();
    return token != null && !jwtHelper.isTokenExpired(token);
}
exports.tokenNotExpired = tokenNotExpired;
exports.AUTH_PROVIDERS = [
    {
        provide: AuthHttp,
        deps: [http_1.Http, http_1.RequestOptions],
        useFactory: function (http, options) {
            return new AuthHttp(new AuthConfig(), http, options);
        }
    }
];
function provideAuth(config) {
    return [
        {
            provide: AuthHttp,
            deps: [http_1.Http, http_1.RequestOptions],
            useFactory: function (http, options) {
                return new AuthHttp(new AuthConfig(config), http, options);
            }
        }
    ];
}
exports.provideAuth = provideAuth;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;
function toObject(val) {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}
function objectAssign(target) {
    var source = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        source[_i - 1] = arguments[_i];
    }
    var from;
    var to = toObject(target);
    var symbols;
    for (var s = 1; s < arguments.length; s++) {
        from = Object(arguments[s]);
        for (var key in from) {
            if (hasOwnProperty.call(from, key)) {
                to[key] = from[key];
            }
        }
        if (Object.getOwnPropertySymbols) {
            symbols = Object.getOwnPropertySymbols(from);
            for (var i = 0; i < symbols.length; i++) {
                if (propIsEnumerable.call(from, symbols[i])) {
                    to[symbols[i]] = from[symbols[i]];
                }
            }
        }
    }
    return to;
}
/**
 * Module for angular2-jwt
 * @experimental
 */
var AuthModule = (function () {
    function AuthModule(parentModule) {
        if (parentModule) {
            throw new Error('AuthModule is already loaded. Import it in the AppModule only');
        }
    }
    AuthModule.forRoot = function (config) {
        return {
            ngModule: AuthModule,
            providers: [
                { provide: AuthConfig, useValue: config }
            ]
        };
    };
    AuthModule = __decorate([
        core_1.NgModule({
            imports: [http_1.HttpModule],
            providers: [AuthHttp, JwtHelper]
        }),
        __param(0, core_1.Optional()),
        __param(0, core_1.SkipSelf()), 
        __metadata('design:paramtypes', [AuthModule])
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
//# sourceMappingURL=angular2-jwt.js.map

/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/components.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var simple_notifications_module_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/simple-notifications.module.ts");
exports.SimpleNotificationsModule = simple_notifications_module_1.SimpleNotificationsModule;
var simple_notifications_component_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/simple-notifications.component.ts");
exports.SimpleNotificationsComponent = simple_notifications_component_1.SimpleNotificationsComponent;
var notification_component_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/notification.component.ts");
exports.NotificationComponent = notification_component_1.NotificationComponent;
var notifications_service_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/notifications.service.ts");
exports.NotificationsService = notifications_service_1.NotificationsService;
var max_pipe_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/max.pipe.ts");
exports.MaxPipe = max_pipe_1.MaxPipe;
var push_notifications_module_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/push-notifications.module.ts");
exports.PushNotificationsModule = push_notifications_module_1.PushNotificationsModule;
var push_notifications_service_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/push-notifications.service.ts");
exports.PushNotificationsService = push_notifications_service_1.PushNotificationsService;
//# sourceMappingURL=components.js.map

/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/icons.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
exports.defaultIcons = {
    alert: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M22 5.72l-4.6-3.86-1.29 1.53 4.6 3.86L22 5.72zM7.88 3.39L6.6 1.86 2 5.71l1.29 1.53 4.59-3.85zM12.5 8H11v6l4.75 2.85.75-1.23-4-2.37V8zM12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9c4.97 0 9-4.03 9-9s-4.03-9-9-9zm0 16c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z\"/>\n        </svg>",
    error: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0V0z\" fill=\"none\"/>\n            <path d=\"M11 15h2v2h-2zm0-8h2v6h-2zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z\"/>\n        </svg>\n    ",
    info: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M11 17h2v-6h-2v6zm1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 9h2V7h-2v2z\"/>\n        </svg>\n    ",
    success: "\n        <svg class=\"simple-notification-svg\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\">\n            <path d=\"M0 0h24v24H0z\" fill=\"none\"/>\n            <path d=\"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z\"/>\n        </svg>\n    "
};


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/max.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var MaxPipe = (function () {
    function MaxPipe() {
    }
    MaxPipe.prototype.transform = function (value) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!value)
            return value;
        var allowed = args[0];
        var received = value.length;
        if (received > allowed && allowed !== 0) {
            var toCut = allowed - received;
            return value.slice(0, toCut);
        }
        return value;
    };
    MaxPipe = __decorate([
        core_1.Pipe({ name: 'max' }), 
        __metadata('design:paramtypes', [])
    ], MaxPipe);
    return MaxPipe;
}());
exports.MaxPipe = MaxPipe;


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/notification.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var platform_browser_1 = __webpack_require__("./node_modules/.2.1.1@@angular/platform-browser/index.js");
var notification_type_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/notification.type.ts");
var notifications_service_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/notifications.service.ts");
var NotificationComponent = (function () {
    function NotificationComponent(notificationService, domSanitizer, zone) {
        var _this = this;
        this.notificationService = notificationService;
        this.domSanitizer = domSanitizer;
        this.zone = zone;
        // Progress bar variables
        this.progressWidth = 0;
        this.stopTime = false;
        this.count = 0;
        this.instance = function () {
            _this.zone.runOutsideAngular(function () {
                _this.zone.run(function () { return _this.diff = (new Date().getTime() - _this.start) - (_this.count * _this.speed); });
                if (_this.count++ === _this.steps)
                    _this.zone.run(function () { return _this.remove(); });
                else if (!_this.stopTime) {
                    if (_this.showProgressBar)
                        _this.zone.run(function () { return _this.progressWidth += 100 / _this.steps; });
                    _this.timer = setTimeout(_this.instance, (_this.speed - _this.diff));
                }
            });
        };
    }
    NotificationComponent.prototype.ngOnInit = function () {
        if (this.animate) {
            this.item.state = this.animate;
        }
        if (this.item.override) {
            this.attachOverrides();
        }
        if (this.timeOut !== 0) {
            this.startTimeOut();
        }
        this.safeSvg = this.domSanitizer.bypassSecurityTrustHtml(this.item.icon);
    };
    NotificationComponent.prototype.startTimeOut = function () {
        var _this = this;
        this.steps = this.timeOut / 10;
        this.speed = this.timeOut / this.steps;
        this.start = new Date().getTime();
        this.zone.runOutsideAngular(function () { return _this.timer = setTimeout(_this.instance, _this.speed); });
    };
    NotificationComponent.prototype.onEnter = function () {
        if (this.pauseOnHover) {
            this.stopTime = true;
        }
    };
    NotificationComponent.prototype.onLeave = function () {
        if (this.pauseOnHover) {
            this.stopTime = false;
            setTimeout(this.instance, (this.speed - this.diff));
        }
    };
    NotificationComponent.prototype.setPosition = function () {
        return this.position !== 0 ? this.position * 90 : 0;
    };
    NotificationComponent.prototype.onClick = function ($e) {
        this.item.click.emit($e);
        if (this.clickToClose) {
            this.remove();
        }
    };
    // Attach all the overrides
    NotificationComponent.prototype.attachOverrides = function () {
        var _this = this;
        Object.keys(this.item.override).forEach(function (a) {
            if (_this.hasOwnProperty(a)) {
                _this[a] = _this.item.override[a];
            }
        });
    };
    NotificationComponent.prototype.ngOnDestroy = function () {
        clearTimeout(this.timer);
    };
    NotificationComponent.prototype.remove = function () {
        var _this = this;
        if (this.animate) {
            this.item.state = this.animate + 'Out';
            this.zone.runOutsideAngular(function () {
                setTimeout(function () {
                    _this.zone.run(function () { return _this.notificationService.set(_this.item, false); });
                }, 310);
            });
        }
        else {
            this.notificationService.set(this.item, false);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NotificationComponent.prototype, "timeOut", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NotificationComponent.prototype, "showProgressBar", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NotificationComponent.prototype, "pauseOnHover", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NotificationComponent.prototype, "clickToClose", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NotificationComponent.prototype, "maxLength", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NotificationComponent.prototype, "theClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], NotificationComponent.prototype, "rtl", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], NotificationComponent.prototype, "animate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], NotificationComponent.prototype, "position", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof notification_type_1.Notification !== 'undefined' && notification_type_1.Notification) === 'function' && _a) || Object)
    ], NotificationComponent.prototype, "item", void 0);
    NotificationComponent = __decorate([
        core_1.Component({
            selector: 'simple-notification',
            encapsulation: core_1.ViewEncapsulation.None,
            animations: [
                core_1.trigger('enterLeave', [
                    // Enter from right
                    core_1.state('fromRight', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('* => fromRight', [
                        core_1.style({ opacity: 0, transform: 'translateX(5%)' }),
                        core_1.animate('400ms ease-in-out')
                    ]),
                    core_1.state('fromRightOut', core_1.style({ opacity: 0, transform: 'translateX(-5%)' })),
                    core_1.transition('fromRight => fromRightOut', [
                        core_1.style({ opacity: 1, transform: 'translateX(0)' }),
                        core_1.animate('300ms ease-in-out')
                    ]),
                    // Enter from left
                    core_1.state('fromLeft', core_1.style({ opacity: 1, transform: 'translateX(0)' })),
                    core_1.transition('* => fromLeft', [
                        core_1.style({ opacity: 0, transform: 'translateX(-5%)' }),
                        core_1.animate('400ms ease-in-out')
                    ]),
                    core_1.state('fromLeftOut', core_1.style({ opacity: 0, transform: 'translateX(5%)' })),
                    core_1.transition('fromLeft => fromLeftOut', [
                        core_1.style({ opacity: 1, transform: 'translateX(0)' }),
                        core_1.animate('300ms ease-in-out')
                    ]),
                    // Rotate
                    core_1.state('scale', core_1.style({ opacity: 1, transform: 'scale(1)' })),
                    core_1.transition('* => scale', [
                        core_1.style({ opacity: 0, transform: 'scale(0)' }),
                        core_1.animate('400ms ease-in-out')
                    ]),
                    core_1.state('scaleOut', core_1.style({ opacity: 0, transform: 'scale(0)' })),
                    core_1.transition('scale => scaleOut', [
                        core_1.style({ opacity: 1, transform: 'scale(1)' }),
                        core_1.animate('400ms ease-in-out')
                    ]),
                    // Scale
                    core_1.state('rotate', core_1.style({ opacity: 1, transform: 'rotate(0deg)' })),
                    core_1.transition('* => rotate', [
                        core_1.style({ opacity: 0, transform: 'rotate(5deg)' }),
                        core_1.animate('400ms ease-in-out')
                    ]),
                    core_1.state('rotateOut', core_1.style({ opacity: 0, transform: 'rotate(-5deg)' })),
                    core_1.transition('rotate => rotateOut', [
                        core_1.style({ opacity: 1, transform: 'rotate(0deg)' }),
                        core_1.animate('400ms ease-in-out')
                    ])
                ])
            ],
            template: "\n        <div class=\"simple-notification\"\n            [@enterLeave]=\"item.state\"\n            (click)=\"onClick($event)\"\n            [class]=\"theClass\"\n\n            [ngClass]=\"{\n                'alert': item.type === 'alert',\n                'error': item.type === 'error',\n                'success': item.type === 'success',\n                'info': item.type === 'info',\n                'bare': item.type === 'bare',\n                'rtl-mode': rtl\n            }\"\n\n            (mouseenter)=\"onEnter()\"\n            (mouseleave)=\"onLeave()\">\n\n            <div *ngIf=\"!item.html\">\n                <div class=\"sn-title\">{{item.title}}</div>\n                <div class=\"sn-content\">{{item.content | max:maxLength}}</div>\n\n                <div *ngIf=\"item.type !== 'bare'\" [innerHTML]=\"safeSvg\"></div>\n            </div>\n            <div *ngIf=\"item.html\" [innerHTML]=\"item.html\"></div>\n\n            <div class=\"sn-progress-loader\" *ngIf=\"showProgressBar\">\n                <span [ngStyle]=\"{'width': progressWidth + '%'}\"></span>\n            </div>\n\n        </div>\n    ",
            styles: ["\n        .simple-notification {\n            width: 100%;\n            padding: 10px 20px;\n            box-sizing: border-box;\n            position: relative;\n            float: left;\n            margin-bottom: 10px;\n            color: #fff;\n            cursor: pointer;\n            transition: all 0.5s;\n        }\n\n        .simple-notification .sn-title {\n            margin: 0;\n            padding: 0 50px 0 0;\n            line-height: 30px;\n            font-size: 20px;\n        }\n\n        .simple-notification .sn-content {\n            margin: 0;\n            font-size: 16px;\n            padding: 0 50px 0 0;\n            line-height: 20px;\n        }\n\n        .simple-notification svg {\n            position: absolute;\n            box-sizing: border-box;\n            top: 0;\n            right: 0;\n            width: 70px;\n            height: 70px;\n            padding: 10px;\n            fill: #fff;\n        }\n\n        .simple-notification.rtl-mode {\n            direction: rtl;\n        }\n\n        .simple-notification.rtl-mode .sn-content {\n            padding: 0 0 0 50px;\n        }\n\n        .simple-notification.rtl-mode svg {\n            left: 0;\n            right: auto;\n        }\n\n        .simple-notification.error { background: #F44336; }\n        .simple-notification.success { background: #8BC34A; }\n        .simple-notification.alert { background: #ffdb5b; }\n        .simple-notification.info { background: #03A9F4; }\n\n        .simple-notification .sn-progress-loader {\n            position: absolute;\n            top: 0;\n            left: 0;\n            width: 100%;\n            height: 5px;\n        }\n\n        .simple-notification .sn-progress-loader span {\n            float: left;\n            height: 100%;\n        }\n\n        .simple-notification.success .sn-progress-loader span { background: #689F38; }\n        .simple-notification.error .sn-progress-loader span { background: #D32F2F; }\n        .simple-notification.alert .sn-progress-loader span { background: #edc242; }\n        .simple-notification.info .sn-progress-loader span { background: #0288D1; }\n        .simple-notification.bare .sn-progress-loader span { background: #ccc; }\n    "]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof notifications_service_1.NotificationsService !== 'undefined' && notifications_service_1.NotificationsService) === 'function' && _b) || Object, (typeof (_c = typeof platform_browser_1.DomSanitizer !== 'undefined' && platform_browser_1.DomSanitizer) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
    ], NotificationComponent);
    return NotificationComponent;
    var _a, _b, _c, _d;
}());
exports.NotificationComponent = NotificationComponent;


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/notification.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/notifications.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Subject_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Subject.js");
var icons_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/icons.ts");
var NotificationsService = (function () {
    function NotificationsService() {
        this.emitter = new Subject_1.Subject();
        this.icons = icons_1.defaultIcons;
    }
    NotificationsService.prototype.set = function (notification, to) {
        notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
        notification.click = new core_1.EventEmitter();
        this.emitter.next({ command: 'set', notification: notification, add: to });
        return notification;
    };
    ;
    NotificationsService.prototype.getChangeEmitter = function () {
        return this.emitter;
    };
    //// Access methods
    NotificationsService.prototype.success = function (title, content, override) {
        return this.set({
            title: title,
            content: content,
            type: 'success',
            icon: this.icons.success,
            override: override
        }, true);
    };
    NotificationsService.prototype.error = function (title, content, override) {
        return this.set({ title: title, content: content, type: 'error', icon: this.icons.error, override: override }, true);
    };
    NotificationsService.prototype.alert = function (title, content, override) {
        return this.set({ title: title, content: content, type: 'alert', icon: this.icons.alert, override: override }, true);
    };
    NotificationsService.prototype.info = function (title, content, override) {
        return this.set({ title: title, content: content, type: 'info', icon: this.icons.info, override: override }, true);
    };
    NotificationsService.prototype.bare = function (title, content, override) {
        return this.set({ title: title, content: content, type: 'bare', icon: 'bare', override: override }, true);
    };
    // With type method
    NotificationsService.prototype.create = function (title, content, type, override) {
        return this.set({ title: title, content: content, type: type, icon: 'bare', override: override }, true);
    };
    // HTML Notification method
    NotificationsService.prototype.html = function (html, type, override) {
        return this.set({ html: html, type: type, icon: 'bare', override: override, title: null, content: null }, true);
    };
    // Remove all notifications method
    NotificationsService.prototype.remove = function (id) {
        if (id)
            this.emitter.next({ command: 'clean', id: id });
        else
            this.emitter.next({ command: 'cleanAll' });
    };
    NotificationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], NotificationsService);
    return NotificationsService;
}());
exports.NotificationsService = NotificationsService;


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/options.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/push-notifications.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var push_notifications_service_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/push-notifications.service.ts");
var PushNotificationsModule = (function () {
    function PushNotificationsModule() {
    }
    PushNotificationsModule = __decorate([
        core_1.NgModule({
            providers: [push_notifications_service_1.PushNotificationsService]
        }), 
        __metadata('design:paramtypes', [])
    ], PushNotificationsModule);
    return PushNotificationsModule;
}());
exports.PushNotificationsModule = PushNotificationsModule;


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/push-notifications.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Observable_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Observable.js");
var PushNotificationsService = (function () {
    function PushNotificationsService() {
        this.permission = this.isSupported() ? Notification.permission : 'denied';
    }
    PushNotificationsService.prototype.requestPermission = function () {
        var _this = this;
        if ('Notification' in window)
            Notification.requestPermission(function (status) { return _this.permission = status; });
    };
    PushNotificationsService.prototype.isSupported = function () {
        return 'Notification' in window;
    };
    PushNotificationsService.prototype.create = function (title, options) {
        var _this = this;
        return new Observable_1.Observable(function (obs) {
            if (!('Notification' in window)) {
                obs.error('Notifications are not available in this environment');
                obs.complete();
            }
            if (_this.permission !== 'granted') {
                obs.error("The user hasn't granted you permission to send push notifications");
                obs.complete();
            }
            var n = new Notification(title, options);
            n.onshow = function (e) { return obs.next({ notification: n, event: e }); };
            n.onclick = function (e) { return obs.next({ notification: n, event: e }); };
            n.onerror = function (e) { return obs.error({ notification: n, event: e }); };
            n.onclose = function () { return obs.complete(); };
        });
    };
    PushNotificationsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], PushNotificationsService);
    return PushNotificationsService;
}());
exports.PushNotificationsService = PushNotificationsService;


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/simple-notifications.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var notifications_service_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/notifications.service.ts");
var options_type_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/options.type.ts");
var SimpleNotificationsComponent = (function () {
    function SimpleNotificationsComponent(_service) {
        this._service = _service;
        this.onCreate = new core_1.EventEmitter();
        this.onDestroy = new core_1.EventEmitter();
        this.notifications = [];
        this.position = ['bottom', 'right'];
        // Received values
        this.lastOnBottom = true;
        this.maxStack = 8;
        this.preventLastDuplicates = false;
        this.preventDuplicates = false;
        // Sent values
        this.timeOut = 0;
        this.maxLength = 0;
        this.clickToClose = true;
        this.showProgressBar = true;
        this.pauseOnHover = true;
        this.theClass = '';
        this.rtl = false;
        this.animate = 'fromRight';
    }
    Object.defineProperty(SimpleNotificationsComponent.prototype, "options", {
        set: function (opt) {
            this.attachChanges(opt);
        },
        enumerable: true,
        configurable: true
    });
    SimpleNotificationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Listen for changes in the service
        this.listener = this._service.getChangeEmitter()
            .subscribe(function (item) {
            switch (item.command) {
                case 'cleanAll':
                    _this.notifications = [];
                    break;
                case 'clean':
                    _this.cleanSingle(item.id);
                    break;
                case 'set':
                    if (item.add)
                        _this.add(item.notification);
                    else
                        _this.defaultBehavior(item);
                    break;
                default:
                    _this.defaultBehavior(item);
                    break;
            }
        });
    };
    // Default behavior on event
    SimpleNotificationsComponent.prototype.defaultBehavior = function (value) {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.onDestroy.emit(this.buildEmit(value.notification, false));
    };
    // Add the new notification to the notification array
    SimpleNotificationsComponent.prototype.add = function (item) {
        item.createdOn = new Date();
        var toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;
        // Save this as the last created notification
        this.lastNotificationCreated = item;
        if (!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(0, 1);
                this.notifications.push(item);
            }
            else {
                if (this.notifications.length >= this.maxStack)
                    this.notifications.splice(this.notifications.length - 1, 1);
                this.notifications.splice(0, 0, item);
            }
            this.onCreate.emit(this.buildEmit(item, true));
        }
    };
    // Check if notifications should be prevented
    SimpleNotificationsComponent.prototype.block = function (item) {
        var toCheck = item.html ? this.checkHtml : this.checkStandard;
        if (this.preventDuplicates && this.notifications.length > 0) {
            for (var i = 0; i < this.notifications.length; i++) {
                if (toCheck(this.notifications[i], item)) {
                    return true;
                }
            }
        }
        if (this.preventLastDuplicates) {
            var comp = void 0;
            if (this.preventLastDuplicates === 'visible' && this.notifications.length > 0) {
                if (this.lastOnBottom) {
                    comp = this.notifications[this.notifications.length - 1];
                }
                else {
                    comp = this.notifications[0];
                }
            }
            else if (this.preventLastDuplicates === 'all' && this.lastNotificationCreated) {
                comp = this.lastNotificationCreated;
            }
            else {
                return false;
            }
            return toCheck(comp, item);
        }
        return false;
    };
    SimpleNotificationsComponent.prototype.checkStandard = function (checker, item) {
        return checker.type === item.type && checker.title === item.title && checker.content === item.content;
    };
    SimpleNotificationsComponent.prototype.checkHtml = function (checker, item) {
        return checker.html ? checker.type === item.type && checker.title === item.title && checker.content === item.content && checker.html === item.html : false;
    };
    // Attach all the changes received in the options object
    SimpleNotificationsComponent.prototype.attachChanges = function (options) {
        var _this = this;
        Object.keys(options).forEach(function (a) {
            if (_this.hasOwnProperty(a)) {
                _this[a] = options[a];
            }
        });
    };
    SimpleNotificationsComponent.prototype.buildEmit = function (notification, to) {
        var toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            icon: notification.icon,
            id: notification.id
        };
        if (notification.html) {
            toEmit.html = notification.html;
        }
        else {
            toEmit.title = notification.title;
            toEmit.content = notification.content;
        }
        if (!to) {
            toEmit.destroyedOn = new Date();
        }
        return toEmit;
    };
    SimpleNotificationsComponent.prototype.cleanSingle = function (id) {
        var indexOfDelete = 0;
        var doDelete = false;
        this.notifications.forEach(function (notification, idx) {
            if (notification.id === id) {
                indexOfDelete = idx;
                doDelete = true;
            }
        });
        if (doDelete) {
            this.notifications.splice(indexOfDelete, 1);
        }
    };
    SimpleNotificationsComponent.prototype.ngOnDestroy = function () {
        if (this.listener) {
            this.listener.unsubscribe();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof options_type_1.Options !== 'undefined' && options_type_1.Options) === 'function' && _a) || Object), 
        __metadata('design:paramtypes', [(typeof (_b = typeof options_type_1.Options !== 'undefined' && options_type_1.Options) === 'function' && _b) || Object])
    ], SimpleNotificationsComponent.prototype, "options", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SimpleNotificationsComponent.prototype, "onCreate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SimpleNotificationsComponent.prototype, "onDestroy", void 0);
    SimpleNotificationsComponent = __decorate([
        core_1.Component({
            selector: 'simple-notifications',
            encapsulation: core_1.ViewEncapsulation.None,
            template: "\n        <div class=\"simple-notification-wrapper\" [ngClass]=\"position\">\n            <simple-notification\n                *ngFor=\"let a of notifications; let i = index\"\n                [item]=\"a\"\n                [timeOut]=\"timeOut\"\n                [clickToClose]=\"clickToClose\"\n                [maxLength]=\"maxLength\"\n                [showProgressBar]=\"showProgressBar\"\n                [pauseOnHover]=\"pauseOnHover\"\n                [theClass]=\"theClass\"\n                [rtl]=\"rtl\"\n                [animate]=\"animate\"\n                [position]=\"i\"\n                >\n            </simple-notification>\n        </div>\n    ",
            styles: ["\n        .simple-notification-wrapper {\n            position: fixed;\n            width: 300px;\n            z-index: 1000;\n        }\n        \n        .simple-notification-wrapper.left { left: 20px; }\n        .simple-notification-wrapper.top { top: 20px; }\n        .simple-notification-wrapper.right { right: 20px; }\n        .simple-notification-wrapper.bottom { bottom: 20px; }\n        \n        @media (max-width: 340px) {\n            .simple-notification-wrapper {\n                width: auto;\n                left: 20px;\n                right: 20px;\n            }\n        }\n    "]
        }), 
        __metadata('design:paramtypes', [(typeof (_c = typeof notifications_service_1.NotificationsService !== 'undefined' && notifications_service_1.NotificationsService) === 'function' && _c) || Object])
    ], SimpleNotificationsComponent);
    return SimpleNotificationsComponent;
    var _a, _b, _c;
}());
exports.SimpleNotificationsComponent = SimpleNotificationsComponent;


/***/ },

/***/ "./node_modules/.0.4.49@angular2-notifications/src/simple-notifications.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/.2.1.1@@angular/common/index.js");
var notifications_service_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/notifications.service.ts");
var simple_notifications_component_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/simple-notifications.component.ts");
var notification_component_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/notification.component.ts");
var max_pipe_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/src/max.pipe.ts");
var SimpleNotificationsModule = (function () {
    function SimpleNotificationsModule() {
    }
    SimpleNotificationsModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [simple_notifications_component_1.SimpleNotificationsComponent, notification_component_1.NotificationComponent, max_pipe_1.MaxPipe],
            providers: [notifications_service_1.NotificationsService],
            exports: [simple_notifications_component_1.SimpleNotificationsComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], SimpleNotificationsModule);
    return SimpleNotificationsModule;
}());
exports.SimpleNotificationsModule = SimpleNotificationsModule;


/***/ },

/***/ "./node_modules/.1.0.14-beta@qiniu-js/dist/qiniu.js":
/***/ function(module, exports) {

/*!
 * qiniu-js-sdk v1.0.13-beta
 *
 * Copyright 2015 by Qiniu
 * Released under GPL V2 License.
 *
 * GitHub: http://github.com/qiniu/js-sdk
 *
 * Date: 2016-1-26
*/

/*global plupload ,mOxie*/
/*global ActiveXObject */
/*exported Qiniu */
/*exported QiniuJsSDK */

;(function( global ){

/**
 * Creates new cookie or removes cookie with negative expiration
 * @param  key       The key or identifier for the store
 * @param  value     Contents of the store
 * @param  exp       Expiration - creation defaults to 30 days
 */
function createCookie(key, value, exp) {
    var date = new Date();
    date.setTime(date.getTime() + (exp * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + date.toGMTString();
    document.cookie = key + "=" + value + expires + "; path=/";
}

/**
 * Returns contents of cookie
 * @param  key       The key or identifier for the store
 */
function readCookie(key) {
    var nameEQ = key + "=";
    var ca = document.cookie.split(';');
    for (var i = 0, max = ca.length; i < max; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) === 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}

// if current browser is not support localStorage
// use cookie to make a polyfill
if ( !window.localStorage ) {
    window.localStorage = {
        setItem: function (key, value) {
            createCookie(key, value, 30);
        },
        getItem: function (key) {
            return readCookie(key);
        },
        removeItem: function (key) {
            createCookie(key, '', -1);
        }
    };
}

function QiniuJsSDK() {

    var that = this;

    /**
     * detect IE version
     * if current browser is not IE
     *     it will return false
     * else
     *     it will return version of current IE browser
     * @return {Number|Boolean} IE version or false
     */
    this.detectIEVersion = function() {
        var v = 4,
            div = document.createElement('div'),
            all = div.getElementsByTagName('i');
        while (
            div.innerHTML = '<!--[if gt IE ' + v + ']><i></i><![endif]-->',
            all[0]
        ) {
            v++;
        }
        return v > 4 ? v : false;
    };

    var logger = {
        MUTE: 0,
        FATA: 1,
        ERROR: 2,
        WARN: 3,
        INFO: 4,
        DEBUG: 5,
        TRACE: 6,
        level: 0
    };

    function log(type, args){
        var header = "[qiniu-js-sdk]["+type+"]";
        if (that.detectIEVersion()) {
            // http://stackoverflow.com/questions/5538972/console-log-apply-not-working-in-ie9
            //var log = Function.prototype.bind.call(console.log, console);
            //log.apply(console, args);
            var msg = header;
            for (var i = 0; i < args.length; i++) {
                msg+=that.stringifyJSON(args[i]);
            }
            console.log(msg);
        }else{
            args.unshift(header);
            console.log.apply(console, args);
        }
    }

    function makeLogFunc(code){
        var func = code.toLowerCase();
        logger[func] = function(){
            // logger[func].history = logger[func].history || [];
            // logger[func].history.push(arguments);
            if(window.console && window.console.log && logger.level>=logger[code]){
                var args = Array.prototype.slice.call(arguments);
                log(func,args);
            }
        };
    }

    for (var property in logger){
        if (logger.hasOwnProperty(property) && (typeof logger[property]) === "number" && !logger.hasOwnProperty(property.toLowerCase())) {
            makeLogFunc(property);
        }
    }


    var qiniuUploadUrl;
    if (window.location.protocol === 'https:') {
        qiniuUploadUrl = 'https://up.qbox.me';
    } else {
        qiniuUploadUrl = 'http://upload.qiniu.com';
    }

    /**
     * qiniu upload urls
     * 'qiniuUploadUrls' is used to change target when current url is not avaliable
     * @type {Array}
     */
    var qiniuUploadUrls = [
        "http://upload.qiniu.com",
        "http://up.qiniu.com",
    ];

    var changeUrlTimes = 0;

    /**
     * reset upload url
     * if current page protocal is https
     *     it will always return 'https://up.qbox.me'
     * else
     *     it will set 'qiniuUploadUrl' value with 'qiniuUploadUrls' looply
     */
    this.resetUploadUrl = function(){
        if (window.location.protocol === 'https:') {
            qiniuUploadUrl = 'https://up.qbox.me';
        } else {
            var i = changeUrlTimes % qiniuUploadUrls.length;
            qiniuUploadUrl = qiniuUploadUrls[i];
            changeUrlTimes++;
        }
        logger.debug('resetUploadUrl: '+qiniuUploadUrl);
    };

    this.resetUploadUrl();


    /**
     * is image
     * @param  {String}  url of a file
     * @return {Boolean} file is a image or not
     */
    this.isImage = function(url) {
        var res, suffix = "";
        var imageSuffixes = ["png", "jpg", "jpeg", "gif", "bmp"];
        var suffixMatch = /\.([a-zA-Z0-9]+)(\?|\@|$)/;

        if (!url || !suffixMatch.test(url)) {
            return false;
        }
        res = suffixMatch.exec(url);
        suffix = res[1].toLowerCase();
        for (var i = 0, l = imageSuffixes.length; i < l; i++) {
            if (suffix === imageSuffixes[i]) {
                return true;
            }
        }
        return false;
    };

    /**
     * get file extension
     * @param  {String} filename
     * @return {String} file extension
     * @example
     *     input: test.txt
     *     output: txt
     */
    this.getFileExtension = function(filename) {
        var tempArr = filename.split(".");
        var ext;
        if (tempArr.length === 1 || (tempArr[0] === "" && tempArr.length === 2)) {
            ext = "";
        } else {
            ext = tempArr.pop().toLowerCase(); //get the extension and make it lower-case
        }
        return ext;
    };

    /**
     * encode string by utf8
     * @param  {String} string to encode
     * @return {String} encoded string
     */
    this.utf8_encode = function(argString) {
        // http://kevin.vanzonneveld.net
        // +   original by: Webtoolkit.info (http://www.webtoolkit.info/)
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   improved by: sowberry
        // +    tweaked by: Jack
        // +   bugfixed by: Onno Marsman
        // +   improved by: Yves Sucaet
        // +   bugfixed by: Onno Marsman
        // +   bugfixed by: Ulrich
        // +   bugfixed by: Rafal Kukawski
        // +   improved by: kirilloid
        // +   bugfixed by: kirilloid
        // *     example 1: this.utf8_encode('Kevin van Zonneveld');
        // *     returns 1: 'Kevin van Zonneveld'

        if (argString === null || typeof argString === 'undefined') {
            return '';
        }

        var string = (argString + ''); // .replace(/\r\n/g, '\n').replace(/\r/g, '\n');
        var utftext = '',
            start, end, stringl = 0;

        start = end = 0;
        stringl = string.length;
        for (var n = 0; n < stringl; n++) {
            var c1 = string.charCodeAt(n);
            var enc = null;

            if (c1 < 128) {
                end++;
            } else if (c1 > 127 && c1 < 2048) {
                enc = String.fromCharCode(
                    (c1 >> 6) | 192, (c1 & 63) | 128
                );
            } else if (c1 & 0xF800 ^ 0xD800 > 0) {
                enc = String.fromCharCode(
                    (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            } else { // surrogate pairs
                if (c1 & 0xFC00 ^ 0xD800 > 0) {
                    throw new RangeError('Unmatched trail surrogate at ' + n);
                }
                var c2 = string.charCodeAt(++n);
                if (c2 & 0xFC00 ^ 0xDC00 > 0) {
                    throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
                }
                c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
                enc = String.fromCharCode(
                    (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
                );
            }
            if (enc !== null) {
                if (end > start) {
                    utftext += string.slice(start, end);
                }
                utftext += enc;
                start = end = n + 1;
            }
        }

        if (end > start) {
            utftext += string.slice(start, stringl);
        }

        return utftext;
    };

    /**
     * encode data by base64
     * @param  {String} data to encode
     * @return {String} encoded data
     */
    this.base64_encode = function(data) {
        // http://kevin.vanzonneveld.net
        // +   original by: Tyler Akins (http://rumkin.com)
        // +   improved by: Bayron Guevara
        // +   improved by: Thunder.m
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // +   bugfixed by: Pellentesque Malesuada
        // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
        // -    depends on: this.utf8_encode
        // *     example 1: this.base64_encode('Kevin van Zonneveld');
        // *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
        // mozilla has this native
        // - but breaks in 2.0.0.12!
        //if (typeof this.window['atob'] == 'function') {
        //    return atob(data);
        //}
        var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
        var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
            ac = 0,
            enc = '',
            tmp_arr = [];

        if (!data) {
            return data;
        }

        data = this.utf8_encode(data + '');

        do { // pack three octets into four hexets
            o1 = data.charCodeAt(i++);
            o2 = data.charCodeAt(i++);
            o3 = data.charCodeAt(i++);

            bits = o1 << 16 | o2 << 8 | o3;

            h1 = bits >> 18 & 0x3f;
            h2 = bits >> 12 & 0x3f;
            h3 = bits >> 6 & 0x3f;
            h4 = bits & 0x3f;

            // use hexets to index into b64, and append result to encoded string
            tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
        } while (i < data.length);

        enc = tmp_arr.join('');

        switch (data.length % 3) {
            case 1:
                enc = enc.slice(0, -2) + '==';
                break;
            case 2:
                enc = enc.slice(0, -1) + '=';
                break;
        }

        return enc;
    };

    /**
     * encode string in url by base64
     * @param {String} string in url
     * @return {String} encoded string
     */
    this.URLSafeBase64Encode = function(v) {
        v = this.base64_encode(v);
        return v.replace(/\//g, '_').replace(/\+/g, '-');
    };

    // TODO: use mOxie
    /**
     * craete object used to AJAX
     * @return {Object}
     */
    this.createAjax = function(argument) {
        var xmlhttp = {};
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    };

    // TODO: enhance IE compatibility
    /**
     * parse json string to javascript object
     * @param  {String} json string
     * @return {Object} object
     */
    this.parseJSON = function(data) {
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {
            return window.JSON.parse(data);
        }

        //var rx_one = /^[\],:{}\s]*$/,
        //    rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
        //    rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
        //    rx_four = /(?:^|:|,)(?:\s*\[)+/g,
        var    rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;

        //var json;

        var text = String(data);
        rx_dangerous.lastIndex = 0;
        if(rx_dangerous.test(text)){
            text = text.replace(rx_dangerous, function(a){
               return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            });
        }

        // todo 使用一下判断,增加安全性
        //if (
        //    rx_one.test(
        //        text
        //            .replace(rx_two, '@')
        //            .replace(rx_three, ']')
        //            .replace(rx_four, '')
        //    )
        //) {
        //    return eval('(' + text + ')');
        //}

        return eval('('+text+')');
    };

    /**
     * parse javascript object to json string
     * @param  {Object} object
     * @return {String} json string
     */
    this.stringifyJSON = function(obj) {
        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.stringify) {
            return window.JSON.stringify(obj);
        }
        switch (typeof (obj)) {
            case 'string':
                return '"' + obj.replace(/(["\\])/g, '\\$1') + '"';
            case 'array':
                return '[' + obj.map(that.stringifyJSON).join(',') + ']';
            case 'object':
                if (obj instanceof Array) {
                    var strArr = [];
                    var len = obj.length;
                    for (var i = 0; i < len; i++) {
                        strArr.push(that.stringifyJSON(obj[i]));
                    }
                    return '[' + strArr.join(',') + ']';
                } else if (obj === null) {
                    return 'null';
                } else {
                    var string = [];
                    for (var property in obj) {
                        if (obj.hasOwnProperty(property)) {
                            string.push(that.stringifyJSON(property) + ':' + that.stringifyJSON(obj[property]));
                        }
                    }
                    return '{' + string.join(',') + '}';
                }
                break;
            case 'number':
                return obj;
            case false:
                return obj;
            case 'boolean':
                return obj;
        }
    };

    /**
     * trim space beside text
     * @param  {String} untrimed string
     * @return {String} trimed string
     */
    this.trim = function(text) {
        return text === null ? "" : text.replace(/^\s+|\s+$/g, '');
    };

    /**
     * create a uploader by QiniuJsSDK
     * @param  {object} options to create a new uploader
     * @return {object} uploader
     */
    this.uploader = function(op) {

        /********** inner function define start **********/

        // according the different condition to reset chunk size
        // and the upload strategy according with the chunk size
        // when chunk size is zero will cause to direct upload
        // see the statement binded on 'BeforeUpload' event
        var reset_chunk_size = function() {
            var ie = that.detectIEVersion();
            var BLOCK_BITS, MAX_CHUNK_SIZE, chunk_size;
            // case Safari 5、Windows 7、iOS 7 set isSpecialSafari to true
            var isSpecialSafari = (mOxie.Env.browser === "Safari" && mOxie.Env.version <= 5 && mOxie.Env.os === "Windows" && mOxie.Env.osVersion === "7") || (mOxie.Env.browser === "Safari" && mOxie.Env.os === "iOS" && mOxie.Env.osVersion === "7");
            // case IE 9-，chunk_size is not empty and flash is included in runtimes
            // set op.chunk_size to zero
            //if (ie && ie <= 9 && op.chunk_size && op.runtimes.indexOf('flash') >= 0) {
            if (ie && ie <= 9 && op.chunk_size && op.runtimes.indexOf('flash') < 0) {
                //  link: http://www.plupload.com/docs/Frequently-Asked-Questions#when-to-use-chunking-and-when-not
                //  when plupload chunk_size setting is't null ,it cause bug in ie8/9  which runs  flash runtimes (not support html5) .
                op.chunk_size = 0;
            } else if (isSpecialSafari) {
                // win7 safari / iOS7 safari have bug when in chunk upload mode
                // reset chunk_size to 0
                // disable chunk in special version safari
                op.chunk_size = 0;
            } else {
                BLOCK_BITS = 20;
                MAX_CHUNK_SIZE = 4 << BLOCK_BITS; //4M

                chunk_size = plupload.parseSize(op.chunk_size);
                if (chunk_size > MAX_CHUNK_SIZE) {
                    op.chunk_size = MAX_CHUNK_SIZE;
                }
                // qiniu service  max_chunk_size is 4m
                // reset chunk_size to max_chunk_size(4m) when chunk_size > 4m
            }
            // if op.chunk_size set 0 will be cause to direct upload
        };

        // if op.uptoken has no value
        //      get token from 'uptoken_url'
        // else
        //      set token to be op.uptoken
        var getUpToken = function() {
            if (!op.uptoken) {
                // TODO: use mOxie
                var ajax = that.createAjax();
                ajax.open('GET', that.uptoken_url, true);
                ajax.setRequestHeader("If-Modified-Since", "0");
                ajax.onreadystatechange = function() {
                    if (ajax.readyState === 4 && ajax.status === 200) {
                        var res = that.parseJSON(ajax.responseText);
                        that.token = res.uptoken;
                    }
                };
                ajax.send();
            } else {
                that.token = op.uptoken;
            }
        };

        // get file key according with the user passed options
        var getFileKey = function(up, file, func) {
            // TODO: save_key can read from scope of token
            var key = '',
                unique_names = false;
            if (!op.save_key) {
                unique_names = up.getOption && up.getOption('unique_names');
                unique_names = unique_names || (up.settings && up.settings.unique_names);
                if (unique_names) {
                    var ext = that.getFileExtension(file.name);
                    key = ext ? file.id + '.' + ext : file.id;
                } else if (typeof func === 'function') {
                    key = func(up, file);
                } else {
                    key = file.name;
                }
            }
            return key;
        };

        /********** inner function define end **********/

        if (op.log_level) {
            logger.level = op.log_level;
        }

        if (!op.domain) {
            throw 'domain setting in options is required!';
        }

        if (!op.browse_button) {
            throw 'browse_button setting in options is required!';
        }

        logger.debug("init uploader start");

        logger.debug("environment: ", mOxie.Env);

        logger.debug("userAgent: ", navigator.userAgent);

        var option = {};

        // hold the handler from user passed options
        var _Error_Handler = op.init && op.init.Error;
        var _FileUploaded_Handler = op.init && op.init.FileUploaded;

        // replace the handler for intercept
        op.init.Error = function() {};
        op.init.FileUploaded = function() {};

        that.uptoken_url = op.uptoken_url;
        that.token = '';
        that.key_handler = typeof op.init.Key === 'function' ? op.init.Key : '';
        this.domain = op.domain;
        // TODO: ctx is global in scope of a uploader instance
        // this maybe cause error
        var ctx = '';
        var speedCalInfo = {
            isResumeUpload: false,
            resumeFilesize: 0,
            startTime: '',
            currentTime: ''
        };

        reset_chunk_size();
        logger.debug("invoke reset_chunk_size()");
        logger.debug("op.chunk_size: ", op.chunk_size);

        // compose options with user passed options and default setting
        plupload.extend(option, op, {
            url: qiniuUploadUrl,
            multipart_params: {
                token: ''
            }
        });

        logger.debug("option: ", option);

        // create a new uploader with composed options
        var uploader = new plupload.Uploader(option);

        logger.debug("new plupload.Uploader(option)");

        // bind getUpToken to 'Init' event
        uploader.bind('Init', function(up, params) {
            logger.debug("Init event activated");
            // if op.get_new_uptoken is not true
            //      invoke getUptoken when uploader init
            // else 
            //      getUptoken everytime before a new file upload
            if(!op.get_new_uptoken){
                getUpToken();
            }
            getUpToken();
        });

        logger.debug("bind Init event");

        // bind 'FilesAdded' event
        // when file be added and auto_start has set value
        // uploader will auto start upload the file
        uploader.bind('FilesAdded', function(up, files) {
            logger.debug("FilesAdded event activated");
            var auto_start = up.getOption && up.getOption('auto_start');
            auto_start = auto_start || (up.settings && up.settings.auto_start);
            logger.debug("auto_start: ", auto_start);
            logger.debug("files: ", files);
            if (auto_start) {
                setTimeout(function(){
                    up.start();
                    logger.debug("invoke up.start()");
                }, 0);
                // up.start();
                // plupload.each(files, function(i, file) {
                //     up.start();
                //     logger.debug("invoke up.start()")
                //     logger.debug("file: ", file);
                // });
            }
            up.refresh(); // Reposition Flash/Silverlight
        });

        logger.debug("bind FilesAdded event");

        // bind 'BeforeUpload' event
        // intercept the process of upload
        // - prepare uptoken
        // - according the chunk size to make differnt upload strategy
        // - resume upload with the last breakpoint of file
        uploader.bind('BeforeUpload', function(up, file) {
            logger.debug("BeforeUpload event activated");
            // add a key named speed for file object
            file.speed = file.speed || 0;
            ctx = '';

            if(op.get_new_uptoken){
                getUpToken();
            }

            var directUpload = function(up, file, func) {
                speedCalInfo.startTime = new Date().getTime();
                var multipart_params_obj;
                if (op.save_key) {
                    multipart_params_obj = {
                        'token': that.token
                    };
                } else {
                    multipart_params_obj = {
                        'key': getFileKey(up, file, func),
                        'token': that.token
                    };
                }

                logger.debug("directUpload multipart_params_obj: ", multipart_params_obj);

                var x_vars = op.x_vars;
                if (x_vars !== undefined && typeof x_vars === 'object') {
                    for (var x_key in x_vars) {
                        if (x_vars.hasOwnProperty(x_key)) {
                            if (typeof x_vars[x_key] === 'function') {
                                multipart_params_obj['x:' + x_key] = x_vars[x_key](up, file);
                            } else if (typeof x_vars[x_key] !== 'object') {
                                multipart_params_obj['x:' + x_key] = x_vars[x_key];
                            }
                        }
                    }
                }


                up.setOption({
                    'url': qiniuUploadUrl,
                    'multipart': true,
                    'chunk_size': is_android_weixin_or_qq() ? op.max_file_size : undefined,
                    'multipart_params': multipart_params_obj
                });
            };

            // detect is weixin or qq inner browser
            var is_android_weixin_or_qq = function (){
                var ua = navigator.userAgent.toLowerCase();
                if((ua.match(/MicroMessenger/i) || mOxie.Env.browser === "QQBrowser" || ua.match(/V1_AND_SQ/i)) && mOxie.Env.OS.toLowerCase()==="android") {
                    return true;
                } else {
                    return false;
                }
            };

            var chunk_size = up.getOption && up.getOption('chunk_size');
            chunk_size = chunk_size || (up.settings && up.settings.chunk_size);

            logger.debug("uploader.runtime: ",uploader.runtime);
            logger.debug("chunk_size: ",chunk_size);

            // TODO: flash support chunk upload
            if ((uploader.runtime === 'html5' || uploader.runtime === 'flash') && chunk_size) {
                if (file.size < chunk_size || is_android_weixin_or_qq()) {
                    logger.debug("directUpload because file.size < chunk_size || is_android_weixin_or_qq()");
                    // direct upload if file size is less then the chunk size
                    directUpload(up, file, that.key_handler);
                } else {
                    // TODO: need a polifill to make it work in IE 9-
                    // ISSUE: if file.name is existed in localStorage 
                    // but not the same file maybe cause error
                    var localFileInfo = localStorage.getItem(file.name);
                    var blockSize = chunk_size;
                    if (localFileInfo) {
                        // TODO: although only the html5 runtime will enter this statement
                        // but need uniform way to make convertion between string and json
                        localFileInfo = that.parseJSON(localFileInfo);
                        var now = (new Date()).getTime();
                        var before = localFileInfo.time || 0;
                        var aDay = 24 * 60 * 60 * 1000; //  milliseconds of one day
                        // if the last upload time is within one day
                        //      will upload continuously follow the last breakpoint
                        // else
                        //      will reupload entire file
                        if (now - before < aDay) {

                            if (localFileInfo.percent !== 100) {
                                if (file.size === localFileInfo.total) {
                                    // TODO: if file.name and file.size is the same 
                                    // but not the same file will cause error
                                    file.percent = localFileInfo.percent;
                                    file.loaded = localFileInfo.offset;
                                    ctx = localFileInfo.ctx;

                                    // set speed info
                                    speedCalInfo.isResumeUpload = true;
                                    speedCalInfo.resumeFilesize = localFileInfo.offset;

                                    // set block size
                                    if (localFileInfo.offset + blockSize > file.size) {
                                        blockSize = file.size - localFileInfo.offset;
                                    }
                                } else {
                                    // remove file info when file.size is conflict with file info
                                    localStorage.removeItem(file.name);
                                }

                            } else {
                                // remove file info when upload percent is 100%
                                // avoid 499 bug
                                localStorage.removeItem(file.name);
                            }
                        } else {
                            // remove file info when last upload time is over one day
                            localStorage.removeItem(file.name);
                        }
                    }
                    speedCalInfo.startTime = new Date().getTime();
                    // TODO: to support bput
                    // http://developer.qiniu.com/docs/v6/api/reference/up/bput.html
                    up.setOption({
                        'url': qiniuUploadUrl + '/mkblk/' + blockSize,
                        'multipart': false,
                        'chunk_size': chunk_size,
                        'required_features': "chunks",
                        'headers': {
                            'Authorization': 'UpToken ' + that.token
                        },
                        'multipart_params': {}
                    });
                }
            } else {
                logger.debug("directUpload because uploader.runtime !== 'html5' || uploader.runtime !== 'flash' || !chunk_size");
                // direct upload if runtime is not html5
                directUpload(up, file, that.key_handler);
            }
        });

        logger.debug("bind BeforeUpload event");

        // bind 'UploadProgress' event
        // calculate upload speed
        uploader.bind('UploadProgress', function(up, file) {
            logger.trace("UploadProgress event activated");
            speedCalInfo.currentTime = new Date().getTime();
            var timeUsed = speedCalInfo.currentTime - speedCalInfo.startTime; // ms
            var fileUploaded = file.loaded || 0;
            if (speedCalInfo.isResumeUpload) {
                fileUploaded = file.loaded - speedCalInfo.resumeFilesize;
            }
            file.speed = (fileUploaded / timeUsed * 1000).toFixed(0) || 0; // unit: byte/s
        });

        logger.debug("bind UploadProgress event");

        // bind 'ChunkUploaded' event
        // store the chunk upload info and set next chunk upload url
        uploader.bind('ChunkUploaded', function(up, file, info) {
            logger.debug("ChunkUploaded event activated");
            logger.debug("file: ", file);
            logger.debug("info: ", info);
            var res = that.parseJSON(info.response);
            logger.debug("res: ", res);
            // ctx should look like '[chunk01_ctx],[chunk02_ctx],[chunk03_ctx],...'
            ctx = ctx ? ctx + ',' + res.ctx : res.ctx;
            var leftSize = info.total - info.offset;
            var chunk_size = up.getOption && up.getOption('chunk_size');
            chunk_size = chunk_size || (up.settings && up.settings.chunk_size);
            if (leftSize < chunk_size) {
                up.setOption({
                    'url': qiniuUploadUrl + '/mkblk/' + leftSize
                });
                logger.debug("up.setOption url: ", qiniuUploadUrl + '/mkblk/' + leftSize);
            }
            localStorage.setItem(file.name, that.stringifyJSON({
                ctx: ctx,
                percent: file.percent,
                total: info.total,
                offset: info.offset,
                time: (new Date()).getTime()
            }));
        });

        logger.debug("bind ChunkUploaded event");

        var retries = qiniuUploadUrls.length;

        // if error is unkown switch upload url and retry
        var unknow_error_retry = function(file){
            if (retries-- > 0) {
                setTimeout(function(){
                    that.resetUploadUrl();
                    file.status = plupload.QUEUED;
                    uploader.stop();
                    uploader.start();
                }, 0);
                return true;
            }else{
                retries = qiniuUploadUrls.length;
                return false;
            }
        };

        // bind 'Error' event
        // check the err.code and return the errTip
        uploader.bind('Error', (function(_Error_Handler) {
            return function(up, err) {
                logger.error("Error event activated");
                logger.error("err: ", err);
                var errTip = '';
                var file = err.file;
                if (file) {
                    switch (err.code) {
                        case plupload.FAILED:
                            errTip = '上传失败。请稍后再试。';
                            break;
                        case plupload.FILE_SIZE_ERROR:
                            var max_file_size = up.getOption && up.getOption('max_file_size');
                            max_file_size = max_file_size || (up.settings && up.settings.max_file_size);
                            errTip = '浏览器最大可上传' + max_file_size + '。更大文件请使用命令行工具。';
                            break;
                        case plupload.FILE_EXTENSION_ERROR:
                            errTip = '文件验证失败。请稍后重试。';
                            break;
                        case plupload.HTTP_ERROR:
                            if (err.response === '') {
                                // Fix parseJSON error ,when http error is like net::ERR_ADDRESS_UNREACHABLE
                                errTip = err.message || '未知网络错误。';
                                if (!unknow_error_retry(file)) {
                                    return;
                                }
                                break;
                            }
                            var errorObj = that.parseJSON(err.response);
                            var errorText = errorObj.error;
                            switch (err.status) {
                                case 400:
                                    errTip = "请求报文格式错误。";
                                    break;
                                case 401:
                                    errTip = "客户端认证授权失败。请重试或提交反馈。";
                                    break;
                                case 405:
                                    errTip = "客户端请求错误。请重试或提交反馈。";
                                    break;
                                case 579:
                                    errTip = "资源上传成功，但回调失败。";
                                    break;
                                case 599:
                                    errTip = "网络连接异常。请重试或提交反馈。";
                                    if (!unknow_error_retry(file)) {
                                        return;
                                    }
                                    break;
                                case 614:
                                    errTip = "文件已存在。";
                                    try {
                                        errorObj = that.parseJSON(errorObj.error);
                                        errorText = errorObj.error || 'file exists';
                                    } catch (e) {
                                        errorText = errorObj.error || 'file exists';
                                    }
                                    break;
                                case 631:
                                    errTip = "指定空间不存在。";
                                    break;
                                case 701:
                                    errTip = "上传数据块校验出错。请重试或提交反馈。";
                                    break;
                                default:
                                    errTip = "未知错误。";
                                    if (!unknow_error_retry(file)) {
                                        return;
                                    }
                                    break;
                            }
                            errTip = errTip + '(' + err.status + '：' + errorText + ')';
                            break;
                        case plupload.SECURITY_ERROR:
                            errTip = '安全配置错误。请联系网站管理员。';
                            break;
                        case plupload.GENERIC_ERROR:
                            errTip = '上传失败。请稍后再试。';
                            break;
                        case plupload.IO_ERROR:
                            errTip = '上传失败。请稍后再试。';
                            break;
                        case plupload.INIT_ERROR:
                            errTip = '网站配置错误。请联系网站管理员。';
                            uploader.destroy();
                            break;
                        default:
                            errTip = err.message + err.details;
                            if (!unknow_error_retry(file)) {
                                return;
                            }
                            break;
                    }
                    if (_Error_Handler) {
                        _Error_Handler(up, err, errTip);
                    }
                }
                up.refresh(); // Reposition Flash/Silverlight
            };
        })(_Error_Handler));

        logger.debug("bind Error event");

        // bind 'FileUploaded' event
        // intercept the complete of upload
        // - get downtoken from downtoken_url if bucket is private
        // - invoke mkfile api to compose chunks if upload strategy is chunk upload
        uploader.bind('FileUploaded', (function(_FileUploaded_Handler) {
            return function(up, file, info) {
                logger.debug("FileUploaded event activated");
                logger.debug("file: ", file);
                logger.debug("info: ", info);
                var last_step = function(up, file, info) {
                    if (op.downtoken_url) {
                        // if op.dowontoken_url is not empty
                        // need get downtoken before invoke the _FileUploaded_Handler
                        var ajax_downtoken = that.createAjax();
                        ajax_downtoken.open('POST', op.downtoken_url, true);
                        ajax_downtoken.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
                        ajax_downtoken.onreadystatechange = function() {
                            if (ajax_downtoken.readyState === 4) {
                                if (ajax_downtoken.status === 200) {
                                    var res_downtoken;
                                    try {
                                        res_downtoken = that.parseJSON(ajax_downtoken.responseText);
                                    } catch (e) {
                                        throw ('invalid json format');
                                    }
                                    var info_extended = {};
                                    plupload.extend(info_extended, that.parseJSON(info), res_downtoken);
                                    if (_FileUploaded_Handler) {
                                        _FileUploaded_Handler(up, file, that.stringifyJSON(info_extended));
                                    }
                                } else {
                                    uploader.trigger('Error', {
                                        status: ajax_downtoken.status,
                                        response: ajax_downtoken.responseText,
                                        file: file,
                                        code: plupload.HTTP_ERROR
                                    });
                                }
                            }
                        };
                        ajax_downtoken.send('key=' + that.parseJSON(info).key + '&domain=' + op.domain);
                    } else if (_FileUploaded_Handler) {
                        _FileUploaded_Handler(up, file, info);
                    }
                };

                var res = that.parseJSON(info.response);
                ctx = ctx ? ctx : res.ctx;
                // if ctx is not empty 
                //      that means the upload strategy is chunk upload
                //      befroe the invoke the last_step
                //      we need request the mkfile to compose all uploaded chunks
                // else
                //      invalke the last_step
                logger.debug("ctx: ", ctx);
                if (ctx) {
                    var key = '';
                    logger.debug("save_key: ", op.save_key);
                    if (!op.save_key) {
                        key = getFileKey(up, file, that.key_handler);
                        key = key ? '/key/' + that.URLSafeBase64Encode(key) : '';
                    }

                    var fname = '/fname/' + that.URLSafeBase64Encode(file.name);

                    logger.debug("op.x_vars: ", op.x_vars);
                    var x_vars = op.x_vars,
                        x_val = '',
                        x_vars_url = '';
                    if (x_vars !== undefined && typeof x_vars === 'object') {
                        for (var x_key in x_vars) {
                            if (x_vars.hasOwnProperty(x_key)) {
                                if (typeof x_vars[x_key] === 'function') {
                                    x_val = that.URLSafeBase64Encode(x_vars[x_key](up, file));
                                } else if (typeof x_vars[x_key] !== 'object') {
                                    x_val = that.URLSafeBase64Encode(x_vars[x_key]);
                                }
                                x_vars_url += '/x:' + x_key + '/' + x_val;
                            }
                        }
                    }

                    var url = qiniuUploadUrl + '/mkfile/' + file.size + key + fname + x_vars_url;

                    var ie = that.detectIEVersion();
                    var ajax;
                    if (ie && ie <= 9) {
                        ajax = new mOxie.XMLHttpRequest();
                        mOxie.Env.swf_url = op.flash_swf_url;
                    }else{
                        ajax = that.createAjax();
                    }
                    ajax.open('POST', url, true);
                    ajax.setRequestHeader('Content-Type', 'text/plain;charset=UTF-8');
                    ajax.setRequestHeader('Authorization', 'UpToken ' + that.token);
                    var onreadystatechange = function(){
                        logger.debug("ajax.readyState: ", ajax.readyState);
                        if (ajax.readyState === 4) {
                            localStorage.removeItem(file.name);
                            var info;
                            if (ajax.status === 200) {
                                info = ajax.responseText;
                                logger.debug("mkfile is success: ", info);
                                last_step(up, file, info);
                            } else {
                                info = {
                                    status: ajax.status,
                                    response: ajax.responseText,
                                    file: file,
                                    code: -200
                                };
                                logger.debug("mkfile is error: ", info);
                                uploader.trigger('Error', info);
                            }
                        }
                    };
                    if (ie && ie <= 9) {
                        ajax.bind('readystatechange', onreadystatechange);
                    }else{
                        ajax.onreadystatechange = onreadystatechange;
                    }
                    ajax.send(ctx);
                    logger.debug("mkfile: ", url);
                } else {
                    last_step(up, file, info.response);
                }

            };
        })(_FileUploaded_Handler));

        logger.debug("bind FileUploaded event");

        // init uploader
        uploader.init();

        logger.debug("invoke uploader.init()");

        logger.debug("init uploader end");

        return uploader;
    };

    /**
     * get url by key
     * @param  {String} key of file
     * @return {String} url of file
     */
    this.getUrl = function(key) {
        if (!key) {
            return false;
        }
        key = encodeURI(key);
        var domain = this.domain;
        if (domain.slice(domain.length - 1) !== '/') {
            domain = domain + '/';
        }
        return domain + key;
    };

    /**
     * invoke the imageView2 api of Qiniu
     * @param  {Object} api params
     * @param  {String} key of file
     * @return {String} url of processed image
     */
    this.imageView2 = function(op, key) {
        var mode = op.mode || '',
            w = op.w || '',
            h = op.h || '',
            q = op.q || '',
            format = op.format || '';
        if (!mode) {
            return false;
        }
        if (!w && !h) {
            return false;
        }

        var imageUrl = 'imageView2/' + mode;
        imageUrl += w ? '/w/' + w : '';
        imageUrl += h ? '/h/' + h : '';
        imageUrl += q ? '/q/' + q : '';
        imageUrl += format ? '/format/' + format : '';
        if (key) {
            imageUrl = this.getUrl(key) + '?' + imageUrl;
        }
        return imageUrl;
    };

    /**
     * invoke the imageMogr2 api of Qiniu
     * @param  {Object} api params
     * @param  {String} key of file
     * @return {String} url of processed image
     */
    this.imageMogr2 = function(op, key) {
        var auto_orient = op['auto-orient'] || '',
            thumbnail = op.thumbnail || '',
            strip = op.strip || '',
            gravity = op.gravity || '',
            crop = op.crop || '',
            quality = op.quality || '',
            rotate = op.rotate || '',
            format = op.format || '',
            blur = op.blur || '';
        //Todo check option

        var imageUrl = 'imageMogr2';

        imageUrl += auto_orient ? '/auto-orient' : '';
        imageUrl += thumbnail ? '/thumbnail/' + thumbnail : '';
        imageUrl += strip ? '/strip' : '';
        imageUrl += gravity ? '/gravity/' + gravity : '';
        imageUrl += quality ? '/quality/' + quality : '';
        imageUrl += crop ? '/crop/' + crop : '';
        imageUrl += rotate ? '/rotate/' + rotate : '';
        imageUrl += format ? '/format/' + format : '';
        imageUrl += blur ? '/blur/' + blur : '';

        if (key) {
            imageUrl = this.getUrl(key) + '?' + imageUrl;
        }
        return imageUrl;
    };

    /**
     * invoke the watermark api of Qiniu
     * @param  {Object} api params
     * @param  {String} key of file
     * @return {String} url of processed image
     */
    this.watermark = function(op, key) {
        var mode = op.mode;
        if (!mode) {
            return false;
        }

        var imageUrl = 'watermark/' + mode;

        if (mode === 1) {
            var image = op.image || '';
            if (!image) {
                return false;
            }
            imageUrl += image ? '/image/' + this.URLSafeBase64Encode(image) : '';
        } else if (mode === 2) {
            var text = op.text ? op.text : '',
                font = op.font ? op.font : '',
                fontsize = op.fontsize ? op.fontsize : '',
                fill = op.fill ? op.fill : '';
            if (!text) {
                return false;
            }
            imageUrl += text ? '/text/' + this.URLSafeBase64Encode(text) : '';
            imageUrl += font ? '/font/' + this.URLSafeBase64Encode(font) : '';
            imageUrl += fontsize ? '/fontsize/' + fontsize : '';
            imageUrl += fill ? '/fill/' + this.URLSafeBase64Encode(fill) : '';
        } else {
            // Todo mode3
            return false;
        }

        var dissolve = op.dissolve || '',
            gravity = op.gravity || '',
            dx = op.dx || '',
            dy = op.dy || '';

        imageUrl += dissolve ? '/dissolve/' + dissolve : '';
        imageUrl += gravity ? '/gravity/' + gravity : '';
        imageUrl += dx ? '/dx/' + dx : '';
        imageUrl += dy ? '/dy/' + dy : '';

        if (key) {
            imageUrl = this.getUrl(key) + '?' + imageUrl;
        }
        return imageUrl;
    };

    /**
     * invoke the imageInfo api of Qiniu
     * @param  {String} key of file
     * @return {Object} image info
     */
    this.imageInfo = function(key) {
        if (!key) {
            return false;
        }
        var url = this.getUrl(key) + '?imageInfo';
        var xhr = this.createAjax();
        var info;
        var that = this;
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                info = that.parseJSON(xhr.responseText);
            }
        };
        xhr.send();
        return info;
    };

    /**
     * invoke the exif api of Qiniu
     * @param  {String} key of file
     * @return {Object} image exif
     */
    this.exif = function(key) {
        if (!key) {
            return false;
        }
        var url = this.getUrl(key) + '?exif';
        var xhr = this.createAjax();
        var info;
        var that = this;
        xhr.open('GET', url, false);
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                info = that.parseJSON(xhr.responseText);
            }
        };
        xhr.send();
        return info;
    };

    /**
     * invoke the exif or imageInfo api of Qiniu
     * according with type param
     * @param  {String} ['exif'|'imageInfo']type of info
     * @param  {String} key of file
     * @return {Object} image exif or info
     */
    this.get = function(type, key) {
        if (!key || !type) {
            return false;
        }
        if (type === 'exif') {
            return this.exif(key);
        } else if (type === 'imageInfo') {
            return this.imageInfo(key);
        }
        return false;
    };

    /**
     * invoke api of Qiniu like a pipeline
     * @param  {Array of Object} params of a series api call
     * each object in array is options of api which name is set as 'fop' property
     * each api's output will be next api's input
     * @param  {String} key of file
     * @return {String|Boolean} url of processed image
     */
    this.pipeline = function(arr, key) {
        var isArray = Object.prototype.toString.call(arr) === '[object Array]';
        var option, errOp, imageUrl = '';
        if (isArray) {
            for (var i = 0, len = arr.length; i < len; i++) {
                option = arr[i];
                if (!option.fop) {
                    return false;
                }
                switch (option.fop) {
                    case 'watermark':
                        imageUrl += this.watermark(option) + '|';
                        break;
                    case 'imageView2':
                        imageUrl += this.imageView2(option) + '|';
                        break;
                    case 'imageMogr2':
                        imageUrl += this.imageMogr2(option) + '|';
                        break;
                    default:
                        errOp = true;
                        break;
                }
                if (errOp) {
                    return false;
                }
            }
            if (key) {
                imageUrl = this.getUrl(key) + '?' + imageUrl;
                var length = imageUrl.length;
                if (imageUrl.slice(length - 1) === '|') {
                    imageUrl = imageUrl.slice(0, length - 1);
                }
            }
            return imageUrl;
        }
        return false;
    };
}

var Qiniu = new QiniuJsSDK();

global.Qiniu = Qiniu;

global.QiniuJsSDK = QiniuJsSDK;

})( window );


/***/ },

/***/ "./node_modules/.2.3.0@plupload/js/moxie.js":
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;;var MXI_DEBUG = true;
/**
 * mOxie - multi-runtime File API & XMLHttpRequest L2 Polyfill
 * v1.5.3
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2017-02-02
 */
;(function (global, factory) {
	var extract = function() {
		var ctx = {};
		factory.apply(ctx, arguments);
		return ctx.moxie;
	};
	
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (extract), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === "object" && module.exports) {
		module.exports = extract();
	} else {
		global.moxie = extract();
	}
}(this || window, function() {
/**
 * Compiled inline version. (Library mode)
 */

/*jshint smarttabs:true, undef:true, latedef:true, curly:true, bitwise:true, camelcase:true */
/*globals $code */

(function(exports, undefined) {
	"use strict";

	var modules = {};

	function require(ids, callback) {
		var module, defs = [];

		for (var i = 0; i < ids.length; ++i) {
			module = modules[ids[i]] || resolve(ids[i]);
			if (!module) {
				throw 'module definition dependecy not found: ' + ids[i];
			}

			defs.push(module);
		}

		callback.apply(null, defs);
	}

	function define(id, dependencies, definition) {
		if (typeof id !== 'string') {
			throw 'invalid module definition, module id must be defined and be a string';
		}

		if (dependencies === undefined) {
			throw 'invalid module definition, dependencies must be specified';
		}

		if (definition === undefined) {
			throw 'invalid module definition, definition function must be specified';
		}

		require(dependencies, function() {
			modules[id] = definition.apply(null, arguments);
		});
	}

	function defined(id) {
		return !!modules[id];
	}

	function resolve(id) {
		var target = exports;
		var fragments = id.split(/[.\/]/);

		for (var fi = 0; fi < fragments.length; ++fi) {
			if (!target[fragments[fi]]) {
				return;
			}

			target = target[fragments[fi]];
		}

		return target;
	}

	function expose(ids) {
		for (var i = 0; i < ids.length; i++) {
			var target = exports;
			var id = ids[i];
			var fragments = id.split(/[.\/]/);

			for (var fi = 0; fi < fragments.length - 1; ++fi) {
				if (target[fragments[fi]] === undefined) {
					target[fragments[fi]] = {};
				}

				target = target[fragments[fi]];
			}

			target[fragments[fragments.length - 1]] = modules[id];
		}
	}

// Included from: src/javascript/core/utils/Basic.js

/**
 * Basic.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/core/utils/Basic
@public
@static
*/
define('moxie/core/utils/Basic', [], function() {
	/**
	Gets the true type of the built-in object (better version of typeof).
	@author Angus Croll (http://javascriptweblog.wordpress.com/)

	@method typeOf
	@for Utils
	@static
	@param {Object} o Object to check.
	@return {String} Object [[Class]]
	*/
	function typeOf(o) {
		var undef;

		if (o === undef) {
			return 'undefined';
		} else if (o === null) {
			return 'null';
		} else if (o.nodeType) {
			return 'node';
		}

		// the snippet below is awesome, however it fails to detect null, undefined and arguments types in IE lte 8
		return ({}).toString.call(o).match(/\s([a-z|A-Z]+)/)[1].toLowerCase();
	}

	/**
	Extends the specified object with another object(s).

	@method extend
	@static
	@param {Object} target Object to extend.
	@param {Object} [obj]* Multiple objects to extend with.
	@return {Object} Same as target, the extended object.
	*/
	function extend() {
		return merge(false, false, arguments);
	}


	/**
	Extends the specified object with another object(s), but only if the property exists in the target.

	@method extendIf
	@static
	@param {Object} target Object to extend.
	@param {Object} [obj]* Multiple objects to extend with.
	@return {Object} Same as target, the extended object.
	*/
	function extendIf() {
		return merge(true, false, arguments);
	}


	function extendImmutable() {
		return merge(false, true, arguments);
	}


	function extendImmutableIf() {
		return merge(true, true, arguments);
	}


	function shallowCopy(obj) {
		switch (typeOf(obj)) {
			case 'array':
				return Array.prototype.slice.call(obj);

			case 'object':
				return extend({}, obj);
		}
		return obj;
	}


	function merge(strict, immutable, args) {
		var undef;
		var target = args[0];

		each(args, function(arg, i) {
			if (i > 0) {
				each(arg, function(value, key) {
					var isComplex = inArray(typeOf(value), ['array', 'object']) !== -1;

					if (value === undef || strict && target[key] === undef) {
						return true;
					}

					if (isComplex && immutable) {
						value = shallowCopy(value);
					}

					if (typeOf(target[key]) === typeOf(value) && isComplex) {
						merge(strict, immutable, [target[key], value]);
					} else {
						target[key] = value;
					}
				});
			}
		});

		return target;
	}


	/**
	A way to inherit one `class` from another in a consisstent way (more or less)

	@method inherit
	@static
	@since >1.4.1
	@param {Function} child
	@param {Function} parent
	@return {Function} Prepared constructor
	*/
	function inherit(child, parent) {
		// copy over all parent properties
		for (var key in parent) {
			if ({}.hasOwnProperty.call(parent, key)) {
				child[key] = parent[key];
			}
		}

		// give child `class` a place to define its own methods
		function ctor() {
			this.constructor = child;
		}
		ctor.prototype = parent.prototype;
		child.prototype = new ctor();

		// keep a way to reference parent methods
		child.__parent__ = parent.prototype;
		return child;
	}


	/**
	Executes the callback function for each item in array/object. If you return false in the
	callback it will break the loop.

	@method each
	@static
	@param {Object} obj Object to iterate.
	@param {function} callback Callback function to execute for each item.
	*/
	function each(obj, callback) {
		var length, key, i, undef;

		if (obj) {
			try {
				length = obj.length;
			} catch(ex) {
				length = undef;
			}

			if (length === undef || typeof(length) !== 'number') {
				// Loop object items
				for (key in obj) {
					if (obj.hasOwnProperty(key)) {
						if (callback(obj[key], key) === false) {
							return;
						}
					}
				}
			} else {
				// Loop array items
				for (i = 0; i < length; i++) {
					if (callback(obj[i], i) === false) {
						return;
					}
				}
			}
		}
	}

	/**
	Checks if object is empty.

	@method isEmptyObj
	@static
	@param {Object} o Object to check.
	@return {Boolean}
	*/
	function isEmptyObj(obj) {
		var prop;

		if (!obj || typeOf(obj) !== 'object') {
			return true;
		}

		for (prop in obj) {
			return false;
		}

		return true;
	}

	/**
	Recieve an array of functions (usually async) to call in sequence, each  function
	receives a callback as first argument that it should call, when it completes. Finally,
	after everything is complete, main callback is called. Passing truthy value to the
	callback as a first argument will interrupt the sequence and invoke main callback
	immediately.

	@method inSeries
	@static
	@param {Array} queue Array of functions to call in sequence
	@param {Function} cb Main callback that is called in the end, or in case of error
	*/
	function inSeries(queue, cb) {
		var i = 0, length = queue.length;

		if (typeOf(cb) !== 'function') {
			cb = function() {};
		}

		if (!queue || !queue.length) {
			cb();
		}

		function callNext(i) {
			if (typeOf(queue[i]) === 'function') {
				queue[i](function(error) {
					/*jshint expr:true */
					++i < length && !error ? callNext(i) : cb(error);
				});
			}
		}
		callNext(i);
	}


	/**
	Recieve an array of functions (usually async) to call in parallel, each  function
	receives a callback as first argument that it should call, when it completes. After
	everything is complete, main callback is called. Passing truthy value to the
	callback as a first argument will interrupt the process and invoke main callback
	immediately.

	@method inParallel
	@static
	@param {Array} queue Array of functions to call in sequence
	@param {Function} cb Main callback that is called in the end, or in case of erro
	*/
	function inParallel(queue, cb) {
		var count = 0, num = queue.length, cbArgs = new Array(num);

		each(queue, function(fn, i) {
			fn(function(error) {
				if (error) {
					return cb(error);
				}

				var args = [].slice.call(arguments);
				args.shift(); // strip error - undefined or not

				cbArgs[i] = args;
				count++;

				if (count === num) {
					cbArgs.unshift(null);
					cb.apply(this, cbArgs);
				}
			});
		});
	}


	/**
	Find an element in array and return it's index if present, otherwise return -1.

	@method inArray
	@static
	@param {Mixed} needle Element to find
	@param {Array} array
	@return {Int} Index of the element, or -1 if not found
	*/
	function inArray(needle, array) {
		if (array) {
			if (Array.prototype.indexOf) {
				return Array.prototype.indexOf.call(array, needle);
			}

			for (var i = 0, length = array.length; i < length; i++) {
				if (array[i] === needle) {
					return i;
				}
			}
		}
		return -1;
	}


	/**
	Returns elements of first array if they are not present in second. And false - otherwise.

	@private
	@method arrayDiff
	@param {Array} needles
	@param {Array} array
	@return {Array|Boolean}
	*/
	function arrayDiff(needles, array) {
		var diff = [];

		if (typeOf(needles) !== 'array') {
			needles = [needles];
		}

		if (typeOf(array) !== 'array') {
			array = [array];
		}

		for (var i in needles) {
			if (inArray(needles[i], array) === -1) {
				diff.push(needles[i]);
			}
		}
		return diff.length ? diff : false;
	}


	/**
	Find intersection of two arrays.

	@private
	@method arrayIntersect
	@param {Array} array1
	@param {Array} array2
	@return {Array} Intersection of two arrays or null if there is none
	*/
	function arrayIntersect(array1, array2) {
		var result = [];
		each(array1, function(item) {
			if (inArray(item, array2) !== -1) {
				result.push(item);
			}
		});
		return result.length ? result : null;
	}


	/**
	Forces anything into an array.

	@method toArray
	@static
	@param {Object} obj Object with length field.
	@return {Array} Array object containing all items.
	*/
	function toArray(obj) {
		var i, arr = [];

		for (i = 0; i < obj.length; i++) {
			arr[i] = obj[i];
		}

		return arr;
	}


	/**
	Generates an unique ID. The only way a user would be able to get the same ID is if the two persons
	at the same exact millisecond manage to get the same 5 random numbers between 0-65535; it also uses
	a counter so each ID is guaranteed to be unique for the given page. It is more probable for the earth
	to be hit with an asteroid.

	@method guid
	@static
	@param {String} prefix to prepend (by default 'o' will be prepended).
	@method guid
	@return {String} Virtually unique id.
	*/
	var guid = (function() {
		var counter = 0;

		return function(prefix) {
			var guid = new Date().getTime().toString(32), i;

			for (i = 0; i < 5; i++) {
				guid += Math.floor(Math.random() * 65535).toString(32);
			}

			return (prefix || 'o_') + guid + (counter++).toString(32);
		};
	}());


	/**
	Trims white spaces around the string

	@method trim
	@static
	@param {String} str
	@return {String}
	*/
	function trim(str) {
		if (!str) {
			return str;
		}
		return String.prototype.trim ? String.prototype.trim.call(str) : str.toString().replace(/^\s*/, '').replace(/\s*$/, '');
	}


	/**
	Parses the specified size string into a byte value. For example 10kb becomes 10240.

	@method parseSizeStr
	@static
	@param {String/Number} size String to parse or number to just pass through.
	@return {Number} Size in bytes.
	*/
	function parseSizeStr(size) {
		if (typeof(size) !== 'string') {
			return size;
		}

		var muls = {
				t: 1099511627776,
				g: 1073741824,
				m: 1048576,
				k: 1024
			},
			mul;

		size = /^([0-9\.]+)([tmgk]?)$/.exec(size.toLowerCase().replace(/[^0-9\.tmkg]/g, ''));
		mul = size[2];
		size = +size[1];

		if (muls.hasOwnProperty(mul)) {
			size *= muls[mul];
		}
		return Math.floor(size);
	}


	/**
	 * Pseudo sprintf implementation - simple way to replace tokens with specified values.
	 *
	 * @param {String} str String with tokens
	 * @return {String} String with replaced tokens
	 */
	function sprintf(str) {
		var args = [].slice.call(arguments, 1);

		return str.replace(/%[a-z]/g, function() {
			var value = args.shift();
			return typeOf(value) !== 'undefined' ? value : '';
		});
	}



	function delay(cb, timeout) {
		var self = this;
		setTimeout(function() {
			cb.call(self);
		}, timeout || 1);
	}


	return {
		guid: guid,
		typeOf: typeOf,
		extend: extend,
		extendIf: extendIf,
		extendImmutable: extendImmutable,
		extendImmutableIf: extendImmutableIf,
		inherit: inherit,
		each: each,
		isEmptyObj: isEmptyObj,
		inSeries: inSeries,
		inParallel: inParallel,
		inArray: inArray,
		arrayDiff: arrayDiff,
		arrayIntersect: arrayIntersect,
		toArray: toArray,
		trim: trim,
		sprintf: sprintf,
		parseSizeStr: parseSizeStr,
		delay: delay
	};
});

// Included from: src/javascript/core/utils/Encode.js

/**
 * Encode.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/core/utils/Encode', [], function() {

	/**
	@class moxie/core/utils/Encode
	*/

	/**
	Encode string with UTF-8

	@method utf8_encode
	@for Utils
	@static
	@param {String} str String to encode
	@return {String} UTF-8 encoded string
	*/
	var utf8_encode = function(str) {
		return unescape(encodeURIComponent(str));
	};
	
	/**
	Decode UTF-8 encoded string

	@method utf8_decode
	@static
	@param {String} str String to decode
	@return {String} Decoded string
	*/
	var utf8_decode = function(str_data) {
		return decodeURIComponent(escape(str_data));
	};
	
	/**
	Decode Base64 encoded string (uses browser's default method if available),
	from: https://raw.github.com/kvz/phpjs/master/functions/url/base64_decode.js

	@method atob
	@static
	@param {String} data String to decode
	@return {String} Decoded string
	*/
	var atob = function(data, utf8) {
		if (typeof(window.atob) === 'function') {
			return utf8 ? utf8_decode(window.atob(data)) : window.atob(data);
		}

		// http://kevin.vanzonneveld.net
		// +   original by: Tyler Akins (http://rumkin.com)
		// +   improved by: Thunder.m
		// +      input by: Aman Gupta
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Onno Marsman
		// +   bugfixed by: Pellentesque Malesuada
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +      input by: Brett Zamir (http://brett-zamir.me)
		// +   bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// *     example 1: base64_decode('S2V2aW4gdmFuIFpvbm5ldmVsZA==');
		// *     returns 1: 'Kevin van Zonneveld'
		// mozilla has this native
		// - but breaks in 2.0.0.12!
		//if (typeof this.window.atob == 'function') {
		//    return atob(data);
		//}
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = "",
			tmp_arr = [];

		if (!data) {
			return data;
		}

		data += '';

		do { // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));

			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;

			if (h3 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
				tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
				tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		} while (i < data.length);

		dec = tmp_arr.join('');

		return utf8 ? utf8_decode(dec) : dec;
	};
	
	/**
	Base64 encode string (uses browser's default method if available),
	from: https://raw.github.com/kvz/phpjs/master/functions/url/base64_encode.js

	@method btoa
	@static
	@param {String} data String to encode
	@return {String} Base64 encoded string
	*/
	var btoa = function(data, utf8) {
		if (utf8) {
			data = utf8_encode(data);
		}

		if (typeof(window.btoa) === 'function') {
			return window.btoa(data);
		}

		// http://kevin.vanzonneveld.net
		// +   original by: Tyler Akins (http://rumkin.com)
		// +   improved by: Bayron Guevara
		// +   improved by: Thunder.m
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   bugfixed by: Pellentesque Malesuada
		// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
		// +   improved by: Rafał Kukawski (http://kukawski.pl)
		// *     example 1: base64_encode('Kevin van Zonneveld');
		// *     returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
		// mozilla has this native
		// - but breaks in 2.0.0.12!
		var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
		var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = "",
			tmp_arr = [];

		if (!data) {
			return data;
		}

		do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);

			bits = o1 << 16 | o2 << 8 | o3;

			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;

			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		} while (i < data.length);

		enc = tmp_arr.join('');

		var r = data.length % 3;

		return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	};


	return {
		utf8_encode: utf8_encode,
		utf8_decode: utf8_decode,
		atob: atob,
		btoa: btoa
	};
});

// Included from: src/javascript/core/utils/Env.js

/**
 * Env.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define("moxie/core/utils/Env", [
	"moxie/core/utils/Basic"
], function(Basic) {
	
	/**
	 * UAParser.js v0.7.7
	 * Lightweight JavaScript-based User-Agent string parser
	 * https://github.com/faisalman/ua-parser-js
	 *
	 * Copyright © 2012-2015 Faisal Salman <fyzlman@gmail.com>
	 * Dual licensed under GPLv2 & MIT
	 */
	var UAParser = (function (undefined) {

	    //////////////
	    // Constants
	    /////////////


	    var EMPTY       = '',
	        UNKNOWN     = '?',
	        FUNC_TYPE   = 'function',
	        UNDEF_TYPE  = 'undefined',
	        OBJ_TYPE    = 'object',
	        MAJOR       = 'major',
	        MODEL       = 'model',
	        NAME        = 'name',
	        TYPE        = 'type',
	        VENDOR      = 'vendor',
	        VERSION     = 'version',
	        ARCHITECTURE= 'architecture',
	        CONSOLE     = 'console',
	        MOBILE      = 'mobile',
	        TABLET      = 'tablet';


	    ///////////
	    // Helper
	    //////////


	    var util = {
	        has : function (str1, str2) {
	            return str2.toLowerCase().indexOf(str1.toLowerCase()) !== -1;
	        },
	        lowerize : function (str) {
	            return str.toLowerCase();
	        }
	    };


	    ///////////////
	    // Map helper
	    //////////////


	    var mapper = {

	        rgx : function () {

	            // loop through all regexes maps
	            for (var result, i = 0, j, k, p, q, matches, match, args = arguments; i < args.length; i += 2) {

	                var regex = args[i],       // even sequence (0,2,4,..)
	                    props = args[i + 1];   // odd sequence (1,3,5,..)

	                // construct object barebones
	                if (typeof(result) === UNDEF_TYPE) {
	                    result = {};
	                    for (p in props) {
	                        q = props[p];
	                        if (typeof(q) === OBJ_TYPE) {
	                            result[q[0]] = undefined;
	                        } else {
	                            result[q] = undefined;
	                        }
	                    }
	                }

	                // try matching uastring with regexes
	                for (j = k = 0; j < regex.length; j++) {
	                    matches = regex[j].exec(this.getUA());
	                    if (!!matches) {
	                        for (p = 0; p < props.length; p++) {
	                            match = matches[++k];
	                            q = props[p];
	                            // check if given property is actually array
	                            if (typeof(q) === OBJ_TYPE && q.length > 0) {
	                                if (q.length == 2) {
	                                    if (typeof(q[1]) == FUNC_TYPE) {
	                                        // assign modified match
	                                        result[q[0]] = q[1].call(this, match);
	                                    } else {
	                                        // assign given value, ignore regex match
	                                        result[q[0]] = q[1];
	                                    }
	                                } else if (q.length == 3) {
	                                    // check whether function or regex
	                                    if (typeof(q[1]) === FUNC_TYPE && !(q[1].exec && q[1].test)) {
	                                        // call function (usually string mapper)
	                                        result[q[0]] = match ? q[1].call(this, match, q[2]) : undefined;
	                                    } else {
	                                        // sanitize match using given regex
	                                        result[q[0]] = match ? match.replace(q[1], q[2]) : undefined;
	                                    }
	                                } else if (q.length == 4) {
	                                        result[q[0]] = match ? q[3].call(this, match.replace(q[1], q[2])) : undefined;
	                                }
	                            } else {
	                                result[q] = match ? match : undefined;
	                            }
	                        }
	                        break;
	                    }
	                }

	                if(!!matches) break; // break the loop immediately if match found
	            }
	            return result;
	        },

	        str : function (str, map) {

	            for (var i in map) {
	                // check if array
	                if (typeof(map[i]) === OBJ_TYPE && map[i].length > 0) {
	                    for (var j = 0; j < map[i].length; j++) {
	                        if (util.has(map[i][j], str)) {
	                            return (i === UNKNOWN) ? undefined : i;
	                        }
	                    }
	                } else if (util.has(map[i], str)) {
	                    return (i === UNKNOWN) ? undefined : i;
	                }
	            }
	            return str;
	        }
	    };


	    ///////////////
	    // String map
	    //////////////


	    var maps = {

	        browser : {
	            oldsafari : {
	                major : {
	                    '1' : ['/8', '/1', '/3'],
	                    '2' : '/4',
	                    '?' : '/'
	                },
	                version : {
	                    '1.0'   : '/8',
	                    '1.2'   : '/1',
	                    '1.3'   : '/3',
	                    '2.0'   : '/412',
	                    '2.0.2' : '/416',
	                    '2.0.3' : '/417',
	                    '2.0.4' : '/419',
	                    '?'     : '/'
	                }
	            }
	        },

	        device : {
	            sprint : {
	                model : {
	                    'Evo Shift 4G' : '7373KT'
	                },
	                vendor : {
	                    'HTC'       : 'APA',
	                    'Sprint'    : 'Sprint'
	                }
	            }
	        },

	        os : {
	            windows : {
	                version : {
	                    'ME'        : '4.90',
	                    'NT 3.11'   : 'NT3.51',
	                    'NT 4.0'    : 'NT4.0',
	                    '2000'      : 'NT 5.0',
	                    'XP'        : ['NT 5.1', 'NT 5.2'],
	                    'Vista'     : 'NT 6.0',
	                    '7'         : 'NT 6.1',
	                    '8'         : 'NT 6.2',
	                    '8.1'       : 'NT 6.3',
	                    'RT'        : 'ARM'
	                }
	            }
	        }
	    };


	    //////////////
	    // Regex map
	    /////////////


	    var regexes = {

	        browser : [[
	        
	            // Presto based
	            /(opera\smini)\/([\w\.-]+)/i,                                       // Opera Mini
	            /(opera\s[mobiletab]+).+version\/([\w\.-]+)/i,                      // Opera Mobi/Tablet
	            /(opera).+version\/([\w\.]+)/i,                                     // Opera > 9.80
	            /(opera)[\/\s]+([\w\.]+)/i                                          // Opera < 9.80

	            ], [NAME, VERSION], [

	            /\s(opr)\/([\w\.]+)/i                                               // Opera Webkit
	            ], [[NAME, 'Opera'], VERSION], [

	            // Mixed
	            /(kindle)\/([\w\.]+)/i,                                             // Kindle
	            /(lunascape|maxthon|netfront|jasmine|blazer)[\/\s]?([\w\.]+)*/i,
	                                                                                // Lunascape/Maxthon/Netfront/Jasmine/Blazer

	            // Trident based
	            /(avant\s|iemobile|slim|baidu)(?:browser)?[\/\s]?([\w\.]*)/i,
	                                                                                // Avant/IEMobile/SlimBrowser/Baidu
	            /(?:ms|\()(ie)\s([\w\.]+)/i,                                        // Internet Explorer

	            // Webkit/KHTML based
	            /(rekonq)\/([\w\.]+)*/i,                                            // Rekonq
	            /(chromium|flock|rockmelt|midori|epiphany|silk|skyfire|ovibrowser|bolt|iron|vivaldi)\/([\w\.-]+)/i
	                                                                                // Chromium/Flock/RockMelt/Midori/Epiphany/Silk/Skyfire/Bolt/Iron
	            ], [NAME, VERSION], [

	            /(trident).+rv[:\s]([\w\.]+).+like\sgecko/i                         // IE11
	            ], [[NAME, 'IE'], VERSION], [

	            /(edge)\/((\d+)?[\w\.]+)/i                                          // Microsoft Edge
	            ], [NAME, VERSION], [

	            /(yabrowser)\/([\w\.]+)/i                                           // Yandex
	            ], [[NAME, 'Yandex'], VERSION], [

	            /(comodo_dragon)\/([\w\.]+)/i                                       // Comodo Dragon
	            ], [[NAME, /_/g, ' '], VERSION], [

	            /(chrome|omniweb|arora|[tizenoka]{5}\s?browser)\/v?([\w\.]+)/i,
	                                                                                // Chrome/OmniWeb/Arora/Tizen/Nokia
	            /(uc\s?browser|qqbrowser)[\/\s]?([\w\.]+)/i
	                                                                                // UCBrowser/QQBrowser
	            ], [NAME, VERSION], [

	            /(dolfin)\/([\w\.]+)/i                                              // Dolphin
	            ], [[NAME, 'Dolphin'], VERSION], [

	            /((?:android.+)crmo|crios)\/([\w\.]+)/i                             // Chrome for Android/iOS
	            ], [[NAME, 'Chrome'], VERSION], [

	            /XiaoMi\/MiuiBrowser\/([\w\.]+)/i                                   // MIUI Browser
	            ], [VERSION, [NAME, 'MIUI Browser']], [

	            /android.+version\/([\w\.]+)\s+(?:mobile\s?safari|safari)/i         // Android Browser
	            ], [VERSION, [NAME, 'Android Browser']], [

	            /FBAV\/([\w\.]+);/i                                                 // Facebook App for iOS
	            ], [VERSION, [NAME, 'Facebook']], [

	            /version\/([\w\.]+).+?mobile\/\w+\s(safari)/i                       // Mobile Safari
	            ], [VERSION, [NAME, 'Mobile Safari']], [

	            /version\/([\w\.]+).+?(mobile\s?safari|safari)/i                    // Safari & Safari Mobile
	            ], [VERSION, NAME], [

	            /webkit.+?(mobile\s?safari|safari)(\/[\w\.]+)/i                     // Safari < 3.0
	            ], [NAME, [VERSION, mapper.str, maps.browser.oldsafari.version]], [

	            /(konqueror)\/([\w\.]+)/i,                                          // Konqueror
	            /(webkit|khtml)\/([\w\.]+)/i
	            ], [NAME, VERSION], [

	            // Gecko based
	            /(navigator|netscape)\/([\w\.-]+)/i                                 // Netscape
	            ], [[NAME, 'Netscape'], VERSION], [
	            /(swiftfox)/i,                                                      // Swiftfox
	            /(icedragon|iceweasel|camino|chimera|fennec|maemo\sbrowser|minimo|conkeror)[\/\s]?([\w\.\+]+)/i,
	                                                                                // IceDragon/Iceweasel/Camino/Chimera/Fennec/Maemo/Minimo/Conkeror
	            /(firefox|seamonkey|k-meleon|icecat|iceape|firebird|phoenix)\/([\w\.-]+)/i,
	                                                                                // Firefox/SeaMonkey/K-Meleon/IceCat/IceApe/Firebird/Phoenix
	            /(mozilla)\/([\w\.]+).+rv\:.+gecko\/\d+/i,                          // Mozilla

	            // Other
	            /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf)[\/\s]?([\w\.]+)/i,
	                                                                                // Polaris/Lynx/Dillo/iCab/Doris/Amaya/w3m/NetSurf
	            /(links)\s\(([\w\.]+)/i,                                            // Links
	            /(gobrowser)\/?([\w\.]+)*/i,                                        // GoBrowser
	            /(ice\s?browser)\/v?([\w\._]+)/i,                                   // ICE Browser
	            /(mosaic)[\/\s]([\w\.]+)/i                                          // Mosaic
	            ], [NAME, VERSION]
	        ],

	        engine : [[

	            /windows.+\sedge\/([\w\.]+)/i                                       // EdgeHTML
	            ], [VERSION, [NAME, 'EdgeHTML']], [

	            /(presto)\/([\w\.]+)/i,                                             // Presto
	            /(webkit|trident|netfront|netsurf|amaya|lynx|w3m)\/([\w\.]+)/i,     // WebKit/Trident/NetFront/NetSurf/Amaya/Lynx/w3m
	            /(khtml|tasman|links)[\/\s]\(?([\w\.]+)/i,                          // KHTML/Tasman/Links
	            /(icab)[\/\s]([23]\.[\d\.]+)/i                                      // iCab
	            ], [NAME, VERSION], [

	            /rv\:([\w\.]+).*(gecko)/i                                           // Gecko
	            ], [VERSION, NAME]
	        ],

	        os : [[

	            // Windows based
	            /microsoft\s(windows)\s(vista|xp)/i                                 // Windows (iTunes)
	            ], [NAME, VERSION], [
	            /(windows)\snt\s6\.2;\s(arm)/i,                                     // Windows RT
	            /(windows\sphone(?:\sos)*|windows\smobile|windows)[\s\/]?([ntce\d\.\s]+\w)/i
	            ], [NAME, [VERSION, mapper.str, maps.os.windows.version]], [
	            /(win(?=3|9|n)|win\s9x\s)([nt\d\.]+)/i
	            ], [[NAME, 'Windows'], [VERSION, mapper.str, maps.os.windows.version]], [

	            // Mobile/Embedded OS
	            /\((bb)(10);/i                                                      // BlackBerry 10
	            ], [[NAME, 'BlackBerry'], VERSION], [
	            /(blackberry)\w*\/?([\w\.]+)*/i,                                    // Blackberry
	            /(tizen)[\/\s]([\w\.]+)/i,                                          // Tizen
	            /(android|webos|palm\os|qnx|bada|rim\stablet\sos|meego|contiki)[\/\s-]?([\w\.]+)*/i,
	                                                                                // Android/WebOS/Palm/QNX/Bada/RIM/MeeGo/Contiki
	            /linux;.+(sailfish);/i                                              // Sailfish OS
	            ], [NAME, VERSION], [
	            /(symbian\s?os|symbos|s60(?=;))[\/\s-]?([\w\.]+)*/i                 // Symbian
	            ], [[NAME, 'Symbian'], VERSION], [
	            /\((series40);/i                                                    // Series 40
	            ], [NAME], [
	            /mozilla.+\(mobile;.+gecko.+firefox/i                               // Firefox OS
	            ], [[NAME, 'Firefox OS'], VERSION], [

	            // Console
	            /(nintendo|playstation)\s([wids3portablevu]+)/i,                    // Nintendo/Playstation

	            // GNU/Linux based
	            /(mint)[\/\s\(]?(\w+)*/i,                                           // Mint
	            /(mageia|vectorlinux)[;\s]/i,                                       // Mageia/VectorLinux
	            /(joli|[kxln]?ubuntu|debian|[open]*suse|gentoo|arch|slackware|fedora|mandriva|centos|pclinuxos|redhat|zenwalk|linpus)[\/\s-]?([\w\.-]+)*/i,
	                                                                                // Joli/Ubuntu/Debian/SUSE/Gentoo/Arch/Slackware
	                                                                                // Fedora/Mandriva/CentOS/PCLinuxOS/RedHat/Zenwalk/Linpus
	            /(hurd|linux)\s?([\w\.]+)*/i,                                       // Hurd/Linux
	            /(gnu)\s?([\w\.]+)*/i                                               // GNU
	            ], [NAME, VERSION], [

	            /(cros)\s[\w]+\s([\w\.]+\w)/i                                       // Chromium OS
	            ], [[NAME, 'Chromium OS'], VERSION],[

	            // Solaris
	            /(sunos)\s?([\w\.]+\d)*/i                                           // Solaris
	            ], [[NAME, 'Solaris'], VERSION], [

	            // BSD based
	            /\s([frentopc-]{0,4}bsd|dragonfly)\s?([\w\.]+)*/i                   // FreeBSD/NetBSD/OpenBSD/PC-BSD/DragonFly
	            ], [NAME, VERSION],[

	            /(ip[honead]+)(?:.*os\s*([\w]+)*\slike\smac|;\sopera)/i             // iOS
	            ], [[NAME, 'iOS'], [VERSION, /_/g, '.']], [

	            /(mac\sos\sx)\s?([\w\s\.]+\w)*/i,
	            /(macintosh|mac(?=_powerpc)\s)/i                                    // Mac OS
	            ], [[NAME, 'Mac OS'], [VERSION, /_/g, '.']], [

	            // Other
	            /((?:open)?solaris)[\/\s-]?([\w\.]+)*/i,                            // Solaris
	            /(haiku)\s(\w+)/i,                                                  // Haiku
	            /(aix)\s((\d)(?=\.|\)|\s)[\w\.]*)*/i,                               // AIX
	            /(plan\s9|minix|beos|os\/2|amigaos|morphos|risc\sos|openvms)/i,
	                                                                                // Plan9/Minix/BeOS/OS2/AmigaOS/MorphOS/RISCOS/OpenVMS
	            /(unix)\s?([\w\.]+)*/i                                              // UNIX
	            ], [NAME, VERSION]
	        ]
	    };


	    /////////////////
	    // Constructor
	    ////////////////


	    var UAParser = function (uastring) {

	        var ua = uastring || ((window && window.navigator && window.navigator.userAgent) ? window.navigator.userAgent : EMPTY);

	        this.getBrowser = function () {
	            return mapper.rgx.apply(this, regexes.browser);
	        };
	        this.getEngine = function () {
	            return mapper.rgx.apply(this, regexes.engine);
	        };
	        this.getOS = function () {
	            return mapper.rgx.apply(this, regexes.os);
	        };
	        this.getResult = function() {
	            return {
	                ua      : this.getUA(),
	                browser : this.getBrowser(),
	                engine  : this.getEngine(),
	                os      : this.getOS()
	            };
	        };
	        this.getUA = function () {
	            return ua;
	        };
	        this.setUA = function (uastring) {
	            ua = uastring;
	            return this;
	        };
	        this.setUA(ua);
	    };

	    return UAParser;
	})();


	function version_compare(v1, v2, operator) {
	  // From: http://phpjs.org/functions
	  // +      original by: Philippe Jausions (http://pear.php.net/user/jausions)
	  // +      original by: Aidan Lister (http://aidanlister.com/)
	  // + reimplemented by: Kankrelune (http://www.webfaktory.info/)
	  // +      improved by: Brett Zamir (http://brett-zamir.me)
	  // +      improved by: Scott Baker
	  // +      improved by: Theriault
	  // *        example 1: version_compare('8.2.5rc', '8.2.5a');
	  // *        returns 1: 1
	  // *        example 2: version_compare('8.2.50', '8.2.52', '<');
	  // *        returns 2: true
	  // *        example 3: version_compare('5.3.0-dev', '5.3.0');
	  // *        returns 3: -1
	  // *        example 4: version_compare('4.1.0.52','4.01.0.51');
	  // *        returns 4: 1

	  // Important: compare must be initialized at 0.
	  var i = 0,
	    x = 0,
	    compare = 0,
	    // vm maps textual PHP versions to negatives so they're less than 0.
	    // PHP currently defines these as CASE-SENSITIVE. It is important to
	    // leave these as negatives so that they can come before numerical versions
	    // and as if no letters were there to begin with.
	    // (1alpha is < 1 and < 1.1 but > 1dev1)
	    // If a non-numerical value can't be mapped to this table, it receives
	    // -7 as its value.
	    vm = {
	      'dev': -6,
	      'alpha': -5,
	      'a': -5,
	      'beta': -4,
	      'b': -4,
	      'RC': -3,
	      'rc': -3,
	      '#': -2,
	      'p': 1,
	      'pl': 1
	    },
	    // This function will be called to prepare each version argument.
	    // It replaces every _, -, and + with a dot.
	    // It surrounds any nonsequence of numbers/dots with dots.
	    // It replaces sequences of dots with a single dot.
	    //    version_compare('4..0', '4.0') == 0
	    // Important: A string of 0 length needs to be converted into a value
	    // even less than an unexisting value in vm (-7), hence [-8].
	    // It's also important to not strip spaces because of this.
	    //   version_compare('', ' ') == 1
	    prepVersion = function (v) {
	      v = ('' + v).replace(/[_\-+]/g, '.');
	      v = v.replace(/([^.\d]+)/g, '.$1.').replace(/\.{2,}/g, '.');
	      return (!v.length ? [-8] : v.split('.'));
	    },
	    // This converts a version component to a number.
	    // Empty component becomes 0.
	    // Non-numerical component becomes a negative number.
	    // Numerical component becomes itself as an integer.
	    numVersion = function (v) {
	      return !v ? 0 : (isNaN(v) ? vm[v] || -7 : parseInt(v, 10));
	    };

	  v1 = prepVersion(v1);
	  v2 = prepVersion(v2);
	  x = Math.max(v1.length, v2.length);
	  for (i = 0; i < x; i++) {
	    if (v1[i] == v2[i]) {
	      continue;
	    }
	    v1[i] = numVersion(v1[i]);
	    v2[i] = numVersion(v2[i]);
	    if (v1[i] < v2[i]) {
	      compare = -1;
	      break;
	    } else if (v1[i] > v2[i]) {
	      compare = 1;
	      break;
	    }
	  }
	  if (!operator) {
	    return compare;
	  }

	  // Important: operator is CASE-SENSITIVE.
	  // "No operator" seems to be treated as "<."
	  // Any other values seem to make the function return null.
	  switch (operator) {
	  case '>':
	  case 'gt':
	    return (compare > 0);
	  case '>=':
	  case 'ge':
	    return (compare >= 0);
	  case '<=':
	  case 'le':
	    return (compare <= 0);
	  case '==':
	  case '=':
	  case 'eq':
	    return (compare === 0);
	  case '<>':
	  case '!=':
	  case 'ne':
	    return (compare !== 0);
	  case '':
	  case '<':
	  case 'lt':
	    return (compare < 0);
	  default:
	    return null;
	  }
	}


	var can = (function() {
		var caps = {
				define_property: (function() {
					/* // currently too much extra code required, not exactly worth it
					try { // as of IE8, getters/setters are supported only on DOM elements
						var obj = {};
						if (Object.defineProperty) {
							Object.defineProperty(obj, 'prop', {
								enumerable: true,
								configurable: true
							});
							return true;
						}
					} catch(ex) {}

					if (Object.prototype.__defineGetter__ && Object.prototype.__defineSetter__) {
						return true;
					}*/
					return false;
				}()),

				create_canvas: (function() {
					// On the S60 and BB Storm, getContext exists, but always returns undefined
					// so we actually have to call getContext() to verify
					// github.com/Modernizr/Modernizr/issues/issue/97/
					var el = document.createElement('canvas');
					return !!(el.getContext && el.getContext('2d'));
				}()),

				return_response_type: function(responseType) {
					try {
						if (Basic.inArray(responseType, ['', 'text', 'document']) !== -1) {
							return true;
						} else if (window.XMLHttpRequest) {
							var xhr = new XMLHttpRequest();
							xhr.open('get', '/'); // otherwise Gecko throws an exception
							if ('responseType' in xhr) {
								xhr.responseType = responseType;
								// as of 23.0.1271.64, Chrome switched from throwing exception to merely logging it to the console (why? o why?)
								if (xhr.responseType !== responseType) {
									return false;
								}
								return true;
							}
						}
					} catch (ex) {}
					return false;
				},

				// ideas for this heavily come from Modernizr (http://modernizr.com/)
				use_data_uri: (function() {
					var du = new Image();

					du.onload = function() {
						caps.use_data_uri = (du.width === 1 && du.height === 1);
					};
					
					setTimeout(function() {
						du.src = "data:image/gif;base64,R0lGODlhAQABAIAAAP8AAAAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==";
					}, 1);
					return false;
				}()),

				use_data_uri_over32kb: function() { // IE8
					return caps.use_data_uri && (Env.browser !== 'IE' || Env.version >= 9);
				},

				use_data_uri_of: function(bytes) {
					return (caps.use_data_uri && bytes < 33000 || caps.use_data_uri_over32kb());
				},

				use_fileinput: function() {
					if (navigator.userAgent.match(/(Android (1.0|1.1|1.5|1.6|2.0|2.1))|(Windows Phone (OS 7|8.0))|(XBLWP)|(ZuneWP)|(w(eb)?OSBrowser)|(webOS)|(Kindle\/(1.0|2.0|2.5|3.0))/)) {
						return false;
					}

					var el = document.createElement('input');
					el.setAttribute('type', 'file');
					return !el.disabled;
				}
			};

		return function(cap) {
			var args = [].slice.call(arguments);
			args.shift(); // shift of cap
			return Basic.typeOf(caps[cap]) === 'function' ? caps[cap].apply(this, args) : !!caps[cap];
		};
	}());


	var uaResult = new UAParser().getResult();


	var Env = {
		can: can,

		uaParser: UAParser,
		
		browser: uaResult.browser.name,
		version: uaResult.browser.version,
		os: uaResult.os.name, // everybody intuitively types it in a lowercase for some reason
		osVersion: uaResult.os.version,

		verComp: version_compare,
		
		swf_url: "../flash/Moxie.swf",
		xap_url: "../silverlight/Moxie.xap",
		global_event_dispatcher: "moxie.core.EventTarget.instance.dispatchEvent"
	};

	// for backward compatibility
	// @deprecated Use `Env.os` instead
	Env.OS = Env.os;

	if (MXI_DEBUG) {
		Env.debug = {
			runtime: true,
			events: false
		};

		Env.log = function() {
			
			function logObj(data) {
				// TODO: this should recursively print out the object in a pretty way
				console.appendChild(document.createTextNode(data + "\n"));
			}

			var data = arguments[0];

			if (Basic.typeOf(data) === 'string') {
				data = Basic.sprintf.apply(this, arguments);
			}

			if (window && window.console && window.console.log) {
				window.console.log(data);
			} else if (document) {
				var console = document.getElementById('moxie-console');
				if (!console) {
					console = document.createElement('pre');
					console.id = 'moxie-console';
					//console.style.display = 'none';
					document.body.appendChild(console);
				}

				if (Basic.inArray(Basic.typeOf(data), ['object', 'array']) !== -1) {
					logObj(data);
				} else {
					console.appendChild(document.createTextNode(data + "\n"));
				}
			}
		};
	}

	return Env;
});

// Included from: src/javascript/core/Exceptions.js

/**
 * Exceptions.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/core/Exceptions', [
	'moxie/core/utils/Basic'
], function(Basic) {
	
	function _findKey(obj, value) {
		var key;
		for (key in obj) {
			if (obj[key] === value) {
				return key;
			}
		}
		return null;
	}

	/**
	@class moxie/core/Exception
	*/
	return {
		RuntimeError: (function() {
			var namecodes = {
				NOT_INIT_ERR: 1,
				EXCEPTION_ERR: 3,
				NOT_SUPPORTED_ERR: 9,
				JS_ERR: 4
			};

			function RuntimeError(code, message) {
				this.code = code;
				this.name = _findKey(namecodes, code);
				this.message = this.name + (message || ": RuntimeError " + this.code);
			}
			
			Basic.extend(RuntimeError, namecodes);
			RuntimeError.prototype = Error.prototype;
			return RuntimeError;
		}()),
		
		OperationNotAllowedException: (function() {
			
			function OperationNotAllowedException(code) {
				this.code = code;
				this.name = 'OperationNotAllowedException';
			}
			
			Basic.extend(OperationNotAllowedException, {
				NOT_ALLOWED_ERR: 1
			});
			
			OperationNotAllowedException.prototype = Error.prototype;
			
			return OperationNotAllowedException;
		}()),

		ImageError: (function() {
			var namecodes = {
				WRONG_FORMAT: 1,
				MAX_RESOLUTION_ERR: 2,
				INVALID_META_ERR: 3
			};

			function ImageError(code) {
				this.code = code;
				this.name = _findKey(namecodes, code);
				this.message = this.name + ": ImageError " + this.code;
			}
			
			Basic.extend(ImageError, namecodes);
			ImageError.prototype = Error.prototype;

			return ImageError;
		}()),

		FileException: (function() {
			var namecodes = {
				NOT_FOUND_ERR: 1,
				SECURITY_ERR: 2,
				ABORT_ERR: 3,
				NOT_READABLE_ERR: 4,
				ENCODING_ERR: 5,
				NO_MODIFICATION_ALLOWED_ERR: 6,
				INVALID_STATE_ERR: 7,
				SYNTAX_ERR: 8
			};

			function FileException(code) {
				this.code = code;
				this.name = _findKey(namecodes, code);
				this.message = this.name + ": FileException " + this.code;
			}
			
			Basic.extend(FileException, namecodes);
			FileException.prototype = Error.prototype;
			return FileException;
		}()),
		
		DOMException: (function() {
			var namecodes = {
				INDEX_SIZE_ERR: 1,
				DOMSTRING_SIZE_ERR: 2,
				HIERARCHY_REQUEST_ERR: 3,
				WRONG_DOCUMENT_ERR: 4,
				INVALID_CHARACTER_ERR: 5,
				NO_DATA_ALLOWED_ERR: 6,
				NO_MODIFICATION_ALLOWED_ERR: 7,
				NOT_FOUND_ERR: 8,
				NOT_SUPPORTED_ERR: 9,
				INUSE_ATTRIBUTE_ERR: 10,
				INVALID_STATE_ERR: 11,
				SYNTAX_ERR: 12,
				INVALID_MODIFICATION_ERR: 13,
				NAMESPACE_ERR: 14,
				INVALID_ACCESS_ERR: 15,
				VALIDATION_ERR: 16,
				TYPE_MISMATCH_ERR: 17,
				SECURITY_ERR: 18,
				NETWORK_ERR: 19,
				ABORT_ERR: 20,
				URL_MISMATCH_ERR: 21,
				QUOTA_EXCEEDED_ERR: 22,
				TIMEOUT_ERR: 23,
				INVALID_NODE_TYPE_ERR: 24,
				DATA_CLONE_ERR: 25
			};

			function DOMException(code) {
				this.code = code;
				this.name = _findKey(namecodes, code);
				this.message = this.name + ": DOMException " + this.code;
			}
			
			Basic.extend(DOMException, namecodes);
			DOMException.prototype = Error.prototype;
			return DOMException;
		}()),
		
		EventException: (function() {
			function EventException(code) {
				this.code = code;
				this.name = 'EventException';
			}
			
			Basic.extend(EventException, {
				UNSPECIFIED_EVENT_TYPE_ERR: 0
			});
			
			EventException.prototype = Error.prototype;
			
			return EventException;
		}())
	};
});

// Included from: src/javascript/core/utils/Dom.js

/**
 * Dom.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/core/utils/Dom', ['moxie/core/utils/Env'], function(Env) {

	/**
	Get DOM Element by it's id.

	@method get
	@for Utils
	@param {String} id Identifier of the DOM Element
	@return {DOMElement}
	*/
	var get = function(id) {
		if (typeof id !== 'string') {
			return id;
		}
		return document.getElementById(id);
	};

	/**
	Checks if specified DOM element has specified class.

	@method hasClass
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Class name
	*/
	var hasClass = function(obj, name) {
		if (!obj.className) {
			return false;
		}

		var regExp = new RegExp("(^|\\s+)"+name+"(\\s+|$)");
		return regExp.test(obj.className);
	};

	/**
	Adds specified className to specified DOM element.

	@method addClass
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Class name
	*/
	var addClass = function(obj, name) {
		if (!hasClass(obj, name)) {
			obj.className = !obj.className ? name : obj.className.replace(/\s+$/, '') + ' ' + name;
		}
	};

	/**
	Removes specified className from specified DOM element.

	@method removeClass
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Class name
	*/
	var removeClass = function(obj, name) {
		if (obj.className) {
			var regExp = new RegExp("(^|\\s+)"+name+"(\\s+|$)");
			obj.className = obj.className.replace(regExp, function($0, $1, $2) {
				return $1 === ' ' && $2 === ' ' ? ' ' : '';
			});
		}
	};

	/**
	Returns a given computed style of a DOM element.

	@method getStyle
	@static
	@param {Object} obj DOM element like object.
	@param {String} name Style you want to get from the DOM element
	*/
	var getStyle = function(obj, name) {
		if (obj.currentStyle) {
			return obj.currentStyle[name];
		} else if (window.getComputedStyle) {
			return window.getComputedStyle(obj, null)[name];
		}
	};


	/**
	Returns the absolute x, y position of an Element. The position will be returned in a object with x, y fields.

	@method getPos
	@static
	@param {Element} node HTML element or element id to get x, y position from.
	@param {Element} root Optional root element to stop calculations at.
	@return {object} Absolute position of the specified element object with x, y fields.
	*/
	var getPos = function(node, root) {
		var x = 0, y = 0, parent, doc = document, nodeRect, rootRect;

		node = node;
		root = root || doc.body;

		// Returns the x, y cordinate for an element on IE 6 and IE 7
		function getIEPos(node) {
			var bodyElm, rect, x = 0, y = 0;

			if (node) {
				rect = node.getBoundingClientRect();
				bodyElm = doc.compatMode === "CSS1Compat" ? doc.documentElement : doc.body;
				x = rect.left + bodyElm.scrollLeft;
				y = rect.top + bodyElm.scrollTop;
			}

			return {
				x : x,
				y : y
			};
		}

		// Use getBoundingClientRect on IE 6 and IE 7 but not on IE 8 in standards mode
		if (node && node.getBoundingClientRect && Env.browser === 'IE' && (!doc.documentMode || doc.documentMode < 8)) {
			nodeRect = getIEPos(node);
			rootRect = getIEPos(root);

			return {
				x : nodeRect.x - rootRect.x,
				y : nodeRect.y - rootRect.y
			};
		}

		parent = node;
		while (parent && parent != root && parent.nodeType) {
			x += parent.offsetLeft || 0;
			y += parent.offsetTop || 0;
			parent = parent.offsetParent;
		}

		parent = node.parentNode;
		while (parent && parent != root && parent.nodeType) {
			x -= parent.scrollLeft || 0;
			y -= parent.scrollTop || 0;
			parent = parent.parentNode;
		}

		return {
			x : x,
			y : y
		};
	};

	/**
	Returns the size of the specified node in pixels.

	@method getSize
	@static
	@param {Node} node Node to get the size of.
	@return {Object} Object with a w and h property.
	*/
	var getSize = function(node) {
		return {
			w : node.offsetWidth || node.clientWidth,
			h : node.offsetHeight || node.clientHeight
		};
	};

	return {
		get: get,
		hasClass: hasClass,
		addClass: addClass,
		removeClass: removeClass,
		getStyle: getStyle,
		getPos: getPos,
		getSize: getSize
	};
});

// Included from: src/javascript/core/EventTarget.js

/**
 * EventTarget.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/core/EventTarget', [
	'moxie/core/utils/Env',
	'moxie/core/Exceptions',
	'moxie/core/utils/Basic'
], function(Env, x, Basic) {

	// hash of event listeners by object uid
	var eventpool = {};

	/**
	Parent object for all event dispatching components and objects

	@class moxie/core/EventTarget
	@constructor EventTarget
	*/
	function EventTarget() {
		/**
		Unique id of the event dispatcher, usually overriden by children

		@property uid
		@type String
		*/
		this.uid = Basic.guid();
	}


	Basic.extend(EventTarget.prototype, {

		/**
		Can be called from within a child  in order to acquire uniqie id in automated manner

		@method init
		*/
		init: function() {
			if (!this.uid) {
				this.uid = Basic.guid('uid_');
			}
		},

		/**
		Register a handler to a specific event dispatched by the object

		@method addEventListener
		@param {String} type Type or basically a name of the event to subscribe to
		@param {Function} fn Callback function that will be called when event happens
		@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
		@param {Object} [scope=this] A scope to invoke event handler in
		*/
		addEventListener: function(type, fn, priority, scope) {
			var self = this, list;

			// without uid no event handlers can be added, so make sure we got one
			if (!this.hasOwnProperty('uid')) {
				this.uid = Basic.guid('uid_');
			}

			type = Basic.trim(type);

			if (/\s/.test(type)) {
				// multiple event types were passed for one handler
				Basic.each(type.split(/\s+/), function(type) {
					self.addEventListener(type, fn, priority, scope);
				});
				return;
			}

			type = type.toLowerCase();
			priority = parseInt(priority, 10) || 0;

			list = eventpool[this.uid] && eventpool[this.uid][type] || [];
			list.push({fn : fn, priority : priority, scope : scope || this});

			if (!eventpool[this.uid]) {
				eventpool[this.uid] = {};
			}
			eventpool[this.uid][type] = list;
		},

		/**
		Check if any handlers were registered to the specified event

		@method hasEventListener
		@param {String} [type] Type or basically a name of the event to check
		@return {Mixed} Returns a handler if it was found and false, if - not
		*/
		hasEventListener: function(type) {
			var list;
			if (type) {
				type = type.toLowerCase();
				list = eventpool[this.uid] && eventpool[this.uid][type];
			} else {
				list = eventpool[this.uid];
			}
			return list ? list : false;
		},

		/**
		Unregister the handler from the event, or if former was not specified - unregister all handlers

		@method removeEventListener
		@param {String} type Type or basically a name of the event
		@param {Function} [fn] Handler to unregister
		*/
		removeEventListener: function(type, fn) {
			var self = this, list, i;

			type = type.toLowerCase();

			if (/\s/.test(type)) {
				// multiple event types were passed for one handler
				Basic.each(type.split(/\s+/), function(type) {
					self.removeEventListener(type, fn);
				});
				return;
			}

			list = eventpool[this.uid] && eventpool[this.uid][type];

			if (list) {
				if (fn) {
					for (i = list.length - 1; i >= 0; i--) {
						if (list[i].fn === fn) {
							list.splice(i, 1);
							break;
						}
					}
				} else {
					list = [];
				}

				// delete event list if it has become empty
				if (!list.length) {
					delete eventpool[this.uid][type];

					// and object specific entry in a hash if it has no more listeners attached
					if (Basic.isEmptyObj(eventpool[this.uid])) {
						delete eventpool[this.uid];
					}
				}
			}
		},

		/**
		Remove all event handlers from the object

		@method removeAllEventListeners
		*/
		removeAllEventListeners: function() {
			if (eventpool[this.uid]) {
				delete eventpool[this.uid];
			}
		},

		/**
		Dispatch the event

		@method dispatchEvent
		@param {String/Object} Type of event or event object to dispatch
		@param {Mixed} [...] Variable number of arguments to be passed to a handlers
		@return {Boolean} true by default and false if any handler returned false
		*/
		dispatchEvent: function(type) {
			var uid, list, args, tmpEvt, evt = {}, result = true, undef;

			if (Basic.typeOf(type) !== 'string') {
				// we can't use original object directly (because of Silverlight)
				tmpEvt = type;

				if (Basic.typeOf(tmpEvt.type) === 'string') {
					type = tmpEvt.type;

					if (tmpEvt.total !== undef && tmpEvt.loaded !== undef) { // progress event
						evt.total = tmpEvt.total;
						evt.loaded = tmpEvt.loaded;
					}
					evt.async = tmpEvt.async || false;
				} else {
					throw new x.EventException(x.EventException.UNSPECIFIED_EVENT_TYPE_ERR);
				}
			}

			// check if event is meant to be dispatched on an object having specific uid
			if (type.indexOf('::') !== -1) {
				(function(arr) {
					uid = arr[0];
					type = arr[1];
				}(type.split('::')));
			} else {
				uid = this.uid;
			}

			type = type.toLowerCase();

			list = eventpool[uid] && eventpool[uid][type];

			if (list) {
				// sort event list by prority
				list.sort(function(a, b) { return b.priority - a.priority; });

				args = [].slice.call(arguments);

				// first argument will be pseudo-event object
				args.shift();
				evt.type = type;
				args.unshift(evt);

				if (MXI_DEBUG && Env.debug.events) {
					Env.log("Event '%s' fired on %u", evt.type, uid);
				}

				// Dispatch event to all listeners
				var queue = [];
				Basic.each(list, function(handler) {
					// explicitly set the target, otherwise events fired from shims do not get it
					args[0].target = handler.scope;
					// if event is marked as async, detach the handler
					if (evt.async) {
						queue.push(function(cb) {
							setTimeout(function() {
								cb(handler.fn.apply(handler.scope, args) === false);
							}, 1);
						});
					} else {
						queue.push(function(cb) {
							cb(handler.fn.apply(handler.scope, args) === false); // if handler returns false stop propagation
						});
					}
				});
				if (queue.length) {
					Basic.inSeries(queue, function(err) {
						result = !err;
					});
				}
			}
			return result;
		},

		/**
		Register a handler to the event type that will run only once

		@method bindOnce
		@since >1.4.1
		@param {String} type Type or basically a name of the event to subscribe to
		@param {Function} fn Callback function that will be called when event happens
		@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
		@param {Object} [scope=this] A scope to invoke event handler in
		*/
		bindOnce: function(type, fn, priority, scope) {
			var self = this;
			self.bind.call(this, type, function cb() {
				self.unbind(type, cb);
				return fn.apply(this, arguments);
			}, priority, scope);
		},

		/**
		Alias for addEventListener

		@method bind
		@protected
		*/
		bind: function() {
			this.addEventListener.apply(this, arguments);
		},

		/**
		Alias for removeEventListener

		@method unbind
		@protected
		*/
		unbind: function() {
			this.removeEventListener.apply(this, arguments);
		},

		/**
		Alias for removeAllEventListeners

		@method unbindAll
		@protected
		*/
		unbindAll: function() {
			this.removeAllEventListeners.apply(this, arguments);
		},

		/**
		Alias for dispatchEvent

		@method trigger
		@protected
		*/
		trigger: function() {
			return this.dispatchEvent.apply(this, arguments);
		},


		/**
		Handle properties of on[event] type.

		@method handleEventProps
		@private
		*/
		handleEventProps: function(dispatches) {
			var self = this;

			this.bind(dispatches.join(' '), function(e) {
				var prop = 'on' + e.type.toLowerCase();
				if (Basic.typeOf(this[prop]) === 'function') {
					this[prop].apply(this, arguments);
				}
			});

			// object must have defined event properties, even if it doesn't make use of them
			Basic.each(dispatches, function(prop) {
				prop = 'on' + prop.toLowerCase(prop);
				if (Basic.typeOf(self[prop]) === 'undefined') {
					self[prop] = null;
				}
			});
		}

	});


	EventTarget.instance = new EventTarget();

	return EventTarget;
});

// Included from: src/javascript/runtime/Runtime.js

/**
 * Runtime.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/runtime/Runtime', [
	"moxie/core/utils/Env",
	"moxie/core/utils/Basic",
	"moxie/core/utils/Dom",
	"moxie/core/EventTarget"
], function(Env, Basic, Dom, EventTarget) {
	var runtimeConstructors = {}, runtimes = {};

	/**
	Common set of methods and properties for every runtime instance

	@class moxie/runtime/Runtime

	@param {Object} options
	@param {String} type Sanitized name of the runtime
	@param {Object} [caps] Set of capabilities that differentiate specified runtime
	@param {Object} [modeCaps] Set of capabilities that do require specific operational mode
	@param {String} [preferredMode='browser'] Preferred operational mode to choose if no required capabilities were requested
	*/
	function Runtime(options, type, caps, modeCaps, preferredMode) {
		/**
		Dispatched when runtime is initialized and ready.
		Results in RuntimeInit on a connected component.

		@event Init
		*/

		/**
		Dispatched when runtime fails to initialize.
		Results in RuntimeError on a connected component.

		@event Error
		*/

		var self = this
		, _shim
		, _uid = Basic.guid(type + '_')
		, defaultMode = preferredMode || 'browser'
		;

		options = options || {};

		// register runtime in private hash
		runtimes[_uid] = this;

		/**
		Default set of capabilities, which can be redifined later by specific runtime

		@private
		@property caps
		@type Object
		*/
		caps = Basic.extend({
			// Runtime can: 
			// provide access to raw binary data of the file
			access_binary: false,
			// provide access to raw binary data of the image (image extension is optional) 
			access_image_binary: false,
			// display binary data as thumbs for example
			display_media: false,
			// make cross-domain requests
			do_cors: false,
			// accept files dragged and dropped from the desktop
			drag_and_drop: false,
			// filter files in selection dialog by their extensions
			filter_by_extension: true,
			// resize image (and manipulate it raw data of any file in general)
			resize_image: false,
			// periodically report how many bytes of total in the file were uploaded (loaded)
			report_upload_progress: false,
			// provide access to the headers of http response 
			return_response_headers: false,
			// support response of specific type, which should be passed as an argument
			// e.g. runtime.can('return_response_type', 'blob')
			return_response_type: false,
			// return http status code of the response
			return_status_code: true,
			// send custom http header with the request
			send_custom_headers: false,
			// pick up the files from a dialog
			select_file: false,
			// select whole folder in file browse dialog
			select_folder: false,
			// select multiple files at once in file browse dialog
			select_multiple: true,
			// send raw binary data, that is generated after image resizing or manipulation of other kind
			send_binary_string: false,
			// send cookies with http request and therefore retain session
			send_browser_cookies: true,
			// send data formatted as multipart/form-data
			send_multipart: true,
			// slice the file or blob to smaller parts
			slice_blob: false,
			// upload file without preloading it to memory, stream it out directly from disk
			stream_upload: false,
			// programmatically trigger file browse dialog
			summon_file_dialog: false,
			// upload file of specific size, size should be passed as argument
			// e.g. runtime.can('upload_filesize', '500mb')
			upload_filesize: true,
			// initiate http request with specific http method, method should be passed as argument
			// e.g. runtime.can('use_http_method', 'put')
			use_http_method: true
		}, caps);
			
	
		// default to the mode that is compatible with preferred caps
		if (options.preferred_caps) {
			defaultMode = Runtime.getMode(modeCaps, options.preferred_caps, defaultMode);
		}

		if (MXI_DEBUG && Env.debug.runtime) {
			Env.log("\tdefault mode: %s", defaultMode);	
		}
		
		// small extension factory here (is meant to be extended with actual extensions constructors)
		_shim = (function() {
			var objpool = {};
			return {
				exec: function(uid, comp, fn, args) {
					if (_shim[comp]) {
						if (!objpool[uid]) {
							objpool[uid] = {
								context: this,
								instance: new _shim[comp]()
							};
						}
						if (objpool[uid].instance[fn]) {
							return objpool[uid].instance[fn].apply(this, args);
						}
					}
				},

				removeInstance: function(uid) {
					delete objpool[uid];
				},

				removeAllInstances: function() {
					var self = this;
					Basic.each(objpool, function(obj, uid) {
						if (Basic.typeOf(obj.instance.destroy) === 'function') {
							obj.instance.destroy.call(obj.context);
						}
						self.removeInstance(uid);
					});
				}
			};
		}());


		// public methods
		Basic.extend(this, {
			/**
			Specifies whether runtime instance was initialized or not

			@property initialized
			@type {Boolean}
			@default false
			*/
			initialized: false, // shims require this flag to stop initialization retries

			/**
			Unique ID of the runtime

			@property uid
			@type {String}
			*/
			uid: _uid,

			/**
			Runtime type (e.g. flash, html5, etc)

			@property type
			@type {String}
			*/
			type: type,

			/**
			Runtime (not native one) may operate in browser or client mode.

			@property mode
			@private
			@type {String|Boolean} current mode or false, if none possible
			*/
			mode: Runtime.getMode(modeCaps, (options.required_caps), defaultMode),

			/**
			id of the DOM container for the runtime (if available)

			@property shimid
			@type {String}
			*/
			shimid: _uid + '_container',

			/**
			Number of connected clients. If equal to zero, runtime can be destroyed

			@property clients
			@type {Number}
			*/
			clients: 0,

			/**
			Runtime initialization options

			@property options
			@type {Object}
			*/
			options: options,

			/**
			Checks if the runtime has specific capability

			@method can
			@param {String} cap Name of capability to check
			@param {Mixed} [value] If passed, capability should somehow correlate to the value
			@param {Object} [refCaps] Set of capabilities to check the specified cap against (defaults to internal set)
			@return {Boolean} true if runtime has such capability and false, if - not
			*/
			can: function(cap, value) {
				var refCaps = arguments[2] || caps;

				// if cap var is a comma-separated list of caps, convert it to object (key/value)
				if (Basic.typeOf(cap) === 'string' && Basic.typeOf(value) === 'undefined') {
					cap = Runtime.parseCaps(cap);
				}

				if (Basic.typeOf(cap) === 'object') {
					for (var key in cap) {
						if (!this.can(key, cap[key], refCaps)) {
							return false;
						}
					}
					return true;
				}

				// check the individual cap
				if (Basic.typeOf(refCaps[cap]) === 'function') {
					return refCaps[cap].call(this, value);
				} else {
					return (value === refCaps[cap]);
				}
			},

			/**
			Returns container for the runtime as DOM element

			@method getShimContainer
			@return {DOMElement}
			*/
			getShimContainer: function() {
				var container, shimContainer = Dom.get(this.shimid);

				// if no container for shim, create one
				if (!shimContainer) {
					container = Dom.get(this.options.container) || document.body;

					// create shim container and insert it at an absolute position into the outer container
					shimContainer = document.createElement('div');
					shimContainer.id = this.shimid;
					shimContainer.className = 'moxie-shim moxie-shim-' + this.type;

					Basic.extend(shimContainer.style, {
						position: 'absolute',
						top: '0px',
						left: '0px',
						width: '1px',
						height: '1px',
						overflow: 'hidden'
					});

					container.appendChild(shimContainer);
					container = null;
				}

				return shimContainer;
			},

			/**
			Returns runtime as DOM element (if appropriate)

			@method getShim
			@return {DOMElement}
			*/
			getShim: function() {
				return _shim;
			},

			/**
			Invokes a method within the runtime itself (might differ across the runtimes)

			@method shimExec
			@param {Mixed} []
			@protected
			@return {Mixed} Depends on the action and component
			*/
			shimExec: function(component, action) {
				var args = [].slice.call(arguments, 2);
				return self.getShim().exec.call(this, this.uid, component, action, args);
			},

			/**
			Operaional interface that is used by components to invoke specific actions on the runtime
			(is invoked in the scope of component)

			@method exec
			@param {Mixed} []*
			@protected
			@return {Mixed} Depends on the action and component
			*/
			exec: function(component, action) { // this is called in the context of component, not runtime
				var args = [].slice.call(arguments, 2);

				if (self[component] && self[component][action]) {
					return self[component][action].apply(this, args);
				}
				return self.shimExec.apply(this, arguments);
			},

			/**
			Destroys the runtime (removes all events and deletes DOM structures)

			@method destroy
			*/
			destroy: function() {
				if (!self) {
					return; // obviously already destroyed
				}

				var shimContainer = Dom.get(this.shimid);
				if (shimContainer) {
					shimContainer.parentNode.removeChild(shimContainer);
				}

				if (_shim) {
					_shim.removeAllInstances();
				}

				this.unbindAll();
				delete runtimes[this.uid];
				this.uid = null; // mark this runtime as destroyed
				_uid = self = _shim = shimContainer = null;
			}
		});

		// once we got the mode, test against all caps
		if (this.mode && options.required_caps && !this.can(options.required_caps)) {
			this.mode = false;
		}	
	}


	/**
	Default order to try different runtime types

	@property order
	@type String
	@static
	*/
	Runtime.order = 'html5,flash,silverlight,html4';


	/**
	Retrieves runtime from private hash by it's uid

	@method getRuntime
	@private
	@static
	@param {String} uid Unique identifier of the runtime
	@return {Runtime|Boolean} Returns runtime, if it exists and false, if - not
	*/
	Runtime.getRuntime = function(uid) {
		return runtimes[uid] ? runtimes[uid] : false;
	};


	/**
	Register constructor for the Runtime of new (or perhaps modified) type

	@method addConstructor
	@static
	@param {String} type Runtime type (e.g. flash, html5, etc)
	@param {Function} construct Constructor for the Runtime type
	*/
	Runtime.addConstructor = function(type, constructor) {
		constructor.prototype = EventTarget.instance;
		runtimeConstructors[type] = constructor;
	};


	/**
	Get the constructor for the specified type.

	method getConstructor
	@static
	@param {String} type Runtime type (e.g. flash, html5, etc)
	@return {Function} Constructor for the Runtime type
	*/
	Runtime.getConstructor = function(type) {
		return runtimeConstructors[type] || null;
	};


	/**
	Get info about the runtime (uid, type, capabilities)

	@method getInfo
	@static
	@param {String} uid Unique identifier of the runtime
	@return {Mixed} Info object or null if runtime doesn't exist
	*/
	Runtime.getInfo = function(uid) {
		var runtime = Runtime.getRuntime(uid);

		if (runtime) {
			return {
				uid: runtime.uid,
				type: runtime.type,
				mode: runtime.mode,
				can: function() {
					return runtime.can.apply(runtime, arguments);
				}
			};
		}
		return null;
	};


	/**
	Convert caps represented by a comma-separated string to the object representation.

	@method parseCaps
	@static
	@param {String} capStr Comma-separated list of capabilities
	@return {Object}
	*/
	Runtime.parseCaps = function(capStr) {
		var capObj = {};

		if (Basic.typeOf(capStr) !== 'string') {
			return capStr || {};
		}

		Basic.each(capStr.split(','), function(key) {
			capObj[key] = true; // we assume it to be - true
		});

		return capObj;
	};

	/**
	Test the specified runtime for specific capabilities.

	@method can
	@static
	@param {String} type Runtime type (e.g. flash, html5, etc)
	@param {String|Object} caps Set of capabilities to check
	@return {Boolean} Result of the test
	*/
	Runtime.can = function(type, caps) {
		var runtime
		, constructor = Runtime.getConstructor(type)
		, mode
		;
		if (constructor) {
			runtime = new constructor({
				required_caps: caps
			});
			mode = runtime.mode;
			runtime.destroy();
			return !!mode;
		}
		return false;
	};


	/**
	Figure out a runtime that supports specified capabilities.

	@method thatCan
	@static
	@param {String|Object} caps Set of capabilities to check
	@param {String} [runtimeOrder] Comma-separated list of runtimes to check against
	@return {String} Usable runtime identifier or null
	*/
	Runtime.thatCan = function(caps, runtimeOrder) {
		var types = (runtimeOrder || Runtime.order).split(/\s*,\s*/);
		for (var i in types) {
			if (Runtime.can(types[i], caps)) {
				return types[i];
			}
		}
		return null;
	};


	/**
	Figure out an operational mode for the specified set of capabilities.

	@method getMode
	@static
	@param {Object} modeCaps Set of capabilities that depend on particular runtime mode
	@param {Object} [requiredCaps] Supplied set of capabilities to find operational mode for
	@param {String|Boolean} [defaultMode='browser'] Default mode to use 
	@return {String|Boolean} Compatible operational mode
	*/
	Runtime.getMode = function(modeCaps, requiredCaps, defaultMode) {
		var mode = null;

		if (Basic.typeOf(defaultMode) === 'undefined') { // only if not specified
			defaultMode = 'browser';
		}

		if (requiredCaps && !Basic.isEmptyObj(modeCaps)) {
			// loop over required caps and check if they do require the same mode
			Basic.each(requiredCaps, function(value, cap) {
				if (modeCaps.hasOwnProperty(cap)) {
					var capMode = modeCaps[cap](value);

					// make sure we always have an array
					if (typeof(capMode) === 'string') {
						capMode = [capMode];
					}
					
					if (!mode) {
						mode = capMode;						
					} else if (!(mode = Basic.arrayIntersect(mode, capMode))) {
						// if cap requires conflicting mode - runtime cannot fulfill required caps

						if (MXI_DEBUG && Env.debug.runtime) {
							Env.log("\t\t%c: %v (conflicting mode requested: %s)", cap, value, capMode);	
						}

						return (mode = false);
					}					
				}

				if (MXI_DEBUG && Env.debug.runtime) {
					Env.log("\t\t%c: %v (compatible modes: %s)", cap, value, mode);	
				}
			});

			if (mode) {
				return Basic.inArray(defaultMode, mode) !== -1 ? defaultMode : mode[0];
			} else if (mode === false) {
				return false;
			}
		}
		return defaultMode; 
	};


	/**
	Capability check that always returns true

	@private
	@static
	@return {True}
	*/
	Runtime.capTrue = function() {
		return true;
	};

	/**
	Capability check that always returns false

	@private
	@static
	@return {False}
	*/
	Runtime.capFalse = function() {
		return false;
	};

	/**
	Evaluate the expression to boolean value and create a function that always returns it.

	@private
	@static
	@param {Mixed} expr Expression to evaluate
	@return {Function} Function returning the result of evaluation
	*/
	Runtime.capTest = function(expr) {
		return function() {
			return !!expr;
		};
	};

	return Runtime;
});

// Included from: src/javascript/runtime/RuntimeClient.js

/**
 * RuntimeClient.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/runtime/RuntimeClient', [
	'moxie/core/utils/Env',
	'moxie/core/Exceptions',
	'moxie/core/utils/Basic',
	'moxie/runtime/Runtime'
], function(Env, x, Basic, Runtime) {
	/**
	Set of methods and properties, required by a component to acquire ability to connect to a runtime

	@class moxie/runtime/RuntimeClient
	*/
	return function RuntimeClient() {
		var runtime;

		Basic.extend(this, {
			/**
			Connects to the runtime specified by the options. Will either connect to existing runtime or create a new one.
			Increments number of clients connected to the specified runtime.

			@private
			@method connectRuntime
			@param {Mixed} options Can be a runtme uid or a set of key-value pairs defining requirements and pre-requisites
			*/
			connectRuntime: function(options) {
				var comp = this, ruid;

				function initialize(items) {
					var type, constructor;

					// if we ran out of runtimes
					if (!items.length) {
						comp.trigger('RuntimeError', new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR));
						runtime = null;
						return;
					}

					type = items.shift().toLowerCase();
					constructor = Runtime.getConstructor(type);
					if (!constructor) {
						if (MXI_DEBUG && Env.debug.runtime) {
							Env.log("Constructor for '%s' runtime is not available.", type);
						}
						initialize(items);
						return;
					}

					if (MXI_DEBUG && Env.debug.runtime) {
						Env.log("Trying runtime: %s", type);
						Env.log(options);
					}

					// try initializing the runtime
					runtime = new constructor(options);

					runtime.bind('Init', function() {
						// mark runtime as initialized
						runtime.initialized = true;

						if (MXI_DEBUG && Env.debug.runtime) {
							Env.log("Runtime '%s' initialized", runtime.type);
						}

						// jailbreak ...
						setTimeout(function() {
							runtime.clients++;
							comp.ruid = runtime.uid;
							// this will be triggered on component
							comp.trigger('RuntimeInit', runtime);
						}, 1);
					});

					runtime.bind('Error', function() {
						if (MXI_DEBUG && Env.debug.runtime) {
							Env.log("Runtime '%s' failed to initialize", runtime.type);
						}

						runtime.destroy(); // runtime cannot destroy itself from inside at a right moment, thus we do it here
						initialize(items);
					});

					runtime.bind('Exception', function(e, err) {
						var message = err.name + "(#" + err.code + ")" + (err.message ? ", from: " + err.message : '');
						
						if (MXI_DEBUG && Env.debug.runtime) {
							Env.log("Runtime '%s' has thrown an exception: %s", this.type, message);
						}
						comp.trigger('RuntimeError', new x.RuntimeError(x.RuntimeError.EXCEPTION_ERR, message));
					});

					if (MXI_DEBUG && Env.debug.runtime) {
						Env.log("\tselected mode: %s", runtime.mode);	
					}

					// check if runtime managed to pick-up operational mode
					if (!runtime.mode) {
						runtime.trigger('Error');
						return;
					}

					runtime.init();
				}

				// check if a particular runtime was requested
				if (Basic.typeOf(options) === 'string') {
					ruid = options;
				} else if (Basic.typeOf(options.ruid) === 'string') {
					ruid = options.ruid;
				}

				if (ruid) {
					runtime = Runtime.getRuntime(ruid);
					if (runtime) {
						comp.ruid = ruid;
						runtime.clients++;
						return runtime;
					} else {
						// there should be a runtime and there's none - weird case
						throw new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR);
					}
				}

				// initialize a fresh one, that fits runtime list and required features best
				initialize((options.runtime_order || Runtime.order).split(/\s*,\s*/));
			},


			/**
			Disconnects from the runtime. Decrements number of clients connected to the specified runtime.

			@private
			@method disconnectRuntime
			*/
			disconnectRuntime: function() {
				if (runtime && --runtime.clients <= 0) {
					runtime.destroy();
				}

				// once the component is disconnected, it shouldn't have access to the runtime
				runtime = null;
			},


			/**
			Returns the runtime to which the client is currently connected.

			@method getRuntime
			@return {Runtime} Runtime or null if client is not connected
			*/
			getRuntime: function() {
				if (runtime && runtime.uid) {
					return runtime;
				}
				return runtime = null; // make sure we do not leave zombies rambling around
			},


			/**
			Handy shortcut to safely invoke runtime extension methods.
			
			@private
			@method exec
			@return {Mixed} Whatever runtime extension method returns
			*/
			exec: function() {
				return runtime ? runtime.exec.apply(this, arguments) : null;
			},


			/**
			Test runtime client for specific capability
			
			@method can
			@param {String} cap
			@return {Bool}
			*/
			can: function(cap) {
				return runtime ? runtime.can(cap) : false;
			}

		});
	};


});

// Included from: src/javascript/file/Blob.js

/**
 * Blob.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/file/Blob', [
	'moxie/core/utils/Basic',
	'moxie/core/utils/Encode',
	'moxie/runtime/RuntimeClient'
], function(Basic, Encode, RuntimeClient) {
	
	var blobpool = {};

	/**
	@class moxie/file/Blob
	@constructor
	@param {String} ruid Unique id of the runtime, to which this blob belongs to
	@param {Object} blob Object "Native" blob object, as it is represented in the runtime
	*/
	function Blob(ruid, blob) {

		function _sliceDetached(start, end, type) {
			var blob, data = blobpool[this.uid];

			if (Basic.typeOf(data) !== 'string' || !data.length) {
				return null; // or throw exception
			}

			blob = new Blob(null, {
				type: type,
				size: end - start
			});
			blob.detach(data.substr(start, blob.size));

			return blob;
		}

		RuntimeClient.call(this);

		if (ruid) {	
			this.connectRuntime(ruid);
		}

		if (!blob) {
			blob = {};
		} else if (Basic.typeOf(blob) === 'string') { // dataUrl or binary string
			blob = { data: blob };
		}

		Basic.extend(this, {
			
			/**
			Unique id of the component

			@property uid
			@type {String}
			*/
			uid: blob.uid || Basic.guid('uid_'),
			
			/**
			Unique id of the connected runtime, if falsy, then runtime will have to be initialized 
			before this Blob can be used, modified or sent

			@property ruid
			@type {String}
			*/
			ruid: ruid,
	
			/**
			Size of blob

			@property size
			@type {Number}
			@default 0
			*/
			size: blob.size || 0,
			
			/**
			Mime type of blob

			@property type
			@type {String}
			@default ''
			*/
			type: blob.type || '',
			
			/**
			@method slice
			@param {Number} [start=0]
			*/
			slice: function(start, end, type) {		
				if (this.isDetached()) {
					return _sliceDetached.apply(this, arguments);
				}
				return this.getRuntime().exec.call(this, 'Blob', 'slice', this.getSource(), start, end, type);
			},

			/**
			Returns "native" blob object (as it is represented in connected runtime) or null if not found

			@method getSource
			@return {Blob} Returns "native" blob object or null if not found
			*/
			getSource: function() {
				if (!blobpool[this.uid]) {
					return null;	
				}
				return blobpool[this.uid];
			},

			/** 
			Detaches blob from any runtime that it depends on and initialize with standalone value

			@method detach
			@protected
			@param {DOMString} [data=''] Standalone value
			*/
			detach: function(data) {
				if (this.ruid) {
					this.getRuntime().exec.call(this, 'Blob', 'destroy');
					this.disconnectRuntime();
					this.ruid = null;
				}

				data = data || '';

				// if dataUrl, convert to binary string
				if (data.substr(0, 5) == 'data:') {
					var base64Offset = data.indexOf(';base64,');
					this.type = data.substring(5, base64Offset);
					data = Encode.atob(data.substring(base64Offset + 8));
				}

				this.size = data.length;

				blobpool[this.uid] = data;
			},

			/**
			Checks if blob is standalone (detached of any runtime)
			
			@method isDetached
			@protected
			@return {Boolean}
			*/
			isDetached: function() {
				return !this.ruid && Basic.typeOf(blobpool[this.uid]) === 'string';
			},
			
			/** 
			Destroy Blob and free any resources it was using

			@method destroy
			*/
			destroy: function() {
				this.detach();
				delete blobpool[this.uid];
			}
		});

		
		if (blob.data) {
			this.detach(blob.data); // auto-detach if payload has been passed
		} else {
			blobpool[this.uid] = blob;	
		}
	}
	
	return Blob;
});

// Included from: src/javascript/core/I18n.js

/**
 * I18n.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define("moxie/core/I18n", [
	"moxie/core/utils/Basic"
], function(Basic) {
	var i18n = {};

	/**
	@class moxie/core/I18n
	*/
	return {
		/**
		 * Extends the language pack object with new items.
		 *
		 * @param {Object} pack Language pack items to add.
		 * @return {Object} Extended language pack object.
		 */
		addI18n: function(pack) {
			return Basic.extend(i18n, pack);
		},

		/**
		 * Translates the specified string by checking for the english string in the language pack lookup.
		 *
		 * @param {String} str String to look for.
		 * @return {String} Translated string or the input string if it wasn't found.
		 */
		translate: function(str) {
			return i18n[str] || str;
		},

		/**
		 * Shortcut for translate function
		 *
		 * @param {String} str String to look for.
		 * @return {String} Translated string or the input string if it wasn't found.
		 */
		_: function(str) {
			return this.translate(str);
		},

		/**
		 * Pseudo sprintf implementation - simple way to replace tokens with specified values.
		 *
		 * @param {String} str String with tokens
		 * @return {String} String with replaced tokens
		 */
		sprintf: function(str) {
			var args = [].slice.call(arguments, 1);

			return str.replace(/%[a-z]/g, function() {
				var value = args.shift();
				return Basic.typeOf(value) !== 'undefined' ? value : '';
			});
		}
	};
});

// Included from: src/javascript/core/utils/Mime.js

/**
 * Mime.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define("moxie/core/utils/Mime", [
	"moxie/core/utils/Basic",
	"moxie/core/I18n"
], function(Basic, I18n) {
	
	var mimeData = "" +
		"application/msword,doc dot," +
		"application/pdf,pdf," +
		"application/pgp-signature,pgp," +
		"application/postscript,ps ai eps," +
		"application/rtf,rtf," +
		"application/vnd.ms-excel,xls xlb," +
		"application/vnd.ms-powerpoint,ppt pps pot," +
		"application/zip,zip," +
		"application/x-shockwave-flash,swf swfl," +
		"application/vnd.openxmlformats-officedocument.wordprocessingml.document,docx," +
		"application/vnd.openxmlformats-officedocument.wordprocessingml.template,dotx," +
		"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,xlsx," +
		"application/vnd.openxmlformats-officedocument.presentationml.presentation,pptx," +
		"application/vnd.openxmlformats-officedocument.presentationml.template,potx," +
		"application/vnd.openxmlformats-officedocument.presentationml.slideshow,ppsx," +
		"application/x-javascript,js," +
		"application/json,json," +
		"audio/mpeg,mp3 mpga mpega mp2," +
		"audio/x-wav,wav," +
		"audio/x-m4a,m4a," +
		"audio/ogg,oga ogg," +
		"audio/aiff,aiff aif," +
		"audio/flac,flac," +
		"audio/aac,aac," +
		"audio/ac3,ac3," +
		"audio/x-ms-wma,wma," +
		"image/bmp,bmp," +
		"image/gif,gif," +
		"image/jpeg,jpg jpeg jpe," +
		"image/photoshop,psd," +
		"image/png,png," +
		"image/svg+xml,svg svgz," +
		"image/tiff,tiff tif," +
		"text/plain,asc txt text diff log," +
		"text/html,htm html xhtml," +
		"text/css,css," +
		"text/csv,csv," +
		"text/rtf,rtf," +
		"video/mpeg,mpeg mpg mpe m2v," +
		"video/quicktime,qt mov," +
		"video/mp4,mp4," +
		"video/x-m4v,m4v," +
		"video/x-flv,flv," +
		"video/x-ms-wmv,wmv," +
		"video/avi,avi," +
		"video/webm,webm," +
		"video/3gpp,3gpp 3gp," +
		"video/3gpp2,3g2," +
		"video/vnd.rn-realvideo,rv," +
		"video/ogg,ogv," + 
		"video/x-matroska,mkv," +
		"application/vnd.oasis.opendocument.formula-template,otf," +
		"application/octet-stream,exe";
	
	
	var Mime = {

		mimes: {},

		extensions: {},

		// Parses the default mime types string into a mimes and extensions lookup maps
		addMimeType: function (mimeData) {
			var items = mimeData.split(/,/), i, ii, ext;
			
			for (i = 0; i < items.length; i += 2) {
				ext = items[i + 1].split(/ /);

				// extension to mime lookup
				for (ii = 0; ii < ext.length; ii++) {
					this.mimes[ext[ii]] = items[i];
				}
				// mime to extension lookup
				this.extensions[items[i]] = ext;
			}
		},


		extList2mimes: function (filters, addMissingExtensions) {
			var self = this, ext, i, ii, type, mimes = [];
			
			// convert extensions to mime types list
			for (i = 0; i < filters.length; i++) {
				ext = filters[i].extensions.toLowerCase().split(/\s*,\s*/);

				for (ii = 0; ii < ext.length; ii++) {
					
					// if there's an asterisk in the list, then accept attribute is not required
					if (ext[ii] === '*') {
						return [];
					}

					type = self.mimes[ext[ii]];

					// future browsers should filter by extension, finally
					if (addMissingExtensions && /^\w+$/.test(ext[ii])) {
						mimes.push('.' + ext[ii]);
					} else if (type && Basic.inArray(type, mimes) === -1) {
						mimes.push(type);
					} else if (!type) {
						// if we have no type in our map, then accept all
						return [];
					}
				}
			}
			return mimes;
		},


		mimes2exts: function(mimes) {
			var self = this, exts = [];
			
			Basic.each(mimes, function(mime) {
				mime = mime.toLowerCase();

				if (mime === '*') {
					exts = [];
					return false;
				}

				// check if this thing looks like mime type
				var m = mime.match(/^(\w+)\/(\*|\w+)$/);
				if (m) {
					if (m[2] === '*') { 
						// wildcard mime type detected
						Basic.each(self.extensions, function(arr, mime) {
							if ((new RegExp('^' + m[1] + '/')).test(mime)) {
								[].push.apply(exts, self.extensions[mime]);
							}
						});
					} else if (self.extensions[mime]) {
						[].push.apply(exts, self.extensions[mime]);
					}
				}
			});
			return exts;
		},


		mimes2extList: function(mimes) {
			var accept = [], exts = [];

			if (Basic.typeOf(mimes) === 'string') {
				mimes = Basic.trim(mimes).split(/\s*,\s*/);
			}

			exts = this.mimes2exts(mimes);
			
			accept.push({
				title: I18n.translate('Files'),
				extensions: exts.length ? exts.join(',') : '*'
			});
			
			// save original mimes string
			accept.mimes = mimes;

			return accept;
		},


		getFileExtension: function(fileName) {
			var matches = fileName && fileName.match(/\.([^.]+)$/);
			if (matches) {
				return matches[1].toLowerCase();
			}
			return '';
		},

		getFileMime: function(fileName) {
			return this.mimes[this.getFileExtension(fileName)] || '';
		}
	};

	Mime.addMimeType(mimeData);

	return Mime;
});

// Included from: src/javascript/file/FileInput.js

/**
 * FileInput.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/file/FileInput', [
	'moxie/core/utils/Basic',
	'moxie/core/utils/Env',
	'moxie/core/utils/Mime',
	'moxie/core/utils/Dom',
	'moxie/core/Exceptions',
	'moxie/core/EventTarget',
	'moxie/core/I18n',
	'moxie/runtime/Runtime',
	'moxie/runtime/RuntimeClient'
], function(Basic, Env, Mime, Dom, x, EventTarget, I18n, Runtime, RuntimeClient) {
	/**
	Provides a convenient way to create cross-browser file-picker. Generates file selection dialog on click,
	converts selected files to _File_ objects, to be used in conjunction with _Image_, preloaded in memory
	with _FileReader_ or uploaded to a server through _XMLHttpRequest_.

	@class moxie/file/FileInput
	@constructor
	@extends EventTarget
	@uses RuntimeClient
	@param {Object|String|DOMElement} options If options is string or node, argument is considered as _browse\_button_.
		@param {String|DOMElement} options.browse_button DOM Element to turn into file picker.
		@param {Array} [options.accept] Array of mime types to accept. By default accepts all.
		@param {Boolean} [options.multiple=false] Enable selection of multiple files.
		@param {Boolean} [options.directory=false] Turn file input into the folder input (cannot be both at the same time).
		@param {String|DOMElement} [options.container] DOM Element to use as a container for file-picker. Defaults to parentNode 
		for _browse\_button_.
		@param {Object|String} [options.required_caps] Set of required capabilities, that chosen runtime must support.

	@example
		<div id="container">
			<a id="file-picker" href="javascript:;">Browse...</a>
		</div>

		<script>
			var fileInput = new mOxie.FileInput({
				browse_button: 'file-picker', // or document.getElementById('file-picker')
				container: 'container',
				accept: [
					{title: "Image files", extensions: "jpg,gif,png"} // accept only images
				],
				multiple: true // allow multiple file selection
			});

			fileInput.onchange = function(e) {
				// do something to files array
				console.info(e.target.files); // or this.files or fileInput.files
			};

			fileInput.init(); // initialize
		</script>
	*/
	var dispatches = [
		/**
		Dispatched when runtime is connected and file-picker is ready to be used.

		@event ready
		@param {Object} event
		*/
		'ready',

		/**
		Dispatched right after [ready](#event_ready) event, and whenever [refresh()](#method_refresh) is invoked. 
		Check [corresponding documentation entry](#method_refresh) for more info.

		@event refresh
		@param {Object} event
		*/

		/**
		Dispatched when selection of files in the dialog is complete.

		@event change
		@param {Object} event
		*/
		'change',

		'cancel', // TODO: might be useful

		/**
		Dispatched when mouse cursor enters file-picker area. Can be used to style element
		accordingly.

		@event mouseenter
		@param {Object} event
		*/
		'mouseenter',

		/**
		Dispatched when mouse cursor leaves file-picker area. Can be used to style element
		accordingly.

		@event mouseleave
		@param {Object} event
		*/
		'mouseleave',

		/**
		Dispatched when functional mouse button is pressed on top of file-picker area.

		@event mousedown
		@param {Object} event
		*/
		'mousedown',

		/**
		Dispatched when functional mouse button is released on top of file-picker area.

		@event mouseup
		@param {Object} event
		*/
		'mouseup'
	];

	function FileInput(options) {
		if (MXI_DEBUG) {
			Env.log("Instantiating FileInput...");	
		}

		var container, browseButton, defaults;

		// if flat argument passed it should be browse_button id
		if (Basic.inArray(Basic.typeOf(options), ['string', 'node']) !== -1) {
			options = { browse_button : options };
		}

		// this will help us to find proper default container
		browseButton = Dom.get(options.browse_button);
		if (!browseButton) {
			// browse button is required
			throw new x.DOMException(x.DOMException.NOT_FOUND_ERR);
		}

		// figure out the options
		defaults = {
			accept: [{
				title: I18n.translate('All Files'),
				extensions: '*'
			}],
			multiple: false,
			required_caps: false,
			container: browseButton.parentNode || document.body
		};
		
		options = Basic.extend({}, defaults, options);

		// convert to object representation
		if (typeof(options.required_caps) === 'string') {
			options.required_caps = Runtime.parseCaps(options.required_caps);
		}
					
		// normalize accept option (could be list of mime types or array of title/extensions pairs)
		if (typeof(options.accept) === 'string') {
			options.accept = Mime.mimes2extList(options.accept);
		}

		container = Dom.get(options.container);
		// make sure we have container
		if (!container) {
			container = document.body;
		}

		// make container relative, if it's not
		if (Dom.getStyle(container, 'position') === 'static') {
			container.style.position = 'relative';
		}

		container = browseButton = null; // IE
						
		RuntimeClient.call(this);
		
		Basic.extend(this, {
			/**
			Unique id of the component

			@property uid
			@protected
			@readOnly
			@type {String}
			@default UID
			*/
			uid: Basic.guid('uid_'),
			
			/**
			Unique id of the connected runtime, if any.

			@property ruid
			@protected
			@type {String}
			*/
			ruid: null,

			/**
			Unique id of the runtime container. Useful to get hold of it for various manipulations.

			@property shimid
			@protected
			@type {String}
			*/
			shimid: null,
			
			/**
			Array of selected mOxie.File objects

			@property files
			@type {Array}
			@default null
			*/
			files: null,

			/**
			Initializes the file-picker, connects it to runtime and dispatches event ready when done.

			@method init
			*/
			init: function() {
				var self = this;

				self.bind('RuntimeInit', function(e, runtime) {
					self.ruid = runtime.uid;
					self.shimid = runtime.shimid;

					self.bind("Ready", function() {
						self.trigger("Refresh");
					}, 999);

					// re-position and resize shim container
					self.bind('Refresh', function() {
						var pos, size, browseButton, shimContainer, zIndex;
						
						browseButton = Dom.get(options.browse_button);
						shimContainer = Dom.get(runtime.shimid); // do not use runtime.getShimContainer(), since it will create container if it doesn't exist

						if (browseButton) {
							pos = Dom.getPos(browseButton, Dom.get(options.container));
							size = Dom.getSize(browseButton);
							zIndex = parseInt(Dom.getStyle(browseButton, 'z-index'), 10) || 0;

							if (shimContainer) {
								Basic.extend(shimContainer.style, {
									top: pos.y + 'px',
									left: pos.x + 'px',
									width: size.w + 'px',
									height: size.h + 'px',
									zIndex: zIndex + 1
								});
							}
						}
						shimContainer = browseButton = null;
					});
					
					runtime.exec.call(self, 'FileInput', 'init', options);
				});

				// runtime needs: options.required_features, options.runtime_order and options.container
				self.connectRuntime(Basic.extend({}, options, {
					required_caps: {
						select_file: true
					}
				}));
			},


			/**
			 * Get current option value by its name
			 *
			 * @method getOption
			 * @param name
			 * @return {Mixed}
			 */
			getOption: function(name) {
				return options[name];
			},


			/**
			 * Sets a new value for the option specified by name
			 *
			 * @method setOption
			 * @param name
			 * @param value
			 */
			setOption: function(name, value) {
				if (!options.hasOwnProperty(name)) {
					return;
				}

				var oldValue = options[name];

				switch (name) {
					case 'accept':
						if (typeof(value) === 'string') {
							value = Mime.mimes2extList(value);
						}
						break;

					case 'container':
					case 'required_caps':
						throw new x.FileException(x.FileException.NO_MODIFICATION_ALLOWED_ERR);
				}

				options[name] = value;
				this.exec('FileInput', 'setOption', name, value);

				this.trigger('OptionChanged', name, value, oldValue);
			},

			/**
			Disables file-picker element, so that it doesn't react to mouse clicks.

			@method disable
			@param {Boolean} [state=true] Disable component if - true, enable if - false
			*/
			disable: function(state) {
				var runtime = this.getRuntime();
				if (runtime) {
					this.exec('FileInput', 'disable', Basic.typeOf(state) === 'undefined' ? true : state);
				}
			},


			/**
			Reposition and resize dialog trigger to match the position and size of browse_button element.

			@method refresh
			*/
			refresh: function() {
				this.trigger("Refresh");
			},


			/**
			Destroy component.

			@method destroy
			*/
			destroy: function() {
				var runtime = this.getRuntime();
				if (runtime) {
					runtime.exec.call(this, 'FileInput', 'destroy');
					this.disconnectRuntime();
				}

				if (Basic.typeOf(this.files) === 'array') {
					// no sense in leaving associated files behind
					Basic.each(this.files, function(file) {
						file.destroy();
					});
				} 
				this.files = null;

				this.unbindAll();
			}
		});

		this.handleEventProps(dispatches);
	}

	FileInput.prototype = EventTarget.instance;

	return FileInput;
});

// Included from: src/javascript/file/File.js

/**
 * File.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/file/File', [
	'moxie/core/utils/Basic',
	'moxie/core/utils/Mime',
	'moxie/file/Blob'
], function(Basic, Mime, Blob) {
	/**
	@class moxie/file/File
	@extends Blob
	@constructor
	@param {String} ruid Unique id of the runtime, to which this blob belongs to
	@param {Object} file Object "Native" file object, as it is represented in the runtime
	*/
	function File(ruid, file) {
		if (!file) { // avoid extra errors in case we overlooked something
			file = {};
		}

		Blob.apply(this, arguments);

		if (!this.type) {
			this.type = Mime.getFileMime(file.name);
		}

		// sanitize file name or generate new one
		var name;
		if (file.name) {
			name = file.name.replace(/\\/g, '/');
			name = name.substr(name.lastIndexOf('/') + 1);
		} else if (this.type) {
			var prefix = this.type.split('/')[0];
			name = Basic.guid((prefix !== '' ? prefix : 'file') + '_');
			
			if (Mime.extensions[this.type]) {
				name += '.' + Mime.extensions[this.type][0]; // append proper extension if possible
			}
		}
		
		
		Basic.extend(this, {
			/**
			File name

			@property name
			@type {String}
			@default UID
			*/
			name: name || Basic.guid('file_'),

			/**
			Relative path to the file inside a directory

			@property relativePath
			@type {String}
			@default ''
			*/
			relativePath: '',
			
			/**
			Date of last modification

			@property lastModifiedDate
			@type {String}
			@default now
			*/
			lastModifiedDate: file.lastModifiedDate || (new Date()).toLocaleString() // Thu Aug 23 2012 19:40:00 GMT+0400 (GET)
		});
	}

	File.prototype = Blob.prototype;

	return File;
});

// Included from: src/javascript/file/FileDrop.js

/**
 * FileDrop.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/file/FileDrop', [
	'moxie/core/I18n',
	'moxie/core/utils/Dom',
	'moxie/core/Exceptions',
	'moxie/core/utils/Basic',
	'moxie/core/utils/Env',
	'moxie/file/File',
	'moxie/runtime/RuntimeClient',
	'moxie/core/EventTarget',
	'moxie/core/utils/Mime'
], function(I18n, Dom, x, Basic, Env, File, RuntimeClient, EventTarget, Mime) {
	/**
	Turn arbitrary DOM element to a drop zone accepting files. Converts selected files to _File_ objects, to be used 
	in conjunction with _Image_, preloaded in memory with _FileReader_ or uploaded to a server through 
	_XMLHttpRequest_.

	@example
		<div id="drop_zone">
			Drop files here
		</div>
		<br />
		<div id="filelist"></div>

		<script type="text/javascript">
			var fileDrop = new mOxie.FileDrop('drop_zone'), fileList = mOxie.get('filelist');

			fileDrop.ondrop = function() {
				mOxie.each(this.files, function(file) {
					fileList.innerHTML += '<div>' + file.name + '</div>';
				});
			};

			fileDrop.init();
		</script>

	@class moxie/file/FileDrop
	@constructor
	@extends EventTarget
	@uses RuntimeClient
	@param {Object|String} options If options has typeof string, argument is considered as options.drop_zone
		@param {String|DOMElement} options.drop_zone DOM Element to turn into a drop zone
		@param {Array} [options.accept] Array of mime types to accept. By default accepts all
		@param {Object|String} [options.required_caps] Set of required capabilities, that chosen runtime must support
	*/
	var dispatches = [
		/**
		Dispatched when runtime is connected and drop zone is ready to accept files.

		@event ready
		@param {Object} event
		*/
		'ready', 

		/**
		Dispatched when dragging cursor enters the drop zone.

		@event dragenter
		@param {Object} event
		*/
		'dragenter',

		/**
		Dispatched when dragging cursor leaves the drop zone.

		@event dragleave
		@param {Object} event
		*/
		'dragleave', 

		/**
		Dispatched when file is dropped onto the drop zone.

		@event drop
		@param {Object} event
		*/
		'drop', 

		/**
		Dispatched if error occurs.

		@event error
		@param {Object} event
		*/
		'error'
	];

	function FileDrop(options) {
		if (MXI_DEBUG) {
			Env.log("Instantiating FileDrop...");	
		}

		var self = this, defaults;

		// if flat argument passed it should be drop_zone id
		if (typeof(options) === 'string') {
			options = { drop_zone : options };
		}

		// figure out the options
		defaults = {
			accept: [{
				title: I18n.translate('All Files'),
				extensions: '*'
			}],
			required_caps: {
				drag_and_drop: true
			}
		};
		
		options = typeof(options) === 'object' ? Basic.extend({}, defaults, options) : defaults;

		// this will help us to find proper default container
		options.container = Dom.get(options.drop_zone) || document.body;

		// make container relative, if it is not
		if (Dom.getStyle(options.container, 'position') === 'static') {
			options.container.style.position = 'relative';
		}
					
		// normalize accept option (could be list of mime types or array of title/extensions pairs)
		if (typeof(options.accept) === 'string') {
			options.accept = Mime.mimes2extList(options.accept);
		}

		RuntimeClient.call(self);

		Basic.extend(self, {
			uid: Basic.guid('uid_'),

			ruid: null,

			files: null,

			init: function() {		
				self.bind('RuntimeInit', function(e, runtime) {
					self.ruid = runtime.uid;
					runtime.exec.call(self, 'FileDrop', 'init', options);
					self.dispatchEvent('ready');
				});
							
				// runtime needs: options.required_features, options.runtime_order and options.container
				self.connectRuntime(options); // throws RuntimeError
			},

			destroy: function() {
				var runtime = this.getRuntime();
				if (runtime) {
					runtime.exec.call(this, 'FileDrop', 'destroy');
					this.disconnectRuntime();
				}
				this.files = null;
				
				this.unbindAll();
			}
		});

		this.handleEventProps(dispatches);
	}

	FileDrop.prototype = EventTarget.instance;

	return FileDrop;
});

// Included from: src/javascript/file/FileReader.js

/**
 * FileReader.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/file/FileReader', [
	'moxie/core/utils/Basic',
	'moxie/core/utils/Encode',
	'moxie/core/Exceptions',
	'moxie/core/EventTarget',
	'moxie/file/Blob',
	'moxie/runtime/RuntimeClient'
], function(Basic, Encode, x, EventTarget, Blob, RuntimeClient) {
	/**
	Utility for preloading o.Blob/o.File objects in memory. By design closely follows [W3C FileReader](http://www.w3.org/TR/FileAPI/#dfn-filereader)
	interface. Where possible uses native FileReader, where - not falls back to shims.

	@class moxie/file/FileReader
	@constructor FileReader
	@extends EventTarget
	@uses RuntimeClient
	*/
	var dispatches = [

		/** 
		Dispatched when the read starts.

		@event loadstart
		@param {Object} event
		*/
		'loadstart', 

		/** 
		Dispatched while reading (and decoding) blob, and reporting partial Blob data (progess.loaded/progress.total).

		@event progress
		@param {Object} event
		*/
		'progress', 

		/** 
		Dispatched when the read has successfully completed.

		@event load
		@param {Object} event
		*/
		'load', 

		/** 
		Dispatched when the read has been aborted. For instance, by invoking the abort() method.

		@event abort
		@param {Object} event
		*/
		'abort', 

		/** 
		Dispatched when the read has failed.

		@event error
		@param {Object} event
		*/
		'error', 

		/** 
		Dispatched when the request has completed (either in success or failure).

		@event loadend
		@param {Object} event
		*/
		'loadend'
	];
	
	function FileReader() {

		RuntimeClient.call(this);

		Basic.extend(this, {
			/**
			UID of the component instance.

			@property uid
			@type {String}
			*/
			uid: Basic.guid('uid_'),

			/**
			Contains current state of FileReader object. Can take values of FileReader.EMPTY, FileReader.LOADING
			and FileReader.DONE.

			@property readyState
			@type {Number}
			@default FileReader.EMPTY
			*/
			readyState: FileReader.EMPTY,
			
			/**
			Result of the successful read operation.

			@property result
			@type {String}
			*/
			result: null,
			
			/**
			Stores the error of failed asynchronous read operation.

			@property error
			@type {DOMError}
			*/
			error: null,
			
			/**
			Initiates reading of File/Blob object contents to binary string.

			@method readAsBinaryString
			@param {Blob|File} blob Object to preload
			*/
			readAsBinaryString: function(blob) {
				_read.call(this, 'readAsBinaryString', blob);
			},
			
			/**
			Initiates reading of File/Blob object contents to dataURL string.

			@method readAsDataURL
			@param {Blob|File} blob Object to preload
			*/
			readAsDataURL: function(blob) {
				_read.call(this, 'readAsDataURL', blob);
			},
			
			/**
			Initiates reading of File/Blob object contents to string.

			@method readAsText
			@param {Blob|File} blob Object to preload
			*/
			readAsText: function(blob) {
				_read.call(this, 'readAsText', blob);
			},
			
			/**
			Aborts preloading process.

			@method abort
			*/
			abort: function() {
				this.result = null;
				
				if (Basic.inArray(this.readyState, [FileReader.EMPTY, FileReader.DONE]) !== -1) {
					return;
				} else if (this.readyState === FileReader.LOADING) {
					this.readyState = FileReader.DONE;
				}

				this.exec('FileReader', 'abort');
				
				this.trigger('abort');
				this.trigger('loadend');
			},

			/**
			Destroy component and release resources.

			@method destroy
			*/
			destroy: function() {
				this.abort();
				this.exec('FileReader', 'destroy');
				this.disconnectRuntime();
				this.unbindAll();
			}
		});

		// uid must already be assigned
		this.handleEventProps(dispatches);

		this.bind('Error', function(e, err) {
			this.readyState = FileReader.DONE;
			this.error = err;
		}, 999);
		
		this.bind('Load', function(e) {
			this.readyState = FileReader.DONE;
		}, 999);

		
		function _read(op, blob) {
			var self = this;			

			this.trigger('loadstart');

			if (this.readyState === FileReader.LOADING) {
				this.trigger('error', new x.DOMException(x.DOMException.INVALID_STATE_ERR));
				this.trigger('loadend');
				return;
			}

			// if source is not o.Blob/o.File
			if (!(blob instanceof Blob)) {
				this.trigger('error', new x.DOMException(x.DOMException.NOT_FOUND_ERR));
				this.trigger('loadend');
				return;
			}

			this.result = null;
			this.readyState = FileReader.LOADING;
			
			if (blob.isDetached()) {
				var src = blob.getSource();
				switch (op) {
					case 'readAsText':
					case 'readAsBinaryString':
						this.result = src;
						break;
					case 'readAsDataURL':
						this.result = 'data:' + blob.type + ';base64,' + Encode.btoa(src);
						break;
				}
				this.readyState = FileReader.DONE;
				this.trigger('load');
				this.trigger('loadend');
			} else {
				this.connectRuntime(blob.ruid);
				this.exec('FileReader', 'read', op, blob);
			}
		}
	}
	
	/**
	Initial FileReader state

	@property EMPTY
	@type {Number}
	@final
	@static
	@default 0
	*/
	FileReader.EMPTY = 0;

	/**
	FileReader switches to this state when it is preloading the source

	@property LOADING
	@type {Number}
	@final
	@static
	@default 1
	*/
	FileReader.LOADING = 1;

	/**
	Preloading is complete, this is a final state

	@property DONE
	@type {Number}
	@final
	@static
	@default 2
	*/
	FileReader.DONE = 2;

	FileReader.prototype = EventTarget.instance;

	return FileReader;
});

// Included from: src/javascript/core/utils/Url.js

/**
 * Url.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/core/utils/Url', [], function() {
	/**
	Parse url into separate components and fill in absent parts with parts from current url,
	based on https://raw.github.com/kvz/phpjs/master/functions/url/parse_url.js

	@method parseUrl
	@for Utils
	@static
	@param {String} url Url to parse (defaults to empty string if undefined)
	@return {Object} Hash containing extracted uri components
	*/
	var parseUrl = function(url, currentUrl) {
		var key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'fragment']
		, i = key.length
		, ports = {
			http: 80,
			https: 443
		}
		, uri = {}
		, regex = /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@\/]*):?([^:@\/]*))?@)?(\[[\da-fA-F:]+\]|[^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\\?([^#]*))?(?:#(.*))?)/
		, m = regex.exec(url || '')
		;

		while (i--) {
			if (m[i]) {
				uri[key[i]] = m[i];
			}
		}

		// when url is relative, we set the origin and the path ourselves
		if (!uri.scheme) {
			// come up with defaults
			if (!currentUrl || typeof(currentUrl) === 'string') {
				currentUrl = parseUrl(currentUrl || document.location.href);
			}

			uri.scheme = currentUrl.scheme;
			uri.host = currentUrl.host;
			uri.port = currentUrl.port;

			var path = '';
			// for urls without trailing slash we need to figure out the path
			if (/^[^\/]/.test(uri.path)) {
				path = currentUrl.path;
				// if path ends with a filename, strip it
				if (/\/[^\/]*\.[^\/]*$/.test(path)) {
					path = path.replace(/\/[^\/]+$/, '/');
				} else {
					// avoid double slash at the end (see #127)
					path = path.replace(/\/?$/, '/');
				}
			}
			uri.path = path + (uri.path || ''); // site may reside at domain.com or domain.com/subdir
		}

		if (!uri.port) {
			uri.port = ports[uri.scheme] || 80;
		}

		uri.port = parseInt(uri.port, 10);

		if (!uri.path) {
			uri.path = "/";
		}

		delete uri.source;

		return uri;
	};

	/**
	Resolve url - among other things will turn relative url to absolute

	@method resolveUrl
	@static
	@param {String|Object} url Either absolute or relative, or a result of parseUrl call
	@return {String} Resolved, absolute url
	*/
	var resolveUrl = function(url) {
		var ports = { // we ignore default ports
			http: 80,
			https: 443
		}
		, urlp = typeof(url) === 'object' ? url : parseUrl(url);
		;

		return urlp.scheme + '://' + urlp.host + (urlp.port !== ports[urlp.scheme] ? ':' + urlp.port : '') + urlp.path + (urlp.query ? urlp.query : '');
	};

	/**
	Check if specified url has the same origin as the current document

	@method hasSameOrigin
	@param {String|Object} url
	@return {Boolean}
	*/
	var hasSameOrigin = function(url) {
		function origin(url) {
			return [url.scheme, url.host, url.port].join('/');
		}

		if (typeof url === 'string') {
			url = parseUrl(url);
		}

		return origin(parseUrl()) === origin(url);
	};

	return {
		parseUrl: parseUrl,
		resolveUrl: resolveUrl,
		hasSameOrigin: hasSameOrigin
	};
});

// Included from: src/javascript/runtime/RuntimeTarget.js

/**
 * RuntimeTarget.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/runtime/RuntimeTarget', [
	'moxie/core/utils/Basic',
	'moxie/runtime/RuntimeClient',
	"moxie/core/EventTarget"
], function(Basic, RuntimeClient, EventTarget) {
	/**
	Instance of this class can be used as a target for the events dispatched by shims,
	when allowing them onto components is for either reason inappropriate

	@class moxie/runtime/RuntimeTarget
	@constructor
	@protected
	@extends EventTarget
	*/
	function RuntimeTarget() {
		this.uid = Basic.guid('uid_');
		
		RuntimeClient.call(this);

		this.destroy = function() {
			this.disconnectRuntime();
			this.unbindAll();
		};
	}

	RuntimeTarget.prototype = EventTarget.instance;

	return RuntimeTarget;
});

// Included from: src/javascript/file/FileReaderSync.js

/**
 * FileReaderSync.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/file/FileReaderSync', [
	'moxie/core/utils/Basic',
	'moxie/runtime/RuntimeClient',
	'moxie/core/utils/Encode'
], function(Basic, RuntimeClient, Encode) {
	/**
	Synchronous FileReader implementation. Something like this is available in WebWorkers environment, here
	it can be used to read only preloaded blobs/files and only below certain size (not yet sure what that'd be,
	but probably < 1mb). Not meant to be used directly by user.

	@class moxie/file/FileReaderSync
	@private
	@constructor
	*/
	return function() {
		RuntimeClient.call(this);

		Basic.extend(this, {
			uid: Basic.guid('uid_'),

			readAsBinaryString: function(blob) {
				return _read.call(this, 'readAsBinaryString', blob);
			},
			
			readAsDataURL: function(blob) {
				return _read.call(this, 'readAsDataURL', blob);
			},
			
			/*readAsArrayBuffer: function(blob) {
				return _read.call(this, 'readAsArrayBuffer', blob);
			},*/
			
			readAsText: function(blob) {
				return _read.call(this, 'readAsText', blob);
			}
		});

		function _read(op, blob) {
			if (blob.isDetached()) {
				var src = blob.getSource();
				switch (op) {
					case 'readAsBinaryString':
						return src;
					case 'readAsDataURL':
						return 'data:' + blob.type + ';base64,' + Encode.btoa(src);
					case 'readAsText':
						var txt = '';
						for (var i = 0, length = src.length; i < length; i++) {
							txt += String.fromCharCode(src[i]);
						}
						return txt;
				}
			} else {
				var result = this.connectRuntime(blob.ruid).exec.call(this, 'FileReaderSync', 'read', op, blob);
				this.disconnectRuntime();
				return result;
			}
		}
	};
});

// Included from: src/javascript/xhr/FormData.js

/**
 * FormData.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define("moxie/xhr/FormData", [
	"moxie/core/Exceptions",
	"moxie/core/utils/Basic",
	"moxie/file/Blob"
], function(x, Basic, Blob) {
	/**
	FormData

	@class moxie/xhr/FormData
	@constructor
	*/
	function FormData() {
		var _blob, _fields = [];

		Basic.extend(this, {
			/**
			Append another key-value pair to the FormData object

			@method append
			@param {String} name Name for the new field
			@param {String|Blob|Array|Object} value Value for the field
			*/
			append: function(name, value) {
				var self = this, valueType = Basic.typeOf(value);

				// according to specs value might be either Blob or String
				if (value instanceof Blob) {
					_blob = {
						name: name,
						value: value // unfortunately we can only send single Blob in one FormData
					};
				} else if ('array' === valueType) {
					name += '[]';

					Basic.each(value, function(value) {
						self.append(name, value);
					});
				} else if ('object' === valueType) {
					Basic.each(value, function(value, key) {
						self.append(name + '[' + key + ']', value);
					});
				} else if ('null' === valueType || 'undefined' === valueType || 'number' === valueType && isNaN(value)) {
					self.append(name, "false");
				} else {
					_fields.push({
						name: name,
						value: value.toString()
					});
				}
			},

			/**
			Checks if FormData contains Blob.

			@method hasBlob
			@return {Boolean}
			*/
			hasBlob: function() {
				return !!this.getBlob();
			},

			/**
			Retrieves blob.

			@method getBlob
			@return {Object} Either Blob if found or null
			*/
			getBlob: function() {
				return _blob && _blob.value || null;
			},

			/**
			Retrieves blob field name.

			@method getBlobName
			@return {String} Either Blob field name or null
			*/
			getBlobName: function() {
				return _blob && _blob.name || null;
			},

			/**
			Loop over the fields in FormData and invoke the callback for each of them.

			@method each
			@param {Function} cb Callback to call for each field
			*/
			each: function(cb) {
				Basic.each(_fields, function(field) {
					cb(field.value, field.name);
				});

				if (_blob) {
					cb(_blob.value, _blob.name);
				}
			},

			destroy: function() {
				_blob = null;
				_fields = [];
			}
		});
	}

	return FormData;
});

// Included from: src/javascript/xhr/XMLHttpRequest.js

/**
 * XMLHttpRequest.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define("moxie/xhr/XMLHttpRequest", [
	"moxie/core/utils/Basic",
	"moxie/core/Exceptions",
	"moxie/core/EventTarget",
	"moxie/core/utils/Encode",
	"moxie/core/utils/Url",
	"moxie/runtime/Runtime",
	"moxie/runtime/RuntimeTarget",
	"moxie/file/Blob",
	"moxie/file/FileReaderSync",
	"moxie/xhr/FormData",
	"moxie/core/utils/Env",
	"moxie/core/utils/Mime"
], function(Basic, x, EventTarget, Encode, Url, Runtime, RuntimeTarget, Blob, FileReaderSync, FormData, Env, Mime) {

	var httpCode = {
		100: 'Continue',
		101: 'Switching Protocols',
		102: 'Processing',

		200: 'OK',
		201: 'Created',
		202: 'Accepted',
		203: 'Non-Authoritative Information',
		204: 'No Content',
		205: 'Reset Content',
		206: 'Partial Content',
		207: 'Multi-Status',
		226: 'IM Used',

		300: 'Multiple Choices',
		301: 'Moved Permanently',
		302: 'Found',
		303: 'See Other',
		304: 'Not Modified',
		305: 'Use Proxy',
		306: 'Reserved',
		307: 'Temporary Redirect',

		400: 'Bad Request',
		401: 'Unauthorized',
		402: 'Payment Required',
		403: 'Forbidden',
		404: 'Not Found',
		405: 'Method Not Allowed',
		406: 'Not Acceptable',
		407: 'Proxy Authentication Required',
		408: 'Request Timeout',
		409: 'Conflict',
		410: 'Gone',
		411: 'Length Required',
		412: 'Precondition Failed',
		413: 'Request Entity Too Large',
		414: 'Request-URI Too Long',
		415: 'Unsupported Media Type',
		416: 'Requested Range Not Satisfiable',
		417: 'Expectation Failed',
		422: 'Unprocessable Entity',
		423: 'Locked',
		424: 'Failed Dependency',
		426: 'Upgrade Required',

		500: 'Internal Server Error',
		501: 'Not Implemented',
		502: 'Bad Gateway',
		503: 'Service Unavailable',
		504: 'Gateway Timeout',
		505: 'HTTP Version Not Supported',
		506: 'Variant Also Negotiates',
		507: 'Insufficient Storage',
		510: 'Not Extended'
	};

	function XMLHttpRequestUpload() {
		this.uid = Basic.guid('uid_');
	}

	XMLHttpRequestUpload.prototype = EventTarget.instance;

	/**
	Implementation of XMLHttpRequest

	@class moxie/xhr/XMLHttpRequest
	@constructor
	@uses RuntimeClient
	@extends EventTarget
	*/
	var dispatches = [
		'loadstart',

		'progress',

		'abort',

		'error',

		'load',

		'timeout',

		'loadend'

		// readystatechange (for historical reasons)
	];

	var NATIVE = 1, RUNTIME = 2;

	function XMLHttpRequest() {
		var self = this,
			// this (together with _p() @see below) is here to gracefully upgrade to setter/getter syntax where possible
			props = {
				/**
				The amount of milliseconds a request can take before being terminated. Initially zero. Zero means there is no timeout.

				@property timeout
				@type Number
				@default 0
				*/
				timeout: 0,

				/**
				Current state, can take following values:
				UNSENT (numeric value 0)
				The object has been constructed.

				OPENED (numeric value 1)
				The open() method has been successfully invoked. During this state request headers can be set using setRequestHeader() and the request can be made using the send() method.

				HEADERS_RECEIVED (numeric value 2)
				All redirects (if any) have been followed and all HTTP headers of the final response have been received. Several response members of the object are now available.

				LOADING (numeric value 3)
				The response entity body is being received.

				DONE (numeric value 4)

				@property readyState
				@type Number
				@default 0 (UNSENT)
				*/
				readyState: XMLHttpRequest.UNSENT,

				/**
				True when user credentials are to be included in a cross-origin request. False when they are to be excluded
				in a cross-origin request and when cookies are to be ignored in its response. Initially false.

				@property withCredentials
				@type Boolean
				@default false
				*/
				withCredentials: false,

				/**
				Returns the HTTP status code.

				@property status
				@type Number
				@default 0
				*/
				status: 0,

				/**
				Returns the HTTP status text.

				@property statusText
				@type String
				*/
				statusText: "",

				/**
				Returns the response type. Can be set to change the response type. Values are:
				the empty string (default), "arraybuffer", "blob", "document", "json", and "text".

				@property responseType
				@type String
				*/
				responseType: "",

				/**
				Returns the document response entity body.

				Throws an "InvalidStateError" exception if responseType is not the empty string or "document".

				@property responseXML
				@type Document
				*/
				responseXML: null,

				/**
				Returns the text response entity body.

				Throws an "InvalidStateError" exception if responseType is not the empty string or "text".

				@property responseText
				@type String
				*/
				responseText: null,

				/**
				Returns the response entity body (http://www.w3.org/TR/XMLHttpRequest/#response-entity-body).
				Can become: ArrayBuffer, Blob, Document, JSON, Text

				@property response
				@type Mixed
				*/
				response: null
			},

			_async = true,
			_url,
			_method,
			_headers = {},
			_user,
			_password,
			_encoding = null,
			_mimeType = null,

			// flags
			_sync_flag = false,
			_send_flag = false,
			_upload_events_flag = false,
			_upload_complete_flag = false,
			_error_flag = false,
			_same_origin_flag = false,

			// times
			_start_time,
			_timeoutset_time,

			_finalMime = null,
			_finalCharset = null,

			_options = {},
			_xhr,
			_responseHeaders = '',
			_responseHeadersBag
			;


		Basic.extend(this, props, {
			/**
			Unique id of the component

			@property uid
			@type String
			*/
			uid: Basic.guid('uid_'),

			/**
			Target for Upload events

			@property upload
			@type XMLHttpRequestUpload
			*/
			upload: new XMLHttpRequestUpload(),


			/**
			Sets the request method, request URL, synchronous flag, request username, and request password.

			Throws a "SyntaxError" exception if one of the following is true:

			method is not a valid HTTP method.
			url cannot be resolved.
			url contains the "user:password" format in the userinfo production.
			Throws a "SecurityError" exception if method is a case-insensitive match for CONNECT, TRACE or TRACK.

			Throws an "InvalidAccessError" exception if one of the following is true:

			Either user or password is passed as argument and the origin of url does not match the XMLHttpRequest origin.
			There is an associated XMLHttpRequest document and either the timeout attribute is not zero,
			the withCredentials attribute is true, or the responseType attribute is not the empty string.


			@method open
			@param {String} method HTTP method to use on request
			@param {String} url URL to request
			@param {Boolean} [async=true] If false request will be done in synchronous manner. Asynchronous by default.
			@param {String} [user] Username to use in HTTP authentication process on server-side
			@param {String} [password] Password to use in HTTP authentication process on server-side
			*/
			open: function(method, url, async, user, password) {
				var urlp;

				// first two arguments are required
				if (!method || !url) {
					throw new x.DOMException(x.DOMException.SYNTAX_ERR);
				}

				// 2 - check if any code point in method is higher than U+00FF or after deflating method it does not match the method
				if (/[\u0100-\uffff]/.test(method) || Encode.utf8_encode(method) !== method) {
					throw new x.DOMException(x.DOMException.SYNTAX_ERR);
				}

				// 3
				if (!!~Basic.inArray(method.toUpperCase(), ['CONNECT', 'DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT', 'TRACE', 'TRACK'])) {
					_method = method.toUpperCase();
				}


				// 4 - allowing these methods poses a security risk
				if (!!~Basic.inArray(_method, ['CONNECT', 'TRACE', 'TRACK'])) {
					throw new x.DOMException(x.DOMException.SECURITY_ERR);
				}

				// 5
				url = Encode.utf8_encode(url);

				// 6 - Resolve url relative to the XMLHttpRequest base URL. If the algorithm returns an error, throw a "SyntaxError".
				urlp = Url.parseUrl(url);

				_same_origin_flag = Url.hasSameOrigin(urlp);

				// 7 - manually build up absolute url
				_url = Url.resolveUrl(url);

				// 9-10, 12-13
				if ((user || password) && !_same_origin_flag) {
					throw new x.DOMException(x.DOMException.INVALID_ACCESS_ERR);
				}

				_user = user || urlp.user;
				_password = password || urlp.pass;

				// 11
				_async = async || true;

				if (_async === false && (_p('timeout') || _p('withCredentials') || _p('responseType') !== "")) {
					throw new x.DOMException(x.DOMException.INVALID_ACCESS_ERR);
				}

				// 14 - terminate abort()

				// 15 - terminate send()

				// 18
				_sync_flag = !_async;
				_send_flag = false;
				_headers = {};
				_reset.call(this);

				// 19
				_p('readyState', XMLHttpRequest.OPENED);

				// 20
				this.dispatchEvent('readystatechange');
			},

			/**
			Appends an header to the list of author request headers, or if header is already
			in the list of author request headers, combines its value with value.

			Throws an "InvalidStateError" exception if the state is not OPENED or if the send() flag is set.
			Throws a "SyntaxError" exception if header is not a valid HTTP header field name or if value
			is not a valid HTTP header field value.

			@method setRequestHeader
			@param {String} header
			@param {String|Number} value
			*/
			setRequestHeader: function(header, value) {
				var uaHeaders = [ // these headers are controlled by the user agent
						"accept-charset",
						"accept-encoding",
						"access-control-request-headers",
						"access-control-request-method",
						"connection",
						"content-length",
						"cookie",
						"cookie2",
						"content-transfer-encoding",
						"date",
						"expect",
						"host",
						"keep-alive",
						"origin",
						"referer",
						"te",
						"trailer",
						"transfer-encoding",
						"upgrade",
						"user-agent",
						"via"
					];

				// 1-2
				if (_p('readyState') !== XMLHttpRequest.OPENED || _send_flag) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				// 3
				if (/[\u0100-\uffff]/.test(header) || Encode.utf8_encode(header) !== header) {
					throw new x.DOMException(x.DOMException.SYNTAX_ERR);
				}

				// 4
				/* this step is seemingly bypassed in browsers, probably to allow various unicode characters in header values
				if (/[\u0100-\uffff]/.test(value) || Encode.utf8_encode(value) !== value) {
					throw new x.DOMException(x.DOMException.SYNTAX_ERR);
				}*/

				header = Basic.trim(header).toLowerCase();

				// setting of proxy-* and sec-* headers is prohibited by spec
				if (!!~Basic.inArray(header, uaHeaders) || /^(proxy\-|sec\-)/.test(header)) {
					return false;
				}

				// camelize
				// browsers lowercase header names (at least for custom ones)
				// header = header.replace(/\b\w/g, function($1) { return $1.toUpperCase(); });

				if (!_headers[header]) {
					_headers[header] = value;
				} else {
					// http://tools.ietf.org/html/rfc2616#section-4.2 (last paragraph)
					_headers[header] += ', ' + value;
				}
				return true;
			},

			/**
			 * Test if the specified header is already set on this request.
			 * Returns a header value or boolean false if it's not yet set.
			 *
			 * @method hasRequestHeader
			 * @param {String} header Name of the header to test
			 * @return {Boolean|String}
			 */
			hasRequestHeader: function(header) {
				return header && _headers[header.toLowerCase()] || false;
			},

			/**
			Returns all headers from the response, with the exception of those whose field name is Set-Cookie or Set-Cookie2.

			@method getAllResponseHeaders
			@return {String} reponse headers or empty string
			*/
			getAllResponseHeaders: function() {
				return _responseHeaders || '';
			},

			/**
			Returns the header field value from the response of which the field name matches header,
			unless the field name is Set-Cookie or Set-Cookie2.

			@method getResponseHeader
			@param {String} header
			@return {String} value(s) for the specified header or null
			*/
			getResponseHeader: function(header) {
				header = header.toLowerCase();

				if (_error_flag || !!~Basic.inArray(header, ['set-cookie', 'set-cookie2'])) {
					return null;
				}

				if (_responseHeaders && _responseHeaders !== '') {
					// if we didn't parse response headers until now, do it and keep for later
					if (!_responseHeadersBag) {
						_responseHeadersBag = {};
						Basic.each(_responseHeaders.split(/\r\n/), function(line) {
							var pair = line.split(/:\s+/);
							if (pair.length === 2) { // last line might be empty, omit
								pair[0] = Basic.trim(pair[0]); // just in case
								_responseHeadersBag[pair[0].toLowerCase()] = { // simply to retain header name in original form
									header: pair[0],
									value: Basic.trim(pair[1])
								};
							}
						});
					}
					if (_responseHeadersBag.hasOwnProperty(header)) {
						return _responseHeadersBag[header].header + ': ' + _responseHeadersBag[header].value;
					}
				}
				return null;
			},

			/**
			Sets the Content-Type header for the response to mime.
			Throws an "InvalidStateError" exception if the state is LOADING or DONE.
			Throws a "SyntaxError" exception if mime is not a valid media type.

			@method overrideMimeType
			@param String mime Mime type to set
			*/
			overrideMimeType: function(mime) {
				var matches, charset;

				// 1
				if (!!~Basic.inArray(_p('readyState'), [XMLHttpRequest.LOADING, XMLHttpRequest.DONE])) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				// 2
				mime = Basic.trim(mime.toLowerCase());

				if (/;/.test(mime) && (matches = mime.match(/^([^;]+)(?:;\scharset\=)?(.*)$/))) {
					mime = matches[1];
					if (matches[2]) {
						charset = matches[2];
					}
				}

				if (!Mime.mimes[mime]) {
					throw new x.DOMException(x.DOMException.SYNTAX_ERR);
				}

				// 3-4
				_finalMime = mime;
				_finalCharset = charset;
			},

			/**
			Initiates the request. The optional argument provides the request entity body.
			The argument is ignored if request method is GET or HEAD.

			Throws an "InvalidStateError" exception if the state is not OPENED or if the send() flag is set.

			@method send
			@param {Blob|Document|String|FormData} [data] Request entity body
			@param {Object} [options] Set of requirements and pre-requisities for runtime initialization
			*/
			send: function(data, options) {
				if (Basic.typeOf(options) === 'string') {
					_options = { ruid: options };
				} else if (!options) {
					_options = {};
				} else {
					_options = options;
				}

				// 1-2
				if (this.readyState !== XMLHttpRequest.OPENED || _send_flag) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				// 3
				// sending Blob
				if (data instanceof Blob) {
					_options.ruid = data.ruid;
					_mimeType = data.type || 'application/octet-stream';
				}

				// FormData
				else if (data instanceof FormData) {
					if (data.hasBlob()) {
						var blob = data.getBlob();
						_options.ruid = blob.ruid;
						_mimeType = blob.type || 'application/octet-stream';
					}
				}

				// DOMString
				else if (typeof data === 'string') {
					_encoding = 'UTF-8';
					_mimeType = 'text/plain;charset=UTF-8';

					// data should be converted to Unicode and encoded as UTF-8
					data = Encode.utf8_encode(data);
				}

				// if withCredentials not set, but requested, set it automatically
				if (!this.withCredentials) {
					this.withCredentials = (_options.required_caps && _options.required_caps.send_browser_cookies) && !_same_origin_flag;
				}

				// 4 - storage mutex
				// 5
				_upload_events_flag = (!_sync_flag && this.upload.hasEventListener()); // DSAP
				// 6
				_error_flag = false;
				// 7
				_upload_complete_flag = !data;
				// 8 - Asynchronous steps
				if (!_sync_flag) {
					// 8.1
					_send_flag = true;
					// 8.2
					// this.dispatchEvent('loadstart'); // will be dispatched either by native or runtime xhr
					// 8.3
					//if (!_upload_complete_flag) {
						// this.upload.dispatchEvent('loadstart');	// will be dispatched either by native or runtime xhr
					//}
				}
				// 8.5 - Return the send() method call, but continue running the steps in this algorithm.
				_doXHR.call(this, data);
			},

			/**
			Cancels any network activity.

			@method abort
			*/
			abort: function() {
				_error_flag = true;
				_sync_flag = false;

				if (!~Basic.inArray(_p('readyState'), [XMLHttpRequest.UNSENT, XMLHttpRequest.OPENED, XMLHttpRequest.DONE])) {
					_p('readyState', XMLHttpRequest.DONE);
					_send_flag = false;

					if (_xhr) {
						_xhr.getRuntime().exec.call(_xhr, 'XMLHttpRequest', 'abort', _upload_complete_flag);
					} else {
						throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					}

					_upload_complete_flag = true;
				} else {
					_p('readyState', XMLHttpRequest.UNSENT);
				}
			},

			destroy: function() {
				if (_xhr) {
					if (Basic.typeOf(_xhr.destroy) === 'function') {
						_xhr.destroy();
					}
					_xhr = null;
				}

				this.unbindAll();

				if (this.upload) {
					this.upload.unbindAll();
					this.upload = null;
				}
			}
		});

		this.handleEventProps(dispatches.concat(['readystatechange'])); // for historical reasons
		this.upload.handleEventProps(dispatches);

		/* this is nice, but maybe too lengthy

		// if supported by JS version, set getters/setters for specific properties
		o.defineProperty(this, 'readyState', {
			configurable: false,

			get: function() {
				return _p('readyState');
			}
		});

		o.defineProperty(this, 'timeout', {
			configurable: false,

			get: function() {
				return _p('timeout');
			},

			set: function(value) {

				if (_sync_flag) {
					throw new x.DOMException(x.DOMException.INVALID_ACCESS_ERR);
				}

				// timeout still should be measured relative to the start time of request
				_timeoutset_time = (new Date).getTime();

				_p('timeout', value);
			}
		});

		// the withCredentials attribute has no effect when fetching same-origin resources
		o.defineProperty(this, 'withCredentials', {
			configurable: false,

			get: function() {
				return _p('withCredentials');
			},

			set: function(value) {
				// 1-2
				if (!~o.inArray(_p('readyState'), [XMLHttpRequest.UNSENT, XMLHttpRequest.OPENED]) || _send_flag) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				// 3-4
				if (_anonymous_flag || _sync_flag) {
					throw new x.DOMException(x.DOMException.INVALID_ACCESS_ERR);
				}

				// 5
				_p('withCredentials', value);
			}
		});

		o.defineProperty(this, 'status', {
			configurable: false,

			get: function() {
				return _p('status');
			}
		});

		o.defineProperty(this, 'statusText', {
			configurable: false,

			get: function() {
				return _p('statusText');
			}
		});

		o.defineProperty(this, 'responseType', {
			configurable: false,

			get: function() {
				return _p('responseType');
			},

			set: function(value) {
				// 1
				if (!!~o.inArray(_p('readyState'), [XMLHttpRequest.LOADING, XMLHttpRequest.DONE])) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				// 2
				if (_sync_flag) {
					throw new x.DOMException(x.DOMException.INVALID_ACCESS_ERR);
				}

				// 3
				_p('responseType', value.toLowerCase());
			}
		});

		o.defineProperty(this, 'responseText', {
			configurable: false,

			get: function() {
				// 1
				if (!~o.inArray(_p('responseType'), ['', 'text'])) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				// 2-3
				if (_p('readyState') !== XMLHttpRequest.DONE && _p('readyState') !== XMLHttpRequest.LOADING || _error_flag) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				return _p('responseText');
			}
		});

		o.defineProperty(this, 'responseXML', {
			configurable: false,

			get: function() {
				// 1
				if (!~o.inArray(_p('responseType'), ['', 'document'])) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				// 2-3
				if (_p('readyState') !== XMLHttpRequest.DONE || _error_flag) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}

				return _p('responseXML');
			}
		});

		o.defineProperty(this, 'response', {
			configurable: false,

			get: function() {
				if (!!~o.inArray(_p('responseType'), ['', 'text'])) {
					if (_p('readyState') !== XMLHttpRequest.DONE && _p('readyState') !== XMLHttpRequest.LOADING || _error_flag) {
						return '';
					}
				}

				if (_p('readyState') !== XMLHttpRequest.DONE || _error_flag) {
					return null;
				}

				return _p('response');
			}
		});

		*/

		function _p(prop, value) {
			if (!props.hasOwnProperty(prop)) {
				return;
			}
			if (arguments.length === 1) { // get
				return Env.can('define_property') ? props[prop] : self[prop];
			} else { // set
				if (Env.can('define_property')) {
					props[prop] = value;
				} else {
					self[prop] = value;
				}
			}
		}

		/*
		function _toASCII(str, AllowUnassigned, UseSTD3ASCIIRules) {
			// TODO: http://tools.ietf.org/html/rfc3490#section-4.1
			return str.toLowerCase();
		}
		*/


		function _doXHR(data) {
			var self = this;

			_start_time = new Date().getTime();

			_xhr = new RuntimeTarget();

			function loadEnd() {
				if (_xhr) { // it could have been destroyed by now
					_xhr.destroy();
					_xhr = null;
				}
				self.dispatchEvent('loadend');
				self = null;
			}

			function exec(runtime) {
				_xhr.bind('LoadStart', function(e) {
					_p('readyState', XMLHttpRequest.LOADING);
					self.dispatchEvent('readystatechange');

					self.dispatchEvent(e);

					if (_upload_events_flag) {
						self.upload.dispatchEvent(e);
					}
				});

				_xhr.bind('Progress', function(e) {
					if (_p('readyState') !== XMLHttpRequest.LOADING) {
						_p('readyState', XMLHttpRequest.LOADING); // LoadStart unreliable (in Flash for example)
						self.dispatchEvent('readystatechange');
					}
					self.dispatchEvent(e);
				});

				_xhr.bind('UploadProgress', function(e) {
					if (_upload_events_flag) {
						self.upload.dispatchEvent({
							type: 'progress',
							lengthComputable: false,
							total: e.total,
							loaded: e.loaded
						});
					}
				});

				_xhr.bind('Load', function(e) {
					_p('readyState', XMLHttpRequest.DONE);
					_p('status', Number(runtime.exec.call(_xhr, 'XMLHttpRequest', 'getStatus') || 0));
					_p('statusText', httpCode[_p('status')] || "");

					_p('response', runtime.exec.call(_xhr, 'XMLHttpRequest', 'getResponse', _p('responseType')));

					if (!!~Basic.inArray(_p('responseType'), ['text', ''])) {
						_p('responseText', _p('response'));
					} else if (_p('responseType') === 'document') {
						_p('responseXML', _p('response'));
					}

					_responseHeaders = runtime.exec.call(_xhr, 'XMLHttpRequest', 'getAllResponseHeaders');

					self.dispatchEvent('readystatechange');

					if (_p('status') > 0) { // status 0 usually means that server is unreachable
						if (_upload_events_flag) {
							self.upload.dispatchEvent(e);
						}
						self.dispatchEvent(e);
					} else {
						_error_flag = true;
						self.dispatchEvent('error');
					}
					loadEnd();
				});

				_xhr.bind('Abort', function(e) {
					self.dispatchEvent(e);
					loadEnd();
				});

				_xhr.bind('Error', function(e) {
					_error_flag = true;
					_p('readyState', XMLHttpRequest.DONE);
					self.dispatchEvent('readystatechange');
					_upload_complete_flag = true;
					self.dispatchEvent(e);
					loadEnd();
				});

				runtime.exec.call(_xhr, 'XMLHttpRequest', 'send', {
					url: _url,
					method: _method,
					async: _async,
					user: _user,
					password: _password,
					headers: _headers,
					mimeType: _mimeType,
					encoding: _encoding,
					responseType: self.responseType,
					withCredentials: self.withCredentials,
					options: _options
				}, data);
			}

			// clarify our requirements
			if (typeof(_options.required_caps) === 'string') {
				_options.required_caps = Runtime.parseCaps(_options.required_caps);
			}

			_options.required_caps = Basic.extend({}, _options.required_caps, {
				return_response_type: self.responseType
			});

			if (data instanceof FormData) {
				_options.required_caps.send_multipart = true;
			}

			if (!Basic.isEmptyObj(_headers)) {
				_options.required_caps.send_custom_headers = true;
			}

			if (!_same_origin_flag) {
				_options.required_caps.do_cors = true;
			}


			if (_options.ruid) { // we do not need to wait if we can connect directly
				exec(_xhr.connectRuntime(_options));
			} else {
				_xhr.bind('RuntimeInit', function(e, runtime) {
					exec(runtime);
				});
				_xhr.bind('RuntimeError', function(e, err) {
					self.dispatchEvent('RuntimeError', err);
				});
				_xhr.connectRuntime(_options);
			}
		}


		function _reset() {
			_p('responseText', "");
			_p('responseXML', null);
			_p('response', null);
			_p('status', 0);
			_p('statusText', "");
			_start_time = _timeoutset_time = null;
		}
	}

	XMLHttpRequest.UNSENT = 0;
	XMLHttpRequest.OPENED = 1;
	XMLHttpRequest.HEADERS_RECEIVED = 2;
	XMLHttpRequest.LOADING = 3;
	XMLHttpRequest.DONE = 4;

	XMLHttpRequest.prototype = EventTarget.instance;

	return XMLHttpRequest;
});

// Included from: src/javascript/runtime/Transporter.js

/**
 * Transporter.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define("moxie/runtime/Transporter", [
	"moxie/core/utils/Basic",
	"moxie/core/utils/Encode",
	"moxie/runtime/RuntimeClient",
	"moxie/core/EventTarget"
], function(Basic, Encode, RuntimeClient, EventTarget) {

	/**
	@class moxie/runtime/Transporter
	@constructor
	*/
	function Transporter() {
		var mod, _runtime, _data, _size, _pos, _chunk_size;

		RuntimeClient.call(this);

		Basic.extend(this, {
			uid: Basic.guid('uid_'),

			state: Transporter.IDLE,

			result: null,

			transport: function(data, type, options) {
				var self = this;

				options = Basic.extend({
					chunk_size: 204798
				}, options);

				// should divide by three, base64 requires this
				if ((mod = options.chunk_size % 3)) {
					options.chunk_size += 3 - mod;
				}

				_chunk_size = options.chunk_size;

				_reset.call(this);
				_data = data;
				_size = data.length;

				if (Basic.typeOf(options) === 'string' || options.ruid) {
					_run.call(self, type, this.connectRuntime(options));
				} else {
					// we require this to run only once
					var cb = function(e, runtime) {
						self.unbind("RuntimeInit", cb);
						_run.call(self, type, runtime);
					};
					this.bind("RuntimeInit", cb);
					this.connectRuntime(options);
				}
			},

			abort: function() {
				var self = this;

				self.state = Transporter.IDLE;
				if (_runtime) {
					_runtime.exec.call(self, 'Transporter', 'clear');
					self.trigger("TransportingAborted");
				}

				_reset.call(self);
			},


			destroy: function() {
				this.unbindAll();
				_runtime = null;
				this.disconnectRuntime();
				_reset.call(this);
			}
		});

		function _reset() {
			_size = _pos = 0;
			_data = this.result = null;
		}

		function _run(type, runtime) {
			var self = this;

			_runtime = runtime;

			//self.unbind("RuntimeInit");

			self.bind("TransportingProgress", function(e) {
				_pos = e.loaded;

				if (_pos < _size && Basic.inArray(self.state, [Transporter.IDLE, Transporter.DONE]) === -1) {
					_transport.call(self);
				}
			}, 999);

			self.bind("TransportingComplete", function() {
				_pos = _size;
				self.state = Transporter.DONE;
				_data = null; // clean a bit
				self.result = _runtime.exec.call(self, 'Transporter', 'getAsBlob', type || '');
			}, 999);

			self.state = Transporter.BUSY;
			self.trigger("TransportingStarted");
			_transport.call(self);
		}

		function _transport() {
			var self = this,
				chunk,
				bytesLeft = _size - _pos;

			if (_chunk_size > bytesLeft) {
				_chunk_size = bytesLeft;
			}

			chunk = Encode.btoa(_data.substr(_pos, _chunk_size));
			_runtime.exec.call(self, 'Transporter', 'receive', chunk, _size);
		}
	}

	Transporter.IDLE = 0;
	Transporter.BUSY = 1;
	Transporter.DONE = 2;

	Transporter.prototype = EventTarget.instance;

	return Transporter;
});

// Included from: src/javascript/image/Image.js

/**
 * Image.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define("moxie/image/Image", [
	"moxie/core/utils/Basic",
	"moxie/core/utils/Dom",
	"moxie/core/Exceptions",
	"moxie/file/FileReaderSync",
	"moxie/xhr/XMLHttpRequest",
	"moxie/runtime/Runtime",
	"moxie/runtime/RuntimeClient",
	"moxie/runtime/Transporter",
	"moxie/core/utils/Env",
	"moxie/core/EventTarget",
	"moxie/file/Blob",
	"moxie/file/File",
	"moxie/core/utils/Encode"
], function(Basic, Dom, x, FileReaderSync, XMLHttpRequest, Runtime, RuntimeClient, Transporter, Env, EventTarget, Blob, File, Encode) {
	/**
	Image preloading and manipulation utility. Additionally it provides access to image meta info (Exif, GPS) and raw binary data.

	@class moxie/image/Image
	@constructor
	@extends EventTarget
	*/
	var dispatches = [
		'progress',

		/**
		Dispatched when loading is complete.

		@event load
		@param {Object} event
		*/
		'load',

		'error',

		/**
		Dispatched when resize operation is complete.
		
		@event resize
		@param {Object} event
		*/
		'resize',

		/**
		Dispatched when visual representation of the image is successfully embedded
		into the corresponsing container.

		@event embedded
		@param {Object} event
		*/
		'embedded'
	];

	function Image() {

		RuntimeClient.call(this);

		Basic.extend(this, {
			/**
			Unique id of the component

			@property uid
			@type {String}
			*/
			uid: Basic.guid('uid_'),

			/**
			Unique id of the connected runtime, if any.

			@property ruid
			@type {String}
			*/
			ruid: null,

			/**
			Name of the file, that was used to create an image, if available. If not equals to empty string.

			@property name
			@type {String}
			@default ""
			*/
			name: "",

			/**
			Size of the image in bytes. Actual value is set only after image is preloaded.

			@property size
			@type {Number}
			@default 0
			*/
			size: 0,

			/**
			Width of the image. Actual value is set only after image is preloaded.

			@property width
			@type {Number}
			@default 0
			*/
			width: 0,

			/**
			Height of the image. Actual value is set only after image is preloaded.

			@property height
			@type {Number}
			@default 0
			*/
			height: 0,

			/**
			Mime type of the image. Currently only image/jpeg and image/png are supported. Actual value is set only after image is preloaded.

			@property type
			@type {String}
			@default ""
			*/
			type: "",

			/**
			Holds meta info (Exif, GPS). Is populated only for image/jpeg. Actual value is set only after image is preloaded.

			@property meta
			@type {Object}
			@default {}
			*/
			meta: {},

			/**
			Alias for load method, that takes another mOxie.Image object as a source (see load).

			@method clone
			@param {Image} src Source for the image
			@param {Boolean} [exact=false] Whether to activate in-depth clone mode
			*/
			clone: function() {
				this.load.apply(this, arguments);
			},

			/**
			Loads image from various sources. Currently the source for new image can be: mOxie.Image, mOxie.Blob/mOxie.File, 
			native Blob/File, dataUrl or URL. Depending on the type of the source, arguments - differ. When source is URL, 
			Image will be downloaded from remote destination and loaded in memory.

			@example
				var img = new mOxie.Image();
				img.onload = function() {
					var blob = img.getAsBlob();
					
					var formData = new mOxie.FormData();
					formData.append('file', blob);

					var xhr = new mOxie.XMLHttpRequest();
					xhr.onload = function() {
						// upload complete
					};
					xhr.open('post', 'upload.php');
					xhr.send(formData);
				};
				img.load("http://www.moxiecode.com/images/mox-logo.jpg"); // notice file extension (.jpg)
			

			@method load
			@param {Image|Blob|File|String} src Source for the image
			@param {Boolean|Object} [mixed]
			*/
			load: function() {
				_load.apply(this, arguments);
			},


			/**
			Resizes the image to fit the specified width/height. If crop is specified, image will also be 
			cropped to the exact dimensions.

			@method resize
			@since 3.0
			@param {Object} options
				@param {Number} options.width Resulting width
				@param {Number} [options.height=width] Resulting height (optional, if not supplied will default to width)
				@param {String} [options.type='image/jpeg'] MIME type of the resulting image
				@param {Number} [options.quality=90] In the case of JPEG, controls the quality of resulting image
				@param {Boolean} [options.crop='cc'] If not falsy, image will be cropped, by default from center
				@param {Boolean} [options.fit=true] In case of crop whether to upscale the image to fit the exact dimensions
				@param {Boolean} [options.preserveHeaders=true] Whether to preserve meta headers (on JPEGs after resize)
				@param {String} [options.resample='default'] Resampling algorithm to use during resize
				@param {Boolean} [options.multipass=true] Whether to scale the image in steps (results in better quality)
			*/
			resize: function(options) {
				var self = this;
				var orientation;
				var scale;

				var srcRect = {
					x: 0,
					y: 0,
					width: self.width,
					height: self.height
				};

				var opts = Basic.extendIf({
					width: self.width,
					height: self.height,
					type: self.type || 'image/jpeg',
					quality: 90,
					crop: false,
					fit: true,
					preserveHeaders: true,
					resample: 'default',
					multipass: true
				}, options);

				try {
					if (!self.size) { // only preloaded image objects can be used as source
						throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					}

					// no way to reliably intercept the crash due to high resolution, so we simply avoid it
					if (self.width > Image.MAX_RESIZE_WIDTH || self.height > Image.MAX_RESIZE_HEIGHT) {
						throw new x.ImageError(x.ImageError.MAX_RESOLUTION_ERR);
					}

					// take into account orientation tag
					orientation = (self.meta && self.meta.tiff && self.meta.tiff.Orientation) || 1;

					if (Basic.inArray(orientation, [5,6,7,8]) !== -1) { // values that require 90 degree rotation
						var tmp = opts.width;
						opts.width = opts.height;
						opts.height = tmp;
					}

					if (opts.crop) {
						scale = Math.max(opts.width/self.width, opts.height/self.height);

						if (options.fit) {
							// first scale it up or down to fit the original image
							srcRect.width = Math.min(Math.ceil(opts.width/scale), self.width);
							srcRect.height = Math.min(Math.ceil(opts.height/scale), self.height);
							
							// recalculate the scale for adapted dimensions
							scale = opts.width/srcRect.width;
						} else {
							srcRect.width = Math.min(opts.width, self.width);
							srcRect.height = Math.min(opts.height, self.height);

							// now we do not need to scale it any further
							scale = 1; 
						}

						if (typeof(opts.crop) === 'boolean') {
							opts.crop = 'cc';
						}

						switch (opts.crop.toLowerCase().replace(/_/, '-')) {
							case 'rb':
							case 'right-bottom':
								srcRect.x = self.width - srcRect.width;
								srcRect.y = self.height - srcRect.height;
								break;

							case 'cb':
							case 'center-bottom':
								srcRect.x = Math.floor((self.width - srcRect.width) / 2);
								srcRect.y = self.height - srcRect.height;
								break;

							case 'lb':
							case 'left-bottom':
								srcRect.x = 0;
								srcRect.y = self.height - srcRect.height;
								break;

							case 'lt':
							case 'left-top':
								srcRect.x = 0;
								srcRect.y = 0;
								break;

							case 'ct':
							case 'center-top':
								srcRect.x = Math.floor((self.width - srcRect.width) / 2);
								srcRect.y = 0;
								break;

							case 'rt':
							case 'right-top':
								srcRect.x = self.width - srcRect.width;
								srcRect.y = 0;
								break;

							case 'rc':
							case 'right-center':
							case 'right-middle':
								srcRect.x = self.width - srcRect.width;
								srcRect.y = Math.floor((self.height - srcRect.height) / 2);
								break;


							case 'lc':
							case 'left-center':
							case 'left-middle':
								srcRect.x = 0;
								srcRect.y = Math.floor((self.height - srcRect.height) / 2);
								break;

							case 'cc':
							case 'center-center':
							case 'center-middle':
							default:
								srcRect.x = Math.floor((self.width - srcRect.width) / 2);
								srcRect.y = Math.floor((self.height - srcRect.height) / 2);
						}

						// original image might be smaller than requested crop, so - avoid negative values
						srcRect.x = Math.max(srcRect.x, 0);
						srcRect.y = Math.max(srcRect.y, 0);
					} else {
						scale = Math.min(opts.width/self.width, opts.height/self.height);
					}

					this.exec('Image', 'resize', srcRect, scale, opts);
				} catch(ex) {
					// for now simply trigger error event
					self.trigger('error', ex.code);
				}
			},

			/**
			Downsizes the image to fit the specified width/height. If crop is supplied, image will be cropped to exact dimensions.

			@method downsize
			@deprecated use resize()
			*/
			downsize: function(options) {
				var defaults = {
					width: this.width,
					height: this.height,
					type: this.type || 'image/jpeg',
					quality: 90,
					crop: false,
					preserveHeaders: true,
					resample: 'default'
				}, opts;

				if (typeof(options) === 'object') {
					opts = Basic.extend(defaults, options);
				} else {
					// for backward compatibility
					opts = Basic.extend(defaults, {
						width: arguments[0],
						height: arguments[1],
						crop: arguments[2],
						preserveHeaders: arguments[3]
					});
				}

				this.resize(opts);
			},

			/**
			Alias for downsize(width, height, true). (see downsize)
			
			@method crop
			@param {Number} width Resulting width
			@param {Number} [height=width] Resulting height (optional, if not supplied will default to width)
			@param {Boolean} [preserveHeaders=true] Whether to preserve meta headers (on JPEGs after resize)
			*/
			crop: function(width, height, preserveHeaders) {
				this.downsize(width, height, true, preserveHeaders);
			},

			getAsCanvas: function() {
				if (!Env.can('create_canvas')) {
					throw new x.RuntimeError(x.RuntimeError.NOT_SUPPORTED_ERR);
				}
				return this.exec('Image', 'getAsCanvas');
			},

			/**
			Retrieves image in it's current state as mOxie.Blob object. Cannot be run on empty or image in progress (throws
			DOMException.INVALID_STATE_ERR).

			@method getAsBlob
			@param {String} [type="image/jpeg"] Mime type of resulting blob. Can either be image/jpeg or image/png
			@param {Number} [quality=90] Applicable only together with mime type image/jpeg
			@return {Blob} Image as Blob
			*/
			getAsBlob: function(type, quality) {
				if (!this.size) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}
				return this.exec('Image', 'getAsBlob', type || 'image/jpeg', quality || 90);
			},

			/**
			Retrieves image in it's current state as dataURL string. Cannot be run on empty or image in progress (throws
			DOMException.INVALID_STATE_ERR).

			@method getAsDataURL
			@param {String} [type="image/jpeg"] Mime type of resulting blob. Can either be image/jpeg or image/png
			@param {Number} [quality=90] Applicable only together with mime type image/jpeg
			@return {String} Image as dataURL string
			*/
			getAsDataURL: function(type, quality) {
				if (!this.size) {
					throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
				}
				return this.exec('Image', 'getAsDataURL', type || 'image/jpeg', quality || 90);
			},

			/**
			Retrieves image in it's current state as binary string. Cannot be run on empty or image in progress (throws
			DOMException.INVALID_STATE_ERR).

			@method getAsBinaryString
			@param {String} [type="image/jpeg"] Mime type of resulting blob. Can either be image/jpeg or image/png
			@param {Number} [quality=90] Applicable only together with mime type image/jpeg
			@return {String} Image as binary string
			*/
			getAsBinaryString: function(type, quality) {
				var dataUrl = this.getAsDataURL(type, quality);
				return Encode.atob(dataUrl.substring(dataUrl.indexOf('base64,') + 7));
			},

			/**
			Embeds a visual representation of the image into the specified node. Depending on the runtime, 
			it might be a canvas, an img node or a thrid party shim object (Flash or SilverLight - very rare, 
			can be used in legacy browsers that do not have canvas or proper dataURI support).

			@method embed
			@param {DOMElement} el DOM element to insert the image object into
			@param {Object} [options]
				@param {Number} [options.width] The width of an embed (defaults to the image width)
				@param {Number} [options.height] The height of an embed (defaults to the image height)
				@param {String} [options.type="image/jpeg"] Mime type
				@param {Number} [options.quality=90] Quality of an embed, if mime type is image/jpeg
				@param {Boolean} [options.crop=false] Whether to crop an embed to the specified dimensions
			*/
			embed: function(el, options) {
				var self = this
				, runtime // this has to be outside of all the closures to contain proper runtime
				;

				var opts = Basic.extend({
					width: this.width,
					height: this.height,
					type: this.type || 'image/jpeg',
					quality: 90
				}, options);
				

				function render(type, quality) {
					var img = this;

					// if possible, embed a canvas element directly
					if (Env.can('create_canvas')) {
						var canvas = img.getAsCanvas();
						if (canvas) {
							el.appendChild(canvas);
							canvas = null;
							img.destroy();
							self.trigger('embedded');
							return;
						}
					}

					var dataUrl = img.getAsDataURL(type, quality);
					if (!dataUrl) {
						throw new x.ImageError(x.ImageError.WRONG_FORMAT);
					}

					if (Env.can('use_data_uri_of', dataUrl.length)) {
						el.innerHTML = '<img src="' + dataUrl + '" width="' + img.width + '" height="' + img.height + '" />';
						img.destroy();
						self.trigger('embedded');
					} else {
						var tr = new Transporter();

						tr.bind("TransportingComplete", function() {
							runtime = self.connectRuntime(this.result.ruid);

							self.bind("Embedded", function() {
								// position and size properly
								Basic.extend(runtime.getShimContainer().style, {
									//position: 'relative',
									top: '0px',
									left: '0px',
									width: img.width + 'px',
									height: img.height + 'px'
								});

								// some shims (Flash/SilverLight) reinitialize, if parent element is hidden, reordered or it's
								// position type changes (in Gecko), but since we basically need this only in IEs 6/7 and
								// sometimes 8 and they do not have this problem, we can comment this for now
								/*tr.bind("RuntimeInit", function(e, runtime) {
									tr.destroy();
									runtime.destroy();
									onResize.call(self); // re-feed our image data
								});*/

								runtime = null; // release
							}, 999);

							runtime.exec.call(self, "ImageView", "display", this.result.uid, width, height);
							img.destroy();
						});

						tr.transport(Encode.atob(dataUrl.substring(dataUrl.indexOf('base64,') + 7)), type, {
							required_caps: {
								display_media: true
							},
							runtime_order: 'flash,silverlight',
							container: el
						});
					}
				}

				try {
					if (!(el = Dom.get(el))) {
						throw new x.DOMException(x.DOMException.INVALID_NODE_TYPE_ERR);
					}

					if (!this.size) { // only preloaded image objects can be used as source
						throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					}
					
					// high-resolution images cannot be consistently handled across the runtimes
					if (this.width > Image.MAX_RESIZE_WIDTH || this.height > Image.MAX_RESIZE_HEIGHT) {
						//throw new x.ImageError(x.ImageError.MAX_RESOLUTION_ERR);
					}

					var imgCopy = new Image();

					imgCopy.bind("Resize", function() {
						render.call(this, opts.type, opts.quality);
					});

					imgCopy.bind("Load", function() {
						this.downsize(opts);
					});

					// if embedded thumb data is available and dimensions are big enough, use it
					if (this.meta.thumb && this.meta.thumb.width >= opts.width && this.meta.thumb.height >= opts.height) {
						imgCopy.load(this.meta.thumb.data);
					} else {
						imgCopy.clone(this, false);
					}

					return imgCopy;
				} catch(ex) {
					// for now simply trigger error event
					this.trigger('error', ex.code);
				}
			},

			/**
			Properly destroys the image and frees resources in use. If any. Recommended way to dispose mOxie.Image object.

			@method destroy
			*/
			destroy: function() {
				if (this.ruid) {
					this.getRuntime().exec.call(this, 'Image', 'destroy');
					this.disconnectRuntime();
				}
				if (this.meta && this.meta.thumb) {
					// thumb is blob, make sure we destroy it first
					this.meta.thumb.data.destroy();
				}
				this.unbindAll();
			}
		});


		// this is here, because in order to bind properly, we need uid, which is created above
		this.handleEventProps(dispatches);

		this.bind('Load Resize', function() {
			return _updateInfo.call(this); // if operation fails (e.g. image is neither PNG nor JPEG) cancel all pending events
		}, 999);


		function _updateInfo(info) {
			try {
				if (!info) {
					info = this.exec('Image', 'getInfo');
				}

				this.size = info.size;
				this.width = info.width;
				this.height = info.height;
				this.type = info.type;
				this.meta = info.meta;

				// update file name, only if empty
				if (this.name === '') {
					this.name = info.name;
				}

				return true;
			} catch(ex) {
				this.trigger('error', ex.code);
				return false;
			}
		}


		function _load(src) {
			var srcType = Basic.typeOf(src);

			try {
				// if source is Image
				if (src instanceof Image) {
					if (!src.size) { // only preloaded image objects can be used as source
						throw new x.DOMException(x.DOMException.INVALID_STATE_ERR);
					}
					_loadFromImage.apply(this, arguments);
				}
				// if source is o.Blob/o.File
				else if (src instanceof Blob) {
					if (!~Basic.inArray(src.type, ['image/jpeg', 'image/png'])) {
						throw new x.ImageError(x.ImageError.WRONG_FORMAT);
					}
					_loadFromBlob.apply(this, arguments);
				}
				// if native blob/file
				else if (Basic.inArray(srcType, ['blob', 'file']) !== -1) {
					_load.call(this, new File(null, src), arguments[1]);
				}
				// if String
				else if (srcType === 'string') {
					// if dataUrl String
					if (src.substr(0, 5) === 'data:') {
						_load.call(this, new Blob(null, { data: src }), arguments[1]);
					}
					// else assume Url, either relative or absolute
					else {
						_loadFromUrl.apply(this, arguments);
					}
				}
				// if source seems to be an img node
				else if (srcType === 'node' && src.nodeName.toLowerCase() === 'img') {
					_load.call(this, src.src, arguments[1]);
				}
				else {
					throw new x.DOMException(x.DOMException.TYPE_MISMATCH_ERR);
				}
			} catch(ex) {
				// for now simply trigger error event
				this.trigger('error', ex.code);
			}
		}


		function _loadFromImage(img, exact) {
			var runtime = this.connectRuntime(img.ruid);
			this.ruid = runtime.uid;
			runtime.exec.call(this, 'Image', 'loadFromImage', img, (Basic.typeOf(exact) === 'undefined' ? true : exact));
		}


		function _loadFromBlob(blob, options) {
			var self = this;

			self.name = blob.name || '';

			function exec(runtime) {
				self.ruid = runtime.uid;
				runtime.exec.call(self, 'Image', 'loadFromBlob', blob);
			}

			if (blob.isDetached()) {
				this.bind('RuntimeInit', function(e, runtime) {
					exec(runtime);
				});

				// convert to object representation
				if (options && typeof(options.required_caps) === 'string') {
					options.required_caps = Runtime.parseCaps(options.required_caps);
				}

				this.connectRuntime(Basic.extend({
					required_caps: {
						access_image_binary: true,
						resize_image: true
					}
				}, options));
			} else {
				exec(this.connectRuntime(blob.ruid));
			}
		}


		function _loadFromUrl(url, options) {
			var self = this, xhr;

			xhr = new XMLHttpRequest();

			xhr.open('get', url);
			xhr.responseType = 'blob';

			xhr.onprogress = function(e) {
				self.trigger(e);
			};

			xhr.onload = function() {
				_loadFromBlob.call(self, xhr.response, true);
			};

			xhr.onerror = function(e) {
				self.trigger(e);
			};

			xhr.onloadend = function() {
				xhr.destroy();
			};

			xhr.bind('RuntimeError', function(e, err) {
				self.trigger('RuntimeError', err);
			});

			xhr.send(null, options);
		}
	}

	// virtual world will crash on you if image has a resolution higher than this:
	Image.MAX_RESIZE_WIDTH = 8192;
	Image.MAX_RESIZE_HEIGHT = 8192; 

	Image.prototype = EventTarget.instance;

	return Image;
});

// Included from: src/javascript/runtime/html5/Runtime.js

/**
 * Runtime.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/*global File:true */

/**
Defines constructor for HTML5 runtime.

@class moxie/runtime/html5/Runtime
@private
*/
define("moxie/runtime/html5/Runtime", [
	"moxie/core/utils/Basic",
	"moxie/core/Exceptions",
	"moxie/runtime/Runtime",
	"moxie/core/utils/Env"
], function(Basic, x, Runtime, Env) {
	
	var type = "html5", extensions = {};
	
	function Html5Runtime(options) {
		var I = this
		, Test = Runtime.capTest
		, True = Runtime.capTrue
		;

		var caps = Basic.extend({
				access_binary: Test(window.FileReader || window.File && window.File.getAsDataURL),
				access_image_binary: function() {
					return I.can('access_binary') && !!extensions.Image;
				},
				display_media: Test(
					(Env.can('create_canvas') || Env.can('use_data_uri_over32kb')) && 
					defined('moxie/image/Image')
				),
				do_cors: Test(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()),
				drag_and_drop: Test(function() {
					// this comes directly from Modernizr: http://www.modernizr.com/
					var div = document.createElement('div');
					// IE has support for drag and drop since version 5, but doesn't support dropping files from desktop
					return (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 
						(Env.browser !== 'IE' || Env.verComp(Env.version, 9, '>'));
				}()),
				filter_by_extension: Test(function() { // if you know how to feature-detect this, please suggest
					return !(
						(Env.browser === 'Chrome' && Env.verComp(Env.version, 28, '<')) || 
						(Env.browser === 'IE' && Env.verComp(Env.version, 10, '<')) || 
						(Env.browser === 'Safari' && Env.verComp(Env.version, 7, '<')) ||
						(Env.browser === 'Firefox' && Env.verComp(Env.version, 37, '<'))
					);
				}()),
				return_response_headers: True,
				return_response_type: function(responseType) {
					if (responseType === 'json' && !!window.JSON) { // we can fake this one even if it's not supported
						return true;
					} 
					return Env.can('return_response_type', responseType);
				},
				return_status_code: True,
				report_upload_progress: Test(window.XMLHttpRequest && new XMLHttpRequest().upload),
				resize_image: function() {
					return I.can('access_binary') && Env.can('create_canvas');
				},
				select_file: function() {
					return Env.can('use_fileinput') && window.File;
				},
				select_folder: function() {
					return I.can('select_file') && (
						Env.browser === 'Chrome' && Env.verComp(Env.version, 21, '>=') ||
						Env.browser === 'Firefox' && Env.verComp(Env.version, 42, '>=') // https://developer.mozilla.org/en-US/Firefox/Releases/42
					);
				},
				select_multiple: function() {
					// it is buggy on Safari Windows and iOS
					return I.can('select_file') &&
						!(Env.browser === 'Safari' && Env.os === 'Windows') &&
						!(Env.os === 'iOS' && Env.verComp(Env.osVersion, "7.0.0", '>') && Env.verComp(Env.osVersion, "8.0.0", '<'));
				},
				send_binary_string: Test(window.XMLHttpRequest && (new XMLHttpRequest().sendAsBinary || (window.Uint8Array && window.ArrayBuffer))),
				send_custom_headers: Test(window.XMLHttpRequest),
				send_multipart: function() {
					return !!(window.XMLHttpRequest && new XMLHttpRequest().upload && window.FormData) || I.can('send_binary_string');
				},
				slice_blob: Test(window.File && (File.prototype.mozSlice || File.prototype.webkitSlice || File.prototype.slice)),
				stream_upload: function(){
					return I.can('slice_blob') && I.can('send_multipart');
				},
				summon_file_dialog: function() { // yeah... some dirty sniffing here...
					return I.can('select_file') && (
						(Env.browser === 'Firefox' && Env.verComp(Env.version, 4, '>=')) ||
						(Env.browser === 'Opera' && Env.verComp(Env.version, 12, '>=')) ||
						(Env.browser === 'IE' && Env.verComp(Env.version, 10, '>=')) ||
						!!~Basic.inArray(Env.browser, ['Chrome', 'Safari', 'Edge'])
					);
				},
				upload_filesize: True,
				use_http_method: True
			}, 
			arguments[2]
		);

		Runtime.call(this, options, (arguments[1] || type), caps);


		Basic.extend(this, {

			init : function() {
				this.trigger("Init");
			},

			destroy: (function(destroy) { // extend default destroy method
				return function() {
					destroy.call(I);
					destroy = I = null;
				};
			}(this.destroy))
		});

		Basic.extend(this.getShim(), extensions);
	}

	Runtime.addConstructor(type, Html5Runtime);

	return extensions;
});

// Included from: src/javascript/runtime/html5/file/Blob.js

/**
 * Blob.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/file/Blob
@private
*/
define("moxie/runtime/html5/file/Blob", [
	"moxie/runtime/html5/Runtime",
	"moxie/file/Blob"
], function(extensions, Blob) {

	function HTML5Blob() {
		function w3cBlobSlice(blob, start, end) {
			var blobSlice;

			if (window.File.prototype.slice) {
				try {
					blob.slice();	// depricated version will throw WRONG_ARGUMENTS_ERR exception
					return blob.slice(start, end);
				} catch (e) {
					// depricated slice method
					return blob.slice(start, end - start);
				}
			// slice method got prefixed: https://bugzilla.mozilla.org/show_bug.cgi?id=649672
			} else if ((blobSlice = window.File.prototype.webkitSlice || window.File.prototype.mozSlice)) {
				return blobSlice.call(blob, start, end);
			} else {
				return null; // or throw some exception
			}
		}

		this.slice = function() {
			return new Blob(this.getRuntime().uid, w3cBlobSlice.apply(this, arguments));
		};
	}

	return (extensions.Blob = HTML5Blob);
});

// Included from: src/javascript/core/utils/Events.js

/**
 * Events.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

define('moxie/core/utils/Events', [
	'moxie/core/utils/Basic'
], function(Basic) {
	var eventhash = {}, uid = 'moxie_' + Basic.guid();
	
	// IE W3C like event funcs
	function preventDefault() {
		this.returnValue = false;
	}

	function stopPropagation() {
		this.cancelBubble = true;
	}

	/**
	Adds an event handler to the specified object and store reference to the handler
	in objects internal Plupload registry (@see removeEvent).
	
	@method addEvent
	@for Utils
	@static
	@param {Object} obj DOM element like object to add handler to.
	@param {String} name Name to add event listener to.
	@param {Function} callback Function to call when event occurs.
	@param {String} [key] that might be used to add specifity to the event record.
	*/
	var addEvent = function(obj, name, callback, key) {
		var func, events;
					
		name = name.toLowerCase();

		// Add event listener
		if (obj.addEventListener) {
			func = callback;
			
			obj.addEventListener(name, func, false);
		} else if (obj.attachEvent) {
			func = function() {
				var evt = window.event;

				if (!evt.target) {
					evt.target = evt.srcElement;
				}

				evt.preventDefault = preventDefault;
				evt.stopPropagation = stopPropagation;

				callback(evt);
			};

			obj.attachEvent('on' + name, func);
		}
		
		// Log event handler to objects internal mOxie registry
		if (!obj[uid]) {
			obj[uid] = Basic.guid();
		}
		
		if (!eventhash.hasOwnProperty(obj[uid])) {
			eventhash[obj[uid]] = {};
		}
		
		events = eventhash[obj[uid]];
		
		if (!events.hasOwnProperty(name)) {
			events[name] = [];
		}
				
		events[name].push({
			func: func,
			orig: callback, // store original callback for IE
			key: key
		});
	};
	
	
	/**
	Remove event handler from the specified object. If third argument (callback)
	is not specified remove all events with the specified name.
	
	@method removeEvent
	@static
	@param {Object} obj DOM element to remove event listener(s) from.
	@param {String} name Name of event listener to remove.
	@param {Function|String} [callback] might be a callback or unique key to match.
	*/
	var removeEvent = function(obj, name, callback) {
		var type, undef;
		
		name = name.toLowerCase();
		
		if (obj[uid] && eventhash[obj[uid]] && eventhash[obj[uid]][name]) {
			type = eventhash[obj[uid]][name];
		} else {
			return;
		}
			
		for (var i = type.length - 1; i >= 0; i--) {
			// undefined or not, key should match
			if (type[i].orig === callback || type[i].key === callback) {
				if (obj.removeEventListener) {
					obj.removeEventListener(name, type[i].func, false);
				} else if (obj.detachEvent) {
					obj.detachEvent('on'+name, type[i].func);
				}
				
				type[i].orig = null;
				type[i].func = null;
				type.splice(i, 1);
				
				// If callback was passed we are done here, otherwise proceed
				if (callback !== undef) {
					break;
				}
			}
		}
		
		// If event array got empty, remove it
		if (!type.length) {
			delete eventhash[obj[uid]][name];
		}
		
		// If mOxie registry has become empty, remove it
		if (Basic.isEmptyObj(eventhash[obj[uid]])) {
			delete eventhash[obj[uid]];
			
			// IE doesn't let you remove DOM object property with - delete
			try {
				delete obj[uid];
			} catch(e) {
				obj[uid] = undef;
			}
		}
	};
	
	
	/**
	Remove all kind of events from the specified object
	
	@method removeAllEvents
	@static
	@param {Object} obj DOM element to remove event listeners from.
	@param {String} [key] unique key to match, when removing events.
	*/
	var removeAllEvents = function(obj, key) {		
		if (!obj || !obj[uid]) {
			return;
		}
		
		Basic.each(eventhash[obj[uid]], function(events, name) {
			removeEvent(obj, name, key);
		});
	};

	return {
		addEvent: addEvent,
		removeEvent: removeEvent,
		removeAllEvents: removeAllEvents
	};
});

// Included from: src/javascript/runtime/html5/file/FileInput.js

/**
 * FileInput.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/file/FileInput
@private
*/
define("moxie/runtime/html5/file/FileInput", [
	"moxie/runtime/html5/Runtime",
	"moxie/file/File",
	"moxie/core/utils/Basic",
	"moxie/core/utils/Dom",
	"moxie/core/utils/Events",
	"moxie/core/utils/Mime",
	"moxie/core/utils/Env"
], function(extensions, File, Basic, Dom, Events, Mime, Env) {
	
	function FileInput() {
		var _options, _browseBtnZIndex; // save original z-index

		Basic.extend(this, {
			init: function(options) {
				var comp = this, I = comp.getRuntime(), input, shimContainer, mimes, browseButton, zIndex, top;

				_options = options;

				// figure out accept string
				mimes = _options.accept.mimes || Mime.extList2mimes(_options.accept, I.can('filter_by_extension'));

				shimContainer = I.getShimContainer();

				shimContainer.innerHTML = '<input id="' + I.uid +'" type="file" style="font-size:999px;opacity:0;"' +
					(_options.multiple && I.can('select_multiple') ? 'multiple' : '') + 
					(_options.directory && I.can('select_folder') ? 'webkitdirectory directory' : '') + // Chrome 11+
					(mimes ? ' accept="' + mimes.join(',') + '"' : '') + ' />';

				input = Dom.get(I.uid);

				// prepare file input to be placed underneath the browse_button element
				Basic.extend(input.style, {
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%'
				});


				browseButton = Dom.get(_options.browse_button);
				_browseBtnZIndex = Dom.getStyle(browseButton, 'z-index') || 'auto';

				// Route click event to the input[type=file] element for browsers that support such behavior
				if (I.can('summon_file_dialog')) {
					if (Dom.getStyle(browseButton, 'position') === 'static') {
						browseButton.style.position = 'relative';
					}

					Events.addEvent(browseButton, 'click', function(e) {
						var input = Dom.get(I.uid);
						if (input && !input.disabled) { // for some reason FF (up to 8.0.1 so far) lets to click disabled input[type=file]
							input.click();
						}
						e.preventDefault();
					}, comp.uid);

					comp.bind('Refresh', function() {
						zIndex = parseInt(_browseBtnZIndex, 10) || 1;

						Dom.get(_options.browse_button).style.zIndex = zIndex;
						this.getRuntime().getShimContainer().style.zIndex = zIndex - 1;
					});
				}

				/* Since we have to place input[type=file] on top of the browse_button for some browsers,
				browse_button loses interactivity, so we restore it here */
				top = I.can('summon_file_dialog') ? browseButton : shimContainer;

				Events.addEvent(top, 'mouseover', function() {
					comp.trigger('mouseenter');
				}, comp.uid);

				Events.addEvent(top, 'mouseout', function() {
					comp.trigger('mouseleave');
				}, comp.uid);

				Events.addEvent(top, 'mousedown', function() {
					comp.trigger('mousedown');
				}, comp.uid);

				Events.addEvent(Dom.get(_options.container), 'mouseup', function() {
					comp.trigger('mouseup');
				}, comp.uid);


				input.onchange = function onChange(e) { // there should be only one handler for this
					comp.files = [];

					Basic.each(this.files, function(file) {
						var relativePath = '';

						if (_options.directory) {
							// folders are represented by dots, filter them out (Chrome 11+)
							if (file.name == ".") {
								// if it looks like a folder...
								return true;
							}
						}

						if (file.webkitRelativePath) {
							relativePath = '/' + file.webkitRelativePath.replace(/^\//, '');
						}
						
						file = new File(I.uid, file);
						file.relativePath = relativePath;

						comp.files.push(file);
					});

					// clearing the value enables the user to select the same file again if they want to
					if (Env.browser !== 'IE' && Env.browser !== 'IEMobile') {
						this.value = '';
					} else {
						// in IE input[type="file"] is read-only so the only way to reset it is to re-insert it
						var clone = this.cloneNode(true);
						this.parentNode.replaceChild(clone, this);
						clone.onchange = onChange;
					}

					if (comp.files.length) {
						comp.trigger('change');
					}
				};

				// ready event is perfectly asynchronous
				comp.trigger({
					type: 'ready',
					async: true
				});

				shimContainer = null;
			},


			setOption: function(name, value) {
				var I = this.getRuntime();
				var input = Dom.get(I.uid);

				switch (name) {
					case 'accept':
						if (value) {
							var mimes = value.mimes || Mime.extList2mimes(value, I.can('filter_by_extension'));
							input.setAttribute('accept', mimes.join(','));
						} else {
							input.removeAttribute('accept');
						}
						break;

					case 'directory':
						if (value && I.can('select_folder')) {
							input.setAttribute('directory', '');
							input.setAttribute('webkitdirectory', '');
						} else {
							input.removeAttribute('directory');
							input.removeAttribute('webkitdirectory');
						}
						break;

					case 'multiple':
						if (value && I.can('select_multiple')) {
							input.setAttribute('multiple', '');
						} else {
							input.removeAttribute('multiple');
						}

				}
			},


			disable: function(state) {
				var I = this.getRuntime(), input;

				if ((input = Dom.get(I.uid))) {
					input.disabled = !!state;
				}
			},

			destroy: function() {
				var I = this.getRuntime()
				, shim = I.getShim()
				, shimContainer = I.getShimContainer()
				, container = _options && Dom.get(_options.container)
				, browseButton = _options && Dom.get(_options.browse_button)
				;
				
				if (container) {
					Events.removeAllEvents(container, this.uid);
				}
				
				if (browseButton) {
					Events.removeAllEvents(browseButton, this.uid);
					browseButton.style.zIndex = _browseBtnZIndex; // reset to original value
				}
				
				if (shimContainer) {
					Events.removeAllEvents(shimContainer, this.uid);
					shimContainer.innerHTML = '';
				}

				shim.removeInstance(this.uid);

				_options = shimContainer = container = browseButton = shim = null;
			}
		});
	}

	return (extensions.FileInput = FileInput);
});

// Included from: src/javascript/runtime/html5/file/FileDrop.js

/**
 * FileDrop.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/file/FileDrop
@private
*/
define("moxie/runtime/html5/file/FileDrop", [
	"moxie/runtime/html5/Runtime",
	'moxie/file/File',
	"moxie/core/utils/Basic",
	"moxie/core/utils/Dom",
	"moxie/core/utils/Events",
	"moxie/core/utils/Mime"
], function(extensions, File, Basic, Dom, Events, Mime) {
	
	function FileDrop() {
		var _files = [], _allowedExts = [], _options, _ruid;

		Basic.extend(this, {
			init: function(options) {
				var comp = this, dropZone;

				_options = options;
				_ruid = comp.ruid; // every dropped-in file should have a reference to the runtime
				_allowedExts = _extractExts(_options.accept);
				dropZone = _options.container;

				Events.addEvent(dropZone, 'dragover', function(e) {
					if (!_hasFiles(e)) {
						return;
					}
					e.preventDefault();
					e.dataTransfer.dropEffect = 'copy';
				}, comp.uid);

				Events.addEvent(dropZone, 'drop', function(e) {
					if (!_hasFiles(e)) {
						return;
					}
					e.preventDefault();

					_files = [];

					// Chrome 21+ accepts folders via Drag'n'Drop
					if (e.dataTransfer.items && e.dataTransfer.items[0].webkitGetAsEntry) {
						_readItems(e.dataTransfer.items, function() {
							comp.files = _files;
							comp.trigger("drop");
						});
					} else {
						Basic.each(e.dataTransfer.files, function(file) {
							_addFile(file);
						});
						comp.files = _files;
						comp.trigger("drop");
					}
				}, comp.uid);

				Events.addEvent(dropZone, 'dragenter', function(e) {
					comp.trigger("dragenter");
				}, comp.uid);

				Events.addEvent(dropZone, 'dragleave', function(e) {
					comp.trigger("dragleave");
				}, comp.uid);
			},

			destroy: function() {
				Events.removeAllEvents(_options && Dom.get(_options.container), this.uid);
				_ruid = _files = _allowedExts = _options = null;
			}
		});


		function _hasFiles(e) {
			if (!e.dataTransfer || !e.dataTransfer.types) { // e.dataTransfer.files is not available in Gecko during dragover
				return false;
			}

			var types = Basic.toArray(e.dataTransfer.types || []);

			return Basic.inArray("Files", types) !== -1 ||
				Basic.inArray("public.file-url", types) !== -1 || // Safari < 5
				Basic.inArray("application/x-moz-file", types) !== -1 // Gecko < 1.9.2 (< Firefox 3.6)
				;
		}


		function _addFile(file, relativePath) {
			if (_isAcceptable(file)) {
				var fileObj = new File(_ruid, file);
				fileObj.relativePath = relativePath || '';
				_files.push(fileObj);
			}
		}

		
		function _extractExts(accept) {
			var exts = [];
			for (var i = 0; i < accept.length; i++) {
				[].push.apply(exts, accept[i].extensions.split(/\s*,\s*/));
			}
			return Basic.inArray('*', exts) === -1 ? exts : [];
		}


		function _isAcceptable(file) {
			if (!_allowedExts.length) {
				return true;
			}
			var ext = Mime.getFileExtension(file.name);
			return !ext || Basic.inArray(ext, _allowedExts) !== -1;
		}


		function _readItems(items, cb) {
			var entries = [];
			Basic.each(items, function(item) {
				var entry = item.webkitGetAsEntry();
				// Address #998 (https://code.google.com/p/chromium/issues/detail?id=332579)
				if (entry) {
					// file() fails on OSX when the filename contains a special character (e.g. umlaut): see #61
					if (entry.isFile) {
						_addFile(item.getAsFile(), entry.fullPath);
					} else {
						entries.push(entry);
					}
				}
			});

			if (entries.length) {
				_readEntries(entries, cb);
			} else {
				cb();
			}
		}


		function _readEntries(entries, cb) {
			var queue = [];
			Basic.each(entries, function(entry) {
				queue.push(function(cbcb) {
					_readEntry(entry, cbcb);
				});
			});
			Basic.inSeries(queue, function() {
				cb();
			});
		}


		function _readEntry(entry, cb) {
			if (entry.isFile) {
				entry.file(function(file) {
					_addFile(file, entry.fullPath);
					cb();
				}, function() {
					// fire an error event maybe
					cb();
				});
			} else if (entry.isDirectory) {
				_readDirEntry(entry, cb);
			} else {
				cb(); // not file, not directory? what then?..
			}
		}


		function _readDirEntry(dirEntry, cb) {
			var entries = [], dirReader = dirEntry.createReader();

			// keep quering recursively till no more entries
			function getEntries(cbcb) {
				dirReader.readEntries(function(moreEntries) {
					if (moreEntries.length) {
						[].push.apply(entries, moreEntries);
						getEntries(cbcb);
					} else {
						cbcb();
					}
				}, cbcb);
			}

			// ...and you thought FileReader was crazy...
			getEntries(function() {
				_readEntries(entries, cb);
			}); 
		}
	}

	return (extensions.FileDrop = FileDrop);
});

// Included from: src/javascript/runtime/html5/file/FileReader.js

/**
 * FileReader.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/file/FileReader
@private
*/
define("moxie/runtime/html5/file/FileReader", [
	"moxie/runtime/html5/Runtime",
	"moxie/core/utils/Encode",
	"moxie/core/utils/Basic"
], function(extensions, Encode, Basic) {
	
	function FileReader() {
		var _fr, _convertToBinary = false;

		Basic.extend(this, {

			read: function(op, blob) {
				var comp = this;

				comp.result = '';

				_fr = new window.FileReader();

				_fr.addEventListener('progress', function(e) {
					comp.trigger(e);
				});

				_fr.addEventListener('load', function(e) {
					comp.result = _convertToBinary ? _toBinary(_fr.result) : _fr.result;
					comp.trigger(e);
				});

				_fr.addEventListener('error', function(e) {
					comp.trigger(e, _fr.error);
				});

				_fr.addEventListener('loadend', function(e) {
					_fr = null;
					comp.trigger(e);
				});

				if (Basic.typeOf(_fr[op]) === 'function') {
					_convertToBinary = false;
					_fr[op](blob.getSource());
				} else if (op === 'readAsBinaryString') { // readAsBinaryString is depricated in general and never existed in IE10+
					_convertToBinary = true;
					_fr.readAsDataURL(blob.getSource());
				}
			},

			abort: function() {
				if (_fr) {
					_fr.abort();
				}
			},

			destroy: function() {
				_fr = null;
			}
		});

		function _toBinary(str) {
			return Encode.atob(str.substring(str.indexOf('base64,') + 7));
		}
	}

	return (extensions.FileReader = FileReader);
});

// Included from: src/javascript/runtime/html5/xhr/XMLHttpRequest.js

/**
 * XMLHttpRequest.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/*global ActiveXObject:true */

/**
@class moxie/runtime/html5/xhr/XMLHttpRequest
@private
*/
define("moxie/runtime/html5/xhr/XMLHttpRequest", [
	"moxie/runtime/html5/Runtime",
	"moxie/core/utils/Basic",
	"moxie/core/utils/Mime",
	"moxie/core/utils/Url",
	"moxie/file/File",
	"moxie/file/Blob",
	"moxie/xhr/FormData",
	"moxie/core/Exceptions",
	"moxie/core/utils/Env"
], function(extensions, Basic, Mime, Url, File, Blob, FormData, x, Env) {
	
	function XMLHttpRequest() {
		var self = this
		, _xhr
		, _filename
		;

		Basic.extend(this, {
			send: function(meta, data) {
				var target = this
				, isGecko2_5_6 = (Env.browser === 'Mozilla' && Env.verComp(Env.version, 4, '>=') && Env.verComp(Env.version, 7, '<'))
				, isAndroidBrowser = Env.browser === 'Android Browser'
				, mustSendAsBinary = false
				;

				// extract file name
				_filename = meta.url.replace(/^.+?\/([\w\-\.]+)$/, '$1').toLowerCase();

				_xhr = _getNativeXHR();
				_xhr.open(meta.method, meta.url, meta.async, meta.user, meta.password);


				// prepare data to be sent
				if (data instanceof Blob) {
					if (data.isDetached()) {
						mustSendAsBinary = true;
					}
					data = data.getSource();
				} else if (data instanceof FormData) {

					if (data.hasBlob()) {
						if (data.getBlob().isDetached()) {
							data = _prepareMultipart.call(target, data); // _xhr must be instantiated and be in OPENED state
							mustSendAsBinary = true;
						} else if ((isGecko2_5_6 || isAndroidBrowser) && Basic.typeOf(data.getBlob().getSource()) === 'blob' && window.FileReader) {
							// Gecko 2/5/6 can't send blob in FormData: https://bugzilla.mozilla.org/show_bug.cgi?id=649150
							// Android browsers (default one and Dolphin) seem to have the same issue, see: #613
							_preloadAndSend.call(target, meta, data);
							return; // _preloadAndSend will reinvoke send() with transmutated FormData =%D
						}	
					}

					// transfer fields to real FormData
					if (data instanceof FormData) { // if still a FormData, e.g. not mangled by _prepareMultipart()
						var fd = new window.FormData();
						data.each(function(value, name) {
							if (value instanceof Blob) {
								fd.append(name, value.getSource());
							} else {
								fd.append(name, value);
							}
						});
						data = fd;
					}
				}


				// if XHR L2
				if (_xhr.upload) {
					if (meta.withCredentials) {
						_xhr.withCredentials = true;
					}

					_xhr.addEventListener('load', function(e) {
						target.trigger(e);
					});

					_xhr.addEventListener('error', function(e) {
						target.trigger(e);
					});

					// additionally listen to progress events
					_xhr.addEventListener('progress', function(e) {
						target.trigger(e);
					});

					_xhr.upload.addEventListener('progress', function(e) {
						target.trigger({
							type: 'UploadProgress',
							loaded: e.loaded,
							total: e.total
						});
					});
				// ... otherwise simulate XHR L2
				} else {
					_xhr.onreadystatechange = function onReadyStateChange() {
						
						// fake Level 2 events
						switch (_xhr.readyState) {
							
							case 1: // XMLHttpRequest.OPENED
								// readystatechanged is fired twice for OPENED state (in IE and Mozilla) - neu
								break;
							
							// looks like HEADERS_RECEIVED (state 2) is not reported in Opera (or it's old versions) - neu
							case 2: // XMLHttpRequest.HEADERS_RECEIVED
								break;
								
							case 3: // XMLHttpRequest.LOADING 
								// try to fire progress event for not XHR L2
								var total, loaded;
								
								try {
									if (Url.hasSameOrigin(meta.url)) { // Content-Length not accessible for cross-domain on some browsers
										total = _xhr.getResponseHeader('Content-Length') || 0; // old Safari throws an exception here
									}

									if (_xhr.responseText) { // responseText was introduced in IE7
										loaded = _xhr.responseText.length;
									}
								} catch(ex) {
									total = loaded = 0;
								}

								target.trigger({
									type: 'progress',
									lengthComputable: !!total,
									total: parseInt(total, 10),
									loaded: loaded
								});
								break;
								
							case 4: // XMLHttpRequest.DONE
								// release readystatechange handler (mostly for IE)
								_xhr.onreadystatechange = function() {};

								// usually status 0 is returned when server is unreachable, but FF also fails to status 0 for 408 timeout
								if (_xhr.status === 0) {
									target.trigger('error');
								} else {
									target.trigger('load');
								}							
								break;
						}
					};
				}
				

				// set request headers
				if (!Basic.isEmptyObj(meta.headers)) {
					Basic.each(meta.headers, function(value, header) {
						_xhr.setRequestHeader(header, value);
					});
				}

				// request response type
				if ("" !== meta.responseType && 'responseType' in _xhr) {
					if ('json' === meta.responseType && !Env.can('return_response_type', 'json')) { // we can fake this one
						_xhr.responseType = 'text';
					} else {
						_xhr.responseType = meta.responseType;
					}
				}

				// send ...
				if (!mustSendAsBinary) {
					_xhr.send(data);
				} else {
					if (_xhr.sendAsBinary) { // Gecko
						_xhr.sendAsBinary(data);
					} else { // other browsers having support for typed arrays
						(function() {
							// mimic Gecko's sendAsBinary
							var ui8a = new Uint8Array(data.length);
							for (var i = 0; i < data.length; i++) {
								ui8a[i] = (data.charCodeAt(i) & 0xff);
							}
							_xhr.send(ui8a.buffer);
						}());
					}
				}

				target.trigger('loadstart');
			},

			getStatus: function() {
				// according to W3C spec it should return 0 for readyState < 3, but instead it throws an exception
				try {
					if (_xhr) {
						return _xhr.status;
					}
				} catch(ex) {}
				return 0;
			},

			getResponse: function(responseType) {
				var I = this.getRuntime();

				try {
					switch (responseType) {
						case 'blob':
							var file = new File(I.uid, _xhr.response);
							
							// try to extract file name from content-disposition if possible (might be - not, if CORS for example)	
							var disposition = _xhr.getResponseHeader('Content-Disposition');
							if (disposition) {
								// extract filename from response header if available
								var match = disposition.match(/filename=([\'\"'])([^\1]+)\1/);
								if (match) {
									_filename = match[2];
								}
							}
							file.name = _filename;

							// pre-webkit Opera doesn't set type property on the blob response
							if (!file.type) {
								file.type = Mime.getFileMime(_filename);
							}
							return file;

						case 'json':
							if (!Env.can('return_response_type', 'json')) {
								return _xhr.status === 200 && !!window.JSON ? JSON.parse(_xhr.responseText) : null;
							}
							return _xhr.response;

						case 'document':
							return _getDocument(_xhr);

						default:
							return _xhr.responseText !== '' ? _xhr.responseText : null; // against the specs, but for consistency across the runtimes
					}
				} catch(ex) {
					return null;
				}				
			},

			getAllResponseHeaders: function() {
				try {
					return _xhr.getAllResponseHeaders();
				} catch(ex) {}
				return '';
			},

			abort: function() {
				if (_xhr) {
					_xhr.abort();
				}
			},

			destroy: function() {
				self = _filename = null;
			}
		});


		// here we go... ugly fix for ugly bug
		function _preloadAndSend(meta, data) {
			var target = this, blob, fr;
				
			// get original blob
			blob = data.getBlob().getSource();
			
			// preload blob in memory to be sent as binary string
			fr = new window.FileReader();
			fr.onload = function() {
				// overwrite original blob
				data.append(data.getBlobName(), new Blob(null, {
					type: blob.type,
					data: fr.result
				}));
				// invoke send operation again
				self.send.call(target, meta, data);
			};
			fr.readAsBinaryString(blob);
		}

		
		function _getNativeXHR() {
			if (window.XMLHttpRequest && !(Env.browser === 'IE' && Env.verComp(Env.version, 8, '<'))) { // IE7 has native XHR but it's buggy
				return new window.XMLHttpRequest();
			} else {
				return (function() {
					var progIDs = ['Msxml2.XMLHTTP.6.0', 'Microsoft.XMLHTTP']; // if 6.0 available, use it, otherwise failback to default 3.0
					for (var i = 0; i < progIDs.length; i++) {
						try {
							return new ActiveXObject(progIDs[i]);
						} catch (ex) {}
					}
				})();
			}
		}
		
		// @credits Sergey Ilinsky	(http://www.ilinsky.com/)
		function _getDocument(xhr) {
			var rXML = xhr.responseXML;
			var rText = xhr.responseText;
			
			// Try parsing responseText (@see: http://www.ilinsky.com/articles/XMLHttpRequest/#bugs-ie-responseXML-content-type)
			if (Env.browser === 'IE' && rText && rXML && !rXML.documentElement && /[^\/]+\/[^\+]+\+xml/.test(xhr.getResponseHeader("Content-Type"))) {
				rXML = new window.ActiveXObject("Microsoft.XMLDOM");
				rXML.async = false;
				rXML.validateOnParse = false;
				rXML.loadXML(rText);
			}
	
			// Check if there is no error in document
			if (rXML) {
				if ((Env.browser === 'IE' && rXML.parseError !== 0) || !rXML.documentElement || rXML.documentElement.tagName === "parsererror") {
					return null;
				}
			}
			return rXML;
		}


		function _prepareMultipart(fd) {
			var boundary = '----moxieboundary' + new Date().getTime()
			, dashdash = '--'
			, crlf = '\r\n'
			, multipart = ''
			, I = this.getRuntime()
			;

			if (!I.can('send_binary_string')) {
				throw new x.RuntimeError(x.RuntimeError.NOT_SUPPORTED_ERR);
			}

			_xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);

			// append multipart parameters
			fd.each(function(value, name) {
				// Firefox 3.6 failed to convert multibyte characters to UTF-8 in sendAsBinary(), 
				// so we try it here ourselves with: unescape(encodeURIComponent(value))
				if (value instanceof Blob) {
					// Build RFC2388 blob
					multipart += dashdash + boundary + crlf +
						'Content-Disposition: form-data; name="' + name + '"; filename="' + unescape(encodeURIComponent(value.name || 'blob')) + '"' + crlf +
						'Content-Type: ' + (value.type || 'application/octet-stream') + crlf + crlf +
						value.getSource() + crlf;
				} else {
					multipart += dashdash + boundary + crlf +
						'Content-Disposition: form-data; name="' + name + '"' + crlf + crlf +
						unescape(encodeURIComponent(value)) + crlf;
				}
			});

			multipart += dashdash + boundary + dashdash + crlf;

			return multipart;
		}
	}

	return (extensions.XMLHttpRequest = XMLHttpRequest);
});

// Included from: src/javascript/runtime/html5/utils/BinaryReader.js

/**
 * BinaryReader.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/utils/BinaryReader
@private
*/
define("moxie/runtime/html5/utils/BinaryReader", [
	"moxie/core/utils/Basic"
], function(Basic) {

	
	function BinaryReader(data) {
		if (data instanceof ArrayBuffer) {
			ArrayBufferReader.apply(this, arguments);
		} else {
			UTF16StringReader.apply(this, arguments);
		}
	}

	Basic.extend(BinaryReader.prototype, {
		
		littleEndian: false,


		read: function(idx, size) {
			var sum, mv, i;

			if (idx + size > this.length()) {
				throw new Error("You are trying to read outside the source boundaries.");
			}
			
			mv = this.littleEndian 
				? 0 
				: -8 * (size - 1)
			;

			for (i = 0, sum = 0; i < size; i++) {
				sum |= (this.readByteAt(idx + i) << Math.abs(mv + i*8));
			}
			return sum;
		},


		write: function(idx, num, size) {
			var mv, i, str = '';

			if (idx > this.length()) {
				throw new Error("You are trying to write outside the source boundaries.");
			}

			mv = this.littleEndian 
				? 0 
				: -8 * (size - 1)
			;

			for (i = 0; i < size; i++) {
				this.writeByteAt(idx + i, (num >> Math.abs(mv + i*8)) & 255);
			}
		},


		BYTE: function(idx) {
			return this.read(idx, 1);
		},


		SHORT: function(idx) {
			return this.read(idx, 2);
		},


		LONG: function(idx) {
			return this.read(idx, 4);
		},


		SLONG: function(idx) { // 2's complement notation
			var num = this.read(idx, 4);
			return (num > 2147483647 ? num - 4294967296 : num);
		},


		CHAR: function(idx) {
			return String.fromCharCode(this.read(idx, 1));
		},


		STRING: function(idx, count) {
			return this.asArray('CHAR', idx, count).join('');
		},


		asArray: function(type, idx, count) {
			var values = [];

			for (var i = 0; i < count; i++) {
				values[i] = this[type](idx + i);
			}
			return values;
		}
	});


	function ArrayBufferReader(data) {
		var _dv = new DataView(data);

		Basic.extend(this, {
			
			readByteAt: function(idx) {
				return _dv.getUint8(idx);
			},


			writeByteAt: function(idx, value) {
				_dv.setUint8(idx, value);
			},
			

			SEGMENT: function(idx, size, value) {
				switch (arguments.length) {
					case 2:
						return data.slice(idx, idx + size);

					case 1:
						return data.slice(idx);

					case 3:
						if (value === null) {
							value = new ArrayBuffer();
						}

						if (value instanceof ArrayBuffer) {					
							var arr = new Uint8Array(this.length() - size + value.byteLength);
							if (idx > 0) {
								arr.set(new Uint8Array(data.slice(0, idx)), 0);
							}
							arr.set(new Uint8Array(value), idx);
							arr.set(new Uint8Array(data.slice(idx + size)), idx + value.byteLength);

							this.clear();
							data = arr.buffer;
							_dv = new DataView(data);
							break;
						}

					default: return data;
				}
			},


			length: function() {
				return data ? data.byteLength : 0;
			},


			clear: function() {
				_dv = data = null;
			}
		});
	}


	function UTF16StringReader(data) {
		Basic.extend(this, {
			
			readByteAt: function(idx) {
				return data.charCodeAt(idx);
			},


			writeByteAt: function(idx, value) {
				putstr(String.fromCharCode(value), idx, 1);
			},


			SEGMENT: function(idx, length, segment) {
				switch (arguments.length) {
					case 1:
						return data.substr(idx);
					case 2:
						return data.substr(idx, length);
					case 3:
						putstr(segment !== null ? segment : '', idx, length);
						break;
					default: return data;
				}
			},


			length: function() {
				return data ? data.length : 0;
			}, 

			clear: function() {
				data = null;
			}
		});


		function putstr(segment, idx, length) {
			length = arguments.length === 3 ? length : data.length - idx - 1;
			data = data.substr(0, idx) + segment + data.substr(length + idx);
		}
	}


	return BinaryReader;
});

// Included from: src/javascript/runtime/html5/image/JPEGHeaders.js

/**
 * JPEGHeaders.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */
 
/**
@class moxie/runtime/html5/image/JPEGHeaders
@private
*/
define("moxie/runtime/html5/image/JPEGHeaders", [
	"moxie/runtime/html5/utils/BinaryReader",
	"moxie/core/Exceptions"
], function(BinaryReader, x) {
	
	return function JPEGHeaders(data) {
		var headers = [], _br, idx, marker, length = 0;

		_br = new BinaryReader(data);

		// Check if data is jpeg
		if (_br.SHORT(0) !== 0xFFD8) {
			_br.clear();
			throw new x.ImageError(x.ImageError.WRONG_FORMAT);
		}

		idx = 2;

		while (idx <= _br.length()) {
			marker = _br.SHORT(idx);

			// omit RST (restart) markers
			if (marker >= 0xFFD0 && marker <= 0xFFD7) {
				idx += 2;
				continue;
			}

			// no headers allowed after SOS marker
			if (marker === 0xFFDA || marker === 0xFFD9) {
				break;
			}

			length = _br.SHORT(idx + 2) + 2;

			// APPn marker detected
			if (marker >= 0xFFE1 && marker <= 0xFFEF) {
				headers.push({
					hex: marker,
					name: 'APP' + (marker & 0x000F),
					start: idx,
					length: length,
					segment: _br.SEGMENT(idx, length)
				});
			}

			idx += length;
		}

		_br.clear();

		return {
			headers: headers,

			restore: function(data) {
				var max, i, br;

				br = new BinaryReader(data);

				idx = br.SHORT(2) == 0xFFE0 ? 4 + br.SHORT(4) : 2;

				for (i = 0, max = headers.length; i < max; i++) {
					br.SEGMENT(idx, 0, headers[i].segment);
					idx += headers[i].length;
				}

				data = br.SEGMENT();
				br.clear();
				return data;
			},

			strip: function(data) {
				var br, headers, jpegHeaders, i;

				jpegHeaders = new JPEGHeaders(data);
				headers = jpegHeaders.headers;
				jpegHeaders.purge();

				br = new BinaryReader(data);

				i = headers.length;
				while (i--) {
					br.SEGMENT(headers[i].start, headers[i].length, '');
				}
				
				data = br.SEGMENT();
				br.clear();
				return data;
			},

			get: function(name) {
				var array = [];

				for (var i = 0, max = headers.length; i < max; i++) {
					if (headers[i].name === name.toUpperCase()) {
						array.push(headers[i].segment);
					}
				}
				return array;
			},

			set: function(name, segment) {
				var array = [], i, ii, max;

				if (typeof(segment) === 'string') {
					array.push(segment);
				} else {
					array = segment;
				}

				for (i = ii = 0, max = headers.length; i < max; i++) {
					if (headers[i].name === name.toUpperCase()) {
						headers[i].segment = array[ii];
						headers[i].length = array[ii].length;
						ii++;
					}
					if (ii >= array.length) {
						break;
					}
				}
			},

			purge: function() {
				this.headers = headers = [];
			}
		};
	};
});

// Included from: src/javascript/runtime/html5/image/ExifParser.js

/**
 * ExifParser.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/image/ExifParser
@private
*/
define("moxie/runtime/html5/image/ExifParser", [
	"moxie/core/utils/Basic",
	"moxie/runtime/html5/utils/BinaryReader",
	"moxie/core/Exceptions"
], function(Basic, BinaryReader, x) {
	
	function ExifParser(data) {
		var __super__, tags, tagDescs, offsets, idx, Tiff;
		
		BinaryReader.call(this, data);

		tags = {
			tiff: {
				/*
				The image orientation viewed in terms of rows and columns.

				1 = The 0th row is at the visual top of the image, and the 0th column is the visual left-hand side.
				2 = The 0th row is at the visual top of the image, and the 0th column is the visual right-hand side.
				3 = The 0th row is at the visual bottom of the image, and the 0th column is the visual right-hand side.
				4 = The 0th row is at the visual bottom of the image, and the 0th column is the visual left-hand side.
				5 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual top.
				6 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual top.
				7 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual bottom.
				8 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual bottom.
				*/
				0x0112: 'Orientation',
				0x010E: 'ImageDescription',
				0x010F: 'Make',
				0x0110: 'Model',
				0x0131: 'Software',
				0x8769: 'ExifIFDPointer',
				0x8825:	'GPSInfoIFDPointer'
			},
			exif: {
				0x9000: 'ExifVersion',
				0xA001: 'ColorSpace',
				0xA002: 'PixelXDimension',
				0xA003: 'PixelYDimension',
				0x9003: 'DateTimeOriginal',
				0x829A: 'ExposureTime',
				0x829D: 'FNumber',
				0x8827: 'ISOSpeedRatings',
				0x9201: 'ShutterSpeedValue',
				0x9202: 'ApertureValue'	,
				0x9207: 'MeteringMode',
				0x9208: 'LightSource',
				0x9209: 'Flash',
				0x920A: 'FocalLength',
				0xA402: 'ExposureMode',
				0xA403: 'WhiteBalance',
				0xA406: 'SceneCaptureType',
				0xA404: 'DigitalZoomRatio',
				0xA408: 'Contrast',
				0xA409: 'Saturation',
				0xA40A: 'Sharpness'
			},
			gps: {
				0x0000: 'GPSVersionID',
				0x0001: 'GPSLatitudeRef',
				0x0002: 'GPSLatitude',
				0x0003: 'GPSLongitudeRef',
				0x0004: 'GPSLongitude'
			},

			thumb: {
				0x0201: 'JPEGInterchangeFormat',
				0x0202: 'JPEGInterchangeFormatLength'
			}
		};

		tagDescs = {
			'ColorSpace': {
				1: 'sRGB',
				0: 'Uncalibrated'
			},

			'MeteringMode': {
				0: 'Unknown',
				1: 'Average',
				2: 'CenterWeightedAverage',
				3: 'Spot',
				4: 'MultiSpot',
				5: 'Pattern',
				6: 'Partial',
				255: 'Other'
			},

			'LightSource': {
				1: 'Daylight',
				2: 'Fliorescent',
				3: 'Tungsten',
				4: 'Flash',
				9: 'Fine weather',
				10: 'Cloudy weather',
				11: 'Shade',
				12: 'Daylight fluorescent (D 5700 - 7100K)',
				13: 'Day white fluorescent (N 4600 -5400K)',
				14: 'Cool white fluorescent (W 3900 - 4500K)',
				15: 'White fluorescent (WW 3200 - 3700K)',
				17: 'Standard light A',
				18: 'Standard light B',
				19: 'Standard light C',
				20: 'D55',
				21: 'D65',
				22: 'D75',
				23: 'D50',
				24: 'ISO studio tungsten',
				255: 'Other'
			},

			'Flash': {
				0x0000: 'Flash did not fire',
				0x0001: 'Flash fired',
				0x0005: 'Strobe return light not detected',
				0x0007: 'Strobe return light detected',
				0x0009: 'Flash fired, compulsory flash mode',
				0x000D: 'Flash fired, compulsory flash mode, return light not detected',
				0x000F: 'Flash fired, compulsory flash mode, return light detected',
				0x0010: 'Flash did not fire, compulsory flash mode',
				0x0018: 'Flash did not fire, auto mode',
				0x0019: 'Flash fired, auto mode',
				0x001D: 'Flash fired, auto mode, return light not detected',
				0x001F: 'Flash fired, auto mode, return light detected',
				0x0020: 'No flash function',
				0x0041: 'Flash fired, red-eye reduction mode',
				0x0045: 'Flash fired, red-eye reduction mode, return light not detected',
				0x0047: 'Flash fired, red-eye reduction mode, return light detected',
				0x0049: 'Flash fired, compulsory flash mode, red-eye reduction mode',
				0x004D: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light not detected',
				0x004F: 'Flash fired, compulsory flash mode, red-eye reduction mode, return light detected',
				0x0059: 'Flash fired, auto mode, red-eye reduction mode',
				0x005D: 'Flash fired, auto mode, return light not detected, red-eye reduction mode',
				0x005F: 'Flash fired, auto mode, return light detected, red-eye reduction mode'
			},

			'ExposureMode': {
				0: 'Auto exposure',
				1: 'Manual exposure',
				2: 'Auto bracket'
			},

			'WhiteBalance': {
				0: 'Auto white balance',
				1: 'Manual white balance'
			},

			'SceneCaptureType': {
				0: 'Standard',
				1: 'Landscape',
				2: 'Portrait',
				3: 'Night scene'
			},

			'Contrast': {
				0: 'Normal',
				1: 'Soft',
				2: 'Hard'
			},

			'Saturation': {
				0: 'Normal',
				1: 'Low saturation',
				2: 'High saturation'
			},

			'Sharpness': {
				0: 'Normal',
				1: 'Soft',
				2: 'Hard'
			},

			// GPS related
			'GPSLatitudeRef': {
				N: 'North latitude',
				S: 'South latitude'
			},

			'GPSLongitudeRef': {
				E: 'East longitude',
				W: 'West longitude'
			}
		};

		offsets = {
			tiffHeader: 10
		};
		
		idx = offsets.tiffHeader;

		__super__ = {
			clear: this.clear
		};

		// Public functions
		Basic.extend(this, {
			
			read: function() {
				try {
					return ExifParser.prototype.read.apply(this, arguments);
				} catch (ex) {
					throw new x.ImageError(x.ImageError.INVALID_META_ERR);
				}
			},


			write: function() {
				try {
					return ExifParser.prototype.write.apply(this, arguments);
				} catch (ex) {
					throw new x.ImageError(x.ImageError.INVALID_META_ERR);
				}
			},


			UNDEFINED: function() {
				return this.BYTE.apply(this, arguments);
			},


			RATIONAL: function(idx) {
				return this.LONG(idx) / this.LONG(idx + 4)
			},


			SRATIONAL: function(idx) {
				return this.SLONG(idx) / this.SLONG(idx + 4)
			},

			ASCII: function(idx) {
				return this.CHAR(idx);
			},

			TIFF: function() {
				return Tiff || null;
			},


			EXIF: function() {
				var Exif = null;

				if (offsets.exifIFD) {
					try {
						Exif = extractTags.call(this, offsets.exifIFD, tags.exif);
					} catch(ex) {
						return null;
					}

					// Fix formatting of some tags
					if (Exif.ExifVersion && Basic.typeOf(Exif.ExifVersion) === 'array') {
						for (var i = 0, exifVersion = ''; i < Exif.ExifVersion.length; i++) {
							exifVersion += String.fromCharCode(Exif.ExifVersion[i]);
						}
						Exif.ExifVersion = exifVersion;
					}
				}

				return Exif;
			},


			GPS: function() {
				var GPS = null;

				if (offsets.gpsIFD) {
					try {
						GPS = extractTags.call(this, offsets.gpsIFD, tags.gps);
					} catch (ex) {
						return null;
					}

					// iOS devices (and probably some others) do not put in GPSVersionID tag (why?..)
					if (GPS.GPSVersionID && Basic.typeOf(GPS.GPSVersionID) === 'array') {
						GPS.GPSVersionID = GPS.GPSVersionID.join('.');
					}
				}

				return GPS;
			},


			thumb: function() {
				if (offsets.IFD1) {
					try {
						var IFD1Tags = extractTags.call(this, offsets.IFD1, tags.thumb);
						
						if ('JPEGInterchangeFormat' in IFD1Tags) {
							return this.SEGMENT(offsets.tiffHeader + IFD1Tags.JPEGInterchangeFormat, IFD1Tags.JPEGInterchangeFormatLength);
						}
					} catch (ex) {}
				}
				return null;
			},


			setExif: function(tag, value) {
				// Right now only setting of width/height is possible
				if (tag !== 'PixelXDimension' && tag !== 'PixelYDimension') { return false; }

				return setTag.call(this, 'exif', tag, value);
			},


			clear: function() {
				__super__.clear();
				data = tags = tagDescs = Tiff = offsets = __super__ = null;
			}
		});


		// Check if that's APP1 and that it has EXIF
		if (this.SHORT(0) !== 0xFFE1 || this.STRING(4, 5).toUpperCase() !== "EXIF\0") {
			throw new x.ImageError(x.ImageError.INVALID_META_ERR);
		}

		// Set read order of multi-byte data
		this.littleEndian = (this.SHORT(idx) == 0x4949);

		// Check if always present bytes are indeed present
		if (this.SHORT(idx+=2) !== 0x002A) {
			throw new x.ImageError(x.ImageError.INVALID_META_ERR);
		}

		offsets.IFD0 = offsets.tiffHeader + this.LONG(idx += 2);
		Tiff = extractTags.call(this, offsets.IFD0, tags.tiff);

		if ('ExifIFDPointer' in Tiff) {
			offsets.exifIFD = offsets.tiffHeader + Tiff.ExifIFDPointer;
			delete Tiff.ExifIFDPointer;
		}

		if ('GPSInfoIFDPointer' in Tiff) {
			offsets.gpsIFD = offsets.tiffHeader + Tiff.GPSInfoIFDPointer;
			delete Tiff.GPSInfoIFDPointer;
		}

		if (Basic.isEmptyObj(Tiff)) {
			Tiff = null;
		}

		// check if we have a thumb as well
		var IFD1Offset = this.LONG(offsets.IFD0 + this.SHORT(offsets.IFD0) * 12 + 2);
		if (IFD1Offset) {
			offsets.IFD1 = offsets.tiffHeader + IFD1Offset;
		}


		function extractTags(IFD_offset, tags2extract) {
			var data = this;
			var length, i, tag, type, count, size, offset, value, values = [], hash = {};
			
			var types = {
				1 : 'BYTE',
				7 : 'UNDEFINED',
				2 : 'ASCII',
				3 : 'SHORT',
				4 : 'LONG',
				5 : 'RATIONAL',
				9 : 'SLONG',
				10: 'SRATIONAL'
			};

			var sizes = {
				'BYTE' 		: 1,
				'UNDEFINED'	: 1,
				'ASCII'		: 1,
				'SHORT'		: 2,
				'LONG' 		: 4,
				'RATIONAL' 	: 8,
				'SLONG'		: 4,
				'SRATIONAL'	: 8
			};

			length = data.SHORT(IFD_offset);

			// The size of APP1 including all these elements shall not exceed the 64 Kbytes specified in the JPEG standard.

			for (i = 0; i < length; i++) {
				values = [];

				// Set binary reader pointer to beginning of the next tag
				offset = IFD_offset + 2 + i*12;

				tag = tags2extract[data.SHORT(offset)];

				if (tag === undefined) {
					continue; // Not the tag we requested
				}

				type = types[data.SHORT(offset+=2)];
				count = data.LONG(offset+=2);
				size = sizes[type];

				if (!size) {
					throw new x.ImageError(x.ImageError.INVALID_META_ERR);
				}

				offset += 4;

				// tag can only fit 4 bytes of data, if data is larger we should look outside
				if (size * count > 4) {
					// instead of data tag contains an offset of the data
					offset = data.LONG(offset) + offsets.tiffHeader;
				}

				// in case we left the boundaries of data throw an early exception
				if (offset + size * count >= this.length()) {
					throw new x.ImageError(x.ImageError.INVALID_META_ERR);
				} 

				// special care for the string
				if (type === 'ASCII') {
					hash[tag] = Basic.trim(data.STRING(offset, count).replace(/\0$/, '')); // strip trailing NULL
					continue;
				} else {
					values = data.asArray(type, offset, count);
					value = (count == 1 ? values[0] : values);

					if (tagDescs.hasOwnProperty(tag) && typeof value != 'object') {
						hash[tag] = tagDescs[tag][value];
					} else {
						hash[tag] = value;
					}
				}
			}

			return hash;
		}

		// At the moment only setting of simple (LONG) values, that do not require offset recalculation, is supported
		function setTag(ifd, tag, value) {
			var offset, length, tagOffset, valueOffset = 0;

			// If tag name passed translate into hex key
			if (typeof(tag) === 'string') {
				var tmpTags = tags[ifd.toLowerCase()];
				for (var hex in tmpTags) {
					if (tmpTags[hex] === tag) {
						tag = hex;
						break;
					}
				}
			}
			offset = offsets[ifd.toLowerCase() + 'IFD'];
			length = this.SHORT(offset);

			for (var i = 0; i < length; i++) {
				tagOffset = offset + 12 * i + 2;

				if (this.SHORT(tagOffset) == tag) {
					valueOffset = tagOffset + 8;
					break;
				}
			}

			if (!valueOffset) {
				return false;
			}

			try {
				this.write(valueOffset, value, 4);
			} catch(ex) {
				return false;
			}

			return true;
		}
	}

	ExifParser.prototype = BinaryReader.prototype;

	return ExifParser;
});

// Included from: src/javascript/runtime/html5/image/JPEG.js

/**
 * JPEG.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/image/JPEG
@private
*/
define("moxie/runtime/html5/image/JPEG", [
	"moxie/core/utils/Basic",
	"moxie/core/Exceptions",
	"moxie/runtime/html5/image/JPEGHeaders",
	"moxie/runtime/html5/utils/BinaryReader",
	"moxie/runtime/html5/image/ExifParser"
], function(Basic, x, JPEGHeaders, BinaryReader, ExifParser) {
	
	function JPEG(data) {
		var _br, _hm, _ep, _info;

		_br = new BinaryReader(data);

		// check if it is jpeg
		if (_br.SHORT(0) !== 0xFFD8) {
			throw new x.ImageError(x.ImageError.WRONG_FORMAT);
		}

		// backup headers
		_hm = new JPEGHeaders(data);

		// extract exif info
		try {
			_ep = new ExifParser(_hm.get('app1')[0]);
		} catch(ex) {}

		// get dimensions
		_info = _getDimensions.call(this);

		Basic.extend(this, {
			type: 'image/jpeg',

			size: _br.length(),

			width: _info && _info.width || 0,

			height: _info && _info.height || 0,

			setExif: function(tag, value) {
				if (!_ep) {
					return false; // or throw an exception
				}

				if (Basic.typeOf(tag) === 'object') {
					Basic.each(tag, function(value, tag) {
						_ep.setExif(tag, value);
					});
				} else {
					_ep.setExif(tag, value);
				}

				// update internal headers
				_hm.set('app1', _ep.SEGMENT());
			},

			writeHeaders: function() {
				if (!arguments.length) {
					// if no arguments passed, update headers internally
					return _hm.restore(data);
				}
				return _hm.restore(arguments[0]);
			},

			stripHeaders: function(data) {
				return _hm.strip(data);
			},

			purge: function() {
				_purge.call(this);
			}
		});

		if (_ep) {
			this.meta = {
				tiff: _ep.TIFF(),
				exif: _ep.EXIF(),
				gps: _ep.GPS(),
				thumb: _getThumb()
			};
		}


		function _getDimensions(br) {
			var idx = 0
			, marker
			, length
			;

			if (!br) {
				br = _br;
			}

			// examine all through the end, since some images might have very large APP segments
			while (idx <= br.length()) {
				marker = br.SHORT(idx += 2);

				if (marker >= 0xFFC0 && marker <= 0xFFC3) { // SOFn
					idx += 5; // marker (2 bytes) + length (2 bytes) + Sample precision (1 byte)
					return {
						height: br.SHORT(idx),
						width: br.SHORT(idx += 2)
					};
				}
				length = br.SHORT(idx += 2);
				idx += length - 2;
			}
			return null;
		}


		function _getThumb() {
			var data =  _ep.thumb()
			, br
			, info
			;

			if (data) {
				br = new BinaryReader(data);
				info = _getDimensions(br);
				br.clear();

				if (info) {
					info.data = data;
					return info;
				}
			}
			return null;
		}


		function _purge() {
			if (!_ep || !_hm || !_br) { 
				return; // ignore any repeating purge requests
			}
			_ep.clear();
			_hm.purge();
			_br.clear();
			_info = _hm = _ep = _br = null;
		}
	}

	return JPEG;
});

// Included from: src/javascript/runtime/html5/image/PNG.js

/**
 * PNG.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/image/PNG
@private
*/
define("moxie/runtime/html5/image/PNG", [
	"moxie/core/Exceptions",
	"moxie/core/utils/Basic",
	"moxie/runtime/html5/utils/BinaryReader"
], function(x, Basic, BinaryReader) {
	
	function PNG(data) {
		var _br, _hm, _ep, _info;

		_br = new BinaryReader(data);

		// check if it's png
		(function() {
			var idx = 0, i = 0
			, signature = [0x8950, 0x4E47, 0x0D0A, 0x1A0A]
			;

			for (i = 0; i < signature.length; i++, idx += 2) {
				if (signature[i] != _br.SHORT(idx)) {
					throw new x.ImageError(x.ImageError.WRONG_FORMAT);
				}
			}
		}());

		function _getDimensions() {
			var chunk, idx;

			chunk = _getChunkAt.call(this, 8);

			if (chunk.type == 'IHDR') {
				idx = chunk.start;
				return {
					width: _br.LONG(idx),
					height: _br.LONG(idx += 4)
				};
			}
			return null;
		}

		function _purge() {
			if (!_br) {
				return; // ignore any repeating purge requests
			}
			_br.clear();
			data = _info = _hm = _ep = _br = null;
		}

		_info = _getDimensions.call(this);

		Basic.extend(this, {
			type: 'image/png',

			size: _br.length(),

			width: _info.width,

			height: _info.height,

			purge: function() {
				_purge.call(this);
			}
		});

		// for PNG we can safely trigger purge automatically, as we do not keep any data for later
		_purge.call(this);

		function _getChunkAt(idx) {
			var length, type, start, CRC;

			length = _br.LONG(idx);
			type = _br.STRING(idx += 4, 4);
			start = idx += 4;
			CRC = _br.LONG(idx + length);

			return {
				length: length,
				type: type,
				start: start,
				CRC: CRC
			};
		}
	}

	return PNG;
});

// Included from: src/javascript/runtime/html5/image/ImageInfo.js

/**
 * ImageInfo.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/image/ImageInfo
@private
*/
define("moxie/runtime/html5/image/ImageInfo", [
	"moxie/core/utils/Basic",
	"moxie/core/Exceptions",
	"moxie/runtime/html5/image/JPEG",
	"moxie/runtime/html5/image/PNG"
], function(Basic, x, JPEG, PNG) {
	/**
	Optional image investigation tool for HTML5 runtime. Provides the following features:
	- ability to distinguish image type (JPEG or PNG) by signature
	- ability to extract image width/height directly from it's internals, without preloading in memory (fast)
	- ability to extract APP headers from JPEGs (Exif, GPS, etc)
	- ability to replace width/height tags in extracted JPEG headers
	- ability to restore APP headers, that were for example stripped during image manipulation

	@class ImageInfo
	@constructor
	@param {String} data Image source as binary string
	*/
	return function(data) {
		var _cs = [JPEG, PNG], _img;

		// figure out the format, throw: ImageError.WRONG_FORMAT if not supported
		_img = (function() {
			for (var i = 0; i < _cs.length; i++) {
				try {
					return new _cs[i](data);
				} catch (ex) {
					// console.info(ex);
				}
			}
			throw new x.ImageError(x.ImageError.WRONG_FORMAT);
		}());

		Basic.extend(this, {
			/**
			Image Mime Type extracted from it's depths

			@property type
			@type {String}
			@default ''
			*/
			type: '',

			/**
			Image size in bytes

			@property size
			@type {Number}
			@default 0
			*/
			size: 0,

			/**
			Image width extracted from image source

			@property width
			@type {Number}
			@default 0
			*/
			width: 0,

			/**
			Image height extracted from image source

			@property height
			@type {Number}
			@default 0
			*/
			height: 0,

			/**
			Sets Exif tag. Currently applicable only for width and height tags. Obviously works only with JPEGs.

			@method setExif
			@param {String} tag Tag to set
			@param {Mixed} value Value to assign to the tag
			*/
			setExif: function() {},

			/**
			Restores headers to the source.

			@method writeHeaders
			@param {String} data Image source as binary string
			@return {String} Updated binary string
			*/
			writeHeaders: function(data) {
				return data;
			},

			/**
			Strip all headers from the source.

			@method stripHeaders
			@param {String} data Image source as binary string
			@return {String} Updated binary string
			*/
			stripHeaders: function(data) {
				return data;
			},

			/**
			Dispose resources.

			@method purge
			*/
			purge: function() {
				data = null;
			}
		});

		Basic.extend(this, _img);

		this.purge = function() {
			_img.purge();
			_img = null;
		};
	};
});

// Included from: src/javascript/runtime/html5/image/ResizerCanvas.js

/**
 * ResizerCanvas.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
 * Resizes image/canvas using canvas
 */
define("moxie/runtime/html5/image/ResizerCanvas", [], function() {

    function scale(image, ratio) {
        var sW = image.width;
        var dW = Math.floor(sW * ratio);
        var scaleCapped = false;

        if (ratio < 0.5 || ratio > 2) {
            ratio = ratio < 0.5 ? 0.5 : 2;
            scaleCapped = true;
        }

        var tCanvas = _scale(image, ratio);

        if (scaleCapped) {
            return scale(tCanvas, dW / tCanvas.width);
        } else {
            return tCanvas;
        }
    }


    function _scale(image, ratio) {
        var sW = image.width;
        var sH = image.height;
        var dW = Math.floor(sW * ratio);
        var dH = Math.floor(sH * ratio);

        var canvas = document.createElement('canvas');
        canvas.width = dW;
        canvas.height = dH;
        canvas.getContext("2d").drawImage(image, 0, 0, sW, sH, 0, 0, dW, dH);

        image = null; // just in case
        return canvas;
    }

    return {
        scale: scale
    };

});

// Included from: src/javascript/runtime/html5/image/Image.js

/**
 * Image.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html5/image/Image
@private
*/
define("moxie/runtime/html5/image/Image", [
	"moxie/runtime/html5/Runtime",
	"moxie/core/utils/Basic",
	"moxie/core/Exceptions",
	"moxie/core/utils/Encode",
	"moxie/file/Blob",
	"moxie/file/File",
	"moxie/runtime/html5/image/ImageInfo",
	"moxie/runtime/html5/image/ResizerCanvas",
	"moxie/core/utils/Mime",
	"moxie/core/utils/Env"
], function(extensions, Basic, x, Encode, Blob, File, ImageInfo, ResizerCanvas, Mime, Env) {

	function HTML5Image() {
		var me = this
		, _img, _imgInfo, _canvas, _binStr, _blob
		, _modified = false // is set true whenever image is modified
		, _preserveHeaders = true
		;

		Basic.extend(this, {
			loadFromBlob: function(blob) {
				var I = this.getRuntime()
				, asBinary = arguments.length > 1 ? arguments[1] : true
				;

				if (!I.can('access_binary')) {
					throw new x.RuntimeError(x.RuntimeError.NOT_SUPPORTED_ERR);
				}

				_blob = blob;

				if (blob.isDetached()) {
					_binStr = blob.getSource();
					_preload.call(this, _binStr);
					return;
				} else {
					_readAsDataUrl.call(this, blob.getSource(), function(dataUrl) {
						if (asBinary) {
							_binStr = _toBinary(dataUrl);
						}
						_preload.call(this, dataUrl);
					});
				}
			},

			loadFromImage: function(img, exact) {
				this.meta = img.meta;

				_blob = new File(null, {
					name: img.name,
					size: img.size,
					type: img.type
				});

				_preload.call(this, exact ? (_binStr = img.getAsBinaryString()) : img.getAsDataURL());
			},

			getInfo: function() {
				var I = this.getRuntime(), info;

				if (!_imgInfo && _binStr && I.can('access_image_binary')) {
					_imgInfo = new ImageInfo(_binStr);
				}

				// this stuff below is definitely having fun with itself
				info = {
					width: _getImg().width || 0,
					height: _getImg().height || 0,
					type: _blob.type || Mime.getFileMime(_blob.name),
					size: _binStr && _binStr.length || _blob.size || 0,
					name: _blob.name || '',
					meta: null
				};

				if (_preserveHeaders) {
					info.meta = _imgInfo && _imgInfo.meta || this.meta || {};

					// if data was taken from ImageInfo it will be a binary string, so we convert it to blob
					if (info.meta && info.meta.thumb && !(info.meta.thumb.data instanceof Blob)) {
						info.meta.thumb.data = new Blob(null, {
							type: 'image/jpeg',
							data: info.meta.thumb.data
						});
					}
				}

				return info;
			},


			resize: function(rect, ratio, options) {
				var canvas = document.createElement('canvas');
				canvas.width = rect.width;
				canvas.height = rect.height;

				canvas.getContext("2d").drawImage(_getImg(), rect.x, rect.y, rect.width, rect.height, 0, 0, canvas.width, canvas.height);

				_canvas = ResizerCanvas.scale(canvas, ratio);

				_preserveHeaders = options.preserveHeaders;

				// rotate if required, according to orientation tag
				if (!_preserveHeaders) {
					var orientation = (this.meta && this.meta.tiff && this.meta.tiff.Orientation) || 1;
					_canvas = _rotateToOrientaion(_canvas, orientation);
				}

				this.width = _canvas.width;
				this.height = _canvas.height;

				_modified = true;

				this.trigger('Resize');
			},

			getAsCanvas: function() {
				if (!_canvas) {
					_canvas = _getCanvas();
				}
				_canvas.id = this.uid + '_canvas';
				return _canvas;
			},

			getAsBlob: function(type, quality) {
				if (type !== this.type) {
					_modified = true; // reconsider the state
					return new File(null, {
						name: _blob.name || '',
						type: type,
						data: me.getAsDataURL(type, quality)
					});
				}
				return new File(null, {
					name: _blob.name || '',
					type: type,
					data: me.getAsBinaryString(type, quality)
				});
			},

			getAsDataURL: function(type) {
				var quality = arguments[1] || 90;

				// if image has not been modified, return the source right away
				if (!_modified) {
					return _img.src;
				}

				// make sure we have a canvas to work with
				_getCanvas();

				if ('image/jpeg' !== type) {
					return _canvas.toDataURL('image/png');
				} else {
					try {
						// older Geckos used to result in an exception on quality argument
						return _canvas.toDataURL('image/jpeg', quality/100);
					} catch (ex) {
						return _canvas.toDataURL('image/jpeg');
					}
				}
			},

			getAsBinaryString: function(type, quality) {
				// if image has not been modified, return the source right away
				if (!_modified) {
					// if image was not loaded from binary string
					if (!_binStr) {
						_binStr = _toBinary(me.getAsDataURL(type, quality));
					}
					return _binStr;
				}

				if ('image/jpeg' !== type) {
					_binStr = _toBinary(me.getAsDataURL(type, quality));
				} else {
					var dataUrl;

					// if jpeg
					if (!quality) {
						quality = 90;
					}

					// make sure we have a canvas to work with
					_getCanvas();

					try {
						// older Geckos used to result in an exception on quality argument
						dataUrl = _canvas.toDataURL('image/jpeg', quality/100);
					} catch (ex) {
						dataUrl = _canvas.toDataURL('image/jpeg');
					}

					_binStr = _toBinary(dataUrl);

					if (_imgInfo) {
						_binStr = _imgInfo.stripHeaders(_binStr);

						if (_preserveHeaders) {
							// update dimensions info in exif
							if (_imgInfo.meta && _imgInfo.meta.exif) {
								_imgInfo.setExif({
									PixelXDimension: this.width,
									PixelYDimension: this.height
								});
							}

							// re-inject the headers
							_binStr = _imgInfo.writeHeaders(_binStr);
						}

						// will be re-created from fresh on next getInfo call
						_imgInfo.purge();
						_imgInfo = null;
					}
				}

				_modified = false;

				return _binStr;
			},

			destroy: function() {
				me = null;
				_purge.call(this);
				this.getRuntime().getShim().removeInstance(this.uid);
			}
		});


		function _getImg() {
			if (!_canvas && !_img) {
				throw new x.ImageError(x.DOMException.INVALID_STATE_ERR);
			}
			return _canvas || _img;
		}


		function _getCanvas() {
			var canvas = _getImg();
			if (canvas.nodeName.toLowerCase() == 'canvas') {
				return canvas;
			}
			_canvas = document.createElement('canvas');
			_canvas.width = canvas.width;
			_canvas.height = canvas.height;
			_canvas.getContext("2d").drawImage(canvas, 0, 0);
			return _canvas;
		}


		function _toBinary(str) {
			return Encode.atob(str.substring(str.indexOf('base64,') + 7));
		}


		function _toDataUrl(str, type) {
			return 'data:' + (type || '') + ';base64,' + Encode.btoa(str);
		}


		function _preload(str) {
			var comp = this;

			_img = new Image();
			_img.onerror = function() {
				_purge.call(this);
				comp.trigger('error', x.ImageError.WRONG_FORMAT);
			};
			_img.onload = function() {
				comp.trigger('load');
			};

			_img.src = str.substr(0, 5) == 'data:' ? str : _toDataUrl(str, _blob.type);
		}


		function _readAsDataUrl(file, callback) {
			var comp = this, fr;

			// use FileReader if it's available
			if (window.FileReader) {
				fr = new FileReader();
				fr.onload = function() {
					callback.call(comp, this.result);
				};
				fr.onerror = function() {
					comp.trigger('error', x.ImageError.WRONG_FORMAT);
				};
				fr.readAsDataURL(file);
			} else {
				return callback.call(this, file.getAsDataURL());
			}
		}

		/**
		* Transform canvas coordination according to specified frame size and orientation
		* Orientation value is from EXIF tag
		* @author Shinichi Tomita <shinichi.tomita@gmail.com>
		*/
		function _rotateToOrientaion(img, orientation) {
			var RADIANS = Math.PI/180;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext('2d');
			var width = img.width;
			var height = img.height;

			if (Basic.inArray(orientation, [5,6,7,8]) > -1) {
				canvas.width = height;
				canvas.height = width;
			} else {
				canvas.width = width;
				canvas.height = height;
			}

			/**
			1 = The 0th row is at the visual top of the image, and the 0th column is the visual left-hand side.
			2 = The 0th row is at the visual top of the image, and the 0th column is the visual right-hand side.
			3 = The 0th row is at the visual bottom of the image, and the 0th column is the visual right-hand side.
			4 = The 0th row is at the visual bottom of the image, and the 0th column is the visual left-hand side.
			5 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual top.
			6 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual top.
			7 = The 0th row is the visual right-hand side of the image, and the 0th column is the visual bottom.
			8 = The 0th row is the visual left-hand side of the image, and the 0th column is the visual bottom.
			*/
			switch (orientation) {
				case 2:
					// horizontal flip
					ctx.translate(width, 0);
					ctx.scale(-1, 1);
					break;
				case 3:
					// 180 rotate left
					ctx.translate(width, height);
					ctx.rotate(180 * RADIANS);
					break;
				case 4:
					// vertical flip
					ctx.translate(0, height);
					ctx.scale(1, -1);
					break;
				case 5:
					// vertical flip + 90 rotate right
					ctx.rotate(90 * RADIANS);
					ctx.scale(1, -1);
					break;
				case 6:
					// 90 rotate right
					ctx.rotate(90 * RADIANS);
					ctx.translate(0, -height);
					break;
				case 7:
					// horizontal flip + 90 rotate right
					ctx.rotate(90 * RADIANS);
					ctx.translate(width, -height);
					ctx.scale(-1, 1);
					break;
				case 8:
					// 90 rotate left
					ctx.rotate(-90 * RADIANS);
					ctx.translate(-width, 0);
					break;
			}

			ctx.drawImage(img, 0, 0, width, height);
			return canvas;
		}


		function _purge() {
			if (_imgInfo) {
				_imgInfo.purge();
				_imgInfo = null;
			}

			_binStr = _img = _canvas = _blob = null;
			_modified = false;
		}
	}

	return (extensions.Image = HTML5Image);
});

// Included from: src/javascript/runtime/flash/Runtime.js

/**
 * Runtime.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/*global ActiveXObject:true */

/**
Defines constructor for Flash runtime.

@class moxie/runtime/flash/Runtime
@private
*/
define("moxie/runtime/flash/Runtime", [
	"moxie/core/utils/Basic",
	"moxie/core/utils/Env",
	"moxie/core/utils/Dom",
	"moxie/core/Exceptions",
	"moxie/runtime/Runtime"
], function(Basic, Env, Dom, x, Runtime) {
	
	var type = 'flash', extensions = {};

	/**
	Get the version of the Flash Player

	@method getShimVersion
	@private
	@return {Number} Flash Player version
	*/
	function getShimVersion() {
		var version;

		try {
			version = navigator.plugins['Shockwave Flash'];
			version = version.description;
		} catch (e1) {
			try {
				version = new ActiveXObject('ShockwaveFlash.ShockwaveFlash').GetVariable('$version');
			} catch (e2) {
				version = '0.0';
			}
		}
		version = version.match(/\d+/g);
		return parseFloat(version[0] + '.' + version[1]);
	}


	/**
	Cross-browser SWF removal
    	- Especially needed to safely and completely remove a SWF in Internet Explorer

   	Originated from SWFObject v2.2 <http://code.google.com/p/swfobject/> 
	*/
	function removeSWF(id) {
        var obj = Dom.get(id);
        if (obj && obj.nodeName == "OBJECT") {
            if (Env.browser === 'IE') {
                obj.style.display = "none";
                (function onInit(){
                	// http://msdn.microsoft.com/en-us/library/ie/ms534360(v=vs.85).aspx
                    if (obj.readyState == 4) {
                        removeObjectInIE(id);
                    }
                    else {
                        setTimeout(onInit, 10);
                    }
                })();
            }
            else {
                obj.parentNode.removeChild(obj);
            }
        }
    }


	function removeObjectInIE(id) {
        var obj = Dom.get(id);
        if (obj) {
            for (var i in obj) {
                if (typeof obj[i] == "function") {
                    obj[i] = null;
                }
            }
            obj.parentNode.removeChild(obj);
        }
    }

	/**
	Constructor for the Flash Runtime

	@class FlashRuntime
	@extends Runtime
	*/
	function FlashRuntime(options) {
		var I = this, initTimer;

		options = Basic.extend({ swf_url: Env.swf_url }, options);

		Runtime.call(this, options, type, {
			access_binary: function(value) {
				return value && I.mode === 'browser';
			},
			access_image_binary: function(value) {
				return value && I.mode === 'browser';
			},
			display_media: Runtime.capTest(defined('moxie/image/Image')),
			do_cors: Runtime.capTrue,
			drag_and_drop: false,
			report_upload_progress: function() {
				return I.mode === 'client';
			},
			resize_image: Runtime.capTrue,
			return_response_headers: false,
			return_response_type: function(responseType) {
				if (responseType === 'json' && !!window.JSON) {
					return true;
				} 
				return !Basic.arrayDiff(responseType, ['', 'text', 'document']) || I.mode === 'browser';
			},
			return_status_code: function(code) {
				return I.mode === 'browser' || !Basic.arrayDiff(code, [200, 404]);
			},
			select_file: Runtime.capTrue,
			select_multiple: Runtime.capTrue,
			send_binary_string: function(value) {
				return value && I.mode === 'browser';
			},
			send_browser_cookies: function(value) {
				return value && I.mode === 'browser';
			},
			send_custom_headers: function(value) {
				return value && I.mode === 'browser';
			},
			send_multipart: Runtime.capTrue,
			slice_blob: function(value) {
				return value && I.mode === 'browser';
			},
			stream_upload: function(value) {
				return value && I.mode === 'browser';
			},
			summon_file_dialog: false,
			upload_filesize: function(size) {
				return Basic.parseSizeStr(size) <= 2097152 || I.mode === 'client';
			},
			use_http_method: function(methods) {
				return !Basic.arrayDiff(methods, ['GET', 'POST']);
			}
		}, { 
			// capabilities that require specific mode
			access_binary: function(value) {
				return value ? 'browser' : 'client';
			},
			access_image_binary: function(value) {
				return value ? 'browser' : 'client';
			},
			report_upload_progress: function(value) {
				return value ? 'browser' : 'client';
			},
			return_response_type: function(responseType) {
				return Basic.arrayDiff(responseType, ['', 'text', 'json', 'document']) ? 'browser' : ['client', 'browser'];
			},
			return_status_code: function(code) {
				return Basic.arrayDiff(code, [200, 404]) ? 'browser' : ['client', 'browser'];
			},
			send_binary_string: function(value) {
				return value ? 'browser' : 'client';
			},
			send_browser_cookies: function(value) {
				return value ? 'browser' : 'client';
			},
			send_custom_headers: function(value) {
				return value ? 'browser' : 'client';
			},
			slice_blob: function(value) {
				return value ? 'browser' : 'client';
			},
			stream_upload: function(value) {
				return value ? 'client' : 'browser';
			},
			upload_filesize: function(size) {
				return Basic.parseSizeStr(size) >= 2097152 ? 'client' : 'browser';
			}
		}, 'client');


		// minimal requirement for Flash Player version
		if (getShimVersion() < 11.3) {
			if (MXI_DEBUG && Env.debug.runtime) {
				Env.log("\tFlash didn't meet minimal version requirement (11.3).");	
			}

			this.mode = false; // with falsy mode, runtime won't operable, no matter what the mode was before
		}


		Basic.extend(this, {

			getShim: function() {
				return Dom.get(this.uid);
			},

			shimExec: function(component, action) {
				var args = [].slice.call(arguments, 2);
				return I.getShim().exec(this.uid, component, action, args);
			},

			init: function() {
				var html, el, container;

				container = this.getShimContainer();

				// if not the minimal height, shims are not initialized in older browsers (e.g FF3.6, IE6,7,8, Safari 4.0,5.0, etc)
				Basic.extend(container.style, {
					position: 'absolute',
					top: '-8px',
					left: '-8px',
					width: '9px',
					height: '9px',
					overflow: 'hidden'
				});

				// insert flash object
				html = '<object id="' + this.uid + '" type="application/x-shockwave-flash" data="' +  options.swf_url + '" ';

				if (Env.browser === 'IE') {
					html += 'classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" ';
				}

				html += 'width="100%" height="100%" style="outline:0">'  +
					'<param name="movie" value="' + options.swf_url + '" />' +
					'<param name="flashvars" value="uid=' + escape(this.uid) + '&target=' + Env.global_event_dispatcher + '" />' +
					'<param name="wmode" value="transparent" />' +
					'<param name="allowscriptaccess" value="always" />' +
				'</object>';

				if (Env.browser === 'IE') {
					el = document.createElement('div');
					container.appendChild(el);
					el.outerHTML = html;
					el = container = null; // just in case
				} else {
					container.innerHTML = html;
				}

				// Init is dispatched by the shim
				initTimer = setTimeout(function() {
					if (I && !I.initialized) { // runtime might be already destroyed by this moment
						I.trigger("Error", new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR));

						if (MXI_DEBUG && Env.debug.runtime) {
							Env.log("\tFlash failed to initialize within a specified period of time (typically 5s).");	
						}
					}
				}, 5000);
			},

			destroy: (function(destroy) { // extend default destroy method
				return function() {
					removeSWF(I.uid); // SWF removal requires special care in IE

					destroy.call(I);
					clearTimeout(initTimer); // initialization check might be still onwait
					options = initTimer = destroy = I = null;
				};
			}(this.destroy))

		}, extensions);
	}

	Runtime.addConstructor(type, FlashRuntime);

	return extensions;
});

// Included from: src/javascript/runtime/flash/file/Blob.js

/**
 * Blob.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/flash/file/Blob
@private
*/
define("moxie/runtime/flash/file/Blob", [
	"moxie/runtime/flash/Runtime",
	"moxie/file/Blob"
], function(extensions, Blob) {

	var FlashBlob = {
		slice: function(blob, start, end, type) {
			var self = this.getRuntime();

			if (start < 0) {
				start = Math.max(blob.size + start, 0);
			} else if (start > 0) {
				start = Math.min(start, blob.size);
			}

			if (end < 0) {
				end = Math.max(blob.size + end, 0);
			} else if (end > 0) {
				end = Math.min(end, blob.size);
			}

			blob = self.shimExec.call(this, 'Blob', 'slice', start, end, type || '');

			if (blob) {
				blob = new Blob(self.uid, blob);
			}
			return blob;
		}
	};

	return (extensions.Blob = FlashBlob);
});

// Included from: src/javascript/runtime/flash/file/FileInput.js

/**
 * FileInput.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/flash/file/FileInput
@private
*/
define("moxie/runtime/flash/file/FileInput", [
	"moxie/runtime/flash/Runtime",
	"moxie/file/File",
	"moxie/core/utils/Basic"
], function(extensions, File, Basic) {
	
	var FileInput = {		
		init: function(options) {
			var comp = this, I = this.getRuntime();

			this.bind("Change", function() {
				var files = I.shimExec.call(comp, 'FileInput', 'getFiles');
				comp.files = [];
				Basic.each(files, function(file) {
					comp.files.push(new File(I.uid, file));
				});
			}, 999);

			this.getRuntime().shimExec.call(this, 'FileInput', 'init', {
				accept: options.accept,
				multiple: options.multiple
			});

			this.trigger('ready');
		}
	};

	return (extensions.FileInput = FileInput);
});

// Included from: src/javascript/runtime/flash/file/FileReader.js

/**
 * FileReader.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/flash/file/FileReader
@private
*/
define("moxie/runtime/flash/file/FileReader", [
	"moxie/runtime/flash/Runtime",
	"moxie/core/utils/Encode"
], function(extensions, Encode) {

	function _formatData(data, op) {
		switch (op) {
			case 'readAsText':
				return Encode.atob(data, 'utf8');
			case 'readAsBinaryString':
				return Encode.atob(data);
			case 'readAsDataURL':
				return data;
		}
		return null;
	}

	var FileReader = {
		read: function(op, blob) {
			var comp = this;

			comp.result = '';

			// special prefix for DataURL read mode
			if (op === 'readAsDataURL') {
				comp.result = 'data:' + (blob.type || '') + ';base64,';
			}

			comp.bind('Progress', function(e, data) {
				if (data) {
					comp.result += _formatData(data, op);
				}
			}, 999);

			return comp.getRuntime().shimExec.call(this, 'FileReader', 'readAsBase64', blob.uid);
		}
	};

	return (extensions.FileReader = FileReader);
});

// Included from: src/javascript/runtime/flash/file/FileReaderSync.js

/**
 * FileReaderSync.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/flash/file/FileReaderSync
@private
*/
define("moxie/runtime/flash/file/FileReaderSync", [
	"moxie/runtime/flash/Runtime",
	"moxie/core/utils/Encode"
], function(extensions, Encode) {
	
	function _formatData(data, op) {
		switch (op) {
			case 'readAsText':
				return Encode.atob(data, 'utf8');
			case 'readAsBinaryString':
				return Encode.atob(data);
			case 'readAsDataURL':
				return data;
		}
		return null;
	}

	var FileReaderSync = {
		read: function(op, blob) {
			var result, self = this.getRuntime();

			result = self.shimExec.call(this, 'FileReaderSync', 'readAsBase64', blob.uid);
			if (!result) {
				return null; // or throw ex
			}

			// special prefix for DataURL read mode
			if (op === 'readAsDataURL') {
				result = 'data:' + (blob.type || '') + ';base64,' + result;
			}

			return _formatData(result, op, blob.type);
		}
	};

	return (extensions.FileReaderSync = FileReaderSync);
});

// Included from: src/javascript/runtime/flash/runtime/Transporter.js

/**
 * Transporter.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/flash/runtime/Transporter
@private
*/
define("moxie/runtime/flash/runtime/Transporter", [
	"moxie/runtime/flash/Runtime",
	"moxie/file/Blob"
], function(extensions, Blob) {

	var Transporter = {
		getAsBlob: function(type) {
			var self = this.getRuntime()
			, blob = self.shimExec.call(this, 'Transporter', 'getAsBlob', type)
			;
			if (blob) {
				return new Blob(self.uid, blob);
			}
			return null;
		}
	};

	return (extensions.Transporter = Transporter);
});

// Included from: src/javascript/runtime/flash/xhr/XMLHttpRequest.js

/**
 * XMLHttpRequest.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/flash/xhr/XMLHttpRequest
@private
*/
define("moxie/runtime/flash/xhr/XMLHttpRequest", [
	"moxie/runtime/flash/Runtime",
	"moxie/core/utils/Basic",
	"moxie/file/Blob",
	"moxie/file/File",
	"moxie/file/FileReaderSync",
	"moxie/runtime/flash/file/FileReaderSync",
	"moxie/xhr/FormData",
	"moxie/runtime/Transporter",
	"moxie/runtime/flash/runtime/Transporter"
], function(extensions, Basic, Blob, File, FileReaderSync, FileReaderSyncFlash, FormData, Transporter, TransporterFlash) {
	
	var XMLHttpRequest = {

		send: function(meta, data) {
			var target = this, self = target.getRuntime();

			function send() {
				meta.transport = self.mode;
				self.shimExec.call(target, 'XMLHttpRequest', 'send', meta, data);
			}


			function appendBlob(name, blob) {
				self.shimExec.call(target, 'XMLHttpRequest', 'appendBlob', name, blob.uid);
				data = null;
				send();
			}


			function attachBlob(blob, cb) {
				var tr = new Transporter();

				tr.bind("TransportingComplete", function() {
					cb(this.result);
				});

				tr.transport(blob.getSource(), blob.type, {
					ruid: self.uid
				});
			}

			// copy over the headers if any
			if (!Basic.isEmptyObj(meta.headers)) {
				Basic.each(meta.headers, function(value, header) {
					self.shimExec.call(target, 'XMLHttpRequest', 'setRequestHeader', header, value.toString()); // Silverlight doesn't accept integers into the arguments of type object
				});
			}

			// transfer over multipart params and blob itself
			if (data instanceof FormData) {
				var blobField;
				data.each(function(value, name) {
					if (value instanceof Blob) {
						blobField = name;
					} else {
						self.shimExec.call(target, 'XMLHttpRequest', 'append', name, value);
					}
				});

				if (!data.hasBlob()) {
					data = null;
					send();
				} else {
					var blob = data.getBlob();
					if (blob.isDetached()) {
						attachBlob(blob, function(attachedBlob) {
							blob.destroy();
							appendBlob(blobField, attachedBlob);		
						});
					} else {
						appendBlob(blobField, blob);
					}
				}
			} else if (data instanceof Blob) {
				if (data.isDetached()) {
					attachBlob(data, function(attachedBlob) {
						data.destroy();
						data = attachedBlob.uid;
						send();
					});
				} else {
					data = data.uid;
					send();
				}
			} else {
				send();
			}
		},

		getResponse: function(responseType) {
			var frs, blob, self = this.getRuntime();

			blob = self.shimExec.call(this, 'XMLHttpRequest', 'getResponseAsBlob');

			if (blob) {
				blob = new File(self.uid, blob);

				if ('blob' === responseType) {
					return blob;
				}

				try { 
					frs = new FileReaderSync();

					if (!!~Basic.inArray(responseType, ["", "text"])) {
						return frs.readAsText(blob);
					} else if ('json' === responseType && !!window.JSON) {
						return JSON.parse(frs.readAsText(blob));
					}
				} finally {
					blob.destroy();
				}
			}
			return null;
		},

		abort: function(upload_complete_flag) {
			var self = this.getRuntime();

			self.shimExec.call(this, 'XMLHttpRequest', 'abort');

			this.dispatchEvent('readystatechange');
			// this.dispatchEvent('progress');
			this.dispatchEvent('abort');

			//if (!upload_complete_flag) {
				// this.dispatchEvent('uploadprogress');
			//}
		}
	};

	return (extensions.XMLHttpRequest = XMLHttpRequest);
});

// Included from: src/javascript/runtime/flash/image/Image.js

/**
 * Image.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/flash/image/Image
@private
*/
define("moxie/runtime/flash/image/Image", [
	"moxie/runtime/flash/Runtime",
	"moxie/core/utils/Basic",
	"moxie/runtime/Transporter",
	"moxie/file/Blob",
	"moxie/file/FileReaderSync"
], function(extensions, Basic, Transporter, Blob, FileReaderSync) {
	
	var Image = {
		loadFromBlob: function(blob) {
			var comp = this, self = comp.getRuntime();

			function exec(srcBlob) {
				self.shimExec.call(comp, 'Image', 'loadFromBlob', srcBlob.uid);
				comp = self = null;
			}

			if (blob.isDetached()) { // binary string
				var tr = new Transporter();
				tr.bind("TransportingComplete", function() {
					exec(tr.result.getSource());
				});
				tr.transport(blob.getSource(), blob.type, { ruid: self.uid });
			} else {
				exec(blob.getSource());
			}
		},

		loadFromImage: function(img) {
			var self = this.getRuntime();
			return self.shimExec.call(this, 'Image', 'loadFromImage', img.uid);
		},

		getInfo: function() {
			var self = this.getRuntime()
			, info = self.shimExec.call(this, 'Image', 'getInfo')
			;

			if (info.meta && info.meta.thumb && info.meta.thumb.data && !(self.meta.thumb.data instanceof Blob)) {
				info.meta.thumb.data = new Blob(self.uid, info.meta.thumb.data);
			}
			return info;
		},

		getAsBlob: function(type, quality) {
			var self = this.getRuntime()
			, blob = self.shimExec.call(this, 'Image', 'getAsBlob', type, quality)
			;
			if (blob) {
				return new Blob(self.uid, blob);
			}
			return null;
		},

		getAsDataURL: function() {
			var self = this.getRuntime()
			, blob = self.Image.getAsBlob.apply(this, arguments)
			, frs
			;
			if (!blob) {
				return null;
			}
			frs = new FileReaderSync();
			return frs.readAsDataURL(blob);
		}
	};

	return (extensions.Image = Image);
});

// Included from: src/javascript/runtime/silverlight/Runtime.js

/**
 * RunTime.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/*global ActiveXObject:true */

/**
Defines constructor for Silverlight runtime.

@class moxie/runtime/silverlight/Runtime
@private
*/
define("moxie/runtime/silverlight/Runtime", [
	"moxie/core/utils/Basic",
	"moxie/core/utils/Env",
	"moxie/core/utils/Dom",
	"moxie/core/Exceptions",
	"moxie/runtime/Runtime"
], function(Basic, Env, Dom, x, Runtime) {
	
	var type = "silverlight", extensions = {};

	function isInstalled(version) {
		var isVersionSupported = false, control = null, actualVer,
			actualVerArray, reqVerArray, requiredVersionPart, actualVersionPart, index = 0;

		try {
			try {
				control = new ActiveXObject('AgControl.AgControl');

				if (control.IsVersionSupported(version)) {
					isVersionSupported = true;
				}

				control = null;
			} catch (e) {
				var plugin = navigator.plugins["Silverlight Plug-In"];

				if (plugin) {
					actualVer = plugin.description;

					if (actualVer === "1.0.30226.2") {
						actualVer = "2.0.30226.2";
					}

					actualVerArray = actualVer.split(".");

					while (actualVerArray.length > 3) {
						actualVerArray.pop();
					}

					while ( actualVerArray.length < 4) {
						actualVerArray.push(0);
					}

					reqVerArray = version.split(".");

					while (reqVerArray.length > 4) {
						reqVerArray.pop();
					}

					do {
						requiredVersionPart = parseInt(reqVerArray[index], 10);
						actualVersionPart = parseInt(actualVerArray[index], 10);
						index++;
					} while (index < reqVerArray.length && requiredVersionPart === actualVersionPart);

					if (requiredVersionPart <= actualVersionPart && !isNaN(requiredVersionPart)) {
						isVersionSupported = true;
					}
				}
			}
		} catch (e2) {
			isVersionSupported = false;
		}

		return isVersionSupported;
	}

	/**
	Constructor for the Silverlight Runtime

	@class SilverlightRuntime
	@extends Runtime
	*/
	function SilverlightRuntime(options) {
		var I = this, initTimer;

		options = Basic.extend({ xap_url: Env.xap_url }, options);

		Runtime.call(this, options, type, {
			access_binary: Runtime.capTrue,
			access_image_binary: Runtime.capTrue,
			display_media: Runtime.capTest(defined('moxie/image/Image')),
			do_cors: Runtime.capTrue,
			drag_and_drop: false,
			report_upload_progress: Runtime.capTrue,
			resize_image: Runtime.capTrue,
			return_response_headers: function(value) {
				return value && I.mode === 'client';
			},
			return_response_type: function(responseType) {
				if (responseType !== 'json') {
					return true;
				} else {
					return !!window.JSON;
				}
			},
			return_status_code: function(code) {
				return I.mode === 'client' || !Basic.arrayDiff(code, [200, 404]);
			},
			select_file: Runtime.capTrue,
			select_multiple: Runtime.capTrue,
			send_binary_string: Runtime.capTrue,
			send_browser_cookies: function(value) {
				return value && I.mode === 'browser';
			},
			send_custom_headers: function(value) {
				return value && I.mode === 'client';
			},
			send_multipart: Runtime.capTrue,
			slice_blob: Runtime.capTrue,
			stream_upload: true,
			summon_file_dialog: false,
			upload_filesize: Runtime.capTrue,
			use_http_method: function(methods) {
				return I.mode === 'client' || !Basic.arrayDiff(methods, ['GET', 'POST']);
			}
		}, { 
			// capabilities that require specific mode
			return_response_headers: function(value) {
				return value ? 'client' : 'browser';
			},
			return_status_code: function(code) {
				return Basic.arrayDiff(code, [200, 404]) ? 'client' : ['client', 'browser'];
			},
			send_browser_cookies: function(value) {
				return value ? 'browser' : 'client';
			},
			send_custom_headers: function(value) {
				return value ? 'client' : 'browser';
			},
			use_http_method: function(methods) {
				return Basic.arrayDiff(methods, ['GET', 'POST']) ? 'client' : ['client', 'browser'];
			}
		});


		// minimal requirement
		if (!isInstalled('2.0.31005.0') || Env.browser === 'Opera') {
			if (MXI_DEBUG && Env.debug.runtime) {
				Env.log("\tSilverlight is not installed or minimal version (2.0.31005.0) requirement not met (not likely).");	
			}

			this.mode = false;
		}


		Basic.extend(this, {
			getShim: function() {
				return Dom.get(this.uid).content.Moxie;
			},

			shimExec: function(component, action) {
				var args = [].slice.call(arguments, 2);
				return I.getShim().exec(this.uid, component, action, args);
			},

			init : function() {
				var container;

				container = this.getShimContainer();

				container.innerHTML = '<object id="' + this.uid + '" data="data:application/x-silverlight," type="application/x-silverlight-2" width="100%" height="100%" style="outline:none;">' +
					'<param name="source" value="' + options.xap_url + '"/>' +
					'<param name="background" value="Transparent"/>' +
					'<param name="windowless" value="true"/>' +
					'<param name="enablehtmlaccess" value="true"/>' +
					'<param name="initParams" value="uid=' + this.uid + ',target=' + Env.global_event_dispatcher + '"/>' +
				'</object>';

				// Init is dispatched by the shim
				initTimer = setTimeout(function() {
					if (I && !I.initialized) { // runtime might be already destroyed by this moment
						I.trigger("Error", new x.RuntimeError(x.RuntimeError.NOT_INIT_ERR));

						if (MXI_DEBUG && Env.debug.runtime) {
							Env.log("\Silverlight failed to initialize within a specified period of time (5-10s).");	
						}
					}
				}, Env.OS !== 'Windows'? 10000 : 5000); // give it more time to initialize in non Windows OS (like Mac)
			},

			destroy: (function(destroy) { // extend default destroy method
				return function() {
					destroy.call(I);
					clearTimeout(initTimer); // initialization check might be still onwait
					options = initTimer = destroy = I = null;
				};
			}(this.destroy))

		}, extensions);
	}

	Runtime.addConstructor(type, SilverlightRuntime); 

	return extensions;
});

// Included from: src/javascript/runtime/silverlight/file/Blob.js

/**
 * Blob.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/silverlight/file/Blob
@private
*/
define("moxie/runtime/silverlight/file/Blob", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/core/utils/Basic",
	"moxie/runtime/flash/file/Blob"
], function(extensions, Basic, Blob) {
	return (extensions.Blob = Basic.extend({}, Blob));
});

// Included from: src/javascript/runtime/silverlight/file/FileInput.js

/**
 * FileInput.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/silverlight/file/FileInput
@private
*/
define("moxie/runtime/silverlight/file/FileInput", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/file/File",
	"moxie/core/utils/Basic"
], function(extensions, File, Basic) {

	function toFilters(accept) {
		var filter = '';
		for (var i = 0; i < accept.length; i++) {
			filter += (filter !== '' ? '|' : '') + accept[i].title + " | *." + accept[i].extensions.replace(/,/g, ';*.');
		}
		return filter;
	}

	
	var FileInput = {
		init: function(options) {
			var comp = this, I = this.getRuntime();

			this.bind("Change", function() {
				var files = I.shimExec.call(comp, 'FileInput', 'getFiles');
				comp.files = [];
				Basic.each(files, function(file) {
					comp.files.push(new File(I.uid, file));
				});
			}, 999);
			
			I.shimExec.call(this, 'FileInput', 'init', toFilters(options.accept), options.multiple);
			this.trigger('ready');
		},

		setOption: function(name, value) {
			if (name == 'accept') {
				value = toFilters(value);
			}
			this.getRuntime().shimExec.call(this, 'FileInput', 'setOption', name, value);
		}
	};

	return (extensions.FileInput = FileInput);
});

// Included from: src/javascript/runtime/silverlight/file/FileDrop.js

/**
 * FileDrop.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/silverlight/file/FileDrop
@private
*/
define("moxie/runtime/silverlight/file/FileDrop", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/core/utils/Dom", 
	"moxie/core/utils/Events"
], function(extensions, Dom, Events) {

	// not exactly useful, since works only in safari (...crickets...)
	var FileDrop = {
		init: function() {
			var comp = this, self = comp.getRuntime(), dropZone;

			dropZone = self.getShimContainer();

			Events.addEvent(dropZone, 'dragover', function(e) {
				e.preventDefault();
				e.stopPropagation();
				e.dataTransfer.dropEffect = 'copy';
			}, comp.uid);

			Events.addEvent(dropZone, 'dragenter', function(e) {
				e.preventDefault();
				var flag = Dom.get(self.uid).dragEnter(e);
				// If handled, then stop propagation of event in DOM
				if (flag) {
					e.stopPropagation();
				}
			}, comp.uid);

			Events.addEvent(dropZone, 'drop', function(e) {
				e.preventDefault();
				var flag = Dom.get(self.uid).dragDrop(e);
				// If handled, then stop propagation of event in DOM
				if (flag) {
					e.stopPropagation();
				}
			}, comp.uid);

			return self.shimExec.call(this, 'FileDrop', 'init');
		}
	};

	return (extensions.FileDrop = FileDrop);
});

// Included from: src/javascript/runtime/silverlight/file/FileReader.js

/**
 * FileReader.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/silverlight/file/FileReader
@private
*/
define("moxie/runtime/silverlight/file/FileReader", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/core/utils/Basic",
	"moxie/runtime/flash/file/FileReader"
], function(extensions, Basic, FileReader) {
	return (extensions.FileReader = Basic.extend({}, FileReader));
});

// Included from: src/javascript/runtime/silverlight/file/FileReaderSync.js

/**
 * FileReaderSync.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/silverlight/file/FileReaderSync
@private
*/
define("moxie/runtime/silverlight/file/FileReaderSync", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/core/utils/Basic",
	"moxie/runtime/flash/file/FileReaderSync"
], function(extensions, Basic, FileReaderSync) {
	return (extensions.FileReaderSync = Basic.extend({}, FileReaderSync));
});

// Included from: src/javascript/runtime/silverlight/runtime/Transporter.js

/**
 * Transporter.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/silverlight/runtime/Transporter
@private
*/
define("moxie/runtime/silverlight/runtime/Transporter", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/core/utils/Basic",
	"moxie/runtime/flash/runtime/Transporter"
], function(extensions, Basic, Transporter) {
	return (extensions.Transporter = Basic.extend({}, Transporter));
});

// Included from: src/javascript/runtime/silverlight/xhr/XMLHttpRequest.js

/**
 * XMLHttpRequest.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/silverlight/xhr/XMLHttpRequest
@private
*/
define("moxie/runtime/silverlight/xhr/XMLHttpRequest", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/core/utils/Basic",
	"moxie/runtime/flash/xhr/XMLHttpRequest",
	"moxie/runtime/silverlight/file/FileReaderSync",
	"moxie/runtime/silverlight/runtime/Transporter"
], function(extensions, Basic, XMLHttpRequest, FileReaderSyncSilverlight, TransporterSilverlight) {
	return (extensions.XMLHttpRequest = Basic.extend({}, XMLHttpRequest));
});

// Included from: src/javascript/runtime/silverlight/image/Image.js

/**
 * Image.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */
 
/**
@class moxie/runtime/silverlight/image/Image
@private
*/
define("moxie/runtime/silverlight/image/Image", [
	"moxie/runtime/silverlight/Runtime",
	"moxie/core/utils/Basic",
	"moxie/file/Blob",
	"moxie/runtime/flash/image/Image"
], function(extensions, Basic, Blob, Image) {
	return (extensions.Image = Basic.extend({}, Image, {

		getInfo: function() {
			var self = this.getRuntime()
			, grps = ['tiff', 'exif', 'gps', 'thumb']
			, info = { meta: {} }
			, rawInfo = self.shimExec.call(this, 'Image', 'getInfo')
			;

			if (rawInfo.meta) {
				Basic.each(grps, function(grp) {
					var meta = rawInfo.meta[grp]
					, tag
					, i
					, length
					, value
					;
					if (meta && meta.keys) {
						info.meta[grp] = {};
						for (i = 0, length = meta.keys.length; i < length; i++) {
							tag = meta.keys[i];
							value = meta[tag];
							if (value) {
								// convert numbers
								if (/^(\d|[1-9]\d+)$/.test(value)) { // integer (make sure doesn't start with zero)
									value = parseInt(value, 10);
								} else if (/^\d*\.\d+$/.test(value)) { // double
									value = parseFloat(value);
								}
								info.meta[grp][tag] = value;
							}
						}
					}
				});

				// save thumb data as blob
				if (info.meta && info.meta.thumb && info.meta.thumb.data && !(self.meta.thumb.data instanceof Blob)) {
					info.meta.thumb.data = new Blob(self.uid, info.meta.thumb.data);
				}
			}

			info.width = parseInt(rawInfo.width, 10);
			info.height = parseInt(rawInfo.height, 10);
			info.size = parseInt(rawInfo.size, 10);
			info.type = rawInfo.type;
			info.name = rawInfo.name;

			return info;
		},

		resize: function(rect, ratio, opts) {
			this.getRuntime().shimExec.call(this, 'Image', 'resize', rect.x, rect.y, rect.width, rect.height, ratio, opts.preserveHeaders, opts.resample);
		}
	}));
});

// Included from: src/javascript/runtime/html4/Runtime.js

/**
 * Runtime.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/*global File:true */

/**
Defines constructor for HTML4 runtime.

@class moxie/runtime/html4/Runtime
@private
*/
define("moxie/runtime/html4/Runtime", [
	"moxie/core/utils/Basic",
	"moxie/core/Exceptions",
	"moxie/runtime/Runtime",
	"moxie/core/utils/Env"
], function(Basic, x, Runtime, Env) {
	
	var type = 'html4', extensions = {};

	function Html4Runtime(options) {
		var I = this
		, Test = Runtime.capTest
		, True = Runtime.capTrue
		;

		Runtime.call(this, options, type, {
			access_binary: Test(window.FileReader || window.File && File.getAsDataURL),
			access_image_binary: false,
			display_media: Test(
				(Env.can('create_canvas') || Env.can('use_data_uri_over32kb')) && 
				defined('moxie/image/Image')
			),
			do_cors: false,
			drag_and_drop: false,
			filter_by_extension: Test(function() { // if you know how to feature-detect this, please suggest
				return !(
					(Env.browser === 'Chrome' && Env.verComp(Env.version, 28, '<')) || 
					(Env.browser === 'IE' && Env.verComp(Env.version, 10, '<')) || 
					(Env.browser === 'Safari' && Env.verComp(Env.version, 7, '<')) ||
					(Env.browser === 'Firefox' && Env.verComp(Env.version, 37, '<'))
				);
			}()),
			resize_image: function() {
				return extensions.Image && I.can('access_binary') && Env.can('create_canvas');
			},
			report_upload_progress: false,
			return_response_headers: false,
			return_response_type: function(responseType) {
				if (responseType === 'json' && !!window.JSON) {
					return true;
				} 
				return !!~Basic.inArray(responseType, ['text', 'document', '']);
			},
			return_status_code: function(code) {
				return !Basic.arrayDiff(code, [200, 404]);
			},
			select_file: function() {
				return Env.can('use_fileinput');
			},
			select_multiple: false,
			send_binary_string: false,
			send_custom_headers: false,
			send_multipart: true,
			slice_blob: false,
			stream_upload: function() {
				return I.can('select_file');
			},
			summon_file_dialog: function() { // yeah... some dirty sniffing here...
				return I.can('select_file') && (
					(Env.browser === 'Firefox' && Env.verComp(Env.version, 4, '>=')) ||
					(Env.browser === 'Opera' && Env.verComp(Env.version, 12, '>=')) ||
					(Env.browser === 'IE' && Env.verComp(Env.version, 10, '>=')) ||
					!!~Basic.inArray(Env.browser, ['Chrome', 'Safari'])
				);
			},
			upload_filesize: True,
			use_http_method: function(methods) {
				return !Basic.arrayDiff(methods, ['GET', 'POST']);
			}
		});


		Basic.extend(this, {
			init : function() {
				this.trigger("Init");
			},

			destroy: (function(destroy) { // extend default destroy method
				return function() {
					destroy.call(I);
					destroy = I = null;
				};
			}(this.destroy))
		});

		Basic.extend(this.getShim(), extensions);
	}

	Runtime.addConstructor(type, Html4Runtime);

	return extensions;
});

// Included from: src/javascript/runtime/html4/file/FileInput.js

/**
 * FileInput.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html4/file/FileInput
@private
*/
define("moxie/runtime/html4/file/FileInput", [
	"moxie/runtime/html4/Runtime",
	"moxie/file/File",
	"moxie/core/utils/Basic",
	"moxie/core/utils/Dom",
	"moxie/core/utils/Events",
	"moxie/core/utils/Mime",
	"moxie/core/utils/Env"
], function(extensions, File, Basic, Dom, Events, Mime, Env) {
	
	function FileInput() {
		var _uid, _mimes = [], _options, _browseBtnZIndex; // save original z-index;

		function addInput() {
			var comp = this, I = comp.getRuntime(), shimContainer, browseButton, currForm, form, input, uid;

			uid = Basic.guid('uid_');

			shimContainer = I.getShimContainer(); // we get new ref every time to avoid memory leaks in IE

			if (_uid) { // move previous form out of the view
				currForm = Dom.get(_uid + '_form');
				if (currForm) {
					Basic.extend(currForm.style, { top: '100%' });
				}
			}

			// build form in DOM, since innerHTML version not able to submit file for some reason
			form = document.createElement('form');
			form.setAttribute('id', uid + '_form');
			form.setAttribute('method', 'post');
			form.setAttribute('enctype', 'multipart/form-data');
			form.setAttribute('encoding', 'multipart/form-data');

			Basic.extend(form.style, {
				overflow: 'hidden',
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%'
			});

			input = document.createElement('input');
			input.setAttribute('id', uid);
			input.setAttribute('type', 'file');
			input.setAttribute('accept', _mimes.join(','));

			Basic.extend(input.style, {
				fontSize: '999px',
				opacity: 0
			});

			form.appendChild(input);
			shimContainer.appendChild(form);

			// prepare file input to be placed underneath the browse_button element
			Basic.extend(input.style, {
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%'
			});

			if (Env.browser === 'IE' && Env.verComp(Env.version, 10, '<')) {
				Basic.extend(input.style, {
					filter : "progid:DXImageTransform.Microsoft.Alpha(opacity=0)"
				});
			}

			input.onchange = function() { // there should be only one handler for this
				var file;

				if (!this.value) {
					return;
				}

				if (this.files) { // check if browser is fresh enough
					file = this.files[0];

					// ignore empty files (IE10 for example hangs if you try to send them via XHR)
					if (file.size === 0) {
						form.parentNode.removeChild(form);
						return;
					}
				} else {
					file = {
						name: this.value
					};
				}

				file = new File(I.uid, file);

				// clear event handler
				this.onchange = function() {}; 
				addInput.call(comp); 

				comp.files = [file];

				// substitute all ids with file uids (consider file.uid read-only - we cannot do it the other way around)
				input.setAttribute('id', file.uid);
				form.setAttribute('id', file.uid + '_form');
				
				comp.trigger('change');

				input = form = null;
			};


			// route click event to the input
			if (I.can('summon_file_dialog')) {
				browseButton = Dom.get(_options.browse_button);
				Events.removeEvent(browseButton, 'click', comp.uid);
				Events.addEvent(browseButton, 'click', function(e) {
					if (input && !input.disabled) { // for some reason FF (up to 8.0.1 so far) lets to click disabled input[type=file]
						input.click();
					}
					e.preventDefault();
				}, comp.uid);
			}

			_uid = uid;

			shimContainer = currForm = browseButton = null;
		}

		Basic.extend(this, {
			init: function(options) {
				var comp = this, I = comp.getRuntime(), shimContainer;

				// figure out accept string
				_options = options;
				_mimes = options.accept.mimes || Mime.extList2mimes(options.accept, I.can('filter_by_extension'));

				shimContainer = I.getShimContainer();

				(function() {
					var browseButton, zIndex, top;

					browseButton = Dom.get(options.browse_button);
					_browseBtnZIndex = Dom.getStyle(browseButton, 'z-index') || 'auto';

					// Route click event to the input[type=file] element for browsers that support such behavior
					if (I.can('summon_file_dialog')) {
						if (Dom.getStyle(browseButton, 'position') === 'static') {
							browseButton.style.position = 'relative';
						}						

						comp.bind('Refresh', function() {
							zIndex = parseInt(_browseBtnZIndex, 10) || 1;

							Dom.get(_options.browse_button).style.zIndex = zIndex;
							this.getRuntime().getShimContainer().style.zIndex = zIndex - 1;
						});
					}

					/* Since we have to place input[type=file] on top of the browse_button for some browsers,
					browse_button loses interactivity, so we restore it here */
					top = I.can('summon_file_dialog') ? browseButton : shimContainer;

					Events.addEvent(top, 'mouseover', function() {
						comp.trigger('mouseenter');
					}, comp.uid);

					Events.addEvent(top, 'mouseout', function() {
						comp.trigger('mouseleave');
					}, comp.uid);

					Events.addEvent(top, 'mousedown', function() {
						comp.trigger('mousedown');
					}, comp.uid);

					Events.addEvent(Dom.get(options.container), 'mouseup', function() {
						comp.trigger('mouseup');
					}, comp.uid);

					browseButton = null;
				}());

				addInput.call(this);

				shimContainer = null;

				// trigger ready event asynchronously
				comp.trigger({
					type: 'ready',
					async: true
				});
			},

			setOption: function(name, value) {
				var I = this.getRuntime();
				var input;

				if (name == 'accept') {
					_mimes = value.mimes || Mime.extList2mimes(value, I.can('filter_by_extension'));
				}

				// update current input
				input = Dom.get(_uid)
				if (input) {
					input.setAttribute('accept', _mimes.join(','));
				}
			},


			disable: function(state) {
				var input;

				if ((input = Dom.get(_uid))) {
					input.disabled = !!state;
				}
			},

			destroy: function() {
				var I = this.getRuntime()
				, shim = I.getShim()
				, shimContainer = I.getShimContainer()
				, container = _options && Dom.get(_options.container)
				, browseButton = _options && Dom.get(_options.browse_button)
				;
				
				if (container) {
					Events.removeAllEvents(container, this.uid);
				}
				
				if (browseButton) {
					Events.removeAllEvents(browseButton, this.uid);
					browseButton.style.zIndex = _browseBtnZIndex; // reset to original value
				}
				
				if (shimContainer) {
					Events.removeAllEvents(shimContainer, this.uid);
					shimContainer.innerHTML = '';
				}

				shim.removeInstance(this.uid);

				_uid = _mimes = _options = shimContainer = container = browseButton = shim = null;
			}
		});
	}

	return (extensions.FileInput = FileInput);
});

// Included from: src/javascript/runtime/html4/file/FileReader.js

/**
 * FileReader.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html4/file/FileReader
@private
*/
define("moxie/runtime/html4/file/FileReader", [
	"moxie/runtime/html4/Runtime",
	"moxie/runtime/html5/file/FileReader"
], function(extensions, FileReader) {
	return (extensions.FileReader = FileReader);
});

// Included from: src/javascript/runtime/html4/xhr/XMLHttpRequest.js

/**
 * XMLHttpRequest.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html4/xhr/XMLHttpRequest
@private
*/
define("moxie/runtime/html4/xhr/XMLHttpRequest", [
	"moxie/runtime/html4/Runtime",
	"moxie/core/utils/Basic",
	"moxie/core/utils/Dom",
	"moxie/core/utils/Url",
	"moxie/core/Exceptions",
	"moxie/core/utils/Events",
	"moxie/file/Blob",
	"moxie/xhr/FormData"
], function(extensions, Basic, Dom, Url, x, Events, Blob, FormData) {
	
	function XMLHttpRequest() {
		var _status, _response, _iframe;

		function cleanup(cb) {
			var target = this, uid, form, inputs, i, hasFile = false;

			if (!_iframe) {
				return;
			}

			uid = _iframe.id.replace(/_iframe$/, '');

			form = Dom.get(uid + '_form');
			if (form) {
				inputs = form.getElementsByTagName('input');
				i = inputs.length;

				while (i--) {
					switch (inputs[i].getAttribute('type')) {
						case 'hidden':
							inputs[i].parentNode.removeChild(inputs[i]);
							break;
						case 'file':
							hasFile = true; // flag the case for later
							break;
					}
				}
				inputs = [];

				if (!hasFile) { // we need to keep the form for sake of possible retries
					form.parentNode.removeChild(form);
				}
				form = null;
			}

			// without timeout, request is marked as canceled (in console)
			setTimeout(function() {
				Events.removeEvent(_iframe, 'load', target.uid);
				if (_iframe.parentNode) { // #382
					_iframe.parentNode.removeChild(_iframe);
				}

				// check if shim container has any other children, if - not, remove it as well
				var shimContainer = target.getRuntime().getShimContainer();
				if (!shimContainer.children.length) {
					shimContainer.parentNode.removeChild(shimContainer);
				}

				shimContainer = _iframe = null;
				cb();
			}, 1);
		}

		Basic.extend(this, {
			send: function(meta, data) {
				var target = this, I = target.getRuntime(), uid, form, input, blob;

				_status = _response = null;

				function createIframe() {
					var container = I.getShimContainer() || document.body
					, temp = document.createElement('div')
					;

					// IE 6 won't be able to set the name using setAttribute or iframe.name
					temp.innerHTML = '<iframe id="' + uid + '_iframe" name="' + uid + '_iframe" src="javascript:&quot;&quot;" style="display:none"></iframe>';
					_iframe = temp.firstChild;
					container.appendChild(_iframe);

					/* _iframe.onreadystatechange = function() {
						console.info(_iframe.readyState);
					};*/

					Events.addEvent(_iframe, 'load', function() { // _iframe.onload doesn't work in IE lte 8
						var el;

						try {
							el = _iframe.contentWindow.document || _iframe.contentDocument || window.frames[_iframe.id].document;

							// try to detect some standard error pages
							if (/^4(0[0-9]|1[0-7]|2[2346])\s/.test(el.title)) { // test if title starts with 4xx HTTP error
								_status = el.title.replace(/^(\d+).*$/, '$1');
							} else {
								_status = 200;
								// get result
								_response = Basic.trim(el.body.innerHTML);

								// we need to fire these at least once
								target.trigger({
									type: 'progress',
									loaded: _response.length,
									total: _response.length
								});

								if (blob) { // if we were uploading a file
									target.trigger({
										type: 'uploadprogress',
										loaded: blob.size || 1025,
										total: blob.size || 1025
									});
								}
							}
						} catch (ex) {
							if (Url.hasSameOrigin(meta.url)) {
								// if response is sent with error code, iframe in IE gets redirected to res://ieframe.dll/http_x.htm
								// which obviously results to cross domain error (wtf?)
								_status = 404;
							} else {
								cleanup.call(target, function() {
									target.trigger('error');
								});
								return;
							}
						}	
					
						cleanup.call(target, function() {
							target.trigger('load');
						});
					}, target.uid);
				} // end createIframe

				// prepare data to be sent and convert if required
				if (data instanceof FormData && data.hasBlob()) {
					blob = data.getBlob();
					uid = blob.uid;
					input = Dom.get(uid);
					form = Dom.get(uid + '_form');
					if (!form) {
						throw new x.DOMException(x.DOMException.NOT_FOUND_ERR);
					}
				} else {
					uid = Basic.guid('uid_');

					form = document.createElement('form');
					form.setAttribute('id', uid + '_form');
					form.setAttribute('method', meta.method);
					form.setAttribute('enctype', 'multipart/form-data');
					form.setAttribute('encoding', 'multipart/form-data');

					I.getShimContainer().appendChild(form);
				}

				// set upload target
				form.setAttribute('target', uid + '_iframe');

				if (data instanceof FormData) {
					data.each(function(value, name) {
						if (value instanceof Blob) {
							if (input) {
								input.setAttribute('name', name);
							}
						} else {
							var hidden = document.createElement('input');

							Basic.extend(hidden, {
								type : 'hidden',
								name : name,
								value : value
							});

							// make sure that input[type="file"], if it's there, comes last
							if (input) {
								form.insertBefore(hidden, input);
							} else {
								form.appendChild(hidden);
							}
						}
					});
				}

				// set destination url
				form.setAttribute("action", meta.url);

				createIframe();
				form.submit();
				target.trigger('loadstart');
			},

			getStatus: function() {
				return _status;
			},

			getResponse: function(responseType) {
				if ('json' === responseType) {
					// strip off <pre>..</pre> tags that might be enclosing the response
					if (Basic.typeOf(_response) === 'string' && !!window.JSON) {
						try {
							return JSON.parse(_response.replace(/^\s*<pre[^>]*>/, '').replace(/<\/pre>\s*$/, ''));
						} catch (ex) {
							return null;
						}
					} 
				} else if ('document' === responseType) {

				}
				return _response;
			},

			abort: function() {
				var target = this;

				if (_iframe && _iframe.contentWindow) {
					if (_iframe.contentWindow.stop) { // FireFox/Safari/Chrome
						_iframe.contentWindow.stop();
					} else if (_iframe.contentWindow.document.execCommand) { // IE
						_iframe.contentWindow.document.execCommand('Stop');
					} else {
						_iframe.src = "about:blank";
					}
				}

				cleanup.call(this, function() {
					// target.dispatchEvent('readystatechange');
					target.dispatchEvent('abort');
				});
			}
		});
	}

	return (extensions.XMLHttpRequest = XMLHttpRequest);
});

// Included from: src/javascript/runtime/html4/image/Image.js

/**
 * Image.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

/**
@class moxie/runtime/html4/image/Image
@private
*/
define("moxie/runtime/html4/image/Image", [
	"moxie/runtime/html4/Runtime",
	"moxie/runtime/html5/image/Image"
], function(extensions, Image) {
	return (extensions.Image = Image);
});

expose(["moxie/core/utils/Basic","moxie/core/utils/Encode","moxie/core/utils/Env","moxie/core/Exceptions","moxie/core/utils/Dom","moxie/core/EventTarget","moxie/runtime/Runtime","moxie/runtime/RuntimeClient","moxie/file/Blob","moxie/core/I18n","moxie/core/utils/Mime","moxie/file/FileInput","moxie/file/File","moxie/file/FileDrop","moxie/file/FileReader","moxie/core/utils/Url","moxie/runtime/RuntimeTarget","moxie/xhr/FormData","moxie/xhr/XMLHttpRequest","moxie/runtime/Transporter","moxie/image/Image","moxie/core/utils/Events","moxie/runtime/html5/image/ResizerCanvas"]);
})(this);
}));

/***/ },

/***/ "./node_modules/.2.3.0@plupload/js/plupload.dev.js":
/***/ function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Plupload - multi-runtime File Uploader
 * v2.3
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 *
 * Date: 2017-02-02
 */
;(function (global, factory) {
	var extract = function() {
		var ctx = {};
		factory.apply(ctx, arguments);
		return ctx.plupload;
	};
	
	if (true) {
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("./node_modules/.2.3.0@plupload/js/moxie.js")], __WEBPACK_AMD_DEFINE_FACTORY__ = (extract), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === "object" && module.exports) {
		module.exports = extract(require('./moxie'));
	} else {
		global.plupload = extract(global.moxie);
	}
}(this || window, function(moxie) {
/**
 * Plupload.js
 *
 * Copyright 2013, Moxiecode Systems AB
 * Released under GPL License.
 *
 * License: http://www.plupload.com/license
 * Contributing: http://www.plupload.com/contributing
 */

;(function(exports, o, undef) {

var delay = window.setTimeout;
var fileFilters = {};
var u = o.core.utils;
var Runtime = o.runtime.Runtime;

// convert plupload features to caps acceptable by mOxie
function normalizeCaps(settings) {
	var features = settings.required_features, caps = {};

	function resolve(feature, value, strict) {
		// Feature notation is deprecated, use caps (this thing here is required for backward compatibility)
		var map = {
			chunks: 'slice_blob',
			jpgresize: 'send_binary_string',
			pngresize: 'send_binary_string',
			progress: 'report_upload_progress',
			multi_selection: 'select_multiple',
			dragdrop: 'drag_and_drop',
			drop_element: 'drag_and_drop',
			headers: 'send_custom_headers',
			urlstream_upload: 'send_binary_string',
			canSendBinary: 'send_binary',
			triggerDialog: 'summon_file_dialog'
		};

		if (map[feature]) {
			caps[map[feature]] = value;
		} else if (!strict) {
			caps[feature] = value;
		}
	}

	if (typeof(features) === 'string') {
		plupload.each(features.split(/\s*,\s*/), function(feature) {
			resolve(feature, true);
		});
	} else if (typeof(features) === 'object') {
		plupload.each(features, function(value, feature) {
			resolve(feature, value);
		});
	} else if (features === true) {
		// check settings for required features
		if (settings.chunk_size && settings.chunk_size > 0) {
			caps.slice_blob = true;
		}

		if (!plupload.isEmptyObj(settings.resize) || settings.multipart === false) {
			caps.send_binary_string = true;
		}

		if (settings.http_method) {
            caps.use_http_method = settings.http_method;
        }

		plupload.each(settings, function(value, feature) {
			resolve(feature, !!value, true); // strict check
		});
	}

	return caps;
}

/**
 * @module plupload
 * @static
 */
var plupload = {
	/**
	 * Plupload version will be replaced on build.
	 *
	 * @property VERSION
	 * @for Plupload
	 * @static
	 * @final
	 */
	VERSION : '2.3',

	/**
	 * The state of the queue before it has started and after it has finished
	 *
	 * @property STOPPED
	 * @static
	 * @final
	 */
	STOPPED : 1,

	/**
	 * Upload process is running
	 *
	 * @property STARTED
	 * @static
	 * @final
	 */
	STARTED : 2,

	/**
	 * File is queued for upload
	 *
	 * @property QUEUED
	 * @static
	 * @final
	 */
	QUEUED : 1,

	/**
	 * File is being uploaded
	 *
	 * @property UPLOADING
	 * @static
	 * @final
	 */
	UPLOADING : 2,

	/**
	 * File has failed to be uploaded
	 *
	 * @property FAILED
	 * @static
	 * @final
	 */
	FAILED : 4,

	/**
	 * File has been uploaded successfully
	 *
	 * @property DONE
	 * @static
	 * @final
	 */
	DONE : 5,

	// Error constants used by the Error event

	/**
	 * Generic error for example if an exception is thrown inside Silverlight.
	 *
	 * @property GENERIC_ERROR
	 * @static
	 * @final
	 */
	GENERIC_ERROR : -100,

	/**
	 * HTTP transport error. For example if the server produces a HTTP status other than 200.
	 *
	 * @property HTTP_ERROR
	 * @static
	 * @final
	 */
	HTTP_ERROR : -200,

	/**
	 * Generic I/O error. For example if it wasn't possible to open the file stream on local machine.
	 *
	 * @property IO_ERROR
	 * @static
	 * @final
	 */
	IO_ERROR : -300,

	/**
	 * @property SECURITY_ERROR
	 * @static
	 * @final
	 */
	SECURITY_ERROR : -400,

	/**
	 * Initialization error. Will be triggered if no runtime was initialized.
	 *
	 * @property INIT_ERROR
	 * @static
	 * @final
	 */
	INIT_ERROR : -500,

	/**
	 * File size error. If the user selects a file that is too large it will be blocked and an error of this type will be triggered.
	 *
	 * @property FILE_SIZE_ERROR
	 * @static
	 * @final
	 */
	FILE_SIZE_ERROR : -600,

	/**
	 * File extension error. If the user selects a file that isn't valid according to the filters setting.
	 *
	 * @property FILE_EXTENSION_ERROR
	 * @static
	 * @final
	 */
	FILE_EXTENSION_ERROR : -601,

	/**
	 * Duplicate file error. If prevent_duplicates is set to true and user selects the same file again.
	 *
	 * @property FILE_DUPLICATE_ERROR
	 * @static
	 * @final
	 */
	FILE_DUPLICATE_ERROR : -602,

	/**
	 * Runtime will try to detect if image is proper one. Otherwise will throw this error.
	 *
	 * @property IMAGE_FORMAT_ERROR
	 * @static
	 * @final
	 */
	IMAGE_FORMAT_ERROR : -700,

	/**
	 * While working on files runtime may run out of memory and will throw this error.
	 *
	 * @since 2.1.2
	 * @property MEMORY_ERROR
	 * @static
	 * @final
	 */
	MEMORY_ERROR : -701,

	/**
	 * Each runtime has an upper limit on a dimension of the image it can handle. If bigger, will throw this error.
	 *
	 * @property IMAGE_DIMENSIONS_ERROR
	 * @static
	 * @final
	 */
	IMAGE_DIMENSIONS_ERROR : -702,

	/**
	 * Mime type lookup table.
	 *
	 * @property mimeTypes
	 * @type Object
	 * @final
	 */
	mimeTypes : u.Mime.mimes,

	/**
	 * In some cases sniffing is the only way around :(
	 */
	ua: u.Env,

	/**
	 * Gets the true type of the built-in object (better version of typeof).
	 * @credits Angus Croll (http://javascriptweblog.wordpress.com/)
	 *
	 * @method typeOf
	 * @static
	 * @param {Object} o Object to check.
	 * @return {String} Object [[Class]]
	 */
	typeOf: u.Basic.typeOf,

	/**
	 * Extends the specified object with another object.
	 *
	 * @method extend
	 * @static
	 * @param {Object} target Object to extend.
	 * @param {Object..} obj Multiple objects to extend with.
	 * @return {Object} Same as target, the extended object.
	 */
	extend : u.Basic.extend,

	/**
	 * Generates an unique ID. This is 99.99% unique since it takes the current time and 5 random numbers.
	 * The only way a user would be able to get the same ID is if the two persons at the same exact millisecond manages
	 * to get 5 the same random numbers between 0-65535 it also uses a counter so each call will be guaranteed to be page unique.
	 * It's more probable for the earth to be hit with an asteriod. You can also if you want to be 100% sure set the plupload.guidPrefix property
	 * to an user unique key.
	 *
	 * @method guid
	 * @static
	 * @return {String} Virtually unique id.
	 */
	guid : u.Basic.guid,

	/**
	 * Get array of DOM Elements by their ids.
	 *
	 * @method get
	 * @param {String} id Identifier of the DOM Element
	 * @return {Array}
	*/
	getAll : function get(ids) {
		var els = [], el;

		if (plupload.typeOf(ids) !== 'array') {
			ids = [ids];
		}

		var i = ids.length;
		while (i--) {
			el = plupload.get(ids[i]);
			if (el) {
				els.push(el);
			}
		}

		return els.length ? els : null;
	},

	/**
	Get DOM element by id

	@method get
	@param {String} id Identifier of the DOM Element
	@return {Node}
	*/
	get: u.Dom.get,

	/**
	 * Executes the callback function for each item in array/object. If you return false in the
	 * callback it will break the loop.
	 *
	 * @method each
	 * @static
	 * @param {Object} obj Object to iterate.
	 * @param {function} callback Callback function to execute for each item.
	 */
	each : u.Basic.each,

	/**
	 * Returns the absolute x, y position of an Element. The position will be returned in a object with x, y fields.
	 *
	 * @method getPos
	 * @static
	 * @param {Element} node HTML element or element id to get x, y position from.
	 * @param {Element} root Optional root element to stop calculations at.
	 * @return {object} Absolute position of the specified element object with x, y fields.
	 */
	getPos : u.Dom.getPos,

	/**
	 * Returns the size of the specified node in pixels.
	 *
	 * @method getSize
	 * @static
	 * @param {Node} node Node to get the size of.
	 * @return {Object} Object with a w and h property.
	 */
	getSize : u.Dom.getSize,

	/**
	 * Encodes the specified string.
	 *
	 * @method xmlEncode
	 * @static
	 * @param {String} s String to encode.
	 * @return {String} Encoded string.
	 */
	xmlEncode : function(str) {
		var xmlEncodeChars = {'<' : 'lt', '>' : 'gt', '&' : 'amp', '"' : 'quot', '\'' : '#39'}, xmlEncodeRegExp = /[<>&\"\']/g;

		return str ? ('' + str).replace(xmlEncodeRegExp, function(chr) {
			return xmlEncodeChars[chr] ? '&' + xmlEncodeChars[chr] + ';' : chr;
		}) : str;
	},

	/**
	 * Forces anything into an array.
	 *
	 * @method toArray
	 * @static
	 * @param {Object} obj Object with length field.
	 * @return {Array} Array object containing all items.
	 */
	toArray : u.Basic.toArray,

	/**
	 * Find an element in array and return its index if present, otherwise return -1.
	 *
	 * @method inArray
	 * @static
	 * @param {mixed} needle Element to find
	 * @param {Array} array
	 * @return {Int} Index of the element, or -1 if not found
	 */
	inArray : u.Basic.inArray,

	/**
	Recieve an array of functions (usually async) to call in sequence, each  function
	receives a callback as first argument that it should call, when it completes. Finally,
	after everything is complete, main callback is called. Passing truthy value to the
	callback as a first argument will interrupt the sequence and invoke main callback
	immediately.

	@method inSeries
	@static
	@param {Array} queue Array of functions to call in sequence
	@param {Function} cb Main callback that is called in the end, or in case of error
	*/
	inSeries: u.Basic.inSeries,

	/**
	 * Extends the language pack object with new items.
	 *
	 * @method addI18n
	 * @static
	 * @param {Object} pack Language pack items to add.
	 * @return {Object} Extended language pack object.
	 */
	addI18n : o.core.I18n.addI18n,

	/**
	 * Translates the specified string by checking for the english string in the language pack lookup.
	 *
	 * @method translate
	 * @static
	 * @param {String} str String to look for.
	 * @return {String} Translated string or the input string if it wasn't found.
	 */
	translate : o.core.I18n.translate,

	/**
	 * Pseudo sprintf implementation - simple way to replace tokens with specified values.
	 *
	 * @param {String} str String with tokens
	 * @return {String} String with replaced tokens
	 */
	sprintf : u.Basic.sprintf,

	/**
	 * Checks if object is empty.
	 *
	 * @method isEmptyObj
	 * @static
	 * @param {Object} obj Object to check.
	 * @return {Boolean}
	 */
	isEmptyObj : u.Basic.isEmptyObj,

	/**
	 * Checks if specified DOM element has specified class.
	 *
	 * @method hasClass
	 * @static
	 * @param {Object} obj DOM element like object to add handler to.
	 * @param {String} name Class name
	 */
	hasClass : u.Dom.hasClass,

	/**
	 * Adds specified className to specified DOM element.
	 *
	 * @method addClass
	 * @static
	 * @param {Object} obj DOM element like object to add handler to.
	 * @param {String} name Class name
	 */
	addClass : u.Dom.addClass,

	/**
	 * Removes specified className from specified DOM element.
	 *
	 * @method removeClass
	 * @static
	 * @param {Object} obj DOM element like object to add handler to.
	 * @param {String} name Class name
	 */
	removeClass : u.Dom.removeClass,

	/**
	 * Returns a given computed style of a DOM element.
	 *
	 * @method getStyle
	 * @static
	 * @param {Object} obj DOM element like object.
	 * @param {String} name Style you want to get from the DOM element
	 */
	getStyle : u.Dom.getStyle,

	/**
	 * Adds an event handler to the specified object and store reference to the handler
	 * in objects internal Plupload registry (@see removeEvent).
	 *
	 * @method addEvent
	 * @static
	 * @param {Object} obj DOM element like object to add handler to.
	 * @param {String} name Name to add event listener to.
	 * @param {Function} callback Function to call when event occurs.
	 * @param {String} (optional) key that might be used to add specifity to the event record.
	 */
	addEvent : u.Events.addEvent,

	/**
	 * Remove event handler from the specified object. If third argument (callback)
	 * is not specified remove all events with the specified name.
	 *
	 * @method removeEvent
	 * @static
	 * @param {Object} obj DOM element to remove event listener(s) from.
	 * @param {String} name Name of event listener to remove.
	 * @param {Function|String} (optional) might be a callback or unique key to match.
	 */
	removeEvent: u.Events.removeEvent,

	/**
	 * Remove all kind of events from the specified object
	 *
	 * @method removeAllEvents
	 * @static
	 * @param {Object} obj DOM element to remove event listeners from.
	 * @param {String} (optional) unique key to match, when removing events.
	 */
	removeAllEvents: u.Events.removeAllEvents,

	/**
	 * Cleans the specified name from national characters (diacritics). The result will be a name with only a-z, 0-9 and _.
	 *
	 * @method cleanName
	 * @static
	 * @param {String} s String to clean up.
	 * @return {String} Cleaned string.
	 */
	cleanName : function(name) {
		var i, lookup;

		// Replace diacritics
		lookup = [
			/[\300-\306]/g, 'A', /[\340-\346]/g, 'a',
			/\307/g, 'C', /\347/g, 'c',
			/[\310-\313]/g, 'E', /[\350-\353]/g, 'e',
			/[\314-\317]/g, 'I', /[\354-\357]/g, 'i',
			/\321/g, 'N', /\361/g, 'n',
			/[\322-\330]/g, 'O', /[\362-\370]/g, 'o',
			/[\331-\334]/g, 'U', /[\371-\374]/g, 'u'
		];

		for (i = 0; i < lookup.length; i += 2) {
			name = name.replace(lookup[i], lookup[i + 1]);
		}

		// Replace whitespace
		name = name.replace(/\s+/g, '_');

		// Remove anything else
		name = name.replace(/[^a-z0-9_\-\.]+/gi, '');

		return name;
	},

	/**
	 * Builds a full url out of a base URL and an object with items to append as query string items.
	 *
	 * @method buildUrl
	 * @static
	 * @param {String} url Base URL to append query string items to.
	 * @param {Object} items Name/value object to serialize as a querystring.
	 * @return {String} String with url + serialized query string items.
	 */
	buildUrl: function(url, items) {
		var query = '';

		plupload.each(items, function(value, name) {
			query += (query ? '&' : '') + encodeURIComponent(name) + '=' + encodeURIComponent(value);
		});

		if (query) {
			url += (url.indexOf('?') > 0 ? '&' : '?') + query;
		}

		return url;
	},

	/**
	 * Formats the specified number as a size string for example 1024 becomes 1 KB.
	 *
	 * @method formatSize
	 * @static
	 * @param {Number} size Size to format as string.
	 * @return {String} Formatted size string.
	 */
	formatSize : function(size) {

		if (size === undef || /\D/.test(size)) {
			return plupload.translate('N/A');
		}

		function round(num, precision) {
			return Math.round(num * Math.pow(10, precision)) / Math.pow(10, precision);
		}

		var boundary = Math.pow(1024, 4);

		// TB
		if (size > boundary) {
			return round(size / boundary, 1) + " " + plupload.translate('tb');
		}

		// GB
		if (size > (boundary/=1024)) {
			return round(size / boundary, 1) + " " + plupload.translate('gb');
		}

		// MB
		if (size > (boundary/=1024)) {
			return round(size / boundary, 1) + " " + plupload.translate('mb');
		}

		// KB
		if (size > 1024) {
			return Math.round(size / 1024) + " " + plupload.translate('kb');
		}

		return size + " " + plupload.translate('b');
	},


	/**
	 * Parses the specified size string into a byte value. For example 10kb becomes 10240.
	 *
	 * @method parseSize
	 * @static
	 * @param {String|Number} size String to parse or number to just pass through.
	 * @return {Number} Size in bytes.
	 */
	parseSize : u.Basic.parseSizeStr,


	/**
	 * A way to predict what runtime will be choosen in the current environment with the
	 * specified settings.
	 *
	 * @method predictRuntime
	 * @static
	 * @param {Object|String} config Plupload settings to check
	 * @param {String} [runtimes] Comma-separated list of runtimes to check against
	 * @return {String} Type of compatible runtime
	 */
	predictRuntime : function(config, runtimes) {
		var up, runtime;

		up = new plupload.Uploader(config);
		runtime = Runtime.thatCan(up.getOption().required_features, runtimes || config.runtimes);
		up.destroy();
		return runtime;
	},

	/**
	 * Registers a filter that will be executed for each file added to the queue.
	 * If callback returns false, file will not be added.
	 *
	 * Callback receives two arguments: a value for the filter as it was specified in settings.filters
	 * and a file to be filtered. Callback is executed in the context of uploader instance.
	 *
	 * @method addFileFilter
	 * @static
	 * @param {String} name Name of the filter by which it can be referenced in settings.filters
	 * @param {String} cb Callback - the actual routine that every added file must pass
	 */
	addFileFilter: function(name, cb) {
		fileFilters[name] = cb;
	}
};


plupload.addFileFilter('mime_types', function(filters, file, cb) {
	if (filters.length && !filters.regexp.test(file.name)) {
		this.trigger('Error', {
			code : plupload.FILE_EXTENSION_ERROR,
			message : plupload.translate('File extension error.'),
			file : file
		});
		cb(false);
	} else {
		cb(true);
	}
});


plupload.addFileFilter('max_file_size', function(maxSize, file, cb) {
	var undef;

	maxSize = plupload.parseSize(maxSize);

	// Invalid file size
	if (file.size !== undef && maxSize && file.size > maxSize) {
		this.trigger('Error', {
			code : plupload.FILE_SIZE_ERROR,
			message : plupload.translate('File size error.'),
			file : file
		});
		cb(false);
	} else {
		cb(true);
	}
});


plupload.addFileFilter('prevent_duplicates', function(value, file, cb) {
	if (value) {
		var ii = this.files.length;
		while (ii--) {
			// Compare by name and size (size might be 0 or undefined, but still equivalent for both)
			if (file.name === this.files[ii].name && file.size === this.files[ii].size) {
				this.trigger('Error', {
					code : plupload.FILE_DUPLICATE_ERROR,
					message : plupload.translate('Duplicate file error.'),
					file : file
				});
				cb(false);
				return;
			}
		}
	}
	cb(true);
});


/**
@class Uploader
@constructor

@param {Object} settings For detailed information about each option check documentation.
	@param {String|DOMElement} settings.browse_button id of the DOM element or DOM element itself to use as file dialog trigger.
	@param {Number|String} [settings.chunk_size=0] Chunk size in bytes to slice the file into. Shorcuts with b, kb, mb, gb, tb suffixes also supported. `e.g. 204800 or "204800b" or "200kb"`. By default - disabled.
	@param {String|DOMElement} [settings.container] id of the DOM element or DOM element itself that will be used to wrap uploader structures. Defaults to immediate parent of the `browse_button` element.
	@param {String|DOMElement} [settings.drop_element] id of the DOM element or DOM element itself to use as a drop zone for Drag-n-Drop.
	@param {String} [settings.file_data_name="file"] Name for the file field in Multipart formated message.
	@param {Object} [settings.filters={}] Set of file type filters.
		@param {String|Number} [settings.filters.max_file_size=0] Maximum file size that the user can pick, in bytes. Optionally supports b, kb, mb, gb, tb suffixes. `e.g. "10mb" or "1gb"`. By default - not set. Dispatches `plupload.FILE_SIZE_ERROR`.
		@param {Array} [settings.filters.mime_types=[]] List of file types to accept, each one defined by title and list of extensions. `e.g. {title : "Image files", extensions : "jpg,jpeg,gif,png"}`. Dispatches `plupload.FILE_EXTENSION_ERROR`
		@param {Boolean} [settings.filters.prevent_duplicates=false] Do not let duplicates into the queue. Dispatches `plupload.FILE_DUPLICATE_ERROR`.
	@param {String} [settings.flash_swf_url] URL of the Flash swf.
	@param {Object} [settings.headers] Custom headers to send with the upload. Hash of name/value pairs.
	@param {String} [settings.http_method="POST"] HTTP method to use during upload (only PUT or POST allowed).
	@param {Number} [settings.max_retries=0] How many times to retry the chunk or file, before triggering Error event.
	@param {Boolean} [settings.multipart=true] Whether to send file and additional parameters as Multipart formated message.
	@param {Object} [settings.multipart_params] Hash of key/value pairs to send with every file upload.
	@param {Boolean} [settings.multi_selection=true] Enable ability to select multiple files at once in file dialog.
	@param {String|Object} [settings.required_features] Either comma-separated list or hash of required features that chosen runtime should absolutely possess.
	@param {Object} [settings.resize] Enable resizng of images on client-side. Applies to `image/jpeg` and `image/png` only. `e.g. {width : 200, height : 200, quality : 90, crop: true}`
		@param {Number} [settings.resize.width] If image is bigger, it will be resized.
		@param {Number} [settings.resize.height] If image is bigger, it will be resized.
		@param {Number} [settings.resize.quality=90] Compression quality for jpegs (1-100).
		@param {Boolean} [settings.resize.crop=false] Whether to crop images to exact dimensions. By default they will be resized proportionally.
	@param {String} [settings.runtimes="html5,flash,silverlight,html4"] Comma separated list of runtimes, that Plupload will try in turn, moving to the next if previous fails.
	@param {String} [settings.silverlight_xap_url] URL of the Silverlight xap.
	@param {Boolean} [settings.send_chunk_number=true] Whether to send chunks and chunk numbers, or total and offset bytes.
	@param {Boolean} [settings.send_file_name=true] Whether to send file name as additional argument - 'name' (required for chunked uploads and some other cases where file name cannot be sent via normal ways).
	@param {String} settings.url URL of the server-side upload handler.
	@param {Boolean} [settings.unique_names=false] If true will generate unique filenames for uploaded files.

*/
plupload.Uploader = function(options) {
	/**
	Fires when the current RunTime has been initialized.

	@event Init
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	 */

	/**
	Fires after the init event incase you need to perform actions there.

	@event PostInit
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	 */

	/**
	Fires when the option is changed in via uploader.setOption().

	@event OptionChanged
	@since 2.1
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {String} name Name of the option that was changed
	@param {Mixed} value New value for the specified option
	@param {Mixed} oldValue Previous value of the option
	 */

	/**
	Fires when the silverlight/flash or other shim needs to move.

	@event Refresh
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	 */

	/**
	Fires when the overall state is being changed for the upload queue.

	@event StateChanged
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	 */

	/**
	Fires when browse_button is clicked and browse dialog shows.

	@event Browse
	@since 2.1.2
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	 */

	/**
	Fires for every filtered file before it is added to the queue.

	@event FileFiltered
	@since 2.1
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {plupload.File} file Another file that has to be added to the queue.
	 */

	/**
	Fires when the file queue is changed. In other words when files are added/removed to the files array of the uploader instance.

	@event QueueChanged
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	 */

	/**
	Fires after files were filtered and added to the queue.

	@event FilesAdded
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {Array} files Array of file objects that were added to queue by the user.
	 */

	/**
	Fires when file is removed from the queue.

	@event FilesRemoved
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {Array} files Array of files that got removed.
	 */

	/**
	Fires just before a file is uploaded. Can be used to cancel the upload for the specified file
	by returning false from the handler.

	@event BeforeUpload
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {plupload.File} file File to be uploaded.
	 */

	/**
	Fires when a file is to be uploaded by the runtime.

	@event UploadFile
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {plupload.File} file File to be uploaded.
	 */

	/**
	Fires while a file is being uploaded. Use this event to update the current file upload progress.

	@event UploadProgress
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {plupload.File} file File that is currently being uploaded.
	 */

	/**
	* Fires just before a chunk is uploaded. This event enables you to override settings
	* on the uploader instance before the chunk is uploaded.
	*
	* @event BeforeChunkUpload
	* @param {plupload.Uploader} uploader Uploader instance sending the event.
	* @param {plupload.File} file File to be uploaded.
	* @param {Object} POST params to be sent.
	* @param {Blob} current Blob.
	* @param {offset} current Slice offset.
	*/

	/**
	Fires when file chunk is uploaded.

	@event ChunkUploaded
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {plupload.File} file File that the chunk was uploaded for.
	@param {Object} result Object with response properties.
		@param {Number} result.offset The amount of bytes the server has received so far, including this chunk.
		@param {Number} result.total The size of the file.
		@param {String} result.response The response body sent by the server.
		@param {Number} result.status The HTTP status code sent by the server.
		@param {String} result.responseHeaders All the response headers as a single string.
	 */

	/**
	Fires when a file is successfully uploaded.

	@event FileUploaded
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {plupload.File} file File that was uploaded.
	@param {Object} result Object with response properties.
		@param {String} result.response The response body sent by the server.
		@param {Number} result.status The HTTP status code sent by the server.
		@param {String} result.responseHeaders All the response headers as a single string.
	 */

	/**
	Fires when all files in a queue are uploaded.

	@event UploadComplete
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {Array} files Array of file objects that was added to queue/selected by the user.
	 */

	/**
	Fires when a error occurs.

	@event Error
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	@param {Object} error Contains code, message and sometimes file and other details.
		@param {Number} error.code The plupload error code.
		@param {String} error.message Description of the error (uses i18n).
	 */

	/**
	Fires when destroy method is called.

	@event Destroy
	@param {plupload.Uploader} uploader Uploader instance sending the event.
	 */
	var uid = plupload.guid()
	, settings
	, files = []
	, preferred_caps = {}
	, fileInputs = []
	, fileDrops = []
	, startTime
	, total
	, disabled = false
	, xhr
	;


	// Private methods
	function uploadNext() {
		var file, count = 0, i;

		if (this.state == plupload.STARTED) {
			// Find first QUEUED file
			for (i = 0; i < files.length; i++) {
				if (!file && files[i].status == plupload.QUEUED) {
					file = files[i];
					if (this.trigger("BeforeUpload", file)) {
						file.status = plupload.UPLOADING;
						this.trigger("UploadFile", file);
					}
				} else {
					count++;
				}
			}

			// All files are DONE or FAILED
			if (count == files.length) {
				if (this.state !== plupload.STOPPED) {
					this.state = plupload.STOPPED;
					this.trigger("StateChanged");
				}
				this.trigger("UploadComplete", files);
			}
		}
	}


	function calcFile(file) {
		file.percent = file.size > 0 ? Math.ceil(file.loaded / file.size * 100) : 100;
		calc();
	}


	function calc() {
		var i, file;
		var loaded;
		var loadedDuringCurrentSession = 0;

		// Reset stats
		total.reset();

		// Check status, size, loaded etc on all files
		for (i = 0; i < files.length; i++) {
			file = files[i];

			if (file.size !== undef) {
				// We calculate totals based on original file size
				total.size += file.origSize;

				// Since we cannot predict file size after resize, we do opposite and
				// interpolate loaded amount to match magnitude of total
				loaded = file.loaded * file.origSize / file.size;

				if (!file.completeTimestamp || file.completeTimestamp > startTime) {
					loadedDuringCurrentSession += loaded;
				}

				total.loaded += loaded;
			} else {
				total.size = undef;
			}

			if (file.status == plupload.DONE) {
				total.uploaded++;
			} else if (file.status == plupload.FAILED) {
				total.failed++;
			} else {
				total.queued++;
			}
		}

		// If we couldn't calculate a total file size then use the number of files to calc percent
		if (total.size === undef) {
			total.percent = files.length > 0 ? Math.ceil(total.uploaded / files.length * 100) : 0;
		} else {
			total.bytesPerSec = Math.ceil(loadedDuringCurrentSession / ((+new Date() - startTime || 1) / 1000.0));
			total.percent = total.size > 0 ? Math.ceil(total.loaded / total.size * 100) : 0;
		}
	}


	function getRUID() {
		var ctrl = fileInputs[0] || fileDrops[0];
		if (ctrl) {
			return ctrl.getRuntime().uid;
		}
		return false;
	}


	function runtimeCan(file, cap) {
		if (file.ruid) {
			var info = Runtime.getInfo(file.ruid);
			if (info) {
				return info.can(cap);
			}
		}
		return false;
	}


	function bindEventListeners() {
		this.bind('FilesAdded FilesRemoved', function(up) {
			up.trigger('QueueChanged');
			up.refresh();
		});

		this.bind('CancelUpload', onCancelUpload);

		this.bind('BeforeUpload', onBeforeUpload);

		this.bind('UploadFile', onUploadFile);

		this.bind('UploadProgress', onUploadProgress);

		this.bind('StateChanged', onStateChanged);

		this.bind('QueueChanged', calc);

		this.bind('Error', onError);

		this.bind('FileUploaded', onFileUploaded);

		this.bind('Destroy', onDestroy);
	}


	function initControls(settings, cb) {
		var self = this, inited = 0, queue = [];

		// common settings
		var options = {
			runtime_order: settings.runtimes,
			required_caps: settings.required_features,
			preferred_caps: preferred_caps,
			swf_url: settings.flash_swf_url,
			xap_url: settings.silverlight_xap_url
		};

		// add runtime specific options if any
		plupload.each(settings.runtimes.split(/\s*,\s*/), function(runtime) {
			if (settings[runtime]) {
				options[runtime] = settings[runtime];
			}
		});

		// initialize file pickers - there can be many
		if (settings.browse_button) {
			plupload.each(settings.browse_button, function(el) {
				queue.push(function(cb) {
					var fileInput = new o.file.FileInput(plupload.extend({}, options, {
						accept: settings.filters.mime_types,
						name: settings.file_data_name,
						multiple: settings.multi_selection,
						container: settings.container,
						browse_button: el
					}));

					fileInput.onready = function() {
						var info = Runtime.getInfo(this.ruid);

						// for backward compatibility
						plupload.extend(self.features, {
							chunks: info.can('slice_blob'),
							multipart: info.can('send_multipart'),
							multi_selection: info.can('select_multiple')
						});

						inited++;
						fileInputs.push(this);
						cb();
					};

					fileInput.onchange = function() {
						self.addFile(this.files);
					};

					fileInput.bind('mouseenter mouseleave mousedown mouseup', function(e) {
						if (!disabled) {
							if (settings.browse_button_hover) {
								if ('mouseenter' === e.type) {
									plupload.addClass(el, settings.browse_button_hover);
								} else if ('mouseleave' === e.type) {
									plupload.removeClass(el, settings.browse_button_hover);
								}
							}

							if (settings.browse_button_active) {
								if ('mousedown' === e.type) {
									plupload.addClass(el, settings.browse_button_active);
								} else if ('mouseup' === e.type) {
									plupload.removeClass(el, settings.browse_button_active);
								}
							}
						}
					});

					fileInput.bind('mousedown', function() {
						self.trigger('Browse');
					});

					fileInput.bind('error runtimeerror', function() {
						fileInput = null;
						cb();
					});

					fileInput.init();
				});
			});
		}

		// initialize drop zones
		if (settings.drop_element) {
			plupload.each(settings.drop_element, function(el) {
				queue.push(function(cb) {
					var fileDrop = new o.file.FileDrop(plupload.extend({}, options, {
						drop_zone: el
					}));

					fileDrop.onready = function() {
						var info = Runtime.getInfo(this.ruid);

						// for backward compatibility
						plupload.extend(self.features, {
							chunks: info.can('slice_blob'),
							multipart: info.can('send_multipart'),
							dragdrop: info.can('drag_and_drop')
						});

						inited++;
						fileDrops.push(this);
						cb();
					};

					fileDrop.ondrop = function() {
						self.addFile(this.files);
					};

					fileDrop.bind('error runtimeerror', function() {
						fileDrop = null;
						cb();
					});

					fileDrop.init();
				});
			});
		}


		plupload.inSeries(queue, function() {
			if (typeof(cb) === 'function') {
				cb(inited);
			}
		});
	}


	function resizeImage(blob, params, cb) {
		var img = new o.image.Image();

		try {
			img.onload = function() {
				// no manipulation required if...
				if (params.width > this.width &&
					params.height > this.height &&
					params.quality === undef &&
					params.preserve_headers &&
					!params.crop
				) {
					this.destroy();
					return cb(blob);
				}
				// otherwise downsize
				img.downsize(params.width, params.height, params.crop, params.preserve_headers);
			};

			img.onresize = function() {
				cb(this.getAsBlob(blob.type, params.quality));
				this.destroy();
			};

			img.onerror = function() {
				cb(blob);
			};

			img.load(blob);
		} catch(ex) {
			cb(blob);
		}
	}


	function setOption(option, value, init) {
		var self = this, reinitRequired = false;

		function _setOption(option, value, init) {
			var oldValue = settings[option];

			switch (option) {
				case 'max_file_size':
					if (option === 'max_file_size') {
						settings.max_file_size = settings.filters.max_file_size = value;
					}
					break;

				case 'chunk_size':
					if (value = plupload.parseSize(value)) {
						settings[option] = value;
						settings.send_file_name = true;
					}
					break;

				case 'multipart':
					settings[option] = value;
					if (!value) {
						settings.send_file_name = true;
					}
					break;

				case 'http_method':
					settings[option] = value.toUpperCase() === 'PUT' ? 'PUT' : 'POST';
					break;

				case 'unique_names':
					settings[option] = value;
					if (value) {
						settings.send_file_name = true;
					}
					break;

				case 'filters':
					// for sake of backward compatibility
					if (plupload.typeOf(value) === 'array') {
						value = {
							mime_types: value
						};
					}

					if (init) {
						plupload.extend(settings.filters, value);
					} else {
						settings.filters = value;
					}

					// if file format filters are being updated, regenerate the matching expressions
					if (value.mime_types) {
						if (plupload.typeOf(value.mime_types) === 'string') {
							value.mime_types = o.core.utils.Mime.mimes2extList(value.mime_types);
						}

						value.mime_types.regexp = (function(filters) {
							var extensionsRegExp = [];

							plupload.each(filters, function(filter) {
								plupload.each(filter.extensions.split(/,/), function(ext) {
									if (/^\s*\*\s*$/.test(ext)) {
										extensionsRegExp.push('\\.*');
									} else {
										extensionsRegExp.push('\\.' + ext.replace(new RegExp('[' + ('/^$.*+?|()[]{}\\'.replace(/./g, '\\$&')) + ']', 'g'), '\\$&'));
									}
								});
							});

							return new RegExp('(' + extensionsRegExp.join('|') + ')$', 'i');
						}(value.mime_types));

						settings.filters.mime_types = value.mime_types;
					}
					break;

				case 'resize':
					if (value) {
						settings.resize = plupload.extend({
							preserve_headers: true,
							crop: false
						}, value);
					} else {
						settings.resize = false;
					}
					break;

				case 'prevent_duplicates':
					settings.prevent_duplicates = settings.filters.prevent_duplicates = !!value;
					break;

				// options that require reinitialisation
				case 'container':
				case 'browse_button':
				case 'drop_element':
						value = 'container' === option
							? plupload.get(value)
							: plupload.getAll(value)
							;

				case 'runtimes':
				case 'multi_selection':
				case 'flash_swf_url':
				case 'silverlight_xap_url':
					settings[option] = value;
					if (!init) {
						reinitRequired = true;
					}
					break;

				default:
					settings[option] = value;
			}

			if (!init) {
				self.trigger('OptionChanged', option, value, oldValue);
			}
		}

		if (typeof(option) === 'object') {
			plupload.each(option, function(value, option) {
				_setOption(option, value, init);
			});
		} else {
			_setOption(option, value, init);
		}

		if (init) {
			// Normalize the list of required capabilities
			settings.required_features = normalizeCaps(plupload.extend({}, settings));

			// Come up with the list of capabilities that can affect default mode in a multi-mode runtimes
			preferred_caps = normalizeCaps(plupload.extend({}, settings, {
				required_features: true
			}));
		} else if (reinitRequired) {
			self.trigger('Destroy');

			initControls.call(self, settings, function(inited) {
				if (inited) {
					self.runtime = Runtime.getInfo(getRUID()).type;
					self.trigger('Init', { runtime: self.runtime });
					self.trigger('PostInit');
				} else {
					self.trigger('Error', {
						code : plupload.INIT_ERROR,
						message : plupload.translate('Init error.')
					});
				}
			});
		}
	}


	// Internal event handlers
	function onBeforeUpload(up, file) {
		// Generate unique target filenames
		if (up.settings.unique_names) {
			var matches = file.name.match(/\.([^.]+)$/), ext = "part";
			if (matches) {
				ext = matches[1];
			}
			file.target_name = file.id + '.' + ext;
		}
	}


	function onUploadFile(up, file) {
		var url = up.settings.url
		, chunkSize = up.settings.chunk_size
		, retries = up.settings.max_retries
		, features = up.features
		, offset = 0
		, blob
		;

		// make sure we start at a predictable offset
		if (file.loaded) {
			offset = file.loaded = chunkSize ? chunkSize * Math.floor(file.loaded / chunkSize) : 0;
		}

		function handleError() {
			if (retries-- > 0) {
				delay(uploadNextChunk, 1000);
			} else {
				file.loaded = offset; // reset all progress

				up.trigger('Error', {
					code : plupload.HTTP_ERROR,
					message : plupload.translate('HTTP Error.'),
					file : file,
					response : xhr.responseText,
					status : xhr.status,
					responseHeaders: xhr.getAllResponseHeaders()
				});
			}
		}

		function uploadNextChunk() {
			var chunkBlob, args = {}, curChunkSize;

			// make sure that file wasn't cancelled and upload is not stopped in general
			if (file.status !== plupload.UPLOADING || up.state === plupload.STOPPED) {
				return;
			}

			// send additional 'name' parameter only if required
			if (up.settings.send_file_name) {
				args.name = file.target_name || file.name;
			}

			if (chunkSize && features.chunks && blob.size > chunkSize) { // blob will be of type string if it was loaded in memory
				curChunkSize = Math.min(chunkSize, blob.size - offset);
				chunkBlob = blob.slice(offset, offset + curChunkSize);
			} else {
				curChunkSize = blob.size;
				chunkBlob = blob;
			}

			// If chunking is enabled add corresponding args, no matter if file is bigger than chunk or smaller
			if (chunkSize && features.chunks) {
				// Setup query string arguments
				if (up.settings.send_chunk_number) {
					args.chunk = Math.ceil(offset / chunkSize);
					args.chunks = Math.ceil(blob.size / chunkSize);
				} else { // keep support for experimental chunk format, just in case
					args.offset = offset;
					args.total = blob.size;
				}
			}

			if (up.trigger('BeforeChunkUpload', file, args, chunkBlob, offset)) {
				up.trigger('UploadChunk', args, chunkBlob, curChunkSize);
			}
		}

		function onUploadChunk(up, args, chunkBlob, curChunkSize) {
			var formData;

			xhr = new o.xhr.XMLHttpRequest();

			// Do we have upload progress support
			if (xhr.upload) {
				xhr.upload.onprogress = function(e) {
					file.loaded = Math.min(file.size, offset + e.loaded);
					up.trigger('UploadProgress', file);
				};
			}

			xhr.onload = function() {
				// check if upload made itself through
				if (xhr.status >= 400) {
					handleError();
					return;
				}

				retries = up.settings.max_retries; // reset the counter

				// Handle chunk response
				if (curChunkSize < blob.size) {
					chunkBlob.destroy();

					offset += curChunkSize;
					file.loaded = Math.min(offset, blob.size);

					up.trigger('ChunkUploaded', file, {
						offset : file.loaded,
						total : blob.size,
						response : xhr.responseText,
						status : xhr.status,
						responseHeaders: xhr.getAllResponseHeaders()
					});

					// stock Android browser doesn't fire upload progress events, but in chunking mode we can fake them
					if (plupload.ua.browser === 'Android Browser') {
						// doesn't harm in general, but is not required anywhere else
						up.trigger('UploadProgress', file);
					}
				} else {
					file.loaded = file.size;
				}

				chunkBlob = formData = null; // Free memory

				// Check if file is uploaded
				if (!offset || offset >= blob.size) {
					// If file was modified, destory the copy
					if (file.size != file.origSize) {
						blob.destroy();
						blob = null;
					}

					up.trigger('UploadProgress', file);

					file.status = plupload.DONE;
					file.completeTimestamp = +new Date();

					up.trigger('FileUploaded', file, {
						response : xhr.responseText,
						status : xhr.status,
						responseHeaders: xhr.getAllResponseHeaders()
					});
				} else {
					// Still chunks left
					delay(uploadNextChunk, 1); // run detached, otherwise event handlers interfere
				}
			};

			xhr.onerror = function() {
				handleError();
			};

			xhr.onloadend = function() {
				this.destroy();
				xhr = null;
			};

			// Build multipart request
			if (up.settings.multipart && features.multipart) {
				xhr.open(up.settings.http_method, url, true);

				// Set custom headers
				plupload.each(up.settings.headers, function(value, name) {
					xhr.setRequestHeader(name, value);
				});

				formData = new o.xhr.FormData();

				// Add multipart params
				plupload.each(plupload.extend(args, up.settings.multipart_params), function(value, name) {
					formData.append(name, value);
				});

				// Add file and send it
				formData.append(up.settings.file_data_name, chunkBlob);
				xhr.send(formData, {
					runtime_order: up.settings.runtimes,
					required_caps: up.settings.required_features,
					preferred_caps: preferred_caps,
					swf_url: up.settings.flash_swf_url,
					xap_url: up.settings.silverlight_xap_url
				});
			} else {
				// if no multipart, send as binary stream
				url = plupload.buildUrl(up.settings.url, plupload.extend(args, up.settings.multipart_params));

				xhr.open(up.settings.http_method, url, true);

				// Set custom headers
				plupload.each(up.settings.headers, function(value, name) {
					xhr.setRequestHeader(name, value);
				});

				// do not set Content-Type, if it was defined previously (see #1203)
				if (!xhr.hasRequestHeader('Content-Type')) {
					xhr.setRequestHeader('Content-Type', 'application/octet-stream'); // Binary stream header
				}

				xhr.send(chunkBlob, {
					runtime_order: up.settings.runtimes,
					required_caps: up.settings.required_features,
					preferred_caps: preferred_caps,
					swf_url: up.settings.flash_swf_url,
					xap_url: up.settings.silverlight_xap_url
				});
			}
		}

		up.unbind('UploadChunk', onUploadChunk); // make sure that we bind only once per file
		up.bind('UploadChunk', onUploadChunk);

		blob = file.getSource();

		// Start uploading chunks
		if (!plupload.isEmptyObj(up.settings.resize) && runtimeCan(blob, 'send_binary_string') && plupload.inArray(blob.type, ['image/jpeg', 'image/png']) !== -1) {
			// Resize if required
			resizeImage.call(this, blob, up.settings.resize, function(resizedBlob) {
				blob = resizedBlob;
				file.size = resizedBlob.size;
				uploadNextChunk();
			});
		} else {
			uploadNextChunk();
		}
	}


	function onUploadProgress(up, file) {
		calcFile(file);
	}


	function onStateChanged(up) {
		if (up.state == plupload.STARTED) {
			// Get start time to calculate bps
			startTime = (+new Date());
		} else if (up.state == plupload.STOPPED) {
			// Reset currently uploading files
			for (var i = up.files.length - 1; i >= 0; i--) {
				if (up.files[i].status == plupload.UPLOADING) {
					up.files[i].status = plupload.QUEUED;
					calc();
				}
			}
		}
	}


	function onCancelUpload() {
		if (xhr) {
			xhr.abort();
		}
	}


	function onFileUploaded(up) {
		calc();

		// Upload next file but detach it from the error event
		// since other custom listeners might want to stop the queue
		delay(function() {
			uploadNext.call(up);
		}, 1);
	}


	function onError(up, err) {
		if (err.code === plupload.INIT_ERROR) {
			up.destroy();
		}
		// Set failed status if an error occured on a file
		else if (err.code === plupload.HTTP_ERROR) {
			err.file.status = plupload.FAILED;
			err.file.completeTimestamp = +new Date();
			calcFile(err.file);

			// Upload next file but detach it from the error event
			// since other custom listeners might want to stop the queue
			if (up.state == plupload.STARTED) { // upload in progress
				up.trigger('CancelUpload');
				delay(function() {
					uploadNext.call(up);
				}, 1);
			}
		}
	}


	function onDestroy(up) {
		up.stop();

		// Purge the queue
		plupload.each(files, function(file) {
			file.destroy();
		});
		files = [];

		if (fileInputs.length) {
			plupload.each(fileInputs, function(fileInput) {
				fileInput.destroy();
			});
			fileInputs = [];
		}

		if (fileDrops.length) {
			plupload.each(fileDrops, function(fileDrop) {
				fileDrop.destroy();
			});
			fileDrops = [];
		}

		preferred_caps = {};
		disabled = false;
		startTime = xhr = null;
		total.reset();
	}


	// Default settings
	settings = {
		chunk_size: 0,
		file_data_name: 'file',
		filters: {
			mime_types: [],
			prevent_duplicates: false,
			max_file_size: 0
		},
		flash_swf_url: 'js/Moxie.swf',
		http_method: 'POST',
		max_retries: 0,
		multipart: true,
		multi_selection: true,
		resize: false,
		runtimes: Runtime.order,
		send_file_name: true,
		send_chunk_number: true,
		silverlight_xap_url: 'js/Moxie.xap'
	};


	setOption.call(this, options, null, true);

	// Inital total state
	total = new plupload.QueueProgress();

	// Add public methods
	plupload.extend(this, {

		/**
		 * Unique id for the Uploader instance.
		 *
		 * @property id
		 * @type String
		 */
		id : uid,
		uid : uid, // mOxie uses this to differentiate between event targets

		/**
		 * Current state of the total uploading progress. This one can either be plupload.STARTED or plupload.STOPPED.
		 * These states are controlled by the stop/start methods. The default value is STOPPED.
		 *
		 * @property state
		 * @type Number
		 */
		state : plupload.STOPPED,

		/**
		 * Map of features that are available for the uploader runtime. Features will be filled
		 * before the init event is called, these features can then be used to alter the UI for the end user.
		 * Some of the current features that might be in this map is: dragdrop, chunks, jpgresize, pngresize.
		 *
		 * @property features
		 * @type Object
		 */
		features : {},

		/**
		 * Current runtime name.
		 *
		 * @property runtime
		 * @type String
		 */
		runtime : null,

		/**
		 * Current upload queue, an array of File instances.
		 *
		 * @property files
		 * @type Array
		 * @see plupload.File
		 */
		files : files,

		/**
		 * Object with name/value settings.
		 *
		 * @property settings
		 * @type Object
		 */
		settings : settings,

		/**
		 * Total progess information. How many files has been uploaded, total percent etc.
		 *
		 * @property total
		 * @type plupload.QueueProgress
		 */
		total : total,


		/**
		 * Initializes the Uploader instance and adds internal event listeners.
		 *
		 * @method init
		 */
		init : function() {
			var self = this, opt, preinitOpt, err;

			preinitOpt = self.getOption('preinit');
			if (typeof(preinitOpt) == "function") {
				preinitOpt(self);
			} else {
				plupload.each(preinitOpt, function(func, name) {
					self.bind(name, func);
				});
			}

			bindEventListeners.call(self);

			// Check for required options
			plupload.each(['container', 'browse_button', 'drop_element'], function(el) {
				if (self.getOption(el) === null) {
					err = {
						code : plupload.INIT_ERROR,
						message : plupload.sprintf(plupload.translate("%s specified, but cannot be found."), el)
					}
					return false;
				}
			});

			if (err) {
				return self.trigger('Error', err);
			}


			if (!settings.browse_button && !settings.drop_element) {
				return self.trigger('Error', {
					code : plupload.INIT_ERROR,
					message : plupload.translate("You must specify either browse_button or drop_element.")
				});
			}


			initControls.call(self, settings, function(inited) {
				var initOpt = self.getOption('init');
				if (typeof(initOpt) == "function") {
					initOpt(self);
				} else {
					plupload.each(initOpt, function(func, name) {
						self.bind(name, func);
					});
				}

				if (inited) {
					self.runtime = Runtime.getInfo(getRUID()).type;
					self.trigger('Init', { runtime: self.runtime });
					self.trigger('PostInit');
				} else {
					self.trigger('Error', {
						code : plupload.INIT_ERROR,
						message : plupload.translate('Init error.')
					});
				}
			});
		},

		/**
		 * Set the value for the specified option(s).
		 *
		 * @method setOption
		 * @since 2.1
		 * @param {String|Object} option Name of the option to change or the set of key/value pairs
		 * @param {Mixed} [value] Value for the option (is ignored, if first argument is object)
		 */
		setOption: function(option, value) {
			setOption.call(this, option, value, !this.runtime); // until runtime not set we do not need to reinitialize
		},

		/**
		 * Get the value for the specified option or the whole configuration, if not specified.
		 *
		 * @method getOption
		 * @since 2.1
		 * @param {String} [option] Name of the option to get
		 * @return {Mixed} Value for the option or the whole set
		 */
		getOption: function(option) {
			if (!option) {
				return settings;
			}
			return settings[option];
		},

		/**
		 * Refreshes the upload instance by dispatching out a refresh event to all runtimes.
		 * This would for example reposition flash/silverlight shims on the page.
		 *
		 * @method refresh
		 */
		refresh : function() {
			if (fileInputs.length) {
				plupload.each(fileInputs, function(fileInput) {
					fileInput.trigger('Refresh');
				});
			}
			this.trigger('Refresh');
		},

		/**
		 * Starts uploading the queued files.
		 *
		 * @method start
		 */
		start : function() {
			if (this.state != plupload.STARTED) {
				this.state = plupload.STARTED;
				this.trigger('StateChanged');

				uploadNext.call(this);
			}
		},

		/**
		 * Stops the upload of the queued files.
		 *
		 * @method stop
		 */
		stop : function() {
			if (this.state != plupload.STOPPED) {
				this.state = plupload.STOPPED;
				this.trigger('StateChanged');
				this.trigger('CancelUpload');
			}
		},


		/**
		 * Disables/enables browse button on request.
		 *
		 * @method disableBrowse
		 * @param {Boolean} disable Whether to disable or enable (default: true)
		 */
		disableBrowse : function() {
			disabled = arguments[0] !== undef ? arguments[0] : true;

			if (fileInputs.length) {
				plupload.each(fileInputs, function(fileInput) {
					fileInput.disable(disabled);
				});
			}

			this.trigger('DisableBrowse', disabled);
		},

		/**
		 * Returns the specified file object by id.
		 *
		 * @method getFile
		 * @param {String} id File id to look for.
		 * @return {plupload.File} File object or undefined if it wasn't found;
		 */
		getFile : function(id) {
			var i;
			for (i = files.length - 1; i >= 0; i--) {
				if (files[i].id === id) {
					return files[i];
				}
			}
		},

		/**
		 * Adds file to the queue programmatically. Can be native file, instance of Plupload.File,
		 * instance of mOxie.File, input[type="file"] element, or array of these. Fires FilesAdded,
		 * if any files were added to the queue. Otherwise nothing happens.
		 *
		 * @method addFile
		 * @since 2.0
		 * @param {plupload.File|mOxie.File|File|Node|Array} file File or files to add to the queue.
		 * @param {String} [fileName] If specified, will be used as a name for the file
		 */
		addFile : function(file, fileName) {
			var self = this
			, queue = []
			, filesAdded = []
			, ruid
			;

			function filterFile(file, cb) {
				var queue = [];
				plupload.each(self.settings.filters, function(rule, name) {
					if (fileFilters[name]) {
						queue.push(function(cb) {
							fileFilters[name].call(self, rule, file, function(res) {
								cb(!res);
							});
						});
					}
				});
				plupload.inSeries(queue, cb);
			}

			/**
			 * @method resolveFile
			 * @private
			 * @param {moxie.file.File|moxie.file.Blob|plupload.File|File|Blob|input[type="file"]} file
			 */
			function resolveFile(file) {
				var type = plupload.typeOf(file);

				// moxie.file.File
				if (file instanceof o.file.File) {
					if (!file.ruid && !file.isDetached()) {
						if (!ruid) { // weird case
							return false;
						}
						file.ruid = ruid;
						file.connectRuntime(ruid);
					}
					resolveFile(new plupload.File(file));
				}
				// moxie.file.Blob
				else if (file instanceof o.file.Blob) {
					resolveFile(file.getSource());
					file.destroy();
				}
				// plupload.File - final step for other branches
				else if (file instanceof plupload.File) {
					if (fileName) {
						file.name = fileName;
					}

					queue.push(function(cb) {
						// run through the internal and user-defined filters, if any
						filterFile(file, function(err) {
							if (!err) {
								// make files available for the filters by updating the main queue directly
								files.push(file);
								// collect the files that will be passed to FilesAdded event
								filesAdded.push(file);

								self.trigger("FileFiltered", file);
							}
							delay(cb, 1); // do not build up recursions or eventually we might hit the limits
						});
					});
				}
				// native File or blob
				else if (plupload.inArray(type, ['file', 'blob']) !== -1) {
					resolveFile(new o.file.File(null, file));
				}
				// input[type="file"]
				else if (type === 'node' && plupload.typeOf(file.files) === 'filelist') {
					// if we are dealing with input[type="file"]
					plupload.each(file.files, resolveFile);
				}
				// mixed array of any supported types (see above)
				else if (type === 'array') {
					fileName = null; // should never happen, but unset anyway to avoid funny situations
					plupload.each(file, resolveFile);
				}
			}

			ruid = getRUID();

			resolveFile(file);

			if (queue.length) {
				plupload.inSeries(queue, function() {
					// if any files left after filtration, trigger FilesAdded
					if (filesAdded.length) {
						self.trigger("FilesAdded", filesAdded);
					}
				});
			}
		},

		/**
		 * Removes a specific file.
		 *
		 * @method removeFile
		 * @param {plupload.File|String} file File to remove from queue.
		 */
		removeFile : function(file) {
			var id = typeof(file) === 'string' ? file : file.id;

			for (var i = files.length - 1; i >= 0; i--) {
				if (files[i].id === id) {
					return this.splice(i, 1)[0];
				}
			}
		},

		/**
		 * Removes part of the queue and returns the files removed. This will also trigger the FilesRemoved and QueueChanged events.
		 *
		 * @method splice
		 * @param {Number} start (Optional) Start index to remove from.
		 * @param {Number} length (Optional) Lengh of items to remove.
		 * @return {Array} Array of files that was removed.
		 */
		splice : function(start, length) {
			// Splice and trigger events
			var removed = files.splice(start === undef ? 0 : start, length === undef ? files.length : length);

			// if upload is in progress we need to stop it and restart after files are removed
			var restartRequired = false;
			if (this.state == plupload.STARTED) { // upload in progress
				plupload.each(removed, function(file) {
					if (file.status === plupload.UPLOADING) {
						restartRequired = true; // do not restart, unless file that is being removed is uploading
						return false;
					}
				});

				if (restartRequired) {
					this.stop();
				}
			}

			this.trigger("FilesRemoved", removed);

			// Dispose any resources allocated by those files
			plupload.each(removed, function(file) {
				file.destroy();
			});

			if (restartRequired) {
				this.start();
			}

			return removed;
		},

		/**
		Dispatches the specified event name and its arguments to all listeners.

		@method trigger
		@param {String} name Event name to fire.
		@param {Object..} Multiple arguments to pass along to the listener functions.
		*/

		// override the parent method to match Plupload-like event logic
		dispatchEvent: function(type) {
			var list, args, result;

			type = type.toLowerCase();

			list = this.hasEventListener(type);

			if (list) {
				// sort event list by priority
				list.sort(function(a, b) { return b.priority - a.priority; });

				// first argument should be current plupload.Uploader instance
				args = [].slice.call(arguments);
				args.shift();
				args.unshift(this);

				for (var i = 0; i < list.length; i++) {
					// Fire event, break chain if false is returned
					if (list[i].fn.apply(list[i].scope, args) === false) {
						return false;
					}
				}
			}
			return true;
		},

		/**
		Check whether uploader has any listeners to the specified event.

		@method hasEventListener
		@param {String} name Event name to check for.
		*/


		/**
		Adds an event listener by name.

		@method bind
		@param {String} name Event name to listen for.
		@param {function} fn Function to call ones the event gets fired.
		@param {Object} [scope] Optional scope to execute the specified function in.
		@param {Number} [priority=0] Priority of the event handler - handlers with higher priorities will be called first
		*/
		bind: function(name, fn, scope, priority) {
			// adapt moxie EventTarget style to Plupload-like
			plupload.Uploader.prototype.bind.call(this, name, fn, priority, scope);
		},

		/**
		Removes the specified event listener.

		@method unbind
		@param {String} name Name of event to remove.
		@param {function} fn Function to remove from listener.
		*/

		/**
		Removes all event listeners.

		@method unbindAll
		*/


		/**
		 * Destroys Plupload instance and cleans after itself.
		 *
		 * @method destroy
		 */
		destroy : function() {
			this.trigger('Destroy');
			settings = total = null; // purge these exclusively
			this.unbindAll();
		}
	});
};

plupload.Uploader.prototype = o.core.EventTarget.instance;

/**
 * Constructs a new file instance.
 *
 * @class File
 * @constructor
 *
 * @param {Object} file Object containing file properties
 * @param {String} file.name Name of the file.
 * @param {Number} file.size File size.
 */
plupload.File = (function() {
	var filepool = {};

	function PluploadFile(file) {

		plupload.extend(this, {

			/**
			 * File id this is a globally unique id for the specific file.
			 *
			 * @property id
			 * @type String
			 */
			id: plupload.guid(),

			/**
			 * File name for example "myfile.gif".
			 *
			 * @property name
			 * @type String
			 */
			name: file.name || file.fileName,

			/**
			 * File type, `e.g image/jpeg`
			 *
			 * @property type
			 * @type String
			 */
			type: file.type || '',

			/**
			 * File size in bytes (may change after client-side manupilation).
			 *
			 * @property size
			 * @type Number
			 */
			size: file.size || file.fileSize,

			/**
			 * Original file size in bytes.
			 *
			 * @property origSize
			 * @type Number
			 */
			origSize: file.size || file.fileSize,

			/**
			 * Number of bytes uploaded of the files total size.
			 *
			 * @property loaded
			 * @type Number
			 */
			loaded: 0,

			/**
			 * Number of percentage uploaded of the file.
			 *
			 * @property percent
			 * @type Number
			 */
			percent: 0,

			/**
			 * Status constant matching the plupload states QUEUED, UPLOADING, FAILED, DONE.
			 *
			 * @property status
			 * @type Number
			 * @see plupload
			 */
			status: plupload.QUEUED,

			/**
			 * Date of last modification.
			 *
			 * @property lastModifiedDate
			 * @type {String}
			 */
			lastModifiedDate: file.lastModifiedDate || (new Date()).toLocaleString(), // Thu Aug 23 2012 19:40:00 GMT+0400 (GET)


			/**
			 * Set when file becomes plupload.DONE or plupload.FAILED. Is used to calculate proper plupload.QueueProgress.bytesPerSec.
			 * @private
			 * @property completeTimestamp
			 * @type {Number}
			 */
			completeTimestamp: 0,

			/**
			 * Returns native window.File object, when it's available.
			 *
			 * @method getNative
			 * @return {window.File} or null, if plupload.File is of different origin
			 */
			getNative: function() {
				var file = this.getSource().getSource();
				return plupload.inArray(plupload.typeOf(file), ['blob', 'file']) !== -1 ? file : null;
			},

			/**
			 * Returns mOxie.File - unified wrapper object that can be used across runtimes.
			 *
			 * @method getSource
			 * @return {mOxie.File} or null
			 */
			getSource: function() {
				if (!filepool[this.id]) {
					return null;
				}
				return filepool[this.id];
			},

			/**
			 * Destroys plupload.File object.
			 *
			 * @method destroy
			 */
			destroy: function() {
				var src = this.getSource();
				if (src) {
					src.destroy();
					delete filepool[this.id];
				}
			}
		});

		filepool[this.id] = file;
	}

	return PluploadFile;
}());


/**
 * Constructs a queue progress.
 *
 * @class QueueProgress
 * @constructor
 */
 plupload.QueueProgress = function() {
	var self = this; // Setup alias for self to reduce code size when it's compressed

	/**
	 * Total queue file size.
	 *
	 * @property size
	 * @type Number
	 */
	self.size = 0;

	/**
	 * Total bytes uploaded.
	 *
	 * @property loaded
	 * @type Number
	 */
	self.loaded = 0;

	/**
	 * Number of files uploaded.
	 *
	 * @property uploaded
	 * @type Number
	 */
	self.uploaded = 0;

	/**
	 * Number of files failed to upload.
	 *
	 * @property failed
	 * @type Number
	 */
	self.failed = 0;

	/**
	 * Number of files yet to be uploaded.
	 *
	 * @property queued
	 * @type Number
	 */
	self.queued = 0;

	/**
	 * Total percent of the uploaded bytes.
	 *
	 * @property percent
	 * @type Number
	 */
	self.percent = 0;

	/**
	 * Bytes uploaded per second.
	 *
	 * @property bytesPerSec
	 * @type Number
	 */
	self.bytesPerSec = 0;

	/**
	 * Resets the progress to its initial values.
	 *
	 * @method reset
	 */
	self.reset = function() {
		self.size = self.loaded = self.uploaded = self.failed = self.queued = self.percent = self.bytesPerSec = 0;
	};
};

exports.plupload = plupload;

}(this, moxie));

}));

/***/ },

/***/ "./node_modules/.4.2.0@normalize.css/normalize.css":
/***/ function(module, exports) {

module.exports = "/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  line-height: 1.15; /* 2 */\n  -ms-text-size-adjust: 100%; /* 3 */\n  -webkit-text-size-adjust: 100%; /* 3 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n"

/***/ },

/***/ "./node_modules/.5.0.0-beta.12@rxjs/add/observable/fromPromise.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Observable.js");
var fromPromise_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/observable/fromPromise.js");
Observable_1.Observable.fromPromise = fromPromise_1.fromPromise;
//# sourceMappingURL=fromPromise.js.map

/***/ },

/***/ "./node_modules/.5.0.0-beta.12@rxjs/add/operator/toPromise.js":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var Observable_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Observable.js");
var toPromise_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/operator/toPromise.js");
Observable_1.Observable.prototype.toPromise = toPromise_1.toPromise;
//# sourceMappingURL=toPromise.js.map

/***/ },

/***/ "./src/app/app.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
__webpack_require__("./src/app/app.loader.ts");
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var global_state_1 = __webpack_require__("./src/app/global.state.ts");
var services_1 = __webpack_require__("./src/app/theme/services/index.ts");
var theme_constants_1 = __webpack_require__("./src/app/theme/theme.constants.ts");
var theme_config_1 = __webpack_require__("./src/app/theme/theme.config.ts");
var angular2_notifications_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/components.js");
var angular2_jwt_1 = __webpack_require__("./node_modules/.0.1.28@angular2-jwt/angular2-jwt.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var options_service_1 = __webpack_require__("./src/app/pages/options/options.service.ts");
/*
 * 顶级入口组件
 */
var App = (function () {
    function App(_state, _appState, _optionsService, _router, _config, _spinner, _imageLoader, viewContainerRef, _notificationsService) {
        var _this = this;
        this._state = _state;
        this._appState = _appState;
        this._optionsService = _optionsService;
        this._router = _router;
        this._config = _config;
        this._spinner = _spinner;
        this._imageLoader = _imageLoader;
        this.viewContainerRef = viewContainerRef;
        this._notificationsService = _notificationsService;
        this.isMenuCollapsed = false;
        this.optionIsInited = false;
        // 通知配置
        this.notificationsOptions = {
            position: ['top', 'right'],
            timeOut: 300,
            lastOnBottom: true,
            clickToClose: true,
            maxLength: 0,
            maxStack: 5,
            showProgressBar: true,
            pauseOnHover: true,
            preventDuplicates: false,
            preventLastDuplicates: false
        };
        this._loadImages();
        this._state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
        // 路由拦截器
        this._router.events.subscribe(function (event) {
            var url = _this._router.url;
            if (!Object.is(url, '/') && !Object.is(url, '/auth')) {
                _this.routeCheck();
            }
        });
    }
    // 初始化时拉取全局设置
    App.prototype.initAppOptions = function () {
        var _this = this;
        this.optionIsInited = true;
        this._optionsService.getUserAuth()
            .then(function (_a) {
            var adminInfo = _a.result;
            if (!!Object.keys(adminInfo).length) {
                _this._appState.set('adminInfo', adminInfo);
            }
        })
            .catch(function (error) { });
    };
    // 程序初始化，关闭加载状态
    App.prototype.ngAfterViewInit = function () {
        var _this = this;
        // hide spinner once all loaders are completed
        services_1.BaThemePreloader.load().then(function (values) {
            _this._spinner.hide();
        });
    };
    App.prototype._loadImages = function () {
        // register some loaders
        services_1.BaThemePreloader.registerLoader(this._imageLoader.load(theme_constants_1.layoutPaths.images.root + 'sky-bg.jpg'));
    };
    App.prototype.loggedIn = function () {
        return angular2_jwt_1.tokenNotExpired();
    };
    // 路由检查
    App.prototype.routeCheck = function () {
        var _this = this;
        if (!this.loggedIn()) {
            setTimeout(function () {
                _this._notificationsService.error('误闯禁地', '...', { timeOut: 1000 });
                _this._router.navigate(['/auth']);
            }, 0);
        }
        else if (!this.optionIsInited) {
            this.initAppOptions();
        }
    };
    // 初始化时重置路由
    App.prototype.ngOnInit = function () {
        this.routeCheck();
    };
    App = __decorate([
        core_1.Component({
            selector: 'app',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./node_modules/.4.2.0@normalize.css/normalize.css"), __webpack_require__("./src/app/app.scss")],
            template: "\n    <main [ngClass]=\"{'menu-collapsed': isMenuCollapsed}\" baThemeRun>\n      <simple-notifications [options]=\"notificationsOptions\"></simple-notifications>\n      <div class=\"additional-bg\"></div>\n      <router-outlet></router-outlet>\n    </main>\n  ",
            providers: [options_service_1.OptionsService, app_service_1.AppState]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof global_state_1.GlobalState !== 'undefined' && global_state_1.GlobalState) === 'function' && _a) || Object, (typeof (_b = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _b) || Object, (typeof (_c = typeof options_service_1.OptionsService !== 'undefined' && options_service_1.OptionsService) === 'function' && _c) || Object, (typeof (_d = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _d) || Object, (typeof (_e = typeof theme_config_1.BaThemeConfig !== 'undefined' && theme_config_1.BaThemeConfig) === 'function' && _e) || Object, (typeof (_f = typeof services_1.BaThemeSpinner !== 'undefined' && services_1.BaThemeSpinner) === 'function' && _f) || Object, (typeof (_g = typeof services_1.BaImageLoaderService !== 'undefined' && services_1.BaImageLoaderService) === 'function' && _g) || Object, (typeof (_h = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _h) || Object, (typeof (_j = typeof angular2_notifications_1.NotificationsService !== 'undefined' && angular2_notifications_1.NotificationsService) === 'function' && _j) || Object])
    ], App);
    return App;
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
}());
exports.App = App;


/***/ },

/***/ "./src/app/app.loader.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// this css loaded separately as a standalone file to speed up the initial styles loading
__webpack_require__("./src/app/theme/initial.scss");


/***/ },

/***/ "./src/app/app.menu.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var pages_menu_1 = __webpack_require__("./src/app/pages/pages.menu.ts");
exports.MENU = pages_menu_1.PAGES_MENU.slice();


/***/ },

/***/ "./src/app/app.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var platform_browser_1 = __webpack_require__("./node_modules/.2.1.1@@angular/platform-browser/index.js");
var forms_1 = __webpack_require__("./node_modules/.2.1.1@@angular/forms/index.js");
var http_1 = __webpack_require__("./node_modules/.2.1.1@@angular/http/index.js");
var angular2_jwt_1 = __webpack_require__("./node_modules/.0.1.28@angular2-jwt/angular2-jwt.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var angular2_notifications_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/components.js");
var hmr_1 = __webpack_require__("./node_modules/.1.2.2@@angularclass/hmr/dist/index.js");
/*
 * Platform and Environment providers/directives/pipes
 */
var environment_1 = __webpack_require__("./src/app/environment.ts");
var app_routing_1 = __webpack_require__("./src/app/app.routing.ts");
// App is our top level component
var app_component_1 = __webpack_require__("./src/app/app.component.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var global_state_1 = __webpack_require__("./src/app/global.state.ts");
var nga_module_1 = __webpack_require__("./src/app/theme/nga.module.ts");
var pages_module_1 = __webpack_require__("./src/app/pages/pages.module.ts");
// Application wide providers
var APP_PROVIDERS = [
    app_service_1.AppState,
    global_state_1.GlobalState
];
// app入口模块
var AppModule = (function () {
    function AppModule(appRef, appState) {
        this.appRef = appRef;
        this.appState = appState;
    }
    AppModule.prototype.hmrOnInit = function (store) {
        if (!store || !store.state)
            return;
        console.log('HMR store', JSON.stringify(store, null, 2));
        // set state
        this.appState._state = store.state;
        // set input values
        if ('restoreInputValues' in store) {
            var restoreInputValues = store.restoreInputValues;
            setTimeout(restoreInputValues);
        }
        this.appRef.tick();
        delete store.state;
        delete store.restoreInputValues;
    };
    AppModule.prototype.hmrOnDestroy = function (store) {
        var cmpLocation = this.appRef.components.map(function (cmp) { return cmp.location.nativeElement; });
        // save state
        var state = this.appState._state;
        store.state = state;
        // recreate root elements
        store.disposeOldHosts = hmr_1.createNewHosts(cmpLocation);
        // save input values
        store.restoreInputValues = hmr_1.createInputTransfer();
        // remove styles
        hmr_1.removeNgStyles();
    };
    AppModule.prototype.hmrAfterDestroy = function (store) {
        // display new elements
        store.disposeOldHosts();
        delete store.disposeOldHosts;
    };
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [app_component_1.App],
            declarations: [
                app_component_1.App
            ],
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                angular2_notifications_1.SimpleNotificationsModule,
                nga_module_1.NgaModule.forRoot(),
                pages_module_1.PagesModule,
                app_routing_1.routing
            ],
            // expose our Services and Providers into Angular's dependency injection
            providers: [
                environment_1.ENV_PROVIDERS,
                APP_PROVIDERS,
                angular2_jwt_1.provideAuth({
                    headerName: 'Authorization',
                    headerPrefix: 'Bearer',
                    tokenName: 'id_token',
                    tokenGetter: function () { return localStorage.getItem('id_token'); },
                    globalHeaders: [{ 'Content-Type': 'application/json' }],
                    noJwtError: false,
                    noTokenScheme: false
                })
            ]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ApplicationRef !== 'undefined' && core_1.ApplicationRef) === 'function' && _a) || Object, (typeof (_b = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _b) || Object])
    ], AppModule);
    return AppModule;
    var _a, _b;
}());
exports.AppModule = AppModule;


/***/ },

/***/ "./src/app/app.routing.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
exports.routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
];
exports.routing = router_1.RouterModule.forRoot(exports.routes, { useHash: false });


/***/ },

/***/ "./src/app/app.scss":
/***/ function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.card.card-blur {\n  background: url(\"assets/img/blur-bg-blurred.jpg\");\n  transition: none;\n  background-attachment: fixed; }\n  .card.card-blur .card-header, .card.card-blur .card-footer {\n    background: transparent; }\n\n.card {\n  color: #ffffff;\n  background-color: rgba(255, 255, 255, 0.1);\n  border: 0;\n  border-radius: 7px;\n  position: relative;\n  margin-bottom: 24px; }\n  .card ::-webkit-scrollbar {\n    width: 0.4em;\n    height: 0.4em; }\n  .card ::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.6);\n    cursor: pointer; }\n  .card ::-webkit-scrollbar-track {\n    background: rgba(255, 255, 255, 0.7); }\n  .card body {\n    scrollbar-face-color: rgba(0, 0, 0, 0.6);\n    scrollbar-track-color: rgba(255, 255, 255, 0.7); }\n  .card.animated {\n    animation-duration: 0.5s; }\n  .card.small-card {\n    height: 114px; }\n  .card.xsmall-card {\n    height: 187px; }\n  .card.medium-card {\n    height: 400px; }\n  .card.xmedium-card {\n    height: 550px; }\n  .card.large-card {\n    height: 974px; }\n  .card.viewport100 {\n    height: calc(100vh - 218px); }\n  .card.with-scroll .card-body {\n    height: calc(100% - 44px);\n    overflow-y: auto; }\n\n.card > .card-body {\n  padding: 20px;\n  height: 100%; }\n\n.card > .card-header {\n  color: #ffffff;\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.card > .card-footer {\n  color: #ffffff; }\n\n.card-header, .card-footer {\n  color: #ffffff;\n  border-bottom: 1px solid #101920;\n  height: 44px;\n  font-size: 16px;\n  padding: 14px 22px;\n  background-color: #23282d; }\n\n.card-title {\n  font-weight: 400;\n  font-size: 16px;\n  text-transform: uppercase;\n  opacity: 0.9;\n  color: #ffffff; }\n\n.card-primary > .card-header {\n  background-color: #348d8d;\n  border-color: #348d8d; }\n\n.card-success > .card-header {\n  background-color: #539181;\n  border-color: #539181; }\n\n.card-info > .card-header {\n  background-color: #5dade2;\n  border-color: #5dade2; }\n\n.card-warning > .card-header {\n  background-color: #f5b041;\n  border-color: #f5b041; }\n\n.card-danger > .card-header {\n  background-color: #ec7063;\n  border-color: #ec7063; }\n\n.accordion-card.card.card-primary .card-header p, .accordion-card.card.card-primary .card-header div, .accordion-card.card.card-primary .card-header span, .accordion-card.card.card-success .card-header p, .accordion-card.card.card-success .card-header div, .accordion-card.card.card-success .card-header span, .accordion-card.card.card-info .card-header p, .accordion-card.card.card-info .card-header div, .accordion-card.card.card-info .card-header span, .accordion-card.card.card-warning .card-header p, .accordion-card.card.card-warning .card-header div, .accordion-card.card.card-warning .card-header span, .accordion-card.card.card-danger .card-header p, .accordion-card.card.card-danger .card-header div, .accordion-card.card.card-danger .card-header span {\n  color: rgba(255, 255, 255, 0.8); }\n\n.card-group .card.accordion-card .card-header {\n  border-bottom: 0; }\n\n.card-group .card .card-header {\n  border-bottom: 1px solid #ddd; }\n\n.p-with-code {\n  line-height: 1.5em; }\n\n.contextual-example-card {\n  height: 120px; }\n\n.footer-card {\n  height: 142px; }\n\n.light-text {\n  font-weight: 300; }\n\n.dropdown-item {\n  line-height: 1;\n  padding: 0; }\n  .dropdown-item > a {\n    display: block;\n    padding: 0 1rem;\n    height: 2rem;\n    line-height: 2rem;\n    color: #373a3c;\n    cursor: pointer; }\n    .dropdown-item > a:hover {\n      color: white !important;\n      background-color: #23282d !important; }\n  .dropdown-item:hover {\n    background-color: transparent; }\n\n.dropdown-menu {\n  font-size: inherit;\n  border: none; }\n\n/** Different tabs positions, which were removed from bootstrap */\n.tabs-below .nav-tabs, .tabs-right .nav-tabs, .tabs-left .nav-tabs {\n  border-bottom: 0; }\n\n.tabs-right .nav-tabs, .tabs-left .nav-tabs {\n  min-width: 100px; }\n\n.tabs-right .tab-content, .tabs-left .tab-content {\n  width: calc(100% - 100px);\n  overflow-y: auto; }\n\n.tabs-right .tab-content {\n  margin-right: 100px; }\n\n.tabs-left .tab-content {\n  margin-left: 100px; }\n\n.tab-content > .tab-pane,\n.pill-content > .pill-pane {\n  display: none; }\n\n.tab-content > .active,\n.pill-content > .active {\n  display: block; }\n\n.tabs-below > .nav-tabs > li {\n  margin-top: -1px;\n  margin-bottom: 0; }\n\n.tabs-left, .tabs-right {\n  height: 100%; }\n  .tabs-left > .nav-tabs > li, .tabs-right > .nav-tabs > li {\n    float: none;\n    margin-bottom: 0; }\n    .tabs-left > .nav-tabs > li > a, .tabs-right > .nav-tabs > li > a {\n      min-width: 74px;\n      margin-right: 0;\n      margin-bottom: 3px; }\n\n.tabs-left > .nav-tabs {\n  float: left;\n  border-bottom-left-radius: 5px; }\n  .tabs-left > .nav-tabs > li > a {\n    margin-right: -1px; }\n\n.tabs-right > .nav.nav-tabs {\n  float: right;\n  border-top-left-radius: 0;\n  border-bottom-right-radius: 5px; }\n  .tabs-right > .nav.nav-tabs > li:first-of-type a {\n    border-top-left-radius: 0; }\n\n/** /Different tabs positions, which were removed from bootstrap */\n.nav-tabs > li.with-dropdown > a {\n  padding: 0; }\n\n.nav-tabs > li.with-dropdown .dropdown-toggle {\n  padding: 10px 15px;\n  display: inline-block;\n  cursor: pointer; }\n\n.tab-content {\n  padding: 15px 15px 5px 15px;\n  background: transparent;\n  color: #ffffff; }\n  .tab-content .tab-pane p {\n    color: #ffffff; }\n\n.nav.nav-tabs {\n  border-top-left-radius: 5px;\n  border-top-right-radius: 5px;\n  border-bottom: 1px solid transparent;\n  background-color: #4d9c9b; }\n  .nav.nav-tabs a {\n    color: #ffffff; }\n    .nav.nav-tabs a:hover {\n      color: #ffffff; }\n  .nav.nav-tabs > li > a {\n    margin-right: 0;\n    margin-bottom: 0;\n    border-radius: 0;\n    border: none; }\n    .nav.nav-tabs > li > a:hover {\n      border: none;\n      background-color: #4d9c9b; }\n  .nav.nav-tabs > li.active > a {\n    color: #ffffff;\n    background-color: #017170; }\n  .nav.nav-tabs > li:first-of-type a {\n    border-top-left-radius: 5px; }\n  .nav.nav-tabs .dropdown-menu > li > a {\n    color: #7d7d7d; }\n    .nav.nav-tabs .dropdown-menu > li > a:hover {\n      color: #7d7d7d; }\n\n.blur .nav.nav-tabs {\n  background-color: rgba(0, 0, 0, 0.2); }\n  .blur .nav.nav-tabs a {\n    color: #ffffff; }\n    .blur .nav.nav-tabs a:hover {\n      color: #ffffff; }\n  .blur .nav.nav-tabs > li > a:hover {\n    background-color: rgba(0, 0, 0, 0.2); }\n  .blur .nav.nav-tabs > li.active > a {\n    color: #ffffff;\n    background-color: rgba(0, 0, 0, 0.25); }\n\n.nav .open > a, .nav .open > a:hover, .nav .open > a:focus {\n  background-color: transparent; }\n\n.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus {\n  border: none; }\n\n.accordion-panel .panel-heading {\n  border-radius: 3px; }\n\n.accordion-panel.panel-open .panel-heading {\n  border-bottom-left-radius: 0;\n  border-bottom-right-radius: 0; }\n\n.accordion-panel:not(.panel-open) .panel-heading {\n  transition-delay: .3s; }\n\n.accordion-panel > .panel-heading + .panel-collapse > .panel-body {\n  border-top: none; }\n\n.accordion-panel .panel-heading {\n  padding: 0; }\n  .accordion-panel .panel-heading .accordion-toggle {\n    display: inline-block;\n    width: 100%;\n    padding: 14px 22px; }\n\n/*!\n * animate.css -http://daneden.me/animate\n * Version - 3.5.1\n * Licensed under the MIT license - http://opensource.org/licenses/MIT\n *\n * Copyright (c) 2016 Daniel Eden\n */\n.animated {\n  -webkit-animation-duration: 1s;\n  animation-duration: 1s;\n  -webkit-animation-fill-mode: both;\n  animation-fill-mode: both; }\n\n.animated.infinite {\n  -webkit-animation-iteration-count: infinite;\n  animation-iteration-count: infinite; }\n\n.animated.hinge {\n  -webkit-animation-duration: 2s;\n  animation-duration: 2s; }\n\n.animated.flipOutX,\n.animated.flipOutY,\n.animated.bounceIn,\n.animated.bounceOut {\n  -webkit-animation-duration: .75s;\n  animation-duration: .75s; }\n\n@-webkit-keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n@keyframes bounce {\n  from, 20%, 53%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  40%, 43% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -30px, 0);\n    transform: translate3d(0, -30px, 0); }\n  70% {\n    -webkit-animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    animation-timing-function: cubic-bezier(0.755, 0.05, 0.855, 0.06);\n    -webkit-transform: translate3d(0, -15px, 0);\n    transform: translate3d(0, -15px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -4px, 0);\n    transform: translate3d(0, -4px, 0); } }\n\n.bounce {\n  -webkit-animation-name: bounce;\n  animation-name: bounce;\n  -webkit-transform-origin: center bottom;\n  transform-origin: center bottom; }\n\n@-webkit-keyframes flash {\n  from, 50%, to {\n    opacity: 1; }\n  25%, 75% {\n    opacity: 0; } }\n\n@keyframes flash {\n  from, 50%, to {\n    opacity: 1; }\n  25%, 75% {\n    opacity: 0; } }\n\n.flash {\n  -webkit-animation-name: flash;\n  animation-name: flash; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes pulse {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  50% {\n    -webkit-transform: scale3d(1.05, 1.05, 1.05);\n    transform: scale3d(1.05, 1.05, 1.05); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.pulse {\n  -webkit-animation-name: pulse;\n  animation-name: pulse; }\n\n@-webkit-keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes rubberBand {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  30% {\n    -webkit-transform: scale3d(1.25, 0.75, 1);\n    transform: scale3d(1.25, 0.75, 1); }\n  40% {\n    -webkit-transform: scale3d(0.75, 1.25, 1);\n    transform: scale3d(0.75, 1.25, 1); }\n  50% {\n    -webkit-transform: scale3d(1.15, 0.85, 1);\n    transform: scale3d(1.15, 0.85, 1); }\n  65% {\n    -webkit-transform: scale3d(0.95, 1.05, 1);\n    transform: scale3d(0.95, 1.05, 1); }\n  75% {\n    -webkit-transform: scale3d(1.05, 0.95, 1);\n    transform: scale3d(1.05, 0.95, 1); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.rubberBand {\n  -webkit-animation-name: rubberBand;\n  animation-name: rubberBand; }\n\n@-webkit-keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); } }\n\n@keyframes shake {\n  from, to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  10%, 30%, 50%, 70%, 90% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  20%, 40%, 60%, 80% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); } }\n\n.shake {\n  -webkit-animation-name: shake;\n  animation-name: shake; }\n\n@-webkit-keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n@keyframes headShake {\n  0% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); }\n  6.5% {\n    -webkit-transform: translateX(-6px) rotateY(-9deg);\n    transform: translateX(-6px) rotateY(-9deg); }\n  18.5% {\n    -webkit-transform: translateX(5px) rotateY(7deg);\n    transform: translateX(5px) rotateY(7deg); }\n  31.5% {\n    -webkit-transform: translateX(-3px) rotateY(-5deg);\n    transform: translateX(-3px) rotateY(-5deg); }\n  43.5% {\n    -webkit-transform: translateX(2px) rotateY(3deg);\n    transform: translateX(2px) rotateY(3deg); }\n  50% {\n    -webkit-transform: translateX(0);\n    transform: translateX(0); } }\n\n.headShake {\n  -webkit-animation-timing-function: ease-in-out;\n  animation-timing-function: ease-in-out;\n  -webkit-animation-name: headShake;\n  animation-name: headShake; }\n\n@-webkit-keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n@keyframes swing {\n  20% {\n    -webkit-transform: rotate3d(0, 0, 1, 15deg);\n    transform: rotate3d(0, 0, 1, 15deg); }\n  40% {\n    -webkit-transform: rotate3d(0, 0, 1, -10deg);\n    transform: rotate3d(0, 0, 1, -10deg); }\n  60% {\n    -webkit-transform: rotate3d(0, 0, 1, 5deg);\n    transform: rotate3d(0, 0, 1, 5deg); }\n  80% {\n    -webkit-transform: rotate3d(0, 0, 1, -5deg);\n    transform: rotate3d(0, 0, 1, -5deg); }\n  to {\n    -webkit-transform: rotate3d(0, 0, 1, 0deg);\n    transform: rotate3d(0, 0, 1, 0deg); } }\n\n.swing {\n  -webkit-transform-origin: top center;\n  transform-origin: top center;\n  -webkit-animation-name: swing;\n  animation-name: swing; }\n\n@-webkit-keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  10%, 20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes tada {\n  from {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); }\n  10%, 20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); }\n  30%, 50%, 70%, 90% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); }\n  40%, 60%, 80% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);\n    transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); }\n  to {\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.tada {\n  -webkit-animation-name: tada;\n  animation-name: tada; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none; }\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes wobble {\n  from {\n    -webkit-transform: none;\n    transform: none; }\n  15% {\n    -webkit-transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg);\n    transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); }\n  30% {\n    -webkit-transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg);\n    transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); }\n  45% {\n    -webkit-transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg);\n    transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); }\n  60% {\n    -webkit-transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg);\n    transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); }\n  75% {\n    -webkit-transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg);\n    transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.wobble {\n  -webkit-animation-name: wobble;\n  animation-name: wobble; }\n\n@-webkit-keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none; }\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    -webkit-transform: skewX(0.39062deg) skewY(0.39062deg);\n    transform: skewX(0.39062deg) skewY(0.39062deg); }\n  88.8% {\n    -webkit-transform: skewX(-0.19531deg) skewY(-0.19531deg);\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n@keyframes jello {\n  from, 11.1%, to {\n    -webkit-transform: none;\n    transform: none; }\n  22.2% {\n    -webkit-transform: skewX(-12.5deg) skewY(-12.5deg);\n    transform: skewX(-12.5deg) skewY(-12.5deg); }\n  33.3% {\n    -webkit-transform: skewX(6.25deg) skewY(6.25deg);\n    transform: skewX(6.25deg) skewY(6.25deg); }\n  44.4% {\n    -webkit-transform: skewX(-3.125deg) skewY(-3.125deg);\n    transform: skewX(-3.125deg) skewY(-3.125deg); }\n  55.5% {\n    -webkit-transform: skewX(1.5625deg) skewY(1.5625deg);\n    transform: skewX(1.5625deg) skewY(1.5625deg); }\n  66.6% {\n    -webkit-transform: skewX(-0.78125deg) skewY(-0.78125deg);\n    transform: skewX(-0.78125deg) skewY(-0.78125deg); }\n  77.7% {\n    -webkit-transform: skewX(0.39062deg) skewY(0.39062deg);\n    transform: skewX(0.39062deg) skewY(0.39062deg); }\n  88.8% {\n    -webkit-transform: skewX(-0.19531deg) skewY(-0.19531deg);\n    transform: skewX(-0.19531deg) skewY(-0.19531deg); } }\n\n.jello {\n  -webkit-animation-name: jello;\n  animation-name: jello;\n  -webkit-transform-origin: center;\n  transform-origin: center; }\n\n@-webkit-keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n@keyframes bounceIn {\n  from, 20%, 40%, 60%, 80%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  20% {\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  40% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.03, 1.03, 1.03);\n    transform: scale3d(1.03, 1.03, 1.03); }\n  80% {\n    -webkit-transform: scale3d(0.97, 0.97, 0.97);\n    transform: scale3d(0.97, 0.97, 0.97); }\n  to {\n    opacity: 1;\n    -webkit-transform: scale3d(1, 1, 1);\n    transform: scale3d(1, 1, 1); } }\n\n.bounceIn {\n  -webkit-animation-name: bounceIn;\n  animation-name: bounceIn; }\n\n@-webkit-keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInDown {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -3000px, 0);\n    transform: translate3d(0, -3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 25px, 0);\n    transform: translate3d(0, 25px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, 5px, 0);\n    transform: translate3d(0, 5px, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInDown {\n  -webkit-animation-name: bounceInDown;\n  animation-name: bounceInDown; }\n\n@-webkit-keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInLeft {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  0% {\n    opacity: 0;\n    -webkit-transform: translate3d(-3000px, 0, 0);\n    transform: translate3d(-3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(25px, 0, 0);\n    transform: translate3d(25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(-10px, 0, 0);\n    transform: translate3d(-10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(5px, 0, 0);\n    transform: translate3d(5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInLeft {\n  -webkit-animation-name: bounceInLeft;\n  animation-name: bounceInLeft; }\n\n@-webkit-keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes bounceInRight {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(3000px, 0, 0);\n    transform: translate3d(3000px, 0, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(-25px, 0, 0);\n    transform: translate3d(-25px, 0, 0); }\n  75% {\n    -webkit-transform: translate3d(10px, 0, 0);\n    transform: translate3d(10px, 0, 0); }\n  90% {\n    -webkit-transform: translate3d(-5px, 0, 0);\n    transform: translate3d(-5px, 0, 0); }\n  to {\n    -webkit-transform: none;\n    transform: none; } }\n\n.bounceInRight {\n  -webkit-animation-name: bounceInRight;\n  animation-name: bounceInRight; }\n\n@-webkit-keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0); }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes bounceInUp {\n  from, 60%, 75%, 90%, to {\n    -webkit-animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);\n    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1); }\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 3000px, 0);\n    transform: translate3d(0, 3000px, 0); }\n  60% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  75% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  90% {\n    -webkit-transform: translate3d(0, -5px, 0);\n    transform: translate3d(0, -5px, 0); }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.bounceInUp {\n  -webkit-animation-name: bounceInUp;\n  animation-name: bounceInUp; }\n\n@-webkit-keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n@keyframes bounceOut {\n  20% {\n    -webkit-transform: scale3d(0.9, 0.9, 0.9);\n    transform: scale3d(0.9, 0.9, 0.9); }\n  50%, 55% {\n    opacity: 1;\n    -webkit-transform: scale3d(1.1, 1.1, 1.1);\n    transform: scale3d(1.1, 1.1, 1.1); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); } }\n\n.bounceOut {\n  -webkit-animation-name: bounceOut;\n  animation-name: bounceOut; }\n\n@-webkit-keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n@keyframes bounceOutDown {\n  20% {\n    -webkit-transform: translate3d(0, 10px, 0);\n    transform: translate3d(0, 10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, -20px, 0);\n    transform: translate3d(0, -20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n.bounceOutDown {\n  -webkit-animation-name: bounceOutDown;\n  animation-name: bounceOutDown; }\n\n@-webkit-keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n@keyframes bounceOutLeft {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(20px, 0, 0);\n    transform: translate3d(20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n.bounceOutLeft {\n  -webkit-animation-name: bounceOutLeft;\n  animation-name: bounceOutLeft; }\n\n@-webkit-keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n@keyframes bounceOutRight {\n  20% {\n    opacity: 1;\n    -webkit-transform: translate3d(-20px, 0, 0);\n    transform: translate3d(-20px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n.bounceOutRight {\n  -webkit-animation-name: bounceOutRight;\n  animation-name: bounceOutRight; }\n\n@-webkit-keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n@keyframes bounceOutUp {\n  20% {\n    -webkit-transform: translate3d(0, -10px, 0);\n    transform: translate3d(0, -10px, 0); }\n  40%, 45% {\n    opacity: 1;\n    -webkit-transform: translate3d(0, 20px, 0);\n    transform: translate3d(0, 20px, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n.bounceOutUp {\n  -webkit-animation-name: bounceOutUp;\n  animation-name: bounceOutUp; }\n\n@-webkit-keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n@keyframes fadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.fadeIn {\n  -webkit-animation-name: fadeIn;\n  animation-name: fadeIn; }\n\n@-webkit-keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInDown {\n  -webkit-animation-name: fadeInDown;\n  animation-name: fadeInDown; }\n\n@-webkit-keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInDownBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInDownBig {\n  -webkit-animation-name: fadeInDownBig;\n  animation-name: fadeInDownBig; }\n\n@-webkit-keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInLeft {\n  -webkit-animation-name: fadeInLeft;\n  animation-name: fadeInLeft; }\n\n@-webkit-keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInLeftBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInLeftBig {\n  -webkit-animation-name: fadeInLeftBig;\n  animation-name: fadeInLeftBig; }\n\n@-webkit-keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInRight {\n  -webkit-animation-name: fadeInRight;\n  animation-name: fadeInRight; }\n\n@-webkit-keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInRightBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInRightBig {\n  -webkit-animation-name: fadeInRightBig;\n  animation-name: fadeInRightBig; }\n\n@-webkit-keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInUp {\n  -webkit-animation-name: fadeInUp;\n  animation-name: fadeInUp; }\n\n@-webkit-keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes fadeInUpBig {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.fadeInUpBig {\n  -webkit-animation-name: fadeInUpBig;\n  animation-name: fadeInUpBig; }\n\n@-webkit-keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes fadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.fadeOut {\n  -webkit-animation-name: fadeOut;\n  animation-name: fadeOut; }\n\n@-webkit-keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes fadeOutDown {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n.fadeOutDown {\n  -webkit-animation-name: fadeOutDown;\n  animation-name: fadeOutDown; }\n\n@-webkit-keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n@keyframes fadeOutDownBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, 2000px, 0);\n    transform: translate3d(0, 2000px, 0); } }\n\n.fadeOutDownBig {\n  -webkit-animation-name: fadeOutDownBig;\n  animation-name: fadeOutDownBig; }\n\n@-webkit-keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n@keyframes fadeOutLeft {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n.fadeOutLeft {\n  -webkit-animation-name: fadeOutLeft;\n  animation-name: fadeOutLeft; }\n\n@-webkit-keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n@keyframes fadeOutLeftBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(-2000px, 0, 0);\n    transform: translate3d(-2000px, 0, 0); } }\n\n.fadeOutLeftBig {\n  -webkit-animation-name: fadeOutLeftBig;\n  animation-name: fadeOutLeftBig; }\n\n@-webkit-keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@keyframes fadeOutRight {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n.fadeOutRight {\n  -webkit-animation-name: fadeOutRight;\n  animation-name: fadeOutRight; }\n\n@-webkit-keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n@keyframes fadeOutRightBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(2000px, 0, 0);\n    transform: translate3d(2000px, 0, 0); } }\n\n.fadeOutRightBig {\n  -webkit-animation-name: fadeOutRightBig;\n  animation-name: fadeOutRightBig; }\n\n@-webkit-keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n@keyframes fadeOutUp {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n.fadeOutUp {\n  -webkit-animation-name: fadeOutUp;\n  animation-name: fadeOutUp; }\n\n@-webkit-keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n@keyframes fadeOutUpBig {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(0, -2000px, 0);\n    transform: translate3d(0, -2000px, 0); } }\n\n.fadeOutUpBig {\n  -webkit-animation-name: fadeOutUpBig;\n  animation-name: fadeOutUpBig; }\n\n@-webkit-keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; } }\n\n@keyframes flip {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -360deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  40% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -190deg);\n    -webkit-animation-timing-function: ease-out;\n    animation-timing-function: ease-out; }\n  50% {\n    -webkit-transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    transform: perspective(400px) translate3d(0, 0, 150px) rotate3d(0, 1, 0, -170deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  80% {\n    -webkit-transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    transform: perspective(400px) scale3d(0.95, 0.95, 0.95);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; } }\n\n.animated.flip {\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  -webkit-animation-name: flip;\n  animation-name: flip; }\n\n@-webkit-keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n@keyframes flipInX {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -5deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.flipInX {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInX;\n  animation-name: flipInX; }\n\n@-webkit-keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n@keyframes flipInY {\n  from {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in;\n    opacity: 0; }\n  40% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -20deg);\n    -webkit-animation-timing-function: ease-in;\n    animation-timing-function: ease-in; }\n  60% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 10deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -5deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -5deg); }\n  to {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); } }\n\n.flipInY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipInY;\n  animation-name: flipInY; }\n\n@-webkit-keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n@keyframes flipOutX {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, -20deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    transform: perspective(400px) rotate3d(1, 0, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutX {\n  -webkit-animation-name: flipOutX;\n  animation-name: flipOutX;\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important; }\n\n@-webkit-keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n@keyframes flipOutY {\n  from {\n    -webkit-transform: perspective(400px);\n    transform: perspective(400px); }\n  30% {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, -15deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    transform: perspective(400px) rotate3d(0, 1, 0, 90deg);\n    opacity: 0; } }\n\n.flipOutY {\n  -webkit-backface-visibility: visible !important;\n  backface-visibility: visible !important;\n  -webkit-animation-name: flipOutY;\n  animation-name: flipOutY; }\n\n@-webkit-keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes lightSpeedIn {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(-30deg);\n    transform: translate3d(100%, 0, 0) skewX(-30deg);\n    opacity: 0; }\n  60% {\n    -webkit-transform: skewX(20deg);\n    transform: skewX(20deg);\n    opacity: 1; }\n  80% {\n    -webkit-transform: skewX(-5deg);\n    transform: skewX(-5deg);\n    opacity: 1; }\n  to {\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.lightSpeedIn {\n  -webkit-animation-name: lightSpeedIn;\n  animation-name: lightSpeedIn;\n  -webkit-animation-timing-function: ease-out;\n  animation-timing-function: ease-out; }\n\n@-webkit-keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n@keyframes lightSpeedOut {\n  from {\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(100%, 0, 0) skewX(30deg);\n    transform: translate3d(100%, 0, 0) skewX(30deg);\n    opacity: 0; } }\n\n.lightSpeedOut {\n  -webkit-animation-name: lightSpeedOut;\n  animation-name: lightSpeedOut;\n  -webkit-animation-timing-function: ease-in;\n  animation-timing-function: ease-in; }\n\n@-webkit-keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateIn {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, -200deg);\n    transform: rotate3d(0, 0, 1, -200deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateIn {\n  -webkit-animation-name: rotateIn;\n  animation-name: rotateIn; }\n\n@-webkit-keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInDownLeft {\n  -webkit-animation-name: rotateInDownLeft;\n  animation-name: rotateInDownLeft; }\n\n@-webkit-keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInDownRight {\n  -webkit-animation-name: rotateInDownRight;\n  animation-name: rotateInDownRight; }\n\n@-webkit-keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInUpLeft {\n  -webkit-animation-name: rotateInUpLeft;\n  animation-name: rotateInUpLeft; }\n\n@-webkit-keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n@keyframes rotateInUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -90deg);\n    transform: rotate3d(0, 0, 1, -90deg);\n    opacity: 0; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: none;\n    transform: none;\n    opacity: 1; } }\n\n.rotateInUpRight {\n  -webkit-animation-name: rotateInUpRight;\n  animation-name: rotateInUpRight; }\n\n@-webkit-keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n@keyframes rotateOut {\n  from {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: center;\n    transform-origin: center;\n    -webkit-transform: rotate3d(0, 0, 1, 200deg);\n    transform: rotate3d(0, 0, 1, 200deg);\n    opacity: 0; } }\n\n.rotateOut {\n  -webkit-animation-name: rotateOut;\n  animation-name: rotateOut; }\n\n@-webkit-keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutDownLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 45deg);\n    transform: rotate3d(0, 0, 1, 45deg);\n    opacity: 0; } }\n\n.rotateOutDownLeft {\n  -webkit-animation-name: rotateOutDownLeft;\n  animation-name: rotateOutDownLeft; }\n\n@-webkit-keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutDownRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutDownRight {\n  -webkit-animation-name: rotateOutDownRight;\n  animation-name: rotateOutDownRight; }\n\n@-webkit-keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n@keyframes rotateOutUpLeft {\n  from {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: left bottom;\n    transform-origin: left bottom;\n    -webkit-transform: rotate3d(0, 0, 1, -45deg);\n    transform: rotate3d(0, 0, 1, -45deg);\n    opacity: 0; } }\n\n.rotateOutUpLeft {\n  -webkit-animation-name: rotateOutUpLeft;\n  animation-name: rotateOutUpLeft; }\n\n@-webkit-keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n@keyframes rotateOutUpRight {\n  from {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    opacity: 1; }\n  to {\n    -webkit-transform-origin: right bottom;\n    transform-origin: right bottom;\n    -webkit-transform: rotate3d(0, 0, 1, 90deg);\n    transform: rotate3d(0, 0, 1, 90deg);\n    opacity: 0; } }\n\n.rotateOutUpRight {\n  -webkit-animation-name: rotateOutUpRight;\n  animation-name: rotateOutUpRight; }\n\n@-webkit-keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n@keyframes hinge {\n  0% {\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  20%, 60% {\n    -webkit-transform: rotate3d(0, 0, 1, 80deg);\n    transform: rotate3d(0, 0, 1, 80deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out; }\n  40%, 80% {\n    -webkit-transform: rotate3d(0, 0, 1, 60deg);\n    transform: rotate3d(0, 0, 1, 60deg);\n    -webkit-transform-origin: top left;\n    transform-origin: top left;\n    -webkit-animation-timing-function: ease-in-out;\n    animation-timing-function: ease-in-out;\n    opacity: 1; }\n  to {\n    -webkit-transform: translate3d(0, 700px, 0);\n    transform: translate3d(0, 700px, 0);\n    opacity: 0; } }\n\n.hinge {\n  -webkit-animation-name: hinge;\n  animation-name: hinge; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n@keyframes rollIn {\n  from {\n    opacity: 0;\n    -webkit-transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg);\n    transform: translate3d(-100%, 0, 0) rotate3d(0, 0, 1, -120deg); }\n  to {\n    opacity: 1;\n    -webkit-transform: none;\n    transform: none; } }\n\n.rollIn {\n  -webkit-animation-name: rollIn;\n  animation-name: rollIn; }\n\n/* originally authored by Nick Pettit - https://github.com/nickpettit/glide */\n@-webkit-keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n@keyframes rollOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0;\n    -webkit-transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg);\n    transform: translate3d(100%, 0, 0) rotate3d(0, 0, 1, 120deg); } }\n\n.rollOut {\n  -webkit-animation-name: rollOut;\n  animation-name: rollOut; }\n\n@-webkit-keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n@keyframes zoomIn {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  50% {\n    opacity: 1; } }\n\n.zoomIn {\n  -webkit-animation-name: zoomIn;\n  animation-name: zoomIn; }\n\n@-webkit-keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInDown {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInDown {\n  -webkit-animation-name: zoomInDown;\n  animation-name: zoomInDown; }\n\n@-webkit-keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInLeft {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(-1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInLeft {\n  -webkit-animation-name: zoomInLeft;\n  animation-name: zoomInLeft; }\n\n@-webkit-keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInRight {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(1000px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-10px, 0, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInRight {\n  -webkit-animation-name: zoomInRight;\n  animation-name: zoomInRight; }\n\n@-webkit-keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomInUp {\n  from {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 1000px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  60% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomInUp {\n  -webkit-animation-name: zoomInUp;\n  animation-name: zoomInUp; }\n\n@-webkit-keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n@keyframes zoomOut {\n  from {\n    opacity: 1; }\n  50% {\n    opacity: 0;\n    -webkit-transform: scale3d(0.3, 0.3, 0.3);\n    transform: scale3d(0.3, 0.3, 0.3); }\n  to {\n    opacity: 0; } }\n\n.zoomOut {\n  -webkit-animation-name: zoomOut;\n  animation-name: zoomOut; }\n\n@-webkit-keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomOutDown {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, -60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, 2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutDown {\n  -webkit-animation-name: zoomOutDown;\n  animation-name: zoomOutDown; }\n\n@-webkit-keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center; } }\n\n@keyframes zoomOutLeft {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(-2000px, 0, 0);\n    transform: scale(0.1) translate3d(-2000px, 0, 0);\n    -webkit-transform-origin: left center;\n    transform-origin: left center; } }\n\n.zoomOutLeft {\n  -webkit-animation-name: zoomOutLeft;\n  animation-name: zoomOutLeft; }\n\n@-webkit-keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center; } }\n\n@keyframes zoomOutRight {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(-42px, 0, 0); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale(0.1) translate3d(2000px, 0, 0);\n    transform: scale(0.1) translate3d(2000px, 0, 0);\n    -webkit-transform-origin: right center;\n    transform-origin: right center; } }\n\n.zoomOutRight {\n  -webkit-animation-name: zoomOutRight;\n  animation-name: zoomOutRight; }\n\n@-webkit-keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n@keyframes zoomOutUp {\n  40% {\n    opacity: 1;\n    -webkit-transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    transform: scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0);\n    -webkit-animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);\n    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }\n  to {\n    opacity: 0;\n    -webkit-transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    transform: scale3d(0.1, 0.1, 0.1) translate3d(0, -2000px, 0);\n    -webkit-transform-origin: center bottom;\n    transform-origin: center bottom;\n    -webkit-animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1);\n    animation-timing-function: cubic-bezier(0.175, 0.885, 0.32, 1); } }\n\n.zoomOutUp {\n  -webkit-animation-name: zoomOutUp;\n  animation-name: zoomOutUp; }\n\n@-webkit-keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInDown {\n  from {\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInDown {\n  -webkit-animation-name: slideInDown;\n  animation-name: slideInDown; }\n\n@-webkit-keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInLeft {\n  from {\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInLeft {\n  -webkit-animation-name: slideInLeft;\n  animation-name: slideInLeft; }\n\n@-webkit-keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInRight {\n  from {\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInRight {\n  -webkit-animation-name: slideInRight;\n  animation-name: slideInRight; }\n\n@-webkit-keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n@keyframes slideInUp {\n  from {\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0);\n    visibility: visible; }\n  to {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); } }\n\n.slideInUp {\n  -webkit-animation-name: slideInUp;\n  animation-name: slideInUp; }\n\n@-webkit-keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n@keyframes slideOutDown {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, 100%, 0);\n    transform: translate3d(0, 100%, 0); } }\n\n.slideOutDown {\n  -webkit-animation-name: slideOutDown;\n  animation-name: slideOutDown; }\n\n@-webkit-keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n@keyframes slideOutLeft {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(-100%, 0, 0);\n    transform: translate3d(-100%, 0, 0); } }\n\n.slideOutLeft {\n  -webkit-animation-name: slideOutLeft;\n  animation-name: slideOutLeft; }\n\n@-webkit-keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n@keyframes slideOutRight {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(100%, 0, 0);\n    transform: translate3d(100%, 0, 0); } }\n\n.slideOutRight {\n  -webkit-animation-name: slideOutRight;\n  animation-name: slideOutRight; }\n\n@-webkit-keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n@keyframes slideOutUp {\n  from {\n    -webkit-transform: translate3d(0, 0, 0);\n    transform: translate3d(0, 0, 0); }\n  to {\n    visibility: hidden;\n    -webkit-transform: translate3d(0, -100%, 0);\n    transform: translate3d(0, -100%, 0); } }\n\n.slideOutUp {\n  -webkit-animation-name: slideOutUp;\n  animation-name: slideOutUp; }\n\nh1, h2, h3, h4, h5, h6 {\n  font-family: \"PingFang SC\", -apple-system, BlinkMacSystemFont, \"Roboto\", \"Century Gothic\", BlinkMacSystemFont, \"Segoe UI\", \"Microsoft yahei\", \"微软雅黑\", \"Helvetica Neue\", sans-serif, SimHei;\n  width: 100%;\n  margin-top: 0; }\n\nh1.color, h2.color, h3.color, h4.color, h5.color, h6.color {\n  color: #e74c3c; }\n\nbody a {\n  color: #ffffff;\n  text-decoration: none !important;\n  transition: color 0.2s ease; }\n  body a:hover {\n    color: #017170; }\n\nh1 {\n  font-size: 32px;\n  margin-bottom: 0.5rem; }\n\nh2 {\n  font-size: 24px; }\n\nh3 {\n  font-size: 20px; }\n\nh4 {\n  font-size: 18px; }\n\nh5 {\n  font-size: 15px; }\n\n.typography-document-samples p {\n  margin: 0; }\n\n.typography-document-samples .typography-widget {\n  height: 100%; }\n  .typography-document-samples .typography-widget .card {\n    height: 620px; }\n  .typography-document-samples .typography-widget .card-title {\n    text-align: center;\n    width: 100%; }\n  .typography-document-samples .typography-widget .card.with-scroll .card-body {\n    height: calc(100% - 45px); }\n  .typography-document-samples .typography-widget .card-content {\n    padding: 15px 22px 5px 22px; }\n\n.heading-widget h1, .heading-widget h2, .heading-widget h3, .heading-widget h4, .heading-widget h5, .heading-widget h6 {\n  width: 100%;\n  font-weight: 300;\n  text-align: center; }\n\n.heading-widget p {\n  line-height: 16px;\n  font-weight: 400;\n  text-align: center; }\n\n.more-text-widget {\n  text-align: center;\n  font-size: 14px; }\n  .more-text-widget p {\n    line-height: 17px; }\n  .more-text-widget .gray {\n    color: #767676; }\n  .more-text-widget .black {\n    color: #585858; }\n  .more-text-widget .light-text {\n    font-weight: 300; }\n  .more-text-widget .regular-text {\n    font-weight: 400; }\n  .more-text-widget .upper-text {\n    text-transform: uppercase; }\n  .more-text-widget .bold-text {\n    font-weight: 700; }\n  .more-text-widget .small-text {\n    padding: 5px 0 0 0; }\n    .more-text-widget .small-text p {\n      font-size: 9px;\n      font-weight: 300;\n      line-height: 10px; }\n\n.color-widget {\n  text-align: center;\n  font-size: 14px;\n  font-weight: 400; }\n  .color-widget p {\n    line-height: 17px; }\n  .color-widget .section-block {\n    margin: 14px 0; }\n  .color-widget .yellow-text p {\n    color: #f39c12; }\n  .color-widget .red-text p {\n    color: #e74c3c; }\n  .color-widget .links h3 {\n    margin-bottom: 10px; }\n  .color-widget .links p {\n    margin-bottom: 0; }\n    .color-widget .links p.hovered a {\n      color: #017170; }\n\n.lists-widget {\n  font-weight: 400; }\n  .lists-widget .list-header {\n    width: 100%;\n    text-align: center; }\n  .lists-widget .accent {\n    margin-top: 30px;\n    color: #f5b041;\n    line-height: 14px;\n    font-size: 14px;\n    padding-left: 11px;\n    border-left: 4px solid #f5b041;\n    margin-left: 13px; }\n  .lists-widget ul.blur, .lists-widget ol.blur {\n    padding-left: 13px;\n    margin-bottom: 19px;\n    list-style: none;\n    padding-top: 1px; }\n    .lists-widget ul.blur li, .lists-widget ol.blur li {\n      margin-top: 5px;\n      font-size: 14px; }\n      .lists-widget ul.blur li ul, .lists-widget ul.blur li ol, .lists-widget ol.blur li ul, .lists-widget ol.blur li ol {\n        padding-left: 20px;\n        margin-bottom: 0;\n        list-style: none; }\n  .lists-widget ul.blur li:before {\n    content: \"• \";\n    color: #f5b041;\n    width: 10px;\n    display: inline-block; }\n  .lists-widget ol.blur {\n    counter-reset: section; }\n    .lists-widget ol.blur li {\n      color: #f5b041;\n      padding-left: 0;\n      line-height: 14px;\n      position: relative; }\n      .lists-widget ol.blur li span {\n        color: #ffffff;\n        display: block; }\n      .lists-widget ol.blur li ol {\n        padding-left: 0;\n        margin-left: 12px; }\n      .lists-widget ol.blur li:before {\n        content: counters(section, \".\") \".\";\n        counter-increment: section;\n        width: 19px;\n        position: absolute;\n        left: 0;\n        top: 0;\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis; }\n    .lists-widget ol.blur > li span {\n      padding-left: 14px; }\n    .lists-widget ol.blur ol {\n      counter-reset: section; }\n      .lists-widget ol.blur ol > li:before {\n        width: 30px; }\n      .lists-widget ol.blur ol > li span {\n        padding-left: 27px; }\n      .lists-widget ol.blur ol ol > li:before {\n        width: 40px; }\n      .lists-widget ol.blur ol ol > li span {\n        padding-left: 40px; }\n\n.columns-section {\n  background-color: #ffffff; }\n\np {\n  margin-bottom: 12px;\n  font-family: \"PingFang SC\", -apple-system, BlinkMacSystemFont, \"Roboto\", \"Century Gothic\", BlinkMacSystemFont, \"Segoe UI\", \"Microsoft yahei\", \"微软雅黑\", \"Helvetica Neue\", sans-serif, SimHei;\n  font-size: 14px; }\n\np.small-text {\n  color: rgba(255, 255, 255, 0.5);\n  font-size: 12px;\n  line-height: 16px;\n  margin-bottom: 8px; }\n\n.cols-two {\n  margin-bottom: 50px; }\n  .cols-two > div {\n    float: left;\n    width: 350px;\n    margin-left: 40px; }\n    .cols-two > div:first-child {\n      margin-left: 0; }\n\n.cols-three {\n  margin-bottom: 50px; }\n  .cols-three > div {\n    float: left;\n    width: 222px;\n    margin-left: 40px; }\n    .cols-three > div:first-child {\n      margin-left: 0; }\n\na.learn-more {\n  font-size: 14px;\n  font-weight: 700;\n  text-decoration: none;\n  line-height: 24px; }\n\n.img-wrapper {\n  margin-bottom: 19px;\n  margin-top: 5px;\n  overflow: hidden;\n  height: 180px; }\n  .img-wrapper img {\n    width: 100%; }\n\n.cols-three p {\n  margin-bottom: 10px; }\n\n.banner {\n  position: relative;\n  margin-bottom: 20px; }\n\n.large-banner-wrapper {\n  overflow: hidden;\n  height: 400px; }\n  .large-banner-wrapper img {\n    height: 100%;\n    width: 100%;\n    display: block; }\n\n.banner-text-wrapper {\n  margin-top: -400px;\n  height: 400px;\n  text-align: center; }\n\n.banner-text {\n  padding: 85px 90px 60px;\n  display: inline-block;\n  margin: 67px auto;\n  background: #ffffff;\n  min-width: 432px;\n  overflow: hidden;\n  background: rgba(0, 0, 0, 0.75); }\n  .banner-text h1 {\n    font-weight: 700;\n    width: 100%;\n    color: #ffffff;\n    margin-bottom: 10px; }\n  .banner-text p {\n    font-size: 24px;\n    line-height: 30px;\n    font-weight: 300;\n    color: #017170;\n    margin-bottom: 0px; }\n\n@media (max-width: 600px) {\n  .banner-text {\n    padding: 55px 60px 30px;\n    min-width: 0; }\n    .banner-text h1 {\n      font-size: 24px; }\n    .banner-text p {\n      font-size: 16px; } }\n\n@media (max-width: 400px) {\n  .banner-text {\n    min-width: 0;\n    width: 100%;\n    height: 100%;\n    margin: 0; } }\n\n.photo-desc {\n  margin-top: 12px;\n  text-align: center; }\n\n.text-info {\n  width: 90%; }\n  .text-info p {\n    margin-bottom: 10px; }\n\n.section-block {\n  padding-bottom: 12px; }\n\n.separator {\n  height: 1px;\n  background: rgba(255, 255, 255, 0.3);\n  width: 100%;\n  margin-bottom: 19px;\n  margin-top: 16px; }\n\n.section {\n  padding: 0 20px 50px 20px; }\n\n.card.banner-column-panel {\n  padding: 0;\n  margin-bottom: 90px; }\n  .card.banner-column-panel .card-body {\n    padding: 0; }\n\n@media screen and (min-width: 1620px) {\n  .col-xlg-1 {\n    width: 8.33333333%;\n    flex: 0 0 8.33333333%; }\n  .col-xlg-2 {\n    width: 16.66666667%;\n    flex: 0 0 16.66666667%; }\n  .col-xlg-3 {\n    width: 25%;\n    flex: 0 0 25%; }\n  .col-xlg-4 {\n    width: 33.33333333%;\n    flex: 0 0 33.33333333%; }\n  .col-xlg-5 {\n    width: 41.66666667%;\n    flex: 0 0 41.66666667%; }\n  .col-xlg-6 {\n    width: 50%;\n    flex: 0 0 50%; }\n  .col-xlg-7 {\n    width: 58.33333333%;\n    flex: 0 0 58.33333333%; }\n  .col-xlg-8 {\n    width: 66.66666667%;\n    flex: 0 0 66.66666667%; }\n  .col-xlg-9 {\n    width: 75%;\n    flex: 0 0 75%; }\n  .col-xlg-10 {\n    width: 83.33333333%;\n    flex: 0 0 83.33333333%; }\n  .col-xlg-11 {\n    width: 91.66666667%;\n    flex: 0 0 91.66666667%; }\n  .col-xlg-12 {\n    width: 100%;\n    flex: 0 0 100%; } }\n\n.btn:focus, .btn:active:focus, .btn.active:focus,\n.btn.focus, .btn:active.focus, .btn.active.focus {\n  outline: none; }\n\n.btn {\n  border-radius: 2px;\n  transition: all 0.1s ease;\n  padding: 0rem 1rem;\n  min-height: 2.3rem;\n  line-height: 2.3rem;\n  font-size: 0.9rem; }\n\n.open > .btn.dropdown-toggle.btn.btn-default {\n  background: #23282d;\n  border-color: #0b1015;\n  background-color: #101920;\n  border-color: #101920; }\n  .open > .btn.dropdown-toggle.btn.btn-default + .dropdown-menu > .dropdown-item > a:hover {\n    color: white;\n    background-color: #23282d !important; }\n\n.open > .btn.dropdown-toggle.btn.btn-primary {\n  background: #017170;\n  border-color: #005958;\n  background-color: #01605f;\n  border-color: #01605f; }\n  .open > .btn.dropdown-toggle.btn.btn-primary + .dropdown-menu > .dropdown-item > a:hover {\n    color: white;\n    background-color: #017170 !important; }\n\n.open > .btn.dropdown-toggle.btn-success {\n  background: #287562;\n  border-color: #105d4a;\n  background-color: #226353;\n  border-color: #226353; }\n  .open > .btn.dropdown-toggle.btn-success + .dropdown-menu > .dropdown-item > a:hover {\n    color: white;\n    background-color: #287562 !important; }\n\n.open > .btn.dropdown-toggle.btn-info {\n  background: #3498db;\n  border-color: #1c80c3;\n  background-color: #2c81ba;\n  border-color: #2c81ba; }\n  .open > .btn.dropdown-toggle.btn-info + .dropdown-menu > .dropdown-item > a:hover {\n    color: white;\n    background-color: #3498db !important; }\n\n.open > .btn.dropdown-toggle.btn-warning {\n  background: #f39c12;\n  border-color: #db8400;\n  background-color: #cf850f;\n  border-color: #cf850f; }\n  .open > .btn.dropdown-toggle.btn-warning + .dropdown-menu > .dropdown-item > a:hover {\n    color: white;\n    background-color: #f39c12 !important; }\n\n.open > .btn.dropdown-toggle.btn-danger {\n  background: #e74c3c;\n  border-color: #cf3424;\n  background-color: #c44133;\n  border-color: #c44133; }\n  .open > .btn.dropdown-toggle.btn-danger + .dropdown-menu > .dropdown-item > a:hover {\n    color: white;\n    background-color: #e74c3c !important; }\n\na.btn.btn-primary,\nbutton.btn.btn-primary {\n  background: #017170;\n  border-color: #017170; }\n  a.btn.btn-primary.disabled, a.btn.btn-primary[disabled],\n  fieldset[disabled] a.btn.btn-primary, a.btn.btn-primary.disabled:hover, a.btn.btn-primary[disabled]:hover,\n  fieldset[disabled] a.btn.btn-primary:hover, a.btn.btn-primary.disabled:focus, a.btn.btn-primary[disabled]:focus,\n  fieldset[disabled] a.btn.btn-primary:focus, a.btn.btn-primary.disabled.focus, a.btn.btn-primary[disabled].focus,\n  fieldset[disabled] a.btn.btn-primary.focus, a.btn.btn-primary.disabled:active, a.btn.btn-primary[disabled]:active,\n  fieldset[disabled] a.btn.btn-primary:active, a.btn.btn-primary.disabled.active, a.btn.btn-primary[disabled].active,\n  fieldset[disabled] a.btn.btn-primary.active,\n  button.btn.btn-primary.disabled,\n  button.btn.btn-primary[disabled],\n  fieldset[disabled]\n  button.btn.btn-primary,\n  button.btn.btn-primary.disabled:hover,\n  button.btn.btn-primary[disabled]:hover,\n  fieldset[disabled]\n  button.btn.btn-primary:hover,\n  button.btn.btn-primary.disabled:focus,\n  button.btn.btn-primary[disabled]:focus,\n  fieldset[disabled]\n  button.btn.btn-primary:focus,\n  button.btn.btn-primary.disabled.focus,\n  button.btn.btn-primary[disabled].focus,\n  fieldset[disabled]\n  button.btn.btn-primary.focus,\n  button.btn.btn-primary.disabled:active,\n  button.btn.btn-primary[disabled]:active,\n  fieldset[disabled]\n  button.btn.btn-primary:active,\n  button.btn.btn-primary.disabled.active,\n  button.btn.btn-primary[disabled].active,\n  fieldset[disabled]\n  button.btn.btn-primary.active {\n    background: #017170;\n    border-color: #0d7d7c; }\n    a.btn.btn-primary.disabled:hover, a.btn.btn-primary[disabled]:hover,\n    fieldset[disabled] a.btn.btn-primary:hover, a.btn.btn-primary.disabled:hover:hover, a.btn.btn-primary[disabled]:hover:hover,\n    fieldset[disabled] a.btn.btn-primary:hover:hover, a.btn.btn-primary.disabled:focus:hover, a.btn.btn-primary[disabled]:focus:hover,\n    fieldset[disabled] a.btn.btn-primary:focus:hover, a.btn.btn-primary.disabled.focus:hover, a.btn.btn-primary[disabled].focus:hover,\n    fieldset[disabled] a.btn.btn-primary.focus:hover, a.btn.btn-primary.disabled:active:hover, a.btn.btn-primary[disabled]:active:hover,\n    fieldset[disabled] a.btn.btn-primary:active:hover, a.btn.btn-primary.disabled.active:hover, a.btn.btn-primary[disabled].active:hover,\n    fieldset[disabled] a.btn.btn-primary.active:hover,\n    button.btn.btn-primary.disabled:hover,\n    button.btn.btn-primary[disabled]:hover,\n    fieldset[disabled]\n    button.btn.btn-primary:hover,\n    button.btn.btn-primary.disabled:hover:hover,\n    button.btn.btn-primary[disabled]:hover:hover,\n    fieldset[disabled]\n    button.btn.btn-primary:hover:hover,\n    button.btn.btn-primary.disabled:focus:hover,\n    button.btn.btn-primary[disabled]:focus:hover,\n    fieldset[disabled]\n    button.btn.btn-primary:focus:hover,\n    button.btn.btn-primary.disabled.focus:hover,\n    button.btn.btn-primary[disabled].focus:hover,\n    fieldset[disabled]\n    button.btn.btn-primary.focus:hover,\n    button.btn.btn-primary.disabled:active:hover,\n    button.btn.btn-primary[disabled]:active:hover,\n    fieldset[disabled]\n    button.btn.btn-primary:active:hover,\n    button.btn.btn-primary.disabled.active:hover,\n    button.btn.btn-primary[disabled].active:hover,\n    fieldset[disabled]\n    button.btn.btn-primary.active:hover {\n      transform: none; }\n  a.btn.btn-primary:focus,\n  button.btn.btn-primary:focus {\n    background: #017170;\n    border-color: #017170; }\n  a.btn.btn-primary:hover, a.btn.btn-primary.focus, a.btn.btn-primary:active, a.btn.btn-primary.active,\n  button.btn.btn-primary:hover,\n  button.btn.btn-primary.focus,\n  button.btn.btn-primary:active,\n  button.btn.btn-primary.active {\n    background: #018a89;\n    border-color: #018a89; }\n  a.btn.btn-primary:active, a.btn.btn-primary:target,\n  button.btn.btn-primary:active,\n  button.btn.btn-primary:target {\n    background-color: #01605f; }\n\na.btn.btn-default,\nbutton.btn.btn-default {\n  border-width: 1px;\n  color: #ffffff;\n  background: #23282d;\n  border-color: #101920; }\n  a.btn.btn-default.disabled, a.btn.btn-default[disabled],\n  fieldset[disabled] a.btn.btn-default, a.btn.btn-default.disabled:hover, a.btn.btn-default[disabled]:hover,\n  fieldset[disabled] a.btn.btn-default:hover, a.btn.btn-default.disabled:focus, a.btn.btn-default[disabled]:focus,\n  fieldset[disabled] a.btn.btn-default:focus, a.btn.btn-default.disabled.focus, a.btn.btn-default[disabled].focus,\n  fieldset[disabled] a.btn.btn-default.focus, a.btn.btn-default.disabled:active, a.btn.btn-default[disabled]:active,\n  fieldset[disabled] a.btn.btn-default:active, a.btn.btn-default.disabled.active, a.btn.btn-default[disabled].active,\n  fieldset[disabled] a.btn.btn-default.active,\n  button.btn.btn-default.disabled,\n  button.btn.btn-default[disabled],\n  fieldset[disabled]\n  button.btn.btn-default,\n  button.btn.btn-default.disabled:hover,\n  button.btn.btn-default[disabled]:hover,\n  fieldset[disabled]\n  button.btn.btn-default:hover,\n  button.btn.btn-default.disabled:focus,\n  button.btn.btn-default[disabled]:focus,\n  fieldset[disabled]\n  button.btn.btn-default:focus,\n  button.btn.btn-default.disabled.focus,\n  button.btn.btn-default[disabled].focus,\n  fieldset[disabled]\n  button.btn.btn-default.focus,\n  button.btn.btn-default.disabled:active,\n  button.btn.btn-default[disabled]:active,\n  fieldset[disabled]\n  button.btn.btn-default:active,\n  button.btn.btn-default.disabled.active,\n  button.btn.btn-default[disabled].active,\n  fieldset[disabled]\n  button.btn.btn-default.active {\n    background: #23282d;\n    border-color: #1c252c; }\n    a.btn.btn-default.disabled:hover, a.btn.btn-default[disabled]:hover,\n    fieldset[disabled] a.btn.btn-default:hover, a.btn.btn-default.disabled:hover:hover, a.btn.btn-default[disabled]:hover:hover,\n    fieldset[disabled] a.btn.btn-default:hover:hover, a.btn.btn-default.disabled:focus:hover, a.btn.btn-default[disabled]:focus:hover,\n    fieldset[disabled] a.btn.btn-default:focus:hover, a.btn.btn-default.disabled.focus:hover, a.btn.btn-default[disabled].focus:hover,\n    fieldset[disabled] a.btn.btn-default.focus:hover, a.btn.btn-default.disabled:active:hover, a.btn.btn-default[disabled]:active:hover,\n    fieldset[disabled] a.btn.btn-default:active:hover, a.btn.btn-default.disabled.active:hover, a.btn.btn-default[disabled].active:hover,\n    fieldset[disabled] a.btn.btn-default.active:hover,\n    button.btn.btn-default.disabled:hover,\n    button.btn.btn-default[disabled]:hover,\n    fieldset[disabled]\n    button.btn.btn-default:hover,\n    button.btn.btn-default.disabled:hover:hover,\n    button.btn.btn-default[disabled]:hover:hover,\n    fieldset[disabled]\n    button.btn.btn-default:hover:hover,\n    button.btn.btn-default.disabled:focus:hover,\n    button.btn.btn-default[disabled]:focus:hover,\n    fieldset[disabled]\n    button.btn.btn-default:focus:hover,\n    button.btn.btn-default.disabled.focus:hover,\n    button.btn.btn-default[disabled].focus:hover,\n    fieldset[disabled]\n    button.btn.btn-default.focus:hover,\n    button.btn.btn-default.disabled:active:hover,\n    button.btn.btn-default[disabled]:active:hover,\n    fieldset[disabled]\n    button.btn.btn-default:active:hover,\n    button.btn.btn-default.disabled.active:hover,\n    button.btn.btn-default[disabled].active:hover,\n    fieldset[disabled]\n    button.btn.btn-default.active:hover {\n      transform: none; }\n  a.btn.btn-default:focus,\n  button.btn.btn-default:focus {\n    background: #23282d;\n    border-color: #101920; }\n  a.btn.btn-default:hover, a.btn.btn-default.focus, a.btn.btn-default:active, a.btn.btn-default.active,\n  button.btn.btn-default:hover,\n  button.btn.btn-default.focus,\n  button.btn.btn-default:active,\n  button.btn.btn-default.active {\n    background: #2e353b;\n    border-color: #192631; }\n  a.btn.btn-default.active, a.btn.btn-default:active, a.btn.btn-default:target,\n  button.btn.btn-default.active,\n  button.btn.btn-default:active,\n  button.btn.btn-default:target {\n    background-color: rgba(0, 0, 0, 0.2);\n    color: #ffffff; }\n\na.btn.btn-success,\nbutton.btn.btn-success {\n  background: #287562;\n  border-color: #287562; }\n  a.btn.btn-success.disabled, a.btn.btn-success[disabled],\n  fieldset[disabled] a.btn.btn-success, a.btn.btn-success.disabled:hover, a.btn.btn-success[disabled]:hover,\n  fieldset[disabled] a.btn.btn-success:hover, a.btn.btn-success.disabled:focus, a.btn.btn-success[disabled]:focus,\n  fieldset[disabled] a.btn.btn-success:focus, a.btn.btn-success.disabled.focus, a.btn.btn-success[disabled].focus,\n  fieldset[disabled] a.btn.btn-success.focus, a.btn.btn-success.disabled:active, a.btn.btn-success[disabled]:active,\n  fieldset[disabled] a.btn.btn-success:active, a.btn.btn-success.disabled.active, a.btn.btn-success[disabled].active,\n  fieldset[disabled] a.btn.btn-success.active,\n  button.btn.btn-success.disabled,\n  button.btn.btn-success[disabled],\n  fieldset[disabled]\n  button.btn.btn-success,\n  button.btn.btn-success.disabled:hover,\n  button.btn.btn-success[disabled]:hover,\n  fieldset[disabled]\n  button.btn.btn-success:hover,\n  button.btn.btn-success.disabled:focus,\n  button.btn.btn-success[disabled]:focus,\n  fieldset[disabled]\n  button.btn.btn-success:focus,\n  button.btn.btn-success.disabled.focus,\n  button.btn.btn-success[disabled].focus,\n  fieldset[disabled]\n  button.btn.btn-success.focus,\n  button.btn.btn-success.disabled:active,\n  button.btn.btn-success[disabled]:active,\n  fieldset[disabled]\n  button.btn.btn-success:active,\n  button.btn.btn-success.disabled.active,\n  button.btn.btn-success[disabled].active,\n  fieldset[disabled]\n  button.btn.btn-success.active {\n    background: #287562;\n    border-color: #34816e; }\n    a.btn.btn-success.disabled:hover, a.btn.btn-success[disabled]:hover,\n    fieldset[disabled] a.btn.btn-success:hover, a.btn.btn-success.disabled:hover:hover, a.btn.btn-success[disabled]:hover:hover,\n    fieldset[disabled] a.btn.btn-success:hover:hover, a.btn.btn-success.disabled:focus:hover, a.btn.btn-success[disabled]:focus:hover,\n    fieldset[disabled] a.btn.btn-success:focus:hover, a.btn.btn-success.disabled.focus:hover, a.btn.btn-success[disabled].focus:hover,\n    fieldset[disabled] a.btn.btn-success.focus:hover, a.btn.btn-success.disabled:active:hover, a.btn.btn-success[disabled]:active:hover,\n    fieldset[disabled] a.btn.btn-success:active:hover, a.btn.btn-success.disabled.active:hover, a.btn.btn-success[disabled].active:hover,\n    fieldset[disabled] a.btn.btn-success.active:hover,\n    button.btn.btn-success.disabled:hover,\n    button.btn.btn-success[disabled]:hover,\n    fieldset[disabled]\n    button.btn.btn-success:hover,\n    button.btn.btn-success.disabled:hover:hover,\n    button.btn.btn-success[disabled]:hover:hover,\n    fieldset[disabled]\n    button.btn.btn-success:hover:hover,\n    button.btn.btn-success.disabled:focus:hover,\n    button.btn.btn-success[disabled]:focus:hover,\n    fieldset[disabled]\n    button.btn.btn-success:focus:hover,\n    button.btn.btn-success.disabled.focus:hover,\n    button.btn.btn-success[disabled].focus:hover,\n    fieldset[disabled]\n    button.btn.btn-success.focus:hover,\n    button.btn.btn-success.disabled:active:hover,\n    button.btn.btn-success[disabled]:active:hover,\n    fieldset[disabled]\n    button.btn.btn-success:active:hover,\n    button.btn.btn-success.disabled.active:hover,\n    button.btn.btn-success[disabled].active:hover,\n    fieldset[disabled]\n    button.btn.btn-success.active:hover {\n      transform: none; }\n  a.btn.btn-success:focus,\n  button.btn.btn-success:focus {\n    background: #287562;\n    border-color: #287562; }\n  a.btn.btn-success:hover, a.btn.btn-success.focus, a.btn.btn-success:active, a.btn.btn-success.active,\n  button.btn.btn-success:hover,\n  button.btn.btn-success.focus,\n  button.btn.btn-success:active,\n  button.btn.btn-success.active {\n    background: #2e8872;\n    border-color: #2e8872; }\n  a.btn.btn-success:active, a.btn.btn-success:target,\n  button.btn.btn-success:active,\n  button.btn.btn-success:target {\n    background-color: #226353; }\n\na.btn.btn-info,\nbutton.btn.btn-info {\n  background: #3498db;\n  border-color: #3498db; }\n  a.btn.btn-info.disabled, a.btn.btn-info[disabled],\n  fieldset[disabled] a.btn.btn-info, a.btn.btn-info.disabled:hover, a.btn.btn-info[disabled]:hover,\n  fieldset[disabled] a.btn.btn-info:hover, a.btn.btn-info.disabled:focus, a.btn.btn-info[disabled]:focus,\n  fieldset[disabled] a.btn.btn-info:focus, a.btn.btn-info.disabled.focus, a.btn.btn-info[disabled].focus,\n  fieldset[disabled] a.btn.btn-info.focus, a.btn.btn-info.disabled:active, a.btn.btn-info[disabled]:active,\n  fieldset[disabled] a.btn.btn-info:active, a.btn.btn-info.disabled.active, a.btn.btn-info[disabled].active,\n  fieldset[disabled] a.btn.btn-info.active,\n  button.btn.btn-info.disabled,\n  button.btn.btn-info[disabled],\n  fieldset[disabled]\n  button.btn.btn-info,\n  button.btn.btn-info.disabled:hover,\n  button.btn.btn-info[disabled]:hover,\n  fieldset[disabled]\n  button.btn.btn-info:hover,\n  button.btn.btn-info.disabled:focus,\n  button.btn.btn-info[disabled]:focus,\n  fieldset[disabled]\n  button.btn.btn-info:focus,\n  button.btn.btn-info.disabled.focus,\n  button.btn.btn-info[disabled].focus,\n  fieldset[disabled]\n  button.btn.btn-info.focus,\n  button.btn.btn-info.disabled:active,\n  button.btn.btn-info[disabled]:active,\n  fieldset[disabled]\n  button.btn.btn-info:active,\n  button.btn.btn-info.disabled.active,\n  button.btn.btn-info[disabled].active,\n  fieldset[disabled]\n  button.btn.btn-info.active {\n    background: #3498db;\n    border-color: #40a4e7; }\n    a.btn.btn-info.disabled:hover, a.btn.btn-info[disabled]:hover,\n    fieldset[disabled] a.btn.btn-info:hover, a.btn.btn-info.disabled:hover:hover, a.btn.btn-info[disabled]:hover:hover,\n    fieldset[disabled] a.btn.btn-info:hover:hover, a.btn.btn-info.disabled:focus:hover, a.btn.btn-info[disabled]:focus:hover,\n    fieldset[disabled] a.btn.btn-info:focus:hover, a.btn.btn-info.disabled.focus:hover, a.btn.btn-info[disabled].focus:hover,\n    fieldset[disabled] a.btn.btn-info.focus:hover, a.btn.btn-info.disabled:active:hover, a.btn.btn-info[disabled]:active:hover,\n    fieldset[disabled] a.btn.btn-info:active:hover, a.btn.btn-info.disabled.active:hover, a.btn.btn-info[disabled].active:hover,\n    fieldset[disabled] a.btn.btn-info.active:hover,\n    button.btn.btn-info.disabled:hover,\n    button.btn.btn-info[disabled]:hover,\n    fieldset[disabled]\n    button.btn.btn-info:hover,\n    button.btn.btn-info.disabled:hover:hover,\n    button.btn.btn-info[disabled]:hover:hover,\n    fieldset[disabled]\n    button.btn.btn-info:hover:hover,\n    button.btn.btn-info.disabled:focus:hover,\n    button.btn.btn-info[disabled]:focus:hover,\n    fieldset[disabled]\n    button.btn.btn-info:focus:hover,\n    button.btn.btn-info.disabled.focus:hover,\n    button.btn.btn-info[disabled].focus:hover,\n    fieldset[disabled]\n    button.btn.btn-info.focus:hover,\n    button.btn.btn-info.disabled:active:hover,\n    button.btn.btn-info[disabled]:active:hover,\n    fieldset[disabled]\n    button.btn.btn-info:active:hover,\n    button.btn.btn-info.disabled.active:hover,\n    button.btn.btn-info[disabled].active:hover,\n    fieldset[disabled]\n    button.btn.btn-info.active:hover {\n      transform: none; }\n  a.btn.btn-info:focus,\n  button.btn.btn-info:focus {\n    background: #3498db;\n    border-color: #3498db; }\n  a.btn.btn-info:hover, a.btn.btn-info.focus, a.btn.btn-info:active, a.btn.btn-info.active,\n  button.btn.btn-info:hover,\n  button.btn.btn-info.focus,\n  button.btn.btn-info:active,\n  button.btn.btn-info.active {\n    background: #4aa3df;\n    border-color: #4aa3df; }\n  a.btn.btn-info:active, a.btn.btn-info:target,\n  button.btn.btn-info:active,\n  button.btn.btn-info:target {\n    background-color: #2c81ba; }\n\na.btn.btn-warning,\nbutton.btn.btn-warning {\n  background: #f39c12;\n  border-color: #f39c12; }\n  a.btn.btn-warning.disabled, a.btn.btn-warning[disabled],\n  fieldset[disabled] a.btn.btn-warning, a.btn.btn-warning.disabled:hover, a.btn.btn-warning[disabled]:hover,\n  fieldset[disabled] a.btn.btn-warning:hover, a.btn.btn-warning.disabled:focus, a.btn.btn-warning[disabled]:focus,\n  fieldset[disabled] a.btn.btn-warning:focus, a.btn.btn-warning.disabled.focus, a.btn.btn-warning[disabled].focus,\n  fieldset[disabled] a.btn.btn-warning.focus, a.btn.btn-warning.disabled:active, a.btn.btn-warning[disabled]:active,\n  fieldset[disabled] a.btn.btn-warning:active, a.btn.btn-warning.disabled.active, a.btn.btn-warning[disabled].active,\n  fieldset[disabled] a.btn.btn-warning.active,\n  button.btn.btn-warning.disabled,\n  button.btn.btn-warning[disabled],\n  fieldset[disabled]\n  button.btn.btn-warning,\n  button.btn.btn-warning.disabled:hover,\n  button.btn.btn-warning[disabled]:hover,\n  fieldset[disabled]\n  button.btn.btn-warning:hover,\n  button.btn.btn-warning.disabled:focus,\n  button.btn.btn-warning[disabled]:focus,\n  fieldset[disabled]\n  button.btn.btn-warning:focus,\n  button.btn.btn-warning.disabled.focus,\n  button.btn.btn-warning[disabled].focus,\n  fieldset[disabled]\n  button.btn.btn-warning.focus,\n  button.btn.btn-warning.disabled:active,\n  button.btn.btn-warning[disabled]:active,\n  fieldset[disabled]\n  button.btn.btn-warning:active,\n  button.btn.btn-warning.disabled.active,\n  button.btn.btn-warning[disabled].active,\n  fieldset[disabled]\n  button.btn.btn-warning.active {\n    background: #f39c12;\n    border-color: #ffa81e; }\n    a.btn.btn-warning.disabled:hover, a.btn.btn-warning[disabled]:hover,\n    fieldset[disabled] a.btn.btn-warning:hover, a.btn.btn-warning.disabled:hover:hover, a.btn.btn-warning[disabled]:hover:hover,\n    fieldset[disabled] a.btn.btn-warning:hover:hover, a.btn.btn-warning.disabled:focus:hover, a.btn.btn-warning[disabled]:focus:hover,\n    fieldset[disabled] a.btn.btn-warning:focus:hover, a.btn.btn-warning.disabled.focus:hover, a.btn.btn-warning[disabled].focus:hover,\n    fieldset[disabled] a.btn.btn-warning.focus:hover, a.btn.btn-warning.disabled:active:hover, a.btn.btn-warning[disabled]:active:hover,\n    fieldset[disabled] a.btn.btn-warning:active:hover, a.btn.btn-warning.disabled.active:hover, a.btn.btn-warning[disabled].active:hover,\n    fieldset[disabled] a.btn.btn-warning.active:hover,\n    button.btn.btn-warning.disabled:hover,\n    button.btn.btn-warning[disabled]:hover,\n    fieldset[disabled]\n    button.btn.btn-warning:hover,\n    button.btn.btn-warning.disabled:hover:hover,\n    button.btn.btn-warning[disabled]:hover:hover,\n    fieldset[disabled]\n    button.btn.btn-warning:hover:hover,\n    button.btn.btn-warning.disabled:focus:hover,\n    button.btn.btn-warning[disabled]:focus:hover,\n    fieldset[disabled]\n    button.btn.btn-warning:focus:hover,\n    button.btn.btn-warning.disabled.focus:hover,\n    button.btn.btn-warning[disabled].focus:hover,\n    fieldset[disabled]\n    button.btn.btn-warning.focus:hover,\n    button.btn.btn-warning.disabled:active:hover,\n    button.btn.btn-warning[disabled]:active:hover,\n    fieldset[disabled]\n    button.btn.btn-warning:active:hover,\n    button.btn.btn-warning.disabled.active:hover,\n    button.btn.btn-warning[disabled].active:hover,\n    fieldset[disabled]\n    button.btn.btn-warning.active:hover {\n      transform: none; }\n  a.btn.btn-warning:focus,\n  button.btn.btn-warning:focus {\n    background: #f39c12;\n    border-color: #f39c12; }\n  a.btn.btn-warning:hover, a.btn.btn-warning.focus, a.btn.btn-warning:active, a.btn.btn-warning.active,\n  button.btn.btn-warning:hover,\n  button.btn.btn-warning.focus,\n  button.btn.btn-warning:active,\n  button.btn.btn-warning.active {\n    background: #f4a62a;\n    border-color: #f4a62a; }\n  a.btn.btn-warning:active, a.btn.btn-warning:target,\n  button.btn.btn-warning:active,\n  button.btn.btn-warning:target {\n    background-color: #cf850f; }\n\na.btn.btn-danger,\nbutton.btn.btn-danger {\n  background: #e74c3c;\n  border-color: #e74c3c; }\n  a.btn.btn-danger.disabled, a.btn.btn-danger[disabled],\n  fieldset[disabled] a.btn.btn-danger, a.btn.btn-danger.disabled:hover, a.btn.btn-danger[disabled]:hover,\n  fieldset[disabled] a.btn.btn-danger:hover, a.btn.btn-danger.disabled:focus, a.btn.btn-danger[disabled]:focus,\n  fieldset[disabled] a.btn.btn-danger:focus, a.btn.btn-danger.disabled.focus, a.btn.btn-danger[disabled].focus,\n  fieldset[disabled] a.btn.btn-danger.focus, a.btn.btn-danger.disabled:active, a.btn.btn-danger[disabled]:active,\n  fieldset[disabled] a.btn.btn-danger:active, a.btn.btn-danger.disabled.active, a.btn.btn-danger[disabled].active,\n  fieldset[disabled] a.btn.btn-danger.active,\n  button.btn.btn-danger.disabled,\n  button.btn.btn-danger[disabled],\n  fieldset[disabled]\n  button.btn.btn-danger,\n  button.btn.btn-danger.disabled:hover,\n  button.btn.btn-danger[disabled]:hover,\n  fieldset[disabled]\n  button.btn.btn-danger:hover,\n  button.btn.btn-danger.disabled:focus,\n  button.btn.btn-danger[disabled]:focus,\n  fieldset[disabled]\n  button.btn.btn-danger:focus,\n  button.btn.btn-danger.disabled.focus,\n  button.btn.btn-danger[disabled].focus,\n  fieldset[disabled]\n  button.btn.btn-danger.focus,\n  button.btn.btn-danger.disabled:active,\n  button.btn.btn-danger[disabled]:active,\n  fieldset[disabled]\n  button.btn.btn-danger:active,\n  button.btn.btn-danger.disabled.active,\n  button.btn.btn-danger[disabled].active,\n  fieldset[disabled]\n  button.btn.btn-danger.active {\n    background: #e74c3c;\n    border-color: #f35848; }\n    a.btn.btn-danger.disabled:hover, a.btn.btn-danger[disabled]:hover,\n    fieldset[disabled] a.btn.btn-danger:hover, a.btn.btn-danger.disabled:hover:hover, a.btn.btn-danger[disabled]:hover:hover,\n    fieldset[disabled] a.btn.btn-danger:hover:hover, a.btn.btn-danger.disabled:focus:hover, a.btn.btn-danger[disabled]:focus:hover,\n    fieldset[disabled] a.btn.btn-danger:focus:hover, a.btn.btn-danger.disabled.focus:hover, a.btn.btn-danger[disabled].focus:hover,\n    fieldset[disabled] a.btn.btn-danger.focus:hover, a.btn.btn-danger.disabled:active:hover, a.btn.btn-danger[disabled]:active:hover,\n    fieldset[disabled] a.btn.btn-danger:active:hover, a.btn.btn-danger.disabled.active:hover, a.btn.btn-danger[disabled].active:hover,\n    fieldset[disabled] a.btn.btn-danger.active:hover,\n    button.btn.btn-danger.disabled:hover,\n    button.btn.btn-danger[disabled]:hover,\n    fieldset[disabled]\n    button.btn.btn-danger:hover,\n    button.btn.btn-danger.disabled:hover:hover,\n    button.btn.btn-danger[disabled]:hover:hover,\n    fieldset[disabled]\n    button.btn.btn-danger:hover:hover,\n    button.btn.btn-danger.disabled:focus:hover,\n    button.btn.btn-danger[disabled]:focus:hover,\n    fieldset[disabled]\n    button.btn.btn-danger:focus:hover,\n    button.btn.btn-danger.disabled.focus:hover,\n    button.btn.btn-danger[disabled].focus:hover,\n    fieldset[disabled]\n    button.btn.btn-danger.focus:hover,\n    button.btn.btn-danger.disabled:active:hover,\n    button.btn.btn-danger[disabled]:active:hover,\n    fieldset[disabled]\n    button.btn.btn-danger:active:hover,\n    button.btn.btn-danger.disabled.active:hover,\n    button.btn.btn-danger[disabled].active:hover,\n    fieldset[disabled]\n    button.btn.btn-danger.active:hover {\n      transform: none; }\n  a.btn.btn-danger:focus,\n  button.btn.btn-danger:focus {\n    background: #e74c3c;\n    border-color: #e74c3c; }\n  a.btn.btn-danger:hover, a.btn.btn-danger.focus, a.btn.btn-danger:active, a.btn.btn-danger.active,\n  button.btn.btn-danger:hover,\n  button.btn.btn-danger.focus,\n  button.btn.btn-danger:active,\n  button.btn.btn-danger.active {\n    background: #ea6153;\n    border-color: #ea6153; }\n  a.btn.btn-danger:active, a.btn.btn-danger:target,\n  button.btn.btn-danger:active,\n  button.btn.btn-danger:target {\n    background-color: #c44133; }\n\na.btn.btn-inverse,\nbutton.btn.btn-inverse {\n  background: rgba(255, 255, 255, 0.5);\n  border-color: rgba(255, 255, 255, 0.5);\n  color: #ffffff; }\n  a.btn.btn-inverse.disabled, a.btn.btn-inverse[disabled],\n  fieldset[disabled] a.btn.btn-inverse, a.btn.btn-inverse.disabled:hover, a.btn.btn-inverse[disabled]:hover,\n  fieldset[disabled] a.btn.btn-inverse:hover, a.btn.btn-inverse.disabled:focus, a.btn.btn-inverse[disabled]:focus,\n  fieldset[disabled] a.btn.btn-inverse:focus, a.btn.btn-inverse.disabled.focus, a.btn.btn-inverse[disabled].focus,\n  fieldset[disabled] a.btn.btn-inverse.focus, a.btn.btn-inverse.disabled:active, a.btn.btn-inverse[disabled]:active,\n  fieldset[disabled] a.btn.btn-inverse:active, a.btn.btn-inverse.disabled.active, a.btn.btn-inverse[disabled].active,\n  fieldset[disabled] a.btn.btn-inverse.active,\n  button.btn.btn-inverse.disabled,\n  button.btn.btn-inverse[disabled],\n  fieldset[disabled]\n  button.btn.btn-inverse,\n  button.btn.btn-inverse.disabled:hover,\n  button.btn.btn-inverse[disabled]:hover,\n  fieldset[disabled]\n  button.btn.btn-inverse:hover,\n  button.btn.btn-inverse.disabled:focus,\n  button.btn.btn-inverse[disabled]:focus,\n  fieldset[disabled]\n  button.btn.btn-inverse:focus,\n  button.btn.btn-inverse.disabled.focus,\n  button.btn.btn-inverse[disabled].focus,\n  fieldset[disabled]\n  button.btn.btn-inverse.focus,\n  button.btn.btn-inverse.disabled:active,\n  button.btn.btn-inverse[disabled]:active,\n  fieldset[disabled]\n  button.btn.btn-inverse:active,\n  button.btn.btn-inverse.disabled.active,\n  button.btn.btn-inverse[disabled].active,\n  fieldset[disabled]\n  button.btn.btn-inverse.active {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(255, 255, 255, 0.5); }\n    a.btn.btn-inverse.disabled:hover, a.btn.btn-inverse[disabled]:hover,\n    fieldset[disabled] a.btn.btn-inverse:hover, a.btn.btn-inverse.disabled:hover:hover, a.btn.btn-inverse[disabled]:hover:hover,\n    fieldset[disabled] a.btn.btn-inverse:hover:hover, a.btn.btn-inverse.disabled:focus:hover, a.btn.btn-inverse[disabled]:focus:hover,\n    fieldset[disabled] a.btn.btn-inverse:focus:hover, a.btn.btn-inverse.disabled.focus:hover, a.btn.btn-inverse[disabled].focus:hover,\n    fieldset[disabled] a.btn.btn-inverse.focus:hover, a.btn.btn-inverse.disabled:active:hover, a.btn.btn-inverse[disabled]:active:hover,\n    fieldset[disabled] a.btn.btn-inverse:active:hover, a.btn.btn-inverse.disabled.active:hover, a.btn.btn-inverse[disabled].active:hover,\n    fieldset[disabled] a.btn.btn-inverse.active:hover,\n    button.btn.btn-inverse.disabled:hover,\n    button.btn.btn-inverse[disabled]:hover,\n    fieldset[disabled]\n    button.btn.btn-inverse:hover,\n    button.btn.btn-inverse.disabled:hover:hover,\n    button.btn.btn-inverse[disabled]:hover:hover,\n    fieldset[disabled]\n    button.btn.btn-inverse:hover:hover,\n    button.btn.btn-inverse.disabled:focus:hover,\n    button.btn.btn-inverse[disabled]:focus:hover,\n    fieldset[disabled]\n    button.btn.btn-inverse:focus:hover,\n    button.btn.btn-inverse.disabled.focus:hover,\n    button.btn.btn-inverse[disabled].focus:hover,\n    fieldset[disabled]\n    button.btn.btn-inverse.focus:hover,\n    button.btn.btn-inverse.disabled:active:hover,\n    button.btn.btn-inverse[disabled]:active:hover,\n    fieldset[disabled]\n    button.btn.btn-inverse:active:hover,\n    button.btn.btn-inverse.disabled.active:hover,\n    button.btn.btn-inverse[disabled].active:hover,\n    fieldset[disabled]\n    button.btn.btn-inverse.active:hover {\n      transform: none; }\n  a.btn.btn-inverse:focus,\n  button.btn.btn-inverse:focus {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(255, 255, 255, 0.5); }\n  a.btn.btn-inverse:hover, a.btn.btn-inverse.focus, a.btn.btn-inverse:active, a.btn.btn-inverse.active,\n  button.btn.btn-inverse:hover,\n  button.btn.btn-inverse.focus,\n  button.btn.btn-inverse:active,\n  button.btn.btn-inverse.active {\n    background: rgba(255, 255, 255, 0.5);\n    border-color: rgba(255, 255, 255, 0.5); }\n  a.btn.btn-inverse:active, a.btn.btn-inverse:target, a.btn.btn-inverse:hover,\n  button.btn.btn-inverse:active,\n  button.btn.btn-inverse:target,\n  button.btn.btn-inverse:hover {\n    background-color: rgba(255, 255, 255, 0.5);\n    color: #ffffff; }\n\n.btn-with-icon i {\n  margin-right: 10px; }\n\n.btn-group :hover, .btn-toolbar :hover {\n  transform: none; }\n\n.btn-group button.btn.btn-primary {\n  border-color: #006564; }\n  .btn-group button.btn.btn-primary:hover {\n    border-color: #005958; }\n\n.btn-group button.btn.btn-danger {\n  border-color: #db4030; }\n  .btn-group button.btn.btn-danger:hover {\n    border-color: #cf3424; }\n\n.btn-group button.btn.btn-info {\n  border-color: #288ccf; }\n  .btn-group button.btn.btn-info:hover {\n    border-color: #1c80c3; }\n\n.btn-group button.btn.btn-success {\n  border-color: #1c6956; }\n  .btn-group button.btn.btn-success:hover {\n    border-color: #105d4a; }\n\n.btn-group button.btn.btn-warning {\n  border-color: #e79006; }\n  .btn-group button.btn.btn-warning:hover {\n    border-color: #db8400; }\n\n.btn-toolbar {\n  display: inline-block; }\n\n.btn .caret {\n  margin-left: 2px; }\n\nbutton.progress-button .progress {\n  margin-bottom: 0;\n  border-radius: 0; }\n\nbutton.progress-button:hover {\n  transform: none; }\n\nbutton.progress-button.progress-button-style-shrink.btn.disabled.progress-button-dir-horizontal:hover {\n  transform: scaleY(0.3); }\n\nbutton.progress-button.progress-button-style-shrink.btn.disabled.progress-button-dir-vertical:hover {\n  transform: scaleX(0.1); }\n\nbutton.progress-button.btn.btn-primary {\n  border-radius: 0; }\n  button.progress-button.btn.btn-primary .content:after, button.progress-button.btn.btn-primary .content:before {\n    color: black; }\n  button.progress-button.btn.btn-primary.progress-button-style-move-up .content, button.progress-button.btn.btn-primary.progress-button-style-slide-down .content {\n    background-color: #013e3e; }\n  button.progress-button.btn.btn-primary.progress-button-style-lateral-lines .progress-inner {\n    border-color: #013e3e;\n    background: 0 0; }\n  button.progress-button.btn.btn-primary .progress {\n    background-color: #013e3e;\n    box-shadow: none; }\n  button.progress-button.btn.btn-primary .progress-inner {\n    background-color: #000c0c; }\n  button.progress-button.btn.btn-primary.progress-button-perspective {\n    background: none; }\n    button.progress-button.btn.btn-primary.progress-button-perspective .content {\n      background-color: #017170; }\n\nbutton.progress-button.btn.btn-default {\n  border-radius: 0; }\n  button.progress-button.btn.btn-default .content:after, button.progress-button.btn.btn-default .content:before {\n    color: #999999; }\n  button.progress-button.btn.btn-default.progress-button-style-move-up .content, button.progress-button.btn.btn-default.progress-button-style-slide-down .content {\n    background-color: #e6e6e6; }\n  button.progress-button.btn.btn-default.progress-button-style-lateral-lines .progress-inner {\n    border-color: #e6e6e6;\n    background: 0 0; }\n  button.progress-button.btn.btn-default .progress {\n    background-color: #e6e6e6;\n    box-shadow: none; }\n  button.progress-button.btn.btn-default .progress-inner {\n    background-color: #cccccc; }\n  button.progress-button.btn.btn-default.progress-button-perspective {\n    background: none; }\n    button.progress-button.btn.btn-default.progress-button-perspective .content {\n      background-color: #ffffff; }\n\nbutton.progress-button.btn.btn-success {\n  border-radius: 0; }\n  button.progress-button.btn.btn-success .content:after, button.progress-button.btn.btn-success .content:before {\n    color: black; }\n  button.progress-button.btn.btn-success.progress-button-style-move-up .content, button.progress-button.btn.btn-success.progress-button-style-slide-down .content {\n    background-color: #1b4f42; }\n  button.progress-button.btn.btn-success.progress-button-style-lateral-lines .progress-inner {\n    border-color: #1b4f42;\n    background: 0 0; }\n  button.progress-button.btn.btn-success .progress {\n    background-color: #1b4f42;\n    box-shadow: none; }\n  button.progress-button.btn.btn-success .progress-inner {\n    background-color: #0e2922; }\n  button.progress-button.btn.btn-success.progress-button-perspective {\n    background: none; }\n    button.progress-button.btn.btn-success.progress-button-perspective .content {\n      background-color: #287562; }\n\nbutton.progress-button.btn.btn-info {\n  border-radius: 0; }\n  button.progress-button.btn.btn-info .content:after, button.progress-button.btn.btn-info .content:before {\n    color: #0a2639; }\n  button.progress-button.btn.btn-info.progress-button-style-move-up .content, button.progress-button.btn.btn-info.progress-button-style-slide-down .content {\n    background-color: #217dbb; }\n  button.progress-button.btn.btn-info.progress-button-style-lateral-lines .progress-inner {\n    border-color: #217dbb;\n    background: 0 0; }\n  button.progress-button.btn.btn-info .progress {\n    background-color: #217dbb;\n    box-shadow: none; }\n  button.progress-button.btn.btn-info .progress-inner {\n    background-color: #196090; }\n  button.progress-button.btn.btn-info.progress-button-perspective {\n    background: none; }\n    button.progress-button.btn.btn-info.progress-button-perspective .content {\n      background-color: #3498db; }\n\nbutton.progress-button.btn.btn-warning {\n  border-radius: 0; }\n  button.progress-button.btn.btn-warning .content:after, button.progress-button.btn.btn-warning .content:before {\n    color: #362203; }\n  button.progress-button.btn.btn-warning.progress-button-style-move-up .content, button.progress-button.btn.btn-warning.progress-button-style-slide-down .content {\n    background-color: #c87f0a; }\n  button.progress-button.btn.btn-warning.progress-button-style-lateral-lines .progress-inner {\n    border-color: #c87f0a;\n    background: 0 0; }\n  button.progress-button.btn.btn-warning .progress {\n    background-color: #c87f0a;\n    box-shadow: none; }\n  button.progress-button.btn.btn-warning .progress-inner {\n    background-color: #976008; }\n  button.progress-button.btn.btn-warning.progress-button-perspective {\n    background: none; }\n    button.progress-button.btn.btn-warning.progress-button-perspective .content {\n      background-color: #f39c12; }\n\nbutton.progress-button.btn.btn-danger {\n  border-radius: 0; }\n  button.progress-button.btn.btn-danger .content:after, button.progress-button.btn.btn-danger .content:before {\n    color: #4d100a; }\n  button.progress-button.btn.btn-danger.progress-button-style-move-up .content, button.progress-button.btn.btn-danger.progress-button-style-slide-down .content {\n    background-color: #d62c1a; }\n  button.progress-button.btn.btn-danger.progress-button-style-lateral-lines .progress-inner {\n    border-color: #d62c1a;\n    background: 0 0; }\n  button.progress-button.btn.btn-danger .progress {\n    background-color: #d62c1a;\n    box-shadow: none; }\n  button.progress-button.btn.btn-danger .progress-inner {\n    background-color: #a82315; }\n  button.progress-button.btn.btn-danger.progress-button-perspective {\n    background: none; }\n    button.progress-button.btn.btn-danger.progress-button-perspective .content {\n      background-color: #e74c3c; }\n\n.btn-raised {\n  box-shadow: none; }\n\n.btn-mm {\n  padding: 5px 11px;\n  font-size: 13px; }\n\n.btn-xm {\n  padding: 8px 14px;\n  font-size: 16px; }\n\n.btn-group-xs > .btn, .btn-xs {\n  padding: 1px 5px;\n  font-size: 12px;\n  line-height: 1.5;\n  min-height: auto; }\n\n.btn-group-sm > .btn, .btn-sm {\n  padding: 5px 10px;\n  font-size: 12px;\n  line-height: 1.5;\n  border-radius: 3px;\n  min-height: auto; }\n\n.btn-group-lg > .btn, .btn-lg {\n  padding: 10px 16px;\n  font-size: 18px;\n  line-height: 1.3333333;\n  border-radius: 3px; }\n\n.dropdown button.btn.btn-default.dropdown-toggle {\n  border-width: 1px;\n  color: #ffffff;\n  background: #23282d;\n  border-color: #101920; }\n  .dropdown button.btn.btn-default.dropdown-toggle.disabled, .dropdown button.btn.btn-default.dropdown-toggle[disabled],\n  fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle, .dropdown button.btn.btn-default.dropdown-toggle.disabled:hover, .dropdown button.btn.btn-default.dropdown-toggle[disabled]:hover,\n  fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle:hover, .dropdown button.btn.btn-default.dropdown-toggle.disabled:focus, .dropdown button.btn.btn-default.dropdown-toggle[disabled]:focus,\n  fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle:focus, .dropdown button.btn.btn-default.dropdown-toggle.disabled.focus, .dropdown button.btn.btn-default.dropdown-toggle[disabled].focus,\n  fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle.focus, .dropdown button.btn.btn-default.dropdown-toggle.disabled:active, .dropdown button.btn.btn-default.dropdown-toggle[disabled]:active,\n  fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle:active, .dropdown button.btn.btn-default.dropdown-toggle.disabled.active, .dropdown button.btn.btn-default.dropdown-toggle[disabled].active,\n  fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle.active {\n    background: #23282d;\n    border-color: #1c252c; }\n    .dropdown button.btn.btn-default.dropdown-toggle.disabled:hover, .dropdown button.btn.btn-default.dropdown-toggle[disabled]:hover,\n    fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle:hover, .dropdown button.btn.btn-default.dropdown-toggle.disabled:hover:hover, .dropdown button.btn.btn-default.dropdown-toggle[disabled]:hover:hover,\n    fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle:hover:hover, .dropdown button.btn.btn-default.dropdown-toggle.disabled:focus:hover, .dropdown button.btn.btn-default.dropdown-toggle[disabled]:focus:hover,\n    fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle:focus:hover, .dropdown button.btn.btn-default.dropdown-toggle.disabled.focus:hover, .dropdown button.btn.btn-default.dropdown-toggle[disabled].focus:hover,\n    fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle.focus:hover, .dropdown button.btn.btn-default.dropdown-toggle.disabled:active:hover, .dropdown button.btn.btn-default.dropdown-toggle[disabled]:active:hover,\n    fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle:active:hover, .dropdown button.btn.btn-default.dropdown-toggle.disabled.active:hover, .dropdown button.btn.btn-default.dropdown-toggle[disabled].active:hover,\n    fieldset[disabled] .dropdown button.btn.btn-default.dropdown-toggle.active:hover {\n      transform: none; }\n  .dropdown button.btn.btn-default.dropdown-toggle:focus {\n    background: #23282d;\n    border-color: #101920; }\n  .dropdown button.btn.btn-default.dropdown-toggle:hover, .dropdown button.btn.btn-default.dropdown-toggle.focus, .dropdown button.btn.btn-default.dropdown-toggle:active, .dropdown button.btn.btn-default.dropdown-toggle.active {\n    background: #2e353b;\n    border-color: #192631; }\n  .dropdown button.btn.btn-default.dropdown-toggle.active, .dropdown button.btn.btn-default.dropdown-toggle:active, .dropdown button.btn.btn-default.dropdown-toggle:target {\n    background-color: rgba(0, 0, 0, 0.2);\n    color: #ffffff; }\n\n.ng2 .dropdown button.btn.btn-default.dropdown-toggle:focus, .ng2 .dropdown button.btn.btn-default.dropdown-toggle:active, .blur .dropdown button.btn.btn-default.dropdown-toggle:focus, .blur .dropdown button.btn.btn-default.dropdown-toggle:active {\n  background-color: transparent; }\n\n.bootstrap-select .dropdown-toggle:focus {\n  outline: none !important; }\n\n.bootstrap-select button.btn-default:focus {\n  color: #ffffff; }\n\n.bootstrap-select .btn {\n  transition: none; }\n\n.i-face {\n  display: inline-block;\n  background: url(\"assets/img/face.svg\") no-repeat center;\n  background-size: contain;\n  vertical-align: middle;\n  width: 80px;\n  height: 80px; }\n\n.i-money {\n  display: inline-block;\n  background: url(\"assets/img/money.svg\") no-repeat center;\n  background-size: contain;\n  vertical-align: middle;\n  width: 80px;\n  height: 80px; }\n\n.i-person {\n  display: inline-block;\n  background: url(\"assets/img/person.svg\") no-repeat center;\n  background-size: contain;\n  vertical-align: middle;\n  width: 80px;\n  height: 80px; }\n\n.i-refresh {\n  display: inline-block;\n  background: url(\"assets/img/refresh.svg\") no-repeat center;\n  background-size: contain;\n  vertical-align: middle;\n  width: 80px;\n  height: 80px; }\n\n::-webkit-scrollbar {\n  width: 0.5em;\n  height: 0.5em; }\n\n::-webkit-scrollbar-thumb {\n  background: #d9d9d9;\n  cursor: pointer; }\n\n::-webkit-scrollbar-track {\n  background: transparent; }\n\nbody {\n  scrollbar-face-color: #d9d9d9;\n  scrollbar-track-color: transparent; }\n\nhtml {\n  position: relative;\n  min-width: 320px; }\n\nhtml, body {\n  min-height: 100%;\n  height: 100%;\n  min-width: 320px;\n  font-family: 'Roboto', 'Century Gothic', BlinkMacSystemFont, 'Segoe UI', 'Microsoft yahei', '微软雅黑', 'Helvetica Neue', sans-serif, SimHei;\n  text-rendering: optimizeLegibility !important;\n  -webkit-font-smoothing: antialiased !important;\n  -moz-osx-font-smoothing: grayscale !important; }\n\n*,\n*:focus,\n*:active {\n  outline: none !important;\n  box-shadow: none; }\n\nmain {\n  min-height: 100%;\n  position: relative;\n  font: 14px/16px \"PingFang SC\", -apple-system, BlinkMacSystemFont, \"Roboto\", \"Century Gothic\", BlinkMacSystemFont, \"Segoe UI\", \"Microsoft yahei\", \"微软雅黑\", \"Helvetica Neue\", sans-serif, SimHei;\n  color: #ffffff;\n  background-color: #F0F3F4; }\n  main::before {\n    content: '';\n    position: fixed;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    background-color: #32373c;\n    will-change: transform;\n    z-index: 0; }\n  main .additional-bg {\n    display: none; }\n\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  html {\n    overflow: hidden;\n    height: 100%; }\n  body {\n    overflow: auto;\n    height: 100%; } }\n\na {\n  transition: color 0.5s ease;\n  outline: 0 !important; }\n\n.body-bg {\n  display: none; }\n\n.al-header {\n  display: block;\n  height: 49px;\n  margin: 0;\n  background-repeat: repeat-x;\n  position: relative;\n  z-index: 905;\n  color: #444444; }\n\n.al-main {\n  margin-left: 190px;\n  padding: 45px 0 34px 0;\n  min-height: 500px;\n  position: relative; }\n\n.al-footer {\n  height: 34px;\n  padding: 0 18px 0 210px;\n  width: 100%;\n  position: absolute;\n  display: block;\n  bottom: 0;\n  font-size: 13px;\n  color: #ffffff;\n  transition: padding-left 0.5s ease; }\n\n.al-footer-main {\n  float: left;\n  margin-left: 15px; }\n\n.al-copy {\n  float: left; }\n\n.al-footer-right {\n  float: right;\n  margin-right: 12px; }\n  .al-footer-right i {\n    margin: 0 4px;\n    color: #e74c3c;\n    font-size: 12px; }\n  .al-footer-right a {\n    margin-left: 4px;\n    color: #ffffff; }\n    .al-footer-right a:hover {\n      color: #e74c3c; }\n\n.al-share {\n  margin: -6px 0 0 12px;\n  padding: 0;\n  list-style: none;\n  float: left; }\n  .al-share li {\n    list-style: none;\n    float: left;\n    margin-left: 16px; }\n    .al-share li i {\n      cursor: pointer;\n      transition: all 0.1s ease;\n      color: white;\n      padding: 6px;\n      box-sizing: content-box;\n      font-size: 16px; }\n      .al-share li i:hover {\n        transform: scale(1.2); }\n    .al-share li i.fa-facebook-square {\n      color: #3b5998; }\n    .al-share li i.fa-twitter-square {\n      color: #55acee; }\n    .al-share li i.fa-google-plus-square {\n      color: #dd4b39; }\n\n.al-content {\n  padding: 8px 32px 8px 40px; }\n\n@media screen and (max-width: 500px) {\n  .al-content {\n    padding: 8px 20px; } }\n\n.vis-hidden {\n  visibility: hidden;\n  position: absolute;\n  top: -9999px;\n  left: -9999px; }\n\n.icon-up, .icon-down {\n  width: 5px;\n  height: 13px;\n  display: block; }\n\n.icon-up {\n  background: url(\"assets/img/arrow-green-up.svg\") no-repeat 0 0; }\n\n.icon-down {\n  background: url(\"assets/img/arrow-red-down.svg\") no-repeat 0 0; }\n\n.disable-text-selection {\n  -webkit-touch-callout: none;\n  user-select: none; }\n\n.align-right {\n  text-align: right; }\n\n.amcharts-chart-div > a {\n  font-size: 6px !important; }\n\n.content-panel {\n  padding-left: 22px;\n  padding-top: 26px; }\n\n@media (max-width: 590px) {\n  .al-footer-right {\n    float: none;\n    margin-bottom: 19px;\n    margin-right: 0; }\n  .al-footer {\n    height: 76px;\n    text-align: center; }\n  .al-main {\n    padding-bottom: 76px; }\n  .al-footer-main {\n    float: none;\n    display: inline-block; } }\n\n.full-invisible {\n  visibility: hidden !important; }\n  .full-invisible * {\n    visibility: hidden !important; }\n\n.irs-grid-text {\n  color: #ffffff; }\n\n.text-right {\n  text-align: right; }\n\n.text-left {\n  text-align: left; }\n\n.text-center {\n  text-align: center; }\n\n.pull-left {\n  float: left; }\n\n.pull-right {\n  float: right; }\n\n@font-face {\n  font-family: 'socicon';\n  src: url(\"assets/fonts/socicon.eot\");\n  src: url(\"assets/fonts/socicon.eot?#iefix\") format(\"embedded-opentype\"), url(\"assets/fonts/socicon.woff\") format(\"woff\"), url(\"assets/fonts/socicon.woff2\") format(\"woff2\"), url(\"assets/fonts/socicon.ttf\") format(\"truetype\"), url(\"assets/fonts/socicon.svg#sociconregular\") format(\"svg\");\n  font-weight: 400;\n  font-style: normal;\n  text-transform: initial; }\n\n.socicon {\n  font-family: 'socicon' !important; }\n\n.socicon {\n  position: relative;\n  top: 1px;\n  display: inline-block;\n  font-family: 'socicon';\n  font-style: normal;\n  font-weight: 400;\n  line-height: 1;\n  -webkit-font-smoothing: antialiased; }\n\n.socicon:empty {\n  width: 1em; }\n\n.socicon-twitter {\n  background-color: #55acee; }\n  .socicon-twitter:before {\n    content: \"a\"; }\n\n.socicon-facebook {\n  background-color: #3b5998; }\n  .socicon-facebook:before {\n    content: \"b\"; }\n\n.socicon-google {\n  background-color: #dd4b39; }\n  .socicon-google:before {\n    content: \"c\"; }\n\n.socicon-linkedin {\n  background-color: #0177B5; }\n  .socicon-linkedin:before {\n    content: \"j\"; }\n\n.socicon-github {\n  background-color: #6b6b6b; }\n  .socicon-github:before {\n    content: \"Q\"; }\n\n.socicon-stackoverflow {\n  background-color: #2F96E8; }\n  .socicon-stackoverflow:before {\n    content: \"(\"; }\n\n.socicon-dribble {\n  background-color: #F26798; }\n  .socicon-dribble:before {\n    content: \"D\"; }\n\n.socicon-behace {\n  background-color: #0093FA; }\n  .socicon-behace:before {\n    content: \"H\"; }\n\n.table {\n  margin-bottom: 0px; }\n  .table > thead > tr > th {\n    padding: 1em;\n    white-space: nowrap; }\n    .table > thead > tr > th:first-child {\n      text-align: center; }\n    .table > thead > tr > th:last-child {\n      padding-right: 1em; }\n  .table > tbody > tr > tr:first-child {\n    padding-top: 1px; }\n  .table > tbody > tr > td {\n    padding: .5em 1em;\n    line-height: 3em;\n    vertical-align: middle; }\n    .table > tbody > tr > td:first-child {\n      text-align: center; }\n    .table > tbody > tr > td:last-child {\n      padding-right: 1em !important; }\n\n.table-id {\n  text-align: left !important;\n  width: 40px; }\n\n.table-arr {\n  width: 5px;\n  padding: 10px 8px 8px 0 !important; }\n\n.table-no-borders {\n  border: none; }\n  .table-no-borders td, .table-no-borders th, .table-no-borders tr {\n    border: none !important; }\n\n.editable-wrap .btn-group.form-control {\n  background-color: transparent; }\n\n.editable-tr-wrap .editable-wrap {\n  vertical-align: super; }\n\n.editable-tr-wrap .editable-controls input.editable-input {\n  width: 110px; }\n\n.editable-tr-wrap td {\n  width: 20%; }\n\n.editable-table-button {\n  width: 70px; }\n\n.add-row-editable-table {\n  margin-bottom: 10px; }\n\n.add-row-editable-table + table {\n  margin-bottom: 5px; }\n\n.select-page-size-wrap {\n  width: 150px; }\n\n.table .header-row th {\n  vertical-align: middle;\n  padding: 0 8px; }\n\ntr.editable-row input.form-control {\n  vertical-align: middle; }\n\n.select-td .editable-select {\n  margin-bottom: 1px; }\n\n@media screen and (max-width: 1199px) {\n  .editable-tr-wrap .editable-wrap {\n    vertical-align: middle; } }\n\n.browser-icons {\n  width: 41px; }\n\n.st-sort-ascent, .st-sort-descent {\n  position: relative; }\n\n.st-sort-ascent:after, .st-sort-descent:after {\n  width: 0;\n  height: 0;\n  border-bottom: 4px solid #ffffff;\n  border-top: 4px solid transparent;\n  border-left: 4px solid transparent;\n  border-right: 4px solid transparent;\n  margin-bottom: 2px; }\n\n.st-sort-descent:after {\n  transform: rotate(-180deg);\n  margin-bottom: -2px; }\n\n.sortable th {\n  cursor: pointer; }\n  .sortable th:after {\n    content: '';\n    display: inline-block;\n    width: 8px;\n    margin-left: 8px; }\n\na.email-link {\n  color: #ffffff; }\n  a.email-link:hover {\n    color: #e74c3c; }\n\ninput.search-input {\n  margin-left: -8px;\n  padding-left: 8px; }\n\n.vertical-scroll {\n  max-height: 214px; }\n\n.status-button {\n  width: 60px; }\n\n.table .editable-wrap .editable-controls, .table .editable-wrap .editable-error {\n  vertical-align: sub; }\n  .table .editable-wrap .editable-controls .btn, .table .editable-wrap .editable-error .btn {\n    padding: 3px 8px; }\n    .table .editable-wrap .editable-controls .btn.dropdown-toggle, .table .editable-wrap .editable-error .btn.dropdown-toggle {\n      padding: 3px 20px;\n      margin-top: 3px; }\n  .table .editable-wrap .editable-controls input, .table .editable-wrap .editable-error input {\n    line-height: 1px;\n    height: 30px; }\n\n.form-inline button[type=\"submit\"].editable-table-button {\n  margin-left: 0; }\n\n.table > thead > tr > th {\n  border-bottom: none; }\n\n.table > tbody > tr.no-top-border:first-child > td {\n  border-top: none; }\n\n.black-muted-bg {\n  background-color: rgba(0, 0, 0, 0.1); }\n\n.table-hover > tbody > tr:hover {\n  background-color: rgba(0, 0, 0, 0.1); }\n\n.table-bordered,\n.table-bordered > thead > tr > th,\n.table-bordered > tbody > tr > th,\n.table-bordered > tfoot > tr > th,\n.table-bordered > thead > tr > td,\n.table-bordered > tbody > tr > td,\n.table-bordered > tfoot > tr > td {\n  border: 1px solid rgba(255, 255, 255, 0.3); }\n\n.table-striped > tbody > tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.1); }\n\n.table > tbody > tr.primary > td {\n  background-color: rgba(1, 113, 112, 0.7);\n  color: #ffffff;\n  border: none; }\n  .table > tbody > tr.primary > td a.email-link {\n    color: #ffffff; }\n    .table > tbody > tr.primary > td a.email-link:hover {\n      color: #e74c3c; }\n\n.table > tbody > tr.success > td {\n  background-color: rgba(40, 117, 98, 0.7);\n  color: #ffffff;\n  border: none; }\n  .table > tbody > tr.success > td a.email-link {\n    color: #ffffff; }\n    .table > tbody > tr.success > td a.email-link:hover {\n      color: #e74c3c; }\n\n.table > tbody > tr.warning > td {\n  background-color: rgba(243, 156, 18, 0.7);\n  color: #ffffff;\n  border: none; }\n  .table > tbody > tr.warning > td a.email-link {\n    color: #ffffff; }\n    .table > tbody > tr.warning > td a.email-link:hover {\n      color: #e74c3c; }\n\n.table > tbody > tr.danger > td {\n  background-color: rgba(231, 76, 60, 0.7);\n  color: #ffffff;\n  border: none; }\n  .table > tbody > tr.danger > td a.email-link {\n    color: #ffffff; }\n    .table > tbody > tr.danger > td a.email-link:hover {\n      color: #e74c3c; }\n\n.table > tbody > tr.info > td {\n  background-color: rgba(52, 152, 219, 0.7);\n  color: #ffffff;\n  border: none; }\n  .table > tbody > tr.info > td a.email-link {\n    color: #ffffff; }\n    .table > tbody > tr.info > td a.email-link:hover {\n      color: #e74c3c; }\n\n.editable-click, a.editable-click {\n  color: #ffffff;\n  border-bottom: dashed 1px rgba(255, 255, 255, 0.5); }\n\nth {\n  font-weight: 400; }\n\n.editable-empty {\n  color: #c44133; }\n\n.table > tbody > tr > th {\n  border: none; }\n\n.table-striped > tbody > tr > td {\n  border: none; }\n\n.table .pagination {\n  margin: 4px 0 -12px 0; }\n  .table .pagination a {\n    cursor: pointer; }\n\n.pagination > li:first-child > a,\n.pagination > li:first-child > span {\n  border-top-left-radius: 0px;\n  border-bottom-left-radius: 0px; }\n\n.pagination > li:last-child > a,\n.pagination > li:last-child > span {\n  border-top-right-radius: 0px;\n  border-bottom-right-radius: 0px; }\n\n.pagination > li:first-of-type > a,\n.pagination > li:first-of-type > span {\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px; }\n\n.pagination > li:last-of-type > a,\n.pagination > li:last-of-type > span {\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px; }\n\n.pagination > li > a,\n.pagination > li > span {\n  color: #ffffff;\n  border-color: #101920;\n  background: #23282d; }\n  .pagination > li > a:hover, .pagination > li > a:focus,\n  .pagination > li > span:hover,\n  .pagination > li > span:focus {\n    background-color: rgba(0, 0, 0, 0.2);\n    border-color: #101920;\n    color: #ffffff; }\n\n.pagination > .active > a,\n.pagination > .active > span,\n.pagination > .active > a:hover,\n.pagination > .active > span:hover,\n.pagination > .active > a:focus,\n.pagination > .active > span:focus {\n  background-color: rgba(0, 0, 0, 0.3) !important;\n  border-color: #101920 !important; }\n\n.page-item.disabled .page-link, .page-item.disabled .page-link:focus, .page-item.disabled .page-link:hover {\n  background-color: rgba(0, 0, 0, 0.2);\n  border-color: #101920;\n  color: rgba(255, 255, 255, 0.5);\n  opacity: .6;\n  cursor: no-drop; }\n\n.editable-buttons .btn-with-icon i {\n  margin-right: 0; }\n\n.table-responsive {\n  margin-top: 1em; }\n\n.label {\n  border-radius: 0; }\n\n.label-primary {\n  background: #017170; }\n\n.label-info {\n  background: #4d9c9b; }\n\n.label-success {\n  background: #287562; }\n\n.label-warning {\n  background: #f39c12; }\n\n.label-danger {\n  background: #e74c3c; }\n\n.form-horizontal label {\n  line-height: 34px;\n  margin-bottom: 0;\n  padding-top: 0 !important; }\n\n.form-group label {\n  padding-left: 5px;\n  margin-bottom: 5px;\n  color: #ffffff;\n  font-weight: 400;\n  font-size: 13px; }\n\n.form-control {\n  color: #ffffff;\n  padding: 0rem 0.75rem;\n  min-height: 2.3rem;\n  line-height: 2.3rem;\n  border: 1px solid #32373c;\n  border-radius: 2px;\n  background-color: rgba(50, 55, 60, 0.5);\n  box-shadow: none;\n  font-size: .9rem;\n  transition: background-color .2s; }\n  .form-control::-webkit-input-placeholder {\n    color: #ffffff;\n    opacity: 0.4; }\n  .form-control:-moz-placeholder {\n    /* Firefox 18- */\n    color: #ffffff;\n    opacity: 0.4; }\n  .form-control::-moz-placeholder {\n    /* Firefox 19+ */\n    color: #ffffff;\n    opacity: 0.4; }\n  .form-control:-ms-input-placeholder {\n    color: #ffffff;\n    opacity: 0.4; }\n  .form-control:focus {\n    color: #ffffff;\n    box-shadow: none;\n    border-color: #101920;\n    background: #32373c;\n    transition: background-color .2s; }\n\nselect.form-control {\n  padding-left: 8px; }\n\nselect.form-control:not([size]):not([multiple]) {\n  height: 2.4rem; }\n\nselect.form-control:not([multiple]) option {\n  color: #7d7d7d;\n  background-color: #23282d; }\n\nselect.form-control[multiple] option {\n  color: #ffffff; }\n\ntextarea.form-control {\n  height: 96px;\n  padding: 0.4rem 0.75rem; }\n\n.form-inline .form-group input {\n  width: 100%; }\n\n.form-inline .form-group label {\n  margin-right: 12px; }\n\n.form-inline button[type=\"submit\"] {\n  margin-left: 12px; }\n\n.switch-container {\n  display: inline-block; }\n  .switch-container.primary .bootstrap-switch.bootstrap-switch-on {\n    border-color: #017170; }\n  .switch-container.success .bootstrap-switch.bootstrap-switch-on {\n    border-color: #287562; }\n  .switch-container.warning .bootstrap-switch.bootstrap-switch-on {\n    border-color: #f39c12; }\n  .switch-container.danger .bootstrap-switch.bootstrap-switch-on {\n    border-color: #e74c3c; }\n  .switch-container.info .bootstrap-switch.bootstrap-switch-on {\n    border-color: #4d9c9b; }\n\n.bootstrap-switch {\n  border-radius: 5px;\n  border: 1px solid #ffffff;\n  transition: border-color ease-in-out .7s, box-shadow ease-in-out .7s; }\n  .bootstrap-switch:focus {\n    outline: none; }\n  .bootstrap-switch.bootstrap-switch-off {\n    border-color: rgba(255, 255, 255, 0.5); }\n  .bootstrap-switch.bootstrap-switch-focused {\n    box-shadow: none; }\n    .bootstrap-switch.bootstrap-switch-focused.bootstrap-switch-off {\n      border-color: rgba(255, 255, 255, 0.5); }\n  .bootstrap-switch .bootstrap-switch-container {\n    border-radius: 0; }\n    .bootstrap-switch .bootstrap-switch-container:focus {\n      outline: none; }\n  .bootstrap-switch .bootstrap-switch-handle-on {\n    border-radius: 0; }\n    .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-default {\n      background: #ffffff; }\n    .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-success {\n      background: #287562; }\n    .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-primary {\n      background: #017170; }\n    .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-warning {\n      background: #f39c12; }\n    .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-danger {\n      background: #e74c3c; }\n    .bootstrap-switch .bootstrap-switch-handle-on.bootstrap-switch-info {\n      background: #4d9c9b; }\n  .bootstrap-switch .bootstrap-switch-handle-off {\n    border-radius: 0; }\n  .bootstrap-switch .bootstrap-switch-label {\n    background: transparent; }\n  .bootstrap-switch.bootstrap-switch-animate .bootstrap-switch-container {\n    transition: margin-left .2s; }\n\n.switches {\n  margin-left: -12px;\n  margin-bottom: -12px; }\n  .switches .switch-container {\n    float: left;\n    margin-left: 12px;\n    margin-bottom: 12px; }\n\n.input-group {\n  width: 100%;\n  margin-bottom: 15px; }\n  .input-group > span {\n    border-radius: 0; }\n\n.nowrap {\n  white-space: nowrap; }\n\n.cut-with-dots {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block; }\n\nlabel.custom-radio {\n  @padding-right : 0;\n  padding-left: 0;\n  margin-bottom: 0; }\n  label.custom-radio > input {\n    height: 0;\n    z-index: -100 !important;\n    opacity: 0;\n    position: absolute; }\n    label.custom-radio > input:checked + span:before {\n      content: \"\\f383\";\n      font-weight: 300; }\n    label.custom-radio > input:disabled + span {\n      color: #32373c;\n      cursor: not-allowed; }\n      label.custom-radio > input:disabled + span:before {\n        border-color: #32373c !important;\n        cursor: not-allowed; }\n  label.custom-radio > span {\n    position: relative;\n    display: inline-block;\n    margin: 0;\n    line-height: 16px;\n    font-weight: 300;\n    cursor: pointer;\n    padding-left: 22px;\n    width: 100%; }\n    label.custom-radio > span:before {\n      cursor: pointer;\n      font-family: \"Ionicons\";\n      font-weight: 300;\n      font-size: 12px;\n      color: #ffffff;\n      content: \"\\a0\";\n      background-color: transparent;\n      border: 1px solid rgba(255, 255, 255, 0.5);\n      border-radius: 0;\n      display: inline-block;\n      text-align: center;\n      height: 16px;\n      line-height: 14px;\n      min-width: 16px;\n      margin-right: 6px;\n      position: relative;\n      top: 0;\n      margin-left: -22px;\n      float: left; }\n    label.custom-radio > span:hover:before {\n      border-color: #348d8d; }\n  label.custom-radio > input:checked + span:before {\n    content: \"\\f111\"; }\n  label.custom-radio > span:before {\n    border-radius: 16px;\n    font-size: 9px; }\n\nlabel.custom-input-primary > span:before {\n  color: #017170; }\n\nlabel.custom-input-primary > span:hover:before {\n  border-color: #017170; }\n\nlabel.custom-input-success > span:before {\n  color: #287562; }\n\nlabel.custom-input-success > span:hover:before {\n  border-color: #287562; }\n\nlabel.custom-input-warning > span:before {\n  color: #f39c12; }\n\nlabel.custom-input-warning > span:hover:before {\n  border-color: #f39c12; }\n\nlabel.custom-input-danger > span:before {\n  color: #e74c3c; }\n\nlabel.custom-input-danger > span:hover:before {\n  border-color: #e74c3c; }\n\n.form-horizontal .radio, .form-horizontal .radio-inline {\n  padding-top: 0; }\n\n.input-demo {\n  line-height: 25px; }\n\n.input-group-addon {\n  line-height: inherit; }\n\n.form-control-feedback {\n  position: absolute;\n  top: 0;\n  right: 0;\n  z-index: 2;\n  display: block;\n  width: 34px;\n  height: 34px;\n  line-height: 34px;\n  text-align: center;\n  pointer-events: none; }\n\n.has-feedback .form-control {\n  padding-right: 42.5px; }\n\n.has-feedback label ~ .form-control-feedback {\n  top: 19px;\n  font-size: 18px; }\n\n.bootstrap-select .btn-default:focus {\n  color: #ffffff; }\n\n.form-control[disabled], .form-control[readonly], fieldset[disabled] .form-control {\n  background-color: rgba(50, 55, 60, 0.5);\n  color: #32373c;\n  border-color: #515559; }\n  .form-control[disabled]::-webkit-input-placeholder, .form-control[readonly]::-webkit-input-placeholder, fieldset[disabled] .form-control::-webkit-input-placeholder {\n    color: #ffffff;\n    opacity: 0.2; }\n  .form-control[disabled]:-moz-placeholder, .form-control[readonly]:-moz-placeholder, fieldset[disabled] .form-control:-moz-placeholder {\n    /* Firefox 18- */\n    color: #ffffff;\n    opacity: 0.2; }\n  .form-control[disabled]::-moz-placeholder, .form-control[readonly]::-moz-placeholder, fieldset[disabled] .form-control::-moz-placeholder {\n    /* Firefox 19+ */\n    color: #ffffff;\n    opacity: 0.2; }\n  .form-control[disabled]:-ms-input-placeholder, .form-control[readonly]:-ms-input-placeholder, fieldset[disabled] .form-control:-ms-input-placeholder {\n    color: #ffffff;\n    opacity: 0.2; }\n\n.form-control-rounded {\n  border-radius: 16px; }\n\n.help-block {\n  color: rgba(255, 255, 255, 0.5);\n  vertical-align: sub;\n  display: block;\n  margin-top: 10px;\n  margin-bottom: 30px;\n  padding-left: 5px; }\n\n.help-block.error-block {\n  display: none; }\n  .has-error .help-block.error-block.basic-block {\n    display: block; }\n\n.input-group-addon-danger {\n  background: #e74c3c;\n  color: #ffffff;\n  border-color: #e74c3c; }\n\n.input-group-addon-warning {\n  background: #f39c12;\n  color: #ffffff;\n  border-color: #f39c12; }\n\n.input-group-addon-success {\n  background: #287562;\n  color: #ffffff;\n  border-color: #287562; }\n\n.input-group-addon-primary {\n  background: #017170;\n  color: #ffffff;\n  border-color: #017170; }\n\n.checkbox-demo-row {\n  margin-bottom: 12px; }\n\n.dropdown button.btn.btn-default.dropdown-toggle {\n  color: #ffffff; }\n\n.bootstrap-select.btn-group button.btn.btn-default {\n  background: transparent;\n  color: #ffffff; }\n  .bootstrap-select.btn-group button.btn.btn-default:hover {\n    background: #ffffff;\n    box-shadow: none;\n    outline: 0 !important; }\n  .bootstrap-select.btn-group button.btn.btn-default:active {\n    background: #ffffff;\n    box-shadow: none; }\n\n.bootstrap-select.btn-group.open > .btn.btn-default.dropdown-toggle {\n  background: #ffffff;\n  box-shadow: none;\n  border-color: rgba(255, 255, 255, 0.5); }\n\n.bootstrap-select.btn-group.open > .btn {\n  border-radius: 5px 5px 0 0; }\n\n.bootstrap-select.btn-group.open .dropdown-menu.open {\n  border: 1px solid rgba(255, 255, 255, 0.3);\n  border-top: none;\n  border-radius: 0 0 5px 5px; }\n\n.bootstrap-select.btn-group.with-search.open .btn-default + .dropdown-menu .bs-searchbox .form-control {\n  background-color: #ffffff;\n  border: 1px solid #32373c; }\n\n.bootstrap-select.btn-group.with-search.open .btn-default + .dropdown-menu .no-results {\n  color: #7d7d7d; }\n\n.bootstrap-select.btn-group .notify {\n  color: #7d7d7d; }\n\n.has-success {\n  position: relative; }\n  .has-success .control-label {\n    color: #ffffff; }\n  .has-success .form-control-label {\n    color: #ffffff; }\n  .has-success .form-control {\n    border: 1px solid #539181; }\n    .has-success .form-control:focus {\n      box-shadow: none;\n      border-color: #287562; }\n  .has-success label.custom-checkbox {\n    color: #539181; }\n    .has-success label.custom-checkbox > span:before {\n      color: #539181; }\n    .has-success label.custom-checkbox > span:hover:before {\n      border-color: #539181; }\n  .has-success .form-control-feedback {\n    color: #539181; }\n  .has-success .input-group-addon {\n    background-color: #539181;\n    color: #ffffff; }\n\n.has-warning {\n  position: relative; }\n  .has-warning .control-label {\n    color: #ffffff; }\n  .has-warning .form-control-label {\n    color: #ffffff; }\n  .has-warning .form-control {\n    border: 1px solid #f5b041; }\n    .has-warning .form-control:focus {\n      box-shadow: none;\n      border-color: #f39c12; }\n  .has-warning label.custom-checkbox {\n    color: #f5b041; }\n    .has-warning label.custom-checkbox > span:before {\n      color: #f5b041; }\n    .has-warning label.custom-checkbox > span:hover:before {\n      border-color: #f5b041; }\n  .has-warning .form-control-feedback {\n    color: #f5b041; }\n  .has-warning .input-group-addon {\n    background-color: #f5b041;\n    color: #ffffff; }\n\n.has-error {\n  position: relative; }\n  .has-error .control-label {\n    color: #ffffff; }\n  .has-error .form-control-label {\n    color: #ffffff; }\n  .has-error .form-control {\n    border: 1px solid #ec7063; }\n    .has-error .form-control:focus {\n      box-shadow: none;\n      border-color: #e74c3c; }\n  .has-error label.custom-checkbox {\n    color: #ec7063; }\n    .has-error label.custom-checkbox > span:before {\n      color: #ec7063; }\n    .has-error label.custom-checkbox > span:hover:before {\n      border-color: #ec7063; }\n  .has-error .form-control-feedback {\n    color: #ec7063; }\n  .has-error .input-group-addon {\n    background-color: #ec7063;\n    color: #ffffff; }\n\n.bootstrap-tagsinput {\n  color: #ffffff;\n  background-color: rgba(50, 55, 60, 0.5);\n  border: 1px solid #32373c;\n  border-radius: 5px;\n  box-shadow: none;\n  max-width: 100%;\n  font-size: 14px;\n  line-height: 26px;\n  width: 100%; }\n  .bootstrap-tagsinput.form-control {\n    display: block;\n    width: 100%; }\n  .bootstrap-tagsinput .tag {\n    border-radius: 3px;\n    font-weight: 400;\n    font-size: 11px;\n    padding: 4px 8px; }\n    .bootstrap-tagsinput .tag [data-role=\"remove\"]:hover {\n      box-shadow: none; }\n  .bootstrap-tagsinput input {\n    background-color: rgba(50, 55, 60, 0.5);\n    border: 1px solid #32373c;\n    border-radius: 5px;\n    line-height: 22px;\n    font-size: 11px;\n    min-width: 53px; }\n    .bootstrap-tagsinput input::-webkit-input-placeholder {\n      color: #ffffff;\n      opacity: 0.6; }\n    .bootstrap-tagsinput input:-moz-placeholder {\n      /* Firefox 18- */\n      color: #ffffff;\n      opacity: 0.6; }\n    .bootstrap-tagsinput input::-moz-placeholder {\n      /* Firefox 19+ */\n      color: #ffffff;\n      opacity: 0.6; }\n    .bootstrap-tagsinput input:-ms-input-placeholder {\n      color: #ffffff;\n      opacity: 0.6; }\n\n.progress {\n  background: rgba(0, 0, 0, 0.15); }\n\n.progress-bar-primary {\n  background-color: #017170; }\n\n.progress-bar-success {\n  background-color: #699e91; }\n\n.progress-bar-warning {\n  background-color: #f39c12; }\n\n.progress-bar-danger {\n  background-color: #e74c3c; }\n\n.has-success .input-group-addon {\n  border: none; }\n\n.input-group > span.addon-left {\n  border-top-left-radius: 5px;\n  border-bottom-left-radius: 5px; }\n\n.input-group > span.addon-right {\n  border-top-right-radius: 5px;\n  border-bottom-right-radius: 5px; }\n\n.input-group-btn:not(:first-child) > .btn, .input-group-btn:not(:first-child) > .btn-group {\n  margin-left: 0; }\n\n.with-primary-addon:focus {\n  border-color: #017170; }\n\n.with-warning-addon:focus {\n  border-color: #f39c12; }\n\n.with-success-addon:focus {\n  border-color: #287562; }\n\n.with-danger-addon:focus {\n  border-color: #e74c3c; }\n\n.sub-little-text {\n  font-size: 12px; }\n\n.rating {\n  font-size: 20px; }\n\nrating-inputs span {\n  vertical-align: middle; }\n\nlabel.custom-checkbox {\n  padding-right: 0;\n  padding-left: 0;\n  margin-bottom: 0; }\n  label.custom-checkbox > input {\n    height: 0;\n    z-index: -100 !important;\n    opacity: 0;\n    position: absolute; }\n    label.custom-checkbox > input:checked + span:before {\n      content: \"\\f383\";\n      font-weight: 300; }\n    label.custom-checkbox > input:disabled + span {\n      color: #32373c;\n      cursor: not-allowed; }\n      label.custom-checkbox > input:disabled + span:before {\n        border-color: #32373c !important;\n        cursor: not-allowed; }\n  label.custom-checkbox > span {\n    position: relative;\n    display: inline-block;\n    margin: 0;\n    line-height: 16px;\n    font-weight: 300;\n    cursor: pointer;\n    padding-left: 22px;\n    width: 100%; }\n    label.custom-checkbox > span:before {\n      cursor: pointer;\n      font-family: \"Ionicons\";\n      font-weight: 300;\n      font-size: 12px;\n      color: #ffffff;\n      content: \"\\a0\";\n      background-color: transparent;\n      border: 1px solid rgba(255, 255, 255, 0.5);\n      border-radius: 0;\n      display: inline-block;\n      text-align: center;\n      height: 16px;\n      line-height: 14px;\n      min-width: 16px;\n      margin-right: 6px;\n      position: relative;\n      top: 0;\n      margin-left: -22px;\n      float: left; }\n    label.custom-checkbox > span:hover:before {\n      border-color: #348d8d; }\n\n#tree-view .tree .node-value {\n  color: white; }\n\n#tree-view .tree .folding.node-expanded::before {\n  color: white; }\n\n#tree-view .tree .folding.node-collapsed::before {\n  color: white; }\n\n#tree-view .tree .folding.node-leaf::before {\n  color: white; }\n\n#tree-view .tree .over-drop-target {\n  border: 4px solid ghostwhite; }\n\n#tree-view .tree .node-value .node-selected::after {\n  background-color: white; }\n\n#tree-view .tree .node-value:after {\n  background-color: white; }\n\n.simple-notification {\n  padding: 20px !important; }\n  .simple-notification svg {\n    top: 10px !important;\n    right: 10px !important; }\n  .simple-notification .sn-title {\n    margin-bottom: 10px !important; }\n  .simple-notification.error {\n    background-color: #e74c3c !important; }\n    .simple-notification.error .sn-progress-loader span {\n      background-color: #ed7669 !important; }\n  .simple-notification.info {\n    background-color: #3498db !important; }\n    .simple-notification.info .sn-progress-loader span {\n      background-color: #5faee3 !important; }\n  .simple-notification.bare {\n    background-color: #017170 !important; }\n    .simple-notification.bare .sn-progress-loader span {\n      background-color: #01a4a2 !important; }\n  .simple-notification.alert {\n    background-color: #f39c12 !important; }\n    .simple-notification.alert .sn-progress-loader span {\n      background-color: #f5b043 !important; }\n  .simple-notification.success {\n    background-color: #287562 !important; }\n    .simple-notification.success .sn-progress-loader span {\n      background-color: #359b82 !important; }\n\n.modal {\n  align-items: center; }\n  .modal.fade .modal-dialog {\n    transform: translate(0, 0);\n    animation-name: scaleOut;\n    animation-duration: .15s;\n    animation-timing-function: ease-in-out; }\n  .modal.fade.in .modal-dialog {\n    animation-name: scaleIn;\n    animation-duration: .15s;\n    animation-timing-function: ease-in-out; }\n  .modal .modal-dialog {\n    min-width: 500px;\n    margin: 0 auto; }\n    .modal .modal-dialog .modal-content {\n      border: none;\n      background-color: #eee;\n      color: #373a3c; }\n      .modal .modal-dialog .modal-content .modal-header {\n        padding: 10px 15px; }\n        .modal .modal-dialog .modal-content .modal-header > .close {\n          position: absolute;\n          display: block;\n          right: 0;\n          top: 0;\n          height: 48px;\n          line-height: 48px;\n          width: 48px;\n          font-size: 36px; }\n      .modal .modal-dialog .modal-content .modal-body .message {\n        margin: 10px auto;\n        padding-left: 30px;\n        font-size: 23px;\n        height: 30px;\n        line-height: 30px; }\n        .modal .modal-dialog .modal-content .modal-body .message .icon {\n          float: left;\n          font-size: 32px;\n          margin-right: 10px; }\n\n.modal-open {\n  padding-right: 0.5em !important; }\n\n.fade {\n  transition: opacity .15s ease-in-out; }\n  .fade.in {\n    transition: opacity .15s ease-in-out; }\n\n@keyframes scaleIn {\n  from {\n    transform: scale(1.2);\n    opacity: 0; }\n  to {\n    transform: scale(1);\n    opacity: 1; } }\n\n@keyframes scaleOut {\n  from {\n    transform: scale(1);\n    opacity: 1; }\n  to {\n    transform: scale(0.8);\n    opacity: 0; } }\n"

/***/ },

/***/ "./src/app/app.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Subject_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Subject.js");
var AppState = (function () {
    function AppState() {
        this.stateChange = new Subject_1.Subject();
        this.state$ = this.stateChange.asObservable();
        this._state = {
            adminInfo: {
                gravatar: 'assets/img/app/profile/Admin.jpg',
                name: '管理员',
                slogan: '博客管理后台'
            }
        };
    }
    Object.defineProperty(AppState.prototype, "state", {
        // already return a clone of the current state
        get: function () {
            return this._state = this._clone(this._state);
        },
        // never allow mutation
        set: function (value) {
            throw new Error('do not mutate the `.state` directly');
        },
        enumerable: true,
        configurable: true
    });
    AppState.prototype.get = function (prop) {
        // use our state getter for the clone
        var state = this.state;
        return state.hasOwnProperty(prop) ? state[prop] : state;
    };
    AppState.prototype.set = function (prop, value) {
        // internally mutate our state
        this.stateChange.next(value);
        return this._state[prop] = value;
    };
    AppState.prototype._clone = function (object) {
        // simple object clone
        return JSON.parse(JSON.stringify(object));
    };
    AppState = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], AppState);
    return AppState;
}());
exports.AppState = AppState;


/***/ },

/***/ "./src/app/environment.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// Angular 2
// rc2 workaround
var platform_browser_1 = __webpack_require__("./node_modules/.2.1.1@@angular/platform-browser/index.js");
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
// Environment Providers
var PROVIDERS = [];
// Angular debug tools in the dev console
// https://github.com/angular/angular/blob/86405345b781a9dc2438c0fbe3e9409245647019/TOOLS_JS.md
var _decorateModuleRef = function identity(value) { return value; };
if (false) {
    // Production
    platform_browser_1.disableDebugTools();
    core_1.enableProdMode();
    PROVIDERS = PROVIDERS.slice();
}
else {
    _decorateModuleRef = function (modRef) {
        var appRef = modRef.injector.get(core_1.ApplicationRef);
        var cmpRef = appRef.components[0];
        var _ng = window.ng;
        platform_browser_1.enableDebugTools(cmpRef);
        window.ng.probe = _ng.probe;
        window.ng.coreTokens = _ng.coreTokens;
        return modRef;
    };
    // Development
    PROVIDERS = PROVIDERS.slice();
}
exports.decorateModuleRef = _decorateModuleRef;
exports.ENV_PROVIDERS = PROVIDERS.slice();


/***/ },

/***/ "./src/app/global.state.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Subject_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Subject.js");
var GlobalState = (function () {
    function GlobalState() {
        var _this = this;
        this._data = new Subject_1.Subject();
        this._dataStream$ = this._data.asObservable();
        this._subscriptions = new Map();
        this._dataStream$.subscribe(function (data) { return _this._onEvent(data); });
    }
    GlobalState.prototype.notifyDataChanged = function (event, value) {
        var current = this._data[event];
        if (current !== value) {
            this._data[event] = value;
            this._data.next({
                event: event,
                data: this._data[event]
            });
        }
    };
    GlobalState.prototype.subscribe = function (event, callback) {
        var subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);
        this._subscriptions.set(event, subscribers);
    };
    GlobalState.prototype._onEvent = function (data) {
        var subscribers = this._subscriptions.get(data['event']) || [];
        subscribers.forEach(function (callback) {
            callback.call(null, data['data']);
        });
    };
    GlobalState = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], GlobalState);
    return GlobalState;
}());
exports.GlobalState = GlobalState;


/***/ },

/***/ "./src/app/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/app.module.ts"));


/***/ },

/***/ "./src/app/pages/options/options.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var angular2_jwt_1 = __webpack_require__("./node_modules/.0.1.28@angular2-jwt/angular2-jwt.js");
var angular2_notifications_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/components.js");
__webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/add/operator/toPromise.js");
var config_1 = __webpack_require__("./src/config.ts");
var OptionsService = (function () {
    function OptionsService(http, _notificationsService) {
        var _this = this;
        this.http = http;
        this._notificationsService = _notificationsService;
        this._authApiUrl = config_1.API_ROOT + "/auth";
        this._optionApiUrl = config_1.API_ROOT + "/option";
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
    // 获取设置
    OptionsService.prototype.getOptions = function () {
        return this.http
            .get(this._optionApiUrl)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    // 更新设置
    OptionsService.prototype.putOptions = function (options) {
        return this.http
            .put(this._optionApiUrl, options)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    // 获取用户信息
    OptionsService.prototype.getUserAuth = function () {
        return this.http
            .get(this._authApiUrl)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    // 更新权限和用户信息
    OptionsService.prototype.putAuth = function (auth) {
        return this.http
            .put(this._authApiUrl, auth)
            .toPromise()
            .then(this.handleResponse)
            .catch(this.handleError);
    };
    OptionsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof angular2_jwt_1.AuthHttp !== 'undefined' && angular2_jwt_1.AuthHttp) === 'function' && _a) || Object, (typeof (_b = typeof angular2_notifications_1.NotificationsService !== 'undefined' && angular2_notifications_1.NotificationsService) === 'function' && _b) || Object])
    ], OptionsService);
    return OptionsService;
    var _a, _b;
}());
exports.OptionsService = OptionsService;


/***/ },

/***/ "./src/app/pages/pages.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Pages = (function () {
    function Pages() {
    }
    Pages.prototype.ngOnInit = function () {
    };
    Pages = __decorate([
        core_1.Component({
            selector: 'pages',
            encapsulation: core_1.ViewEncapsulation.Emulated,
            styles: [],
            template: "\n    <ba-sidebar></ba-sidebar>\n    <ba-page-top></ba-page-top>\n    <div class=\"al-main\">\n      <div class=\"al-content\">\n        <ba-content-top></ba-content-top>\n        <router-outlet></router-outlet>\n      </div>\n    </div>\n    <footer class=\"al-footer clearfix\">\n      <div class=\"al-footer-right\">Created with <i class=\"ion-heart\"></i></div>\n      <div class=\"al-footer-main clearfix\">\n        <div class=\"al-copy\">&copy; <a href=\"https://surmon.me\">NodePress</a> 2016</div>\n        <ul class=\"al-share clearfix\" *ngIf=\"false\">\n          <li><i class=\"socicon socicon-facebook\"></i></li>\n          <li><i class=\"socicon socicon-twitter\"></i></li>\n          <li><i class=\"socicon socicon-google\"></i></li>\n          <li><i class=\"socicon socicon-github\"></i></li>\n        </ul>\n      </div>\n    </footer>\n    <ba-back-top position=\"200\"></ba-back-top>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], Pages);
    return Pages;
}());
exports.Pages = Pages;


/***/ },

/***/ "./src/app/pages/pages.menu.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
exports.PAGES_MENU = [
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
                        title: '百度统计',
                        url: 'https://tongji.baidu.com/web',
                        icon: 'ion-ios-pie',
                        order: 800,
                        target: '_blank'
                    }
                }
            },
            {
                path: '',
                data: {
                    menu: {
                        title: 'Web-OS',
                        url: 'https://os.surmon.me',
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
                                url: 'http://121.42.55.33',
                                icon: 'ion-android-globe',
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
                                url: 'https://surmon.me',
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
                                icon: 'ion-social-github',
                                target: '_blank'
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
                                        title: '智能表格',
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


/***/ },

/***/ "./src/app/pages/pages.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/.2.1.1@@angular/common/index.js");
var pages_routing_1 = __webpack_require__("./src/app/pages/pages.routing.ts");
var nga_module_1 = __webpack_require__("./src/app/theme/nga.module.ts");
var pages_component_1 = __webpack_require__("./src/app/pages/pages.component.ts");
var PagesModule = (function () {
    function PagesModule() {
    }
    PagesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, nga_module_1.NgaModule, pages_routing_1.routing],
            declarations: [pages_component_1.Pages]
        }), 
        __metadata('design:paramtypes', [])
    ], PagesModule);
    return PagesModule;
}());
exports.PagesModule = PagesModule;


/***/ },

/***/ "./src/app/pages/pages.routing.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var pages_component_1 = __webpack_require__("./src/app/pages/pages.component.ts");
var routes = [
    { path: 'auth', loadChildren: function () { return __webpack_require__.e/* System.import */(0).then(__webpack_require__.bind(null, "./src/app/pages/auth/auth.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
    { path: '',
        component: pages_component_1.Pages,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', loadChildren: function () { return __webpack_require__.e/* System.import */(6).then(__webpack_require__.bind(null, "./src/app/pages/dashboard/dashboard.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
            { path: 'announcement', loadChildren: function () { return __webpack_require__.e/* System.import */(5).then(__webpack_require__.bind(null, "./src/app/pages/announcement/announcement.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
            { path: 'article', loadChildren: function () { return __webpack_require__.e/* System.import */(2).then(__webpack_require__.bind(null, "./src/app/pages/article/article.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
            { path: 'comment', loadChildren: function () { return __webpack_require__.e/* System.import */(9).then(__webpack_require__.bind(null, "./src/app/pages/comment/comment.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
            { path: 'options', loadChildren: function () { return __webpack_require__.e/* System.import */(7).then(__webpack_require__.bind(null, "./src/app/pages/options/options.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
            { path: 'linux', loadChildren: function () { return __webpack_require__.e/* System.import */(8).then(__webpack_require__.bind(null, "./src/app/pages/linux/linux.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
            { path: 'auth', loadChildren: function () { return __webpack_require__.e/* System.import */(0/* duplicate */).then(__webpack_require__.bind(null, "./src/app/pages/auth/auth.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
            { path: 'demo',
                children: [
                    { path: 'ui', loadChildren: function () { return __webpack_require__.e/* System.import */(4).then(__webpack_require__.bind(null, "./src/app/pages/demo/ui/ui.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
                    { path: 'forms', loadChildren: function () { return __webpack_require__.e/* System.import */(3).then(__webpack_require__.bind(null, "./src/app/pages/demo/forms/forms.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } },
                    { path: 'tables', loadChildren: function () { return __webpack_require__.e/* System.import */(1).then(__webpack_require__.bind(null, "./src/app/pages/demo/tables/tables.module.ts")).then(function (mod) { return (mod.__esModule && mod.default) ? mod.default : mod; }); } }
                ]
            }
        ]
    }
];
exports.routing = router_1.RouterModule.forChild(routes);


/***/ },

/***/ "./src/app/theme/components/baBackTop/baBackTop.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaBackTop = (function () {
    function BaBackTop() {
        this.position = 400;
        this.showSpeed = 500;
        this.moveSpeed = 1000;
    }
    BaBackTop.prototype.ngAfterViewInit = function () {
        this._onWindowScroll();
    };
    BaBackTop.prototype._onClick = function () {
        jQuery('html, body').animate({ scrollTop: 0 }, { duration: this.moveSpeed });
        return false;
    };
    BaBackTop.prototype._onWindowScroll = function () {
        var el = this._selector.nativeElement;
        window.scrollY > this.position ? jQuery(el).fadeIn(this.showSpeed) : jQuery(el).fadeOut(this.showSpeed);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BaBackTop.prototype, "position", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BaBackTop.prototype, "showSpeed", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BaBackTop.prototype, "moveSpeed", void 0);
    __decorate([
        core_1.ViewChild('baBackTop'), 
        __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
    ], BaBackTop.prototype, "_selector", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', Boolean)
    ], BaBackTop.prototype, "_onClick", null);
    __decorate([
        core_1.HostListener('window:scroll'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], BaBackTop.prototype, "_onWindowScroll", null);
    BaBackTop = __decorate([
        core_1.Component({
            selector: 'ba-back-top',
            styles: [__webpack_require__("./src/app/theme/components/baBackTop/baBackTop.scss")],
            template: "\n    <i #baBackTop class=\"fa fa-angle-up back-top ba-back-top\" title=\"Back to Top\"></i>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BaBackTop);
    return BaBackTop;
    var _a;
}());
exports.BaBackTop = BaBackTop;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/.2.2.4@jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/theme/components/baBackTop/baBackTop.scss":
/***/ function(module, exports) {

module.exports = ".ba-back-top {\n  position: fixed;\n  width: 52px;\n  height: 52px;\n  cursor: pointer;\n  z-index: 9999;\n  display: none;\n  text-decoration: none;\n  right: 40px;\n  bottom: 40px !important;\n  font-size: 45px;\n  text-align: center;\n  opacity: 0.4;\n  color: #017170;\n  background-color: rgba(0, 0, 0, 0.75);\n  border-radius: 50%;\n  line-height: 46px; }\n  .ba-back-top:hover {\n    opacity: 0.8; }\n"

/***/ },

/***/ "./src/app/theme/components/baBackTop/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baBackTop/baBackTop.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baCard/baCard.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaCard = (function () {
    function BaCard() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaCard.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaCard.prototype, "baCardClass", void 0);
    BaCard = __decorate([
        core_1.Component({
            selector: 'ba-card',
            styles: [__webpack_require__("./src/app/theme/components/baCard/baCard.scss")],
            template: __webpack_require__("./src/app/theme/components/baCard/baCard.html"),
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [])
    ], BaCard);
    return BaCard;
}());
exports.BaCard = BaCard;


/***/ },

/***/ "./src/app/theme/components/baCard/baCard.html":
/***/ function(module, exports) {

module.exports = "<div baCardBlur class=\"animated fadeIn card {{cardType}} {{baCardClass || ''}}\" zoom-in>\r\n    <div *ngIf=\"title\" class=\"card-header clearfix\">\r\n        <h3 class=\"card-title\">{{title}}</h3>\r\n    </div>\r\n    <div class=\"card-body\">\r\n        <ng-content></ng-content>\r\n    </div>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/theme/components/baCard/baCard.scss":
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ "./src/app/theme/components/baCard/baCardBlur.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var theme_1 = __webpack_require__("./src/app/theme/index.ts");
var baCardBlurHelper_service_1 = __webpack_require__("./src/app/theme/components/baCard/baCardBlurHelper.service.ts");
var BaCardBlur = (function () {
    function BaCardBlur(_baConfig, _baCardBlurHelper, _el) {
        this._baConfig = _baConfig;
        this._baCardBlurHelper = _baCardBlurHelper;
        this._el = _el;
        this.isEnabled = false;
        if (this._isEnabled()) {
            this._baCardBlurHelper.init();
            this._getBodyImageSizesOnBgLoad();
            this._recalculateCardStylesOnBgLoad();
            this.isEnabled = true;
        }
    }
    BaCardBlur.prototype._onWindowResize = function () {
        if (this._isEnabled()) {
            this._bodyBgSize = this._baCardBlurHelper.getBodyBgImageSizes();
            this._recalculateCardStyle();
        }
    };
    BaCardBlur.prototype._getBodyImageSizesOnBgLoad = function () {
        var _this = this;
        this._baCardBlurHelper.bodyBgLoad().subscribe(function () {
            _this._bodyBgSize = _this._baCardBlurHelper.getBodyBgImageSizes();
        });
    };
    BaCardBlur.prototype._recalculateCardStylesOnBgLoad = function () {
        var _this = this;
        this._baCardBlurHelper.bodyBgLoad().subscribe(function (event) {
            setTimeout(_this._recalculateCardStyle.bind(_this));
        });
    };
    BaCardBlur.prototype._recalculateCardStyle = function () {
        if (!this._bodyBgSize) {
            return;
        }
        this._el.nativeElement.style.backgroundSize = Math.round(this._bodyBgSize.width) + 'px ' + Math.round(this._bodyBgSize.height) + 'px';
        this._el.nativeElement.style.backgroundPosition = Math.floor(this._bodyBgSize.positionX) + 'px ' + Math.floor(this._bodyBgSize.positionY) + 'px';
    };
    BaCardBlur.prototype._isEnabled = function () {
        return this._baConfig.get().theme.name == 'blur';
    };
    __decorate([
        core_1.HostBinding('class.card-blur'), 
        __metadata('design:type', Boolean)
    ], BaCardBlur.prototype, "isEnabled", void 0);
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], BaCardBlur.prototype, "_onWindowResize", null);
    BaCardBlur = __decorate([
        core_1.Directive({
            selector: '[baCardBlur]',
            providers: [baCardBlurHelper_service_1.BaCardBlurHelper]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof theme_1.BaThemeConfigProvider !== 'undefined' && theme_1.BaThemeConfigProvider) === 'function' && _a) || Object, (typeof (_b = typeof baCardBlurHelper_service_1.BaCardBlurHelper !== 'undefined' && baCardBlurHelper_service_1.BaCardBlurHelper) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _c) || Object])
    ], BaCardBlur);
    return BaCardBlur;
    var _a, _b, _c;
}());
exports.BaCardBlur = BaCardBlur;


/***/ },

/***/ "./src/app/theme/components/baCard/baCardBlurHelper.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Subject_1 = __webpack_require__("./node_modules/.5.0.0-beta.12@rxjs/Subject.js");
var BaCardBlurHelper = (function () {
    function BaCardBlurHelper() {
    }
    BaCardBlurHelper.prototype.init = function () {
        this._genBgImage();
        this._genImageLoadSubject();
    };
    BaCardBlurHelper.prototype.bodyBgLoad = function () {
        return this.imageLoadSubject;
    };
    BaCardBlurHelper.prototype.getBodyBgImageSizes = function () {
        var elemW = document.documentElement.clientWidth;
        var elemH = document.documentElement.clientHeight;
        if (elemW <= 640)
            return;
        var imgRatio = (this.image.height / this.image.width); // original img ratio
        var containerRatio = (elemH / elemW); // container ratio
        var finalHeight, finalWidth;
        if (containerRatio > imgRatio) {
            finalHeight = elemH;
            finalWidth = (elemH / imgRatio);
        }
        else {
            finalWidth = elemW;
            finalHeight = (elemW * imgRatio);
        }
        return { width: finalWidth, height: finalHeight, positionX: (elemW - finalWidth) / 2, positionY: (elemH - finalHeight) / 2 };
    };
    BaCardBlurHelper.prototype._genBgImage = function () {
        this.image = new Image();
        var computedStyle = getComputedStyle(document.body.querySelector('main'), ':before');
        this.image.src = computedStyle.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2');
    };
    BaCardBlurHelper.prototype._genImageLoadSubject = function () {
        var _this = this;
        this.imageLoadSubject = new Subject_1.Subject();
        this.image.onerror = function (err) {
            _this.imageLoadSubject.complete();
        };
        this.image.onload = function () {
            _this.imageLoadSubject.next(null);
            _this.imageLoadSubject.complete();
        };
    };
    BaCardBlurHelper = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaCardBlurHelper);
    return BaCardBlurHelper;
}());
exports.BaCardBlurHelper = BaCardBlurHelper;


/***/ },

/***/ "./src/app/theme/components/baCard/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baCard/baCard.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baCheckbox/baCheckbox.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/.2.1.1@@angular/forms/index.js");
var BaCheckbox = (function () {
    function BaCheckbox(state) {
        this.model = state;
        state.valueAccessor = this;
    }
    BaCheckbox.prototype.onChange = function (value) { };
    BaCheckbox.prototype.onTouch = function (value) { };
    BaCheckbox.prototype.writeValue = function (state) {
        this.state = state;
    };
    BaCheckbox.prototype.registerOnChange = function (fn) {
        this.onChange = function (state) {
            this.writeValue(state);
            this.model.viewToModelUpdate(state);
        };
    };
    BaCheckbox.prototype.registerOnTouched = function (fn) { this.onTouch = fn; };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BaCheckbox.prototype, "disabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaCheckbox.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaCheckbox.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaCheckbox.prototype, "baCheckboxClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaCheckbox.prototype, "baCheckboxLabelClass", void 0);
    BaCheckbox = __decorate([
        core_1.Component({
            selector: 'ba-checkbox[ngModel]',
            styles: [__webpack_require__("./src/app/theme/components/baCheckbox/baCheckbox.scss")],
            template: __webpack_require__("./src/app/theme/components/baCheckbox/baCheckbox.html")
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.NgModel !== 'undefined' && forms_1.NgModel) === 'function' && _a) || Object])
    ], BaCheckbox);
    return BaCheckbox;
    var _a;
}());
exports.BaCheckbox = BaCheckbox;


/***/ },

/***/ "./src/app/theme/components/baCheckbox/baCheckbox.html":
/***/ function(module, exports) {

module.exports = "<div class=\"{{ baCheckboxClass }}\">\n  <label class=\"checkbox-inline custom-checkbox nowrap\">\n    <input type=\"checkbox\" \n    \t\t\t [checked]=\"state\"\n           (change)=\"onChange($event.target.checked)\"\n           [disabled]=\"disabled\" \n           [value]=\"value\">\n    <span class=\"{{ baCheckboxLabelClass }}\" *ngIf=\"!!label\">{{ label }}</span>\n    <ng-content select=\"[ba-checkbox-label]\"></ng-content>\n  </label>\n</div>\n"

/***/ },

/***/ "./src/app/theme/components/baCheckbox/baCheckbox.scss":
/***/ function(module, exports) {

module.exports = ".has-success {\n  position: relative; }\n  .has-success .control-label {\n    color: #ffffff; }\n  .has-success .form-control {\n    border: 1px solid #539181; }\n    .has-success .form-control:focus {\n      box-shadow: none;\n      border-color: #287562; }\n  .has-success label.custom-checkbox {\n    color: #539181; }\n    .has-success label.custom-checkbox > span:before {\n      color: #539181; }\n    .has-success label.custom-checkbox > span:hover:before {\n      border-color: #539181; }\n  .has-success .form-control-feedback {\n    color: #539181; }\n  .has-success .input-group-addon {\n    background-color: #539181;\n    color: #ffffff; }\n\n.has-warning {\n  position: relative; }\n  .has-warning .control-label {\n    color: #ffffff; }\n  .has-warning .form-control {\n    border: 1px solid #f5b041; }\n    .has-warning .form-control:focus {\n      box-shadow: none;\n      border-color: #f39c12; }\n  .has-warning label.custom-checkbox {\n    color: #f5b041; }\n    .has-warning label.custom-checkbox > span:before {\n      color: #f5b041; }\n    .has-warning label.custom-checkbox > span:hover:before {\n      border-color: #f5b041; }\n  .has-warning .form-control-feedback {\n    color: #f5b041; }\n  .has-warning .input-group-addon {\n    background-color: #f5b041;\n    color: #ffffff; }\n\n.has-error {\n  position: relative; }\n  .has-error .control-label {\n    color: #ffffff; }\n  .has-error .form-control {\n    border: 1px solid #ec7063; }\n    .has-error .form-control:focus {\n      box-shadow: none;\n      border-color: #e74c3c; }\n  .has-error label.custom-checkbox {\n    color: #ec7063; }\n    .has-error label.custom-checkbox > span:before {\n      color: #ec7063; }\n    .has-error label.custom-checkbox > span:hover:before {\n      border-color: #ec7063; }\n  .has-error .form-control-feedback {\n    color: #ec7063; }\n  .has-error .input-group-addon {\n    background-color: #ec7063;\n    color: #ffffff; }\n\nlabel.custom-checkbox > span {\n  display: block;\n  margin-right: 10px; }\n"

/***/ },

/***/ "./src/app/theme/components/baCheckbox/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baCheckbox/baCheckbox.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baContentTop/baContentTop.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var global_state_1 = __webpack_require__("./src/app/global.state.ts");
var BaContentTop = (function () {
    function BaContentTop(_state) {
        var _this = this;
        this._state = _state;
        this.activePageTitle = '';
        this._state.subscribe('menu.activeLink', function (activeLink) {
            if (activeLink) {
                _this.activePageTitle = activeLink.title;
            }
        });
    }
    BaContentTop = __decorate([
        core_1.Component({
            selector: 'ba-content-top',
            styles: [__webpack_require__("./src/app/theme/components/baContentTop/baContentTop.scss")],
            template: __webpack_require__("./src/app/theme/components/baContentTop/baContentTop.html"),
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof global_state_1.GlobalState !== 'undefined' && global_state_1.GlobalState) === 'function' && _a) || Object])
    ], BaContentTop);
    return BaContentTop;
    var _a;
}());
exports.BaContentTop = BaContentTop;


/***/ },

/***/ "./src/app/theme/components/baContentTop/baContentTop.html":
/***/ function(module, exports) {

module.exports = "<div class=\"content-top clearfix\">\n  <h1 class=\"al-title\">{{ activePageTitle }}</h1>\n  <ul class=\"breadcrumb al-breadcrumb\">\n    <li class=\"breadcrumb-item\"><a routerLink=\"/dashboard\">仪表盘</a></li>\n    <li class=\"breadcrumb-item active\">{{ activePageTitle }}</li>\n  </ul>\n</div>\n"

/***/ },

/***/ "./src/app/theme/components/baContentTop/baContentTop.scss":
/***/ function(module, exports) {

module.exports = ".content-top {\n  padding: 20px 5px 25px 5px; }\n\nh1.al-title {\n  font-weight: 700;\n  color: #ffffff;\n  float: left;\n  width: auto;\n  margin: 0;\n  padding: 0;\n  font-size: 24px;\n  text-transform: uppercase;\n  opacity: 0.9; }\n\n.al-breadcrumb {\n  background: none;\n  color: #ffffff;\n  padding: 0;\n  margin: 0;\n  float: right; }\n  .al-breadcrumb li {\n    font-size: 18px;\n    font-weight: 400; }\n    .al-breadcrumb li a {\n      color: #4d9c9b; }\n    .al-breadcrumb li.breadcrumb-item.active {\n      color: #ffffff; }\n\n.al-look {\n  float: right;\n  margin-right: 10px;\n  padding-top: 10px; }\n  .al-look > a {\n    font-size: 19px; }\n"

/***/ },

/***/ "./src/app/theme/components/baContentTop/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baContentTop/baContentTop.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baMenu/baMenu.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var baMenu_service_1 = __webpack_require__("./src/app/theme/components/baMenu/baMenu.service.ts");
var global_state_1 = __webpack_require__("./src/app/global.state.ts");
var BaMenu = (function () {
    function BaMenu(_router, _service, _state, _appState) {
        var _this = this;
        this._router = _router;
        this._service = _service;
        this._state = _state;
        this._appState = _appState;
        this.menuRoutes = [];
        this.sidebarCollapsed = false;
        this.expandMenu = new core_1.EventEmitter();
        this.outOfArea = -200;
        this._onRouteChange = this._router.events.subscribe(function (event) {
            if (event instanceof router_1.NavigationEnd) {
                if (_this.menuItems) {
                    _this.selectMenuAndNotify();
                }
                else {
                    // on page load we have to wait as event is fired before menu elements are prepared
                    setTimeout(function () { return _this.selectMenuAndNotify(); });
                }
            }
        });
    }
    BaMenu.prototype.selectMenuAndNotify = function () {
        if (this.menuItems) {
            this.menuItems = this._service.selectMenuItem(this.menuItems);
            this._state.notifyDataChanged('menu.activeLink', this._service.getCurrentItem());
        }
    };
    BaMenu.prototype.ngOnInit = function () {
        this.menuItems = this._service.convertRoutesToMenus(this.menuRoutes);
    };
    BaMenu.prototype.ngOnDestroy = function () {
        this._onRouteChange.unsubscribe();
    };
    BaMenu.prototype.hoverItem = function ($event) {
        this.showHoverElem = true;
        this.hoverElemHeight = $event.currentTarget.clientHeight;
        this.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - 45;
    };
    BaMenu.prototype.toggleSubMenu = function ($event) {
        var submenu = jQuery($event.currentTarget).next();
        if (this.sidebarCollapsed) {
            this.expandMenu.emit(null);
            if (!$event.item.expanded) {
                $event.item.expanded = true;
            }
        }
        else {
            $event.item.expanded = !$event.item.expanded;
            submenu.slideToggle();
        }
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof router_1.Routes !== 'undefined' && router_1.Routes) === 'function' && _a) || Object)
    ], BaMenu.prototype, "menuRoutes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BaMenu.prototype, "sidebarCollapsed", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BaMenu.prototype, "menuHeight", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaMenu.prototype, "expandMenu", void 0);
    BaMenu = __decorate([
        core_1.Component({
            selector: 'ba-menu',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/theme/components/baMenu/baMenu.scss")],
            template: __webpack_require__("./src/app/theme/components/baMenu/baMenu.html"),
            providers: [baMenu_service_1.BaMenuService]
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof baMenu_service_1.BaMenuService !== 'undefined' && baMenu_service_1.BaMenuService) === 'function' && _c) || Object, (typeof (_d = typeof global_state_1.GlobalState !== 'undefined' && global_state_1.GlobalState) === 'function' && _d) || Object, (typeof (_e = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _e) || Object])
    ], BaMenu);
    return BaMenu;
    var _a, _b, _c, _d, _e;
}());
exports.BaMenu = BaMenu;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/.2.2.4@jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/theme/components/baMenu/baMenu.html":
/***/ function(module, exports) {

module.exports = "<aside class=\"al-sidebar\" (mouseleave)=\"hoverElemTop=outOfArea\" sidebarResize>\n  <div class=\"al-sidebar-list-item\" [hidden]=\"sidebarCollapsed\">\n    <a [routerLink]=\"['/options']\" class=\"al-sidebar-user\">\n      <img src=\"{{ _appState.state.adminInfo.gravatar }}\" class=\"al-sidebar-user-gravatar\">\n      <div class=\"al-sidebar-user-profile\">\n        <p class=\"al-sidebar-user-name\">{{ _appState.state.adminInfo.name }}</p>\n        <small class=\"al-sidebar-user-slogan text-muted\">{{ _appState.state.adminInfo.slogan }}</small>\n      </div>\n    </a>\n  </div>\n  <ul id=\"al-sidebar-list\" \n      class=\"al-sidebar-list\" \n      baSlimScroll \n      [baSlimScrollOptions]=\"{ height: menuHeight }\">\n    <ba-menu-item\n      [menuItem]=\"item\"\n      (itemHover)=\"hoverItem($event)\"\n      (toggleSubMenu)=\"toggleSubMenu($event)\"\n      *ngFor=\"let item of menuItems\">\n    </ba-menu-item>\n  </ul>\n  <div class=\"sidebar-hover-elem\" \n       [ngClass]=\"{'show-hover-elem': showHoverElem }\"\n       [ngStyle]=\"{top: hoverElemTop + 'px', height: hoverElemHeight + 'px'}\"></div>\n</aside>\n"

/***/ },

/***/ "./src/app/theme/components/baMenu/baMenu.scss":
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ "./src/app/theme/components/baMenu/baMenu.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var BaMenuService = (function () {
    function BaMenuService(_router) {
        this._router = _router;
        this._currentMenuItem = {};
    }
    BaMenuService.prototype.convertRoutesToMenus = function (routes) {
        var items = this._convertArrayToItems(routes);
        return this._skipEmpty(items);
    };
    BaMenuService.prototype.getCurrentItem = function () {
        return this._currentMenuItem;
    };
    BaMenuService.prototype.selectMenuItem = function (menuItems) {
        var _this = this;
        var items = [];
        menuItems.forEach(function (item) {
            _this._selectItem(item);
            if (item.selected) {
                _this._currentMenuItem = item;
            }
            if (item.children && item.children.length > 0) {
                item.children = _this.selectMenuItem(item.children);
            }
            items.push(item);
        });
        return items;
    };
    BaMenuService.prototype._skipEmpty = function (items) {
        var menu = [];
        items.forEach(function (item) {
            var menuItem;
            if (item.skip) {
                if (item.children && item.children.length > 0) {
                    menuItem = item.children;
                }
            }
            else {
                menuItem = item;
            }
            if (menuItem) {
                menu.push(menuItem);
            }
        });
        return [].concat.apply([], menu);
    };
    BaMenuService.prototype._convertArrayToItems = function (routes, parent) {
        var _this = this;
        var items = [];
        routes.forEach(function (route) {
            items.push(_this._convertObjectToItem(route, parent));
        });
        return items;
    };
    BaMenuService.prototype._convertObjectToItem = function (object, parent) {
        var item = {};
        if (object.data && object.data.menu) {
            // this is a menu object
            item = object.data.menu;
            item.route = object;
            delete item.route.data.menu;
        }
        else {
            item.route = object;
            item.skip = true;
        }
        // we have to collect all paths to correctly build the url then
        if (Array.isArray(item.route.path)) {
            item.route.paths = item.route.path;
        }
        else {
            item.route.paths = parent && parent.route && parent.route.paths ? parent.route.paths.slice(0) : ['/'];
            if (!!item.route.path)
                item.route.paths.push(item.route.path);
        }
        if (object.children && object.children.length > 0) {
            item.children = this._convertArrayToItems(object.children, item);
        }
        var prepared = this._prepareItem(item);
        // if current item is selected or expanded - then parent is expanded too
        if ((prepared.selected || prepared.expanded) && parent) {
            parent.expanded = true;
        }
        return prepared;
    };
    BaMenuService.prototype._prepareItem = function (object) {
        if (!object.skip) {
            object.target = object.target || '';
            object.pathMatch = object.pathMatch || 'full';
            return this._selectItem(object);
        }
        return object;
    };
    BaMenuService.prototype._selectItem = function (object) {
        object.selected = this._router.isActive(this._router.createUrlTree(object.route.paths), object.pathMatch === 'full');
        return object;
    };
    BaMenuService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object])
    ], BaMenuService);
    return BaMenuService;
    var _a;
}());
exports.BaMenuService = BaMenuService;


/***/ },

/***/ "./src/app/theme/components/baMenu/components/baMenuItem/baMenuItem.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaMenuItem = (function () {
    function BaMenuItem() {
        this.child = false;
        this.itemHover = new core_1.EventEmitter();
        this.toggleSubMenu = new core_1.EventEmitter();
    }
    BaMenuItem.prototype.onHoverItem = function ($event) {
        this.itemHover.emit($event);
    };
    BaMenuItem.prototype.onToggleSubMenu = function ($event, item) {
        $event.item = item;
        this.toggleSubMenu.emit($event);
        return false;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaMenuItem.prototype, "menuItem", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BaMenuItem.prototype, "child", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaMenuItem.prototype, "itemHover", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaMenuItem.prototype, "toggleSubMenu", void 0);
    BaMenuItem = __decorate([
        core_1.Component({
            selector: 'ba-menu-item',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/theme/components/baMenu/components/baMenuItem/baMenuItem.scss")],
            template: __webpack_require__("./src/app/theme/components/baMenu/components/baMenuItem/baMenuItem.html")
        }), 
        __metadata('design:paramtypes', [])
    ], BaMenuItem);
    return BaMenuItem;
}());
exports.BaMenuItem = BaMenuItem;


/***/ },

/***/ "./src/app/theme/components/baMenu/components/baMenuItem/baMenuItem.html":
/***/ function(module, exports) {

module.exports = "<li *ngIf=\"!menuItem.hidden\" \r\n    [title]=\"menuItem.title\" \r\n    [ngClass]=\"{'al-sidebar-list-item': !child, 'ba-sidebar-sublist-item': child, 'selected': menuItem.selected && !menuItem.expanded, 'with-sub-menu': menuItem.children, 'ba-sidebar-item-expanded': menuItem.expanded}\">\r\n\r\n  <a *ngIf=\"!menuItem.children && !menuItem.url\" \r\n      (mouseenter)=\"onHoverItem($event, item)\" \r\n      [routerLink]=\"menuItem.route.paths\" \r\n      class=\"al-sidebar-list-link\">\r\n    <i *ngIf=\"menuItem.icon\" class=\"{{ menuItem.icon }}\"></i><span>{{ menuItem.title }}</span>\r\n  </a>\r\n\r\n  <a *ngIf=\"!menuItem.children && menuItem.url\" \r\n      (mouseenter)=\"onHoverItem($event, item)\" \r\n      [href]=\"menuItem.url\" \r\n      [target]=\"menuItem.target\" \r\n      class=\"al-sidebar-list-link\">\r\n    <i *ngIf=\"menuItem.icon\" class=\"{{ menuItem.icon }}\"></i><span>{{ menuItem.title }}</span>\r\n  </a>\r\n\r\n  <a href \r\n     class=\"al-sidebar-list-link\"\r\n     *ngIf=\"menuItem.children\" \r\n     (mouseenter)=\"onHoverItem($event, item)\" \r\n     (click)=\"onToggleSubMenu($event, menuItem)\">\r\n    <i *ngIf=\"menuItem.icon\" class=\"{{ menuItem.icon }}\"></i><span>{{ menuItem.title }}</span>\r\n    <b class=\"ion-ios-arrow-up\" [ngClass]=\"{'ion-ios-arrow-down': menuItem.expanded}\"></b>\r\n  </a>\r\n\r\n  <ul class=\"al-sidebar-sublist\"  \r\n      *ngIf=\"menuItem.children\" \r\n      [ngClass]=\"{'slide-right': menuItem.slideRight}\">\r\n    <ba-menu-item [menuItem]=\"subItem\"\r\n                  [child]=\"true\"\r\n                  (itemHover)=\"onHoverItem($event)\"\r\n                  (toggleSubMenu)=\"onToggleSubMenu($event, subItem)\"\r\n                  *ngFor=\"let subItem of menuItem.children\">\r\n    </ba-menu-item>\r\n  </ul>\r\n</li>\r\n"

/***/ },

/***/ "./src/app/theme/components/baMenu/components/baMenuItem/baMenuItem.scss":
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ "./src/app/theme/components/baMenu/components/baMenuItem/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baMenu/components/baMenuItem/baMenuItem.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baMenu/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baMenu/baMenu.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baMsgCenter/baMsgCenter.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var baMsgCenter_service_1 = __webpack_require__("./src/app/theme/components/baMsgCenter/baMsgCenter.service.ts");
var BaMsgCenter = (function () {
    function BaMsgCenter(_baMsgCenterService) {
        this._baMsgCenterService = _baMsgCenterService;
        this.notifications = this._baMsgCenterService.getNotifications();
        this.messages = this._baMsgCenterService.getMessages();
    }
    BaMsgCenter = __decorate([
        core_1.Component({
            selector: 'ba-msg-center',
            providers: [baMsgCenter_service_1.BaMsgCenterService],
            styles: [__webpack_require__("./src/app/theme/components/baMsgCenter/baMsgCenter.scss")],
            template: __webpack_require__("./src/app/theme/components/baMsgCenter/baMsgCenter.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof baMsgCenter_service_1.BaMsgCenterService !== 'undefined' && baMsgCenter_service_1.BaMsgCenterService) === 'function' && _a) || Object])
    ], BaMsgCenter);
    return BaMsgCenter;
    var _a;
}());
exports.BaMsgCenter = BaMsgCenter;


/***/ },

/***/ "./src/app/theme/components/baMsgCenter/baMsgCenter.html":
/***/ function(module, exports) {

module.exports = "<ul class=\"al-msg-center clearfix\">\r\n  <li class=\"dropdown\">\r\n    <a href class=\"dropdown-toggle\" id=\"msg-dd1\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n      <i class=\"ion-android-notifications\"></i><span>5</span>\r\n      <div class=\"notification-ring\"></div>\r\n    </a>\r\n    <div class=\"top-dropdown-menu dropdown-menu\" aria-labelledby=\"msg-dd1\">\r\n      <i class=\"dropdown-arr\"></i>\r\n      <div class=\"header clearfix\">\r\n        <strong>通知</strong>\r\n        <a href>全部标记为已读</a>\r\n        <a href>设置</a>\r\n      </div>\r\n      <div class=\"msg-list\">\r\n        <a *ngFor=\"let msg of notifications\" href class=\"clearfix\">\r\n          <div class=\"img-area\">\r\n            <img [ngClass]=\"{'photo-msg-item': !msg.image}\"\r\n                 src=\"{{ ( msg.image ||  (msg.name | baProfilePicture)) }}\"></div>\r\n          <div class=\"msg-area\">\r\n            <div>{{ msg.text }}</div>\r\n            <span>{{ msg.time }}</span>\r\n          </div>\r\n        </a>\r\n      </div>\r\n      <a href>查看所有通知</a>\r\n    </div>\r\n  </li>\r\n  <li class=\"dropdown\">\r\n    <a href class=\"msg dropdown-toggle\" id=\"msg-dd2\" data-toggle=\"dropdown\" aria-expanded=\"false\">\r\n      <i class=\"ion-android-mail\"></i><span>5</span>\r\n      <div class=\"notification-ring\"></div>\r\n    </a>\r\n    <div class=\"top-dropdown-menu dropdown-menu\" aria-labelledby=\"msg-dd2\">\r\n      <i class=\"dropdown-arr\"></i>\r\n      <div class=\"header clearfix\">\r\n        <strong>消息</strong>\r\n        <a href>全部标记为已读</a>\r\n        <a href>设置</a>\r\n      </div>\r\n      <div class=\"msg-list\">\r\n        <a *ngFor=\"let msg of messages\" href class=\"clearfix\">\r\n          <div class=\"img-area\"><img [ngClass]=\"{'photo-msg-item': !msg.image}\"\r\n                                     src=\"{{ ( msg.image ||  (msg.name | baProfilePicture)) }}\"></div>\r\n          <div class=\"msg-area\">\r\n            <div>{{ msg.text }}</div>\r\n            <span>{{ msg.time }}</span>\r\n          </div>\r\n        </a>\r\n      </div>\r\n      <a href>查看所有消息</a>\r\n    </div>\r\n  </li>\r\n</ul>\r\n"

/***/ },

/***/ "./src/app/theme/components/baMsgCenter/baMsgCenter.scss":
/***/ function(module, exports) {

module.exports = "/* msg center */\n@-webkit-keyframes pulsate {\n  30% {\n    -webkit-transform: scale(0.1, 0.1);\n    opacity: 0.0; }\n  35% {\n    opacity: 1.0; }\n  40% {\n    -webkit-transform: scale(1.2, 1.2);\n    opacity: 0.0; } }\n\n.al-msg-center {\n  float: right;\n  padding: 0;\n  list-style: none;\n  margin: 13px 47px 0 0; }\n  .al-msg-center a {\n    color: #017170; }\n  .al-msg-center li {\n    list-style: none;\n    float: left;\n    margin-left: 30px; }\n    .al-msg-center li:first-child {\n      margin-left: 0; }\n    .al-msg-center li > a {\n      color: #ffffff;\n      text-decoration: none;\n      font-size: 13px;\n      position: relative; }\n      .al-msg-center li > a span {\n        display: inline-block;\n        min-width: 10px;\n        padding: 2px 4px 2px 4px;\n        color: #ffffff;\n        vertical-align: baseline;\n        white-space: nowrap;\n        text-align: center;\n        border-radius: 13px;\n        text-shadow: none;\n        line-height: 11px;\n        background-color: #e74c3c;\n        position: absolute;\n        top: -5px;\n        right: -14px;\n        font-size: 11px; }\n      .al-msg-center li > a .notification-ring {\n        border: 1px solid #e74c3c;\n        border-radius: 100px;\n        height: 40px;\n        width: 40px;\n        position: absolute;\n        top: -18px;\n        right: -27px;\n        animation: pulsate 8s ease-out;\n        animation-iteration-count: infinite;\n        opacity: 0.0; }\n      .al-msg-center li > a:hover {\n        color: #e74c3c; }\n        .al-msg-center li > a:hover.msg {\n          color: #017170; }\n      .al-msg-center li > a.msg span {\n        background-color: #017170; }\n      .al-msg-center li > a.msg .notification-ring {\n        border-color: #017170; }\n    .al-msg-center li.open > a {\n      color: #e74c3c; }\n      .al-msg-center li.open > a.msg {\n        color: #017170; }\n\n@media (max-width: 435px) {\n  .al-msg-center {\n    margin-right: 20px; }\n    .al-msg-center li {\n      margin-left: 20px; }\n      .al-msg-center li:first-child {\n        margin-left: 0; } }\n\n.msg-block-header {\n  display: inline-block;\n  padding: 0;\n  font-size: 13px;\n  margin: 0 0 0 6px; }\n\n.top-dropdown-menu {\n  width: 316px;\n  left: auto;\n  right: -47px;\n  top: 26px; }\n  .top-dropdown-menu ::-webkit-scrollbar {\n    width: 0.4em;\n    height: 0.4em; }\n  .top-dropdown-menu ::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.5);\n    cursor: pointer; }\n  .top-dropdown-menu ::-webkit-scrollbar-track {\n    background: #fff; }\n  .top-dropdown-menu body {\n    scrollbar-face-color: rgba(0, 0, 0, 0.5);\n    scrollbar-track-color: #fff; }\n  .top-dropdown-menu .header {\n    padding: 10px 12px;\n    border-bottom: 1px solid #ffffff;\n    font-size: 12px; }\n    .top-dropdown-menu .header strong {\n      float: left;\n      color: #7d7d7d; }\n    .top-dropdown-menu .header > a {\n      float: right;\n      margin-left: 12px;\n      text-decoration: none; }\n      .top-dropdown-menu .header > a:hover {\n        color: #7d7d7d; }\n  .top-dropdown-menu .msg-list {\n    max-height: 296px;\n    overflow: scroll;\n    overflow-x: hidden; }\n    .top-dropdown-menu .msg-list > a {\n      padding: 10px 12px;\n      display: block;\n      text-decoration: none;\n      color: #7d7d7d;\n      font-size: 12px; }\n      .top-dropdown-menu .msg-list > a:first-child {\n        border-top: none; }\n      .top-dropdown-menu .msg-list > a .img-area {\n        float: left;\n        width: 36px; }\n        .top-dropdown-menu .msg-list > a .img-area img {\n          width: 36px;\n          height: 36px; }\n          .top-dropdown-menu .msg-list > a .img-area img.photo-msg-item {\n            border-radius: 18px; }\n        .top-dropdown-menu .msg-list > a .img-area > div {\n          width: 36px;\n          height: 36px;\n          border-radius: 4px;\n          font-size: 24px;\n          text-align: center; }\n          .top-dropdown-menu .msg-list > a .img-area > div.comments {\n            color: #f39c12; }\n          .top-dropdown-menu .msg-list > a .img-area > div.orders {\n            color: #f39c12; }\n          .top-dropdown-menu .msg-list > a .img-area > div i {\n            width: 36px;\n            line-height: 36px; }\n      .top-dropdown-menu .msg-list > a .msg-area {\n        float: right;\n        width: 230px; }\n        .top-dropdown-menu .msg-list > a .msg-area div {\n          max-height: 34px;\n          overflow: hidden;\n          text-overflow: ellipsis; }\n        .top-dropdown-menu .msg-list > a .msg-area span {\n          font-style: italic;\n          text-align: right;\n          display: block;\n          font-size: 11px; }\n      .top-dropdown-menu .msg-list > a:hover {\n        background: #E2F0FF; }\n  .top-dropdown-menu > a {\n    border-top: 1px solid #ffffff;\n    display: block;\n    text-align: center;\n    padding: 10px;\n    font-size: 12px;\n    text-decoration: none; }\n    .top-dropdown-menu > a:hover {\n      color: #7d7d7d; }\n  .top-dropdown-menu.profile-dropdown {\n    width: 145px;\n    top: 55px;\n    right: -25px; }\n    .top-dropdown-menu.profile-dropdown a {\n      text-align: left;\n      border: none;\n      text-decoration: none;\n      color: #7d7d7d; }\n      .top-dropdown-menu.profile-dropdown a.signout {\n        border-top: 1px solid #ffffff; }\n      .top-dropdown-menu.profile-dropdown a i {\n        margin-right: 10px; }\n      .top-dropdown-menu.profile-dropdown a:hover {\n        background: #f4fcff; }\n    .top-dropdown-menu.profile-dropdown i.dropdown-arr {\n      right: 25px; }\n  .top-dropdown-menu i.dropdown-arr {\n    position: absolute;\n    top: -22px;\n    right: 42px;\n    display: block;\n    width: 0;\n    height: 0;\n    border: 11px solid transparent;\n    border-bottom-color: rgba(0, 0, 0, 0.15); }\n    .top-dropdown-menu i.dropdown-arr:after {\n      top: -9px;\n      left: 0px;\n      margin-left: -10px;\n      content: \" \";\n      position: absolute;\n      display: block;\n      width: 0;\n      height: 0;\n      border: 10px solid transparent;\n      border-bottom-color: #ffffff; }\n\n@media (max-width: 415px) {\n  .top-dropdown-menu {\n    right: -81px; }\n    .top-dropdown-menu i.dropdown-arr {\n      right: 75px; } }\n"

/***/ },

/***/ "./src/app/theme/components/baMsgCenter/baMsgCenter.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaMsgCenterService = (function () {
    function BaMsgCenterService() {
        this._notifications = [
            {
                name: 'Vlad',
                text: 'Vlad posted a new article.',
                time: '1 min ago'
            },
            {
                name: 'Kostya',
                text: 'Kostya changed his contact information.',
                time: '2 hrs ago'
            },
            {
                image: 'assets/img/shopping-cart.svg',
                text: 'New orders received.',
                time: '5 hrs ago'
            },
            {
                name: 'Andrey',
                text: 'Andrey replied to your comment.',
                time: '1 day ago'
            },
            {
                name: 'Nasta',
                text: 'Today is Nasta\'s birthday.',
                time: '2 days ago'
            },
            {
                image: 'assets/img/comments.svg',
                text: 'New comments on your post.',
                time: '3 days ago'
            },
            {
                name: 'Kostya',
                text: 'Kostya invited you to join the event.',
                time: '1 week ago'
            }
        ];
        this._messages = [
            {
                name: 'Nasta',
                text: 'After you get up and running, you can place Font Awesome icons just about...',
                time: '1 min ago'
            },
            {
                name: 'Vlad',
                text: 'You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.',
                time: '2 hrs ago'
            },
            {
                name: 'Kostya',
                text: 'Want to request new icons? Here\'s how. Need vectors or want to use on the...',
                time: '10 hrs ago'
            },
            {
                name: 'Andrey',
                text: 'Explore your passions and discover new ones by getting involved. Stretch your...',
                time: '1 day ago'
            },
            {
                name: 'Nasta',
                text: 'Get to know who we are - from the inside out. From our history and culture, to the...',
                time: '1 day ago'
            },
            {
                name: 'Kostya',
                text: 'Need some support to reach your goals? Apply for scholarships across a variety of...',
                time: '2 days ago'
            },
            {
                name: 'Vlad',
                text: 'Wrap the dropdown\'s trigger and the dropdown menu within .dropdown, or...',
                time: '1 week ago'
            }
        ];
    }
    BaMsgCenterService.prototype.getMessages = function () {
        return this._messages;
    };
    BaMsgCenterService.prototype.getNotifications = function () {
        return this._notifications;
    };
    BaMsgCenterService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaMsgCenterService);
    return BaMsgCenterService;
}());
exports.BaMsgCenterService = BaMsgCenterService;


/***/ },

/***/ "./src/app/theme/components/baMsgCenter/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baMsgCenter/baMsgCenter.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baMultiCheckbox/baMultiCheckbox.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/.2.1.1@@angular/forms/index.js");
var BaMultiCheckbox = (function () {
    function BaMultiCheckbox(state) {
        this.model = state;
        state.valueAccessor = this;
    }
    BaMultiCheckbox.prototype.getProp = function (item, propName) {
        var prop = this.propertiesMapping[propName];
        if (!prop) {
            return item[propName];
        }
        else if (typeof prop === 'function') {
            return prop(item);
        }
        return item[prop];
    };
    BaMultiCheckbox.prototype.onChange = function (value) { };
    BaMultiCheckbox.prototype.onTouch = function (value) { };
    BaMultiCheckbox.prototype.writeValue = function (state) {
        this.state = state;
    };
    BaMultiCheckbox.prototype.registerOnChange = function (fn) {
        this.onChange = function (state) {
            this.writeValue(state);
            this.model.viewToModelUpdate(state);
        };
    };
    BaMultiCheckbox.prototype.registerOnTouched = function (fn) { this.onTouch = fn; };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaMultiCheckbox.prototype, "baMultiCheckboxClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaMultiCheckbox.prototype, "propertiesMapping", void 0);
    BaMultiCheckbox = __decorate([
        core_1.Component({
            selector: 'ba-multi-checkbox[ngModel]',
            template: __webpack_require__("./src/app/theme/components/baMultiCheckbox/baMultiCheckbox.html"),
        }),
        __param(0, core_1.Self()), 
        __metadata('design:paramtypes', [(typeof (_a = typeof forms_1.NgModel !== 'undefined' && forms_1.NgModel) === 'function' && _a) || Object])
    ], BaMultiCheckbox);
    return BaMultiCheckbox;
    var _a;
}());
exports.BaMultiCheckbox = BaMultiCheckbox;


/***/ },

/***/ "./src/app/theme/components/baMultiCheckbox/baMultiCheckbox.html":
/***/ function(module, exports) {

module.exports = "<div class=\"{{baMultiCheckboxClass}}\">\r\n  <ba-checkbox *ngFor=\"let item of state\"\r\n               [(ngModel)]=\"item[propertiesMapping.model]\"\r\n               [baCheckboxClass]=\"getProp(item, 'baCheckboxClass')\"\r\n               [label]=\"getProp(item, 'label')\"\r\n               [disabled]=\"getProp(item, 'disabled')\"\r\n               [value]=\"getProp(item, 'value')\"\r\n               id=\"{{getProp(item, 'id')}}\">\r\n  </ba-checkbox>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/theme/components/baMultiCheckbox/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baMultiCheckbox/baMultiCheckbox.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baPageTop/baPageTop.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var global_state_1 = __webpack_require__("./src/app/global.state.ts");
var app_service_1 = __webpack_require__("./src/app/app.service.ts");
var BaPageTop = (function () {
    function BaPageTop(_router, _state, _appState) {
        var _this = this;
        this._router = _router;
        this._state = _state;
        this._appState = _appState;
        this.isScrolled = false;
        this.isMenuCollapsed = false;
        this._state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    BaPageTop.prototype.logout = function () {
        // console.log('退出登录');
        localStorage.removeItem('id_token');
        this._router.navigate(['/auth']);
    };
    BaPageTop.prototype.toggleMenu = function () {
        this.isMenuCollapsed = !this.isMenuCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
        return false;
    };
    BaPageTop.prototype.scrolledChanged = function (isScrolled) {
        this.isScrolled = isScrolled;
    };
    BaPageTop = __decorate([
        core_1.Component({
            selector: 'ba-page-top',
            styles: [__webpack_require__("./src/app/theme/components/baPageTop/baPageTop.scss")],
            template: __webpack_require__("./src/app/theme/components/baPageTop/baPageTop.html"),
            encapsulation: core_1.ViewEncapsulation.None
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof global_state_1.GlobalState !== 'undefined' && global_state_1.GlobalState) === 'function' && _b) || Object, (typeof (_c = typeof app_service_1.AppState !== 'undefined' && app_service_1.AppState) === 'function' && _c) || Object])
    ], BaPageTop);
    return BaPageTop;
    var _a, _b, _c;
}());
exports.BaPageTop = BaPageTop;


/***/ },

/***/ "./src/app/theme/components/baPageTop/baPageTop.html":
/***/ function(module, exports) {

module.exports = "<div class=\"page-top clearfix\" baScrollPosition maxHeight=\"50\" (scrollChange)=\"scrolledChanged($event)\"\n     [ngClass]=\"{scrolled: isScrolled}\">\n  <a routerLink=\"/dashboard\" class=\"al-logo clearfix\"><span>Node</span>Press</a>\n  <a href (click)=\"toggleMenu()\" class=\"collapse-menu-link ion-navicon\"></a>\n\n  <div class=\"search\">\n    <i class=\"ion-ios-search-strong\" ng-click=\"startSearch()\"></i>\n    <input id=\"searchInput\" type=\"text\" placeholder=\"Search for...\">\n  </div>\n\n  <div class=\"user-profile clearfix\">\n    <div class=\"dropdown al-user-profile\">\n      <a class=\"profile-toggle-link dropdown-toggle\" id=\"user-profile-dd\" data-toggle=\"dropdown\" aria-expanded=\"false\">\n        <img src=\"{{ _appState.state.adminInfo.gravatar }}\">\n      </a>\n      <ul class=\"dropdown-menu top-dropdown-menu profile-dropdown\" aria-labelledby=\"user-profile-dd\">\n        <li class=\"dropdown-item\"><i class=\"dropdown-arr\"></i></li>\n        <li class=\"dropdown-item\">\n          <a routerLink=\"/options\">\n            <i class=\"fa fa-cog\"></i>\n            <span>设置/资料</span>\n          </a>\n        </li>\n        <li class=\"dropdown-item\">\n          <a class=\"signout\" [href]=\"\" (click)=\"logout()\">\n            <i class=\"fa fa-power-off\"></i>\n            <span>退出登录</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n    <ba-msg-center></ba-msg-center>\n  </div>\n</div>\n"

/***/ },

/***/ "./src/app/theme/components/baPageTop/baPageTop.scss":
/***/ function(module, exports) {

module.exports = "@charset \"UTF-8\";\n/* msg center */\n@-webkit-keyframes pulsate {\n  30% {\n    -webkit-transform: scale(0.1, 0.1);\n    opacity: 0.0; }\n  35% {\n    opacity: 1.0; }\n  40% {\n    -webkit-transform: scale(1.2, 1.2);\n    opacity: 0.0; } }\n\n.al-msg-center {\n  float: right;\n  padding: 0;\n  list-style: none;\n  margin: 13px 47px 0 0; }\n  .al-msg-center a {\n    color: #017170; }\n  .al-msg-center li {\n    list-style: none;\n    float: left;\n    margin-left: 30px; }\n    .al-msg-center li:first-child {\n      margin-left: 0; }\n    .al-msg-center li > a {\n      color: #ffffff;\n      text-decoration: none;\n      font-size: 13px;\n      position: relative; }\n      .al-msg-center li > a span {\n        display: inline-block;\n        min-width: 10px;\n        padding: 2px 4px 2px 4px;\n        color: #ffffff;\n        vertical-align: baseline;\n        white-space: nowrap;\n        text-align: center;\n        border-radius: 13px;\n        text-shadow: none;\n        line-height: 11px;\n        background-color: #e74c3c;\n        position: absolute;\n        top: -5px;\n        right: -14px;\n        font-size: 11px; }\n      .al-msg-center li > a .notification-ring {\n        border: 1px solid #e74c3c;\n        border-radius: 100px;\n        height: 40px;\n        width: 40px;\n        position: absolute;\n        top: -18px;\n        right: -27px;\n        animation: pulsate 8s ease-out;\n        animation-iteration-count: infinite;\n        opacity: 0.0; }\n      .al-msg-center li > a:hover {\n        color: #e74c3c; }\n        .al-msg-center li > a:hover.msg {\n          color: #017170; }\n      .al-msg-center li > a.msg span {\n        background-color: #017170; }\n      .al-msg-center li > a.msg .notification-ring {\n        border-color: #017170; }\n    .al-msg-center li.open > a {\n      color: #e74c3c; }\n      .al-msg-center li.open > a.msg {\n        color: #017170; }\n\n@media (max-width: 435px) {\n  .al-msg-center {\n    margin-right: 20px; }\n    .al-msg-center li {\n      margin-left: 20px; }\n      .al-msg-center li:first-child {\n        margin-left: 0; } }\n\n.msg-block-header {\n  display: inline-block;\n  padding: 0;\n  font-size: 13px;\n  margin: 0 0 0 6px; }\n\n.top-dropdown-menu {\n  width: 316px;\n  left: auto;\n  right: -47px;\n  top: 26px; }\n  .top-dropdown-menu ::-webkit-scrollbar {\n    width: 0.4em;\n    height: 0.4em; }\n  .top-dropdown-menu ::-webkit-scrollbar-thumb {\n    background: rgba(0, 0, 0, 0.5);\n    cursor: pointer; }\n  .top-dropdown-menu ::-webkit-scrollbar-track {\n    background: #fff; }\n  .top-dropdown-menu body {\n    scrollbar-face-color: rgba(0, 0, 0, 0.5);\n    scrollbar-track-color: #fff; }\n  .top-dropdown-menu .header {\n    padding: 10px 12px;\n    border-bottom: 1px solid #ffffff;\n    font-size: 12px; }\n    .top-dropdown-menu .header strong {\n      float: left;\n      color: #7d7d7d; }\n    .top-dropdown-menu .header > a {\n      float: right;\n      margin-left: 12px;\n      text-decoration: none; }\n      .top-dropdown-menu .header > a:hover {\n        color: #7d7d7d; }\n  .top-dropdown-menu .msg-list {\n    max-height: 296px;\n    overflow: scroll;\n    overflow-x: hidden; }\n    .top-dropdown-menu .msg-list > a {\n      padding: 10px 12px;\n      display: block;\n      text-decoration: none;\n      color: #7d7d7d;\n      font-size: 12px; }\n      .top-dropdown-menu .msg-list > a:first-child {\n        border-top: none; }\n      .top-dropdown-menu .msg-list > a .img-area {\n        float: left;\n        width: 36px; }\n        .top-dropdown-menu .msg-list > a .img-area img {\n          width: 36px;\n          height: 36px; }\n          .top-dropdown-menu .msg-list > a .img-area img.photo-msg-item {\n            border-radius: 18px; }\n        .top-dropdown-menu .msg-list > a .img-area > div {\n          width: 36px;\n          height: 36px;\n          border-radius: 4px;\n          font-size: 24px;\n          text-align: center; }\n          .top-dropdown-menu .msg-list > a .img-area > div.comments {\n            color: #f39c12; }\n          .top-dropdown-menu .msg-list > a .img-area > div.orders {\n            color: #f39c12; }\n          .top-dropdown-menu .msg-list > a .img-area > div i {\n            width: 36px;\n            line-height: 36px; }\n      .top-dropdown-menu .msg-list > a .msg-area {\n        float: right;\n        width: 230px; }\n        .top-dropdown-menu .msg-list > a .msg-area div {\n          max-height: 34px;\n          overflow: hidden;\n          text-overflow: ellipsis; }\n        .top-dropdown-menu .msg-list > a .msg-area span {\n          font-style: italic;\n          text-align: right;\n          display: block;\n          font-size: 11px; }\n      .top-dropdown-menu .msg-list > a:hover {\n        background: #E2F0FF; }\n  .top-dropdown-menu > a {\n    border-top: 1px solid #ffffff;\n    display: block;\n    text-align: center;\n    padding: 10px;\n    font-size: 12px;\n    text-decoration: none; }\n    .top-dropdown-menu > a:hover {\n      color: #7d7d7d; }\n  .top-dropdown-menu.profile-dropdown {\n    width: 145px;\n    top: 55px;\n    right: -25px; }\n    .top-dropdown-menu.profile-dropdown a {\n      text-align: left;\n      border: none;\n      text-decoration: none;\n      color: #7d7d7d; }\n      .top-dropdown-menu.profile-dropdown a.signout {\n        border-top: 1px solid #ffffff; }\n      .top-dropdown-menu.profile-dropdown a i {\n        margin-right: 10px; }\n      .top-dropdown-menu.profile-dropdown a:hover {\n        background: #f4fcff; }\n    .top-dropdown-menu.profile-dropdown i.dropdown-arr {\n      right: 25px; }\n  .top-dropdown-menu i.dropdown-arr {\n    position: absolute;\n    top: -22px;\n    right: 42px;\n    display: block;\n    width: 0;\n    height: 0;\n    border: 11px solid transparent;\n    border-bottom-color: rgba(0, 0, 0, 0.15); }\n    .top-dropdown-menu i.dropdown-arr:after {\n      top: -9px;\n      left: 0px;\n      margin-left: -10px;\n      content: \" \";\n      position: absolute;\n      display: block;\n      width: 0;\n      height: 0;\n      border: 10px solid transparent;\n      border-bottom-color: #ffffff; }\n\n@media (max-width: 415px) {\n  .top-dropdown-menu {\n    right: -81px; }\n    .top-dropdown-menu i.dropdown-arr {\n      right: 75px; } }\n\n.page-top {\n  background-color: #23282d;\n  position: fixed;\n  z-index: 904;\n  height: 45px;\n  width: 100%;\n  min-width: 320px;\n  padding: 0 20px 0 0;\n  border-bottom: 3px solid #101920; }\n  .page-top .dropdown-toggle::after {\n    display: none; }\n\n.blur .page-top.scrolled {\n  background-color: rgba(0, 0, 0, 0.85); }\n\na.al-logo {\n  color: #ffffff;\n  display: block;\n  font-size: 20px;\n  font-family: \"PingFang SC\", -apple-system, BlinkMacSystemFont, \"Roboto\", \"Century Gothic\", BlinkMacSystemFont, \"Segoe UI\", \"Microsoft yahei\", \"微软雅黑\", \"Helvetica Neue\", sans-serif, SimHei;\n  white-space: nowrap;\n  float: left;\n  outline: none !important;\n  line-height: 45px;\n  width: 190px;\n  text-align: center;\n  font-weight: bolder;\n  font-family: monospace; }\n  a.al-logo span {\n    margin-right: 2px;\n    color: #017170; }\n\n.user-profile {\n  float: right; }\n\n.al-user-profile {\n  float: right;\n  margin-right: 12px;\n  transition: all .15s ease-in-out;\n  padding: 0;\n  height: 45px;\n  border: 0;\n  opacity: 1;\n  position: relative; }\n  .al-user-profile a {\n    display: block; }\n    .al-user-profile a.profile-toggle-link {\n      height: 45px; }\n  .al-user-profile img {\n    width: 30px;\n    height: 30px;\n    border-radius: 50%;\n    margin-top: 6px; }\n\na.refresh-data {\n  color: #ffffff;\n  font-size: 13px;\n  text-decoration: none;\n  font-weight: 400;\n  float: right;\n  margin-top: 13px;\n  margin-right: 26px; }\n  a.refresh-data:hover {\n    color: #f39c12 !important; }\n\na.collapse-menu-link {\n  font-size: 31px;\n  cursor: pointer;\n  display: block;\n  text-decoration: none;\n  line-height: 43px;\n  color: #ffffff;\n  padding: 0;\n  float: left;\n  width: 40px;\n  text-align: center; }\n  a.collapse-menu-link:hover {\n    text-decoration: none;\n    color: #f39c12; }\n\n.al-skin-dropdown {\n  float: right;\n  margin-top: 14px;\n  margin-right: 26px; }\n  .al-skin-dropdown .tpl-skin-panel {\n    max-height: 300px;\n    overflow-y: scroll;\n    overflow-x: hidden; }\n\n.icon-palette {\n  display: inline-block;\n  width: 14px;\n  height: 13px;\n  background: url(\"assets/img/theme/palette.png\");\n  background-size: cover; }\n\n.search {\n  text-shadow: none;\n  font-size: 13px;\n  line-height: 25px;\n  transition: all 0.5s ease;\n  white-space: nowrap;\n  overflow: hidden;\n  width: 190px;\n  float: left;\n  margin: 9px 0 0 30px; }\n  .search label {\n    cursor: pointer; }\n  .search i {\n    width: 16px;\n    display: inline-block;\n    cursor: pointer;\n    padding-left: 1px;\n    font-size: 16px;\n    margin-right: 13px; }\n  .search input {\n    color: #ffffff;\n    background: none;\n    border: none;\n    outline: none;\n    width: 120px;\n    padding: 0;\n    margin: 0 0 0 -3px;\n    height: 27px; }\n\n@media screen and (max-width: 660px) {\n  .search {\n    display: none; } }\n\n@media screen and (max-width: 500px) {\n  .page-top {\n    padding: 0 20px; } }\n\n@media (max-width: 435px) {\n  .user-profile {\n    min-width: 136px; }\n  a.refresh-data {\n    margin-right: 10px; }\n  a.collapse-menu-link {\n    margin-left: 10px; }\n  .al-skin-dropdown {\n    display: none; } }\n\n.profile-toggle-link {\n  cursor: pointer; }\n"

/***/ },

/***/ "./src/app/theme/components/baPageTop/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baPageTop/baPageTop.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baPictureUploader/baPictureUploader.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var forms_1 = __webpack_require__("./node_modules/.2.1.1@@angular/forms/index.js");
var angular2_notifications_1 = __webpack_require__("./node_modules/.0.4.49@angular2-notifications/components.js");
var config_1 = __webpack_require__("./src/config.ts");
__webpack_require__("./src/app/theme/components/baPictureUploader/baPictureUploader.loader.ts");
var BaPictureUploader = (function () {
    // 构造函数
    function BaPictureUploader(renderer, _notificationsService) {
        this.renderer = renderer;
        this._notificationsService = _notificationsService;
        // 输入
        this.canDelete = true;
        this.defaultPicture = 'assets/img/theme/no-photo.png';
        this.uploaderOptions = {};
        this.uploadSizeLimit = 3000000;
        // 输出事件
        this.pictureChange = new core_1.EventEmitter();
        this.onUpload = new core_1.EventEmitter();
        this.onUploadCompleted = new core_1.EventEmitter();
        this.uploadProgress = 0;
        this.uploadInProgress = false;
        this.picture = '';
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    BaPictureUploader.prototype.ngOnInit = function () {
        var _this = this;
        // console.log(Qiniu, plupload, mOxie);
        this.qiniuUploader = Qiniu.uploader(Object.assign({
            // 设置一次只能选择一个文件
            multi_selection: false,
            // 上传模式,依次退化
            runtimes: 'html5 ,html4',
            // 上传选择的点选按钮，required
            browse_button: 'uploadFileBtn',
            // Ajax请求upToken的Url，**强烈建议设置**（服务端提供）
            uptoken_url: config_1.API_ROOT + "/qiniu",
            // 默认 false，key为文件名。若开启该选项，SDK为自动生成上传成功后的key（文件名）。
            unique_names: false,
            // 默认 false。若在服务端生成uptoken的上传策略中指定了 `sava_key`，则开启，SDK会忽略对key的处理
            save_key: false,
            // bucket 域名，下载资源时用到，required
            domain: 'http://upload.qiniu.com/',
            // 设置上传文件的时候是否每次都重新获取新的token
            get_new_uptoken: false,
            // 最大文件体积限制
            max_file_size: '10mb',
            // 上传失败最大重试次数
            max_retries: 3,
            // 开启可拖曳上传               
            dragdrop: false,
            // 拖曳上传区域元素的ID，拖曳文件或文件夹后可触发上传
            // drop_element: 'container',
            // 分块上传时，每片的体积
            chunk_size: '4mb',
            // 选择文件后自动上传，若关闭需要自己绑定事件触发上传
            auto_start: true,
            log_level: 5,
            // 回调函数              
            init: {
                // 文件添加进队列后,处理相关的事情
                'FilesAdded': function (up, files) {
                    console.log('文件添加进队列', files);
                },
                // 每个文件上传前,处理相关的事情
                'BeforeUpload': function (up, file) {
                    console.log('文件上传前', file);
                },
                // 每个文件上传时,处理相关的事情
                'UploadProgress': function (up, file) {
                    console.log('文件上传时', file);
                    _this.uploadInProgress = true;
                    _this.uploadProgress = file.percent;
                },
                // 每个文件上传成功后,处理相关的事情
                'FileUploaded': function (up, file, info) {
                    console.log('文件上传成功后', file);
                    _this.uploadInProgress = false;
                    var data = config_1.STATIC_URL + "/" + JSON.parse(info).key;
                    _this.onUploadCompleted.emit(data);
                    _this.changePictureFromURL(data);
                },
                // 上传出错时,处理相关的事情
                'Error': function (up, err, errTip) {
                    _this.uploadInProgress = false;
                    _this._notificationsService.error('上传失败', JSON.parse(err.response).error, { timeOut: 850 });
                },
                // 队列文件处理完毕后,处理相关的事情
                'UploadComplete': function () {
                    _this.uploadInProgress = false;
                    // console.log('文件全部上传完毕');
                },
                // 若想在前端对每个文件的key进行个性化处理，可以配置该函数，该配置必须要在 unique_names: false , save_key: false 时才生效
                'Key': function (up, file) {
                    return "nodepress/image/" + file.name;
                }
            }
        }, this.uploaderOptions));
    };
    // 要上传的文件变更时（组件拦截）
    BaPictureUploader.prototype.onFiles = function () {
        var _this = this;
        // 当前文件
        var file = this._fileUpload.nativeElement.files[0];
        if (!file)
            return false;
        // 大于限定尺寸，不上传
        if (file.size > this.uploadSizeLimit) {
            this._notificationsService.error('上传失败', '文件不合法！', { timeOut: 500 });
            return false;
        }
        // 如果图片小于10K，则输出base64，否则上传
        if (file.size <= 10000) {
            var reader = new FileReader();
            reader.onload = function (event) {
                var imgBase64 = event.target.result;
                _this.emitPicture(imgBase64);
            };
            reader.readAsDataURL(file);
            return false;
        }
        // 否则添加进队列，执行七牛上传
        this.qiniuUploader.addFile(file);
    };
    // 点击自定义上传空间元素的时候调用input的click方法
    BaPictureUploader.prototype.bringFileSelector = function () {
        this.onModelTouched();
        this.renderer.invokeElementMethod(this._fileUpload.nativeElement, 'click');
        return false;
    };
    // 根据url读取一张图片
    BaPictureUploader.prototype.changePictureFromURL = function (url) {
        var _this = this;
        var image = new Image();
        image.onload = function (event) {
            _this.emitPicture(url);
        };
        image.onerror = function (event) {
            _this._notificationsService.error('预览失败', '七牛太垃圾！', { timeOut: 800 });
            _this.emitPicture(url);
        };
        image.src = url;
    };
    // 根据base64读取一张图片
    BaPictureUploader.prototype.changePictureFromDataURL = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.addEventListener('load', function (event) {
            console.log(event);
            _this.picture = event.target.result;
        }, false);
        reader.readAsDataURL(file);
    };
    // 删除图片方法
    BaPictureUploader.prototype.removePicture = function () {
        this.onModelTouched();
        this.emitPicture('');
        return false;
    };
    // 更新及传出数据
    BaPictureUploader.prototype.emitPicture = function (picture) {
        this.picture = picture;
        this.onModelChange(picture);
        this.pictureChange.emit(picture);
    };
    // 写数据
    BaPictureUploader.prototype.writeValue = function (currentValue) {
        this.picture = currentValue;
    };
    // 注册事件
    BaPictureUploader.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    // 注册事件
    BaPictureUploader.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    __decorate([
        core_1.ViewChild('fileUpload'), 
        __metadata('design:type', (typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object)
    ], BaPictureUploader.prototype, "_fileUpload", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BaPictureUploader.prototype, "canDelete", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaPictureUploader.prototype, "defaultPicture", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaPictureUploader.prototype, "uploaderOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BaPictureUploader.prototype, "uploadSizeLimit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
    ], BaPictureUploader.prototype, "pictureChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_c = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _c) || Object)
    ], BaPictureUploader.prototype, "onUpload", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_d = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _d) || Object)
    ], BaPictureUploader.prototype, "onUploadCompleted", void 0);
    BaPictureUploader = __decorate([
        core_1.Component({
            selector: 'ba-picture-uploader',
            styles: [__webpack_require__("./src/app/theme/components/baPictureUploader/baPictureUploader.scss")],
            template: __webpack_require__("./src/app/theme/components/baPictureUploader/baPictureUploader.html"),
            providers: [{
                    provide: forms_1.NG_VALUE_ACCESSOR,
                    useExisting: core_1.forwardRef(function () { return BaPictureUploader; }),
                    multi: true
                }]
        }), 
        __metadata('design:paramtypes', [(typeof (_e = typeof core_1.Renderer !== 'undefined' && core_1.Renderer) === 'function' && _e) || Object, (typeof (_f = typeof angular2_notifications_1.NotificationsService !== 'undefined' && angular2_notifications_1.NotificationsService) === 'function' && _f) || Object])
    ], BaPictureUploader);
    return BaPictureUploader;
    var _a, _b, _c, _d, _e, _f;
}());
exports.BaPictureUploader = BaPictureUploader;


/***/ },

/***/ "./src/app/theme/components/baPictureUploader/baPictureUploader.html":
/***/ function(module, exports) {

module.exports = "<div class=\"picture-group\" [ngClass]=\"{ uploading: uploadInProgress }\">\r\n  <div class=\"picture-wrapper\" id=\"pictureWrapper\" (click)=\"bringFileSelector()\">\r\n    <img src=\"{{ picture }}\" *ngIf=\"picture\">\r\n    <img src=\"{{ defaultPicture }}\" *ngIf=\"!picture && defaultPicture\">\r\n    <div class=\"loading\" *ngIf=\"uploadInProgress\">\r\n      <div class=\"spinner\">\r\n        <div class=\"double-bounce1\"></div>\r\n        <div class=\"double-bounce2\"></div>\r\n      </div>\r\n      <p class=\"load-progress\">{{ uploadProgress }}%</p>\r\n    </div>\r\n  </div>\r\n  <i class=\"ion-ios-close-outline\" *ngIf=\"picture && canDelete\" (click)=\"removePicture()\"></i>\r\n  <a href class=\"change-picture\" (click)=\"bringFileSelector()\">点击上传图片</a>\r\n  <input #fileUpload type=\"file\" hidden=\"true\" id=\"uploadFile\" (change)=\"onFiles()\">\r\n  <button id=\"uploadFileBtn\" style=\"display: none\"></button>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/theme/components/baPictureUploader/baPictureUploader.loader.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var moxie = __webpack_require__("./node_modules/.2.3.0@plupload/js/moxie.js");
if (!window.mOxie) {
    window.mOxie = {
        Env: moxie.core.utils.Env,
        XMLHttpRequest: moxie.xhr.XMLHttpRequest
    };
}
;
window.plupload = __webpack_require__("./node_modules/.2.3.0@plupload/js/plupload.dev.js");
__webpack_require__("./node_modules/.1.0.14-beta@qiniu-js/dist/qiniu.js");


/***/ },

/***/ "./src/app/theme/components/baPictureUploader/baPictureUploader.scss":
/***/ function(module, exports) {

module.exports = ".picture-group {\n  border: 1px dashed #b8b8b8;\n  width: 100%;\n  height: 100%;\n  position: relative;\n  cursor: pointer; }\n  .picture-group .picture-wrapper {\n    width: 100%;\n    height: 100%;\n    overflow: hidden;\n    display: flex;\n    justify-content: center;\n    align-items: center; }\n  .picture-group img {\n    max-width: 100%;\n    max-height: 100%; }\n  .picture-group i {\n    display: none;\n    position: absolute;\n    font-size: 35px;\n    line-height: 29px;\n    background: #ffffff;\n    cursor: pointer;\n    color: #017170;\n    top: -11px;\n    right: -11px;\n    height: 28px;\n    width: 28px;\n    border-radius: 50%; }\n    .picture-group i:before {\n      line-height: 26px; }\n    .picture-group i:hover {\n      color: #e74c3c; }\n  .picture-group a.change-picture {\n    display: none;\n    width: 100%;\n    background: rgba(0, 0, 0, 0.7);\n    transition: all 200ms ease-in-out;\n    color: #ffffff;\n    text-decoration: none;\n    position: absolute;\n    bottom: 0;\n    left: 0;\n    line-height: 32px;\n    text-align: center; }\n  .picture-group:hover i {\n    display: block; }\n  .picture-group:hover .change-picture {\n    display: block; }\n  .picture-group .loading {\n    width: 100%;\n    height: 100%;\n    left: 0;\n    display: flex;\n    position: absolute;\n    justify-content: center;\n    align-items: center;\n    background-color: rgba(210, 210, 210, 0.9); }\n    .picture-group .loading .spinner {\n      width: 60px;\n      height: 60px;\n      position: relative; }\n    .picture-group .loading .load-progress {\n      position: absolute;\n      bottom: 5%;\n      color: black; }\n  .picture-group .double-bounce1, .picture-group .double-bounce2 {\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    background-color: #fff;\n    opacity: 0.6;\n    position: absolute;\n    top: 0;\n    left: 0;\n    -webkit-animation: sk-bounce 2.0s infinite ease-in-out;\n    animation: sk-bounce 2.0s infinite ease-in-out; }\n  .picture-group .double-bounce2 {\n    -webkit-animation-delay: -1.0s;\n    animation-delay: -1.0s; }\n\n@-webkit-keyframes sk-bounce {\n  0%, 100% {\n    -webkit-transform: scale(0); }\n  50% {\n    -webkit-transform: scale(1); } }\n\n@keyframes sk-bounce {\n  0%, 100% {\n    transform: scale(0);\n    -webkit-transform: scale(0); }\n  50% {\n    transform: scale(1);\n    -webkit-transform: scale(1); } }\n"

/***/ },

/***/ "./src/app/theme/components/baPictureUploader/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baPictureUploader/baPictureUploader.component.ts"));


/***/ },

/***/ "./src/app/theme/components/baSidebar/baSidebar.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var global_state_1 = __webpack_require__("./src/app/global.state.ts");
var theme_1 = __webpack_require__("./src/app/theme/index.ts");
var app_menu_1 = __webpack_require__("./src/app/app.menu.ts");
var _ = __webpack_require__("./node_modules/.4.17.4@lodash/lodash.js");
var BaSidebar = (function () {
    function BaSidebar(_elementRef, _state) {
        var _this = this;
        this._elementRef = _elementRef;
        this._state = _state;
        // here we declare which routes we want to use as a menu in our sidebar
        this.routes = _.cloneDeep(app_menu_1.MENU); // we're creating a deep copy since we are going to change that object
        this.isMenuCollapsed = false;
        this.isMenuShouldCollapsed = false;
        this._state.subscribe('menu.isCollapsed', function (isCollapsed) {
            _this.isMenuCollapsed = isCollapsed;
        });
    }
    BaSidebar.prototype.ngOnInit = function () {
        if (this._shouldMenuCollapse()) {
            this.menuCollapse();
        }
    };
    BaSidebar.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateSidebarHeight(); });
    };
    BaSidebar.prototype.onWindowResize = function () {
        var isMenuShouldCollapsed = this._shouldMenuCollapse();
        if (this.isMenuShouldCollapsed !== isMenuShouldCollapsed) {
            this.menuCollapseStateChange(isMenuShouldCollapsed);
        }
        this.isMenuShouldCollapsed = isMenuShouldCollapsed;
        this.updateSidebarHeight();
    };
    BaSidebar.prototype.menuExpand = function () {
        this.menuCollapseStateChange(false);
    };
    BaSidebar.prototype.menuCollapse = function () {
        this.menuCollapseStateChange(true);
    };
    BaSidebar.prototype.menuCollapseStateChange = function (isCollapsed) {
        this.isMenuCollapsed = isCollapsed;
        this._state.notifyDataChanged('menu.isCollapsed', this.isMenuCollapsed);
    };
    BaSidebar.prototype.updateSidebarHeight = function () {
        // TODO: get rid of magic 84 constant
        this.menuHeight = this._elementRef.nativeElement.childNodes[0].clientHeight - 215;
    };
    BaSidebar.prototype._shouldMenuCollapse = function () {
        return window.innerWidth <= theme_1.layoutSizes.resWidthCollapseSidebar;
    };
    __decorate([
        core_1.HostListener('window:resize'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], BaSidebar.prototype, "onWindowResize", null);
    BaSidebar = __decorate([
        core_1.Component({
            selector: 'ba-sidebar',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/theme/components/baSidebar/baSidebar.scss")],
            template: __webpack_require__("./src/app/theme/components/baSidebar/baSidebar.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object, (typeof (_b = typeof global_state_1.GlobalState !== 'undefined' && global_state_1.GlobalState) === 'function' && _b) || Object])
    ], BaSidebar);
    return BaSidebar;
    var _a, _b;
}());
exports.BaSidebar = BaSidebar;


/***/ },

/***/ "./src/app/theme/components/baSidebar/baSidebar.html":
/***/ function(module, exports) {

module.exports = "<aside class=\"al-sidebar\" (mouseleave)=\"hoverElemTop=outOfArea\" sidebarResize>\n  <ba-menu [menuRoutes]=\"routes\"\n           [menuHeight]=\"menuHeight\"\n           [sidebarCollapsed]=\"isMenuCollapsed\"\n           (expandMenu)=\"menuExpand()\"></ba-menu>\n</aside>\n"

/***/ },

/***/ "./src/app/theme/components/baSidebar/baSidebar.scss":
/***/ function(module, exports) {

module.exports = ".al-sidebar {\n  width: 190px;\n  top: 45px;\n  left: 0;\n  z-index: 1001;\n  display: block;\n  min-height: 100%;\n  background-color: #23282d;\n  height: 100%;\n  position: fixed; }\n\n.al-sidebar-list {\n  margin: 0;\n  overflow: hidden;\n  padding: 0;\n  list-style: none; }\n\n.al-sidebar-sublist .subitem-submenu-list {\n  padding-left: 15px; }\n\n.subitem-submenu-link .fa {\n  top: 7px; }\n\n.al-sidebar-list-item {\n  display: block;\n  position: relative;\n  float: none;\n  padding: 0; }\n  .al-sidebar-list-item.selected:not(.with-sub-menu) {\n    background-color: #017170; }\n    .al-sidebar-list-item.selected:not(.with-sub-menu) a.al-sidebar-list-link {\n      color: #ffffff; }\n      .al-sidebar-list-item.selected:not(.with-sub-menu) a.al-sidebar-list-link b {\n        color: #ffffff; }\n\n.ba-sidebar-item-expanded > ul.al-sidebar-sublist {\n  display: block !important; }\n\n.al-sidebar-list-item.ba-sidebar-item-expanded > .al-sidebar-list-link b, .ba-sidebar-sublist-item.ba-sidebar-item-expanded > .al-sidebar-list-link b {\n  transform: rotate(180deg); }\n\n.al-sidebar-list-item.ba-sidebar-item-expanded > .al-sidebar-sublist, .ba-sidebar-sublist-item.ba-sidebar-item-expanded > .al-sidebar-sublist {\n  display: block; }\n\na.al-sidebar-list-link {\n  display: block;\n  height: 42px;\n  padding-left: 18px;\n  text-shadow: none;\n  font-size: 13px;\n  text-decoration: none;\n  color: #ffffff;\n  line-height: 42px;\n  white-space: nowrap;\n  overflow: hidden;\n  cursor: pointer; }\n  a.al-sidebar-list-link:hover {\n    color: #017170; }\n    a.al-sidebar-list-link:hover b {\n      color: #017170; }\n  a.al-sidebar-list-link i {\n    margin-right: 18px;\n    width: 16px;\n    display: inline-block; }\n  a.al-sidebar-list-link b {\n    display: block;\n    opacity: 1;\n    width: 14px;\n    height: 14px;\n    line-height: 14px;\n    text-shadow: none;\n    font-size: 18px;\n    position: absolute;\n    right: 10px;\n    top: 12px;\n    padding: 0;\n    text-align: center;\n    color: #ffffff;\n    transition: transform 0.2s linear; }\n\na.al-sidebar-user {\n  display: block;\n  padding: 15px;\n  border-bottom: 3px solid #101920;\n  overflow: hidden; }\n  a.al-sidebar-user > .al-sidebar-user-gravatar {\n    display: block;\n    width: 85px;\n    height: 85px;\n    border-radius: 100%;\n    margin: 0 auto;\n    border: 3px solid #101920;\n    transform: rotate(0deg);\n    transition: all 1s; }\n  a.al-sidebar-user > .al-sidebar-user-profile {\n    display: block;\n    width: 100%;\n    margin-top: 1em; }\n    a.al-sidebar-user > .al-sidebar-user-profile > .al-sidebar-user-name {\n      margin-bottom: 10px;\n      text-align: center;\n      color: #ffffff; }\n    a.al-sidebar-user > .al-sidebar-user-profile > .al-sidebar-user-slogan {\n      text-align: center;\n      overflow: hidden;\n      text-overflow: ellipsis;\n      white-space: nowrap;\n      display: block; }\n  a.al-sidebar-user:hover .al-sidebar-user-gravatar {\n    transform: rotate(360deg);\n    transition: all 1s; }\n\n.slimScrollBar, .slimScrollRail {\n  border-radius: 0px !important;\n  width: 4px !important;\n  left: 186px; }\n\n.al-sidebar-sublist {\n  padding: 0;\n  list-style: none;\n  position: relative;\n  display: none;\n  background-color: #101920; }\n  .al-sidebar-sublist.expanded {\n    display: block; }\n  .al-sidebar-sublist > ba-menu-item > li {\n    display: block;\n    float: none;\n    padding: 0;\n    border-bottom: none;\n    position: relative; }\n    .al-sidebar-sublist > ba-menu-item > li a {\n      display: block;\n      text-shadow: none;\n      font-size: 13px;\n      text-decoration: none;\n      color: #ffffff;\n      padding-left: 35px;\n      height: auto;\n      line-height: 40px; }\n      .al-sidebar-sublist > ba-menu-item > li a:hover {\n        color: #017170; }\n    .al-sidebar-sublist > ba-menu-item > li.selected:not(.with-sub-menu) > a {\n      border: none;\n      background-color: #017170; }\n      .al-sidebar-sublist > ba-menu-item > li.selected:not(.with-sub-menu) > a:hover {\n        color: #ffffff; }\n\n.sidebar-hover-elem {\n  width: 4px;\n  background: #017170;\n  position: absolute;\n  top: -150px;\n  left: 186px;\n  transition: all 0.5s ease;\n  transition-property: top, height;\n  height: 42px;\n  display: block; }\n\n.sidebar-select-elem {\n  display: block;\n  top: 94px; }\n\n.menu-collapsed .slimScrollBar, .menu-collapsed .slimScrollRail {\n  display: none !important; }\n\n@media (min-width: 1200px) {\n  .menu-collapsed .al-main {\n    margin-left: 50px; }\n  .menu-collapsed .al-footer {\n    padding-left: 83px; } }\n\n@media (min-width: 501px) {\n  .menu-collapsed .al-sidebar {\n    width: 52px; }\n    .menu-collapsed .al-sidebar .fa-angle-down, .menu-collapsed .al-sidebar .fa-angle-up {\n      opacity: 0; }\n    .menu-collapsed .al-sidebar .al-sidebar-sublist {\n      position: absolute;\n      top: -1px;\n      left: 52px;\n      background: rgba(0, 0, 0, 0.8);\n      width: 0;\n      display: block;\n      overflow: hidden;\n      transition: width 0.5s ease; }\n      .menu-collapsed .al-sidebar .al-sidebar-sublist.slide-right {\n        width: 135px; }\n      .menu-collapsed .al-sidebar .al-sidebar-sublist:before {\n        display: none; }\n      .menu-collapsed .al-sidebar .al-sidebar-sublist li:before {\n        display: none; }\n      .menu-collapsed .al-sidebar .al-sidebar-sublist li a {\n        padding-left: 18px;\n        padding-right: 18px;\n        min-width: 130px;\n        white-space: nowrap; }\n    .menu-collapsed .al-sidebar .sidebar-hover-elem, .menu-collapsed .al-sidebar .sidebar-select-elem {\n      left: 48px; } }\n\n@media (max-width: 1200px) and (min-width: 500px) {\n  .al-main {\n    margin-left: 50px; }\n  .al-footer {\n    padding-left: 83px; } }\n\n@media (max-width: 1200px) {\n  .al-sidebar {\n    width: 190px;\n    background: rgba(0, 0, 0, 0.75);\n    transition: width 0.5s ease; }\n    .al-sidebar .fa-angle-down, .al-sidebar .fa-angle-up {\n      opacity: 1; }\n    .al-sidebar .al-sidebar-sublist {\n      padding: 0;\n      list-style: none;\n      position: relative;\n      display: none;\n      background-color: #101920;\n      top: auto;\n      left: auto;\n      background: none;\n      width: auto;\n      overflow: visible;\n      transition: none; }\n      .al-sidebar .al-sidebar-sublist.expanded {\n        display: block; }\n      .al-sidebar .al-sidebar-sublist > ba-menu-item > li {\n        display: block;\n        float: none;\n        padding: 0;\n        border-bottom: none;\n        position: relative; }\n        .al-sidebar .al-sidebar-sublist > ba-menu-item > li a {\n          display: block;\n          text-shadow: none;\n          font-size: 13px;\n          text-decoration: none;\n          color: #ffffff;\n          padding-left: 35px;\n          height: auto;\n          line-height: 40px; }\n          .al-sidebar .al-sidebar-sublist > ba-menu-item > li a:hover {\n            color: #017170; }\n        .al-sidebar .al-sidebar-sublist > ba-menu-item > li.selected:not(.with-sub-menu) > a {\n          border: none;\n          background-color: #017170; }\n          .al-sidebar .al-sidebar-sublist > ba-menu-item > li.selected:not(.with-sub-menu) > a:hover {\n            color: #ffffff; }\n    .al-sidebar .sidebar-hover-elem, .al-sidebar .sidebar-select-elem {\n      left: 186px;\n      transition: left 0.5s ease; } }\n\n@media (max-width: 500px) {\n  .menu-collapsed .al-sidebar {\n    width: 0; }\n  .menu-collapsed .sidebar-hover-elem, .menu-collapsed .sidebar-select-elem {\n    display: none; }\n  .al-main {\n    margin-left: 0; }\n  .al-footer {\n    padding-left: 0; } }\n"

/***/ },

/***/ "./src/app/theme/components/baSidebar/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baSidebar/baSidebar.component.ts"));


/***/ },

/***/ "./src/app/theme/components/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/components/baPageTop/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baMsgCenter/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baSidebar/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baMenu/components/baMenuItem/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baMenu/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baContentTop/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baCard/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baBackTop/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baPictureUploader/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baCheckbox/index.ts"));
__export(__webpack_require__("./src/app/theme/components/baMultiCheckbox/index.ts"));


/***/ },

/***/ "./src/app/theme/directives/baScrollPosition/baScrollPosition.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaScrollPosition = (function () {
    function BaScrollPosition() {
        this.scrollChange = new core_1.EventEmitter();
    }
    BaScrollPosition.prototype.ngOnInit = function () {
        this.onWindowScroll();
    };
    BaScrollPosition.prototype.onWindowScroll = function () {
        var isScrolled = window.scrollY > this.maxHeight;
        if (isScrolled !== this._isScrolled) {
            this._isScrolled = isScrolled;
            this.scrollChange.emit(isScrolled);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], BaScrollPosition.prototype, "maxHeight", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
    ], BaScrollPosition.prototype, "scrollChange", void 0);
    __decorate([
        core_1.HostListener('window:scroll'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], BaScrollPosition.prototype, "onWindowScroll", null);
    BaScrollPosition = __decorate([
        core_1.Directive({
            selector: '[baScrollPosition]'
        }), 
        __metadata('design:paramtypes', [])
    ], BaScrollPosition);
    return BaScrollPosition;
    var _a;
}());
exports.BaScrollPosition = BaScrollPosition;


/***/ },

/***/ "./src/app/theme/directives/baScrollPosition/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/directives/baScrollPosition/baScrollPosition.directive.ts"));


/***/ },

/***/ "./src/app/theme/directives/baSlimScroll/baSlimScroll.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
__webpack_require__("./src/app/theme/directives/baSlimScroll/baSlimScroll.loader.ts");
var BaSlimScroll = (function () {
    function BaSlimScroll(_elementRef) {
        this._elementRef = _elementRef;
    }
    BaSlimScroll.prototype.ngOnChanges = function (changes) {
        this._scroll();
    };
    BaSlimScroll.prototype._scroll = function () {
        this._destroy();
        this._init();
    };
    BaSlimScroll.prototype._init = function () {
        jQuery(this._elementRef.nativeElement).slimScroll(this.baSlimScrollOptions);
    };
    BaSlimScroll.prototype._destroy = function () {
        jQuery(this._elementRef.nativeElement).slimScroll({ destroy: true });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaSlimScroll.prototype, "baSlimScrollOptions", void 0);
    BaSlimScroll = __decorate([
        core_1.Directive({
            selector: '[baSlimScroll]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
    ], BaSlimScroll);
    return BaSlimScroll;
    var _a;
}());
exports.BaSlimScroll = BaSlimScroll;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/.2.2.4@jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/theme/directives/baSlimScroll/baSlimScroll.lib.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(jQuery) {"use strict";
/*! Copyright (c) 2011 Piotr Rochala (http://rocha.la)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Version: 1.3.8
 *
 */
(function ($) {
    var t, pageY, currTop;
    $.fn.extend({
        slimScroll: function (options) {
            var defaults = {
                // width in pixels of the visible scroll area
                width: 'auto',
                // height in pixels of the visible scroll area
                height: '250px',
                // width in pixels of the scrollbar and rail
                size: '7px',
                // scrollbar color, accepts any hex/color value
                color: '#000',
                // scrollbar position - left/right
                position: 'right',
                // distance in pixels between the side edge and the scrollbar
                distance: '1px',
                // default scroll position on load - top / bottom / $('selector')
                start: 'top',
                // sets scrollbar opacity
                opacity: .4,
                // enables always-on mode for the scrollbar
                alwaysVisible: false,
                // check if we should hide the scrollbar when user is hovering over
                disableFadeOut: false,
                // sets visibility of the rail
                railVisible: false,
                // sets rail color
                railColor: '#333',
                // sets rail opacity
                railOpacity: .2,
                // whether  we should use jQuery UI Draggable to enable bar dragging
                railDraggable: true,
                // defautlt CSS class of the slimscroll rail
                railClass: 'slimScrollRail',
                // defautlt CSS class of the slimscroll bar
                barClass: 'slimScrollBar',
                // defautlt CSS class of the slimscroll wrapper
                wrapperClass: 'slimScrollDiv',
                // check if mousewheel should scroll the window if we reach top/bottom
                allowPageScroll: false,
                // scroll amount applied to each mouse wheel step
                wheelStep: 20,
                // scroll amount applied when user is using gestures
                touchScrollStep: 200,
                // sets border radius
                borderRadius: '7px',
                // sets border radius of the rail
                railBorderRadius: '7px'
            };
            var o = $.extend(defaults, options);
            // do it for every element that matches selector
            this.each(function () {
                var isOverPanel, isOverBar, isDragg, queueHide, touchDif, barHeight, percentScroll, lastScroll, divS = '<div></div>', minBarHeight = 30, releaseScroll = false;
                // used in event handlers and for better minification
                var me = $(this);
                // ensure we are not binding it again
                if (me.parent().hasClass(o.wrapperClass)) {
                    // start from last bar position
                    var offset = me.scrollTop();
                    // find bar and rail
                    bar = me.siblings('.' + o.barClass);
                    rail = me.siblings('.' + o.railClass);
                    getBarHeight();
                    // check if we should scroll existing instance
                    if ($.isPlainObject(options)) {
                        // Pass height: auto to an existing slimscroll object to force a resize after contents have changed
                        if ('height' in options && options.height == 'auto') {
                            me.parent().css('height', 'auto');
                            me.css('height', 'auto');
                            var height = me.parent().parent().height();
                            me.parent().css('height', height);
                            me.css('height', height);
                        }
                        else if ('height' in options) {
                            var h = options.height;
                            me.parent().css('height', h);
                            me.css('height', h);
                        }
                        if ('scrollTo' in options) {
                            // jump to a static point
                            offset = parseInt(o.scrollTo);
                        }
                        else if ('scrollBy' in options) {
                            // jump by value pixels
                            offset += parseInt(o.scrollBy);
                        }
                        else if ('destroy' in options) {
                            // remove slimscroll elements
                            bar.remove();
                            rail.remove();
                            me.unwrap();
                            return;
                        }
                        // scroll content by the given offset
                        scrollContent(offset, false, true);
                    }
                    return;
                }
                else if ($.isPlainObject(options)) {
                    if ('destroy' in options) {
                        return;
                    }
                }
                // optionally set height to the parent's height
                o.height = (o.height == 'auto') ? me.parent().height() : o.height;
                // wrap content
                var wrapper = $(divS)
                    .addClass(o.wrapperClass)
                    .css({
                    position: 'relative',
                    overflow: 'hidden',
                    width: o.width,
                    height: o.height
                });
                // update style for the div
                me.css({
                    overflow: 'hidden',
                    width: o.width,
                    height: o.height
                });
                // create scrollbar rail
                var rail = $(divS)
                    .addClass(o.railClass)
                    .css({
                    width: o.size,
                    height: '100%',
                    position: 'absolute',
                    top: 0,
                    display: (o.alwaysVisible && o.railVisible) ? 'block' : 'none',
                    'border-radius': o.railBorderRadius,
                    background: o.railColor,
                    opacity: o.railOpacity,
                    zIndex: 90
                });
                // create scrollbar
                var bar = $(divS)
                    .addClass(o.barClass)
                    .css({
                    background: o.color,
                    width: o.size,
                    position: 'absolute',
                    top: 0,
                    opacity: o.opacity,
                    display: o.alwaysVisible ? 'block' : 'none',
                    'border-radius': o.borderRadius,
                    BorderRadius: o.borderRadius,
                    MozBorderRadius: o.borderRadius,
                    WebkitBorderRadius: o.borderRadius,
                    zIndex: 99
                });
                // set position
                var posCss = (o.position == 'right') ? { right: o.distance } : { left: o.distance };
                rail.css(posCss);
                bar.css(posCss);
                // wrap it
                me.wrap(wrapper);
                // append to parent div
                me.parent().append(bar);
                me.parent().append(rail);
                // make it draggable and no longer dependent on the jqueryUI
                if (o.railDraggable) {
                    bar.bind("mousedown", function (e) {
                        var $doc = $(document);
                        isDragg = true;
                        t = parseFloat(bar.css('top'));
                        pageY = e.pageY;
                        $doc.bind("mousemove.slimscroll", function (e) {
                            currTop = t + e.pageY - pageY;
                            bar.css('top', currTop);
                            scrollContent(0, bar.position().top, false); // scroll content
                        });
                        $doc.bind("mouseup.slimscroll", function (e) {
                            isDragg = false;
                            hideBar();
                            $doc.unbind('.slimscroll');
                        });
                        return false;
                    }).bind("selectstart.slimscroll", function (e) {
                        e.stopPropagation();
                        e.preventDefault();
                        return false;
                    });
                }
                // on rail over
                rail.hover(function () {
                    showBar();
                }, function () {
                    hideBar();
                });
                // on bar over
                bar.hover(function () {
                    isOverBar = true;
                }, function () {
                    isOverBar = false;
                });
                // show on parent mouseover
                me.hover(function () {
                    isOverPanel = true;
                    showBar();
                    hideBar();
                }, function () {
                    isOverPanel = false;
                    hideBar();
                });
                // support for mobile
                me.bind('touchstart', function (e, b) {
                    if (e.originalEvent.touches.length) {
                        // record where touch started
                        touchDif = e.originalEvent.touches[0].pageY;
                    }
                });
                me.bind('touchmove', function (e) {
                    // prevent scrolling the page if necessary
                    if (!releaseScroll) {
                        e.originalEvent.preventDefault();
                    }
                    if (e.originalEvent.touches.length) {
                        // see how far user swiped
                        var diff = (touchDif - e.originalEvent.touches[0].pageY) / o.touchScrollStep;
                        // scroll content
                        scrollContent(diff, true, false);
                        touchDif = e.originalEvent.touches[0].pageY;
                    }
                });
                // set up initial height
                getBarHeight();
                // check start position
                if (o.start === 'bottom') {
                    // scroll content to bottom
                    bar.css({ top: me.outerHeight() - bar.outerHeight() });
                    scrollContent(0, true, false);
                }
                else if (o.start !== 'top') {
                    // assume jQuery selector
                    scrollContent($(o.start).position().top, null, true);
                    // make sure bar stays hidden
                    if (!o.alwaysVisible) {
                        bar.hide();
                    }
                }
                // attach scroll events
                attachWheel(this);
                function _onWheel(e) {
                    // use mouse wheel only when mouse is over
                    if (!isOverPanel) {
                        return;
                    }
                    var e = e || window.event;
                    var delta = 0;
                    if (e.wheelDelta) {
                        delta = -e.wheelDelta / 120;
                    }
                    if (e.detail) {
                        delta = e.detail / 3;
                    }
                    var target = e.target || e.srcTarget || e.srcElement;
                    if ($(target).closest('.' + o.wrapperClass).is(me.parent())) {
                        // scroll content
                        scrollContent(delta, true, false);
                    }
                    // stop window scroll
                    if (e.preventDefault && !releaseScroll) {
                        e.preventDefault();
                    }
                    if (!releaseScroll) {
                        e.returnValue = false;
                    }
                }
                function scrollContent(y, isWheel, isJump) {
                    releaseScroll = false;
                    var delta = y;
                    var maxTop = me.outerHeight() - bar.outerHeight();
                    if (isWheel) {
                        // move bar with mouse wheel
                        delta = parseInt(bar.css('top')) + y * parseInt(o.wheelStep) / 100 * bar.outerHeight();
                        // move bar, make sure it doesn't go out
                        delta = Math.min(Math.max(delta, 0), maxTop);
                        // if scrolling down, make sure a fractional change to the
                        // scroll position isn't rounded away when the scrollbar's CSS is set
                        // this flooring of delta would happened automatically when
                        // bar.css is set below, but we floor here for clarity
                        delta = (y > 0) ? Math.ceil(delta) : Math.floor(delta);
                        // scroll the scrollbar
                        bar.css({ top: delta + 'px' });
                    }
                    // calculate actual scroll amount
                    percentScroll = parseInt(bar.css('top')) / (me.outerHeight() - bar.outerHeight());
                    delta = percentScroll * (me[0].scrollHeight - me.outerHeight());
                    if (isJump) {
                        delta = y;
                        var offsetTop = delta / me[0].scrollHeight * me.outerHeight();
                        offsetTop = Math.min(Math.max(offsetTop, 0), maxTop);
                        bar.css({ top: offsetTop + 'px' });
                    }
                    // scroll content
                    me.scrollTop(delta);
                    // fire scrolling event
                    me.trigger('slimscrolling', ~~delta);
                    // ensure bar is visible
                    showBar();
                    // trigger hide when scroll is stopped
                    hideBar();
                }
                function attachWheel(target) {
                    if (window.addEventListener) {
                        target.addEventListener('DOMMouseScroll', _onWheel, false);
                        target.addEventListener('mousewheel', _onWheel, false);
                    }
                    else {
                    }
                }
                function getBarHeight() {
                    // calculate scrollbar height and make sure it is not too small
                    barHeight = Math.max((me.outerHeight() / me[0].scrollHeight) * me.outerHeight(), minBarHeight);
                    bar.css({ height: barHeight + 'px' });
                    // hide scrollbar if content is not long enough
                    var display = barHeight == me.outerHeight() ? 'none' : 'block';
                    bar.css({ display: display });
                }
                function showBar() {
                    // recalculate bar height
                    getBarHeight();
                    clearTimeout(queueHide);
                    // when bar reached top or bottom
                    if (percentScroll == ~~percentScroll) {
                        //release wheel
                        releaseScroll = o.allowPageScroll;
                        // publish approporiate event
                        if (lastScroll != percentScroll) {
                            var msg = (~~percentScroll == 0) ? 'top' : 'bottom';
                            me.trigger('slimscroll', msg);
                        }
                    }
                    else {
                        releaseScroll = false;
                    }
                    lastScroll = percentScroll;
                    // show only when required
                    if (barHeight >= me.outerHeight()) {
                        //allow window scroll
                        releaseScroll = true;
                        return;
                    }
                    bar.stop(true, true).fadeIn('fast');
                    if (o.railVisible) {
                        rail.stop(true, true).fadeIn('fast');
                    }
                }
                function hideBar() {
                    // only hide when options allow it
                    if (!o.alwaysVisible) {
                        queueHide = setTimeout(function () {
                            if (!(o.disableFadeOut && isOverPanel) && !isOverBar && !isDragg) {
                                bar.fadeOut('slow');
                                rail.fadeOut('slow');
                            }
                        }, 1000);
                    }
                }
            });
            // maintain chainability
            return this;
        }
    });
    $.fn.extend({
        slimscroll: $.fn.slimScroll
    });
})(jQuery);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/.2.2.4@jquery/dist/jquery.js")))

/***/ },

/***/ "./src/app/theme/directives/baSlimScroll/baSlimScroll.loader.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
// require('jquery-slimscroll');
__webpack_require__("./src/app/theme/directives/baSlimScroll/baSlimScroll.lib.ts");


/***/ },

/***/ "./src/app/theme/directives/baSlimScroll/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/directives/baSlimScroll/baSlimScroll.directive.ts"));


/***/ },

/***/ "./src/app/theme/directives/baThemeRun/baThemeRun.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var theme_1 = __webpack_require__("./src/app/theme/index.ts");
var BaThemeRun = (function () {
    function BaThemeRun(_baConfig) {
        this._baConfig = _baConfig;
        this._classes = [];
    }
    BaThemeRun.prototype.ngOnInit = function () {
        this._assignTheme();
        this._assignMobile();
    };
    BaThemeRun.prototype._assignTheme = function () {
        this._addClass(this._baConfig.get().theme.name);
    };
    BaThemeRun.prototype._assignMobile = function () {
        if (theme_1.isMobile()) {
            this._addClass('mobile');
        }
    };
    BaThemeRun.prototype._addClass = function (cls) {
        this._classes.push(cls);
        this.classesString = this._classes.join(' ');
    };
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', String)
    ], BaThemeRun.prototype, "classesString", void 0);
    BaThemeRun = __decorate([
        core_1.Directive({
            selector: '[baThemeRun]'
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof theme_1.BaThemeConfigProvider !== 'undefined' && theme_1.BaThemeConfigProvider) === 'function' && _a) || Object])
    ], BaThemeRun);
    return BaThemeRun;
    var _a;
}());
exports.BaThemeRun = BaThemeRun;


/***/ },

/***/ "./src/app/theme/directives/baThemeRun/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/directives/baThemeRun/baThemeRun.directive.ts"));


/***/ },

/***/ "./src/app/theme/directives/hrefLinkPrevent/hrefLinkPrevent.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var hrefLinkPrevent = (function () {
    function hrefLinkPrevent() {
    }
    hrefLinkPrevent.prototype.preventDefault = function (event) {
        // if(!this.href.length)
        event.preventDefault();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], hrefLinkPrevent.prototype, "href", void 0);
    hrefLinkPrevent = __decorate([
        core_1.Directive({
            selector: '[href]',
            host: {
                '(click)': 'preventDefault($event)'
            }
        }), 
        __metadata('design:paramtypes', [])
    ], hrefLinkPrevent);
    return hrefLinkPrevent;
}());


/***/ },

/***/ "./src/app/theme/directives/hrefLinkPrevent/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/directives/hrefLinkPrevent/hrefLinkPrevent.directive.ts"));


/***/ },

/***/ "./src/app/theme/directives/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/directives/baScrollPosition/index.ts"));
__export(__webpack_require__("./src/app/theme/directives/baThemeRun/index.ts"));
__export(__webpack_require__("./src/app/theme/directives/baSlimScroll/index.ts"));
__export(__webpack_require__("./src/app/theme/directives/hrefLinkPrevent/index.ts"));


/***/ },

/***/ "./src/app/theme/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/theme.constants.ts"));
__export(__webpack_require__("./src/app/theme/theme.configProvider.ts"));
__export(__webpack_require__("./src/app/theme/theme.config.ts"));


/***/ },

/***/ "./src/app/theme/initial.scss":
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ "./src/app/theme/nga.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/.2.1.1@@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/.2.1.1@@angular/forms/index.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var theme_config_1 = __webpack_require__("./src/app/theme/theme.config.ts");
var theme_configProvider_1 = __webpack_require__("./src/app/theme/theme.configProvider.ts");
var components_1 = __webpack_require__("./src/app/theme/components/index.ts");
var baCardBlur_directive_1 = __webpack_require__("./src/app/theme/components/baCard/baCardBlur.directive.ts");
var directives_1 = __webpack_require__("./src/app/theme/directives/index.ts");
var pipes_1 = __webpack_require__("./src/app/theme/pipes/index.ts");
var services_1 = __webpack_require__("./src/app/theme/services/index.ts");
var validators_1 = __webpack_require__("./src/app/theme/validators/index.ts");
var NGA_COMPONENTS = [
    components_1.BaBackTop,
    components_1.BaCard,
    components_1.BaCheckbox,
    components_1.BaContentTop,
    components_1.BaMenuItem,
    components_1.BaMenu,
    components_1.BaMsgCenter,
    components_1.BaMultiCheckbox,
    components_1.BaPageTop,
    components_1.BaPictureUploader,
    components_1.BaSidebar
];
var NGA_DIRECTIVES = [
    directives_1.BaScrollPosition,
    directives_1.BaSlimScroll,
    directives_1.BaThemeRun,
    baCardBlur_directive_1.BaCardBlur
];
var NGA_PIPES = [
    pipes_1.BaAppPicturePipe,
    pipes_1.BaKameleonPicturePipe,
    pipes_1.BaProfilePicturePipe,
    pipes_1.DataToLocalePipe,
    pipes_1.TruncatePipe
];
var NGA_SERVICES = [
    services_1.BaImageLoaderService,
    services_1.BaThemePreloader,
    services_1.BaThemeSpinner
];
var NGA_VALIDATORS = [
    validators_1.EmailValidator,
    validators_1.EqualPasswordsValidator
];
var NgaModule = (function () {
    function NgaModule() {
    }
    NgaModule.forRoot = function () {
        return {
            ngModule: NgaModule,
            providers: [
                theme_configProvider_1.BaThemeConfigProvider,
                theme_config_1.BaThemeConfig
            ].concat(NGA_VALIDATORS, NGA_SERVICES),
        };
    };
    NgaModule = __decorate([
        core_1.NgModule({
            declarations: NGA_PIPES.concat(NGA_DIRECTIVES, NGA_COMPONENTS),
            imports: [
                common_1.CommonModule,
                router_1.RouterModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            exports: NGA_PIPES.concat(NGA_DIRECTIVES, NGA_COMPONENTS)
        }), 
        __metadata('design:paramtypes', [])
    ], NgaModule);
    return NgaModule;
}());
exports.NgaModule = NgaModule;


/***/ },

/***/ "./src/app/theme/pipes/baAppPicture/baAppPicture.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var theme_1 = __webpack_require__("./src/app/theme/index.ts");
var BaAppPicturePipe = (function () {
    function BaAppPicturePipe() {
    }
    BaAppPicturePipe.prototype.transform = function (input) {
        return theme_1.layoutPaths.images.root + input;
    };
    BaAppPicturePipe = __decorate([
        core_1.Pipe({ name: 'baAppPicture' }), 
        __metadata('design:paramtypes', [])
    ], BaAppPicturePipe);
    return BaAppPicturePipe;
}());
exports.BaAppPicturePipe = BaAppPicturePipe;


/***/ },

/***/ "./src/app/theme/pipes/baAppPicture/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/pipes/baAppPicture/baAppPicture.pipe.ts"));


/***/ },

/***/ "./src/app/theme/pipes/baKameleonPicture/baKameleonPicture.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var theme_1 = __webpack_require__("./src/app/theme/index.ts");
var BaKameleonPicturePipe = (function () {
    function BaKameleonPicturePipe() {
    }
    BaKameleonPicturePipe.prototype.transform = function (input) {
        return theme_1.layoutPaths.images.root + 'theme/icon/kameleon/' + input + '.svg';
    };
    BaKameleonPicturePipe = __decorate([
        core_1.Pipe({ name: 'baKameleonPicture' }), 
        __metadata('design:paramtypes', [])
    ], BaKameleonPicturePipe);
    return BaKameleonPicturePipe;
}());
exports.BaKameleonPicturePipe = BaKameleonPicturePipe;


/***/ },

/***/ "./src/app/theme/pipes/baKameleonPicture/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/pipes/baKameleonPicture/baKameleonPicture.pipe.ts"));


/***/ },

/***/ "./src/app/theme/pipes/baProfilePicture/baProfilePicture.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var theme_1 = __webpack_require__("./src/app/theme/index.ts");
var BaProfilePicturePipe = (function () {
    function BaProfilePicturePipe() {
    }
    BaProfilePicturePipe.prototype.transform = function (input, ext) {
        if (ext === void 0) { ext = 'png'; }
        return theme_1.layoutPaths.images.profile + input + '.' + ext;
    };
    BaProfilePicturePipe = __decorate([
        core_1.Pipe({ name: 'baProfilePicture' }), 
        __metadata('design:paramtypes', [])
    ], BaProfilePicturePipe);
    return BaProfilePicturePipe;
}());
exports.BaProfilePicturePipe = BaProfilePicturePipe;


/***/ },

/***/ "./src/app/theme/pipes/baProfilePicture/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/pipes/baProfilePicture/baProfilePicture.pipe.ts"));


/***/ },

/***/ "./src/app/theme/pipes/dateHandle/dateHandle.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var DataToLocalePipe = (function () {
    function DataToLocalePipe() {
    }
    DataToLocalePipe.prototype.transform = function (input) {
        return new Date(input).toLocaleString();
    };
    DataToLocalePipe = __decorate([
        core_1.Pipe({ name: 'dataToLocale' }), 
        __metadata('design:paramtypes', [])
    ], DataToLocalePipe);
    return DataToLocalePipe;
}());
exports.DataToLocalePipe = DataToLocalePipe;


/***/ },

/***/ "./src/app/theme/pipes/dateHandle/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/pipes/dateHandle/dateHandle.pipe.ts"));


/***/ },

/***/ "./src/app/theme/pipes/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/pipes/baProfilePicture/index.ts"));
__export(__webpack_require__("./src/app/theme/pipes/baAppPicture/index.ts"));
__export(__webpack_require__("./src/app/theme/pipes/baKameleonPicture/index.ts"));
__export(__webpack_require__("./src/app/theme/pipes/dateHandle/index.ts"));
__export(__webpack_require__("./src/app/theme/pipes/truncate/index.ts"));


/***/ },

/***/ "./src/app/theme/pipes/truncate/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/pipes/truncate/truncate.pipe.ts"));


/***/ },

/***/ "./src/app/theme/pipes/truncate/truncate.pipe.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var TruncatePipe = (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, limit, trail) {
        if (limit === void 0) { limit = 10; }
        if (trail === void 0) { trail = '...'; }
        return value.length > limit ? value.substring(0, limit) + trail : value;
    };
    TruncatePipe = __decorate([
        core_1.Pipe({ name: 'truncate' }), 
        __metadata('design:paramtypes', [])
    ], TruncatePipe);
    return TruncatePipe;
}());
exports.TruncatePipe = TruncatePipe;


/***/ },

/***/ "./src/app/theme/services/baImageLoader/baImageLoader.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaImageLoaderService = (function () {
    function BaImageLoaderService() {
    }
    BaImageLoaderService.prototype.load = function (src) {
        return new Promise(function (resolve, reject) {
            var img = new Image();
            img.src = src;
            img.onload = function () {
                resolve('Image with src ' + src + ' loaded successfully.');
            };
        });
    };
    BaImageLoaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaImageLoaderService);
    return BaImageLoaderService;
}());
exports.BaImageLoaderService = BaImageLoaderService;


/***/ },

/***/ "./src/app/theme/services/baImageLoader/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/services/baImageLoader/baImageLoader.service.ts"));


/***/ },

/***/ "./src/app/theme/services/baThemePreloader/baThemePreloader.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaThemePreloader = (function () {
    function BaThemePreloader() {
    }
    BaThemePreloader.registerLoader = function (method) {
        BaThemePreloader._loaders.push(method);
    };
    BaThemePreloader.clear = function () {
        BaThemePreloader._loaders = [];
    };
    BaThemePreloader.load = function () {
        return new Promise(function (resolve, reject) {
            BaThemePreloader._executeAll(resolve);
        });
    };
    BaThemePreloader._executeAll = function (done) {
        setTimeout(function () {
            Promise.all(BaThemePreloader._loaders).then(function (values) {
                done.call(null, values);
            }).catch(function (error) {
                console.error(error);
            });
        });
    };
    BaThemePreloader._loaders = [];
    BaThemePreloader = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaThemePreloader);
    return BaThemePreloader;
}());
exports.BaThemePreloader = BaThemePreloader;


/***/ },

/***/ "./src/app/theme/services/baThemePreloader/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/services/baThemePreloader/baThemePreloader.service.ts"));


/***/ },

/***/ "./src/app/theme/services/baThemeSpinner/baThemeSpinner.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var BaThemeSpinner = (function () {
    function BaThemeSpinner() {
        this._selector = 'preloader';
        this._element = document.getElementById(this._selector);
    }
    BaThemeSpinner.prototype.show = function () {
        this._element.style['display'] = 'block';
    };
    BaThemeSpinner.prototype.hide = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 0; }
        setTimeout(function () {
            _this._element.style['display'] = 'none';
        }, delay);
    };
    BaThemeSpinner = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaThemeSpinner);
    return BaThemeSpinner;
}());
exports.BaThemeSpinner = BaThemeSpinner;


/***/ },

/***/ "./src/app/theme/services/baThemeSpinner/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/services/baThemeSpinner/baThemeSpinner.service.ts"));


/***/ },

/***/ "./src/app/theme/services/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/services/baImageLoader/index.ts"));
__export(__webpack_require__("./src/app/theme/services/baThemePreloader/index.ts"));
__export(__webpack_require__("./src/app/theme/services/baThemeSpinner/index.ts"));


/***/ },

/***/ "./src/app/theme/theme.config.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var theme_configProvider_1 = __webpack_require__("./src/app/theme/theme.configProvider.ts");
var BaThemeConfig = (function () {
    function BaThemeConfig(_baConfig) {
        this._baConfig = _baConfig;
        this._config();
    }
    BaThemeConfig.prototype._config = function () {
        this._baConfig.changeTheme({ name: 'dark' });
        // let colorScheme = {
        //   primary: '#209e91',
        //   info: '#2dacd1',
        //   success: '#90b900',
        //   warning: '#dfb81c',
        //   danger: '#e85656',
        // };
        // this._baConfig.changeColors({
        //   default: '#4e4e55',
        //   defaultText: '#e2e2e2',
        //   border: '#dddddd',
        //   borderDark: '#aaaaaa',
        //
        //   primary: colorScheme.primary,
        //   info: colorScheme.info,
        //   success: colorScheme.success,
        //   warning: colorScheme.warning,
        //   danger: colorScheme.danger,
        //
        //   primaryLight: colorHelper.tint(colorScheme.primary, 30),
        //   infoLight: colorHelper.tint(colorScheme.info, 30),
        //   successLight: colorHelper.tint(colorScheme.success, 30),
        //   warningLight: colorHelper.tint(colorScheme.warning, 30),
        //   dangerLight: colorHelper.tint(colorScheme.danger, 30),
        //
        //   primaryDark: colorHelper.shade(colorScheme.primary, 15),
        //   infoDark: colorHelper.shade(colorScheme.info, 15),
        //   successDark: colorHelper.shade(colorScheme.success, 15),
        //   warningDark: colorHelper.shade(colorScheme.warning, 15),
        //   dangerDark: colorHelper.shade(colorScheme.danger, 15),
        //
        //   dashboard: {
        //     blueStone: '#005562',
        //     surfieGreen: '#0e8174',
        //     silverTree: '#6eba8c',
        //     gossip: '#b9f2a1',
        //     white: '#10c4b5',
        //   },
        // });
    };
    BaThemeConfig = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof theme_configProvider_1.BaThemeConfigProvider !== 'undefined' && theme_configProvider_1.BaThemeConfigProvider) === 'function' && _a) || Object])
    ], BaThemeConfig);
    return BaThemeConfig;
    var _a;
}());
exports.BaThemeConfig = BaThemeConfig;


/***/ },

/***/ "./src/app/theme/theme.configProvider.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var theme_constants_1 = __webpack_require__("./src/app/theme/theme.constants.ts");
var _ = __webpack_require__("./node_modules/.4.17.4@lodash/lodash.js");
var BaThemeConfigProvider = (function () {
    function BaThemeConfigProvider() {
        this.basic = {
            default: '#ffffff',
            defaultText: '#ffffff',
            border: '#dddddd',
            borderDark: '#aaaaaa',
        };
        // main functional color scheme
        this.colorScheme = {
            primary: '#00abff',
            info: '#40daf1',
            success: '#8bd22f',
            warning: '#e7ba08',
            danger: '#f95372',
        };
        // dashboard colors for charts
        this.dashboardColors = {
            blueStone: '#40daf1',
            surfieGreen: '#00abff',
            silverTree: '#1b70ef',
            gossip: '#3c4eb9',
            white: '#ffffff',
        };
        this.conf = {
            theme: {
                name: 'ng2',
            },
            colors: {
                default: this.basic.default,
                defaultText: this.basic.defaultText,
                border: this.basic.border,
                borderDark: this.basic.borderDark,
                primary: this.colorScheme.primary,
                info: this.colorScheme.info,
                success: this.colorScheme.success,
                warning: this.colorScheme.warning,
                danger: this.colorScheme.danger,
                primaryLight: theme_constants_1.colorHelper.tint(this.colorScheme.primary, 30),
                infoLight: theme_constants_1.colorHelper.tint(this.colorScheme.info, 30),
                successLight: theme_constants_1.colorHelper.tint(this.colorScheme.success, 30),
                warningLight: theme_constants_1.colorHelper.tint(this.colorScheme.warning, 30),
                dangerLight: theme_constants_1.colorHelper.tint(this.colorScheme.danger, 30),
                primaryDark: theme_constants_1.colorHelper.shade(this.colorScheme.primary, 15),
                infoDark: theme_constants_1.colorHelper.shade(this.colorScheme.info, 15),
                successDark: theme_constants_1.colorHelper.shade(this.colorScheme.success, 15),
                warningDark: theme_constants_1.colorHelper.shade(this.colorScheme.warning, 15),
                dangerDark: theme_constants_1.colorHelper.shade(this.colorScheme.danger, 15),
                dashboard: {
                    blueStone: this.dashboardColors.blueStone,
                    surfieGreen: this.dashboardColors.surfieGreen,
                    silverTree: this.dashboardColors.silverTree,
                    gossip: this.dashboardColors.gossip,
                    white: this.dashboardColors.white,
                },
                custom: {
                    dashboardLineChart: this.basic.defaultText,
                    dashboardPieChart: theme_constants_1.colorHelper.hexToRgbA(this.basic.defaultText, 0.8)
                }
            }
        };
    }
    BaThemeConfigProvider.prototype.get = function () {
        return this.conf;
    };
    BaThemeConfigProvider.prototype.changeTheme = function (theme) {
        _.merge(this.get().theme, theme);
    };
    BaThemeConfigProvider.prototype.changeColors = function (colors) {
        _.merge(this.get().colors, colors);
    };
    BaThemeConfigProvider = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BaThemeConfigProvider);
    return BaThemeConfigProvider;
}());
exports.BaThemeConfigProvider = BaThemeConfigProvider;


/***/ },

/***/ "./src/app/theme/theme.constants.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
exports.IMAGES_ROOT = 'assets/img/';
exports.layoutSizes = {
    resWidthCollapseSidebar: 1200,
    resWidthHideSidebar: 500
};
exports.layoutPaths = {
    images: {
        root: exports.IMAGES_ROOT,
        profile: exports.IMAGES_ROOT + 'app/profile/',
        amMap: 'assets/img/theme/vendor/ammap/',
        amChart: 'assets/img/theme/vendor/amcharts/dist/amcharts/images/'
    }
};
var colorHelper = (function () {
    function colorHelper() {
    }
    colorHelper.shade = function (color, weight) {
        return colorHelper.mix('#000000', color, weight);
    };
    colorHelper.tint = function (color, weight) {
        return colorHelper.mix('#ffffff', color, weight);
    };
    colorHelper.hexToRgbA = function (hex, alpha) {
        var c;
        if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
            c = hex.substring(1).split('');
            if (c.length == 3) {
                c = [c[0], c[0], c[1], c[1], c[2], c[2]];
            }
            c = '0x' + c.join('');
            return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
        }
        throw new Error('Bad Hex');
    };
    colorHelper.mix = function (color1, color2, weight) {
        var d2h = function (d) { return d.toString(16); };
        var h2d = function (h) { return parseInt(h, 16); };
        var result = "#";
        for (var i = 1; i < 7; i += 2) {
            var color1Part = h2d(color1.substr(i, 2));
            var color2Part = h2d(color2.substr(i, 2));
            var resultPart = d2h(Math.floor(color2Part + (color1Part - color2Part) * (weight / 100.0)));
            result += ('0' + resultPart).slice(-2);
        }
        return result;
    };
    return colorHelper;
}());
exports.colorHelper = colorHelper;
exports.isMobile = function () { return (/android|webos|iphone|ipad|ipod|blackberry|windows phone/).test(navigator.userAgent.toLowerCase()); };


/***/ },

/***/ "./src/app/theme/validators/email.validator.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var EmailValidator = (function () {
    function EmailValidator() {
    }
    EmailValidator.validate = function (c) {
        var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
        return EMAIL_REGEXP.test(c.value) ? null : {
            validateEmail: {
                valid: false
            }
        };
    };
    return EmailValidator;
}());
exports.EmailValidator = EmailValidator;


/***/ },

/***/ "./src/app/theme/validators/equalPasswords.validator.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var EqualPasswordsValidator = (function () {
    function EqualPasswordsValidator() {
    }
    EqualPasswordsValidator.validate = function (firstField, secondField) {
        return function (c) {
            return (c.controls && c.controls[firstField].value == c.controls[secondField].value) ? null : {
                passwordsEqual: {
                    valid: false
                }
            };
        };
    };
    return EqualPasswordsValidator;
}());
exports.EqualPasswordsValidator = EqualPasswordsValidator;


/***/ },

/***/ "./src/app/theme/validators/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/theme/validators/email.validator.ts"));
__export(__webpack_require__("./src/app/theme/validators/equalPasswords.validator.ts"));


/***/ },

/***/ "./src/config.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {"use strict";
var devApi = '/api';
var prodApi = 'https://api.surmon.me';
var staticApi = 'https://static.surmon.me';
exports.API_ROOT = (function () { try {
    if (process) {
        return devApi;
    }
    else {
        return prodApi;
    }
}
catch (err) {
    return prodApi;
} })();
exports.STATIC_URL = staticApi;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__("./node_modules/.0.11.9@process/browser.js")))

/***/ },

/***/ "./src/main.browser.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
/*
 * Angular bootstraping
 */
var platform_browser_dynamic_1 = __webpack_require__("./node_modules/.2.1.1@@angular/platform-browser-dynamic/index.js");
var environment_1 = __webpack_require__("./src/app/environment.ts");
var hmr_1 = __webpack_require__("./node_modules/.1.2.2@@angularclass/hmr/dist/index.js");
/*
 * App Module
 * our top level module that holds all of our components
 */
var app_1 = __webpack_require__("./src/app/index.ts");
/*
 * Bootstrap our Angular app with a top level NgModule
 */
function main() {
    return platform_browser_dynamic_1.platformBrowserDynamic()
        .bootstrapModule(app_1.AppModule).then(function(MODULE_REF) {
  if (false) {
    module["hot"]["accept"]();
    
    if (MODULE_REF.instance["hmrOnInit"]) {
      module["hot"]["data"] && MODULE_REF.instance["hmrOnInit"](module["hot"]["data"]);
    }
    if (MODULE_REF.instance["hmrOnStatus"]) {
      module["hot"]["apply"](function(status) {
        MODULE_REF.instance["hmrOnStatus"](status);
      });
    }
    if (MODULE_REF.instance["hmrOnCheck"]) {
      module["hot"]["check"](function(err, outdatedModules) {
        MODULE_REF.instance["hmrOnCheck"](err, outdatedModules);
      });
    }
    if (MODULE_REF.instance["hmrOnDecline"]) {
      module["hot"]["decline"](function(dependencies) {
        MODULE_REF.instance["hmrOnDecline"](dependencies);
      });
    }
    module["hot"]["dispose"](function(store) {
      MODULE_REF.instance["hmrOnDestroy"] && MODULE_REF.instance["hmrOnDestroy"](store);
      MODULE_REF.destroy();
      MODULE_REF.instance["hmrAfterDestroy"] && MODULE_REF.instance["hmrAfterDestroy"](store);
    });
  }
  return MODULE_REF;
})
        .then(environment_1.decorateModuleRef)
        .catch(function (err) { return console.error(err); });
}
exports.main = main;
hmr_1.bootloader(main);


/***/ }

},["./src/main.browser.ts"]);
//# sourceMappingURL=main.map