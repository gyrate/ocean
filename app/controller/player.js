'use strict';

const Controller = require('egg').Controller;

class PlayerController extends Controller {
  async getData () {
    const { ctx } = this;

    await ctx.model.Player.create({
      name: "haha" + parseInt(Math.random() * 10000),
      currExp: 210
    }, (res)=> {
      //console.log('insert completed')
    })

    // 访问数据库表查询所有项
    var res = await ctx.model.Player.find({}, (e)=> {
      console.log(e)
    })
    ctx.body = res
  }
}

module.exports = PlayerController;
