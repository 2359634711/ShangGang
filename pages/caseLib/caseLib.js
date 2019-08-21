// pages/caseLib/caseLib.js
const util = require('../../utils/util.js')
const { getCaseList } = require('../../utils/api.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navTitleInfo: {

      type: 'left',
      currentNavIndex: 0,
      navList: [{
        id: 0,
        title: '荨麻疹'
      },
      {
        id: 1,
        title: '白癜风'
      },
      {
        id: 2,
        title: '牛皮癣'
      },
      {
        id: 3,
        title: '鱼鳞病'
      },
      {
        id: 4,
        title: '皮肤过敏'
      }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getCaseList()
  },
  getCaseList() {
    getCaseList({ type_id: this.data.navTitleInfo.currentNavIndex + 1 }).then(res => {
      console.log(res)
      if (res.data.status == 0) {
        let data = res.data.code;
        //动态设置navTitle
        this.setData({
          ['navTitleInfo.navList']: data.type.map(val => ({ id: val.type_id - 1, title: val.type_name }))
        })
        //设置内容
        this.setData({
          ...this.data,
          caseList: [...data.data]
        })
      }
    })
  },
  onItemClick(e) {
    let item = e.currentTarget.dataset.item;
    util.navigateTo({ url: '/pages/caseLib/caseDetail/caseDetail?alk_id='+item.alk_id })
  },
  onNavTitleChange(e) {
    let id = e.detail.id;
    this.setData({
      ['navTitleInfo.currentNavIndex']: id
    })
    this.getCaseList()
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

  }
})