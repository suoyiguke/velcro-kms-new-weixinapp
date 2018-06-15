/* 引入富文本插件 */
var WxParse = require('../../../../../plugin/wxParse/wxParse.js');
var app = getApp(); // 取得全局App

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "文章详情",
    lastTitle:"团队详情",
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 
    docDetail:{},
    answerList:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    console.log("团队文档");
    /*     http://119.29.176.106:8090/mobile/execute.do?action=getDocbaseView&id=2c923dae628e7c3f01628edab3960246&model=teamDoc&pageSize=20
     */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getDocbaseView&id=" + options.docId + "&model=teamDoc&pageSize=20",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("oooooooooooooooooooooooooooooooooo");

        console.log(res.data);
        that.setData({
          docDetail: res.data
        });
      }
    }); 

    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getCommentView&currentPage=1&model=comments&objId=2c923dae628e7c3f01628edab3960246&pageSize=20&type=wiki&userId=402881e70be6d209010be75668750014",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("bbbbbbbbbbbbbbbbbbb");

        console.log(res.data.pageBean.recordList);

        
        /*  数组--获得html内容 */
        var replyArr = [];
        /* 遍历评论列表，把评论内容放入数组 */
        if (res.data.pageBean.recordList != void (0)) {

          res.data.pageBean.recordList.forEach((item, index) => {
            replyArr.push(item.content);
          });
          /* 循环结束 */
          /*  遍历数组--多数据解析 */
          replyArr.forEach((item, index) => {
            WxParse.wxParse('reply' + index, 'html', replyArr[index], that);
            if (index === replyArr.length - 1) {
              WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
            }
            console.log("===============yyy1===================");
            console.log(that.data.replyTemArray);
          });
          /* 循环结束 */
          /* 遍历 answerList 回复列表，将富文本的数组添加进去 */
          res.data.pageBean.recordList.forEach((item, index) => {
            console.log("===========uu=========");
            console.log(item);
            item.reply = that.data.replyTemArray[index];

          });
          /* 循环结束 */

          that.setData({
            answerList: res.data
          });

        }


      }
    }); 

   /*  http://119.29.176.106:8090/mobile/execute.do?action=getCommentView&currentPage=1&model=comments&objId=2c923dae628e7c3f01628edab3960246&pageSize=20&type=wiki&userId=402881e70be6d209010be75668750014 */

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
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

  /* 组件使用 */
  showDialog:function () {
    this.dialog.showDialog();
  },
  //取消事件
  _cancelEvent: function () {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent: function () {
    console.log('你点击了确定');
    this.dialog.hideDialog();
  }
})