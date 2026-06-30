const i18n = {
  currentLang: 'zh',
  translations: {
    zh: {
      appName: '八大处·智慧导览',
      home: '首页',
      map: '导览',
      checkin: '打卡',
      profile: '我的',
      fortuneLight: '福光',
      badges: '徽章',
      spots: '景点',
      settings: '设置',
      share: '分享',
      login: '登录',
      logout: '退出登录',
      loading: '加载中...',
      noMore: '没有更多了',
      error: '加载失败，请重试',
      checkinSuccess: '打卡成功',
      hiddenSpotFound: '发现隐藏点！',
    },
    en: {
      appName: 'Badachu Smart Guide',
      home: 'Home',
      map: 'Guide',
      checkin: 'Check-in',
      profile: 'Profile',
      fortuneLight: 'Fortune Light',
      badges: 'Badges',
      spots: 'Spots',
      settings: 'Settings',
      share: 'Share',
      login: 'Login',
      logout: 'Logout',
      loading: 'Loading...',
      noMore: 'No more',
      error: 'Failed to load, please retry',
      checkinSuccess: 'Check-in successful',
      hiddenSpotFound: 'Hidden spot found!',
    }
  },
  t(key) {
    return this.translations[this.currentLang]?.[key] || key
  },
  setLang(lang) {
    if (this.translations[lang]) this.currentLang = lang
  }
}

export default i18n
