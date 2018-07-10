var app = getApp(); // 取得全局App
/* 引入富文本插件 */
var WxParse = require('../../../../plugin/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "问答详情",
    questionList: {},
    answerList: [],
    urlPrefix: app.globalData.urlPrefix,
    lastTitle: "问答",
    returnPage: "returnLastPage",
    /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
    inputValue: '',
    options: "",
    hfwtid: ""

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      options: options
    });

    var that = this;
    /* 发起接口请求--問題 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getFaqView&creator=&id=" + options.id + "&key=myTask&model=questioninfo&pageSize=20&type=myTask",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function(res) {
        wx.request({
          url: app.globalData.urlPrefix + "kms/common/attention/isExist.do",
          data: {
            type: 'question',
            attentionId: res.data.searchBean.id,
            userId: app.globalData.userId
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          success: function(res) {
            /* 插入关注状态 */
            console.log(res.data);
            that.data.questionList.searchBean.isOk = res.data.isOk;
            that.setData({
              questionList: that.data.questionList
            });
          }
        });
        that.setData({
          questionList: res.data
        });
        /* 问题内容的富文本解析 */
        WxParse.wxParse('article', 'html', that.data.questionList.searchBean.content, that, 5);
      }
    });


    /* 发起接口请求--回答 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getReplyView&creator=&currentPage=1&key=&model=comments&pageSize=20&questionId=" + options.id + "&type=myTask&userId=" + app.globalData.userId,
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function(res) {



        /*        var article= '<div>我是HTML代码</div>';
         */
        /** 
         * WxParse.wxParse(bindName , type, data,target,imagePadding) 
         * 1.bindName绑定的数据名(必填) 
         * 2.type可以为html或者md(必填) 
         * 3.data为传入的具体数据(必填) 
         * 4.target为Page对象,一般为this(必填) 
         ** 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选) 
         */
        /*         var that = this;
                WxParse.wxParse('article', 'html', article, that, 5);
         */

        console.log("===yyyyyyyyyyyyyyyyyyy===================");

        console.log(res.data);
        that.setData({
          answerList: res.data
        });
        console.log("===============xxx===================");
        console.log(that.data.answerList.pageBean.recordList);

        /*  数组--获得html内容 */
        var replyArr = [];

        /* 遍历 */
        that.data.answerList.pageBean.recordList.forEach((item, index) => {
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

        that.data.answerList.pageBean.recordList.forEach((item, index) => {
          console.log("===========uu=========");
          console.log(item);
          item.reply = that.data.replyTemArray[index];

        });
        /* 循环结束 */

        console.log("oooooooooooooooooooooooooooooooooooooooo");
        console.log(that.data.answerList.pageBean.recordList);
        that.data.answerList.pageBean.recordList.forEach((item, index) => {
          wx.request({
            url: app.globalData.urlPrefix + "kms/common/updown/getCount.do",
            data: {
              objid: item.id,
              module: "reply",
              type: "up"
            },
            method: "POST",
            header: {
              'content-type': 'application/x-www-form-urlencoded' // 默认值
            },
            success: function(res) {

              console.log(res.data);
              item.replyLikeNum = res.data.msg;
              that.setData({
                answerList: that.data.answerList
              });
            }
          });
        });
        that.setData({
          answerList: that.data.answerList
        });
      }
      /* success结束 */

    });

    /* 请求结束 */

    /* 请求喜欢数 --需要延迟10s因为js是异步的*/
    var replyLikeNumArray = [];
    setTimeout(function() {


    }, 5000);


    /* wx.request({
      url: "http://119.29.176.106:8090/kms/common/updown/getCount.do",
      data: {
        objId: item.id,
        module: 'reply',
        type: "up"
      },
      method: "POST",
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {

        console.log(res.data);
      }
    }); */
    /* 请求结束 */




  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    //获得dialog组件
    this.dialog = this.selectComponent("#dialog");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  /* 组件使用 */
  showDialog: function(e) {
    console.log(e.currentTarget.dataset.hfwtid);
    console.log(e.currentTarget.dataset.creator);
    this.setData({
      hfwtid: e.currentTarget.dataset.hfwtid,
      creator: e.currentTarget.dataset.creator
    });
    this.dialog.showDialog();
  },
  //取消事件
  _cancelEvent: function() {
    console.log('你点击了取消');
    this.dialog.hideDialog();
  },
  //确认事件
  _confirmEvent: function() {
    console.log('你点击了确定');
    /* http://119.29.176.106:8090/mobile/execute.do?action=addReply&userId=402881e70be6d209010be75668750014 */
    var that = this;
    if (app.globalData.textAreValue == "") {
      wx.showToast({
        title: "请输入回复内容！",
        icon: 'none',
        duration: 2000
      });
      return;
    }
    wx.request({
      url: app.globalData.urlPrefix + "/mobile/execute.do?action=addReply&userId=" + app.globalData.userId,
      data: {

        questionId: that.data.options.id,
        content: app.globalData.textAreValue,
        pid: that.data.hfwtid,
        toUserId: that.data.creator,

      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {

      }
    });
           /*  添加成功，关闭弹窗 */
        this.dialog.hideDialog(); 
        /* 重新加载本页面 */
        this.onLoad(that.data.options);

  },
  /* 返回上层 */
  returnLastPage: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  expertGz: function(e) {
    /*     http://119.29.176.106:8090/kms/common/attention/add.do
     */
    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + "/kms/common/attention/add.do",
      data: {
        type: 'question',
        attentionId: e.currentTarget.dataset.wtid,
        followerId: app.globalData.userId
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.isOk == 1) {
          that.data.questionList.searchBean.isOk = true;
          that.setData({
            questionList: that.data.questionList
          });
        }
      }
    });
  },
  expertQg: function(e) {
    console.log("jjjjjjjjjjjjjjjjjjjjjjj");
    var that = this;
    console.log(that.data.questionList);
    wx.request({
      url: app.globalData.urlPrefix + "kms/common/attention/delete.do",
      data: {
        type: 'question',
        attentionId: app.globalData.userId,
        followerId: e.currentTarget.dataset.wtid
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.isOk == 1) {
          that.data.questionList.searchBean.isOk = false;
          that.setData({
            questionList: that.data.questionList
          });
        }
      }
    });
  },
  addLikeNum: function(e) {
    /* e.currentTarget.dataset.id */
    var that = this;
    wx.request({
      url: app.globalData.urlPrefix + "kms/common/updown/add.do",
      data: {
        type: 'up',
        module: 'reply',
        objId: e.currentTarget.dataset.id,
        objIdCreator: e.currentTarget.dataset.creator,
        userId: app.globalData.userId
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        if (res.data.isOk == 0) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
        } else if (res.data.isOk == 1) {
          that.data.answerList.pageBean.recordList.forEach((item, index) => {
            if (item.id == e.currentTarget.dataset.id) {
              item.replyLikeNum = item.replyLikeNum + 1;
              that.setData({
                answerList: that.data.answerList
              });
            }
          });
        }

      }
    });
  },
  addRelpy: function(e) {
    /* http://119.29.176.106:8090/mobile/execute.do?action=addReply&userId=402881e70be6d209010be75668750014 */
    var that = this;
    console.log(e.currentTarget.dataset.queid);
    console.log(that.data.inputValue);

    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=addReply&userId=" + app.globalData.userId,
      data: {
        questionId: e.currentTarget.dataset.queid,
        content: that.data.inputValue
      },
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success: function(res) {
        console.log(res.data);
        /*   刷新頁面--跳轉到單前頁面 */
        /*         wx.navigateTo({
                  url: "/pages/noTabBar/interaction/interactiondetail/interaction?id=" + that.data.optionsId
                }); */

        that.onLoad(that.data.options);
      }
    });
  },
  /* 獲取輸入框的內容，每次改變輸入寬的內容的時候都會觸發 */
  bindinput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  }, onPullDownRefresh: function () {
    /* 重新加载本页面 */
    this.onLoad(this.data.options);
  }



})