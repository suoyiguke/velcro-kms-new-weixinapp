var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "通讯录",
    option1: true,
    option2: false,
    option3: false,
    optionTitle: ["所有人","常用","我的下属"]
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
  
  }
})