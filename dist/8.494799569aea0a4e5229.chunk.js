webpackJsonp([8],{1060:function(module,exports,__webpack_require__){"use strict";var core_1=__webpack_require__(0),Linux=function(){function Linux(){}return Linux=__decorate([core_1.Component({selector:"linux",encapsulation:core_1.ViewEncapsulation.None,styles:[__webpack_require__(1117)],template:__webpack_require__(1167)}),__metadata("design:paramtypes",[])],Linux)}();exports.Linux=Linux},1117:function(module,exports){module.exports=".linux-iframe {\n  width: 100%;\n  height: calc(100vh - 283px);\n  border: none;\n  background-color: #999; }\n"},1167:function(module,exports){module.exports='<div class="row">\n  <div class="col-md-12 col-xs-12">\n    <ba-card title="远程管理" baCardClass="with-scroll">\n      <iframe src="https://dms.console.aliyun.com/#/dms/rsList" class="linux-iframe"></iframe>\n    </ba-card>\n  </div>\n</div>\n'},1247:function(module,exports,__webpack_require__){"use strict";var router_1=__webpack_require__(37),linux_component_1=__webpack_require__(1060),routes=[{path:"",component:linux_component_1.Linux}];exports.routing=router_1.RouterModule.forChild(routes)},803:function(module,exports,__webpack_require__){"use strict";var core_1=__webpack_require__(0),common_1=__webpack_require__(43),nga_module_1=__webpack_require__(258),linux_component_1=__webpack_require__(1060),linux_routing_1=__webpack_require__(1247),LinuxModule=function(){function LinuxModule(){}return LinuxModule=__decorate([core_1.NgModule({imports:[common_1.CommonModule,nga_module_1.NgaModule,linux_routing_1.routing],declarations:[linux_component_1.Linux]}),__metadata("design:paramtypes",[])],LinuxModule)}();Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=LinuxModule}});