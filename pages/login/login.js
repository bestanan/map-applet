const app = getApp();
Page({
  data: {
  },
  onLoad: function () {
    this.setData({
      res: app.globalData.res
    })

    // this.login();
  },

  login: function() {
    wx.login({
      success (res) {
        console.log('res ', res)
        if (res.code) {
          //发起网络请求
          // wx.request({
          //   url: 'https://test.com/onLogin',
          //   data: {
          //     code: res.code
          //   }
          // })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  }
})
