# 🦞 OpenClaw DMXAPI 插件 - 完整功能文档

> 版本：v1.0.0 | 更新日期：2026-04-01

---

## 🎯 核心功能

### 1️⃣ 自动模型同步

**功能：** 从 DMXAPI 官网自动爬取最新模型列表

**特点：**
- ✅ 自动爬取官网文档页面
- ✅ 智能过滤非模型内容
- ✅ 自动分类（对话/生图/视频/语音/Embedding）
- ✅ 自动标记免费/付费
- ✅ 24 小时自动更新

**当前模型数量：** 59 个真实模型

**模型分类统计：**
```
💬 对话模型：43 个
🎨 生图模型：5 个
🎥 视频模型：3 个
🎵 语音模型：4 个
📊 Embedding：4 个
```

---

### 2️⃣ 邀请返利系统

**邀请链接：** `https://www.dmxapi.cn/register?aff=LpUa`

**返利规则：**
- 被邀请人充值返利：10-20%
- 被邀请人消费返利：5-10%

**收益计算：**
```
100 用户 × 100 元/月 × 15% = 1,500 元/月（被动收入）
```

**追踪功能：**
- ✅ 自动记录邀请来源
- ✅ 实时统计邀请人数
- ✅ 返利金额自动计算

---

### 3️⃣ 余额监控

**功能：** 实时查询 DMXAPI 账户余额

**显示内容：**
```
┌─────────────────────────┐
│      DMXAPI 余额        │
├─────────────────────────┤
│ 总充值：  ¥100.00       │
│ 已消费：  ¥23.50        │
│ 剩余：    ¥76.50        │
└─────────────────────────┘
```

**余额提醒：**
- 阈值可配置（默认 10 元）
- 低于阈值自动通知
- 支持微信/邮件/短信通知

---

### 4️⃣ 用量统计

**功能：** 查看各模型的使用情况

**统计维度：**
- 按日期统计（今日/昨日/近 7 天/近 30 天）
- 按模型统计（GPT/Claude/Gemini 等）
- 按类型统计（对话/生图/视频等）

**示例输出：**
```
📊 近 7 天用量统计

日期        模型              Tokens    费用
─────────────────────────────────────────
04-01      GPT-5.2-Pro      50,000    ¥2.50
04-01      Gemini-Flash     30,000    ¥0.00
03-31      Claude-Sonnet    80,000    ¥4.00
...

总计：180,000 tokens | ¥6.50
```

---

## 🛠️ 命令系统

### 基础命令

| 命令 | 功能 | 示例 |
|------|------|------|
| `dmxapi-setup` | 设置向导 | `openclaw dmxapi-setup sk-xxx` |
| `dmxapi-models` | 查看模型列表 | `openclaw dmxapi-models` |
| `dmxapi-balance` | 查询余额 | `openclaw dmxapi-balance` |
| `dmxapi-sync` | 手动同步模型 | `openclaw dmxapi-sync` |
| `dmxapi-usage` | 用量统计 | `openclaw dmxapi-usage --days 7` |
| `dmxapi-invites` | 邀请统计 | `openclaw dmxapi-invites` |

### 高级命令

| 命令 | 功能 | 示例 |
|------|------|------|
| `dmxapi-model search` | 搜索模型 | `dmxapi-model search gpt` |
| `dmxapi-model free` | 只看免费模型 | `dmxapi-model free` |
| `dmxapi-model paid` | 只看付费模型 | `dmxapi-model paid` |
| `dmxapi-config` | 查看配置 | `dmxapi-config` |
| `dmxapi-help` | 帮助文档 | `dmxapi-help` |

---

## ⚙️ 配置选项

### 完整配置示例

```json
{
  "plugins": {
    "dmxapi": {
      "apiKey": "sk-<YOUR_API_KEY>",
      "autoSync": true,
      "syncInterval": 86400,
      "inviteCode": "LpUa",
      "enableBalanceNotify": true,
      "balanceThreshold": 10,
      "notifyChannel": "wechat",
      "usageReport": {
        "enabled": true,
        "frequency": "daily",
        "time": "09:00"
      }
    }
  }
}
```

