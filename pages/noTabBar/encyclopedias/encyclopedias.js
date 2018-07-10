
var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "知识百科",
    lastTitle: "返回",
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
    dac1List: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    });
    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getWikiList&creator=&currentPage=1&key=myTask&model=knowledge&objname=&pageSize=20&type=myTask&userId=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxx");
        console.log(res.data.pageBean.recordList);
        that.setData({
          dac1List: res.data.pageBean.recordList
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
  },
  itemTap: function (e) {
    console.log("=============>" + e.currentTarget.dataset.docid);
    wx.navigateTo({
      url: "/pages/noTabBar/encyclopedias/enDetail/enDetail?docId=" + e.currentTarget.dataset.docid
    });
  },  onPullDownRefresh: function () {
   
    /* 重新加载本页面 */
    this.onLoad(this.data.options);
  }
})