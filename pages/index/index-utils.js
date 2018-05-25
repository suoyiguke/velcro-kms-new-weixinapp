//页面跳转方法 
//参数 页面id


/* 申明 */
var pageJump = function (id) {
  var urlx = "";
  switch (id) {
    case "1":
      urlx = "/pages/lc/lc";
      wx.switchTab({
        url: urlx
      });
      break;
    case "2":
      urlx = "/pages/txl/txl";
      wx.switchTab({
        url: urlx
      });
      break;
    case "3":
      urlx = "/pages/noTabBar/doc/doc";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "4":
      urlx = "/pages/noTabBar/message/message";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "5":
      urlx = "/pages/noTabBar/notice/notice";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "6":
      urlx = "/pages/noTabBar/project/project";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "7":
      urlx = "/pages/noTabBar/contract/contract";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "8":
      urlx = "/pages/noTabBar/customer/customer";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "9":
      urlx = "/pages/noTabBar/expert/expert";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "10":
      urlx = "/pages/noTabBar/interaction/interaction";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "11":
      urlx = "/pages/noTabBar/team/team";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "12":
      urlx = "/pages/noTabBar/encyclopedias/encyclopedias";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "13":
      urlx = "/pages/noTabBar/vote/vote";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "14":
      urlx = "/pages/noTabBar/examination/examination";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "15":
      urlx = "/pages/noTabBar/questionnaire/questionnaire";
      wx.navigateTo({
        url: urlx
      });
      break;
    case "16":
      urlx = "/pages/noTabBar/map/map";
      wx.navigateTo({
        url: urlx
      });
      break;
    default:
      console.log("===============");
  }
}


/* 暴露方法 */
module.exports.pageJump = pageJump;
