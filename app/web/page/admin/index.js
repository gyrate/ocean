// 版本一
// import Home from './index.vue';
// import serverRender from '../../framework/vue/entry/server.js';
// import clientRender from '../../framework/vue/entry/client.js';
//
// export default EASY_ENV_IS_NODE ? serverRender({ ...Home }) : clientRender({ ...Home });

import App from 'framework/app';
import createI18n from 'framework/i18n/admin';
import createStore from './store';
import createRouter from './router';
import index from './index.vue';

new App({ index, createI18n, createRouter, createStore }).bootstrap();

