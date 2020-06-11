import Home from './home.vue';
import serverRender from '../../framework/vue/entry/server.js';
import clientRender from '../../framework/vue/entry/client.js';

export default EASY_ENV_IS_NODE ? serverRender({ ...Home }) : clientRender({ ...Home });
