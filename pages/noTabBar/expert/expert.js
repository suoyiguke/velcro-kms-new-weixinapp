var app = getApp(); // 取得全局App
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "专家黄页列表",
    lastTitle: "返回",
    expertList: [],
    returnPage: "returnLastPage", /* 默认的方法名--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
    urlPrefix: app.globalData.urlPrefix,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    var that = this;
    /* 专家列表*/
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getExpertList&creator=&currentPage=1&key=myTask&model=expert&objname=&pageSize=20&type=myTask&userId=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        res.data.pageBean.recordList.forEach((item) => {
          if (item.description == void (0) || (item.description == '')) {
            return true;/* 跳过此次循环 */
          }
          item.description = item.description.substring(0, 16) + "...";
        });
        that.setData({
          expertList: res.data.pageBean.recordList
        }); 

 
        /* 遍历数组，目标是专家id */
        that.data.expertList.forEach((item) => {
          /*  http://119.29.176.106:8090/kms/common/attention/isExist.do */
          wx.request({
            url: app.globalData.urlPrefix + "kms/common/attention/isExist.do",
            data: {
              type: 'expert',
              attentionId: item.userId,    /* 被关注的专家id */
              userId: app.globalData.userId /*  当前用户id */
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded;utf-8' // 默认值
            },
            method: "POST",
            success: function (res) {
              console.log("vvvvvvvvvvvvvvvvvvvv");
              console.log(res.data);
              /* 遍历专家列表，将关注属性添加至里面 */
              that.data.expertList.forEach((item) => {
                if (item.userId == res.data.attentionId){
                  item.isOk = res.data.isOk
                }
              });

              console.log(that.data.expertList);
              that.setData({
                expertList: that.data.expertList
              });

  
            }
          });
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
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  /* 关注 */
  expertGz: function (e) {
    var that = this;
    console.log("专家id==>" + e.currentTarget.dataset.userid);
    /* 关注 */
    wx.request({
      url: app.globalData.urlPrefix + "kms/common/attention/add.do",
      data: {
        type: "expert",
        attentionId: e.currentTarget.dataset.userid, /* 专家id */
        followerId: app.globalData.userId /* 用户id */
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;utf-8' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        /* 遍历专家列表，将关注属性添加至里面 */
        that.data.expertList.forEach((item) => {
          if (item.userId == e.currentTarget.dataset.userid ) {
            if (res.data.isOk == 1){
              item.isOk = true;
            }
          }
        });
        that.setData({
          expertList: that.data.expertList
        });

      }
    });
  },
  /* 取关 */
  expertQg: function (e) {
    var that = this;
    console.log("专家id==>" + e.currentTarget.dataset.userid);
    /* 关注 */
    wx.request({
      url: app.globalData.urlPrefix + "/kms/common/attention/delete.do",
      data: {
        type: "expert",
        attentionId: e.currentTarget.dataset.userid, /* 专家id */
        followerId: app.globalData.userId /* 用户id */
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded;utf-8' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res.data);
        /* 遍历专家列表，将关注属性添加至里面 */
        that.data.expertList.forEach((item) => {
          if (item.userId == e.currentTarget.dataset.userid) {
            if (res.data.isOk == 1) {
              item.isOk = false;
            }
          }
        });
        that.setData({
          expertList: that.data.expertList
        });

      }
    });
  },
  /* 点击查看专家信息 */
  itemtap: function (e) {

    console.log(e.currentTarget.dataset.userid);

    wx.navigateTo({
      url: "/pages/noTabBar/expert/expertdetail/expertdetail?userId=" + e.currentTarget.dataset.userid
    });
  }


})