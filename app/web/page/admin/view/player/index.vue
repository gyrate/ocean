<template>
  <div>
    <div class="search">
      <el-row class="clear">
        <label> 标题:</label><el-input class="search-input" clearable v-model="q.title" placeholder="关键字"></el-input>
        <label> 分类:</label><el-select  v-model="q.categoryId" placeholder="分类">
        <el-option v-for="item in categories"
                   :key="item.id"
                   :label="item.name"
                   :value="item.categoryId">
        </el-option>
      </el-select>
        <label> 状态:</label><el-select  v-model="q.status" placeholder="状态">
        <el-option v-for="item in status"
                   :key="item.id"
                   :label="item.name"
                   :value="item.status">
        </el-option>
      </el-select>
        <el-button class="search-button" type="primary" @click="query()">查询</el-button>
      </el-row>
    </div>

    <el-table
            :data="articleList"
            v-loading="loading"
            element-loading-text="拼命加载中"
            border
            @selection-change="batchSelect"
            style="width: 99.5%;">
      <el-table-column
              type="selection"
              width="55">
      </el-table-column>
      <el-table-column prop="name" label="玩家">
      </el-table-column>
      <el-table-column prop="currExp" label="当前经验值">
      </el-table-column>
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

  </div>
</template>
<script type="text/ecmascript-6">
  import request from '../../../../framework/network/request'
  export default{
    name: 'player',
    component: {},
    data(){
      return {
        q: {
          title: undefined,
          categoryId: undefined,
          statusId: undefined,
          pageIndex: 1,
          pageSize: 10
        },
        total: 100,
        //请求时的loading效果
        loading: false,
        articleList: []
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
//      articleList() {
//        return this.$store.state.articleList;
//      }
    },
    mounted(){
      this.getData()
    },
    methods: {
      getData() {
        request.get('/player/query').then(res=>{
          this.articleList = res.data
        })
      },
      fetchApi({ $store, $router }, json) {
//        return $store.dispatch(SET_ARTICLE_LIST, json);
      },
      query() {
        this.fetchApi(this, this.q);
      },

      handleSelectionChange(val) {
        console.log("handleSelectionChange", val);
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
        this.$message(`你点击了编辑操作 index:${index}, id:${row.id}`);
      },
      handleDelete(index, row) {

        request.post('player/remove',{id: row._id}).then(res=>{
          this.$message(`删除${row.name}成功!`)
          this.getData()
        })
      },
      batchSelect(val) {
        this.batchSelectArray = val;
      },
    }
  }
</script>