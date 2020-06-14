'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 首页
  router.get('/', controller.admin.client)
  router.get('/admin', controller.admin.client)
  // router.get('/server', controller.home.server);

  // 排行榜
  router.get('/rank',controller.rank.index.index)

  // 玩家
  router.get('/player/query',controller.player.query)
  router.get('/player/add',controller.player.add)
  router.post('/player/remove', controller.player.remove)
};
