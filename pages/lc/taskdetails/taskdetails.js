var app = getApp(); // 取得全局App


Page({

  /**
   * 页面的初始数据
   */
  data: {
    lastTitle: "流程",
    /* 上一个页面标题 */
    title: "任务详情",
    hide: "",
    updatecolor: "",
    hideNum: 0,
    /* 底部弹窗相关属性 */
    actionSheetHidden: true,
    actionSheetItems: [{
        bindtap: 'Menu1',
        txt: "查看流转意见"
      },
      {
        bindtap: 'Menu2',
        txt: "退回"
      },
      {
        bindtap: 'Menu3',
        txt: '查看流程图'
      }
    ],
    background: [],
    returnPage: "returnLastPage",
    /* returnLastPage--返回上一级  还有一个方法名 returnTopPage 返回至首层*/
    id: "",
    mainFormList: [],
    detailFormList: []

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    this.setData({
      id: options.id
    });
    /* 
        http://119.29.176.106:8090/mobile/execute.do?action=getWorkflow&id=4028a6815e833e0d015e837f50d4006f&model=workflow&pageSize=20&type=myTask&userId=402881e70be6d209010be75668750014 */
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getWorkflow&id=" + options.id + "&model=workflow&pageSize=20&type=myTask&userId=" + app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function(res) {
        console.log("==============================");

        console.log(res.data.mainFormList);
        console.log(res.data.detailFormList);
        that.setData({
          mainFormList: res.data.mainFormList,
          detailFormList: res.data.detailFormList

        });



      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  /* 返回上一页 */
  returnLastPage: function() {
    wx.navigateBack(1);
  },
  showAndHide: function() {


    if (this.data.hideNum % 2 === 0) {
      this.setData({
        hide: "hideTextArea",
        updatecolor: "updatecolor"

      });
    } else {
      this.setData({
        hide: "",
        updatecolor: ""

      });
    }
    //叠加
    this.setData({
      hideNum: this.data.hideNum + 1

    });
  },

  /* 底部弹窗相关事件 */
  actionSheetTap: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    console.log("打开了弹窗~~~~~~~~~");
  },
  actionSheetbindchange: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    })
    console.log("关闭了弹窗！！");
  },

  bindMenu1: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });

    wx.navigateTo({
      url: "/pages/lc/taskdetails/opinion/opinion?id=" + this.data.id + "&type=1"
    });

  },
  bindMenu2: function() {
    var that = this;
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });

    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getRejectNodeList&model=rejectNodeList&pageSize=20&workflowId=" + this.data.id,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function(res) {
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        console.log(res.data);
        if (res.data.pageBean.recordList[0].id == void(0)) {
          wx.showToast({
            title: res.data.pageBean.recordList[0].msg,
            icon: 'none',
            duration: 2000
          });
          return;
        }
        wx.navigateTo({
          url: "/pages/lc/taskdetails/opinion/opinion?id=" + that.data.id + "&type=2"
        });
      }
    });



  },
  bindMenu3: function() {
    this.setData({
      actionSheetHidden: !this.data.actionSheetHidden
    });
  },
  /* 触摸变色 */
  itemTouchStart: function(e) {

    console.log("触摸开始=============");
    var array = app.globalData.array;

    if (e.target.id == 0) { //第一个
      array[0] = "bc-select";
      this.setData({
        background: array
      });
    } else if (e.target.id == 1) {

      array[1] = "bc-select";
      this.setData({
        background: array
      });
    } else if (e.target.id == 2) {
      array[2] = "bc-select";
      this.setData({
        background: array
      });
    } else if (e.target.id == 3) {
      array[3] = "bc-select";
      this.setData({
        background: array
      });
    }

    app.globalData.array = array;



  },
  /* 触摸变色 */
  itemTouchEnd: function(e) {
    console.log("触摸结束=============");

    var array = app.globalData.array;
    if (e.target.id == 0) { //第一个
      array[0] = "";
      this.setData({
        background: array
      });
    } else if (e.target.id == 1) {
      array[1] = "";
      this.setData({
        background: array
      });
    } else if (e.target.id == 2) {
      array[2] = "";
      this.setData({
        background: array
      });
    } else if (e.target.id == 3) {
      array[3] = "";
      this.setData({
        background: array
      });
    }
  },
  /* 返回上层 */
  returnLastPage: function() {
    wx.navigateBack({
      delta: 1
    });
  },
  saveItem: function(e) {
    wx.request({
      url: app.globalData.urlPrefix + "mobile/execute.do?action=getRejectNodeList&model=rejectNodeList&pageSize=20&workflowId=" + this.data.id,
      data: {
        "action": "submitForm",
        "model": "formsubmit",
        "userId": "4028816a15e947840115e970f7b50005",
        "layoutId": "402881b55bf50f7e015bf624767f0033",
        "formDataList": [{
          "tableId": "402881b55bf50f7e015bf5aa0c1d000f",
          "dataList": [{
            "dataId": "2c923dae6277bd6101627c91187e009e",
            "fieldList": []
          }]
        }],
        "remark": "1231",//內容
        "workflowId": "2c923dae6277bd6101627c91182e0098"
      },
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function(res) {
        console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmmm");
        console.log(res.data);
        if (res.data.pageBean.recordList[0].id == void(0)) {
          wx.showToast({
            title: res.data.pageBean.recordList[0].msg,
            icon: 'none',
            duration: 2000
          });
          return;
        }
        wx.navigateTo({
          url: "/pages/lc/taskdetails/opinion/opinion?id=" + that.data.id + "&type=2"
        });
      }
    });
  }

})