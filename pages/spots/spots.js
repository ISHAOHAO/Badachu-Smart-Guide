import { mockSpots } from '../../mock/spots'

Page({
  data: { spots: [] },
  onLoad() {
    this.setData({ spots: mockSpots })
  },
  goDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/spot-detail/spot-detail?id=${id}` })
  }
})