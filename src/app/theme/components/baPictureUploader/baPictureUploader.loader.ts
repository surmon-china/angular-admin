const moxie = require('plupload/js/moxie.js');
if(!(<any>window).mOxie) {
  (<any>window).mOxie = {
    Env: moxie.core.utils.Env,
    XMLHttpRequest: moxie.xhr.XMLHttpRequest
  };
};
(<any>window).plupload = require('plupload/js/plupload.dev.js');
require('qiniu-js/dist/qiniu.js');