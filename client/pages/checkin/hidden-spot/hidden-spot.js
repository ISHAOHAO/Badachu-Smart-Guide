const HIDDEN_SPOTS = [
  { id: 1, name: '古树佛影', type: '梵音', signalRequired: 3, found: false },
  { id: 2, name: '洞天福地', type: '磬音', signalRequired: 2, found: false },
  { id: 3, name: '摩崖石刻', type: '梵音', signalRequired: 3, found: false },
  { id: 4, name: '竹林精舍', type: '风铃', signalRequired: 1, found: false },
  { id: 5, name: '明月池', type: '磬音', signalRequired: 2, found: false },
  { id: 6, name: '菩提树下', type: '梵音', signalRequired: 3, found: false },
]

let exploreTimer = null

Page({
  data: {
    hiddenSpots: [],
    foundCount: 0,
    exploring: false,
    signalLevel: 0,
    distanceHint: '点击开始探寻',
  },

  onLoad() {
    const saved = wx.getStorageSync('hidden_spots') || HIDDEN_SPOTS
    const foundCount = saved.filter(s => s.found).length
    this.setData({ hiddenSpots: saved, foundCount })
  },

  toggleExplore() {
    if (this.data.exploring) {
      this._stopExplore()
    } else {
      this._startExplore()
    }
  },

  _startExplore() {
    this.setData({ exploring: true, signalLevel: 0, distanceHint: '正在寻找信号...' })

    if (exploreTimer) clearInterval(timer)

    let tick = 0
    exploreTimer = setInterval(() => {
      tick++
      const level = Math.min(4, Math.floor(tick / 8) + (tick % 3 === 0 ? 1 : 0))
      const hints = [
        '信号微弱，继续移动...',
        '信号增强，靠近中...',
        '信号良好，就在附近',
        '信号强烈！请仔细观察周围',
        '信号极强！隐藏点就在此处',
      ]
      const hint = hints[Math.min(level, 4)]
      this.setData({ signalLevel: level, distanceHint: hint })
      if (level >= 4) {
        this._stopExplore()
        wx.showToast({ title: '发现附近有隐藏点！', icon: 'none' })
      }
    }, 2000)
  },

  _stopExplore() {
    if (exploreTimer) {
      clearInterval(exploreTimer)
      exploreTimer = null
    }
    this.setData({ exploring: false, distanceHint: '探寻已停止' })
  },

  onSpotTap(e) {
    const id = e.currentTarget.dataset.id
    const spot = this.data.hiddenSpots.find(s => s.id === id)
    if (spot.found) {
      wx.showToast({ title: '已发现此隐藏点', icon: 'none' })
      return
    }
    if (this.data.signalLevel < spot.signalRequired) {
      wx.showToast({ title: '信号不足，请靠近后再试', icon: 'none' })
      return
    }

    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      success: (res) => {
        const spots = this.data.hiddenSpots.map(s => {
          if (s.id === id) s.found = true
          return s
        })
        const foundCount = spots.filter(s => s.found).length

        wx.setStorageSync('hidden_spots', spots)
        wx.setStorageSync('hidden_found_count', foundCount)
        wx.setStorageSync('blessing_light', (wx.getStorageSync('blessing_light') || 0) + 50)

        this.setData({ hiddenSpots: spots, foundCount })

        wx.showToast({ title: '隐藏打卡成功 +50福光', icon: 'none' })
      },
      fail: () => {
        wx.showToast({ title: '已取消', icon: 'none' })
      }
    })
  },

  onUnload() {
    this._stopExplore()
  }
})
