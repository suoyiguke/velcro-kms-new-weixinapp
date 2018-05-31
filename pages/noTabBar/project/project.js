// pages/noTabBar/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /* 发起接口请求--已办 */
    wx.request({
      url: "http://119.23.255.13:8098/mobile/execute.do?action=getProjectList&creator=8ae08bac4235c9cf01423696a91708c6&currentPage=1&isread=1&model=project&objname=&pageSize=20&userId=8ae08bac4235c9cf01423696a91708c6",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          projectList: res.data.pageBean.recordList
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

    console.log("e.currentTarget.dataset.projectid");

    console.log(e.currentTarget.dataset.projectid);
  }
})