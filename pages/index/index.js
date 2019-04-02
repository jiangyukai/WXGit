
var util = require('../../utils/util.js')
var test
Page({
  data: {
    height: '',
    callbackcount: 15,      //返回数据的个数 
    pageNums: 1,  // 设置加载的第几次，默认是第一次
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    tradeList: [
      { name :'111',price:'222'},{name:'333',price:'444'},
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      { name: '111', price: '222' }, { name: '333', price: '444' },
      ],
    newsList:[],
    headLineList: [],
    section: [
      { name: '时政', id: '1001' }, { name: '解读', id: '1032' },
      { name: '视点', id: '1003' }, { name: '交易', id: '1004' },
      { name: '质价标准', id: '1005' }, { name: '质价标准', id: '1006' }
    ],
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '测试分享',
      desc: '小程序开发!',
      path: '/page/user?id=123'
    }
  },
  onLoad: function () {
    let that = this;
    let otherHeight1 =0;
    let otherHeight2 = 0;
    let query = wx.createSelectorQuery();
    query.select('.nav-scroll').boundingClientRect(function(ret){
      otherHeight1 = ret.height;
      wx.setStorageSync('otherHeight1', otherHeight1);
      // console.log(otherHeight1);
    }).exec();
    query.select('.banner-scroll').boundingClientRect(function (ret) {
      otherHeight2 = ret.height;
      wx.setStorageSync('otherHeight2', otherHeight2);
      // console.log(otherHeight2);
    }).exec();
    otherHeight2 = wx.getStorageSync("otherHeight2");
    otherHeight1 = wx.getStorageSync("otherHeight1");
    test = otherHeight2 + otherHeight1
    console.log(test)
    this.getData();
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          height: res.windowHeight-test
        })
      }
    })
  },
  getData: function () {
    var that = this;
    var searchPageNum = this.data.pageNums
    var searchCallbackcount = this.data.callbackcount
    util.getNews(searchPageNum, searchCallbackcount,function(data){
      if (data.newsData){
        var serachList = [];
        var isAllData = data.yes;
        serachList = that.data.newsList.concat(data.newsData);
        that.setData({
          newsList: serachList,
          searchLoading: !isAllData,   //把"上拉加载"的变量设为false，显示
          searchLoadingComplete: isAllData
        });
      }else{
        console.log("没有数据");
        that.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏
        });
      }
    });
  },

  handleTap: function (e) {
    let id = e.currentTarget.id;
    if (id) {
      this.setData({ currentId: id })
      this.onLoad();
    }

  },
  //新闻详情
  jumpDetails: function (e) {
    console.log("-----"+e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '../index/news/news?newsId=' + e.currentTarget.dataset.id,
      success: function (res) {
        // success
        console.log("接口调用成功的回调函数");
      },
      fail: function () {
        // fail
        console.log("接口调用失败的回调函数");
      },
      complete: function () {
        // complete
        console.log("调用接口完成");
      }
    })
  },
  lower() {
    var that = this;
    if (that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        pageNums: that.data.pageNums + 1 //每次触发上拉事件，把searchPageNum+1
      });
      that.getData();
    }else{
      console.log("不满足加载条件");
    }
  }
    
})