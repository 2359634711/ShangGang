const serverUri = "http://shanggangapi.yika.co/"
const header = {
  'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
  'AUTHORIZATIONS': wx.getStorageSync('token')
}
const dubbger = true;
const request = (type, data) => new Promise((resolve, reject) => wx.request({
  url: serverUri + type + '?openid=' + wx.getStorageSync('openid'),
  data,
  header,
  method: data ? 'POST' : 'POST',
  dataType: 'json',
  responseType: 'text',
  success: function(res) {
    resolve(res)
  },
  fail: function(res) {
    reject(res)
  }
}))



const api = {

  // user相关
  user: {
    login: data => request(data),

  },


  // 首页相关



  // 分享相关
  share: {

  },


  //

}




module.exports = {
  dubbger,
  serverUri,
  header,
  getDoctorList: () => request('index/lb'),
  getDoctorDetail: data => request('index/ysxq', data),
  getFwInfo: data => {
    let type = ''
    if (data.type == 0) {
      //图文
      type = 'index/twwz_xq'
    } else {
      type = 'index/spwz_xq'
    }
    return request(type, data)
  },
  getCaseList: data => request('alk/alk_lb', data),
  getCaseDetail: data => request('alk/alk_xq', data),
  getClinicList: () => request('zs/zs_lb'),
  getClinicDetail: data => request('zs/zs_xq', data),
  getShare: () => request('senke.tuijian.get_share'),
  shareclum: data => request('senke.tuijian.fenxiang', data),
  auth: data => request('index/zc', data),
  getOpenId: data => request('index/login', data),
  getAddressList: () => request('dz/dz_lb'),
  addAddress: (data) => request('dz/dz_add', data),
  editAddress: (data) => request('dz/dz_edit', data),
  delAddress: data => request('dz/dz_del', data),
  getReferList: data => request('tj/tj_lb', data),
  referStore: data => request('tj/fx', data)
}