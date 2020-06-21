'use strict';

const Controller = require('egg').Controller;

class SharingLogController extends Controller {

  // 查询
  async query (ctx) {
    const query = ctx.request.body
    // 访问数据库表查询所有项
    var res = await ctx.model.SharingLog.find(query)
    ctx.body = res

  }

  // 获取单个详情
  async getPlayerById(ctx) {
    // const query = ctx.query
    var res = await ctx.model.SharingLog.findOne({_id: ctx.params.id})
    ctx.body = res
  }

  // 添加
  async add(ctx) {
    const reqBody = ctx.request.body
    let res = await ctx.model.SharingLog.create(reqBody)
    ctx.body = res
  }

  async update(ctx){
    const reqBody = ctx.request.body
    let res = await ctx.model.SharingLog.update({_id: ctx.params.id}, reqBody)
    ctx.body = res
  }

  // 删除
  async remove(ctx) {
    const query = ctx.request.body
    ctx.body = await ctx.model.SharingLog.remove({_id: query.id})
  }

}

module.exports = SharingLogController;
