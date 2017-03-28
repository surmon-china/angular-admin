
const devApi = '/api';
const prodApi = 'https://api.surmon.me';
const staticApi = 'https://static.surmon.me';

let exportApi

if ('production' === ENV) {
  exportApi = prodApi
} else {
	exportApi = devApi
}

export const API_ROOT = exportApi;
export const STATIC_URL = staticApi;
