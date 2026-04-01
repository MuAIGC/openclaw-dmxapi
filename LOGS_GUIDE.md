# 🦞 DMXAPI 插件 - 日志查询功能

> 版本：v1.0.0  
> 更新日期：2026-04-01  
> 状态：✅ 已完成

---

## 📌 日志查询 API

**接口地址：**
```
GET https://www.dmxapi.cn/api/log/self/stat    # 消耗统计
GET https://www.dmxapi.cn/api/log/self         # 详细日志
```

**认证方式：**
- 系统令牌（System Token）
- 用户 ID（Rix-Api-User）

**返回数据：**
- `quota` - 总消耗额度
- `rpm` - Requests Per Minute（每分钟请求数）
- `tpm` - Tokens Per Minute（每分钟 Token 消耗）
- `mpm` - Messages Per Minute（每分钟消息数）

**计算公式：**
```
人民币余额（元）= quota / 500000
```

---

## 🚀 使用方法

### 1️⃣ 查询消耗统计

```bash
# 今天的统计
openclaw dmxapi-stat today

# 昨天的统计
openclaw dmxapi-stat yesterday

# 最近 7 天
openclaw dmxapi-stat week

# 最近 30 天
openclaw dmxapi-stat month
```

**输出示例：**
```
📊 正在查询 今天 的消耗统计...

┌─────────────────────────────────┐
│      DMXAPI 消耗统计报告        │
├─────────────────────────────────┤
│ 查询范围：今天                  │
├─────────────────────────────────┤
│ 总消耗额度：￥0.050000          │
│ 原始值：25000                   │
├─────────────────────────────────┤
│ RPM (请求/分钟): 5              │
│ TPM (Token/分钟): 1250          │
│ MPM (消息/分钟): 8              │
└─────────────────────────────────┘
```

---

### 2️⃣ 查询详细日志

```bash
# 今天的日志
openclaw dmxapi-logs today

# 昨天的日志
openclaw dmxapi-logs yesterday

# 本周的日志
openclaw dmxapi-logs week

# 本月的日志
openclaw dmxapi-logs month

# 查询特定模型的日志
openclaw dmxapi-logs week gpt-5.2
openclaw dmxapi-logs month claude
```

**输出示例：**
```
📋 正在查询 今天 的详细日志...

✅ 找到 150 条记录（显示前 20 条）

┌──────┬────────────────────┬───────────────┬────────────┬──────────┐
│ 时间 │ 模型               │ 消耗额度      │ Token      │ 请求数   │
├──────┼────────────────────┼───────────────┼────────────┼──────────┤
│ 09:30 │ gpt-5.2            │ ￥0.002000    │ 1,250      │ 1        │
│ 09:28 │ claude-sonnet-4    │ ￥0.003000    │ 1,800      │ 1        │
│ 09:25 │ gemini-2.5-flash   │ ￥0.001000    │ 850        │ 1        │
│ 09:20 │ gpt-5.2-pro        │ ￥0.005000    │ 3,200      │ 1        │
└──────┴────────────────────┴───────────────┴────────────┴──────────┘

💡 提示：总消耗 ￥0.050000
```

---

## 📊 查询模式

| 模式 | 说明 | 时间范围 |
|------|------|----------|
| `today` | 今天 | 今日 00:00 至今 |
| `yesterday` | 昨天 | 昨日 00:00-23:59 |
| `week` | 最近 7 天 | 7 天前至今 |
| `month` | 最近 30 天 | 30 天前至今 |
| `custom` | 自定义 | 需指定时间戳 |

---

## 🔧 高级用法

### 按模型筛选

```bash
# 查询 GPT-5.2 本周的使用情况
openclaw dmxapi-logs week gpt-5.2

# 查询 Claude 本月的使用情况
openclaw dmxapi-logs month claude

# 查询 Gemini 今天的用量
openclaw dmxapi-logs today gemini
```

### 按令牌筛选（需要 API 支持）

```bash
# 查询特定令牌的使用情况
# （需要插件支持 token_name 参数）
```

---

## 📋 数据指标说明

### 消耗额度 (Quota)

**定义：** 平台内部的额度单位

**换算：**
```
1 元 = 500,000 quota
quota = 元 × 500000
元 = quota / 500000
```

**示例：**
- 25,000 quota = ￥0.05
- 500,000 quota = ￥1.00
- 5,000,000 quota = ￥10.00

### RPM (Requests Per Minute)

**定义：** 每分钟请求数

**用途：** 监控 API 调用频率

**示例：**
- RPM = 10：平均每分钟 10 次请求
- RPM = 100：高频使用

### TPM (Tokens Per Minute)

**定义：** 每分钟 Token 消耗数

**用途：** 监控 Token 使用速度

**示例：**
- TPM = 1,000：轻度使用
- TPM = 10,000：中度使用
- TPM = 100,000：重度使用

### MPM (Messages Per Minute)

**定义：** 每分钟消息数

**用途：** 监控对话频率

---

## 💡 实用场景

### 场景 1: 每日用量检查

```bash
# 每天早上检查昨天的用量
openclaw dmxapi-stat yesterday
```

### 场景 2: 周报复销

```bash
# 每周统计本周用量
openclaw dmxapi-stat week
```

### 场景 3: 模型成本分析

```bash
# 查看各模型的使用情况
openclaw dmxapi-logs week gpt
openclaw dmxapi-logs week claude
openclaw dmxapi-logs week gemini
```

### 场景 4: 异常检测

```bash
# 检查是否有异常高频调用
openclaw dmxapi-stat today

# 如果 RPM 异常高，查看详细日志
openclaw dmxapi-logs today
```

---

## ⚙️ 配置文件

**配置位置：** `~/.openclaw/config.json`

**完整配置示例：**
```json
{
  "plugins": {
    "dmxapi": {
      "enabled": true,
      "apiKey": "sk-<YOUR_API_KEY>",
      "systemToken": "sys_xxxxxxxxxxx",
      "userId": "<YOUR_USER_ID>",
      "autoSync": true,
      "syncInterval": 86400,
      "inviteCode": "LpUa",
      "enableBalanceNotify": true,
      "balanceThreshold": 10
    }
  }
}
```

---

## 🔧 故障排查

### 问题 1: 无权访问

**错误信息：**
```
❌ 查询失败：无权访问，请检查用户 ID 是否正确
```

**解决方法：**
1. 检查用户 ID 是否正确
2. 确认系统令牌有效
3. 确保令牌和用户 ID 匹配

### 问题 2: 没有数据

**错误信息：**
```
💭 没有符合条件的日志记录
```

**解决方法：**
1. 检查时间范围是否正确
2. 确认是否有 API 调用记录
3. 尝试查询今天的数据

### 问题 3: 令牌过期

**错误信息：**
```
❌ 查询失败：系统令牌无效或已过期
```

**解决方法：**
1. 重新获取系统令牌
2. 更新配置：`openclaw dmxapi-token <新令牌> <用户 ID>`

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
