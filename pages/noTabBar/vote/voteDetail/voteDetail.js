var app = getApp(); // 取得全局App

Page({

  /**
   * 页面的初始数据
   */
  data: {
   title:"在线投票",
   lastTitle:"投票列表",
   returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
   detail: {}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  console.log(options.id);
  var that = this;

  wx.request({
    url: app.globalData.urlPrefix + "mobile/execute.do?action=voteView&id=" + options.id+"&model=voteView&pageSize=20&userId=" + app.globalData.userId,
    header: {
      'content-type': 'application/json;utf-8' // 默认值
    },
    success: function (res) {
      console.log(res.data);

      that.setData({
        detail: res.data
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
  
  },  /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  }
})