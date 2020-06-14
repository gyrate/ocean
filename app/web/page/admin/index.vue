<template>
  <Layout>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </Layout>
</template>
<script type="text/babel">
  import Vue from 'vue';
  import ElementUI from 'element-ui';
  import 'element-ui/lib/theme-chalk/index.css';
  import Layout from 'component/layout/admin/index.vue';

  Vue.use(ElementUI);

  export default {
    components: {
      Layout,
    },
    computed: {},
    mounted() {},
  };
</script>