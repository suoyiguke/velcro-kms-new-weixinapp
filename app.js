App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function() {
    console.log("========onLaunch================");

    var that = this;
    console.log("==========app.js初始请求开始==========");

    wx.login({
      success: function(res) {
        console.log(res.code)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://localhost:8080/mobile/weixin/checkUser.do',
            data: {
              js_code: res.code
            },
            header: {
              'content-type': 'application/json;utf-8' // 默认值
            },
            success: function(res) {
              console.log(res.data);
              /* 存入全局变量！ */
              //将 userid单独存入全局变量
              that.globalData.userInfo = res.data;
              that.globalData.userId = res.data.id;

              wx.request({
                url: that.globalData.urlPrefix + "mobile/execute.do?action=getHomeSetitem&model=homeSetitem&pageSize=20&pipeId=8ae8e83a573b2d8a01573ca724240344&userId=" + res.data.id,
                header: {
                  'content-type': 'application/json;utf-8' // 默认值
                },
                success: function(resx) {
                  console.log(resx.data);
                  console.log("==========app.js初始请求结束==========");

                  try {
                    wx.setStorageSync('workflownum', resx.data.workflownum);
                  } catch (e) {
                  }

                }

              });

              
            }
          });

        } else {
          console.log('登录失败！请检查网络连接' + res.errMsg)
        }
      }
    });



    
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function(options) {
    console.log("========onShow================");

  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function() {
    console.log("========onHide================");

  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function(msg) {
    console.log("========onError================");

  },
  //全局变量
  globalData: {
    array: new Array("", "", "", ""),
    urlPrefix: "http://119.29.176.106:8090/",
    userId: "",
    userInfo: "",
    textAreValue: ""


  }
})