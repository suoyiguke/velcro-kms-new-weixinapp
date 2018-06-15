var app = getApp(); // 取得全局App
/* 引入富文本插件 */
var WxParse = require('../../../../plugin/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "问答详情",
    questionList:{},
    answerList:[],
    urlPrefix: app.globalData.urlPrefix,
    lastTitle:"问答",
    returnPage: "returnLastPage", /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/ 

  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    console.log(options.id);
    var that = this;

    /* 发起接口请求--問題 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getFaqView&creator=&id=" + options.id+"&key=myTask&model=questioninfo&pageSize=20&type=myTask",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log("问题=================》");

        console.log(res.data);
        that.setData({
          questionList: res.data
        });
        
        /* 问题内容的富文本解析 */
        WxParse.wxParse('article', 'html', that.data.questionList.searchBean.content, that, 5);


      }
    });


    /* 发起接口请求--回答 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getReplyView&creator=&currentPage=1&key=&model=comments&pageSize=20&questionId=" + options.id+"&type=myTask&userId=8ae08bac4235c9cf01423696a91708c6",
      data: {
        x: '',
        y: ''
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {

        

/*        var article= '<div>我是HTML代码</div>';
 */        /** 
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

        console.log(res.data);
        that.setData({
          answerList: res.data
        });
        console.log("===============xxx===================");
        console.log(that.data.answerList.pageBean.recordList);
        
        /*  数组--获得html内容 */
        var replyArr = [];

        /* 遍历 */
        that.data.answerList.pageBean.recordList.forEach((item,index) => {
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

        console.log("===========zz=========");
        console.log(that.data.answerList.pageBean.recordList);
        that.setData({
          answerList: that.data.answerList
        });



      }
      /* success结束 */

    });

  /* 请求结束 */

    /* 请求喜欢数 --需要延迟10s因为js是异步的*/
    var replyLikeNumArray = [];
    setTimeout(function () {
    console.log("oooooooooooooooooooooooooooooooooooooooo");
    console.log(that.data.answerList.pageBean.recordList);

    that.data.answerList.pageBean.recordList.forEach((item, index) => {
      wx.request({
        url: app.globalData.urlPrefix +"kms/common/updown/getCount.do",
        data: {
          "objid": item.id,
          "module": "reply",
          "type": "up"
        },
        method: "POST",
        header: {
          'content-type': 'application/json;utf-8' // 默认值
        },
        success: function (res) {

          console.log(res.data);
          item.replyLikeNum = res.data.msg;
        }
      });
    });

    that.setData({
      answerList: that.data.answerList
    });

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

/* 组件使用 */
  showDialog:function() {
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
    this.dialog.hideDialog();
  },  /* 返回上层 */
  returnLastPage: function () {
    wx.navigateBack({
      delta: 1
    });
  }



})