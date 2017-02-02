const devApi = '/api';
const prodApi = 'http://api.surmon.me';
const staticApi = 'http://static.surmon.me';

export const API_ROOT = (function(){ try { if(process) { return devApi } else { return prodApi }} catch(err) { return prodApi }})();
export const STATIC_URL = staticApi;
