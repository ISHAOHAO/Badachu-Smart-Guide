const location = {
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      wx.getLocation({
        type: 'gcj02',
        isHighAccuracy: true,
        highAccuracyExpireTime: 3000,
        success: (res) => resolve(res),
        fail: (err) => {
          if (err.errMsg.includes('auth deny')) {
            wx.showModal({
              title: '定位权限',
              content: '需要定位权限才能使用导览功能',
              success: (modalRes) => {
                if (modalRes.confirm) wx.openSetting()
              }
            })
          }
          reject(err)
        }
      })
    })
  },

  openLocation(latitude, longitude, name) {
    wx.openLocation({
      latitude,
      longitude,
      name,
      scale: 18
    })
  },

  chooseLocation() {
    return new Promise((resolve, reject) => {
      wx.chooseLocation({
        success: (res) => resolve(res),
        fail: (err) => reject(err)
      })
    })
  }
}

export default location
