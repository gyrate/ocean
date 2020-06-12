module.exports = {
  devtool: 'eval',
  target: 'web',
  entry: {
    home: 'app/web/page/home/home.js'
  },
  framework: 'vue', // 使用 easywebpack-vue 构建解决方案
  cssExtract: true,
  //dll: ['vue', 'vue-router', 'vuex', 'axios']
};