### 配置说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `apiKey` | string | - | DMXAPI API Key（必填） |
| `autoSync` | boolean | true | 是否自动同步模型 |
| `syncInterval` | number | 86400 | 同步间隔（秒） |
| `inviteCode` | string | LpUa | 邀请码 |
| `enableBalanceNotify` | boolean | true | 启用余额通知 |
| `balanceThreshold` | number | 10 | 余额不足阈值（元） |
| `notifyChannel` | string | wechat | 通知渠道 |
| `usageReport.enabled` | boolean | true | 启用用量报告 |
| `usageReport.frequency` | string | daily | 报告频率 |
| `usageReport.time` | string | 09:00 | 报告时间 |

---

## 📊 模型管理

### 模型列表输出示例

```bash
$ openclaw dmxapi-models

✅ 共 59 个模型
   💚 免费：52 个
   💰 付费：7 个

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 💬 对话模型 (43 个):
   - GPT-5.2 💚 免费
   - GPT-5.2 Pro 💚 免费
   - Claude Sonnet 4 💚 免费
   - Claude Opus 4 💚 免费
   - Gemini 2.5 Flash 💚 免费
   - Gemini 2.5 Pro 💚 免费
   - Qwen-Max 💚 免费
   - Doubao-Pro 💚 免费
   ... 还有 35 个

📌 🎨 生图模型 (5 个):
   - Gemini 3.1 Flash Image 💰 ¥0.5000/K
   - Gemini 3 Pro Image 💰 ¥1.0000/K
   - Qwen-Image 💚 免费
   - Qwen-Image-Max 💚 免费
   - Doubao-Seedream 5.0 Lite 💚 免费

📌 🎥 视频模型 (3 个):
   - Sora2 💚 免费
   - Sora2-Pro 💰 ¥2.0000/K
   - Kling V2.6 💚 免费

📌 🎵 语音模型 (4 个):
   - Whisper-STT 💚 免费
   - GPT-TTS 💚 免费
   - MiMo-V2-TTS 💚 免费
   - MiniMax-Speech 💚 免费

📌 📊 Embedding (4 个):
   - Doubao-Embedding 💚 免费
   - 阿里 Text-Embedding-V4 💚 免费
   - OpenAI Embedding 💚 免费
   - BGE-Reranker 💚 免费
```

### 模型搜索示例

```bash
$ openclaw dmxapi-model search gpt

🔍 搜索 "gpt"

找到 5 个模型:

1. GPT-5.2 💚 免费
   提供商：OpenAI
   类型：对话
   文档：https://doc.dmxapi.cn/gpt-5.2.html

2. GPT-5.2 Pro 💚 免费
   提供商：OpenAI
   类型：对话
   文档：https://doc.dmxapi.cn/gpt-5.2-pro.html

3. GPT-TTS 💚 免费
   提供商：OpenAI
   类型：语音
   文档：https://doc.dmxapi.cn/openai-tts.html

4. GPT-Image 💰 ¥0.5000/K
   提供商：OpenAI
   类型：生图
   文档：https://doc.dmxapi.cn/gpt-image.html

5. GPT-4o-Transcribe 💚 免费
   提供商：OpenAI
   类型：语音
   文档：https://doc.dmxapi.cn/gpt-4o-transcribe.html
```

---

## 💰 商业模式

### 收入来源

| 来源 | 说明 | 预估收益 |
|------|------|----------|
| **邀请返利** | 用户通过邀请链接注册充值 | 10-20% 返利 |
| **消费返利** | 用户消费分成 | 5-10% |
| **高级功能** | 用量统计/自动优化等 | 9.9 元/月 |
| **企业版** | 团队管理/发票管理 | 49 元/月 |

### 收益预估

