var app = getApp(); // 取得全局App
var indexUtils = require("../../utils/util.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "流程",
    option1: true,
    option2: false,
    option3: false,
    optionTitle: ["待办", "已办", "知会"],
    headAdd: true /* 是否有加号？ */,
    recordListDb:[],
    recordListYb:[],
    recordListZh:[],
    qxIshow: false
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
    
    this.setData({
      options: options
    });
    var that = this;
   /*  发起接口请求--待办 */
    wx.request({
      url: app.globalData.urlPrefix +"mobile/execute.do?action=getWorkflowList&creator=&currentPage=1&key=myTask&model=workflow&objname=&pageSize=20&type=myTask&userId="+app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListDb: res.data.pageBean.recordList
        });
  
       //调用构建检索逻辑的json
        indexUtils.serachJson(res.data.pageBean.recordList);
       //将原数据存入缓存1
        wx.setStorage({
          key: 'recordListDb',
          data: res.data.pageBean.recordList,
        });


        if (that.data.recordListDb === undefined || that.data.recordListDb.length == 0) {
          console.log("===============数组1为空");
        }

      }
    });

    /*  发起接口请求-已办 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getWorkflowList&creator=&currentPage=1&key=myRelative&model=workflow&objname=&pageSize=20&type=myRelative&userId="+app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListYb: res.data.pageBean.recordList
        });


        //调用构建检索逻辑的json
        indexUtils.serachJson(res.data.pageBean.recordList);
        //检索存入2
        wx.setStorage({
          key: 'recordListYb',
          data: res.data.pageBean.recordList,
        });


        if (that.data.recordListYb === undefined || that.data.recordListYb.length == 0) {
          console.log("===============数组2为空");
        }
      }
    });

    /*  发起接口请求-知会 */
    wx.request({
      url: app.globalData.urlPrefix+"mobile/execute.do?action=getWorkflowList&creator=&currentPage=1&key=myNotice&model=workflow&objname=&pageSize=20&type=myNotice&userId="+app.globalData.userId,
      header: {
        'content-type': 'application/json;utf-8' // 默认值
      },
      success: function (res) {
        console.log(res.data.pageBean.recordList);
        that.setData({
          recordListZh: res.data.pageBean.recordList
        });

        //调用构建检索逻辑的json
        indexUtils.serachJson(res.data.pageBean.recordList);
        //检索存入3
        wx.setStorage({
          key: 'recordListZh',
          data: res.data.pageBean.recordList,
        });

        if (that.data.recordListZh === undefined || that.data.recordListZh.length == 0) {
          console.log("===============数组3为空");
        }

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
  itemTap: function(e) {
   
    console.log("item被点击=============");
    var urlx = "/pages/lc/taskdetails/taskdetails?id=" + e.currentTarget.dataset.id;
    wx.navigateTo({
      url: urlx
    });
  },
  /* 跳转到添加页面 */
  addItem:function(){
    wx.navigateTo({
      url: "/pages/lc/addflow/addflow?title=" + this.data.title
    });
  }, onPullDownRefresh: function () {
    /* 重新加载本页面 */
    this.onLoad(this.data.options);
  },
  input1: function (e) {//输入时，实时调用的方法
    
    this.search(e.detail.value);

  },
  confirm1: function (e) {//软键盘搜索
    this.search(e.detail.value);

  },
  search: function (key) { //搜索方法 key 查询字段
    var that = this;
    var arr1 =[];
    var arr2 =[];
    var arr3 =[];

    //==============待办=======================================

    try {
      var value1 = wx.getStorageSync('recordListDb');
      console.log(value1);

        
          for (let i in value1) {
          value1[i].show = false;//所有数据隐藏
          if (value1[i].search.indexOf(key) >= 0) {//查找
            value1[i].show = true;//匹配到的数据显示
            arr1.push(value1[i]);
          }
        
      }
    } catch (e) {
      // Do something when catch error
    }




    //==============2=======================================
    try {
      var value2 = wx.getStorageSync('recordListYb');
      console.log(value2);

  
        for (let i in value2) {
          value2[i].show = false;//所有数据隐藏
          if (value2[i].search.indexOf(key) >= 0) {//查找
            value2[i].show = true;//匹配到的数据显示
            arr2.push(value2[i]);
          }
        }
      
    } catch (e) {
      // Do something when catch error
    }

//==============3=======================================


    try {
      var value3 = wx.getStorageSync('recordListZh');
      console.log(value3);


        for (let i in value3) {
          value3[i].show = false;//所有数据隐藏
          if (value3[i].search.indexOf(key) >= 0) {//查找
            value3[i].show = true;//匹配到的数据显示
            arr3.push(value3[i]);
          }
        }
      
    } catch (e) {
      // Do something when catch error
    }


   that.setData({
     recordListDb: arr1,
     recordListYb: arr2,
     recordListZH: arr3,
   });


   if (key == "") {
     that.setData({
       recordListDb: value1,
       recordListYb: value2,
       recordListZh: value3,
       qxIshow:false//没有内容不显示×
     });
     
   }else{
     that.setData({
       qxIshow: true//
     });

   }

  },
  cleanSe:function(e){
    this.setData({
 //

    });
  }
})
