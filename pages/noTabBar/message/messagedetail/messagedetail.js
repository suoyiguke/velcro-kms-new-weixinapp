// pages/noTabBar/message/messagedetail/messagedetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     title: "内容",
     lastTitle:"消息会话",
     messDetailList:{} /* 单个json对象 */
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    console.log(id);

    wx.request({
      url: "http://119.23.255.13:8098/mobile/execute.do?action=getNotice&id="+id+"&model=Docbase&pageSize=20&userid=8ae08bac4235c9cf01423696a91708c6",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          messDetailList: res.data
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
  
  }
})