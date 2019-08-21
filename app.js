//app.js
const { dubbger, getOpenId } = require('./utils/api.js')
App({
  onLaunch: function () {
    let _log = console.log
    var getStackTrace = function () {
      var obj = {};
      Error.captureStackTrace(obj, getStackTrace);
      return obj.stack;
    };
    console.log = (data) => {
      if (!dubbger) {
        return
      }
      //data = typeof data == "object" ? JSON.stringify(data):data;
      var stack = getStackTrace() || ""
      var matchResult = stack.split('at') || []
      let paramsStart = ['%c------dubbger log Start------\n', 'color:red;']
      let paramsEnd = ['%c------log End------\n', 'color:red;']
      _log('dubbger ', matchResult[2], data)
    }
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    //获取theme

    wx.login({
      success: (res) => {
        console.log(res)
        getOpenId({ code: res.code }).then(res => {
          if(res.data.status == 0){
            let data = res.data.code;
            console.log(data)
            wx.setStorageSync('openid', data.openid)
            wx.setStorageSync('session_key', data.session_key)
          }
        })
      }
    })


    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})