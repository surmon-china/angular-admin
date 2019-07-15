(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["linux-linux-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/linux/linux.html":
/*!******************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/linux/linux.html ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-12 col-xs-12\">\n    <sa-card title=\"远程管理\" baCardClass=\"with-scroll\">\n      <iframe src=\"https://dms.console.aliyun.com/#/dms/rsList\" class=\"linux-iframe\"></iframe>\n    </sa-card>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/linux/linux.component.ts":
/*!************************************************!*\
  !*** ./src/app/pages/linux/linux.component.ts ***!
  \************************************************/
/*! exports provided: LinuxComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LinuxComponent", function() { return LinuxComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/**
 * @file 服务器管理页面组件
 * @module app/page/linux/component
 * @author Surmon <https://github.com/surmon-china>
 */


var LinuxComponent = /** @class */ (function () {
    function LinuxComponent() {
    }
    LinuxComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'page-linux',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! raw-loader!./linux.html */ "./node_modules/raw-loader/index.js!./src/app/pages/linux/linux.html"),
            styles: [__webpack_require__(/*! ./linux.scss */ "./src/app/pages/linux/linux.scss")]
        })
    ], LinuxComponent);
    return LinuxComponent;
}());



/***/ }),

/***/ "./src/app/pages/linux/linux.module.ts":
/*!*********************************************!*\
  !*** ./src/app/pages/linux/linux.module.ts ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _app_sa_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/app/sa.module */ "./src/app/sa.module.ts");
/* harmony import */ var _linux_routing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./linux.routing */ "./src/app/pages/linux/linux.routing.ts");
/* harmony import */ var _linux_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./linux.component */ "./src/app/pages/linux/linux.component.ts");
/**
 * @file 服务器管理页面模块
 * @module app/page/linux/module
 * @author Surmon <https://github.com/surmon-china>
 */






var LinuxModule = /** @class */ (function () {
    function LinuxModule() {
    }
    LinuxModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _app_sa_module__WEBPACK_IMPORTED_MODULE_3__["SaModule"],
                _linux_routing__WEBPACK_IMPORTED_MODULE_4__["routing"]
            ],
            declarations: [
                _linux_component__WEBPACK_IMPORTED_MODULE_5__["LinuxComponent"]
            ]
        })
    ], LinuxModule);
    return LinuxModule;
}());
/* harmony default export */ __webpack_exports__["default"] = (LinuxModule);


/***/ }),

/***/ "./src/app/pages/linux/linux.routing.ts":
/*!**********************************************!*\
  !*** ./src/app/pages/linux/linux.routing.ts ***!
  \**********************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _linux_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./linux.component */ "./src/app/pages/linux/linux.component.ts");
/**
 * @file 服务器管理页面路由
 * @module app/page/linux/routes
 * @author Surmon <https://github.com/surmon-china>
 */


var routes = [
    { path: '', component: _linux_component__WEBPACK_IMPORTED_MODULE_1__["LinuxComponent"] }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/pages/linux/linux.scss":
/*!****************************************!*\
  !*** ./src/app/pages/linux/linux.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".linux-iframe {\n  width: 100%;\n  height: calc(100vh - 283px);\n  border: none;\n  background-color: #999;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdXJtb24vUHJvamVjdHMvQmxvZy9hbmd1bGFyLWFkbWluL3NyYy9hcHAvcGFnZXMvbGludXgvbGludXguc2NzcyIsInNyYy9hcHAvcGFnZXMvbGludXgvbGludXguc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7RUFDQSwyQkFBQTtFQUNBLFlBQUE7RUFDQSxzQkFBQTtBQ0NGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvbGludXgvbGludXguc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5saW51eC1pZnJhbWUge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiBjYWxjKDEwMHZoIC0gMjgzcHgpO1xuICBib3JkZXI6IG5vbmU7XG4gIGJhY2tncm91bmQtY29sb3I6ICM5OTk7XG59XG4iLCIubGludXgtaWZyYW1lIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogY2FsYygxMDB2aCAtIDI4M3B4KTtcbiAgYm9yZGVyOiBub25lO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTk5O1xufSJdfQ== */"

/***/ })

}]);
//# sourceMappingURL=linux-linux-module-es5.js.map