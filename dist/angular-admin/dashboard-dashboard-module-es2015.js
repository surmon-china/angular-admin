(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["dashboard-dashboard-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/dashboard/dashboard.html":
/*!**************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/dashboard/dashboard.html ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n    <div class=\"row pie-charts\">\n      <sa-card\n        *ngFor=\"let item of defaultStatistics\" \n        class=\"pie-chart-item-container col-xlg-3 col-lg-3 col-md-6 col-sm-12 col-xs-12\"\n      >\n        <div class=\"pie-chart-item\">\n          <div class=\"description\">\n            <h4>{{ item.description }}</h4>\n            <p class=\"description-stats\">{{ statistics[item.type] || '-' }}</p>\n          </div>\n          <i class=\"chart-icon {{ item.icon }}\"></i>\n        </div>\n      </sa-card>\n    </div>    \n  </div>\n</div>\n<div class=\"row\">\n  <sa-card \n    title=\"GA 今日统计\"\n    baCardClass=\"ga-card with-scroll\"\n    class=\"col-xlg-12 col-xl-12 col-lg-12 col-sm-12 col-xs-12\"\n  >\n    <div class=\"toolbar\">\n      <div id=\"auth-button\" class=\"auth\"></div>\n      <div id=\"view-selector\" class=\"selector\"></div>\n    </div>\n    <hr>\n    <div class=\"pie-charts\">\n      <div id=\"pie-country\" class=\"chart\"></div>\n      <div id=\"pie-city\" class=\"chart\"></div>\n      <div id=\"pie-browser\" class=\"chart\"></div>\n    </div>\n    <hr>\n    <div id=\"timeline\" class=\"timeline\"></div>\n  </sa-card>\n</div>\n"

/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.component.ts":
/*!********************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.component.ts ***!
  \********************************************************/
/*! exports provided: DashboardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DashboardComponent", function() { return DashboardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _app_constants_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @app/constants/api */ "./src/app/constants/api.ts");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _app_services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @app/services */ "./src/app/services/index.ts");
/* harmony import */ var _app_pages_pages_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/pages/pages.service */ "./src/app/pages/pages.service.ts");
/**
 * @file 仪表盘页面组件
 * @module app/page/dashboard/component
 * @author Surmon <https://github.com/surmon-china>
 */





