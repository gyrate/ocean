'use strict';

const Controller = require('egg').Controller;

class ExpLogController extends Controller {

  // 查询
  async query (ctx) {
    const query = ctx.request.body
    // 访问数据库表查询所有项
    var res = await ctx.model.ExpLog.find(query)
    ctx.body = res

  }

  // 添加
  async add(ctx) {
    const reqBody = ctx.request.body
    let res = await ctx.model.ExpLog.create(reqBody)
    ctx.body = res
  }

  //更新
  async update(ctx){
    const reqBody = ctx.request.body
    let res = await ctx.model.ExpLog.update({_id: ctx.params.id}, reqBody)
    ctx.body = res
  }

  // 删除
  async remove(ctx) {
    const query = ctx.request.body
    ctx.body = await ctx.model.ExpLog.remove({_id: query.id})
  }

  // 批量删除
  async batchRemove(ctx) {
    const query = ctx.request.body
    let res = await ctx.model.ExpLog.remove({_id: {$in: query.ids}})
    ctx.body = res
  }

}

module.exports = ExpLogController;
