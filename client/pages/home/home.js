import { mockSpots } from '../../mock/spots'

Page({
  data: {
    spots: mockSpots.slice(0, 6),
    fortuneLight: 0,
    currentAgeZone: 'adult',
    nearbyHint: false,
    userInfo: null
  },

  onLoad() {
    this.loadUserData()
    this.checkNearbyHint()
  },

  onShow() {
    const app = getApp()
    this.setData({
      fortuneLight: app.globalData.fortuneLight,
      currentAgeZone: app.globalData.currentAgeZone
    })
  },

  loadUserData() {
    const app = getApp()
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({ userInfo })
      app.globalData.userInfo = userInfo
      app.globalData.isLoggedIn = true
    }
  },

  checkNearbyHint() {
    const hasFoundToday = wx.getStorageSync('todayHiddenFound')
    if (!hasFoundToday) {
      this.setData({ nearbyHint: true })
    }
  },

  switchAgeZone(e) {
    const zone = e.currentTarget.dataset.zone
    const app = getApp()
    app.globalData.currentAgeZone = zone
    this.setData({ currentAgeZone: zone })
    wx.navigateTo({ url: `/pages/age-zone/${zone}/${zone}` })
  },

  goMap() { wx.switchTab({ url: '/pages/map/map' }) },
  goSpots() { wx.navigateTo({ url: '/pages/spots/spots' }) },
  goCheckin() { wx.switchTab({ url: '/pages/checkin/checkin' }) },
  goSpotDetail(e) { wx.navigateTo({ url: `/pages/spot-detail/spot-detail?id=${e.currentTarget.dataset.id}` }) },
  goQuiz() { wx.navigateTo({ url: '/pages/gamification/quiz/quiz' }) },
  goTreasure() { wx.navigateTo({ url: '/pages/gamification/treasure/treasure' }) },
  goBadges() { wx.navigateTo({ url: '/pages/profile/badges/badges' }) },
  goLottery() { wx.navigateTo({ url: '/pages/gamification/lottery/lottery' }) },
  goLeaderboard() { wx.navigateTo({ url: '/pages/gamification/leaderboard/leaderboard' }) },
  goHiddenSpot() { wx.navigateTo({ url: '/pages/checkin/hidden-spot/hidden-spot' }) },
  onFortuneTap() { wx.showToast({ title: `当前福光: ${this.data.fortuneLight}`, icon: 'none' }) }
})