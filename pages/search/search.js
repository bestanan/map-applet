var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'PM6BZ-25QKX-BAE4K-T366U-7SMA5-XQF4U' // 必填
});
Page({
  data: {
    hidden: true,
    searchStorage: []
  },
  onLoad: function () {
    let that = this;
    that.getSearchStorage();
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
    let id = dataset.id;
    let title = dataset.title;
    let address = dataset.address;
    let location = dataset.location;
    let lat = location.lat;
    let lng = location.lng; 
    this.setSearchStorage(id, title, address, lat, lng);
    let url = '/pages/index/index';
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let delat = pages.length + 1;
    wx.navigateBack({
      delat: delat
    });
    prevPage.getAddress(lat, lng);
  },

  //写入缓存-搜索历史记录
  setSearchStorage: function(id, title, address, lat, lng) {
    let that = this;
    let obj = {
      id: id,
      title: title,
      address: address,
      location: {
        lat: lat, 
        lng: lng
      }
    }
    let searchStorage = that.data.searchStorage;
    searchStorage.push(obj);
    wx.setStorageSync('history', searchStorage);
  },

  //获取缓存-搜索历史记录
  getSearchStorage: function() {
    let that = this;
    wx.getStorage({
      key: 'history',
      success (res) {
        let data = res.data;
        if(data.length > 0) {
          that.setData({
            hidden: false,
            searchStorage: data,
            result: data
          })
        }
        console.log('history', data)
      } 
    })
  },

  //清除缓存-搜索历史记录
  removeSearchStorage: function() {
    let that = this;
    wx.showModal({
      title: '',
      content: '清空历史记录？',
      confirmText: '立即清空',
      confirmColor: '#4D8AD7',
      success (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'history',
            success (res) {
              that.setData({
                hidden: true,
                // searchStorage: [],
                result: []
              })
              console.log('remove', res)
            },
            fail (res) {
              console.log('清除缓存失败', res)
            }
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})
