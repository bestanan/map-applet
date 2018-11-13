const app = getApp();
import util from '../../utils/util';
import request from '../../utils/request';

Page({
  data: {
    username: '',
    password: ''
  },
  
  onLoad: function () {

  },

  //监听账号输入
  usernameInput: function(e) {
    this.data.username = e.detail.value;
  },

  //监听密码输入
  passwordInput: function(e) {
    this.data.password = e.detail.value;
  },

  //登录按钮点击事件
  loginAction: function() {
    let that = this;
    let username = that.data.username;
    let password = that.data.password;
    console.log('账号：' + username);
    console.log('密码：' + password)
    console.log('denglu')
    if(username == '') {
      util.showToast({
        title: '账号不能为空',
        icon: '',
        image: '../../images/info-sign.png',
        success: ( ) => { console.log('用户名不能为空') }
      });
      return;
    }
    if(password == '') {
      util.showToast({
        title: '密码不能为空',
        icon: '',
        image: '../../images/info-sign.png',
        success: ( ) => { console.log('密码不能为空') }
      });
      return;
    }
    // if(username != 'admin' || password != '123') {
    //   util.showToast({
    //     title: '账号或密码错误',
    //     icon: '',
    //     image: '../../images/info-sign.png',
    //     success: ( ) => { console.log('账号或密码错误') }
    //   });
    //   return;
    // }

    //loading
    util.showLoading('登录中...');

    //mock测试数据
    let url = '/mock/5be8f089b2a43e6eaa87c1bf/maptest/loginIn';
    let obj = {
      username: username,
      password: password
    }
    request.postRequest(url, obj)
      .then(res => {
        console.log('mock数据', res)
        let code = res.statusCode;
        if(code == 200) {
          console.log('登录成功');
          wx.setStorageSync('username', username);
          wx.setStorageSync('password', password);
          //登录成功则跳转到地图页
          wx.reLaunch({ url: '/pages/index/index' });
          // wx.redirectTo({ url: '/pages/index/index' });
          //关闭loading
          util.hideLoading();
        } else {
          util.showToast({
            title: '请稍后重试',
            icon: '',
            image: '../../images/info-sign.png',
            success: ( ) => { console.log('登录失败，稍后重试') }
          });
        }
      })
      .catch(res => {
        util.showToast({
          title: '请稍后重试',
          icon: '',
          image: '../../images/info-sign.png',
          success: ( ) => { console.log('登录失败，稍后重试') }
        });
      })

  }



})
