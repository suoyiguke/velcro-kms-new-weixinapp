/* 引入富文本插件 */
var WxParse = require('../../../../../plugin/wxParse/wxParse.js');
var app = getApp(); // 取得全局App

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "文章详情",
    lastTitle: "团队详情",
    returnPage: "returnLastPage",
    /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
    docDetail: {},
    answerList: [],
    options: "",
    objid: "",
    hfwtid: "",
    inputValue: ""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      options: options
    });
    var that = this;

    console.log("团队文档");

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
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getCommentView&currentPage=1&model=comments&objId=" + options.docId +"&pageSize=20&type=wiki&userId=" + app.globalData.userId,
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
  showDialog: function (e) {
    console.log(e.currentTarget.dataset.hfwtid);
    console.log(e.currentTarget.dataset.creator);
    console.log(e.currentTarget.dataset.objid);

    this.setData({
      hfwtid: e.currentTarget.dataset.hfwtid,
      creator: e.currentTarget.dataset.creator,
      objid: e.currentTarget.dataset.objid
    });

    this.dialog.showDialog();
  },
  //取消事件
  _cancelEvent: function () {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent: function (e) {
    console.log('你点击了确定');

    var that = this;
    if (app.globalData.textAreValue == "") {
      wx.showToast({
        title: "请输入回复内容！",
        icon: 'none',
        duration: 2000
      });
      /*       return;
       */
    }
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=addComment&userId=" + app.globalData.userId,
      data: {

        /*   questionId: that.data.options.id,
          content: app.globalData.textAreValue,
          pid: that.data.hfwtid,
          toUserId: that.data.creator, */
        objId: that.data.objid,
        type: 'wiki',
        content: app.globalData.textAreValue,
        pid: that.data.hfwtid,
        toUserId: that.data.creator

      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {

        /*  添加成功，关闭弹窗 */
        this.dialog.hideDialog();
        /* 重新加载本页面 */
        this.onLoad(that.data.options);
      }
    });

  },
  addRelpy: function (e) {

    if (this.data.inputValue == "") {
      wx.showToast({
        title: "请输入回复内容！",
        icon: 'none',
        duration: 2000
      });
        return;
       
    }

    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=addComment&userId=" + app.globalData.userId,
      data: {
        /*   questionId: e.currentTarget.dataset.queid,
          content: that.data.inputValue */
        objId: e.currentTarget.dataset.docid,
        content: that.data.inputValue,
        type: 'wiki',
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function (res) {
        /* 刷新页面 */
        that.onLoad(that.data.options);
      }
    });
  },
  /* 獲取輸入框的內容，每次改變輸入寬的內容的時候都會觸發 */
  bindinput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  }, onPullDownRefresh: function () {
    /* 重新加载本页面 */
    this.onLoad(this.data.options);
  }

})