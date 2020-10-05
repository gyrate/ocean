<template>
    <div>
        <div class="search">
            <el-row class="clear">
                <label>玩家姓名:</label>
                <el-input class="search-input" clearable v-model="filterData.keyword"  placeholder="关键字" size="small"></el-input>
                </el-select>
                <el-button class="search-button" type="primary" @click="query" size="small">查询</el-button>
            </el-row>
        </div>

        <div class="button-group">
            <el-button type="success" size="small" @click="addPlayer">新增记录</el-button>
            <el-button type="primary" size="small" @click="batchAdd">批量导入</el-button>
            <el-button type="primary" size="small" @click="batchRemove">批量删除</el-button>
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
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="name" label="玩家姓名">
            </el-table-column>
            <el-table-column prop="amount" label="获得经验值">
            </el-table-column>
            <el-table-column prop="description" label="描述">
            </el-table-column>

            <el-table-column
                    label="操作"
                    width="180">
                <template slot-scope="props">
                    <router-link :to="{params: {id: props.row.id}}" tag="span">
                        <el-button type="primary" size="small" icon="edit" @click="handleEdit(props.$index, props.row)">修改</el-button>
                    </router-link>
                    <el-button type="danger" size="small" icon="delete" @click="handleDelete(props.$index, props.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="padding: 1em 0;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="filterData.pageNumber"
                    :page-sizes="[10, 15, 20, 50]"
                    :page-size="filterData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>

        <el-dialog title="编辑记录" :visible.sync="editorVisible" width="500px">
            <div>
                <el-form ref="form" :model="form" label-width="100px" @keyup.enter.native="save">
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="获得经验值">
                        <el-input-number v-model="form.amount" :min="1"  ></el-input-number>
                    </el-form-item>
                    <el-form-item label="描述">
                        <el-input type="textarea" v-model="form.description" :rows="2" placeholder="输入获得经验值的相关活动或原因"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editorVisible = false">取 消</el-button>
                <el-button type="primary" @click="save">保 存</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script >
  import request from '../../../../framework/network/request'
  import serialize from '../../../../framework/utils/index'

  export default{
    name: 'player',
    component: {},
    data(){
      return {
        filterData: {
          keyword: '',
          pageNumber: 1,
          pageSize: 10
        },
        form:{
          username: '',
          from: '',
          amount: 0,
          description: ''
        },
        total: 100,
        //请求时的loading效果
        loading: false,
        dataList: [],
        editorVisible: false,
        mode: '', //add edit
        currExplogId: null
      }
    },
    computed: {

    },
    mounted(){
      this.getData()
    },
    methods: {
      getData() {
        request.get('/explog' + serialize(this.filterData)).then(res => {

          const {dataList, pageNumber, pageSize, total} = res.data.data

          this.dataList = dataList
          this.filterData.pageSize = pageSize
          this.filterData.pageNumber = pageNumber
          this.total = total
        })
      },
      query() {
        this.filterData.pageNumber = 1
        this.getData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.filterData.pageSize = val;
        this.getData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.filterData.pageNumber = val;
        this.getData()
      },
      handleEdit(index, row) {
        request.get(`/explog/${row._id}`).then(res => {
          Object.assign(this.form, res.data.data)

          this.mode = 'edit'
          this.currExplogId = row._id
          this.editorVisible = true
        })
      },
      resetForm(){
        this.form = {
          username: 'zhanglinhai',
          from: '',
          amount: 10,
          description: '每月任务'
        }
      },
      save(){

        if (this.mode == 'add') {
          request.get(`/explog/new` + serialize(this.form)).then(res => {
            this.getData()
            this.editorVisible = false
          })
        } else {
          request.post(`/explog/update/${this.currExplogId}`, this.form).then(res => {
            this.getData()
            this.editorVisible = false
          })
        }
      },
      addPlayer(){
        this.resetForm()
        this.editorVisible = true
        this.mode = 'add'
      },
      handleDelete(index, row) {

        request.post('explog/remove',{id: row._id}).then(res=>{
          this.$message(`删除${row.username}成功!`)
          this.getData()
        })
      },

      // 批量删除
      batchRemove(){
        let rows =  this.$refs['playerTable'].selection
        if(rows.length <= 0){
          this.$message({message: '请选择待删除对象',})
          return
        }

        let arr = rows.map(item => item['_id'])
        request.post('/explog/batchremove', {ids: arr}).then(res => {
          this.getData()
          this.$message({message: '批量删除成功', type: 'success'})
        })
      },

      batchAdd(){

        let querys = []

        for (let i = 0; i < 20; i++) {
          querys.push({
            username: 'zhanglinhai',
            from: '',
            amount: 10 + parseInt(Math.random() * 10),
            description: '每月任务'
          })
        }

        request.post('explog/batchadd', querys).then(res => {
          this.$message(`批量添加成功!`)
          this.getData()
        })
      },

      reviseExp() {
        request.post(`/player/revise_exp2`, {}).then(res => {
          this.$message(`同步数据结束!`)
          // this.getData()
        })
      }
    }
  }
</script>
