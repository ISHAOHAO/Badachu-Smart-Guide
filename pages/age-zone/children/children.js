Page({
  data: {
    stories: [
      { emoji: '🐵', name: '猴子摘桃', desc: '佛教本生故事' },
      { emoji: '🦌', name: '九色鹿', desc: '敦煌壁画故事' },
      { emoji: '🐘', name: '白象入胎', desc: '佛陀诞生故事' },
      { emoji: '🪷', name: '步步生莲', desc: '佛陀的故事' }
    ],
    quizList: [
      { emoji: '🪷', q: '佛陀在哪里成道？', a: '菩提树下' },
      { emoji: '🧘', q: '佛教的创始人是谁？', a: '释迦牟尼' },
      { emoji: '🏛️', q: '佛教徒去哪里参拜？', a: '寺院' }
    ]
  },
  viewStory(e) {
    wx.showToast({ title: '故事动画播放中', icon: 'none' });
  },
  goDoodle() {
    wx.showToast({ title: '涂鸦游戏加载中', icon: 'none' });
  },
  goQuiz(e) {
    const item = e.currentTarget.dataset.item;
    wx.showModal({
      title: item.q,
      content: '你的答案是？',
      editable: true,
      success: (res) => {
        if (res.confirm) {
          const isCorrect = res.content.trim() === item.a;
          wx.showToast({ title: isCorrect ? '🎉 答对了！' : '❌ 再想想哦', icon: 'none' });
          if (isCorrect) {
            let score = wx.getStorageSync('childrenQuizScore') || 0;
            wx.setStorageSync('childrenQuizScore', score + 1);
          }
        }
      }
    });
  },
  onCheckin() {
    wx.showToast({ title: '✅ 打卡成功！', icon: 'success' });
    let count = wx.getStorageSync('childrenCheckinCount') || 0;
    wx.setStorageSync('childrenCheckinCount', count + 1);
  }
})
