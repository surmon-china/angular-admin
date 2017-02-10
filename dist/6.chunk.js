webpackJsonpac__name_([6],{

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var Dashboard = (function () {
    function Dashboard() {
    }
    Dashboard = __decorate([
        core_1.Component({
            selector: 'dashboard',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/pages/dashboard/dashboard.scss")],
            template: __webpack_require__("./src/app/pages/dashboard/dashboard.html")
        }), 
        __metadata('design:paramtypes', [])
    ], Dashboard);
    return Dashboard;
}());
exports.Dashboard = Dashboard;


/***/ },

/***/ "./src/app/pages/dashboard/dashboard.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n    <site-statistics></site-statistics>\n  </div>\n</div>\n<div class=\"row\">\n  <ba-card class=\"col-xlg-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12\"\n           title=\"用户来源渠道\" \n           baCardClass=\"traffic-panel medium-card\">\n    <!-- <traffic-chart></traffic-chart> -->\n  </ba-card>\n  <ba-card class=\"col-xlg-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12\"\n           title=\"用户来源地区\" \n           baCardClass=\"medium-card\">\n    <!-- <users-map></users-map> -->\n  </ba-card>\n</div>\n<div class=\"row\">\n  <ba-card class=\"col-xlg-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12\"\n           title=\"今日流量\" \n           baCardClass=\"medium-card\">\n    <!-- <line-chart></line-chart> -->\n  </ba-card>\n  <ba-card class=\"col-xlg-6 col-xl-6 col-lg-12 col-sm-12 col-xs-12\" \n           title=\"待办事项\"\n           baCardClass=\"medium-card with-scroll\">\n    <!-- <todo></todo> -->\n  </ba-card>\n</div>\n"

/***/ },

/***/ "./src/app/pages/dashboard/dashboard.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var common_1 = __webpack_require__("./node_modules/.2.1.1@@angular/common/index.js");
var forms_1 = __webpack_require__("./node_modules/.2.1.1@@angular/forms/index.js");
var nga_module_1 = __webpack_require__("./src/app/theme/nga.module.ts");
var dashboard_component_1 = __webpack_require__("./src/app/pages/dashboard/dashboard.component.ts");
var dashboard_routing_1 = __webpack_require__("./src/app/pages/dashboard/dashboard.routing.ts");
var siteStatistics_1 = __webpack_require__("./src/app/pages/dashboard/siteStatistics/index.ts");
var siteStatistics_service_1 = __webpack_require__("./src/app/pages/dashboard/siteStatistics/siteStatistics.service.ts");
var DashboardModule = (function () {
    function DashboardModule() {
    }
    DashboardModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                nga_module_1.NgaModule,
                dashboard_routing_1.routing
            ],
            declarations: [
                siteStatistics_1.siteStatistics,
                dashboard_component_1.Dashboard
            ],
            providers: [
                siteStatistics_service_1.SiteStatisticsService
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardModule);
    return DashboardModule;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DashboardModule;


/***/ },

/***/ "./src/app/pages/dashboard/dashboard.routing.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var router_1 = __webpack_require__("./node_modules/.3.1.1@@angular/router/index.js");
var dashboard_component_1 = __webpack_require__("./src/app/pages/dashboard/dashboard.component.ts");
// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: dashboard_component_1.Dashboard
    }
];
exports.routing = router_1.RouterModule.forChild(routes);


/***/ },

/***/ "./src/app/pages/dashboard/dashboard.scss":
/***/ function(module, exports) {

module.exports = "@media screen and (min-width: 1620px) {\n  .row.shift-up > * {\n    margin-top: -573px; } }\n\n@media screen and (max-width: 1620px) {\n  .card.feed-panel.large-card {\n    height: 824px; } }\n\n.user-stats-card .card-title {\n  padding: 0 0 15px; }\n\n.blurCalendar {\n  height: 475px; }\n"

/***/ },

/***/ "./src/app/pages/dashboard/siteStatistics/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/app/pages/dashboard/siteStatistics/siteStatistics.component.ts"));


/***/ },

