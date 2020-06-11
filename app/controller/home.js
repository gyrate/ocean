'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async server() {
    const { ctx } = this;
    // home/index.js 对应 webpack entry 的 home/index, 构建后文件存在 app/view 目录
    await ctx.render('home/home.js', { message: 'egg vue server side render' });
  }

  async client() {
    const { ctx } = this
    const locals = {
      seo: { keyword: 'Egg,Vue,SSR', description: 'Egg Vue SSR Development'},
      message: 'egg vue server side render',
      data: [1,2,3,4,5]
    }

    // renderClient 前端渲染，Node层只做 layout.html和资源依赖组装，渲染交给前端渲染。与服务端渲染的差别你可以通过查看运行后页面源代码即可明白两者之间的差异
    await ctx.renderClient('home/home.js', locals);
  }

}

module.exports = HomeController;
