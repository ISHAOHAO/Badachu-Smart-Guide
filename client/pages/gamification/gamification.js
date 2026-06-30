const LEVELS = [
  { min: 0, max: 99, name: '初心者', prevName: '初心者', nextName: '修行者' },
  { min: 100, max: 299, name: '修行者', prevName: '初心者', nextName: '行者' },
  { min: 300, max: 599, name: '行者', prevName: '修行者', nextName: '觉者' },
  { min: 600, max: 999, name: '觉者', prevName: '行者', nextName: '罗汉' },
  { min: 1000, max: 1999, name: '罗汉', prevName: '觉者', nextName: '菩萨' },
  { min: 2000, max: Infinity, name: '菩萨', prevName: '罗汉', nextName: '菩萨' },
]

Page({
  data: {
    fuguang: 0,
    levelInfo: { name: '初心者', progress: 0, prevName: '', nextName: '' },
    tasks: [
      { name: '每日签到', points: 20, done: false, key: 'signin' },
      { name: '打卡景点', points: 15, done: false, key: 'checkin' },
      { name: '文化问答', points: 15, done: false, key: 'quiz' },
      { name: '分享小程序', points: 10, done: false, key: 'share' },
    ],
  },

  onShow() {
    this.loadData()
  },

  loadData() {
    const fuguang = wx.getStorageSync('fuguang') || 0
    const taskData = wx.getStorageSync('dailyTasks') || {}
    const today = new Date().toDateString()
    const tasks = this.data.tasks.map(t => ({
      ...t,
      done: taskData[today + '_' + t.key] || false,
    }))
    this.setData({ fuguang, tasks })
    this.updateLevel(fuguang)
  },

  updateLevel(fuguang) {
    let levelInfo = null
    for (const l of LEVELS) {
      if (fuguang >= l.min && fuguang <= l.max) {
        const span = l.max - l.min
        const progress = span === Infinity ? 100 : Math.min(100, ((fuguang - l.min) / span) * 100)
        levelInfo = { name: l.name, progress: Math.round(progress), prevName: l.prevName, nextName: l.nextName }
        break
      }
    }
    if (levelInfo) this.setData({ levelInfo })
  },

  onDoTask(e) {
    const idx = e.currentTarget.dataset.index
    const tasks = this.data.tasks
    if (tasks[idx].done) return
    const today = new Date().toDateString()
    const taskData = wx.getStorageSync('dailyTasks') || {}
    taskData[today + '_' + tasks[idx].key] = true
    wx.setStorageSync('dailyTasks', taskData)
    tasks[idx].done = true
    const addPoints = tasks[idx].points
    const fuguang = (wx.getStorageSync('fuguang') || 0) + addPoints
    wx.setStorageSync('fuguang', fuguang)
    this.setData({ tasks, fuguang })
    this.updateLevel(fuguang)
    wx.showToast({ title: '+' + addPoints + ' 福光', icon: 'none' })
  },

  onNavigate(e) {
    const page = e.currentTarget.dataset.page
    wx.navigateTo({ url: '/pages/gamification/' + page + '/' + page })
  },
})
