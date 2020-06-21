<template>
    <div>
        <div class="search">
            <!--<el-row class="clear">-->
                <!--<label>玩家姓名:</label>-->
                <!--<el-input class="search-input" clearable v-model="q.name"  placeholder="关键字" size="small"></el-input>-->
                <!--</el-select>-->
                <!--<el-button class="search-button" type="primary" @click="query()" size="small">查询</el-button>-->
            <!--</el-row>-->
        </div>

        <div class="button-group">
            <el-button type="success" size="small" @click="addLog">新增分享记录</el-button>
        </div>

        <el-table
                ref="playerTable"
                :data="dataList"
                v-loading="loading"
                element-loading-text="拼命加载中"
                border
                style="width: 99.5%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column prop="title" label="分享主题">
            </el-table-column>
            <el-table-column prop="presenter" label="分享人">
            </el-table-column>
            <el-table-column prop="score" label="分享得分">
            </el-table-column>
            <el-table-column prop="time" label="时间">
            </el-table-column>

            <!--<el-table-column-->
                    <!--label="操作"-->
                    <!--width="180">-->
                <!--<template slot-scope="props">-->
                    <!--<router-link :to="{params: {id: props.row.id}}" tag="span">-->
                        <!--<el-button type="info" size="small" icon="edit" @click="handleEdit(props.$index, props.row)">修改</el-button>-->
                    <!--</router-link>-->
                    <!--<el-button type="danger" size="small" icon="delete" @click="handleDelete(props.$index, props.row)">删除</el-button>-->
                <!--</template>-->
            <!--</el-table-column>-->
        </el-table>

        <div style="padding: 1em 0;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="filter.pageIndex"
                    :page-sizes="[10, 15, 20, 50]"
                    :page-size="filter.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

    </div>
</template>
<script >
  import request from '../../../../framework/network/request'
  export default{
    name: 'player',
    component: {},
    data(){
      return {
        filter: {
          pageIndex: 1,
          pageSize: 10
        },
        total: 100,
        //请求时的loading效果
        loading: false,
        dataList: [],
      }
    },
    mounted(){
      this.getData()
    },
    methods:{
      addLog(){

        const form ={
          title: '老广带你认识广州',
          time: '2020-06-20 20:00:00',
          score: 12,
          presenter: 'zhanglinhai'
        }

        request.post('/sharing_log/add', form).then(res => {
          this.$message({message: '添加记录成功', type: 'success'})
          this.getData()
        })

      },
      getData(){
        request.get('/sharing_log/query').then(res=>{
          this.dataList = res.data.data
        })
      },
      handleSizeChange(){

      },
      handleCurrentChange(){

      }
    }

  }
</script>
