//数据请求的封装
let request = {
  /**
   * 网络请求
   */
  request: function(url, data, method) {
    // let server = ''; //生产地址
    // let server = 'http://192.168.8.208:30759'; //测试地址
    // '/login/loginManager?loginName=liujie&loginPwd=bmat-password'
    let server = 'https://www.easy-mock.com'; //测试域名（暂用easy mock模拟数据请求）
    return new Promise((resolve, reject) => {
      wx.request({
        url: server + url,
        data: data,
        header: {'content-type': 'application/json'},
        method: method,
        dataType: 'json',
        success: (res => {
          let status = res.statusCode
          if(status >= 200 && status < 300 || status === 304) {
            //服务端处理正常
            resolve(res);
          } else {
            //异常提示
            reject(res);
          }
        }),
        fail: (res => {
          console.log('数据错误');
          reject(res);
        })
      })
    })
  },

  /**
   * GET类型的网络请求
   */
  getRequest: function(url, data) {
    return this.request(url, data, 'GET')
  },

  /**
   * POST类型的网络请求
   */
  postRequest: function(url, data) {
    return this.request(url, data, 'POST')
  }

}

export default request;
// module.exports = request;

