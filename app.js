App({
  globalData: {
    userInfo: null,
    fortuneLight: 0,
    badges: [],
    checkins: [],
    currentAgeZone: 'adult',
    zenSoundEnabled: true,
    soundLevel: 50,
    isLoggedIn: false
  },
  onLaunch() {
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.globalData.userInfo = userInfo
      this.globalData.isLoggedIn = true
    }
  },
  checkLogin() {
    return this.globalData.isLoggedIn
  },
  showToast(title, icon = 'none') {
    wx.showToast({ title, icon, duration: 2000 })
  }
})
