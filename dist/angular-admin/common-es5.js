(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./node_modules/js-base64/base64.js":
/*!******************************************!*\
  !*** ./node_modules/js-base64/base64.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  base64.js
 *
 *  Licensed under the BSD 3-Clause License.
 *    http://opensource.org/licenses/BSD-3-Clause
 *
 *  References:
 *    http://en.wikipedia.org/wiki/Base64
 */
;(function (global, factory) {
     true
        ? module.exports = factory(global)
        : undefined
}((
    typeof self !== 'undefined' ? self
        : typeof window !== 'undefined' ? window
        : typeof global !== 'undefined' ? global
: this
), function(global) {
    'use strict';
    // existing version for noConflict()
    global = global || {};
    var _Base64 = global.Base64;
    var version = "2.5.1";
    // if node.js and NOT React Native, we use Buffer
    var buffer;
    if ( true && module.exports) {
        try {
            buffer = eval("require('buffer').Buffer");
        } catch (err) {
            buffer = undefined;
        }
    }
    // constants
    var b64chars
        = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var b64tab = function(bin) {
        var t = {};
        for (var i = 0, l = bin.length; i < l; i++) t[bin.charAt(i)] = i;
        return t;
    }(b64chars);
    var fromCharCode = String.fromCharCode;
    // encoder stuff
    var cb_utob = function(c) {
        if (c.length < 2) {
            var cc = c.charCodeAt(0);
            return cc < 0x80 ? c
                : cc < 0x800 ? (fromCharCode(0xc0 | (cc >>> 6))
                                + fromCharCode(0x80 | (cc & 0x3f)))
                : (fromCharCode(0xe0 | ((cc >>> 12) & 0x0f))
                   + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                   + fromCharCode(0x80 | ( cc         & 0x3f)));
        } else {
            var cc = 0x10000
                + (c.charCodeAt(0) - 0xD800) * 0x400
                + (c.charCodeAt(1) - 0xDC00);
            return (fromCharCode(0xf0 | ((cc >>> 18) & 0x07))
                    + fromCharCode(0x80 | ((cc >>> 12) & 0x3f))
                    + fromCharCode(0x80 | ((cc >>>  6) & 0x3f))
                    + fromCharCode(0x80 | ( cc         & 0x3f)));
        }
    };
    var re_utob = /[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g;
    var utob = function(u) {
        return u.replace(re_utob, cb_utob);
    };
    var cb_encode = function(ccc) {
        var padlen = [0, 2, 1][ccc.length % 3],
        ord = ccc.charCodeAt(0) << 16
            | ((ccc.length > 1 ? ccc.charCodeAt(1) : 0) << 8)
            | ((ccc.length > 2 ? ccc.charCodeAt(2) : 0)),
        chars = [
            b64chars.charAt( ord >>> 18),
            b64chars.charAt((ord >>> 12) & 63),
            padlen >= 2 ? '=' : b64chars.charAt((ord >>> 6) & 63),
            padlen >= 1 ? '=' : b64chars.charAt(ord & 63)
        ];
        return chars.join('');
    };
    var btoa = global.btoa ? function(b) {
        return global.btoa(b);
    } : function(b) {
        return b.replace(/[\s\S]{1,3}/g, cb_encode);
    };
    var _encode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
        ? function (u) {
            return (u.constructor === buffer.constructor ? u : buffer.from(u))
                .toString('base64')
        }
        :  function (u) {
            return (u.constructor === buffer.constructor ? u : new  buffer(u))
                .toString('base64')
        }
        : function (u) { return btoa(utob(u)) }
    ;
    var encode = function(u, urisafe) {
        return !urisafe
            ? _encode(String(u))
            : _encode(String(u)).replace(/[+\/]/g, function(m0) {
                return m0 == '+' ? '-' : '_';
            }).replace(/=/g, '');
    };
    var encodeURI = function(u) { return encode(u, true) };
    // decoder stuff
    var re_btou = new RegExp([
        '[\xC0-\xDF][\x80-\xBF]',
        '[\xE0-\xEF][\x80-\xBF]{2}',
        '[\xF0-\xF7][\x80-\xBF]{3}'
    ].join('|'), 'g');
    var cb_btou = function(cccc) {
        switch(cccc.length) {
        case 4:
            var cp = ((0x07 & cccc.charCodeAt(0)) << 18)
                |    ((0x3f & cccc.charCodeAt(1)) << 12)
                |    ((0x3f & cccc.charCodeAt(2)) <<  6)
                |     (0x3f & cccc.charCodeAt(3)),
            offset = cp - 0x10000;
            return (fromCharCode((offset  >>> 10) + 0xD800)
                    + fromCharCode((offset & 0x3FF) + 0xDC00));
        case 3:
            return fromCharCode(
                ((0x0f & cccc.charCodeAt(0)) << 12)
                    | ((0x3f & cccc.charCodeAt(1)) << 6)
                    |  (0x3f & cccc.charCodeAt(2))
            );
        default:
            return  fromCharCode(
                ((0x1f & cccc.charCodeAt(0)) << 6)
                    |  (0x3f & cccc.charCodeAt(1))
            );
        }
    };
    var btou = function(b) {
        return b.replace(re_btou, cb_btou);
    };
    var cb_decode = function(cccc) {
        var len = cccc.length,
        padlen = len % 4,
        n = (len > 0 ? b64tab[cccc.charAt(0)] << 18 : 0)
            | (len > 1 ? b64tab[cccc.charAt(1)] << 12 : 0)
            | (len > 2 ? b64tab[cccc.charAt(2)] <<  6 : 0)
            | (len > 3 ? b64tab[cccc.charAt(3)]       : 0),
        chars = [
            fromCharCode( n >>> 16),
            fromCharCode((n >>>  8) & 0xff),
            fromCharCode( n         & 0xff)
        ];
        chars.length -= [0, 0, 2, 1][padlen];
        return chars.join('');
    };
    var _atob = global.atob ? function(a) {
        return global.atob(a);
    } : function(a){
        return a.replace(/\S{1,4}/g, cb_decode);
    };
    var atob = function(a) {
        return _atob(String(a).replace(/[^A-Za-z0-9\+\/]/g, ''));
    };
    var _decode = buffer ?
        buffer.from && Uint8Array && buffer.from !== Uint8Array.from
        ? function(a) {
            return (a.constructor === buffer.constructor
                    ? a : buffer.from(a, 'base64')).toString();
        }
        : function(a) {
            return (a.constructor === buffer.constructor
                    ? a : new buffer(a, 'base64')).toString();
        }
        : function(a) { return btou(_atob(a)) };
    var decode = function(a){
        return _decode(
            String(a).replace(/[-_]/g, function(m0) { return m0 == '-' ? '+' : '/' })
                .replace(/[^A-Za-z0-9\+\/]/g, '')
        );
    };
    var noConflict = function() {
        var Base64 = global.Base64;
        global.Base64 = _Base64;
        return Base64;
    };
    // export Base64
    global.Base64 = {
        VERSION: version,
        atob: atob,
        btoa: btoa,
        fromBase64: decode,
        toBase64: encode,
        utob: utob,
        encode: encode,
        encodeURI: encodeURI,
        btou: btou,
        decode: decode,
        noConflict: noConflict,
        __buffer__: buffer
    };
    // if ES5 is available, make Base64.extendString() available
    if (typeof Object.defineProperty === 'function') {
        var noEnum = function(v){
            return {value:v,enumerable:false,writable:true,configurable:true};
        };
        global.Base64.extendString = function () {
            Object.defineProperty(
                String.prototype, 'fromBase64', noEnum(function () {
                    return decode(this)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64', noEnum(function (urisafe) {
                    return encode(this, urisafe)
                }));
            Object.defineProperty(
                String.prototype, 'toBase64URI', noEnum(function () {
                    return encode(this, true)
                }));
        };
    }
    //
    // export Base64 to the namespace
    //
    if (global['Meteor']) { // Meteor.js
        Base64 = global.Base64;
    }
    // module.exports and AMD are mutually exclusive.
    // module.exports has precedence.
    if ( true && module.exports) {
        module.exports.Base64 = global.Base64;
    }
    else if (true) {
        // AMD. Register as an anonymous module.
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function(){ return global.Base64 }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    }
    // that's it!
    return {Base64: global.Base64}
}));


/***/ }),

