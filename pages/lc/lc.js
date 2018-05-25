// pages/txl/txl.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "流程",
    option1: true,
    option2: false,
    option3: false,
    optionTitle: ["待办", "已办", "知会"],
    background: "bc-unchecked", /* 列表默认样式 */
    headAdd: true /* 是否有加号？ */
  },
  selectOption1: function (e) {
    this.setData({
      option1: true,
      option2: false,
      option3: false

    })
  },
  selectOption2: function (e) {
    this.setData({
      option1: false,
      option2: true,
      option3: false
    })
  },
  selectOption3: function (e) {
    this.setData({
      option1: false,
      option2: false,
      option3: true
    })

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
  },
  itemTap: function(e) {
   
    console.log("item被点击=============");
    var urlx = "/pages/lc/taskdetails/taskdetails?title=" + this.data.title;
    wx.navigateTo({
      url: urlx
    });
  },
  /* 跳转到添加页面 */
  addItem:function(){
    wx.navigateTo({
      url: "/pages/lc/addflow/addflow?title=" + this.data.title
    });
  }
})