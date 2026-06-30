Page({
  data: {
    nickname: '行深居士',
    levelName: '修行者',
    fuguang: 1688,
    stats: { checkins: 12, badges: 8, hidden: 3, quiz: 45 }
  },
  onLoad() {
    const user = wx.getStorageSync('userProfile');
    if (user) this.setData(user);
  },
  goBadges() { wx.navigateTo({ url: '/pages/profile/badges/badges' }); },
  goRecords() { wx.showToast({ title: '功能开发中', icon: 'none' }); },
  goFavorites() { wx.showToast({ title: '功能开发中', icon: 'none' }); },
  goPractice() { wx.showToast({ title: '功能开发中', icon: 'none' }); },
  goSettings() { wx.showToast({ title: '功能开发中', icon: 'none' }); },
  onLogout() {
    wx.showModal({
      title: '提示',
      content: '确定要退出登录吗？',
      success: (res) => { if (res.confirm) wx.removeStorageSync('userProfile'); }
    });
  }
})
