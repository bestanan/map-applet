//person.js
const app = getApp();

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    let username = wx.getStorageSync('username');
    console.log('username', username)
    this.setData({
      username: username
    })
  },

  /**
   * 退出登录
   */
  logout: function() {
    app.globalData.loginStatus = 0;
    wx.removeStorage({
      key: 'username'
    })
    wx.reLaunch({
      url: '/pages/index/index'
    })
  }

})
