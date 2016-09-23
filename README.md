### Demo

<a target="_blank" href="http://akveo.com/ng2-admin/">Live Demo</a>


## Documentation
Installation, customization and other useful articles: https://akveo.github.io/ng2-admin/

## Based on
Angular 2, Bootstrap 4, Webpack and lots of awesome modules and plugins


## Features
* TypeScript
* Webpack
* Responsive layout
* High resolution
* Bootstrap 4 CSS Framework
* Sass
* Angular 2
* jQuery
* Charts (Chartist, Chart.js)
* Maps (Google, Leaflet, amMap)
* and many more!

### Dir
np-admin/
   ├──config/                    * build configuration
   │   ├──helpers.js             * helper functions for our configuration files
   │   ├──webpack.dev.js         * development webpack config
   │   ├──webpack.prod.js        * production webpack config
   │   └──webpack.test.js        * testing webpack config
   │
   ├──src/                       * source files that will be compiled to javascript
   │   ├──main.browser.ts        * entry file for our browser environment
   │   │
   │   ├──index.html             * application layout
   │   │
   │   ├──polyfills.ts           * polyfills file
   │   │
   │   ├──vendor.ts              * vendors file
   │   │
   │   ├──custom-typings.d.ts    * custom typings for third-party modules
   │   │
   │   ├──platform/              * platform dependent imports
   │   │
   │   ├──app/                   * application code - our working directory
   │   │   │
   │   │   ├──app.component.ts   * main application component
   │   │   │
   │   │   ├──app.loader.ts      * requires initial css styles (most important for application loading stage)
   │   │   │
   │   │   ├──app.routes.ts      * application routes and menu configuration
   │   │   │
   │   │   ├──app.state.ts       * global application state for data exchange between components
   │   │   │
   │   │   ├──app.scss           * application styles 
   │   │   │
   │   │   ├──pages/             * application pages components, place where you can create pages and fill them with components
   │   │   │
   │   │   └──theme/             * template global components/directives/pipes and styles
   │   │
   │   └──assets/                * static assets are served here
   │
   │
   ├──tslint.json                * typescript lint config
   ├──typedoc.json               * typescript documentation generator
   ├──tsconfig.json              * config that webpack uses for typescript
   └──package.json               * what npm uses to manage it's dependencies
