//其它功能封装
let util = {
  showLoading: function(text) {
    wx.showLoading({
      title: text,
      mask: true
    })
    
    // setTimeout(function () {
    //   wx.hideLoading()
    // }, 2000)
  },

  hideLoading: function() {
    wx.hideLoading();
  },

  showToast: function(obj) {
    wx.showToast({
      title: obj.title,
      icon: obj.icon,
      image: obj.image,
      duration: 1000,
      success: obj.success
    })
  }
  

}

export default util;