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
  router.get('/player/:id', controller.player.getDetailById)
  router.post('/player/add',controller.player.add)
  router.post('/player/update/:id',controller.player.update)
  router.post('/player/batchadd',controller.player.batchAdd)
  router.post('/player/remove', controller.player.remove)
  router.post('/player/batchremove', controller.player.batchRemove)
  router.post('/player/revise_exp', controller.player.reviseExp)
  router.post('/player/revise_exp2', controller.player.reviseExp2)

  //经验值
  //用RESTful 风格定义路由
  //如果不需要其中的某几个方法，可以不用在exp_log.js 里面实现，这对应URL路径也不会注册到 Router。
  // GET	/posts	posts	app.controllers.posts.index
  // GET	/posts/new	new_post	app.controllers.posts.new
  // GET	/posts/:id	post	app.controllers.posts.show
  // GET	/posts/:id/edit	edit_post	app.controllers.posts.edit
  // POST	/posts	posts	app.controllers.posts.create
  // PUT	/posts/:id	post	app.controllers.posts.update
  // DELETE	/posts/:id	post	app.controllers.posts.destroy
  router.resources('explog', '/explog', controller.expLog);

  // 分享会记录
  router.get('/sharing_log/query',controller.sharingLog.query)
  router.post('/sharing_log/add',controller.sharingLog.add)
};
