<template>
  <div>

    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>经验值</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataList" :key="item._id">
          <td>{{item.name}}</td>
          <td>{{item.currExp}}</td>
        </tr>
      </tbody>
    </table>

    <div> {{message}}</div>

  </div>
</template>
<style>
</style>
<script type="text/babel">
  import axios from 'axios'
  export default {
    components: {},
    computed: {},

    data(){
      return {
        message: `我是在home.vue的 测试数据`,
        dataList:[]
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      getData(){
        axios.get('/player').then(res=>{
          // console.log(res.data)
          this.dataList = res.data
        })
      }
    }
  }
</script>
