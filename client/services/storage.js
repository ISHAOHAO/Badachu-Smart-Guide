const storage = {
  get(key) {
    try {
      const value = wx.getStorageSync(key)
      return value || null
    } catch { return null }
  },

  set(key, value) {
    try {
      wx.setStorageSync(key, value)
      return true
    } catch { return false }
  },

  remove(key) {
    try {
      wx.removeStorageSync(key)
      return true
    } catch { return false }
  },

  clear() {
    try {
      wx.clearStorageSync()
      return true
    } catch { return false }
  }
}

export default storage
