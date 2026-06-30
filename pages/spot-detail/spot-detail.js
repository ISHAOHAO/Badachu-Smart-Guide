import { mockSpots } from '../../mock/spots'

Page({
  data: {
    spot: {},
    isPlaying: false,
    audioProgress: 0
  },

  onLoad(options) {
    const id = parseInt(options.id)
    const spot = mockSpots.find(s => s.id === id) || mockSpots[0]
    this.setData({ spot })
  },

  playAudio() {
    if (this.data.isPlaying) {
      this.setData({ isPlaying: false, audioProgress: 0 })
    } else {
      this.setData({ isPlaying: true })
      let progress = 0
      this._timer = setInterval(() => {
        progress += 2
        if (progress >= 100) {
          clearInterval(this._timer)
          this.setData({ isPlaying: false, audioProgress: 0 })
        } else {
          this.setData({ audioProgress: progress })
        }
      }, 200)
    }
  },

  goCheckin() {
    wx.switchTab({ url: '/pages/checkin/checkin' })
  },

  goNavigate() {
    const { spot } = this.data
    wx.openLocation({
      latitude: spot.latitude,
      longitude: spot.longitude,
      name: spot.name,
      scale: 18
    })
  },

  onUnload() {
    if (this._timer) clearInterval(this._timer)
  }
})