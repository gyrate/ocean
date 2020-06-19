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

  // 添加
  async add(ctx) {
    const reqBody = ctx.request.body
    let res = await ctx.model.Player.create({
      name: "haha" + parseInt(Math.random() * 10000),
      currExp: 210
    })

    //返回操作结果
    ctx.body = res
  }

  // 删除
  async remove(ctx) {
    const query = ctx.request.body
    ctx.body = await ctx.model.Player.remove({_id: query.id})
  }

  // 更新
  async update(id, newItem){
    if(!id || !newItem){
      return
    }
    const { ctx } = this
    await ctx.model.Player.update({_id:id}, newItem, e=>{
      console.log('update completed')
    })
  }

  // 批量添加
  async batchAdd(ctx) {

    //todo: 首先过滤掉ukName重复的数据
    const querys = ctx.request.body
    ctx.body = await ctx.model.Player.insertMany(querys)
  }

  // 批量删除
  async batchRemove(ctx){
    const query = ctx.request.body
    ctx.body = await ctx.model.Player.deleteMany(query, err => {
      console.log(err)
    })
  }

}

module.exports = PlayerController;
