(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["demo-tables-tables-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/BasicTables.html":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/demo/tables/components/basicTables/BasicTables.html ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"widgets\">\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6 col-md-12\">\r\n      <sa-card title=\"Hover Rows\" baCardClass=\"with-scroll table-panel\">\r\n        <box-hover-table></box-hover-table>\r\n      </sa-card>\r\n    </div>\r\n    <div class=\"col-lg-6 col-md-12\">\r\n      <sa-card title=\"Bordered Table\" baCardClass=\"with-scroll table-panel\">\r\n        <box-bordered-table></box-bordered-table>\r\n      </sa-card>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6 col-md-12\">\r\n      <sa-card title=\"Condensed Table\" baCardClass=\"with-scroll table-panel\">\r\n        <box-condensed-table></box-condensed-table>\r\n      </sa-card>\r\n    </div>\r\n    <div class=\"col-lg-6 col-md-12\">\r\n      <sa-card title=\"Striped Rows\" baCardClass=\"with-scroll table-panel\">\r\n        <box-striped-table></box-striped-table>\r\n      </sa-card>\r\n    </div>\r\n  </div>\r\n  <div class=\"row\">\r\n    <div class=\"col-lg-6 col-md-12\">\r\n      <sa-card title=\"Contextual Table\" baCardClass=\"with-scroll table-panel\">\r\n        <box-contextual-table></box-contextual-table>\r\n      </sa-card>\r\n    </div>\r\n    <div class=\"col-lg-6 col-md-12\">\r\n      <sa-card title=\"Responsive Table\" baCardClass=\"with-scroll table-panel\">\r\n        <box-responsive-table></box-responsive-table>\r\n      </sa-card>\r\n    </div>\r\n  </div>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/borderedTable/borderedTable.html":
/*!********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/demo/tables/components/basicTables/components/borderedTable/borderedTable.html ***!
  \********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"horizontal-scroll\">\r\n  <table class=\"table table-bordered\">\r\n    <thead>\r\n    <tr>\r\n      <th class=\"browser-icons\"></th>\r\n      <th>Browser</th>\r\n      <th class=\"align-right\">Visits</th>\r\n      <th class=\"align-right\">Purchases</th>\r\n      <th class=\"align-right\">%</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let item of metricsTableData\">\r\n      <td><img src=\"{{ ( item.image | saAppPicture )}}\" width=\"20\" height=\"20\"></td>\r\n      <td ngClass=\"nowrap\">{{ item.browser }}</td>\r\n      <td class=\"align-right\">{{ item.visits }}</td>\r\n      <td class=\"align-right\">{{ item.purchases }}</td>\r\n      <td class=\"align-right\">{{ item.percent }}</td>\r\n    </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/condensedTable/condensedTable.html":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/demo/tables/components/basicTables/components/condensedTable/condensedTable.html ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"horizontal-scroll\">\r\n  <table class=\"table table-condensed\">\r\n    <thead>\r\n    <tr>\r\n      <th class=\"table-id\">#</th>\r\n      <th>First Name</th>\r\n      <th>Last Name</th>\r\n      <th>Username</th>\r\n      <th>Email</th>\r\n      <th>Status</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let item of peopleTableData\">\r\n      <td class=\"table-id\">{{ item.id }}</td>\r\n      <td>{{ item.firstName }}</td>\r\n      <td>{{ item.lastName }}</td>\r\n      <td>{{ item.username }}</td>\r\n      <td><a class=\"email-link\" href=\"mailto:{{ item.email }}\">{{ item.email }}</a></td>\r\n      <td>\r\n        <button ngClass=\"{status-button btn btn-xs btn-{{ item.status }}\">{{ item.status }}</button>\r\n      </td>\r\n    </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/contextualTable/contextualTable.html":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/demo/tables/components/basicTables/components/contextualTable/contextualTable.html ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<table class=\"table\">\r\n  <tr>\r\n    <th>#</th>\r\n    <th>First Name</th>\r\n    <th>Last Name</th>\r\n    <th>Username</th>\r\n    <th>Email</th>\r\n    <th>Age</th>\r\n  </tr>\r\n  <tr class=\"primary\">\r\n    <td>1</td>\r\n    <td>Mark</td>\r\n    <td>Otto</td>\r\n    <td>@mdo</td>\r\n    <td><a class=\"email-link \" href=\"mailto:mdo@gmail.com\">mdo@gmail.com</a></td>\r\n    <td>28</td>\r\n  </tr>\r\n  <tr class=\"success\">\r\n    <td>2</td>\r\n    <td>Jacob</td>\r\n    <td>Thornton</td>\r\n    <td>@fat</td>\r\n    <td><a class=\"email-link \" href=\"mailto:fat@yandex.ru\">fat@yandex.ru</a></td>\r\n    <td>45</td>\r\n  </tr>\r\n  <tr class=\"warning\">\r\n    <td>3</td>\r\n    <td>Larry</td>\r\n    <td>Bird</td>\r\n    <td>@twitter</td>\r\n    <td><a class=\"email-link \" href=\"mailto:twitter@outlook.com\">twitter@outlook.com</a>\r\n    </td>\r\n    <td>18</td>\r\n  </tr>\r\n  <tr class=\"danger\">\r\n    <td>4</td>\r\n    <td>John</td>\r\n    <td>Snow</td>\r\n    <td>@snow</td>\r\n    <td><a class=\"email-link\" href=\"mailto:snow@gmail.com\">snow@gmail.com</a></td>\r\n    <td>20</td>\r\n  </tr>\r\n  <tr class=\"info\">\r\n    <td>5</td>\r\n    <td>Jack</td>\r\n    <td>Sparrow</td>\r\n    <td>@jack</td>\r\n    <td><a class=\"email-link\" href=\"mailto:jack@yandex.ru\">jack@yandex.ru</a></td>\r\n    <td>30</td>\r\n  </tr>\r\n</table>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/hoverTable/hoverTable.html":
/*!**************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/demo/tables/components/basicTables/components/hoverTable/hoverTable.html ***!
  \**************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"horizontal-scroll\">\r\n  <table class=\"table table-hover\">\r\n    <thead>\r\n    <tr class=\"black-muted-bg\">\r\n      <th class=\"browser-icons\"></th>\r\n      <th>Browser</th>\r\n      <th class=\"align-right\">Visits</th>\r\n      <th class=\"table-arr\"></th>\r\n      <th class=\"align-right\">Purchases</th>\r\n      <th class=\"table-arr\"></th>\r\n      <th class=\"align-right\">%</th>\r\n      <th class=\"table-arr\"></th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let item of metricsTableData\" class=\"no-top-border\">\r\n      <td><img src=\"{{ ( item.image | saAppPicture ) }}\" width=\"20\" height=\"20\"></td>\r\n      <td ngClass=\"nowrap\">{{item.browser}}</td>\r\n      <td class=\"align-right\">{{item.visits}}</td>\r\n      <td class=\"table-arr\"><i [ngClass]=\"{'icon-up': item.isVisitsUp, 'icon-down': !item.isVisitsUp }\"></i></td>\r\n      <td class=\"align-right\">{{item.purchases}}</td>\r\n      <td class=\"table-arr\"><i [ngClass]=\"{'icon-up': item.isPurchasesUp, 'icon-down': !item.isPurchasesUp }\"></i></td>\r\n      <td class=\"align-right\">{{item.percent}}</td>\r\n      <td class=\"table-arr\"><i [ngClass]=\"{'icon-up': item.isPercentUp, 'icon-down': !item.isPercentUp }\"></i></td>\r\n    </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/responsiveTable.html":
/*!************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/responsiveTable.html ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"table-responsive\">\r\n  <table class=\"table\">\r\n    <tr>\r\n      <th>#</th>\r\n      <th>First Name</th>\r\n      <th>Last Name</th>\r\n      <th>Username</th>\r\n      <th>Email</th>\r\n      <th>Age</th>\r\n    </tr>\r\n    <tr>\r\n      <td>1</td>\r\n      <td>Mark</td>\r\n      <td>Otto</td>\r\n      <td>@mdo</td>\r\n      <td><a class=\"email-link\" href=\"mailto:mdo@gmail.com\">mdo@gmail.com</a></td>\r\n      <td>28</td>\r\n    </tr>\r\n    <tr>\r\n      <td>2</td>\r\n      <td>Jacob</td>\r\n      <td>Thornton</td>\r\n      <td>@fat</td>\r\n      <td><a class=\"email-link\" href=\"mailto:fat@yandex.ru\">fat@yandex.ru</a></td>\r\n      <td>45</td>\r\n    </tr>\r\n    <tr>\r\n      <td>3</td>\r\n      <td>Larry</td>\r\n      <td>Bird</td>\r\n      <td>@twitter</td>\r\n      <td><a class=\"email-link\" href=\"mailto:twitter@outlook.com\">twitter@outlook.com</a>\r\n      </td>\r\n      <td>18</td>\r\n    </tr>\r\n    <tr>\r\n      <td>4</td>\r\n      <td>John</td>\r\n      <td>Snow</td>\r\n      <td>@snow</td>\r\n      <td><a class=\"email-link\" href=\"mailto:snow@gmail.com\">snow@gmail.com</a></td>\r\n      <td>20</td>\r\n    </tr>\r\n    <tr>\r\n      <td>5</td>\r\n      <td>Jack</td>\r\n      <td>Sparrow</td>\r\n      <td>@jack</td>\r\n      <td><a class=\"email-link\" href=\"mailto:jack@yandex.ru\">jack@yandex.ru</a></td>\r\n      <td>30</td>\r\n    </tr>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/stripedTable/stripedTable.html":
/*!******************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/demo/tables/components/basicTables/components/stripedTable/stripedTable.html ***!
  \******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"vertical-scroll\">\r\n  <table class=\"table table-striped\">\r\n    <thead>\r\n    <tr>\r\n      <th class=\"table-id\">#</th>\r\n      <th>First Name</th>\r\n      <th>Last Name</th>\r\n      <th>Username</th>\r\n      <th>Email</th>\r\n      <th>Age</th>\r\n    </tr>\r\n    </thead>\r\n    <tbody>\r\n    <tr *ngFor=\"let item of smartTableData\">\r\n      <td class=\"table-id\">{{ item.id }}</td>\r\n      <td>{{ item.firstName }}</td>\r\n      <td>{{ item.lastName }}</td>\r\n      <td>{{ item.username }}</td>\r\n      <td><a class=\"email-link\" href=\"mailto:{{ item.email }}\">{{ item.email }}</a></td>\r\n      <td>{{ item.age }}</td>\r\n    </tr>\r\n    </tbody>\r\n  </table>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/BasicTables.scss":
/*!***************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/BasicTables.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".status-button {\n  width: 60px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdXJtb24vUHJvamVjdHMvQmxvZy9hbmd1bGFyLWFkbWluL3NyYy9hcHAvcGFnZXMvZGVtby90YWJsZXMvY29tcG9uZW50cy9iYXNpY1RhYmxlcy9CYXNpY1RhYmxlcy5zY3NzIiwic3JjL2FwcC9wYWdlcy9kZW1vL3RhYmxlcy9jb21wb25lbnRzL2Jhc2ljVGFibGVzL0Jhc2ljVGFibGVzLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9wYWdlcy9kZW1vL3RhYmxlcy9jb21wb25lbnRzL2Jhc2ljVGFibGVzL0Jhc2ljVGFibGVzLnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc3RhdHVzLWJ1dHRvbiB7XHJcbiAgd2lkdGg6IDYwcHg7XHJcbn1cclxuIiwiLnN0YXR1cy1idXR0b24ge1xuICB3aWR0aDogNjBweDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/basicTables.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/basicTables.component.ts ***!
  \***********************************************************************************/
/*! exports provided: BasicTablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicTablesComponent", function() { return BasicTablesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var BasicTablesComponent = /** @class */ (function () {
    function BasicTablesComponent() {
    }
    BasicTablesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'page-basic-tables',
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewEncapsulation"].None,
            template: __webpack_require__(/*! raw-loader!./BasicTables.html */ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/BasicTables.html"),
            styles: [__webpack_require__(/*! ./BasicTables.scss */ "./src/app/pages/demo/tables/components/basicTables/BasicTables.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], BasicTablesComponent);
    return BasicTablesComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/basicTables.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/basicTables.service.ts ***!
  \*********************************************************************************/
/*! exports provided: BasicTablesService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BasicTablesService", function() { return BasicTablesService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var BasicTablesService = /** @class */ (function () {
    function BasicTablesService() {
        this.smartTablePageSize = 10;
        this.smartTableData = [
            {
                id: 1,
                firstName: 'Mark',
                lastName: 'Otto',
                username: '@mdo',
                email: 'mdo@gmail.com',
                age: '28'
            },
            {
                id: 2,
                firstName: 'Jacob',
                lastName: 'Thornton',
                username: '@fat',
                email: 'fat@yandex.ru',
                age: '45'
            },
            {
                id: 3,
                firstName: 'Larry',
                lastName: 'Bird',
                username: '@twitter',
                email: 'twitter@outlook.com',
                age: '18'
            },
            {
                id: 4,
                firstName: 'John',
                lastName: 'Snow',
                username: '@snow',
                email: 'snow@gmail.com',
                age: '20'
            },
            {
                id: 5,
                firstName: 'Jack',
                lastName: 'Sparrow',
                username: '@jack',
                email: 'jack@yandex.ru',
                age: '30'
            },
            {
                id: 6,
                firstName: 'Ann',
                lastName: 'Smith',
                username: '@ann',
                email: 'ann@gmail.com',
                age: '21'
            },
            {
                id: 7,
                firstName: 'Barbara',
                lastName: 'Black',
                username: '@barbara',
                email: 'barbara@yandex.ru',
                age: '43'
            },
            {
                id: 8,
                firstName: 'Sevan',
                lastName: 'Bagrat',
                username: '@sevan',
                email: 'sevan@outlook.com',
                age: '13'
            },
            {
                id: 9,
                firstName: 'Ruben',
                lastName: 'Vardan',
                username: '@ruben',
                email: 'ruben@gmail.com',
                age: '22'
            },
            {
                id: 10,
                firstName: 'Karen',
                lastName: 'Sevan',
                username: '@karen',
                email: 'karen@yandex.ru',
                age: '33'
            },
            {
                id: 11,
                firstName: 'Mark',
                lastName: 'Otto',
                username: '@mark',
                email: 'mark@gmail.com',
                age: '38'
            },
            {
                id: 12,
                firstName: 'Jacob',
                lastName: 'Thornton',
                username: '@jacob',
                email: 'jacob@yandex.ru',
                age: '48'
            },
            {
                id: 13,
                firstName: 'Haik',
                lastName: 'Hakob',
                username: '@haik',
                email: 'haik@outlook.com',
                age: '48'
            },
            {
                id: 14,
                firstName: 'Garegin',
                lastName: 'Jirair',
                username: '@garegin',
                email: 'garegin@gmail.com',
                age: '40'
            },
            {
                id: 15,
                firstName: 'Krikor',
                lastName: 'Bedros',
                username: '@krikor',
                email: 'krikor@yandex.ru',
                age: '32'
            },
            {
                id: 16,
                firstName: 'Francisca',
                lastName: 'Brady',
                username: '@Gibson',
                email: 'franciscagibson@comtours.com',
                age: 11
            },
            {
                id: 17,
                firstName: 'Tillman',
                lastName: 'Figueroa',
                username: '@Snow',
                email: 'tillmansnow@comtours.com',
                age: 34
            },
            {
                id: 18,
                firstName: 'Jimenez',
                lastName: 'Morris',
                username: '@Bryant',
                email: 'jimenezbryant@comtours.com',
                age: 45
            },
            {
                id: 19,
                firstName: 'Sandoval',
                lastName: 'Jacobson',
                username: '@Mcbride',
                email: 'sandovalmcbride@comtours.com',
                age: 32
            },
            {
                id: 20,
                firstName: 'Griffin',
                lastName: 'Torres',
                username: '@Charles',
                email: 'griffincharles@comtours.com',
                age: 19
            },
            {
                id: 21,
                firstName: 'Cora',
                lastName: 'Parker',
                username: '@Caldwell',
                email: 'coracaldwell@comtours.com',
                age: 27
            },
            {
                id: 22,
                firstName: 'Cindy',
                lastName: 'Bond',
                username: '@Velez',
                email: 'cindyvelez@comtours.com',
                age: 24
            },
            {
                id: 23,
                firstName: 'Frieda',
                lastName: 'Tyson',
                username: '@Craig',
                email: 'friedacraig@comtours.com',
                age: 45
            },
            {
                id: 24,
                firstName: 'Cote',
                lastName: 'Holcomb',
                username: '@Rowe',
                email: 'coterowe@comtours.com',
                age: 20
            },
            {
                id: 25,
                firstName: 'Trujillo',
                lastName: 'Mejia',
                username: '@Valenzuela',
                email: 'trujillovalenzuela@comtours.com',
                age: 16
            },
            {
                id: 26,
                firstName: 'Pruitt',
                lastName: 'Shepard',
                username: '@Sloan',
                email: 'pruittsloan@comtours.com',
                age: 44
            },
            {
                id: 27,
                firstName: 'Sutton',
                lastName: 'Ortega',
                username: '@Black',
                email: 'suttonblack@comtours.com',
                age: 42
            },
            {
                id: 28,
                firstName: 'Marion',
                lastName: 'Heath',
                username: '@Espinoza',
                email: 'marionespinoza@comtours.com',
                age: 47
            },
            {
                id: 29,
                firstName: 'Newman',
                lastName: 'Hicks',
                username: '@Keith',
                email: 'newmankeith@comtours.com',
                age: 15
            },
            {
                id: 30,
                firstName: 'Boyle',
                lastName: 'Larson',
                username: '@Summers',
                email: 'boylesummers@comtours.com',
                age: 32
            },
            {
                id: 31,
                firstName: 'Haynes',
                lastName: 'Vinson',
                username: '@Mckenzie',
                email: 'haynesmckenzie@comtours.com',
                age: 15
            },
            {
                id: 32,
                firstName: 'Miller',
                lastName: 'Acosta',
                username: '@Young',
                email: 'milleryoung@comtours.com',
                age: 55
            },
            {
                id: 33,
                firstName: 'Johnston',
                lastName: 'Brown',
                username: '@Knight',
                email: 'johnstonknight@comtours.com',
                age: 29
            },
            {
                id: 34,
                firstName: 'Lena',
                lastName: 'Pitts',
                username: '@Forbes',
                email: 'lenaforbes@comtours.com',
                age: 25
            },
            {
                id: 35,
                firstName: 'Terrie',
                lastName: 'Kennedy',
                username: '@Branch',
                email: 'terriebranch@comtours.com',
                age: 37
            },
            {
                id: 36,
                firstName: 'Louise',
                lastName: 'Aguirre',
                username: '@Kirby',
                email: 'louisekirby@comtours.com',
                age: 44
            },
            {
                id: 37,
                firstName: 'David',
                lastName: 'Patton',
                username: '@Sanders',
                email: 'davidsanders@comtours.com',
                age: 26
            },
            {
                id: 38,
                firstName: 'Holden',
                lastName: 'Barlow',
                username: '@Mckinney',
                email: 'holdenmckinney@comtours.com',
                age: 11
            },
            {
                id: 39,
                firstName: 'Baker',
                lastName: 'Rivera',
                username: '@Montoya',
                email: 'bakermontoya@comtours.com',
                age: 47
            },
            {
                id: 40,
                firstName: 'Belinda',
                lastName: 'Lloyd',
                username: '@Calderon',
                email: 'belindacalderon@comtours.com',
                age: 21
            },
            {
                id: 41,
                firstName: 'Pearson',
                lastName: 'Patrick',
                username: '@Clements',
                email: 'pearsonclements@comtours.com',
                age: 42
            },
            {
                id: 42,
                firstName: 'Alyce',
                lastName: 'Mckee',
                username: '@Daugherty',
                email: 'alycedaugherty@comtours.com',
                age: 55
            },
            {
                id: 43,
                firstName: 'Valencia',
                lastName: 'Spence',
                username: '@Olsen',
                email: 'valenciaolsen@comtours.com',
                age: 20
            },
            {
                id: 44,
                firstName: 'Leach',
                lastName: 'Holcomb',
                username: '@Humphrey',
                email: 'leachhumphrey@comtours.com',
                age: 28
            },
            {
                id: 45,
                firstName: 'Moss',
                lastName: 'Baxter',
                username: '@Fitzpatrick',
                email: 'mossfitzpatrick@comtours.com',
                age: 51
            },
            {
                id: 46,
                firstName: 'Jeanne',
                lastName: 'Cooke',
                username: '@Ward',
                email: 'jeanneward@comtours.com',
                age: 59
            },
            {
                id: 47,
                firstName: 'Wilma',
                lastName: 'Briggs',
                username: '@Kidd',
                email: 'wilmakidd@comtours.com',
                age: 53
            },
            {
                id: 48,
                firstName: 'Beatrice',
                lastName: 'Perry',
                username: '@Gilbert',
                email: 'beatricegilbert@comtours.com',
                age: 39
            },
            {
                id: 49,
                firstName: 'Whitaker',
                lastName: 'Hyde',
                username: '@Mcdonald',
                email: 'whitakermcdonald@comtours.com',
                age: 35
            },
            {
                id: 50,
                firstName: 'Rebekah',
                lastName: 'Duran',
                username: '@Gross',
                email: 'rebekahgross@comtours.com',
                age: 40
            },
            {
                id: 51,
                firstName: 'Earline',
                lastName: 'Mayer',
                username: '@Woodward',
                email: 'earlinewoodward@comtours.com',
                age: 52
            },
            {
                id: 52,
                firstName: 'Moran',
                lastName: 'Baxter',
                username: '@Johns',
                email: 'moranjohns@comtours.com',
                age: 20
            },
            {
                id: 53,
                firstName: 'Nanette',
                lastName: 'Hubbard',
                username: '@Cooke',
                email: 'nanettecooke@comtours.com',
                age: 55
            },
            {
                id: 54,
                firstName: 'Dalton',
                lastName: 'Walker',
                username: '@Hendricks',
                email: 'daltonhendricks@comtours.com',
                age: 25
            },
            {
                id: 55,
                firstName: 'Bennett',
                lastName: 'Blake',
                username: '@Pena',
                email: 'bennettpena@comtours.com',
                age: 13
            },
            {
                id: 56,
                firstName: 'Kellie',
                lastName: 'Horton',
                username: '@Weiss',
                email: 'kellieweiss@comtours.com',
                age: 48
            },
            {
                id: 57,
                firstName: 'Hobbs',
                lastName: 'Talley',
                username: '@Sanford',
                email: 'hobbssanford@comtours.com',
                age: 28
            },
            {
                id: 58,
                firstName: 'Mcguire',
                lastName: 'Donaldson',
                username: '@Roman',
                email: 'mcguireroman@comtours.com',
                age: 38
            },
            {
                id: 59,
                firstName: 'Rodriquez',
                lastName: 'Saunders',
                username: '@Harper',
                email: 'rodriquezharper@comtours.com',
                age: 20
            },
            {
                id: 60,
                firstName: 'Lou',
                lastName: 'Conner',
                username: '@Sanchez',
                email: 'lousanchez@comtours.com',
                age: 16
            }
        ];
        this.peopleTableData = [
            {
                id: 1,
                firstName: 'Mark',
                lastName: 'Otto',
                username: '@mdo',
                email: 'mdo@gmail.com',
                age: '28',
                status: 'info'
            },
            {
                id: 2,
                firstName: 'Jacob',
                lastName: 'Thornton',
                username: '@fat',
                email: 'fat@yandex.ru',
                age: '45',
                status: 'primary'
            },
            {
                id: 3,
                firstName: 'Larry',
                lastName: 'Bird',
                username: '@twitter',
                email: 'twitter@outlook.com',
                age: '18',
                status: 'success'
            },
            {
                id: 4,
                firstName: 'John',
                lastName: 'Snow',
                username: '@snow',
                email: 'snow@gmail.com',
                age: '20',
                status: 'danger'
            },
            {
                id: 5,
                firstName: 'Jack',
                lastName: 'Sparrow',
                username: '@jack',
                email: 'jack@yandex.ru',
                age: '30',
                status: 'warning'
            }
        ];
        this.metricsTableData = [
            {
                image: 'app/browsers/chrome.svg',
                browser: 'Google Chrome',
                visits: '10,392',
                isVisitsUp: true,
                purchases: '4,214',
                isPurchasesUp: true,
                percent: '45%',
                isPercentUp: true
            },
            {
                image: 'app/browsers/firefox.svg',
                browser: 'Mozilla Firefox',
                visits: '7,873',
                isVisitsUp: true,
                purchases: '3,031',
                isPurchasesUp: false,
                percent: '28%',
                isPercentUp: true
            },
            {
                image: 'app/browsers/ie.svg',
                browser: 'Internet Explorer',
                visits: '5,890',
                isVisitsUp: false,
                purchases: '2,102',
                isPurchasesUp: false,
                percent: '17%',
                isPercentUp: false
            },
            {
                image: 'app/browsers/safari.svg',
                browser: 'Safari',
                visits: '4,001',
                isVisitsUp: false,
                purchases: '1,001',
                isPurchasesUp: false,
                percent: '14%',
                isPercentUp: true
            },
            {
                image: 'app/browsers/opera.svg',
                browser: 'Opera',
                visits: '1,833',
                isVisitsUp: true,
                purchases: '83',
                isPurchasesUp: true,
                percent: '5%',
                isPercentUp: false
            }
        ];
        this.users = [
            {
                id: 1,
                name: 'Esther Vang',
                status: 4,
                group: 3
            },
            {
                id: 2,
                name: 'Leah Freeman',
                status: 3,
                group: 1
            },
            {
                id: 3,
                name: 'Mathews Simpson',
                status: 3,
                group: 2
            },
            {
                id: 4,
                name: 'Buckley Hopkins',
                group: 4
            },
            {
                id: 5,
                name: 'Buckley Schwartz',
                status: 1,
                group: 1
            },
            {
                id: 6,
                name: 'Mathews Hopkins',
                status: 4,
                group: 2
            },
            {
                id: 7,
                name: 'Leah Vang',
                status: 4,
                group: 1
            },
            {
                id: 8,
                name: 'Vang Schwartz',
                status: 4,
                group: 2
            },
            {
                id: 9,
                name: 'Hopkin Esther',
                status: 1,
                group: 2
            },
            {
                id: 10,
                name: 'Mathews Schwartz',
                status: 1,
                group: 3
            }
        ];
        this.statuses = [
            { value: 1, text: 'Good' },
            { value: 2, text: 'Awesome' },
            { value: 3, text: 'Excellent' },
        ];
        this.groups = [
            { id: 1, text: 'user' },
            { id: 2, text: 'customer' },
            { id: 3, text: 'vip' },
            { id: 4, text: 'admin' }
        ];
        this.editableTableData = this.smartTableData.slice(0, 36);
    }
    BasicTablesService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], BasicTablesService);
    return BasicTablesService;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/borderedTable/borderedTable.component.ts":
/*!**************************************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/borderedTable/borderedTable.component.ts ***!
  \**************************************************************************************************************/
/*! exports provided: BorderedTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BorderedTableComponent", function() { return BorderedTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _basicTables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basicTables.service */ "./src/app/pages/demo/tables/components/basicTables/basicTables.service.ts");



var BorderedTableComponent = /** @class */ (function () {
    function BorderedTableComponent(basicTablesService) {
        this.basicTablesService = basicTablesService;
        this.metricsTableData = basicTablesService.metricsTableData;
    }
    BorderedTableComponent.ctorParameters = function () { return [
        { type: _basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"] }
    ]; };
    BorderedTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'box-bordered-table',
            template: __webpack_require__(/*! raw-loader!./borderedTable.html */ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/borderedTable/borderedTable.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"]])
    ], BorderedTableComponent);
    return BorderedTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/borderedTable/index.ts":
/*!********************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/borderedTable/index.ts ***!
  \********************************************************************************************/
/*! exports provided: BorderedTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _borderedTable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./borderedTable.component */ "./src/app/pages/demo/tables/components/basicTables/components/borderedTable/borderedTable.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BorderedTableComponent", function() { return _borderedTable_component__WEBPACK_IMPORTED_MODULE_0__["BorderedTableComponent"]; });




/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/condensedTable/condensedTable.component.ts":
/*!****************************************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/condensedTable/condensedTable.component.ts ***!
  \****************************************************************************************************************/
/*! exports provided: CondensedTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CondensedTableComponent", function() { return CondensedTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _basicTables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basicTables.service */ "./src/app/pages/demo/tables/components/basicTables/basicTables.service.ts");



var CondensedTableComponent = /** @class */ (function () {
    function CondensedTableComponent(basicTablesService) {
        this.basicTablesService = basicTablesService;
        this.peopleTableData = basicTablesService.peopleTableData;
    }
    CondensedTableComponent.ctorParameters = function () { return [
        { type: _basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"] }
    ]; };
    CondensedTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'box-condensed-table',
            template: __webpack_require__(/*! raw-loader!./condensedTable.html */ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/condensedTable/condensedTable.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"]])
    ], CondensedTableComponent);
    return CondensedTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/condensedTable/index.ts":
/*!*********************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/condensedTable/index.ts ***!
  \*********************************************************************************************/
/*! exports provided: CondensedTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _condensedTable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./condensedTable.component */ "./src/app/pages/demo/tables/components/basicTables/components/condensedTable/condensedTable.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "CondensedTableComponent", function() { return _condensedTable_component__WEBPACK_IMPORTED_MODULE_0__["CondensedTableComponent"]; });




/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/contextualTable/contextualTable.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/contextualTable/contextualTable.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: ContextualTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContextualTableComponent", function() { return ContextualTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ContextualTableComponent = /** @class */ (function () {
    function ContextualTableComponent() {
    }
    ContextualTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'box-contextual-table',
            template: __webpack_require__(/*! raw-loader!./contextualTable.html */ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/contextualTable/contextualTable.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ContextualTableComponent);
    return ContextualTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/contextualTable/index.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/contextualTable/index.ts ***!
  \**********************************************************************************************/
/*! exports provided: ContextualTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _contextualTable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./contextualTable.component */ "./src/app/pages/demo/tables/components/basicTables/components/contextualTable/contextualTable.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ContextualTableComponent", function() { return _contextualTable_component__WEBPACK_IMPORTED_MODULE_0__["ContextualTableComponent"]; });




/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/hoverTable/hoverTable.component.ts":
/*!********************************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/hoverTable/hoverTable.component.ts ***!
  \********************************************************************************************************/
/*! exports provided: HoverTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HoverTableComponent", function() { return HoverTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _basicTables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basicTables.service */ "./src/app/pages/demo/tables/components/basicTables/basicTables.service.ts");



var HoverTableComponent = /** @class */ (function () {
    function HoverTableComponent(basicTablesService) {
        this.basicTablesService = basicTablesService;
        this.metricsTableData = basicTablesService.metricsTableData;
    }
    HoverTableComponent.ctorParameters = function () { return [
        { type: _basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"] }
    ]; };
    HoverTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'box-hover-table',
            template: __webpack_require__(/*! raw-loader!./hoverTable.html */ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/hoverTable/hoverTable.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"]])
    ], HoverTableComponent);
    return HoverTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/hoverTable/index.ts":
/*!*****************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/hoverTable/index.ts ***!
  \*****************************************************************************************/
/*! exports provided: HoverTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hoverTable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hoverTable.component */ "./src/app/pages/demo/tables/components/basicTables/components/hoverTable/hoverTable.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "HoverTableComponent", function() { return _hoverTable_component__WEBPACK_IMPORTED_MODULE_0__["HoverTableComponent"]; });




/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/index.ts":
/*!**********************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/index.ts ***!
  \**********************************************************************************************/
/*! exports provided: ResponsiveTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _responsiveTable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./responsiveTable.component */ "./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/responsiveTable.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "ResponsiveTableComponent", function() { return _responsiveTable_component__WEBPACK_IMPORTED_MODULE_0__["ResponsiveTableComponent"]; });




/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/responsiveTable.component.ts":
/*!******************************************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/responsiveTable.component.ts ***!
  \******************************************************************************************************************/
/*! exports provided: ResponsiveTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ResponsiveTableComponent", function() { return ResponsiveTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var ResponsiveTableComponent = /** @class */ (function () {
    function ResponsiveTableComponent() {
    }
    ResponsiveTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'box-responsive-table',
            template: __webpack_require__(/*! raw-loader!./responsiveTable.html */ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/responsiveTable.html"),
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], ResponsiveTableComponent);
    return ResponsiveTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/stripedTable/index.ts":
/*!*******************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/stripedTable/index.ts ***!
  \*******************************************************************************************/
/*! exports provided: StripedTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _stripedTable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./stripedTable.component */ "./src/app/pages/demo/tables/components/basicTables/components/stripedTable/stripedTable.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "StripedTableComponent", function() { return _stripedTable_component__WEBPACK_IMPORTED_MODULE_0__["StripedTableComponent"]; });




/***/ }),

/***/ "./src/app/pages/demo/tables/components/basicTables/components/stripedTable/stripedTable.component.ts":
/*!************************************************************************************************************!*\
  !*** ./src/app/pages/demo/tables/components/basicTables/components/stripedTable/stripedTable.component.ts ***!
  \************************************************************************************************************/
/*! exports provided: StripedTableComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StripedTableComponent", function() { return StripedTableComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _basicTables_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../basicTables.service */ "./src/app/pages/demo/tables/components/basicTables/basicTables.service.ts");



var StripedTableComponent = /** @class */ (function () {
    function StripedTableComponent(basicTablesService) {
        this.basicTablesService = basicTablesService;
        this.smartTableData = basicTablesService.smartTableData;
    }
    StripedTableComponent.ctorParameters = function () { return [
        { type: _basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"] }
    ]; };
    StripedTableComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'box-striped-table',
            template: __webpack_require__(/*! raw-loader!./stripedTable.html */ "./node_modules/raw-loader/index.js!./src/app/pages/demo/tables/components/basicTables/components/stripedTable/stripedTable.html")
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_basicTables_service__WEBPACK_IMPORTED_MODULE_2__["BasicTablesService"]])
    ], StripedTableComponent);
    return StripedTableComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/tables.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/pages/demo/tables/tables.component.ts ***!
  \*******************************************************/
/*! exports provided: TablesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TablesComponent", function() { return TablesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/**
 * @file Demo 表格演示页面
 * @module app/page/demo/component/tables
 * @author Surmon <https://github.com/surmon-china>
 */


var TablesComponent = /** @class */ (function () {
    function TablesComponent() {
    }
    TablesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'page-tables',
            template: "<router-outlet></router-outlet>"
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], TablesComponent);
    return TablesComponent;
}());



/***/ }),

/***/ "./src/app/pages/demo/tables/tables.module.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/demo/tables/tables.module.ts ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _app_sa_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/app/sa.module */ "./src/app/sa.module.ts");
/* harmony import */ var _tables_routing__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tables.routing */ "./src/app/pages/demo/tables/tables.routing.ts");
/* harmony import */ var _tables_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tables.component */ "./src/app/pages/demo/tables/tables.component.ts");
/* harmony import */ var _components_basicTables_basicTables_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/basicTables/basicTables.component */ "./src/app/pages/demo/tables/components/basicTables/basicTables.component.ts");
/* harmony import */ var _components_basicTables_components_responsiveTable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/basicTables/components/responsiveTable */ "./src/app/pages/demo/tables/components/basicTables/components/responsiveTable/index.ts");
/* harmony import */ var _components_basicTables_components_stripedTable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/basicTables/components/stripedTable */ "./src/app/pages/demo/tables/components/basicTables/components/stripedTable/index.ts");
/* harmony import */ var _components_basicTables_components_borderedTable__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/basicTables/components/borderedTable */ "./src/app/pages/demo/tables/components/basicTables/components/borderedTable/index.ts");
/* harmony import */ var _components_basicTables_components_hoverTable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/basicTables/components/hoverTable */ "./src/app/pages/demo/tables/components/basicTables/components/hoverTable/index.ts");
/* harmony import */ var _components_basicTables_components_condensedTable__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/basicTables/components/condensedTable */ "./src/app/pages/demo/tables/components/basicTables/components/condensedTable/index.ts");
/* harmony import */ var _components_basicTables_components_contextualTable__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/basicTables/components/contextualTable */ "./src/app/pages/demo/tables/components/basicTables/components/contextualTable/index.ts");
/* harmony import */ var _components_basicTables_basicTables_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/basicTables/basicTables.service */ "./src/app/pages/demo/tables/components/basicTables/basicTables.service.ts");















