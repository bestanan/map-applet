// 是否生产模式
let isProduct = false; 
if(isProduct) {
  let server = ''; //正式域名
} else {
  let server = 'https://www.easy-mock.com';//测试域名
}

//请求默认参数
let default_opts = {
  url: '',
  data: {},
  header:{
    'content-type': 'application/json' // 默认值
  },
  method: 'GET',
  dataType: 'json'
}

let util = {
  request: function(opt) {
    let options = Object.assign(default_opts, opt);
    console.log('options', options);
    wx.request(options);
  }
}

export default util;
// module.exports = util;

