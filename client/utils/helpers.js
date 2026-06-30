const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  const h = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  return `${y}-${m}-${d} ${h}:${min}`
}

const formatRelativeTime = (timestamp) => {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 30) return `${days}天前`
  return formatDate(timestamp)
}

const debounce = (fn, delay = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}

const throttle = (fn, delay = 300) => {
  let last = 0
  return (...args) => {
    const now = Date.now()
    if (now - last >= delay) {
      last = now
      fn(...args)
    }
  }
}

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371000
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng/2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

const shuffleArray = (arr) => {
  const shuffled = [...arr]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const getLevelInfo = (fortuneLight) => {
  if (fortuneLight < 100) return { level: 1, title: '初心者', nextLevel: 100, progress: fortuneLight / 100 }
  if (fortuneLight < 300) return { level: 2, title: '修行者', nextLevel: 300, progress: (fortuneLight - 100) / 200 }
  if (fortuneLight < 600) return { level: 3, title: '悟道者', nextLevel: 600, progress: (fortuneLight - 300) / 300 }
  if (fortuneLight < 1000) return { level: 4, title: '智者', nextLevel: 1000, progress: (fortuneLight - 600) / 400 }
  return { level: 5, title: '大德者', nextLevel: null, progress: 1 }
}

export default {
  formatDate,
  formatRelativeTime,
  debounce,
  throttle,
  getDistance,
  shuffleArray,
  getLevelInfo
}
