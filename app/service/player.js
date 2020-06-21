'use strict';

const Service = require('egg').Service;

class PlayerService extends Service {
  async reviseExp() {
    const result = await this.ctx.model.Player.aggregate([
      {
        $lookup:{// 左连接
          from:"sharinglogs", // 关联到sharinglogs表
          localField:"username", // players 表关联的字段
          foreignField:"presenter", // sharinglogs 表关联的字段
          as:"sharinglogs"
        }
      },{
        $unwind:{ // 拆分子数组
          path:"$sharinglogs",
          preserveNullAndEmptyArrays: true // 空的数组也拆分
        }
      },{
        $group:{ // 分组求和并返回
          _id: "$_id", // 分组查询
          name: {$first: "$name"},
          username:{ $first: "$username"},
          totalExp: {$sum: "$sharinglogs.score"}
        }
      }
    ])
    return result
  }
}

module.exports = PlayerService