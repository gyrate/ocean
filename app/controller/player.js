'use strict';

const Controller = require('egg').Controller;

class PlayerController extends Controller {

  async query () {
    const { ctx } = this
    // 访问数据库表查询所有项
    var res = await ctx.model.Player.find({})
    ctx.body = res

    // ctx.body = await ctx.renderView('player.tpl' , {data: res})
  }
  async add() {
    const {ctx} = this

    let res = await ctx.model.Player.create({
      name: "haha" + parseInt(Math.random() * 10000),
      currExp: 210
    })

    //返回操作结果
    ctx.body = res
  }

  async remove(id) {
    if (!id) {
      return
    }
    const { ctx } = this
    await ctx.model.Player.remove({_id: id}, e=> {
      console.log('remove completed')
    })
  }

  async update(id, newItem){
    if(!id || !newItem){
      return
    }
    const { ctx } = this
    await ctx.model.Player.update({_id:id}, newItem, e=>{
      console.log('update completed')
    })
  }

  // 批量覆盖数据
  async cover(newItems) {
    const { ctx } = this
    for (let i = 0; i < newItems.length; i++) {
      //逐一覆盖
      await ctx.model.Player.update({userName: newItems[i].userName}, newItems[i], false, true)
    }

  }

}

module.exports = PlayerController;
