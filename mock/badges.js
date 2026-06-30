const mockBadges = [
  { id: 1, name: '长安寺徽章', type: 'temple', spotId: 1, description: '打卡长安寺获得', imageUrl: '', fortuneReward: 20, condition: '在长安寺打卡' },
  { id: 2, name: '灵光寺徽章', type: 'temple', spotId: 2, description: '打卡灵光寺获得', imageUrl: '', fortuneReward: 20, condition: '在灵光寺打卡' },
  { id: 3, name: '三山庵徽章', type: 'temple', spotId: 3, description: '打卡三山庵获得', imageUrl: '', fortuneReward: 20, condition: '在三山庵打卡' },
  { id: 4, name: '大悲寺徽章', type: 'temple', spotId: 4, description: '打卡大悲寺获得', imageUrl: '', fortuneReward: 20, condition: '在大悲寺打卡' },
  { id: 5, name: '龙泉庵徽章', type: 'temple', spotId: 5, description: '打卡龙泉庵获得', imageUrl: '', fortuneReward: 20, condition: '在龙泉庵打卡' },
  { id: 6, name: '香界寺徽章', type: 'temple', spotId: 6, description: '打卡香界寺获得', imageUrl: '', fortuneReward: 20, condition: '在香界寺打卡' },
  { id: 7, name: '宝珠洞徽章', type: 'temple', spotId: 7, description: '打卡宝珠洞获得', imageUrl: '', fortuneReward: 20, condition: '在宝珠洞打卡' },
  { id: 8, name: '证果寺徽章', type: 'temple', spotId: 8, description: '打卡证果寺获得', imageUrl: '', fortuneReward: 20, condition: '在证果寺打卡' },

  { id: 9, name: '古树守护者', type: 'hidden', spotId: 'h1', description: '发现隐藏点「古树佛影」', imageUrl: '', fortuneReward: 50, condition: '找到古树佛影' },
  { id: 10, name: '洞天探秘者', type: 'hidden', spotId: 'h2', description: '发现隐藏点「洞天福地」', imageUrl: '', fortuneReward: 50, condition: '找到洞天福地' },
  { id: 11, name: '寻泉人', type: 'hidden', spotId: 'h3', description: '发现隐藏点「泉眼源头」', imageUrl: '', fortuneReward: 50, condition: '找到泉眼源头' },
  { id: 12, name: '夕阳捕手', type: 'hidden', spotId: 'h4', description: '发现隐藏点「塔影夕照」', imageUrl: '', fortuneReward: 50, condition: '找到塔影夕照' },
  { id: 13, name: '禅心发现者', type: 'hidden', spotId: 'h5', description: '发现隐藏点「禅房花木」', imageUrl: '', fortuneReward: 50, condition: '找到禅房花木' },
  { id: 14, name: '登高望远者', type: 'hidden', spotId: 'h6', description: '发现隐藏点「山巅回望」', imageUrl: '', fortuneReward: 50, condition: '找到山巅回望' },

  { id: 15, name: '初探八大处', type: 'achievement', description: '首次打卡', imageUrl: '', fortuneReward: 50, condition: '完成首次打卡' },
  { id: 16, name: '文化探索者', type: 'achievement', description: '打卡4处寺庙', imageUrl: '', fortuneReward: 100, condition: '打卡4处寺庙' },
  { id: 17, name: '佛教朝圣者', type: 'achievement', description: '打卡全部8处寺庙', imageUrl: '', fortuneReward: 200, condition: '打卡全部8处寺庙' },
  { id: 18, name: '发现者大师', type: 'achievement', description: '打卡全部6个隐藏点', imageUrl: '', fortuneReward: 300, condition: '打卡全部6个隐藏点' },
  { id: 19, name: '禅音追踪者', type: 'achievement', description: '连续发现3个隐藏点', imageUrl: '', fortuneReward: 200, condition: '连续发现3个隐藏点' },
  { id: 20, name: '早起鸟', type: 'achievement', description: '上午9点前打卡', imageUrl: '', fortuneReward: 50, condition: '上午9点前打卡' },
  { id: 21, name: '黄昏行者', type: 'achievement', description: '下午5点后打卡', imageUrl: '', fortuneReward: 50, condition: '下午5点后打卡' },
  { id: 22, name: '摄影达人', type: 'achievement', description: '拍照超过10张', imageUrl: '', fortuneReward: 100, condition: '拍照超过10张' },
  { id: 23, name: '连续打卡', type: 'achievement', description: '连续3天打卡', imageUrl: '', fortuneReward: 150, condition: '连续3天打卡' },
  { id: 24, name: '文化学者', type: 'achievement', description: '完成所有文化问答', imageUrl: '', fortuneReward: 200, condition: '完成所有文化问答' },
  { id: 25, name: '社交达人', type: 'achievement', description: '分享超过20次', imageUrl: '', fortuneReward: 100, condition: '分享超过20次' },
]

