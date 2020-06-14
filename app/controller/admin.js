'use strict';
const Controller = require('egg').Controller;
class HomeController extends Controller {

  // SSR渲染，暂时没用到
  async server() {
    const { ctx } = this;
    // home/index.js 对应 webpack entry 的 home/index, 构建后文件存在 app/view 目录 
    await ctx.render('admin.js', { message: 'egg vue server side render' });
  }

  // CSR渲染
  async client() {
    const { ctx } = this
    const locals = {
      seo: { keyword: 'Egg,Vue,SSR', description: 'Egg Vue SSR Development'},
      message: 'egg vue server side render',
      data: [1,2,3,4,5]
    }

    // renderClient 前端渲染，Node层只做 layout.html和资源依赖组装，渲染交给前端渲染。
    // 第一个参数必须与webpack.config.js 入口声明一致，比如这里如填写'admin.js'，则webpack.conf.js则为entry:{'admin': 'app/web/page/admin/index.js'} 
    await ctx.renderClient('admin.js', locals);
  }

}

module.exports = HomeController;
