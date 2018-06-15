var app = getApp(); // 取得全局App
var utils = require("../../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
   title:"已关注列表",
   optionTitle: ["关注专家", "关注问题"],
   option1: true,
   option2: false,
   recordListYjj:[],
   expertList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=attentiExpertList&currentPage=1&pageSize=20&userId=" + app.globalData.userId,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        
        //截取字符串
        utils.subString(res.data.pageBean.recordList, "description");

        that.setData({
          expertList: res.data.pageBean.recordList
        });

      }
    });

  
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=attentiQuestionList&currentPage=1&pageSize=20&userId=" + app.globalData.userId,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        //截取字符串
        utils.subString(res.data.pageBean.recordList, "title");

        that.setData({
          recordListYjj: res.data.pageBean.recordList
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  selectOption1: function (e) {
    this.setData({
      option1: true,
      option2: false

    })
  },
  selectOption2: function (e) {
    this.setData({
      option1: false,
      option2: true
    })
  }, 
  itemtap:function(e){
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: "/pages/noTabBar/interaction/interactiondetail/interaction?id=" + e.currentTarget.dataset.id
    });
  },
  itemtapExpert:function(e){

    console.log(e.currentTarget.dataset.userid);

    wx.navigateTo({
      url: "/pages/noTabBar/expert/expertdetail/expertdetail?userId=" + e.currentTarget.dataset.userid
    });
  }
})