**场景 1：100 个活跃用户**
```
邀请返利：100 人 × 100 元/月 × 15% = 1,500 元/月
消费返利：100 人 × 50 元/月 × 5%  =   250 元/月
高级功能：20 人 × 9.9 元/月        =   198 元/月
────────────────────────────────────────────
总计：1,948 元/月
```

**场景 2：1000 个活跃用户**
```
邀请返利：1000 人 × 100 元/月 × 15% = 15,000 元/月
消费返利：1000 人 × 50 元/月 × 5%  =  2,500 元/月
高级功能：200 人 × 9.9 元/月       =  1,980 元/月
企业版：10 家 × 49 元/月          =    490 元/月
─────────────────────────────────────────────
总计：19,970 元/月
```

---

## 🔧 技术架构

### 项目结构

```
openclaw-dmxapi/
├── src/
│   ├── index.ts              # 主入口
│   ├── sdk.ts                # OpenClaw SDK
│   ├── api/
│   │   ├── models.ts         # 模型同步
│   │   └── balance.ts        # 余额查询
│   ├── commands/
│   │   └── index.ts          # 命令处理
│   └── utils/
│       ├── scraper.ts        # 网页爬虫
│       └── notifier.ts       # 通知服务
├── dist/                     # 编译输出
├── docs/                     # 文档
├── test/                     # 测试
├── package.json
├── tsconfig.json
└── README.md
```

### 核心模块

**1. 模型同步模块 (`api/models.ts`)**
```typescript
// 从官网爬取模型
const models = await scrapeModels();

// 自动分类
const grouped = groupModelsByType(models);

// 标记免费/付费
markFreeAndPaid(models);
```

**2. 余额查询模块 (`api/balance.ts`)**
```typescript
// 验证 API Key
const isValid = await verifyApiKey(apiKey);

// 查询余额
const balance = await getBalance(apiKey);

// 查询用量
const usage = await getUsage(apiKey, 7);
```

**3. 命令处理模块 (`commands/index.ts`)**
```typescript
// 注册命令
registerCommand('dmxapi-setup', setupHandler);
registerCommand('dmxapi-models', modelsHandler);
registerCommand('dmxapi-balance', balanceHandler);
```

---

## 🚀 快速开始

### 安装

```bash
# 安装插件
openclaw plugins install openclaw-dmxapi

# 启用插件
openclaw config set plugins.entries.dmxapi.enabled true
```

### 配置

```bash
# 设置 API Key
openclaw dmxapi-setup sk-<YOUR_API_KEY>

# 查看配置
openclaw dmxapi-config
```

### 使用

```bash
# 查看模型列表
openclaw dmxapi-models

# 查询余额
openclaw dmxapi-balance

# 手动同步
openclaw dmxapi-sync
```

---

## 📈 更新日志

### v1.0.0 (2026-04-01)

**✨ 新功能**
- ✅ 模型列表自动同步（59 个真实模型）
- ✅ 余额查询和监控
- ✅ 用量统计
- ✅ 邀请返利追踪
- ✅ 自动分类（对话/生图/视频/语音/Embedding）
- ✅ 免费/付费标记

**🐛 Bug 修复**
- ✅ 修复爬取失败时的 fallback 机制
- ✅ 优化模型去重逻辑
- ✅ 改进错误提示

**📝 文档**
- ✅ 完整用户文档
- ✅ 开发者 API 文档
- ✅ 故障排查指南

---

## 🤝 技术支持

### 联系方式

- 📧 邮箱：support@dmxapi.cn
- 💬 微信：DMXAPI666
- 🌐 官网：https://www.dmxapi.cn
- 📚 文档：https://doc.dmxapi.cn

### 常见问题

**Q: 模型同步失败怎么办？**
A: 检查网络连接，或手动运行 `openclaw dmxapi-sync`

**Q: API Key 无效？**
A: 登录 DMXAPI 后台重新创建 API Key

**Q: 如何查看邀请统计？**
A: 运行 `openclaw dmxapi-invites`

---

## 📄 许可证

MIT License © 2026 DMXAPI Plugin Team

---

**🦞 Happy Coding!**