const DEFAULT_STATISTICS_DATA = [
    {
        description: '今日文章阅读',
        icon: 'ion-md-eye',
        type: 'views'
    }, {
        description: '全站文章数',
        icon: 'ion-md-list',
        type: 'articles'
    }, {
        description: '全站标签数',
        icon: 'ion-md-pricetags',
        type: 'tags'
    }, {
        description: '全站评论数',
        icon: 'ion-md-text',
        type: 'comments'
    }
];
var ELoading;
(function (ELoading) {
    ELoading[ELoading["Statistics"] = 0] = "Statistics";
    ELoading[ELoading["Articles"] = 1] = "Articles";
    ELoading[ELoading["Comments"] = 2] = "Comments";
    ELoading[ELoading["Guestbooks"] = 3] = "Guestbooks";
})(ELoading || (ELoading = {}));
let DashboardComponent = class DashboardComponent {
    constructor(httpService) {
        this.httpService = httpService;
        this.Loading = ELoading;
        this.statisticApiPath = _app_constants_api__WEBPACK_IMPORTED_MODULE_1__["STATISTIC"];
        this.analyticsApiPath = _app_constants_api__WEBPACK_IMPORTED_MODULE_1__["COMMENT"];
        this.defaultStatistics = DEFAULT_STATISTICS_DATA;
        this.statistics = {};
        this.fetching = {};
    }
    getStatisticsData() {
        return Object(_app_pages_pages_service__WEBPACK_IMPORTED_MODULE_4__["humanizedLoading"])(this.fetching, ELoading.Statistics, this.httpService
            .get(this.statisticApiPath)
            .then(statistics => {
            this.statistics = statistics.result;
        }));
    }
    getGaToken() {
        return Promise.resolve('token');
    }
    instanceGa(token) {
        const gapi = window.gapi;
        gapi.analytics.ready(() => {
            gapi.analytics.auth.authorize({
                container: 'auth-button',
                clientid: '984332218909-j1ool2q13e32865ttu1es9ih9i7s2e5e.apps.googleusercontent.com',
            });
            const viewSelector = new gapi.analytics.ViewSelector({
                container: 'view-selector'
            });
            const timeline = new gapi.analytics.googleCharts.DataChart({
                reportType: 'ga',
                query: {
                    dimensions: 'ga:hour',
                    'metrics': 'ga:sessions',
                    'start-date': 'today',
                    'end-date': 'today',
                },
                chart: {
                    type: 'LINE',
                    container: 'timeline',
                    options: {
                        width: '100%',
                        chartArea: {
                            left: '25',
                            right: '25',
                        }
                    },
                }
            });
            const getPieChart = (dimensions, container, title) => {
                return new gapi.analytics.googleCharts.DataChart({
                    query: {
                        dimensions,
                        metrics: 'ga:sessions',
                        'start-date': 'today',
                        'end-date': 'today',
                        'max-results': 10,
                        sort: '-ga:sessions',
                    },
                    chart: {
                        container,
                        type: 'PIE',
                        options: {
                            title,
                            width: '100%',
                            pieHole: 4 / 9,
                            chartArea: {
                                left: '25'
                            },
                        },
                    },
                });
            };
            const countryChart = getPieChart('ga:country', 'pie-country', '国家地区');
            const cityChart = getPieChart('ga:city', 'pie-city', '城市');
            const browserChart = getPieChart('ga:browser', 'pie-browser', '浏览器');
            gapi.analytics.auth.on('success', () => {
                viewSelector.execute();
                console.log('viewSelector.execute();');
            });
            viewSelector.on('change', ids => {
                const newIds = {
                    query: {
                        ids: ids
                    }
                };
                timeline.set(newIds).execute();
                countryChart.set(newIds).execute();
                cityChart.set(newIds).execute();
                browserChart.set(newIds).execute();
                console.log('browserChart.execute();');
            });
            // 日期选择器更新后，就 set
            // timeline.set({ query: { end-date: ' } }).execute();
            console.log('不 reay 啦', gapi.analytics);
        });
    }
    initGaScript() {
        (function (w, d, s, g, js, fjs) {
            g = w.gapi || (w.gapi = {});
            g.analytics = { q: [], ready: function (cb) { this.q.push(cb); } };
            js = d.createElement(s);
            fjs = d.getElementsByTagName(s)[0];
            js.src = 'https://apis.google.com/js/platform.js';
            fjs.parentNode.insertBefore(js, fjs);
            js.onload = function () { g.load('analytics'); };
        }(window, document, 'script'));
    }
    initGAClient() {
        return tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"](this, void 0, void 0, function* () {
            if (!window.gapi) {
                this.initGaScript();
            }
            this.getGaToken().then(this.instanceGa);
        });
    }
    ngOnInit() {
        this.initGAClient();
        this.getStatisticsData();
    }
};
DashboardComponent.ctorParameters = () => [
    { type: _app_services__WEBPACK_IMPORTED_MODULE_3__["SaHttpRequesterService"] }
];
DashboardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
        selector: 'page-dashboard',
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None,
        template: __webpack_require__(/*! raw-loader!./dashboard.html */ "./node_modules/raw-loader/index.js!./src/app/pages/dashboard/dashboard.html"),
        styles: [__webpack_require__(/*! ./dashboard.scss */ "./src/app/pages/dashboard/dashboard.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_app_services__WEBPACK_IMPORTED_MODULE_3__["SaHttpRequesterService"]])
], DashboardComponent);



/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.module.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.module.ts ***!
  \*****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _app_sa_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/sa.module */ "./src/app/sa.module.ts");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/* harmony import */ var _dashboard_routing__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./dashboard.routing */ "./src/app/pages/dashboard/dashboard.routing.ts");
/**
 * @file 仪表盘页面模块
 * @module app/page/dashboard/module
 * @author Surmon <https://github.com/surmon-china>
 */







let DashboardModule = class DashboardModule {
};
DashboardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
            _app_sa_module__WEBPACK_IMPORTED_MODULE_4__["SaModule"],
            _dashboard_routing__WEBPACK_IMPORTED_MODULE_6__["routing"]
        ],
        declarations: [
            _dashboard_component__WEBPACK_IMPORTED_MODULE_5__["DashboardComponent"]
        ]
    })
], DashboardModule);
/* harmony default export */ __webpack_exports__["default"] = (DashboardModule);


/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.routing.ts":
/*!******************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.routing.ts ***!
  \******************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _dashboard_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dashboard.component */ "./src/app/pages/dashboard/dashboard.component.ts");
/**
 * @file 仪表盘页面路由
 * @module app/page/dashboard/routes
 * @author Surmon <https://github.com/surmon-china>
 */


const routes = [
    {
        path: '',
        component: _dashboard_component__WEBPACK_IMPORTED_MODULE_1__["DashboardComponent"]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ }),

