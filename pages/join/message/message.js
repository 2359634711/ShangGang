// pages/join/message/message.js
const app = getApp()
const api = require('../../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paySuccFlag: false,
    upgreadInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '加入合伙人',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    this.getUpgreadUpInfo()
  },
  getUpgreadUpInfo() {
    let upgreadInfo = wx.getStorageSync('upgreadInfo');
    //if (upgreadInfo) {} else {
      api.getUpgreadUpInfo(app.globalData.openid,{type:0}).then(res => {
        console.log(res)
        upgreadInfo = res.data;
        wx.setStorageSync('upgreadInfo', res.data)
        this.setData({
          upgreadInfo
        })
      })
    //}
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  payClick(){
    this.setData({
      paySuccFlag: true
    })
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
})