var TablesModule = /** @class */ (function () {
    function TablesModule() {
    }
    TablesModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                _app_sa_module__WEBPACK_IMPORTED_MODULE_4__["SaModule"],
                _tables_routing__WEBPACK_IMPORTED_MODULE_5__["routing"]
            ],
            declarations: [
                _tables_component__WEBPACK_IMPORTED_MODULE_6__["TablesComponent"],
                _components_basicTables_basicTables_component__WEBPACK_IMPORTED_MODULE_7__["BasicTablesComponent"],
                _components_basicTables_components_hoverTable__WEBPACK_IMPORTED_MODULE_11__["HoverTableComponent"],
                _components_basicTables_components_borderedTable__WEBPACK_IMPORTED_MODULE_10__["BorderedTableComponent"],
                _components_basicTables_components_condensedTable__WEBPACK_IMPORTED_MODULE_12__["CondensedTableComponent"],
                _components_basicTables_components_stripedTable__WEBPACK_IMPORTED_MODULE_9__["StripedTableComponent"],
                _components_basicTables_components_contextualTable__WEBPACK_IMPORTED_MODULE_13__["ContextualTableComponent"],
                _components_basicTables_components_responsiveTable__WEBPACK_IMPORTED_MODULE_8__["ResponsiveTableComponent"]
            ],
            providers: [
                _components_basicTables_basicTables_service__WEBPACK_IMPORTED_MODULE_14__["BasicTablesService"],
            ]
        })
    ], TablesModule);
    return TablesModule;
}());
/* harmony default export */ __webpack_exports__["default"] = (TablesModule);


/***/ }),

/***/ "./src/app/pages/demo/tables/tables.routing.ts":
/*!*****************************************************!*\
  !*** ./src/app/pages/demo/tables/tables.routing.ts ***!
  \*****************************************************/
/*! exports provided: routing */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "routing", function() { return routing; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _tables_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tables.component */ "./src/app/pages/demo/tables/tables.component.ts");
/* harmony import */ var _components_basicTables_basicTables_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/basicTables/basicTables.component */ "./src/app/pages/demo/tables/components/basicTables/basicTables.component.ts");



var routes = [
    {
        path: '',
        component: _tables_component__WEBPACK_IMPORTED_MODULE_1__["TablesComponent"],
        children: [
            { path: 'basictables', component: _components_basicTables_basicTables_component__WEBPACK_IMPORTED_MODULE_2__["BasicTablesComponent"] },
        ]
    }
];
var routing = _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forChild(routes);


/***/ })

}]);
//# sourceMappingURL=demo-tables-tables-module-es5.js.map