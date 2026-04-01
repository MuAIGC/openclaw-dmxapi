# OpenClaw DMXAPI 插件 🦞

> DMXAPI 模型聚合插件 - 自动同步模型列表 + 邀请返利追踪

[![npm version](https://img.shields.io/npm/v/openclaw-dmxapi.svg)](https://www.npmjs.com/package/openclaw-dmxapi)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## ✨ 功能特性

- 🔄 **自动同步模型列表** - 从 DMXAPI 官网自动抓取最新模型
- 💰 **余额查询** - 实时查看账户余额和用量统计
- 🔔 **余额提醒** - 余额不足时自动通知
- 🎯 **邀请返利** - 通过你的链接注册，自动追踪返利
- 📊 **模型分类** - 按对话/生图/视频/语音自动分类

---

## 🚀 快速开始

### 1️⃣ 安装插件

```bash
openclaw plugins install openclaw-dmxapi
```

### 2️⃣ 注册 DMXAPI

通过邀请链接注册（你我都有返利）：

```
https://www.dmxapi.cn/register?aff=LpUa
```

### 3️⃣ 获取 API Key

1. 登录 DMXAPI 后台
2. 进入「个人中心」→「API Key」
3. 创建新的 API Key

### 4️⃣ 配置插件

```bash
openclaw dmxapi-setup <your-api-key>
```

---

## 📖 命令说明

### 设置向导

```bash
# 显示注册教程
openclaw dmxapi-setup

# 配置 API Key
openclaw dmxapi-setup sk-xxxxxxxx
```

### 查看模型

```bash
# 查看所有可用模型
openclaw dmxapi-models
```

输出示例：
```
✅ 共 45 个模型
   💚 免费：30 个
   💰 付费：15 个

📌 💬 对话模型 (20 个):
   - GPT-5.2 💚 免费
   - GPT-5.2 Pro 💚 免费
   - Claude Sonnet 4 💚 免费
   ...

📌 🎨 生图模型 (10 个):
   - Gemini 3.1 Flash Image 💰 ¥0.5000/K
   - Gemini 3 Pro Image 💰 ¥1.0000/K
   ...
```

### 查询余额

```bash
# 查看余额和用量
openclaw dmxapi-balance
```

输出示例：
```
┌─────────────────────────┐
│      DMXAPI 余额        │
├─────────────────────────┤
│ 总充值：  ¥100.00        │
│ 已消费：  ¥23.50         │
│ 剩余：    ¥76.50         │
└─────────────────────────┘
```

### 手动同步

```bash
# 立即同步模型列表
openclaw dmxapi-sync
```

---

## ⚙️ 配置选项

在 `~/.openclaw/config.json` 中配置：

```json
{
  "plugins": {
    "dmxapi": {
      "apiKey": "sk-xxxxxxxx",
      "autoSync": true,
      "syncInterval": 86400,
      "inviteCode": "LpUa",
      "enableBalanceNotify": true,
      "balanceThreshold": 10
    }
  }
}
```

| 选项 | 说明 | 默认值 |
|------|------|--------|
| `apiKey` | DMXAPI API Key | 必填 |
| `autoSync` | 是否自动同步模型 | `true` |
| `syncInterval` | 同步间隔（秒） | `86400` (24 小时) |
| `inviteCode` | 邀请码 | `LpUa` |
| `enableBalanceNotify` | 启用余额通知 | `true` |
| `balanceThreshold` | 余额不足阈值（元） | `10` |

---

## 💡 使用场景

### 1️⃣ 自动更新模型列表

插件会每 24 小时自动同步 DMXAPI 的最新模型，无需手动更新配置。

### 2️⃣ 余额监控

当余额低于阈值时，会自动发送通知提醒充值。

### 3️⃣ 邀请返利

用户通过你的邀请链接注册并充值，你可以获得返利。

查看邀请统计：
```bash
openclaw dmxapi-invites
```

---

## 🔧 开发

### 本地开发

```bash
# 克隆项目
git clone https://github.com/mmxers/openclaw-dmxapi

# 安装依赖
npm install

# 编译
npm run build

# 监听模式
npm run dev
```

### 测试

```bash
# 运行测试
npm test
```

---

## 📊 模型支持

### 免费模型

- GPT-5.2 / GPT-5.2-Pro
- Claude Sonnet 4 / Opus 4
- Gemini 2.5 Flash / Pro
- 以及更多...

### 付费模型

- Gemini 3.1 Flash Image (生图)
- Gemini 3 Pro Image (生图)
- Gemini 2.5 Pro TTS (语音)
- 以及更多...

---

## 🤝 商务合作

DMXAPI 官方合作：
- 📧 邮箱：support@dmxapi.cn
- 💬 微信：
- 🌐 官网：https://www.dmxapi.cn

---

## 📝 更新日志

### v1.0.0 (2026-04-01)

- ✨ 初始版本发布
- 🔄 模型列表自动同步
- 💰 余额查询功能
- 🔔 余额不足通知
- 🎯 邀请返利追踪

---

## 📄 许可证

MIT License © 2026 木木

---

## 🙏 致谢

- [DMXAPI](https://www.dmxapi.cn) - 提供优质的大模型 API 服务
- [OpenClaw](https://github.com/openclaw/openclaw) - 强大的 AI 网关框架

---

**🦞 Happy Coding!**
