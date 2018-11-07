// 是否生产模式
let isProduct = false; 
if(isProduct) {
  let server = ''; //正式域名
} else {
  let server = 'https://www.easy-mock.com'; //测试域名（暂用easy mock模拟数据请求）
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
  request: function({url, data, header, method, success}) {
    // let options = Object.assign(default_opts, opt);
    // console.log('options', options);
    // wx.request(options);
    let that = this;
    wx.request({
      url: url,
      data: data,
      header: header,
      method: method,
      dataType: 'json',
      success: function(res) {
        let status = res.statusCode
        if(status >= 200 && status < 300 || status === 304) {
          //服务端处理正常
          console.log(res);
        } else {
          //异常提示
          console.log('数据错误')
        }
      },
      fail: function() {
        console.log('数据错误');
      },
      complete: function() {

      }
    })
  }
}

export default util;
// module.exports = util;

