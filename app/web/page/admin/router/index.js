import Vue from 'vue';
import VueRouter from 'vue-router';
import Dashboard from '../view/dashboard/index.vue';

Vue.use(VueRouter);

// bugfix:两次访问相同路由地址报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default function createRouter() {
  return new VueRouter({
    mode: 'hash',
    base: '/admin/',
    routes: [
      {
        path: '/',
        component: Dashboard
      },
      {
        path: '/player',
        component: () => import('../view/player/index')
      },
      {
        path: '/sharing_log',
        component: () => import('../view/sharing/index')
      }
    ]
  })
}