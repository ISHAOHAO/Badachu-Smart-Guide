import { mockSpots, mockHiddenSpots } from '../../mock/spots'

Page({
  data: {
    currentLat: 39.962,
    currentLng: 116.183,
    scale: 15,
    markers: [],
    polyline: [],
    selectedRoute: 'recommend',
    showPanel: false,
    selectedSpot: null,
    showLegend: false
  },

  onLoad() {
    this.loadMarkers()
    this.getCurrentLocation()
  },

  getCurrentLocation() {
    wx.getLocation({
      type: 'gcj02',
      success: (res) => {
        this.setData({
          currentLat: res.latitude,
          currentLng: res.longitude
        })
      },
      fail: () => {}
    })
  },

  loadMarkers() {
    const spotMarkers = mockSpots.map((spot) => ({
      id: spot.id,
      latitude: spot.latitude,
      longitude: spot.longitude,
      title: spot.name,
      iconPath: '/assets/icons/marker-spot.png',
      width: 40,
      height: 50,
      callout: {
        content: spot.name,
        padding: 8,
        borderRadius: 8,
        display: 'ALWAYS',
        textAlign: 'center',
        color: '#5D4037',
        bgColor: '#FFF8F0',
        fontSize: 12
      },
      label: {
        content: spot.templeOrder,
        color: '#D4A84B',
        fontSize: 10
      }
    }))

    const hiddenMarkers = mockHiddenSpots.map((spot, index) => ({
      id: 100 + index,
      latitude: spot.latitude,
      longitude: spot.longitude,
      title: '?',
      iconPath: '/assets/icons/marker-hidden.png',
      width: 36,
      height: 44,
      alpha: 0.7
    }))

    this.setData({ markers: [...spotMarkers, ...hiddenMarkers] })
  },

  onMarkerTap(e) {
    const markerId = e.detail.markerId
    const spot = mockSpots.find(s => s.id === markerId)
    if (spot) {
      this.setData({ selectedSpot: spot, showPanel: true })
    }
  },

  selectRoute(e) {
    const route = e.currentTarget.dataset.route
    this.setData({ selectedRoute: route })
    this.loadRoute(route)
  },

  loadRoute(route) {
    const routes = {
      recommend: [
        { latitude: 39.9585, longitude: 116.1785 },
        { latitude: 39.9605, longitude: 116.1805 },
        { latitude: 39.9615, longitude: 116.1815 },
        { latitude: 39.9625, longitude: 116.1825 },
        { latitude: 39.9635, longitude: 116.1835 },
        { latitude: 39.9645, longitude: 116.1845 },
        { latitude: 39.9655, longitude: 116.1855 },
        { latitude: 39.9665, longitude: 116.1865 }
      ],
      culture: [
        { latitude: 39.9585, longitude: 116.1785 },
        { latitude: 39.9605, longitude: 116.1805 },
        { latitude: 39.9645, longitude: 116.1845 },
        { latitude: 39.9665, longitude: 116.1865 },
        { latitude: 39.9625, longitude: 116.1825 }
      ],
      leisure: [
        { latitude: 39.9585, longitude: 116.1785 },
        { latitude: 39.9615, longitude: 116.1815 },
        { latitude: 39.9635, longitude: 116.1835 },
        { latitude: 39.9655, longitude: 116.1855 }
      ],
      family: [
        { latitude: 39.9585, longitude: 116.1785 },
        { latitude: 39.9605, longitude: 116.1805 },
        { latitude: 39.9635, longitude: 116.1835 },
        { latitude: 39.9615, longitude: 116.1815 }
      ]
    }
    const points = routes[route] || routes.recommend
    this.setData({
      polyline: [{
        points,
        color: '#D4A84B',
        width: 6,
        dottedLine: false,
        arrowLine: true
      }]
    })
  },

  togglePanel() {
    this.setData({ showPanel: !this.data.showPanel })
  },

  toggleLegend() {
    this.setData({ showLegend: !this.data.showLegend })
  },

  goSpotDetail() {
    if (this.data.selectedSpot) {
      wx.navigateTo({ url: `/pages/spot-detail/spot-detail?id=${this.data.selectedSpot.id}` })
    }
  },

  navigateToSpot() {
    if (this.data.selectedSpot) {
      wx.openLocation({
        latitude: this.data.selectedSpot.latitude,
        longitude: this.data.selectedSpot.longitude,
        name: this.data.selectedSpot.name,
        scale: 18
      })
    }
  },

  searchSpots() {
    wx.navigateTo({ url: '/pages/spots/spots' })
  }
})