webpackJsonpac__name_([9],{

/***/ "./src/app/pages/comment/comment.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var platform_browser_1 = __webpack_require__("./node_modules/.2.1.1@@angular/platform-browser/index.js");
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var Comment = (function () {
    function Comment(router, domSanitizer) {
        this.router = router;
        this.domSanitizer = domSanitizer;
        this.iframeSrc = '';
        this.iframeBaseSrc = 'https://surmon.duoshuo.com/admin/';
    }
    Comment.prototype.ngOnInit = function () {
        var _this = this;
        this.router.data.subscribe(function (_a) {
            var path = _a.name;
            if (path == 'manage') {
                _this.iframeSrc = _this.domSanitizer.bypassSecurityTrustResourceUrl(_this.iframeBaseSrc);
            }
            else if (path == 'user') {
                _this.iframeSrc = _this.domSanitizer.bypassSecurityTrustResourceUrl('https://duoshuo.com/settings/');
            }
            else {
                _this.iframeSrc = _this.domSanitizer.bypassSecurityTrustResourceUrl("" + _this.iframeBaseSrc + (path == 'preferences' ? 'settings' : path) + "/");
            }
        });
    };
    Comment = __decorate([
        core_1.Component({
            selector: 'comment',
            encapsulation: core_1.ViewEncapsulation.Emulated,
            styles: [__webpack_require__("./src/app/pages/comment/comment.scss")],
            template: __webpack_require__("./src/app/pages/comment/comment.html"),
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof platform_browser_1.DomSanitizer !== 'undefined' && platform_browser_1.DomSanitizer) === 'function' && _b) || Object])
    ], Comment);
    return Comment;
    var _a, _b;
}());
exports.Comment = Comment;


/***/ },

/***/ "./src/app/pages/comment/comment.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-12 col-xs-12\">\n    <ba-card title=\"多说评论\" baCardClass=\"with-scroll\">\n      <iframe [src]=\"iframeSrc\" class=\"comment-iframe\"></iframe>\n    </ba-card>\n  </div>\n</div>\n"

/***/ },

/***/ "./src/app/pages/comment/comment.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/.2.1.1@@angular/common/index.js");
var nga_module_1 = __webpack_require__("./src/app/theme/nga.module.ts");
var comment_routing_1 = __webpack_require__("./src/app/pages/comment/comment.routing.ts");
var comment_component_1 = __webpack_require__("./src/app/pages/comment/comment.component.ts");
var CommentModule = (function () {
    function CommentModule() {
    }
    CommentModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                nga_module_1.NgaModule,
                comment_routing_1.routing
            ],
            declarations: [
                comment_component_1.Comment
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CommentModule);
    return CommentModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CommentModule;


/***/ },

/***/ "./src/app/pages/comment/comment.routing.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var comment_component_1 = __webpack_require__("./src/app/pages/comment/comment.component.ts");
var routes = [
    { path: '', redirectTo: 'manage', pathMatch: 'full' },
    { path: 'manage', data: { name: 'manage' }, component: comment_component_1.Comment },
    { path: 'thread', data: { name: 'thread' }, component: comment_component_1.Comment },
    { path: 'users', data: { name: 'users' }, component: comment_component_1.Comment },
    { path: 'preferences', data: { name: 'preferences' }, component: comment_component_1.Comment },
    { path: 'tools', data: { name: 'tools' }, component: comment_component_1.Comment },
    { path: 'statistics', data: { name: 'statistics' }, component: comment_component_1.Comment },
    { path: 'user', data: { name: 'user' }, component: comment_component_1.Comment }
];
exports.routing = router_1.RouterModule.forChild(routes);


/***/ },

/***/ "./src/app/pages/comment/comment.scss":
/***/ function(module, exports) {

module.exports = ".comment-iframe {\n  width: 100%;\n  height: calc(100vh - 283px);\n  border: none;\n  background-color: #999; }\n"

/***/ }

});
//# sourceMappingURL=9.map