Page({
  data: {
    meditationTime: 0,
    meditating: false,
    challenge: '本周打卡3个寺院景点',
    challengeProgress: 66,
    timer: null
  },
  onLoad() {
    const saved = wx.getStorageSync('teenMeditationTime') || 0;
    this.setData({ meditationTime: saved });
  },
  goExplore() { wx.showToast({ title: '文化探索加载中', icon: 'none' }); },
  goPuzzle() { wx.showToast({ title: '解谜游戏加载中', icon: 'none' }); },
  goWorkshop() { wx.showToast({ title: '创意工坊加载中', icon: 'none' }); },
  toggleMeditation() {
    if (this.data.meditating) {
      clearInterval(this.data.timer);
      this.setData({ meditating: false });
      wx.setStorageSync('teenMeditationTime', this.data.meditationTime);
    } else {
      const timer = setInterval(() => {
        this.setData({ meditationTime: this.data.meditationTime + 1 });
      }, 1000);
      this.setData({ meditating: true, timer });
    }
  },
  resetMeditation() {
    clearInterval(this.data.timer);
    this.setData({ meditationTime: 0, meditating: false });
    wx.setStorageSync('teenMeditationTime', 0);
  },
  onUnload() {
    if (this.data.timer) clearInterval(this.data.timer);
  }
})
