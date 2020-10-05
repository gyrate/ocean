<template>
  <div>
    <div class="search">
      <el-form :inline="true" :model="filterData" @keyup.enter.native="query">
        <el-form-item label="关键词搜索">
          <el-input v-model="filterData.name" placeholder="输入用户名或玩家姓名" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query" size="small">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div class="button-group">
      <el-button type="success" size="small" @click="addPlayer">新增玩家</el-button>
      <el-button type="primary" size="small" @click="batchAdd">导入数据</el-button>
      <el-button type="primary" size="small" @click="batchRemove">删除</el-button>
      <el-button type="primary" size="small" @click="updateExp">计算经验值</el-button>
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
      <el-table-column prop="role" label="角色">
      </el-table-column>
      <!--<el-table-column prop="level.exp_level" label="经验等级">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="level.skill_level" label="职业等级">-->
      <!--</el-table-column>-->
      <el-table-column prop="currExp" label="当前经验值">
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

    <el-dialog title="编辑玩家" :visible.sync="editPlayerVisible" width="500px">
      <div>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="玩家姓名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="角色">
            <el-input v-model="form.role"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editPlayerVisible = false">取 消</el-button>
        <el-button type="primary" @click="savePlayer">保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script >
  import request     from '../../../../framework/network/request'
  import serialize from '../../../../framework/utils/index'
  export default{
    name: 'player',
    component: {},
    data(){
      return {
        filterData: {
          name: '',
          pageNumber: 1,
          pageSize: 10
        },
        // 列表项总数
        total: 100,

        form:{
          username:'',
          name:'',
          role:'',
          currExp: 0,
          level:{
            exp_level: 0,
            skill_level: 0
          },
          exp:{
            sharing: 0
          }
        },

        //请求时的loading效果
        loading: false,

        dataList: [],

        editPlayerVisible: false,
        mode: '', //add edit
        currPlayerId: null
      }
    },
    computed: {
      status() {
        return [
          { status: undefined, name: "--请选择--" },
          { status: 1, name: "已发布" },
          { status: 2, name: "草稿" }
        ];
      },
      categories() {
        return [
          { categoryId: 0, name: "--请选择--" },
          { categoryId: 1, name: "Nodejs" },
          { categoryId: 2, name: "Webpack" },
          { categoryId: 3, name: "Egg" }
        ];
      },
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData() {

        request.get(`/player/query`+ serialize(this.filterData)).then(res => {
        // request.get(`/player/query`).then(res => {

          const {dataList, pageNumber, pageSize, total} = res.data.data

          this.dataList = dataList
          this.filterData.pageSize = pageSize
          this.filterData.pageNumber = pageNumber
          this.total = total
        })
      },
      query() {
        this.getData()
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`)
        this.filterData.pageSize = val
        this.getData()
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`)
        this.filterData.pageNumber = val
        this.getData()
      },
      handleEdit(index, row) {
        request.get(`/player/${row._id}`).then(res => {
          Object.assign(this.form, res.data.data)

          this.mode = 'edit'
          this.currPlayerId = row._id
          this.editPlayerVisible = true
        })
      },
      resetForm(){
        this.form = {
          username: '',
          name: '',
          role: '',
          currExp: 0,
          level: {
            exp_level: 0,
            skill_level: 0
          }
        }
      },
      savePlayer(){

        if (this.mode == 'add') {
          request.post(`/player/add`, this.form).then(res => {
            this.getData()
            this.editPlayerVisible = false
          })
        } else {
          request.post(`/player/update/${this.currPlayerId}`, this.form).then(res => {
            this.getData()
            this.editPlayerVisible = false
          })
        }
      },
      addPlayer(){
        this.resetForm()
        this.editPlayerVisible = true
        this.mode = 'add'
      },
      handleDelete(index, row) {

        request.post('player/remove',{id: row._id}).then(res=>{
          this.$message(`删除${row.name}成功!`)
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
        request.post('/player/batchremove', {ids: arr}).then(res => {
          this.getData()
          this.$message({message: '批量删除成功', type: 'success'})
        })
      },

      batchAdd(){

        let querys = []

        for (let i = 0; i < 20; i++) {
          querys.push({
            username: `user${i}`,
            name: `新用户${i}`,
            currExp: 0
          })
        }

        request.post('player/batchadd', querys).then(res => {
          this.$message(`批量添加成功!`)
          this.getData()
        })
      },

      async updateExp() {
        const list = await this.reviseExp()

        for (let i = 0; i < list.length; i++) {
          await this.updatePlayer(list[i]['_id'], {currExp: list[i]['currExp']})
        }
        this.getData()
        this.$message({message: '计算完成', type: 'success'})
      },

      reviseExp() {
        return new Promise((resolve, reject) => {
          request.post('/player/revise_exp').then(res => {
            resolve(res.data.data)
          }).catch(err => {
            reject(err)
          })
        })
      },

      updatePlayer(uid, obj){
        return new Promise((resolve, reject) => {
          request.post(`/player/update/${uid}`, obj).then(res => {
            resolve()
          })
        })
      }




    }
  }
</script>
