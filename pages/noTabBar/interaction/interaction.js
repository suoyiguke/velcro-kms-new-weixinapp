var app = getApp(); // 取得全局App
var utils = require("../../../utils/util.js"); //取得全局工具js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:"问题",
    lastTitle: "返回",
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
    optionTitle: ["未解决", "已解决","待答"],
    option1: true,
    option2: false,
    option3: false,
    recordListWjj: [],
    recordListYjj:[],
    recordListDd: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  /**
   * 生命周期函数--监听页面加载
   * app.globalData.urlPrefix +"mobile/execute.do?action=getFaqList&creator=&currentPage=2&isend=0&key=unresolved&model=question&objname=&pageSize=20&replyersid=&type=unresolved&userId=402881e70be6d209010be75668750014"
   * 
   * 只是currentPage的值不同
   */
  onLoad: function (options) {
    var that = this;
    /*  发起接口请求--未解决第1页 */
    wx.request({
      url: app.globalData.urlPrefix +"mobile/execute.do?action=getFaqList&creator=&currentPage=1&isend=0&key=unresolved&model=question&objname=&pageSize=20&replyersid=&type=unresolved&userId=402881e70be6d209010be75668750014",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        //截取字符串
        utils.subString(res.data.pageBean.recordList, "title");

        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListWjj: res.data.pageBean.recordList
        });

        if (that.data.recordListWjj === undefined || that.data.recordListWjj.length == 0) {
          console.log("===============数组1为空");
        }

      }
    });

    /*  发起接口请求--未解决第2页 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getFaqList&creator=&currentPage=2&isend=0&key=unresolved&model=question&objname=&pageSize=20&replyersid=&type=unresolved&userId=402881e70be6d209010be75668750014",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        //截取字符串
        utils.subString(res.data.pageBean.recordList, "title");

        if (that.data.recordListWjj === undefined || that.data.recordListWjj.length == 0) {
          console.log("===============数组1为空");
        }else{

          console.log(res.data.pageBean.recordList);
          //因为有未解决有两个请求，因此得拼接一下结果集
          var shuzu = that.data.recordListWjj.concat(res.data.pageBean.recordList);

          that.setData({
            recordListWjj: shuzu
          });
        }


      }
    });






    /*  发起接口请求-已解决 */
    wx.request({
      url: app.globalData.urlPrefix +"/mobile/execute.do?action=getFaqList&creator=&currentPage=1&isend=1&key=resolved&model=question&objname=&pageSize=20&replyersid=&type=resolved&userId=402881e70be6d209010be75668750014",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        //截取字符串
        utils.subString(res.data.pageBean.recordList, "title");

        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListYjj: res.data.pageBean.recordList
        });
        if (that.data.recordListYjj === undefined || that.data.recordListYjj.length == 0) {
          console.log("===============数组2为空");
        }
      }
    });

    /* 待答还没有接口！ 

    */

    /*  发起接口请求-待答 */
    wx.request({
      url: app.globalData.urlPrefix + "/mobile/execute.do?action=getFaqList&creator=&currentPage=1&isend=0&key=task&model=question&objname=&pageSize=20&replyersid=402881e70be6d209010be75668750014&type=task&userId=402881e70be6d209010be75668750014",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        //截取字符串
        utils.subString(res.data.pageBean.recordList, "title");

        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListDd: res.data.pageBean.recordList
        });
        if (that.data.recordListDd === undefined || that.data.recordListDd.length == 0) {
          console.log("===============数组3为空");
        }
      }
    });

   
   //接收从其他页面直接跳转过来的行为： 比如 点击个人信息的"我的待答"
    if (options.param == "option3"){
      this.selectOption3();
   }


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
  
  }, /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  },
  selectOption1: function (e) {
    this.setData({
      option1: true,
      option2: false,
      option3: false

    });
  },
  selectOption2: function (e) {
    this.setData({
      option1: false,
      option2: true,
      option3: false
    });
  },
  selectOption3: function (e) {
    this.setData({
      option1: false,
      option2: false,
      option3: true
    });

  },
  itemtap:function(e){
    console.log(e.currentTarget.dataset.id);
   
    wx.navigateTo({
      url: "/pages/noTabBar/interaction/interactiondetail/interaction?id=" + e.currentTarget.dataset.id
    });
  }
})