/* eslint valid-jsdoc: "off" */

'use strict';
const path = require('path')
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = {}

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1589615054062_1215';

  // add your middleware config here
  config.middleware = [
    'robot',
    'pack'
  ];

  config.robot = {
    ua: [
      /Baiduspider/i
    ]
  };

  config.onerror = {
    json(err, ctx) {
      ctx.body = {code: 0, message: 'error', error: err}
    }
  };

  // database
  config.mongoose = {
    client: {
      // 数据库地址
      url: 'mongodb://127.0.0.1:27017/ocean',
      options: {
        autoReconnect: true,
        bufferMaxEntries: 0
      },
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  };

  // template engineer
  /*
  config.view = {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks'
    },
    // multi folders
    root:[
      path.join(appInfo.baseDir, 'app/view'),
      path.join(appInfo.baseDir, 'path/to/another')
    ].join(',')
  }
  */

  // 保证构建的静态资源文件能够被访问到
  config.static = {
    prefix: '/public/',
    dir: path.join(appInfo.baseDir, 'public')
  };

  config.vuessr = {
    layout: path.join(appInfo.baseDir, 'app/web/view/layout.html'),
    renderOptions: {
      basedir: path.join(appInfo.baseDir, 'app/view')
    }
  };

  exports.security = {
    csrf: {
      ignoreJSON: false,
      cookieName: 'csrfToken',
      // sessionName: 'csrfToken',
      // headerName: 'x-csrf-token'
    },
    xframe: {
      enable: false,
    },
  };


  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
