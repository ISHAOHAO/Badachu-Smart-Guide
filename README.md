# 八大处·佛教文化智慧导览小程序

## 项目概述

基于微信小程序的佛教文化圣地智慧导览平台，以北京八大处公园为首个实施案例，融合地图导航、AR技术、游戏化打卡、智能问答等功能。

### 核心功能

| 模块 | 功能 |
|------|------|
| 🏛️ 景区介绍 | 八大古刹详细介绍、历史渊源、佛教文化、多媒体展示 |
| 🗺️ 导览地图 | 全景地图、路线规划、实时定位、位置服务 |
| 📸 拍照打卡 | 明显打卡点、隐藏打卡点（禅音机制）、AR合影、分享 |
| 💎 游戏化互动 | 集宝系统、文化问答、成就徽章、福光货币、抽奖 |
| 👤 用户系统 | 微信登录、个人中心、福光余额、徽章墙 |
| 👶 分年龄段 | 儿童/青少年/成人/银发四套差异化UI |

## 项目结构

```
小程序/
├── client/                    # 微信小程序前端
│   ├── app.js                 # 全局逻辑
│   ├── app.json               # 全局配置
│   ├── app.wxss               # 全局样式
│   ├── styles/                # 主题变量 / 动画
│   ├── components/            # 通用组件
│   ├── pages/                 # 页面
│   │   ├── home/              # 首页
│   │   ├── spots/             # 景区介绍
│   │   ├── spot-detail/       # 景点详情
│   │   ├── map/               # 导览地图
│   │   ├── checkin/           # 拍照打卡 / 禅音探寻 / AR相机
│   │   ├── gamification/      # 游戏化（集宝/问答/抽奖/排行榜）
│   │   ├── profile/           # 个人中心 / 徽章墙 / 设置
│   │   └── age-zone/          # 分年龄段专区
│   ├── services/              # API / 登录 / 定位 / 存储
│   ├── utils/                 # 工具函数 / 常量 / 多语言
│   └── mock/                  # 模拟数据
│
├── server/                    # Flask 后端
│   ├── app.py                 # 应用入口
│   ├── config.py              # 配置
│   ├── models/                # 数据库模型
│   ├── routes/                # API路由
│   ├── services/              # 业务逻辑
│   ├── middleware/             # 中间件
│   └── scripts/seed_data.py   # 种子数据
│
├── start.bat                  # 启动脚本
└── 小程序需求文档.md           # 需求文档
```

## 快速开始

### 前端（微信小程序）

1. 安装 [微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)
2. 打开项目，选择 `client/` 目录
3. 填入 AppID（或使用测试号）
4. 编译运行

### 后端（Flask API）

```bash
cd server
pip install -r requirements.txt
python scripts/seed_data.py  # 初始化数据库
python app.py                # 启动服务 (http://localhost:5000)
```

或者直接运行 `start.bat` 一键启动。

### 技术栈

| 层面 | 技术 |
|------|------|
| 前端 | 微信小程序原生框架 (wxml/wxss/js) |
| 后端 | Python Flask + SQLAlchemy |
| 数据库 | SQLite (开发) / PostgreSQL (生产) |
| 认证 | JWT (Flask-JWT-Extended) |
| 缓存 | Redis |
| 地图 | 腾讯地图 SDK |

### 设计主题

- **主色**：金色 `#D4A84B`、红色 `#C0392B`、深褐 `#5D4037`
- **辅色**：米白 `#FDF5E6`、墨绿 `#2E7D32`、藏蓝 `#1A237E`
- **字体**：书法风格标题 + 系统默认正文字体

### API 端点

| 端点 | 方法 | 说明 |
|------|------|------|
| `/api/v1/health` | GET | 健康检查 |
| `/api/v1/auth/login` | POST | 微信登录 |
| `/api/v1/spots` | GET | 景点列表 |
| `/api/v1/spots/:id` | GET | 景点详情 |
| `/api/v1/checkin` | POST | 打卡 |
| `/api/v1/checkin/list` | GET | 打卡记录 |
| `/api/v1/badges` | GET | 徽章列表 |
| `/api/v1/user/badges` | GET | 用户徽章 |
| `/api/v1/fortune/transactions` | GET | 福光流水 |
| `/api/v1/fortune/exchange` | POST | 福光兑换 |
| `/api/v1/quiz/submit` | POST | 提交答题 |
| `/api/v1/leaderboard/:type` | GET | 排行榜 |

### 版本计划

- **V1.0**：基础功能上线（核心导览、景点介绍、基础打卡）
- **V1.5**：增加智能问答和AR实景导览
- **V2.0**：完善游戏化功能和多年龄段体验（当前版本）
