const MOCK_BADGES = [
  { tab: 0, icon: '🏛️', name: '大雄宝殿', owned: true, gotDate: '2026-03-15', condition: '打卡大雄宝殿' },
  { tab: 0, icon: '🛕', name: '天王殿', owned: true, gotDate: '2026-03-20', condition: '打卡天王殿' },
  { tab: 0, icon: '📿', name: '藏经阁', owned: true, gotDate: '2026-04-01', condition: '打卡藏经阁' },
  { tab: 0, icon: '🪷', name: '放生池', owned: false, gotDate: '', condition: '打卡放生池' },
  { tab: 0, icon: '🔔', name: '钟楼', owned: true, gotDate: '2026-04-10', condition: '打卡钟楼' },
  { tab: 0, icon: '🥁', name: '鼓楼', owned: false, gotDate: '', condition: '打卡鼓楼' },
  { tab: 0, icon: '⛩️', name: '山门', owned: true, gotDate: '2026-03-10', condition: '打卡山门' },
  { tab: 0, icon: '🧱', name: '禅堂', owned: false, gotDate: '', condition: '打卡禅堂' },
  { tab: 1, icon: '🗝️', name: '密道探索者', owned: true, gotDate: '2026-03-25', condition: '发现寺院隐藏密道' },
  { tab: 1, icon: '🌿', name: '后山隐士', owned: false, gotDate: '', condition: '发现后山隐秘小径' },
  { tab: 1, icon: '📜', name: '碑文解读', owned: true, gotDate: '2026-04-05', condition: '解读10块古碑文' },
  { tab: 1, icon: '🔮', name: '地宫寻宝', owned: false, gotDate: '', condition: '发现地宫秘密' },
  { tab: 1, icon: '🌊', name: '古井探秘', owned: false, gotDate: '', condition: '发现古井中的秘密' },
  { tab: 1, icon: '🌸', name: '花影迷踪', owned: true, gotDate: '2026-04-12', condition: '找到所有隐藏花景' },
  { tab: 2, icon: '🏆', name: '初入佛门', owned: true, gotDate: '2026-03-10', condition: '完成第一次打卡' },
  { tab: 2, icon: '⭐', name: '虔诚香客', owned: true, gotDate: '2026-03-20', condition: '打卡5个景点' },
  { tab: 2, icon: '☀️', name: '日行一善', owned: true, gotDate: '2026-04-01', condition: '连续打卡7天' },
  { tab: 2, icon: '🌙', name: '月满禅心', owned: false, gotDate: '', condition: '连续打卡30天' },
  { tab: 2, icon: '📖', name: '饱读经书', owned: true, gotDate: '2026-04-05', condition: '完成10次答题' },
  { tab: 2, icon: '🧠', name: '智慧如海', owned: false, gotDate: '', condition: '答题正确率90%以上' },
  { tab: 2, icon: '🗺️', name: '行者无疆', owned: true, gotDate: '2026-04-10', condition: '到访所有主要景点' },
  { tab: 2, icon: '💎', name: '发现者', owned: false, gotDate: '', condition: '发现5个隐藏彩蛋' },
  { tab: 2, icon: '🤝', name: '同修', owned: false, gotDate: '', condition: '邀请3位好友加入' },
  { tab: 2, icon: '🎯', name: '全知者', owned: false, gotDate: '', condition: '全部答题正确' },
  { tab: 2, icon: '👑', name: '大德者', owned: false, gotDate: '', condition: '获得所有成就徽章' },
  { tab: 3, icon: '🎆', name: '新春祈福', owned: true, gotDate: '2026-02-10', condition: '参加新春祈福活动' },
  { tab: 3, icon: '🏮', name: '元宵灯会', owned: false, gotDate: '', condition: '参加元宵灯会活动' },
  { tab: 3, icon: '🎋', name: '清明插柳', owned: false, gotDate: '', condition: '参加清明节活动' },
  { tab: 3, icon: '🪷', name: '佛诞日', owned: true, gotDate: '2026-05-14', condition: '参加佛诞日庆典' },
  { tab: 3, icon: '🎑', name: '中秋团圆', owned: false, gotDate: '', condition: '参加中秋法会活动' }
]

Page({
  data: {
    currentTab: 0,
    badgeList: [],
    ownedCount: 0,
    totalCount: 0,
    progressPercent: 0,
    showModal: false,
    detailItem: {}
  },
  onLoad() {
    const saved = wx.getStorageSync('badgeData');
    const badges = saved || MOCK_BADGES;
    this.setBadgeData(badges, 0);
  },
  switchTab(e) {
    const idx = e.currentTarget.dataset.index;
    this.setBadgeData(wx.getStorageSync('badgeData') || MOCK_BADGES, idx);
  },
  setBadgeData(all, tabIdx) {
    const list = all.filter(b => b.tab === tabIdx);
    const owned = all.filter(b => b.owned).length;
    const total = all.length;
    this.setData({
      currentTab: tabIdx,
      badgeList: list,
      ownedCount: owned,
      totalCount: total,
      progressPercent: Math.round(owned / total * 100)
    });
  },
  showDetail(e) {
    this.setData({ showModal: true, detailItem: e.currentTarget.dataset.item });
  },
  hideDetail() {
    this.setData({ showModal: false });
  }
})
