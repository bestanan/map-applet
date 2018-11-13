//app.js
App({
  onLaunch: function () {
    console.log('入口')
    // let username = wx.getStorageSync('username');
    // let password = wx.getStorageSync('password');
    // console.log('username', username)
    // console.log('password', password)
    // if(username == 'admin' && password == '1234') {
    //   wx.navigateTo({ url: '/pages/index/index' });
    // } else {
    //   wx.navigateTo({ url: '/pages/login/login' });
    // }
    // 登录
    // wx.login({
    //   success: res => {

    //     console.log(res)
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   }
    // })

    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId
    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
  },

  globalData: {
    userInfo: null,
    res: 'ok'
  }
})