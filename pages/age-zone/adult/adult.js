Page({
  data: {
    recommend: {
      title: '《心经》浅释',
      desc: '观自在菩萨行深般若波罗蜜多时，照见五蕴皆空，度一切苦厄。舍利子，色不异空，空不异色，色即是空，空即是色……'
    }
  },
  goDeepRead() { wx.showToast({ title: '深度解读加载中', icon: 'none' }); },
  goPracticeRecord() { wx.showToast({ title: '修行记录加载中', icon: 'none' }); },
  goDharma() { wx.showToast({ title: '法会信息加载中', icon: 'none' }); },
  goCourses() { wx.showToast({ title: '文化课程加载中', icon: 'none' }); },
  viewRecommend() { wx.showToast({ title: '《心经》浅释加载中', icon: 'none' }); },
  goNav() { wx.showToast({ title: '智慧导览加载中', icon: 'none' }); },
  goCheckin() { wx.showToast({ title: '打卡记录加载中', icon: 'none' }); },
  goGame() { wx.showToast({ title: '游戏化学习加载中', icon: 'none' }); },
  goCommunity() { wx.showToast({ title: '同修社区加载中', icon: 'none' }); }
})
