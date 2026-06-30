const auth = {
  login() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            wx.getUserProfile({
              desc: '用于完善用户资料',
              success: (userRes) => {
                resolve({ code: res.code, userInfo: userRes.userInfo })
              },
              fail: () => {
                resolve({ code: res.code, userInfo: null })
              }
            })
          } else reject(new Error('登录失败'))
        },
        fail: (err) => reject(err)
      })
    })
  },

  checkLogin() {
    return !!wx.getStorageSync('token')
  },

  logout() {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
    wx.reLaunch({ url: '/pages/home/home' })
  }
}

export default auth
