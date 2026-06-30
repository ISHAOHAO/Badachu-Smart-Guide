Page({
  data: {
    treasures: [
      { name: '香', emoji: '🪔', desc: '虔诚之香', collected: false },
      { name: '花', emoji: '🌸', desc: '供养之花', collected: false },
      { name: '灯', emoji: '🪔', desc: '智慧之灯', collected: false },
      { name: '果', emoji: '🍎', desc: '善缘之果', collected: false },
      { name: '珠', emoji: '📿', desc: '念诵之珠', collected: false },
      { name: '经', emoji: '📜', desc: '般若之经', collected: false },
      { name: '钟', emoji: '🔔', desc: '觉醒之钟', collected: false },
      { name: '幡', emoji: '🚩', desc: '圆满之幡', collected: false },
    ],
    exchangeList: [
      { name: 'AR滤镜', icon: '🎭', cost: 50, owned: false },
      { name: '精致壁纸', icon: '🖼️', cost: 30, owned: false },
      { name: '表情包', icon: '😊', cost: 20, owned: false },
      { name: '禅音铃声', icon: '🔔', cost: 50, owned: false },
      { name: '专属头像框', icon: '🖼️', cost: 80, owned: false },
    ],
    collectedCount: 0,
    collectProgress: 0,
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const collected = wx.getStorageSync('treasures') || []
    const owned = wx.getStorageSync('exchanges') || []
    const treasures = this.data.treasures.map((t, i) => ({ ...t, collected: collected.includes(i) }))
    const exchangeList = this.data.exchangeList.map((e, i) => ({ ...e, owned: owned.includes(i) }))
    const collectedCount = treasures.filter(t => t.collected).length
    const collectProgress = Math.round((collectedCount / treasures.length) * 100)
    this.setData({ treasures, exchangeList, collectedCount, collectProgress })
  },

  onCollect(e) {
    const idx = e.currentTarget.dataset.index
    const treasures = this.data.treasures
    if (treasures[idx].collected) {
      wx.showToast({ title: '已收集', icon: 'none' })
      return
    }
    const fuguang = wx.getStorageSync('fuguang') || 0
    if (fuguang < 10) {
      wx.showToast({ title: '福光不足（需10）', icon: 'none' })
      return
    }
    wx.setStorageSync('fuguang', fuguang - 10)
    const collected = wx.getStorageSync('treasures') || []
    collected.push(idx)
    wx.setStorageSync('treasures', collected)
    treasures[idx].collected = true
    const collectedCount = collected.length
    const collectProgress = Math.round((collectedCount / treasures.length) * 100)
    this.setData({ treasures, collectedCount, collectProgress })
    wx.showToast({ title: '收集成功！-10福光', icon: 'none' })
  },

  onExchange(e) {
    const idx = e.currentTarget.dataset.index
    const item = this.data.exchangeList[idx]
    if (item.owned) {
      wx.showToast({ title: '已拥有', icon: 'none' })
      return
    }
    const fuguang = wx.getStorageSync('fuguang') || 0
    if (fuguang < item.cost) {
      wx.showToast({ title: '福光不足', icon: 'none' })
      return
    }
    wx.showModal({
      title: '确认兑换',
      content: '消耗' + item.cost + '福光兑换' + item.name + '？',
      success: (res) => {
        if (res.confirm) {
          wx.setStorageSync('fuguang', fuguang - item.cost)
          const owned = wx.getStorageSync('exchanges') || []
          owned.push(idx)
          wx.setStorageSync('exchanges', owned)
          const exchangeList = this.data.exchangeList
          exchangeList[idx].owned = true
          this.setData({ exchangeList })
          wx.showToast({ title: '兑换成功！', icon: 'none' })
        }
      },
    })
  },
})
