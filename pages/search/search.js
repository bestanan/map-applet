var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'PM6BZ-25QKX-BAE4K-T366U-7SMA5-XQF4U' // 必填
});
Page({
  data: {
    searchStorage: []
  },
  onLoad: function () {
    console.log('searchStorage11', this.data.searchStorage);
  },

  // 搜索地点等关键字
  bindSearch: function(e) {
    let that = this;
    if(e) {
      var value = e.detail.value;
      if(value != '') {
        qqmapsdk.getSuggestion({
          keyword: value,
          region: '深圳市',
          region_fix: 0,
          policy: 0,
          success: function(res) {
            console.log('搜索结果',res.data);
            that.setData({
              result: res.data
            })
          },
          fail: function(res) {
            console.log(res);
          },
          complete: function(res) {
            // console.log(res);
          }
        });
      }
    }
  },

  // // 清空搜索框内容
  // searchClear: function(e) {
  //   let that = this;
  //   that.setData({
  //     searchValue: ''
  //   })
  // },

  // // 点击取消 隐藏搜索列表
  // cancel() {
  //   let that = this;
  //   that.setData({
  //     isHidden: true
  //   })
  // },

  getAddress: function (e) {
    let dataset = e.currentTarget.dataset;
    let title = dataset.title;
    let address = dataset.address;
    let location = dataset.location;
    let lat = location.lat;
    let lng = location.lng; 
    console.log(title, address, lat, lng)
    this.setSearchStorage(title, address, lat, lng);
    // console.log('lat', lat);
    // console.log('lng', lng);
    let url = '/pages/index/index';
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let delat = pages.length + 1;
    wx.navigateBack({
      delat: delat
    });
    // prevPage.getAddress(lat, lng);
  },


  //搜索历史记录写入缓存
  setSearchStorage: function(title, address, lat, lng) {
    let that = this;
    let obj = {
      title: title,
      address: address,
      location: {
        lat: lat, 
        lng: lng
      }
    }
    let searchStorage = that.data.searchStorage;
    searchStorage.push(obj);
    wx.setStorageSync('searchHistory', searchStorage);
    console.log('searchStorage', searchStorage);
  },

  //搜索历史记录获取缓存
  // getSearchStorage: function()
})
