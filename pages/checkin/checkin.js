const SPOTS = [
  { id: 1, name: '大雄宝殿', icon: '/images/spot1.png', checked: false },
  { id: 2, name: '天王殿', icon: '/images/spot2.png', checked: false },
  { id: 3, name: '藏经阁', icon: '/images/spot3.png', checked: false },
  { id: 4, name: '钟楼', icon: '/images/spot4.png', checked: false },
  { id: 5, name: '鼓楼', icon: '/images/spot5.png', checked: false },
  { id: 6, name: '放生池', icon: '/images/spot6.png', checked: false },
  { id: 7, name: '祖师殿', icon: '/images/spot7.png', checked: false },
  { id: 8, name: '观音殿', icon: '/images/spot8.png', checked: false },
]

Page({
  data: {
    spots: [],
    checkedCount: 0,
    hiddenFound: 0,
    recentPhotos: [],
  },

  onLoad() {
    const savedSpots = wx.getStorageSync('checkin_spots') || SPOTS
    const savedHidden = wx.getStorageSync('hidden_found_count') || 0
    const recentPhotos = wx.getStorageSync('recent_photos') || []
    const checkedCount = savedSpots.filter(s => s.checked).length
    this.setData({ spots: savedSpots, checkedCount, hiddenFound: savedHidden, recentPhotos })
  },

  onShow() {
    this.onLoad()
  },

  onSpotTap(e) {
    const id = e.currentTarget.dataset.id
    const spot = this.data.spots.find(s => s.id === id)
    if (spot.checked) return

    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: (res) => {
        const tempPath = res.tempFilePaths[0]
        const spots = this.data.spots.map(s => {
          if (s.id === id) s.checked = true
          return s
        })
        const checkedCount = spots.filter(s => s.checked).length
        const recentPhotos = this._addRecentPhoto(spot.name, tempPath)

        wx.setStorageSync('checkin_spots', spots)
        wx.setStorageSync('recent_photos', recentPhotos)
        wx.setStorageSync('blessing_light', (wx.getStorageSync('blessing_light') || 0) + 10)

        this.setData({ spots, checkedCount, recentPhotos })

        wx.showToast({ title: '打卡成功 +10福光', icon: 'none' })
      },
      fail: () => {
        wx.showToast({ title: '已取消拍照', icon: 'none' })
      }
    })
  },

  _addRecentPhoto(spotName, photoPath) {
    const now = new Date()
    const time = `${now.getMonth()+1}/${now.getDate()} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`
    const photos = this.data.recentPhotos.slice()
    photos.unshift({ id: Date.now(), spot: spotName, photo: photoPath, time })
    return photos.slice(0, 4)
  },

  goHiddenSpot() {
    wx.navigateTo({ url: '/pages/checkin/hidden-spot/hidden-spot' })
  },

  viewPhoto(e) {
    const url = e.currentTarget.dataset.url
    wx.previewImage({ urls: [url] })
  }
})