/***/ "./src/app/pages/dashboard/siteStatistics/siteStatistics.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var siteStatistics_service_1 = __webpack_require__("./src/app/pages/dashboard/siteStatistics/siteStatistics.service.ts");
var siteStatistics = (function () {
    function siteStatistics(_siteStatisticsService) {
        this._siteStatisticsService = _siteStatisticsService;
        this.charts = this._siteStatisticsService.getData();
    }
    siteStatistics = __decorate([
        core_1.Component({
            selector: 'site-statistics',
            encapsulation: core_1.ViewEncapsulation.None,
            styles: [__webpack_require__("./src/app/pages/dashboard/siteStatistics/siteStatistics.scss")],
            template: __webpack_require__("./src/app/pages/dashboard/siteStatistics/siteStatistics.html")
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof siteStatistics_service_1.SiteStatisticsService !== 'undefined' && siteStatistics_service_1.SiteStatisticsService) === 'function' && _a) || Object])
    ], siteStatistics);
    return siteStatistics;
    var _a;
}());
exports.siteStatistics = siteStatistics;


/***/ },

/***/ "./src/app/pages/dashboard/siteStatistics/siteStatistics.html":
/***/ function(module, exports) {

module.exports = "<div class=\"row pie-charts\">\r\n  <ba-card *ngFor=\"let chart of charts\" \r\n           class=\"pie-chart-item-container col-xlg-3 col-lg-3 col-md-6 col-sm-12 col-xs-12\">\r\n    <div class=\"pie-chart-item\">\r\n      <div class=\"description\">\r\n        <div>{{ chart.description }}</div>\r\n        <div class=\"description-stats\">{{ chart.stats }}</div>\r\n      </div>\r\n      <i class=\"chart-icon i-{{ chart.icon }}\"></i>\r\n    </div>\r\n  </ba-card>\r\n</div>\r\n"

/***/ },

/***/ "./src/app/pages/dashboard/siteStatistics/siteStatistics.scss":
/***/ function(module, exports) {

module.exports = ".pie-charts {\n  color: #ffffff; }\n  .pie-charts .pie-chart-item-container {\n    position: relative;\n    padding: 0 15px;\n    float: left;\n    box-sizing: border-box; }\n    .pie-charts .pie-chart-item-container .card {\n      height: 115px; }\n      .pie-charts .pie-chart-item-container .card .card-body {\n        padding: 15px; }\n  @media screen and (min-width: 1325px) {\n    .pie-charts .pie-chart-item-container {\n      width: 25%;\n      flex: 0 0 25%; } }\n  @media screen and (min-width: 700px) and (max-width: 1325px) {\n    .pie-charts .pie-chart-item-container {\n      width: 50%;\n      flex: 0 0 50%; } }\n  @media screen and (max-width: 700px) {\n    .pie-charts .pie-chart-item-container {\n      width: 100%;\n      flex: 0 0 100%; } }\n  .pie-charts .pie-chart-item {\n    position: relative; }\n    .pie-charts .pie-chart-item .chart-icon {\n      position: absolute;\n      right: 0;\n      top: 3px; }\n  @media screen and (min-width: 1325px) and (max-width: 1650px), (min-width: 700px) and (max-width: 830px), (max-width: 400px) {\n    .pie-charts .chart-icon {\n      display: none; } }\n  .pie-charts .description {\n    display: inline-block;\n    padding: 15px 0 0 20px;\n    font-size: 18px;\n    opacity: 0.9; }\n    .pie-charts .description .description-stats {\n      padding-top: 20px;\n      font-size: 24px; }\n  .pie-charts .angular {\n    margin-top: 100px; }\n  .pie-charts .angular .chart {\n    margin-top: 0; }\n"

/***/ },

/***/ "./src/app/pages/dashboard/siteStatistics/siteStatistics.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var core_1 = __webpack_require__("./node_modules/.2.1.1@@angular/core/index.js");
var SiteStatisticsService = (function () {
    function SiteStatisticsService() {
    }
    SiteStatisticsService.prototype.getData = function () {
        return [
            {
                description: '今日浏览人数',
                stats: '57,820',
                icon: 'person',
            }, {
                description: '今日留言数',
                stats: '89,745',
                icon: 'money',
            }, {
                description: '今天新文章',
                stats: '178,391',
                icon: 'face',
            }, {
                description: '我也不知道',
                stats: '32,592',
                icon: 'refresh',
            }
        ];
    };
    SiteStatisticsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SiteStatisticsService);
    return SiteStatisticsService;
}());
exports.SiteStatisticsService = SiteStatisticsService;


/***/ }

});
//# sourceMappingURL=6.map