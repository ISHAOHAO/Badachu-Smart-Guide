Page({
  data: {
    chanYin: true,
    notification: true,
    lang: 'zh',
    fontSize: 'small',
    cacheSize: '估算中...',
  },

  onShow() {
    this.loadSettings()
  },

  loadSettings() {
    const settings = wx.getStorageSync('appSettings') || {}
    this.setData({
      chanYin: settings.chanYin !== undefined ? settings.chanYin : true,
      notification: settings.notification !== undefined ? settings.notification : true,
      lang: settings.lang || 'zh',
      fontSize: settings.fontSize || 'small',
    })
    this.getCacheSize()
  },

  saveSettings() {
    const { chanYin, notification, lang, fontSize } = this.data
    wx.setStorageSync('appSettings', { chanYin, notification, lang, fontSize })
  },

  onToggleChanYin(e) {
    this.setData({ chanYin: e.detail.value })
    this.saveSettings()
  },

  onToggleNotification(e) {
    this.setData({ notification: e.detail.value })
    this.saveSettings()
  },

  onSetLang(e) {
    this.setData({ lang: e.currentTarget.dataset.lang })
    this.saveSettings()
    wx.showToast({ title: this.data.lang === 'en' ? 'Language set to English' : '语言已切换为中文', icon: 'none' })
  },

  onSetFontSize(e) {
    this.setData({ fontSize: e.currentTarget.dataset.size })
    this.saveSettings()
    wx.showToast({ title: '字体大小已更新', icon: 'none' })
  },

  getCacheSize() {
    const keys = wx.getStorageInfoSync().keys || []
    let total = 0
    keys.forEach(k => {
      const v = wx.getStorageSync(k)
      total += JSON.stringify(v).length
    })
    const size = total > 1024 * 1024 ? (total / 1024 / 1024).toFixed(1) + 'MB' : total > 1024 ? (total / 1024).toFixed(1) + 'KB' : total + 'B'
    this.setData({ cacheSize: size })
  },

  onClearCache() {
    wx.showModal({
      title: '清理缓存',
      content: '确定要清理所有缓存数据吗？福光余额等账户数据不会丢失。',
      success: (res) => {
        if (res.confirm) {
          const fuguang = wx.getStorageSync('fuguang')
          const settings = wx.getStorageSync('appSettings')
          wx.clearStorageSync()
          if (fuguang) wx.setStorageSync('fuguang', fuguang)
          if (settings) wx.setStorageSync('appSettings', settings)
          this.getCacheSize()
          wx.showToast({ title: '缓存已清理', icon: 'none' })
        }
      },
    })
  },

  onAbout() {
    wx.showModal({
      title: '关于我们',
      content: '八大处文化互动小程序 v1.0\n\n在行走中修行，在游览中集福。\n通过游戏化互动，深入了解八大处佛教文化。',
      showCancel: false,
    })
  },
})
