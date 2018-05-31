// pages/noTabBar/expert/expert.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "专家黄页列表",
    lastTitle:"返回",
    expertList: [],
    returnPage: "returnLastPage" /* 默认的方法名--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /* 专家列表*/
    wx.request({
      url: "http://119.23.255.13:8098/mobile/execute.do?action=getExpertList&creator=&currentPage=1&key=myTask&model=expert&objname=&pageSize=20&type=myTask&userId=8ae08bac4235c9cf01423696a91708c6",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        res.data.pageBean.recordList.forEach((item) => {
          if (item.description == void (0) || (item.description=='')){
            return true;/* 跳过此次循环 */
          }
          item.description = item.description.substring(0, 16)+"...";
        });
        that.setData({
          expertList: res.data.pageBean.recordList
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
  /* 返回上层 */
  returnLastPage:function () {
    wx.navigateBack({
      delta: 1
    });
  },
  /* 关注 */
  expertGz:function(e){
    console.log("专家id==>" + e.currentTarget.dataset.userid);
    /* 关注 */
    wx.request({
      url: "http://119.23.255.13:8098/kms/common/attention/add.do",
      data: {
        type: "expert",
        attentionId: e.currentTarget.dataset.id, /* 专家id */
        followerId: "8ae08bac4235c9cf01423696a91708c6" /* 用户id */
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
      },
      method: ""
    });
  },
  /* 取关 */
  expertQz: function () {

  },
  /* 点击查看专家信息 */
  itemtap:function(e){

    console.log(e.currentTarget.dataset.userid);

    wx.navigateTo({
      url: "/pages/noTabBar/expert/expertdetail/expertdetail?userId=" + e.currentTarget.dataset.userid
    });
  }
    

})