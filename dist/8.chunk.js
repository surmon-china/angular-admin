webpackJsonpac__name_([8],{

/***/ "./src/app/pages/linux/linux.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Linux = (function () {
    function Linux() {
    }
    Linux = __decorate([
        core_1.Component({
            selector: 'linux',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/pages/linux/linux.scss")],
            template: __webpack_require__("./src/app/pages/linux/linux.html"),
        }), 
        __metadata('design:paramtypes', [])
    ], Linux);
    return Linux;
}());
exports.Linux = Linux;


/***/ },

/***/ "./src/app/pages/linux/linux.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-12 col-xs-12\">\n    <ba-card title=\"远程管理\" baCardClass=\"with-scroll\">\n      <iframe src=\"https://dms.console.aliyun.com/#/dms/rsList\" class=\"linux-iframe\"></iframe>\n    </ba-card>\n  </div>\n</div>\n"

/***/ },

/***/ "./src/app/pages/linux/linux.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/.2.1.1@@angular/common/index.js");
var nga_module_1 = __webpack_require__("./src/app/theme/nga.module.ts");
var linux_component_1 = __webpack_require__("./src/app/pages/linux/linux.component.ts");
var linux_routing_1 = __webpack_require__("./src/app/pages/linux/linux.routing.ts");
var LinuxModule = (function () {
    function LinuxModule() {
    }
    LinuxModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                nga_module_1.NgaModule,
                linux_routing_1.routing
            ],
            declarations: [
                linux_component_1.Linux
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LinuxModule);
    return LinuxModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LinuxModule;


/***/ },

/***/ "./src/app/pages/linux/linux.routing.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var linux_component_1 = __webpack_require__("./src/app/pages/linux/linux.component.ts");
var routes = [
    { path: '', component: linux_component_1.Linux }
];
exports.routing = router_1.RouterModule.forChild(routes);


/***/ },

/***/ "./src/app/pages/linux/linux.scss":
/***/ function(module, exports) {

module.exports = ".linux-iframe {\n  width: 100%;\n  height: calc(100vh - 283px);\n  border: none;\n  background-color: #999; }\n"

/***/ }

});
//# sourceMappingURL=8.map