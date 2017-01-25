const moxie = require('plupload/js/moxie.js');
if(!global.mOxie) {
  global.mOxie = {
    Env: moxie.core.utils.Env,
    XMLHttpRequest: moxie.xhr.XMLHttpRequest
  };
};
global.plupload = require('plupload/js/plupload.dev.js');
require('qiniu-js/dist/qiniu.js');