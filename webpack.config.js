module.exports = {
  target: 'web',
  framework: 'vue', // 使用 easywebpack-vue 构建解决方案
  devtool: 'eval',
  entry: {
    'admin': 'app/web/page/admin/index.js'
  }
};
