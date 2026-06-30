Page({
  data: {
    healthTips: [
      { icon: '🧘', title: '静坐养生', desc: '每日静坐15分钟，调和气血' },
      { icon: '🥗', title: '素食养生', desc: '清淡饮食，五谷为养' },
      { icon: '🚶', title: '经行散步', desc: '饭后百步走，活到九十九' },
      { icon: '🌿', title: '草药熏香', desc: '艾草熏香，安神助眠' }
    ],
    chantList: [
      { icon: '📿', name: '《心经》', length: '约5分钟' },
      { icon: '📿', name: '《大悲咒》', length: '约8分钟' },
      { icon: '📿', name: '《佛说阿弥陀经》', length: '约15分钟' },
      { icon: '📿', name: '《金刚经》', length: '约20分钟' }
    ]
  },
  playChant(e) {
    const item = e.currentTarget.dataset.item;
    wx.showToast({ title: '正在播放' + item.name, icon: 'none' });
  },
  voiceRead() {
    wx.showToast({ title: '语音朗读已开启', icon: 'none' });
  },
  voiceNav() {
    wx.showToast({ title: '语音导航已开启', icon: 'none' });
  },
  startZen() {
    wx.showToast({ title: '安那般那念开始', icon: 'none' });
  }
})