const mockQuestions = [
  {
    id: 1,
    category: '佛教基础',
    difficulty: 'easy',
    question: '佛教的创始人是谁？',
    options: ['释迦牟尼', '孔子', '老子', '耶稣'],
    correctAnswer: 0,
    explanation: '佛教由释迦牟尼（佛陀）在古印度创立'
  },
  {
    id: 2,
    category: '八大处历史',
    difficulty: 'easy',
    question: '八大处公园位于北京哪个区？',
    options: ['海淀区', '石景山区', '朝阳区', '丰台区'],
    correctAnswer: 1,
    explanation: '八大处公园位于北京市石景山区西山余脉'
  },
  {
    id: 3,
    category: '佛教基础',
    difficulty: 'medium',
    question: '以下哪一个是佛教"三宝"之一？',
    options: ['佛', '道', '儒', '法'],
    correctAnswer: 0,
    explanation: '佛教三宝是佛、法、僧'
  },
  {
    id: 4,
    category: '八大处历史',
    difficulty: 'medium',
    question: '八大处中哪座寺庙供奉着佛牙舍利？',
    options: ['长安寺', '灵光寺', '大悲寺', '证果寺'],
    correctAnswer: 1,
    explanation: '灵光寺佛牙舍利塔供奉着世界级佛教圣物佛牙舍利'
  },
  {
    id: 5,
    category: '佛教基础',
    difficulty: 'hard',
    question: '"涅槃"在佛教中指的是什么？',
    options: ['死亡', '觉悟解脱', '重生', '轮回'],
    correctAnswer: 1,
    explanation: '涅槃指烦恼永远断除，达到觉悟解脱的境界'
  },
  {
    id: 6,
    category: '八大处历史',
    difficulty: 'hard',
    question: '八大处中历史最悠久的寺庙是哪一座？',
    options: ['灵光寺', '三山庵', '证果寺', '香界寺'],
    correctAnswer: 2,
    explanation: '证果寺始建于唐代，是八大处中历史最悠久的寺庙'
  },
  {
    id: 7,
    category: '寺庙建筑',
    difficulty: 'medium',
    question: '佛牙舍利塔的高度是多少？',
    options: ['39米', '51米', '67米', '88米'],
    correctAnswer: 1,
    explanation: '佛牙舍利塔高51米，是一座八角十三层密檐式塔'
  },
  {
    id: 8,
    category: '佛教基础',
    difficulty: 'easy',
    question: '佛教中的"四谛"不包括以下哪一项？',
    options: ['苦谛', '集谛', '道谛', '爱谛'],
    correctAnswer: 3,
    explanation: '四谛包括苦谛、集谛、灭谛、道谛'
  },
  {
    id: 9,
    category: '八大处历史',
    difficulty: 'medium',
    question: '八大处的总面积约为多少？',
    options: ['153公顷', '253公顷', '353公顷', '453公顷'],
    correctAnswer: 1,
    explanation: '八大处公园占地面积约253公顷'
  },
  {
    id: 10,
    category: '寺庙建筑',
    difficulty: 'hard',
    question: '大悲寺以什么艺术形式著称？',
    options: ['雕塑', '壁画', '书法', '建筑'],
    correctAnswer: 1,
    explanation: '大悲寺以精美的元代壁画著称，是现存较为完整的佛教艺术珍品'
  }
]

export { mockBadges, mockQuestions }
