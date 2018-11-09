import config from '../../utils/config';
let qqmapsdk = config.qqmapsdk;

Page({
  data: {
    hidden: true,
    searchValue: '',
    searchStorage: []
  },
  onLoad: function () {
    let that = this;
    that.getSearchStorage();
  },

  // 搜索
  bindSearch: function(e) {
    let that = this;
    if(e) {
      let value = e.detail.value;
      that.setData({
        hidden: true,
        searchValue: value
      })
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
          }
        });
      }
    }
  },

  // 清空搜索框内容
  searchClear: function(e) {
    let that = this;
    that.setData({
      searchValue: ''
    })
  },

  // 点击列表 获取地址等详细信息
  getAddress: function (e) {
    let dataset = e.currentTarget.dataset;
    let id = dataset.id;
    let title = dataset.title;
    let address = dataset.address;
    let location = dataset.location;
    let lat = location.lat;
    let lng = location.lng; 
    this.setSearchStorage(id, title, address, lat, lng);
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];  //上一个页面
    let delat = pages.length + 1;
    wx.navigateBack({
      delat: delat
    });
    prevPage.getAddress(lat, lng);
    // let url = '/pages/index/index';
    // wx.reLaunch({
    //   url: url
    // })
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
          let uniqueData = that.unique(data);
          console.log('history', uniqueData)
          that.setData({
            hidden: false,
            searchStorage: uniqueData,
            result: uniqueData.reverse()
          })
        }
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
      cancelColor: '#999',
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  //数组去重
  unique: function(data) {
    let obj = {};
    let newArr = [];
    //通过id唯一去重
    for(let i=0, length = data.length; i < length; i++){
      obj[data[i].id] = data[i];
    }
    for(let item in obj) {
      newArr.push(obj[item]);
    }
    return newArr;
  }
})