/***/ "./src/app/constants/state.ts":
/*!************************************!*\
  !*** ./src/app/constants/state.ts ***!
  \************************************/
/*! exports provided: EPublishState, EPublicState, EOriginState, ESortType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPublishState", function() { return EPublishState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EPublicState", function() { return EPublicState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EOriginState", function() { return EOriginState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ESortType", function() { return ESortType; });
/**
 * Bussniss constants.
 * @file 业务数据表常量接口
 * @module constants/state
 * @author Surmon <https://github.com/surmon-china>
 */
// 发布状态
var EPublishState;
(function (EPublishState) {
    EPublishState["All"] = "all";
    EPublishState[EPublishState["Draft"] = 0] = "Draft";
    EPublishState[EPublishState["Published"] = 1] = "Published";
    EPublishState[EPublishState["Recycle"] = -1] = "Recycle";
})(EPublishState || (EPublishState = {}));
// 公开状态
var EPublicState;
(function (EPublicState) {
    EPublicState["All"] = "all";
    EPublicState[EPublicState["Password"] = 0] = "Password";
    EPublicState[EPublicState["Public"] = 1] = "Public";
    EPublicState[EPublicState["Secret"] = -1] = "Secret";
})(EPublicState || (EPublicState = {}));
// 转载状态
var EOriginState;
(function (EOriginState) {
    EOriginState["All"] = "all";
    EOriginState[EOriginState["Original"] = 0] = "Original";
    EOriginState[EOriginState["Reprint"] = 1] = "Reprint";
    EOriginState[EOriginState["Hybrid"] = 2] = "Hybrid";
})(EOriginState || (EOriginState = {}));
// 排序状态
var ESortType;
(function (ESortType) {
    ESortType[ESortType["Asc"] = 1] = "Asc";
    ESortType[ESortType["Desc"] = -1] = "Desc";
    ESortType[ESortType["Hot"] = 2] = "Hot";
})(ESortType || (ESortType = {}));


