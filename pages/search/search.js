import config from '../../utils/config';
import util from '../../utils/util';
let qqmapsdk = config.qqmapsdk;

Page({
  data: {
    searchValue: '',
    histories: [],
    pois: [], //地点
    stations: [],  //车站
    metro: [], //地铁
    noSearchResult: false
  },
  onLoad: function () {
    let that = this;
    that.getSearchStorage();
  },

  // 搜索
  bindSearch: function(e) {
    let that = this;
    if(e) {
      let value = e.detail.value.searchValue || e.detail.value;
      // let value = e.detail.value;
      console.log('关键字', value)
      that.setData({
        searchValue: value
      })
      if(value != '') {
        util.showLoading('加载中');
        qqmapsdk.getSuggestion({
          keyword: value,
          region: '深圳市',
          region_fix: 0,
          policy: 0,
          success: function(res) {
            let data = res.data;
            console.log('搜索结果',data);
            if(data.length > 0) {
              let pois = [];
              let stations = [];
              let metro = [];
              data.forEach((element) => {
                //type为POI类型，值说明：0:普通POI / 1:公交车站 / 2:地铁站 / 3:公交线路 / 4:行政区划（打印看到还有5的，为地铁线，但官方没有指明，待确定）
                if(element.type == 0 || element.type == 4) { //归为地点
                  pois.push(element);
                } else if(element.type == 1 || element.type == 3) { //归为公交
                  stations.push(element);
                } else {  //其他的归为地铁
                  metro.push(element);
                }
              })
              console.log('pois', pois)
              console.log('stations', stations)
              console.log('metro', metro)
              that.setData({
                noSearchResult: false,
                pois: pois,
                stations: stations,
                metro: metro
              })
              // console.log('noSearchResult', that.data.noSearchResult)
            } else {
              that.setData({
                noSearchResult: true,
                pois: [],
                stations: [],
                metro: []
              })
            }
            util.hideLoading();
          },
          fail: function(res) {
            console.log(res);
          }
        });
      } else {
        return;
      }
    }
  },

  // 清空搜索框内容
  clearInput: function(e) {
    let that = this;
    that.setData({
      searchValue: '',
      noSearchResult: false,
      pois: [],
      stations: [],
      metro: []
    })
  },

  // 点击列表 获取地址等详细信息
  getAddress: function (e) {
    let dataset = e.currentTarget.dataset;
    let id = dataset.id;
    let title = dataset.title;
    let address = dataset.address;
    let location = dataset.location;
    let type = dataset.type;
    let lat = location.lat;
    let lng = location.lng; 
    this.setSearchStorage(id, title, address, lat, lng, type);
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
  setSearchStorage: function(id, title, address, lat, lng, type) {
    let that = this;
    let obj = {
      id: id,
      title: title,
      address: address,
      location: {
        lat: lat, 
        lng: lng
      },
      type: type
    }
    let histories = that.data.histories;
    histories.push(obj);
    wx.setStorageSync('history', histories);
  },

  //获取缓存-搜索历史记录
  getSearchStorage: function() {
    let that = this;
    wx.getStorage({
      key: 'history',
      success (res) {
        let data = res.data;
        console.log('jieguo', data)
        if(data.length > 0) {
          let uniqueData = that.unique(data);
          console.log('history', uniqueData)
          that.setData({
            histories: uniqueData.reverse(),
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
      content: '确定清空记录？',
      confirmText: '立即清空',
      confirmColor: '#4D8AD7',
      cancelColor: '#999',
      success (res) {
        if (res.confirm) {
          wx.removeStorage({
            key: 'history',
            success (res) {
              that.setData({
                histories: []
              })
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
