// components/ydList/ydList.js
const util = require('../../utils/util.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    itemClick(e) {
      let item = e.currentTarget.dataset.item;
      let uri = 'ydDetail/ydDetail'
      util.navigateTo({
        url: '/pages/user/service/' + uri
      })
    },
  }
})