/***/ "./src/app/pages/dashboard/dashboard.scss":
/*!************************************************!*\
  !*** ./src/app/pages/dashboard/dashboard.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".pie-charts {\n  color: #ffffff;\n}\n.pie-charts .pie-chart-item-container {\n  position: relative;\n  padding: 0 15px;\n  float: left;\n  box-sizing: border-box;\n}\n.pie-charts .pie-chart-item-container .card {\n  height: 115px;\n}\n.pie-charts .pie-chart-item-container .card .card-body {\n  padding: 15px;\n}\n@media screen and (min-width: 1325px) {\n  .pie-charts .pie-chart-item-container {\n    width: 25%;\n    -webkit-box-flex: 0;\n            flex: 0 0 25%;\n  }\n}\n@media screen and (min-width: 700px) and (max-width: 1325px) {\n  .pie-charts .pie-chart-item-container {\n    width: 50%;\n    -webkit-box-flex: 0;\n            flex: 0 0 50%;\n  }\n}\n@media screen and (max-width: 700px) {\n  .pie-charts .pie-chart-item-container {\n    width: 100%;\n    -webkit-box-flex: 0;\n            flex: 0 0 100%;\n  }\n}\n.pie-charts .pie-chart-item {\n  position: relative;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  height: 100%;\n  padding: 0 1em;\n}\n.pie-charts .pie-chart-item .description {\n  display: inline-block;\n  font-size: 18px;\n  opacity: 0.9;\n}\n.pie-charts .pie-chart-item .description .description-stats {\n  padding-top: 0.5em;\n  font-size: 24px;\n}\n.pie-charts .pie-chart-item .chart-icon {\n  font-size: 4em;\n}\n@media screen and (min-width: 1325px) and (max-width: 1650px), (min-width: 700px) and (max-width: 830px) {\n  .pie-charts .chart-icon {\n    display: none;\n  }\n}\n.pie-charts .angular {\n  margin-top: 100px;\n}\n.pie-charts .angular .chart {\n  margin-top: 0;\n}\n@media screen and (min-width: 1620px) {\n  .row.shift-up > * {\n    margin-top: -573px;\n  }\n}\n@media screen and (max-width: 1620px) {\n  .card.feed-panel.large-card {\n    height: 824px;\n  }\n}\n.ga-card {\n  min-height: 400px;\n}\n.ga-card .toolbar {\n  height: 30px;\n  line-height: 30px;\n  display: -webkit-box;\n  display: flex;\n  margin-bottom: 1rem;\n}\n.ga-card .toolbar .auth {\n  width: auto;\n  padding: 0 1rem;\n  margin-right: 1rem;\n  background: #f7991c;\n  color: #fff;\n}\n.ga-card .toolbar .selector {\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  display: -webkit-box;\n  display: flex;\n}\n.ga-card .toolbar .selector table {\n  margin-right: 1rem;\n}\n.ga-card .toolbar .selector table tr td:last-child * {\n  display: block;\n  text-align: left;\n}\n.ga-card .pie-charts {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  min-height: 200px;\n}\n.ga-card .pie-charts .chart {\n  width: 32%;\n}\n.ga-card .timeline {\n  min-height: 200px;\n}\n.shr-a-shr-fb {\n  z-index: 9999999;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdXJtb24vUHJvamVjdHMvQmxvZy9hbmd1bGFyLWFkbWluL3NyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5zY3NzIiwiL1VzZXJzL3N1cm1vbi9Qcm9qZWN0cy9CbG9nL2FuZ3VsYXItYWRtaW4vc3JjL2FwcC90aGVtZS9zYXNzL2Jhc2UvX3ZhcmlhYmxlcy5zY3NzIiwic3JjL2FwcC9wYWdlcy9kYXNoYm9hcmQvZGFzaGJvYXJkLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxjQ0ZRO0FDQ1Y7QUZHRTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtFQUNBLFdBQUE7RUFDQSxzQkFBQTtBRURKO0FGR0k7RUFDRSxhQUFBO0FFRE47QUZHTTtFQUNFLGFBQUE7QUVEUjtBRk1FO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsbUJBQUE7WUFBQSxhQUFBO0VFSko7QUFDRjtBRk1FO0VBQ0U7SUFDRSxVQUFBO0lBQ0EsbUJBQUE7WUFBQSxhQUFBO0VFSko7QUFDRjtBRk1FO0VBQ0U7SUFDRSxXQUFBO0lBQ0EsbUJBQUE7WUFBQSxjQUFBO0VFSko7QUFDRjtBRk9FO0VBQ0Usa0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBRUxKO0FGT0k7RUFDRSxxQkFBQTtFQUNBLGVBQUE7RUFDQSxZQUFBO0FFTE47QUZPTTtFQUNFLGtCQUFBO0VBQ0EsZUFBQTtBRUxSO0FGU0k7RUFDRSxjQUFBO0FFUE47QUZVRTtFQUdFO0lBQ0UsYUFBQTtFRVZKO0FBQ0Y7QUZZRTtFQUNFLGlCQUFBO0FFVko7QUZZRTtFQUNFLGFBQUE7QUVWSjtBRmNBO0VBRUk7SUFDRSxrQkFBQTtFRVpKO0FBQ0Y7QUZnQkE7RUFDRTtJQUNFLGFBQUE7RUVkRjtBQUNGO0FGaUJBO0VBQ0UsaUJBQUE7QUVmRjtBRmlCRTtFQUNFLFlBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLG1CQUFBO0FFZko7QUZpQkk7RUFDRSxXQUFBO0VBQ0EsZUFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FFZk47QUZrQkk7RUFDRSxtQkFBQTtVQUFBLFlBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7QUVoQk47QUZrQk07RUFDRSxrQkFBQTtBRWhCUjtBRm9CWTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtBRWxCZDtBRjBCRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxpQkFBQTtBRXhCSjtBRjBCSTtFQUNFLFVBQUE7QUV4Qk47QUY0QkU7RUFDRSxpQkFBQTtBRTFCSjtBRjhCQTtFQUNFLGdCQUFBO0FFM0JGIiwiZmlsZSI6InNyYy9hcHAvcGFnZXMvZGFzaGJvYXJkL2Rhc2hib2FyZC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnfmFwcC90aGVtZS9zYXNzL2Jhc2UvaW5pdCc7XHJcblxyXG4ucGllLWNoYXJ0cyB7XHJcbiAgY29sb3I6ICRjb250ZW50LXRleHQ7XHJcblxyXG4gIC5waWUtY2hhcnQtaXRlbS1jb250YWluZXIge1xyXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xyXG4gICAgcGFkZGluZzogMCAxNXB4O1xyXG4gICAgZmxvYXQ6IGxlZnQ7XHJcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xyXG5cclxuICAgIC5jYXJkIHtcclxuICAgICAgaGVpZ2h0OiAxMTVweDtcclxuXHJcbiAgICAgIC5jYXJkLWJvZHkge1xyXG4gICAgICAgIHBhZGRpbmc6IDE1cHg7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEzMjVweCkge1xyXG4gICAgLnBpZS1jaGFydC1pdGVtLWNvbnRhaW5lciB7XHJcbiAgICAgIHdpZHRoOiAyNSU7XHJcbiAgICAgIGZsZXg6IDAgMCAyNSVcclxuICAgIH1cclxuICB9XHJcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNzAwcHgpIGFuZCAobWF4LXdpZHRoOiAxMzI1cHgpICB7XHJcbiAgICAucGllLWNoYXJ0LWl0ZW0tY29udGFpbmVyIHtcclxuICAgICAgd2lkdGg6IDUwJTtcclxuICAgICAgZmxleDogMCAwIDUwJVxyXG4gICAgfVxyXG4gIH1cclxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MDBweCkgIHtcclxuICAgIC5waWUtY2hhcnQtaXRlbS1jb250YWluZXIge1xyXG4gICAgICB3aWR0aDogMTAwJTtcclxuICAgICAgZmxleDogMCAwIDEwMCVcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC5waWUtY2hhcnQtaXRlbSB7XHJcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xyXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcclxuICAgIHdpZHRoOiAxMDAlO1xyXG4gICAgaGVpZ2h0OiAxMDAlO1xyXG4gICAgcGFkZGluZzogMCAxZW07XHJcblxyXG4gICAgLmRlc2NyaXB0aW9uIHtcclxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xyXG4gICAgICBmb250LXNpemU6IDE4cHg7XHJcbiAgICAgIG9wYWNpdHk6IDAuOTtcclxuICAgICAgXHJcbiAgICAgIC5kZXNjcmlwdGlvbi1zdGF0cyB7XHJcbiAgICAgICAgcGFkZGluZy10b3A6IC41ZW07XHJcbiAgICAgICAgZm9udC1zaXplOiAyNHB4O1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLmNoYXJ0LWljb24ge1xyXG4gICAgICBmb250LXNpemU6IDRlbTtcclxuICAgIH1cclxuICB9XHJcbiAgQG1lZGlhIHNjcmVlbiBhbmRcclxuICAobWluLXdpZHRoOiAxMzI1cHgpIGFuZCAobWF4LXdpZHRoOiAxNjUwcHgpLFxyXG4gIChtaW4td2lkdGg6IDcwMHB4KSBhbmQgKG1heC13aWR0aDogODMwcHgpIHtcclxuICAgIC5jaGFydC1pY29uIHtcclxuICAgICAgZGlzcGxheTogbm9uZTtcclxuICAgIH1cclxuICB9XHJcbiAgLmFuZ3VsYXIge1xyXG4gICAgbWFyZ2luLXRvcDogMTAwcHg7XHJcbiAgfVxyXG4gIC5hbmd1bGFyIC5jaGFydCB7XHJcbiAgICBtYXJnaW4tdG9wOiAwO1xyXG4gIH1cclxufVxyXG5cclxuQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMTYyMHB4KSB7XHJcbiAgLnJvdy5zaGlmdC11cCB7XHJcbiAgICA+ICoge1xyXG4gICAgICBtYXJnaW4tdG9wOiAtNTczcHg7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAxNjIwcHgpIHtcclxuICAuY2FyZC5mZWVkLXBhbmVsLmxhcmdlLWNhcmQge1xyXG4gICAgaGVpZ2h0OiA4MjRweDtcclxuICB9XHJcbn1cclxuXHJcbi5nYS1jYXJkIHtcclxuICBtaW4taGVpZ2h0OiA0MDBweDtcclxuXHJcbiAgLnRvb2xiYXIge1xyXG4gICAgaGVpZ2h0OiAzMHB4O1xyXG4gICAgbGluZS1oZWlnaHQ6IDMwcHg7XHJcbiAgICBkaXNwbGF5OiBmbGV4O1xyXG4gICAgbWFyZ2luLWJvdHRvbTogMXJlbTtcclxuXHJcbiAgICAuYXV0aCB7XHJcbiAgICAgIHdpZHRoOiBhdXRvO1xyXG4gICAgICBwYWRkaW5nOiAwIDFyZW07XHJcbiAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcclxuICAgICAgYmFja2dyb3VuZDogI2Y3OTkxYztcclxuICAgICAgY29sb3I6ICNmZmY7XHJcbiAgICB9XHJcblxyXG4gICAgLnNlbGVjdG9yIHtcclxuICAgICAgZmxleC1ncm93OiAxO1xyXG4gICAgICBkaXNwbGF5OiBmbGV4O1xyXG5cclxuICAgICAgdGFibGUge1xyXG4gICAgICAgIG1hcmdpbi1yaWdodDogMXJlbTtcclxuXHJcbiAgICAgICAgdHIge1xyXG4gICAgICAgICAgdGQge1xyXG4gICAgICAgICAgICAmOmxhc3QtY2hpbGQgKiB7XHJcbiAgICAgICAgICAgICAgZGlzcGxheTogYmxvY2s7XHJcbiAgICAgICAgICAgICAgdGV4dC1hbGlnbjogbGVmdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLnBpZS1jaGFydHMge1xyXG4gICAgZGlzcGxheTogZmxleDtcclxuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcclxuICAgIG1pbi1oZWlnaHQ6IDIwMHB4O1xyXG5cclxuICAgIC5jaGFydCB7XHJcbiAgICAgIHdpZHRoOiAzMiU7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAudGltZWxpbmUge1xyXG4gICAgbWluLWhlaWdodDogMjAwcHg7XHJcbiAgfVxyXG59XHJcblxyXG4uc2hyLWEtc2hyLWZiIHtcclxuICB6LWluZGV4OiA5OTk5OTk5O1xyXG59IiwiXG4kZGVmYXVsdDogI2ZmZmZmZjsgLy8gZGVmYXVsdCBjb2xvcnMgZm9yIGxheW91dFxuJGJvZHktYmc6ICNGMEYzRjQ7IC8vIGRlZmF1bHQgYmcgY29sb3JcblxuLy8gc2lkZWJhciBjb2xvcnNcbiRzaWRlYmFyOiAjMjMyODJkO1xuJHNpZGViYXItdGV4dDogI2ZmZmZmZjtcbiRzaWRlYmFyLXN1Ymxpc3Q6ICMzMjM3M2M7XG4kc2lkZWJhci1ib3JkZXI6ICMxMDE5MjA7XG5cbiR0b3BiYXI6ICMyMzI4MmQ7XG4kdG9wYmFyLXRleHQ6ICNmZmZmZmY7XG4kdG9wYmFyLWJvcmRlcjogJHNpZGViYXItYm9yZGVyO1xuXG4kZGVmYXVsdC10ZXh0OiAkZGVmYXVsdDsgLy8gZGVmYXVsdCB0ZXh0IGNvbG9yIGxheW91dCAodXN1YWxseSBpcyB0aGUgc2FtZSBhcyAkZGVmYXVsdClcbiRjb250ZW50LXRleHQ6ICRkZWZhdWx0LXRleHQ7IC8vIGNvbnRlbnQgdGV4dCBjb2xvciBvbiBjYXJkLCBwYW5lbHMsIGZvcm0sIGV0Y1xuJGhlbHAtdGV4dDogcmdiYSgkZGVmYXVsdC10ZXh0LCAwLjUpOyAvLyBhZGRpdGlvbmFsIHRleHQgY29sb3IgZm9yIGhpdHNcblxuJGxhYmVsLXRleHQ6ICRkZWZhdWx0LXRleHQ7IC8vIGxhYmVscyBjb2xvclxuJGJvcmRlcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjUpOyAvLyBib3JkZXIgY29sb3JcbiRib3JkZXItbGlnaHQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTsgLy8gbGlnaHRlciB2ZXJzaW9uIG9mIGJvcmRlciBjb2xvciAoZm9yIGhvdmVycylcbiRpbnB1dC1ib3JkZXI6ICRzaWRlYmFyLXN1Ymxpc3Q7IC8vIGlucHV0IGJvcmRlciBjb2xvclxuJGlucHV0LWJhY2tncm91bmQ6IHJnYmEoJHNpZGViYXItc3VibGlzdCwgMC41KTs7IC8vIGlucHV0IGJvcmRlciBjb2xvciBmb3IgaG92ZXJcbiRkaXNhYmxlZDogJGlucHV0LWJvcmRlcjsgLy8gY29sb3IgZm9yIGRpc2FibGVkIHN0YXRlXG4kZGlzYWJsZWQtYmc6IHRpbnQoJGRpc2FibGVkLCAxNSUpOyAvLyBiYWNrZ3JvdW5kIGNvbG9yIGZvciBkaXNhYmxlIHN0YXRlXG4kZHJvcGRvd24tdGV4dDogIzdkN2Q3ZDsgLy8gZHJvcGRvd24gdGV4dCBjb2xvclxuXG4vLyBzcGVjaWZpYyBjb21wb25lbnRzIGNvbG9yc1xuJG1haWwtYm94OiB3aGl0ZXNtb2tlO1xuJGF1dGgtcGFuZWwtYmFja2dyb3VuZDogI2ZmZmZmZjtcbiRwcm9ncmVzcy1iYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpO1xuJHByb2dyZXNzLWRlZmF1bHQ6IHJnYmEoJGRlZmF1bHQtdGV4dCwgMC45NSk7XG5cbi8vIGJvb3RzdHJhcCBjYXJkIHBhbmVsIHN0eWxlc1xuJGJvb3RzdHJhcC1wYW5lbC1yYWRpdXM6IDdweDtcbiRib290c3RyYXAtcGFuZWwtdGV4dDogI2ZmZmZmZjtcbiRib290c3RyYXAtcGFuZWwtYmc6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbiRib290c3RyYXAtcGFuZWwtaGVhZGVyLWJnOiAkdG9wYmFyO1xuJGJvb3RzdHJhcC1wYW5lbC1oZWFkZXItYm9yZGVyOiAxcHggc29saWQgJHRvcGJhci1ib3JkZXI7XG4kYm9vdHN0cmFwLXBhbmVsLXNoYWRvdzogMXB4IDFweCA0cHggcmdiYSgwLCAwLCAwLCAwLjE1KTtcblxuLy8gY29sb3Igc2NoZW1lXG4vLyAkcHJpbWFyeTogIzIwOWU5MSAhZGVmYXVsdDtcbiRwcmltYXJ5OiAjMDE3MTcwICFkZWZhdWx0O1xuJGluZm86ICMzNDk4ZGIgIWRlZmF1bHQ7XG4kc3VjY2VzczogIzI4NzU2MiAhZGVmYXVsdDtcbiR3YXJuaW5nOiAjZjM5YzEyICFkZWZhdWx0O1xuJGRhbmdlcjogI2U3NGMzYyAhZGVmYXVsdDtcblxuJHByaW1hcnktbGlnaHQ6IHRpbnQoJHByaW1hcnksIDMwJSk7XG4kaW5mby1saWdodDogdGludCgkaW5mbywgMzAlKTtcbiRzdWNjZXNzLWxpZ2h0OiB0aW50KCRzdWNjZXNzLCAzMCUpO1xuJHdhcm5pbmctbGlnaHQ6IHRpbnQoJHdhcm5pbmcsIDMwJSk7XG4kZGFuZ2VyLWxpZ2h0OiB0aW50KCRkYW5nZXIsIDMwJSk7XG5cbiRwcmltYXJ5LWRhcms6IHNoYWRlKCRwcmltYXJ5LCAxNSUpO1xuJGluZm8tZGFyazogc2hhZGUoJGluZm8sIDE1JSk7XG4kc3VjY2Vzcy1kYXJrOiBzaGFkZSgkc3VjY2VzcywgMTUlKTtcbiR3YXJuaW5nLWRhcms6IHNoYWRlKCR3YXJuaW5nLCAxNSUpO1xuJGRhbmdlci1kYXJrOiBzaGFkZSgkZGFuZ2VyLCAxNSUpO1xuXG4kcHJpbWFyeS1iZzogdGludCgkcHJpbWFyeSwgMjAlKTtcbiRpbmZvLWJnOiB0aW50KCRpbmZvLCAyMCUpO1xuJHN1Y2Nlc3MtYmc6IHRpbnQoJHN1Y2Nlc3MsIDIwJSk7XG4kd2FybmluZy1iZzogdGludCgkd2FybmluZywgMjAlKTtcbiRkYW5nZXItYmc6IHRpbnQoJGRhbmdlciwgMjAlKTtcblxuLy8gbGluayBjb2xvcnNcbiRhY3RpdmVsaW5rOiAkZGVmYXVsdDtcbiRob3Zlcmxpbms6ICRwcmltYXJ5O1xuXG4kZm9udC1mYW1pbHk6ICdESU5SZWd1bGFyJywgXCJQaW5nRmFuZyBTQ1wiLCAtYXBwbGUtc3lzdGVtLCBCbGlua01hY1N5c3RlbUZvbnQsICdSb2JvdG8nLCAnQ2VudHVyeSBHb3RoaWMnLCBCbGlua01hY1N5c3RlbUZvbnQsICdTZWdvZSBVSScsICdNaWNyb3NvZnQgeWFoZWknLCAn5b6u6L2v6ZuF6buRJywgJ0hlbHZldGljYSBOZXVlJywgc2Fucy1zZXJpZiwgU2ltSGVpO1xuXG4kcmVzWFhMOiAxMjgwcHg7XG4kcmVzWEw6IDExNzBweDtcbiRyZXNMOiA5OTFweDtcbiRyZXNNOiA3NjhweDtcbiRyZXNTOiA2NjBweDtcbiRyZXNYUzogNTAwcHg7XG4kcmVzWFhTOiA0MzVweDtcbiRyZXNNaW46IDMyMHB4O1xuXG4kdG9wLWhlaWdodDogNDVweDtcbiRzaWRlYmFyLXdpZHRoOiAxOTBweDtcblxuJHNtYWxsLWNhcmQtaGVpZ2h0OiAxMTRweDtcbiR4c21hbGwtY2FyZC1oZWlnaHQ6IDE4N3B4O1xuJG1lZGl1bS1jYXJkLWhlaWdodDogNDAwcHg7XG4kZXh0cmEtbWVkaXVtLWNhcmQtaGVpZ2h0OiA1NTBweDtcbiRsYXJnZS1jYXJkLWhlaWdodDogOTc0cHg7XG5cbiRkZWZhdWx0LWFuaW1hdGlvbi1kdXJhdGlvbjogMC4ycztcbiRkZWZhdWx0LWFuaW1hdGlvbi1zdHlsZTogZWFzZS1vdXQ7XG5cbiRhc3NldHMtcm9vdDogJy9hc3NldHMvJztcbiRpbWFnZXMtcm9vdDogJGFzc2V0cy1yb290ICsgJ2ltZy8nO1xuJGZvbnRzLXJvb3Q6ICRhc3NldHMtcm9vdCArICdmb250cy8nO1xuJGZvbnQtdGhpbjogMTAwO1xuJGZvbnQtbGlnaHQ6IDMwMDtcbiRmb250LW5vcm1hbDogNDAwO1xuJGZvbnQtYm9sZDogNzAwO1xuJGZvbnQtYm9sZGVyOiA1MDA7XG4kZm9udC11bHRyYUJvbGQ6IDkwMDtcblxuJGZhY2Vib29rLWNvbG9yOiAjM2I1OTk4O1xuJHR3aXR0ZXItY29sb3I6ICM1NWFjZWU7XG4kZ29vZ2xlLWNvbG9yOiAjZGQ0YjM5O1xuJGxpbmtlZGluLWNvbG9yOiAjMDE3N0I1O1xuJGdpdGh1Yi1jb2xvcjogIzZiNmI2YjtcbiRzdGFja292ZXJmbG93LWNvbG9yOiAjMkY5NkU4O1xuJGRyaWJibGUtY29sb3I6ICNGMjY3OTg7XG4kYmVoYWNlLWNvbG9yOiAjMDA5M0ZBO1xuJGJsYWNrLWNvbG9yOiAjMDAwMDAwO1xuXG4vLyBtYWluIGJhY2tncm91bmRcbkBtaXhpbiBib2R5LWJnKCkge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYm9keS1iZztcblxuICAvLyAkbWFpbkJnVXJsOiAkaW1hZ2VzLXJvb3QgKyAnYmx1ci1iZy1ibHVycmVkLmpwZyc7XG5cbiAgJjo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAnJztcbiAgICBwb3NpdGlvbjogZml4ZWQ7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIHRvcDogMDtcbiAgICBsZWZ0OiAwO1xuICAgIC8vIGJhY2tncm91bmQ6IHVybCgkbWFpbkJnVXJsKSBuby1yZXBlYXQgY2VudGVyIGNlbnRlcjtcbiAgICAvLyBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRzaWRlYmFyLXN1Ymxpc3Q7XG4gICAgd2lsbC1jaGFuZ2U6IHRyYW5zZm9ybTtcbiAgICB6LWluZGV4OiAwO1xuICB9XG59XG5cbi8vIGFkZGl0aW9uYWwgYmFja2dyb3VuZCBpZiB5b3Ugd2FudCBhbm90aGVyIGxheWVyXG5AbWl4aW4gYWRkaXRpb25hbC1iZygpIHtcbiAgLy9kaXNwbGF5OiBibG9jazsgLy8gYWRkaXRpb25hbCBiYWNrZ3JvdW5kIGxheWVyLCBoaWRkZW4gYnkgZGVmYXVsdFxufVxuIiwiLnBpZS1jaGFydHMge1xuICBjb2xvcjogI2ZmZmZmZjtcbn1cbi5waWUtY2hhcnRzIC5waWUtY2hhcnQtaXRlbS1jb250YWluZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHBhZGRpbmc6IDAgMTVweDtcbiAgZmxvYXQ6IGxlZnQ7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4ucGllLWNoYXJ0cyAucGllLWNoYXJ0LWl0ZW0tY29udGFpbmVyIC5jYXJkIHtcbiAgaGVpZ2h0OiAxMTVweDtcbn1cbi5waWUtY2hhcnRzIC5waWUtY2hhcnQtaXRlbS1jb250YWluZXIgLmNhcmQgLmNhcmQtYm9keSB7XG4gIHBhZGRpbmc6IDE1cHg7XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxMzI1cHgpIHtcbiAgLnBpZS1jaGFydHMgLnBpZS1jaGFydC1pdGVtLWNvbnRhaW5lciB7XG4gICAgd2lkdGg6IDI1JTtcbiAgICBmbGV4OiAwIDAgMjUlO1xuICB9XG59XG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA3MDBweCkgYW5kIChtYXgtd2lkdGg6IDEzMjVweCkge1xuICAucGllLWNoYXJ0cyAucGllLWNoYXJ0LWl0ZW0tY29udGFpbmVyIHtcbiAgICB3aWR0aDogNTAlO1xuICAgIGZsZXg6IDAgMCA1MCU7XG4gIH1cbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KSB7XG4gIC5waWUtY2hhcnRzIC5waWUtY2hhcnQtaXRlbS1jb250YWluZXIge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZsZXg6IDAgMCAxMDAlO1xuICB9XG59XG4ucGllLWNoYXJ0cyAucGllLWNoYXJ0LWl0ZW0ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcGFkZGluZzogMCAxZW07XG59XG4ucGllLWNoYXJ0cyAucGllLWNoYXJ0LWl0ZW0gLmRlc2NyaXB0aW9uIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICBmb250LXNpemU6IDE4cHg7XG4gIG9wYWNpdHk6IDAuOTtcbn1cbi5waWUtY2hhcnRzIC5waWUtY2hhcnQtaXRlbSAuZGVzY3JpcHRpb24gLmRlc2NyaXB0aW9uLXN0YXRzIHtcbiAgcGFkZGluZy10b3A6IDAuNWVtO1xuICBmb250LXNpemU6IDI0cHg7XG59XG4ucGllLWNoYXJ0cyAucGllLWNoYXJ0LWl0ZW0gLmNoYXJ0LWljb24ge1xuICBmb250LXNpemU6IDRlbTtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDEzMjVweCkgYW5kIChtYXgtd2lkdGg6IDE2NTBweCksIChtaW4td2lkdGg6IDcwMHB4KSBhbmQgKG1heC13aWR0aDogODMwcHgpIHtcbiAgLnBpZS1jaGFydHMgLmNoYXJ0LWljb24ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cbi5waWUtY2hhcnRzIC5hbmd1bGFyIHtcbiAgbWFyZ2luLXRvcDogMTAwcHg7XG59XG4ucGllLWNoYXJ0cyAuYW5ndWxhciAuY2hhcnQge1xuICBtYXJnaW4tdG9wOiAwO1xufVxuXG5AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAxNjIwcHgpIHtcbiAgLnJvdy5zaGlmdC11cCA+ICoge1xuICAgIG1hcmdpbi10b3A6IC01NzNweDtcbiAgfVxufVxuQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMTYyMHB4KSB7XG4gIC5jYXJkLmZlZWQtcGFuZWwubGFyZ2UtY2FyZCB7XG4gICAgaGVpZ2h0OiA4MjRweDtcbiAgfVxufVxuLmdhLWNhcmQge1xuICBtaW4taGVpZ2h0OiA0MDBweDtcbn1cbi5nYS1jYXJkIC50b29sYmFyIHtcbiAgaGVpZ2h0OiAzMHB4O1xuICBsaW5lLWhlaWdodDogMzBweDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWFyZ2luLWJvdHRvbTogMXJlbTtcbn1cbi5nYS1jYXJkIC50b29sYmFyIC5hdXRoIHtcbiAgd2lkdGg6IGF1dG87XG4gIHBhZGRpbmc6IDAgMXJlbTtcbiAgbWFyZ2luLXJpZ2h0OiAxcmVtO1xuICBiYWNrZ3JvdW5kOiAjZjc5OTFjO1xuICBjb2xvcjogI2ZmZjtcbn1cbi5nYS1jYXJkIC50b29sYmFyIC5zZWxlY3RvciB7XG4gIGZsZXgtZ3JvdzogMTtcbiAgZGlzcGxheTogZmxleDtcbn1cbi5nYS1jYXJkIC50b29sYmFyIC5zZWxlY3RvciB0YWJsZSB7XG4gIG1hcmdpbi1yaWdodDogMXJlbTtcbn1cbi5nYS1jYXJkIC50b29sYmFyIC5zZWxlY3RvciB0YWJsZSB0ciB0ZDpsYXN0LWNoaWxkICoge1xuICBkaXNwbGF5OiBibG9jaztcbiAgdGV4dC1hbGlnbjogbGVmdDtcbn1cbi5nYS1jYXJkIC5waWUtY2hhcnRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBtaW4taGVpZ2h0OiAyMDBweDtcbn1cbi5nYS1jYXJkIC5waWUtY2hhcnRzIC5jaGFydCB7XG4gIHdpZHRoOiAzMiU7XG59XG4uZ2EtY2FyZCAudGltZWxpbmUge1xuICBtaW4taGVpZ2h0OiAyMDBweDtcbn1cblxuLnNoci1hLXNoci1mYiB7XG4gIHotaW5kZXg6IDk5OTk5OTk7XG59Il19 */"

/***/ })

}]);
//# sourceMappingURL=dashboard-dashboard-module-es2015.js.map