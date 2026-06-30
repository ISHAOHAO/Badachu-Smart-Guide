const MOCK_USERS = [
  { nickname: '慧心居士', avatar: '🧘', fuguang: 2850, badge: 12, hidden: 8, photo: 23, checkin: 45, quiz: 89 },
  { nickname: '妙音行者', avatar: '🎵', fuguang: 2320, badge: 10, hidden: 6, photo: 18, checkin: 38, quiz: 72 },
  { nickname: '明觉罗汉', avatar: '🌟', fuguang: 1980, badge: 9, hidden: 7, photo: 15, checkin: 32, quiz: 65 },
  { nickname: '净心菩萨', avatar: '🌸', fuguang: 1750, badge: 8, hidden: 5, photo: 20, checkin: 28, quiz: 58 },
  { nickname: '自在禅者', avatar: '☀️', fuguang: 1520, badge: 7, hidden: 4, photo: 12, checkin: 25, quiz: 50 },
  { nickname: '善缘行者', avatar: '🍀', fuguang: 1280, badge: 6, hidden: 3, photo: 10, checkin: 20, quiz: 42 },
  { nickname: '福德居士', avatar: '💎', fuguang: 1050, badge: 5, hidden: 2, photo: 8, checkin: 15, quiz: 35 },
  { nickname: '智慧觉者', avatar: '📿', fuguang: 820, badge: 4, hidden: 2, photo: 6, checkin: 12, quiz: 28 },
  { nickname: '吉祥信士', avatar: '🎋', fuguang: 600, badge: 3, hidden: 1, photo: 4, checkin: 8, quiz: 20 },
  { nickname: '清净行者', avatar: '💫', fuguang: 380, badge: 2, hidden: 1, photo: 3, checkin: 5, quiz: 15 },
]

const KEY_MAP = {
  fuguang: { label: '福光', key: 'fuguang' },
  badge: { label: '徽章', key: 'badge' },
  hidden: { label: '隐藏点', key: 'hidden' },
  photo: { label: '拍照', key: 'photo' },
  checkin: { label: '打卡天数', key: 'checkin' },
  quiz: { label: '文化问答', key: 'quiz' },
}

Page({
  data: {
    types: [
      { name: '福光', key: 'fuguang' },
      { name: '徽章', key: 'badge' },
      { name: '隐藏点', key: 'hidden' },
      { name: '拍照', key: 'photo' },
      { name: '打卡天数', key: 'checkin' },
      { name: '文化问答', key: 'quiz' },
    ],
    periods: [
      { name: '日榜', key: 'daily' },
      { name: '周榜', key: 'weekly' },
      { name: '总榜', key: 'total' },
    ],
    currentType: 'fuguang',
    currentPeriod: 'total',
    medals: ['🥇', '🥈', '🥉'],
    rankList: [],
    myRank: {},
  },

  onShow() {
    this.loadRankings()
  },

  loadRankings() {
    const type = this.data.currentType
    const list = [...MOCK_USERS].sort((a, b) => b[type] - a[type])
    const rankList = list.map((u, i) => ({
      rank: i + 1,
      nickname: u.nickname,
      avatar: u.avatar,
      badge: KEY_MAP[type].label,
      score: u[type],
    }))
    const myRank = { rank: rankList.length + 1, nickname: '我', avatar: '🙋', badge: KEY_MAP[type].label, score: wx.getStorageSync('fuguang') || 0 }
    this.setData({ rankList, myRank })
  },

  onSwitchType(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ currentType: key })
    this.loadRankings()
  },

  onSwitchPeriod(e) {
    const key = e.currentTarget.dataset.key
    this.setData({ currentPeriod: key })
    this.loadRankings()
  },
})
