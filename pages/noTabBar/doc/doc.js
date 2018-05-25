// pages/noTabBar/doc/doc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: "bc-unchecked" /* 列表默认样式 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  },/* 触摸变色 */
  itemTouchStart: function (e) {
    console.log("触摸开始=============");
    this.setData({
      background: "bc-select" /* 改变样式 */
    });

  }
  ,/* 触摸变色 */
  itemTouchEnd: function (e) {
    console.log(e.currentTarget);
    this.setData({
      background: "bc-unchecked" /* 改变样式 */
    });
    console.log("触摸结束=============");
  }
})