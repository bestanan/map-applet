//person.js
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    let username = wx.getStorageSync('username');
    let password = wx.getStorageSync('password');
    console.log('username', username)
    console.log('password', password)
    this.setData({
      username: username,
      password: password
    })
  },

  /**
   * 切换账号，跳转到登录页面
   */
  changeUser: function() {
    wx.navigateTo({
      url: '/pages/login/login'
    })
  }

})
