<template>
  <div>
    <div class="search">
      <el-row class="clear">
        <label>玩家姓名:</label>
        <el-input class="search-input" clearable v-model="q.name"  placeholder="关键字" size="small"></el-input>
      </el-select>
        <el-button class="search-button" type="primary" @click="query()" size="small">查询</el-button>
      </el-row>
    </div>

    <div class="button-group">
      <el-button type="success" size="small" @click="addPlayer">新增玩家</el-button>
      <el-button type="primary" size="small" @click="batchAdd">批量导入</el-button>
      <el-button type="primary" size="small" @click="batchRemove">批量删除</el-button>
      <el-button type="success" size="small" @click="reviseExp">获取玩家的总经验值</el-button>
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
      <el-table-column prop="level.exp_level" label="经验等级">
      </el-table-column>
      <el-table-column prop="level.skill_level" label="职业等级">
      </el-table-column>
      <el-table-column prop="currExp" label="当前经验值">
      </el-table-column>
      <el-table-column prop="exp.sharing" label="分享获得经验值">
      </el-table-column>
      <!--<el-table-column prop="currExp" label="日报获得">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="currExp" label="分享获得">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="currExp" label="任务获得">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="currExp" label="活动获得">-->
      <!--</el-table-column>-->
      <!--<el-table-column prop="currExp" label="建议获得">-->
      <!--</el-table-column>-->

      <el-table-column
              label="操作"
              width="180">
        <template slot-scope="props">
          <router-link :to="{params: {id: props.row.id}}" tag="span">
            <el-button type="info" size="small" icon="edit" @click="handleEdit(props.$index, props.row)">修改</el-button>
          </router-link>
          <el-button type="danger" size="small" icon="delete" @click="handleDelete(props.$index, props.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div style="padding: 1em 0;">
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="q.pageIndex"
              :page-sizes="[10, 15, 20, 50]"
              :page-size="q.pageSize"
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
  import request from '../../../../framework/network/request'
  export default{
    name: 'player',
    component: {},
    data(){
      return {
        q: {
          name: '',
          pageIndex: 1,
          pageSize: 10
        },
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
        total: 100,
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
//      total() {
//        return this.$store.state.articleTotal;
//      },
//      dataList() {
//        return this.$store.state.dataList;
//      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData() {
        request.get('/player/query').then(res=>{
          this.dataList = res.data.data
        })
      },
      query() {
        this.fetchApi(this, this.q);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.q.pageSize = val;
        this.fetchApi(this, this.q);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.q.pageIndex = val;
        this.fetchApi(this, this.q);
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

        let querys = [{
          name: 'num0',
          currExp: 0
        },{
          name: 'num1',
          currExp: 10
        },{
          name: 'num2',
          currExp: 20
        },{
          name: 'num3',
          currExp: 30
        },{
          name: 'num4',
          currExp: 40
        }]

        request.post('player/batchadd', querys).then(res => {
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
