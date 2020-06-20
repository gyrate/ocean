'use strict';

const Controller = require('egg').Controller;

class PlayerController extends Controller {

  // 查询
  async query (ctx) {
    const query = ctx.request.body
    // 访问数据库表查询所有项
    var res = await ctx.model.Player.find(query)
    ctx.body = res

  }

  // 获取单个玩家详情
  async getPlayerById(ctx) {
    // const query = ctx.query
    var res = await ctx.model.Player.findOne({_id: ctx.params.id})
    ctx.body = res
  }

  // 添加
  async add(ctx) {
    const reqBody = ctx.request.body
    let res = await ctx.model.Player.create(reqBody)
    ctx.body = res
  }

  async update(ctx){
    const reqBody = ctx.request.body
    // console.log(reqBody)
    // console.log(' ctx.params.id:' + ctx.params.id)
    let res = await ctx.model.Player.update({_id: ctx.params.id}, reqBody)
    ctx.body = res
  }

  // 删除
  async remove(ctx) {
    const query = ctx.request.body
    ctx.body = await ctx.model.Player.remove({_id: query.id})
  }

  // 批量添加
  async batchAdd(ctx) {

    //todo: 首先过滤掉ukName重复的数据
    const querys = ctx.request.body
    ctx.body = await ctx.model.Player.insertMany(querys)
  }

  // 批量删除
  async batchRemove(ctx) {
    const query = ctx.request.body
    let res = await ctx.model.Player.remove({_id: {$in: query.ids}})
    ctx.body = res
  }

}

module.exports = PlayerController;