/***/ }),

/***/ "./src/app/pages/pages.service.ts":
/*!****************************************!*\
  !*** ./src/app/pages/pages.service.ts ***!
  \****************************************/
/*! exports provided: mergeFormControlsToInstance, handleBatchSelectChange, handleItemSelectChange, formControlStateClass, humanizedLoading */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeFormControlsToInstance", function() { return mergeFormControlsToInstance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleBatchSelectChange", function() { return handleBatchSelectChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleItemSelectChange", function() { return handleItemSelectChange; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formControlStateClass", function() { return formControlStateClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "humanizedLoading", function() { return humanizedLoading; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/**
 * @file 页面公共扩展
 * @module app/pages/utils
 * @author Surmon <https://github.com/surmon-china>
 */

// 合并 form 到实例本身
function mergeFormControlsToInstance(instance, form) {
    if (form instanceof _angular_forms__WEBPACK_IMPORTED_MODULE_0__["FormGroup"]) {
        Object.keys(form.controls).forEach(function (keyword) {
            instance[keyword] = form.controls[keyword];
        });
    }
}
// 对批量操作进行更新操作
function handleBatchSelectChange(options) {
    var data = options.data, isSelect = options.isSelect;
    if (!data.length) {
        return;
    }
    data.forEach(function (item) { return (item.selected = isSelect); });
    options.selectedIds = isSelect ? data.map(function (item) { return item._id; }) : [];
    return options.selectedIds;
}
// 对单个勾选进行更新操作
function handleItemSelectChange(options) {
    var data = options.data;
    options.selectedIds = data.filter(function (item) { return item.selected; }).map(function (item) { return item._id; });
    return {
        selectedIds: options.selectedIds,
        all: options.selectedIds.length === data.length
    };
}
// 表单验证
function formControlStateClass(control, errClassName, isSubmited) {
    if (control.touched || control.root.touched || control.dirty || control.root.dirty || isSubmited) {
        if (control.valid) {
            return 'has-success';
        }
        else {
            return errClassName || 'has-error';
        }
    }
}
// Loading
function humanizedLoading(loadings, field, promise) {
    loadings[field] = true;
    var stopLoading = function () { return loadings[field] = false; };
    promise.then(stopLoading, stopLoading);
    return promise;
}


/***/ })

}]);
//# sourceMappingURL=common-es5.js.map