//app.js
let scence = 0;

App({
  onLaunch: function () {
    console.log('onLaunch')
    // let username = wx.getStorageSync('username');
    // let password = wx.getStorageSync('password');
    // console.log('username', username)
    // console.log('password', password)
    // wx.reLaunch({
    //   url: '../../pages/index/index',
    // })
    // if(username == 'admin' && password == '1234') {
    //   wx.navigateTo({ url: '/pages/index/index' });
    // } else {
    //   wx.navigateTo({ url: '/pages/login/login' });
    // }
  },

  onShow : function(){
    // console.log("onShow");
    // // 判断变量，选择跳转位置
    // if (this.globalData.scence) {
    //     wx.redirectTo({
    //         url: '../../pages/index/index',
    //     })
    //     console.log('去首页')
    // } else {
    //   wx.reLaunch({
    //     url: '../../pages/login/login',
    //   })
    //   console.log('去首次进入页'); 
    // }
  },

  onHide : function(){
    this.globalData.scence = 1;
    console.log("app.onHide");
    // console.log(this.globalData.scence);
  },

  globalData: {
    userInfo: null,
    res: 'ok'
  }
})