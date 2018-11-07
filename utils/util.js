//可以编写自己的JavaScript插件
let util = {
  request: function() {
    let options = Object.assign({},DEFAULT_REQUEST_OPTIONS,opt);
    let {url,data,header,method,dataType,mock=false} = options
    wx.request({
      url,
      data,
      header,
      method,
      dataType,
      success (res) {
        console.log(res.data)
      }
    })
  }
}

module.exports = {
  util: util
}
