# 🦞 DMXAPI 插件 - 使用官方 API 获取真实模型列表

> 版本：v1.0.0  
> 更新日期：2026-04-01  
> 状态：✅ 使用官方 API

---

## 📌 重要更新

**之前的问题：**
- ❌ 网页爬取，拿不到真实数据
- ❌ 免费/付费全靠猜
- ❌ 模型信息不准确

**现在的方案：**
- ✅ 使用 DMXAPI 官方 API
- ✅ 获取真实模型列表和价格
- ✅ 自动识别免费/付费模型

---

## 🔧 官方 API 文档

**接口地址：**
```
GET https://www.dmxapi.cn/v1/models
```

**请求头：**
```
Authorization: <你的 API Key>
Accept: application/json
Rix-Api-User: <你的用户 ID>（可选）
```

**响应格式：**
```json
{
  "data": [
    {
      "id": "gpt-5.2",
      "name": "GPT-5.2",
      "is_free": true,
      "multiplier": 0,
      "price": 0
    },
    {
      "id": "gpt-5.2-pro",
      "name": "GPT-5.2 Pro",
      "is_free": false,
      "multiplier": 1.0,
      "price": 0.5
    }
  ]
}
```

---

## 🚀 使用方法

### 1️⃣ 设置 API Key

```bash
openclaw dmxapi-setup sk-<YOUR_API_KEY>
```

### 2️⃣ 查看模型列表

```bash
openclaw dmxapi-models
```

**输出示例：**
```
✅ 共 12 个模型
   💚 免费：9 个
   💰 付费：3 个

📌 CHAT (6 个):
   - GPT-5.2 💚 免费
   - GPT-5.2 Pro 💰 ¥0.5000/K
   - Claude Sonnet 4 💚 免费
   ...

📌 IMAGE (3 个):
   - Gemini 3.1 Flash Image 💰 ¥0.5000/K
   ...
```

### 3️⃣ 手动同步

```bash
openclaw dmxapi-sync
```

---

## ⚙️ 配置说明

### 完整配置

```json
{
  "plugins": {
    "dmxapi": {
      "apiKey": "sk-<YOUR_API_KEY>",
      "userId": "123456",
      "autoSync": true,
      "syncInterval": 86400,
      "inviteCode": "LpUa",
      "enableBalanceNotify": true,
      "balanceThreshold": 10
    }
  }
}
```

### 配置项说明

| 配置项 | 必填 | 说明 |
|--------|------|------|
| `apiKey` | ✅ | DMXAPI API Key |
| `userId` | ❌ | 用户 ID（个人设置页面获取） |
| `autoSync` | ❌ | 是否自动同步（默认 true） |
| `syncInterval` | ❌ | 同步间隔秒数（默认 86400） |
| `inviteCode` | ❌ | 邀请码 |
| `enableBalanceNotify` | ❌ | 余额通知 |
| `balanceThreshold` | ❌ | 余额阈值（元） |

---

## 📊 模型分类

插件会自动识别模型类型：

| 类型 | 关键词 | 示例 |
|------|--------|------|
| 💬 Chat | 默认 | GPT, Claude, Gemini |
| 🎨 Image | image, draw, 绘，t2i | gpt-image, seedream |
| 🎥 Video | video, t2v, i2v | sora, hailuo, kling |
| 🎵 Audio | tts, stt, speech, 语音 | mimo-v2-tts |
| 📊 Embedding | embed, rerank | doubao-embedding |
| 📦 OCR | ocr, transcribe | qwen-vl-ocr |

---

## 💰 免费/付费识别

**自动识别规则：**

1. `is_free: true` → 免费
2. `multiplier: 0` → 免费
3. 其他 → 付费

**付费价格计算：**
```
价格 (元/K tokens) = multiplier × 0.004
```

---

## 🔧 故障排查

### 问题 1: 提示"API Key 无效"

**解决：**
1. 检查 API Key 是否正确
2. 确认 API Key 未过期
3. 重新创建 API Key

### 问题 2: 同步失败

**可能原因：**
- 网络连接问题
- API Key 权限不足
- 服务器暂时不可用

**解决：**
```bash
# 手动重试
openclaw dmxapi-sync

# 查看日志
openclaw logs | grep DMXAPI
```

### 问题 3: 模型列表为空

**解决：**
1. 确认 API Key 有效
2. 检查是否有模型可用
3. 联系 DMXAPI 客服

---

## 📞 联系方式

- 📧 邮箱：support@dmxapi.cn
- 💬 微信：DMXAPI666
- 🌐 官网：https://www.dmxapi.cn
- 📚 文档：https://doc.dmxapi.cn

---

## 📄 许可证

MIT License © 2026 DMXAPI Plugin Team

---

**🦞 Happy Coding!**
