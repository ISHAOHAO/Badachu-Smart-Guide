const mockQuestions = [
  {
    category: '佛教基础',
    question: '佛教创始人释迦牟尼原本是什么身份？',
    options: ['商人', '王子', '农夫', '祭司'],
    answer: 1,
    explanation: '释迦牟尼原名乔达摩·悉达多，是古印度迦毗罗卫国（今尼泊尔境内）的太子。',
  },
  {
    category: '佛教基础',
    question: '以下哪个是佛教"三宝"之一？',
    options: ['经书', '僧伽', '寺庙', '香火'],
    answer: 1,
    explanation: '佛教三宝指佛、法、僧。佛是觉悟者，法是教义，僧是僧团（僧伽）。',
  },
  {
    category: '佛教基础',
    question: '"涅槃"在佛教中的含义是什么？',
    options: ['死亡', '成佛', '烦恼永灭', '重生'],
    answer: 2,
    explanation: '涅槃指烦恼永灭、不再轮回的解脱境界，并非简单的死亡或重生。',
  },
  {
    category: '八大处历史',
    question: '北京八大处的"八处"是指？',
    options: ['八座山峰', '八座寺庙', '八个山谷', '八处石刻'],
    answer: 1,
    explanation: '八大处是北京西山八座古刹的总称，分别为长安寺、灵光寺等八座寺庙。',
  },
  {
    category: '八大处历史',
    question: '八大处中哪一处以佛牙舍利闻名？',
    options: ['长安寺', '灵光寺', '香界寺', '宝珠洞'],
    answer: 1,
    explanation: '灵光寺内供奉释迦牟尼佛牙舍利，是世界四大佛牙舍利之一。',
  },
  {
    category: '八大处历史',
    question: '八大处的"二处"灵光寺始建于哪个朝代？',
    options: ['唐代', '宋代', '元代', '明代'],
    answer: 0,
    explanation: '灵光寺始建于唐大历年间（公元766-779年），初名龙泉寺。',
  },
  {
    category: '寺庙建筑',
    question: '寺院山门内两侧通常供奉的是？',
    options: ['四大天王', '十八罗汉', '哼哈二将', '金刚力士'],
    answer: 2,
    explanation: '寺院山门内两侧通常供奉哼哈二将（密迹金刚和那罗延天），守护寺院。',
  },
  {
    category: '寺庙建筑',
    question: '寺院中"大雄宝殿"供奉的是？',
    options: ['观音菩萨', '释迦牟尼佛', '地藏菩萨', '文殊菩萨'],
    answer: 1,
    explanation: '大雄宝殿是寺院正殿，"大雄"是释迦牟尼佛的尊号，供奉释迦牟尼佛。',
  },
  {
    category: '寺庙建筑',
    question: '寺院中的"钟楼"通常建在什么位置？',
    options: ['山门左侧', '山门右侧', '大雄宝殿后', '藏经阁旁'],
    answer: 1,
    explanation: '寺院钟楼通常建在山门右侧（东侧），与左侧（西侧）的鼓楼相对，有"晨钟暮鼓"之说。',
  },
  {
    category: '佛教基础',
    question: '"六道轮回"中不包括以下哪一道？',
    options: ['天道', '人道', '神道', '地狱道'],
    answer: 2,
    explanation: '六道指天道、人道、阿修罗道、畜生道、饿鬼道、地狱道，不含"神道"。',
  },
]

Page({
  data: {
    questions: mockQuestions,
    started: false,
    finished: false,
    current: 0,
    selected: null,
    correctCount: 0,
    earnedPoints: 0,
    stats: { correct: 0, wrong: 0, fuguang: 0 },
  },

  onShow() {
    const today = new Date().toDateString()
    const saved = wx.getStorageSync('quizStats_' + today)
    if (saved) {
      this.setData({ stats: saved })
    }
  },

  onStart() {
    this.setData({
      started: true,
      finished: false,
      current: 0,
      selected: null,
      correctCount: 0,
      earnedPoints: 0,
    })
  },

  onSelect(e) {
    if (this.data.selected !== null) return
    const idx = e.currentTarget.dataset.index
    const correct = idx === this.data.questions[this.data.current].answer
    const earnedPoints = this.data.earnedPoints + (correct ? 10 : 2)
    const correctCount = this.data.correctCount + (correct ? 1 : 0)
    this.setData({ selected: idx, correctCount, earnedPoints })
  },

  onNext() {
    if (this.data.current < this.data.questions.length - 1) {
      this.setData({ current: this.data.current + 1, selected: null })
    } else {
      this.saveStats()
      this.setData({ started: false, finished: true })
    }
  },

  saveStats() {
    const today = new Date().toDateString()
    const saved = wx.getStorageSync('quizStats_' + today) || { correct: 0, wrong: 0, fuguang: 0 }
    const points = this.data.earnedPoints
    saved.correct += this.data.correctCount
    saved.wrong += (this.data.questions.length - this.data.correctCount)
    saved.fuguang += points
    wx.setStorageSync('quizStats_' + today, saved)
    const fuguang = (wx.getStorageSync('fuguang') || 0) + points
    wx.setStorageSync('fuguang', fuguang)
    this.setData({ stats: saved })
  },

  onRestart() {
    this.onStart()
  },

  onBack() {
    wx.navigateBack()
  },

  optLabel(i) {
    return ['A', 'B', 'C', 'D'][i]
  },

  optionClass(i) {
    if (this.data.selected === null) return ''
    const q = this.data.questions[this.data.current]
    if (i === q.answer) return 'correct'
    if (i === this.data.selected && i !== q.answer) return 'wrong'
    return ''
  },
})
