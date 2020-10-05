'use strict';

const Controller = require('egg').Controller;

class ExpLogController extends Controller {

  // 查询
  async index (ctx) {
    let query = ctx.request.query

    let pageNumber = parseInt(query.pageNumber || 1)
    let pageSize = parseInt(query.pageSize || 10)

    if (query.keyword) {
      // 多条件模糊查询
      let keyword = query.keyword.trim()
      query = {
        $or: [
          {username: {$regex: keyword}},
          {description: {$regex: keyword}}
        ]
      }
    } else {
      query = {}
    }

    var res = await ctx.model.ExpLog
      .find(query)
      .sort({'_id':-1})
      .limit(pageSize)
      .skip((pageNumber-1)*pageSize)

    //排序的写法
    //.find({},null, {sort: [['_id', -1]]})
    ////id中包含当前时间，也可以用.sort({'_id':-1})

    var total = await ctx.model.ExpLog.count(query)

    ctx.body = {
      dataList: res,
      total,
      pageNumber,
      pageSize
    }
  }

  // post添加
  async new(ctx){
    const req = ctx.request.query
    let res = await ctx.model.ExpLog.create(req)
    ctx.body = res
  }

  //查看详情
  async show(ctx){
    var res = await ctx.model.ExpLog.findOne({_id: ctx.params.id})
    ctx.body = res
  }

  //更新
  async update (ctx){
    const reqBody = ctx.request.body
    let res = await ctx.model.ExpLog.update({_id: ctx.params.id}, reqBody)
    ctx.body = res
  }

  // 删除
  async destroy (ctx) {
    const query = ctx.request.body
    ctx.body = await ctx.model.ExpLog.remove({_id: query.id})
  }

  // 批量添加
  async batchAdd(ctx) {
    const querys = ctx.request.body
    ctx.body = await ctx.model.ExpLog.insertMany(querys)
  }

  // 批量删除
  async batchRemove(ctx) {
    const query = ctx.request.body
    let res = await ctx.model.ExpLog.remove({_id: {$in: query.ids}})
    ctx.body = res
  }

}

module.exports = ExpLogController;
