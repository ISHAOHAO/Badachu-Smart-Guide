const SPOTS = [
  { id: 1, name: '长安寺', templeOrder: '第一处', subtitle: '明代古刹·观音道场', founded: '明代弘治十七年(1504年)', icon: '🏛️' },
  { id: 2, name: '灵光寺', templeOrder: '第二处', subtitle: '唐代古刹·佛牙舍利', founded: '唐代', icon: '🪷' },
  { id: 3, name: '三山庵', templeOrder: '第三处', subtitle: '金代古刹·禅修胜地', founded: '金代', icon: '🏯' },
  { id: 4, name: '大悲寺', templeOrder: '第四处', subtitle: '元代古刹·壁画珍宝', founded: '元代', icon: '🎨' },
  { id: 5, name: '龙泉庵', templeOrder: '第五处', subtitle: '龙泉胜景·水韵禅心', founded: '明代', icon: '⛲' },
  { id: 6, name: '香界寺', templeOrder: '第六处', subtitle: '清代皇家寺院', founded: '清代', icon: '👑' },
  { id: 7, name: '宝珠洞', templeOrder: '第七处', subtitle: '天然洞穴·造化神奇', founded: '明代', icon: '🕳️' },
  { id: 8, name: '证果寺', templeOrder: '第八处', subtitle: '唐代古刹·千年见证', founded: '唐代', icon: '📜' },
]

const BADGE_TYPES = {
  TEMPLE: 'temple',
  HIDDEN: 'hidden',
  ACHIEVEMENT: 'achievement',
  HOLIDAY: 'holiday'
}

const CHECKIN_TYPES = {
  VISIBLE: 'visible',
  HIDDEN: 'hidden'
}

const FORTUNE_SOURCES = {
  CHECKIN: '打卡',
  HIDDEN_CHECKIN: '隐藏打卡',
  BADGE: '徽章收集',
  QUIZ: '文化问答',
  SHARE: '分享',
  INVITE: '邀请好友',
  LOTTERY: '抽奖',
  EXCHANGE: '兑换'
}

const ACE_GROUPS = ['children', 'teen', 'adult', 'senior']

const HIDDEN_SPOTS_ZEN_SOUNDS = ['风铃声', '空灵梵音', '流水声', '晚钟声', '木鱼声', '风声与钟声合奏']

export default {
  SPOTS,
  BADGE_TYPES,
  CHECKIN_TYPES,
  FORTUNE_SOURCES,
  ACE_GROUPS,
  HIDDEN_SPOTS_ZEN_SOUNDS
}
