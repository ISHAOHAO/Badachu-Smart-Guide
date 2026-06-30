const BASE_URL = 'http://localhost:5000/api/v1'

const request = (url, method = 'GET', data = {}, needAuth = true) => {
  return new Promise((resolve, reject) => {
    const header = { 'Content-Type': 'application/json' }
    if (needAuth) {
      const token = wx.getStorageSync('token')
      if (token) header['Authorization'] = `Bearer ${token}`
    }
    wx.request({
      url: `${BASE_URL}${url}`,
      method,
      data,
      header,
      success: (res) => {
        if (res.statusCode === 200) resolve(res.data)
        else if (res.statusCode === 401) {
          wx.removeStorageSync('token')
          wx.navigateTo({ url: '/pages/login/login' })
          reject(new Error('未登录'))
        } else reject(new Error(res.data.message || '请求失败'))
      },
      fail: (err) => reject(err)
    })
  })
}

const api = {
  getSpots: () => request('/spots'),
  getSpotDetail: (id) => request(`/spots/${id}`),

  login: (code, userInfo) => request('/auth/login', 'POST', { code, userInfo }, false),
  getUserProfile: () => request('/user/profile'),
  updateUserProfile: (data) => request('/user/profile', 'PUT', data),

  createCheckin: (data) => request('/checkin', 'POST', data),
  getCheckins: (params) => request('/checkin/list', 'GET', params),

  getBadges: () => request('/badges'),
  getUserBadges: () => request('/user/badges'),

  getFortuneTransactions: () => request('/fortune/transactions'),
  exchangeFortune: (data) => request('/fortune/exchange', 'POST', data),

  submitQuiz: (data) => request('/quiz/submit', 'POST', data),
  getQuestions: (params) => request('/quiz/questions', 'GET', params),

  getLeaderboard: (type) => request(`/leaderboard/${type}`),

  getNearbyHiddenSpot: (location) => request('/checkin/nearby-hidden', 'POST', location),
}

export default api
