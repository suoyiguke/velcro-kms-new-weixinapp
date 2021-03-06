var app = getApp(); // 取得全局App
var utils = require("../../../utils/util.js"); //取得全局工具js

Page({

  /**
   * 页面的初始数据
   */
  data: {
   title:"虚拟团队",
   lastTitle:"返回",
   teamList:[],
   urlPrefix :app.globalData.urlPrefix,
   returnPage: "returnLastPage"/* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    });
    var that = this;
    /* 发起接口请求--团队数据 */
    wx.request({
      url: app.globalData.urlPrefix +"mobile/execute.do?action=getTeamList&currentPage=1&model=teamlist&pageSize=20&teamname=&userId=" + app.globalData.userId,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        //截取字符串teamname
        utils.subString(res.data.pageBean.recordList, "teamname");
        utils.subString(res.data.pageBean.recordList, "summary");



        that.setData({
          teamList: res.data.pageBean.recordList
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
  itemTap:function(e){
  
      wx.navigateTo({
        url: "/pages/noTabBar/team/teamdetail/teamdetail?id=" + e.currentTarget.dataset.teamid
      });

  }, /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },onPullDownRefresh: function () {
    /* 重新加载本页面 */
    this.onLoad(this.data.options);
  }
})