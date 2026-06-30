const SEGMENTS = [
  { label: '谢谢参与', color: '#95a5a6', prize: null },
  { label: '20福光', color: '#D4A84B', prize: 20 },
  { label: '50福光', color: '#C0392B', prize: 50 },
  { label: '100福光', color: '#8e44ad', prize: 100 },
  { label: '200福光', color: '#e67e22', prize: 200 },
  { label: '500福光', color: '#27ae60', prize: 500 },
]

Page({
  data: {
    segments: SEGMENTS,
    segAngle: 360 / SEGMENTS.length,
    rotateOffset: 0,
    fuguang: 0,
    freeChances: 1,
    isSpinning: false,
    prizePool: [
      { name: '普通（20~50福光）', rate: '60%', color: '#D4A84B' },
      { name: '稀有（100福光）', rate: '30%', color: '#8e44ad' },
      { name: '史诗（200福光）', rate: '8%', color: '#e67e22' },
      { name: '传说（500福光）', rate: '2%', color: '#C0392B' },
    ],
    wheelAnim: {},
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const fuguang = wx.getStorageSync('fuguang') || 0
    const today = new Date().toDateString()
    const lotteryData = wx.getStorageSync('lottery_' + today) || { freeUsed: false }
    const freeChances = lotteryData.freeUsed ? 0 : 1
    this.setData({ fuguang, freeChances })
  },

  onSpin() {
    if (this.data.isSpinning) return
    const fuguang = this.data.fuguang
    const freeChances = this.data.freeChances

    if (freeChances === 0 && fuguang < 100) {
      wx.showToast({ title: '福光不足（需100）', icon: 'none' })
      return
    }

    this.setData({ isSpinning: true })

    const prizeIndex = this.getPrizeIndex()
    const prize = SEGMENTS[prizeIndex].prize
    const targetAngle = 360 * 5 + (360 / SEGMENTS.length) * prizeIndex

    this.setData({
      rotateOffset: this.data.rotateOffset + targetAngle,
      wheelAnim: { rotate: this.data.rotateOffset + targetAngle },
    })

    setTimeout(() => {
      if (freeChances === 1) {
        const today = new Date().toDateString()
        wx.setStorageSync('lottery_' + today, { freeUsed: true })
        this.setData({ freeChances: 0 })
      } else {
        wx.setStorageSync('fuguang', fuguang - 100)
        this.setData({ fuguang: fuguang - 100 })
      }

      if (prize) {
        const newFuguang = (wx.getStorageSync('fuguang') || 0) + prize
        wx.setStorageSync('fuguang', newFuguang)
        this.setData({ fuguang: newFuguang })
        wx.showModal({ title: '恭喜中奖！', content: '获得 ' + prize + ' 福光', showCancel: false })
      } else {
        wx.showToast({ title: '谢谢参与', icon: 'none' })
      }

      this.setData({ isSpinning: false })
    }, 3000)
  },

  getPrizeIndex() {
    const r = Math.random() * 100
    if (r < 2) return 5
    if (r < 10) return 4
    if (r < 40) return 3
    if (r < 70) return 1
    if (r < 90) return 2
    return 0
  },
})
