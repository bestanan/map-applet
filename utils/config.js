//key等的配置文件
// 引入SDK核心类
let QQMapWX = require('../libs/qqmap-wx-jssdk.js');
// 实例化API核心类
let qqmapsdk = new QQMapWX({
  key: 'PM6BZ-25QKX-BAE4K-T366U-7SMA5-XQF4U' // 必填
});

module.exports = {
  qqmapsdk: qqmapsdk
};

