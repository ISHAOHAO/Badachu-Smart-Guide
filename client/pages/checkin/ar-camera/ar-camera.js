Page({
  data: {
    currentFilter: 'none',
  },

  setFilter(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({ currentFilter: filter })
    wx.showToast({
      title: filter === 'none' ? '已关闭滤镜' : `已切换至${filter === 'gold' ? '金光' : filter === 'lotus' ? '莲花' : '禅意'}滤镜`,
      icon: 'none',
    })
  },

  takePhoto() {
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: (res) => {
        const tempPath = res.tempFilePaths[0]
        const photos = wx.getStorageSync('recent_photos') || []
        const now = new Date()
        const time = `${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`
        photos.unshift({ id: Date.now(), spot: 'AR拍照', photo: tempPath, time })
        wx.setStorageSync('recent_photos', photos.slice(0, 20))
        wx.showToast({ title: '拍照成功', icon: 'success' })
      },
      fail: () => {
        wx.showToast({ title: '已取消拍照', icon: 'none' })
      }
    })
  },

  openGallery() {
    wx.chooseImage({
      count: 1,
      sourceType: ['album'],
      success: (res) => {
        wx.showToast({ title: '已选择照片', icon: 'none' })
      }
    })
  },

  switchCamera() {
    wx.showToast({ title: '已切换摄像头', icon: 'none' })
  }
})
