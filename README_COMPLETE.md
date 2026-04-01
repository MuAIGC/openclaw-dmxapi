# 🦞 OpenClaw DMXAPI 插件 - 完整使用指南

> 版本：v1.0.0  
> 更新日期：2026-04-01  
> 状态：✅ 正式发布

---

## 📖 目录

1. [简介](#简介)
2. [安装](#安装)
3. [配置](#配置)
4. [功能列表](#功能列表)
5. [命令详解](#命令详解)
6. [使用示例](#使用示例)
7. [常见问题](#常见问题)
8. [最佳实践](#最佳实践)

---

## 简介

**OpenClaw DMXAPI 插件** 是一个功能完整的 DMXAPI 平台管理工具，提供：

- 🎯 **模型管理** - 766+ 个真实模型，自动同步
- 💰 **余额查询** - 实时查看账户额度和消耗
- 📊 **消耗统计** - 按时间/模型查询使用情况
- 📋 **日志查询** - 详细的 API 调用日志
- 🔑 **令牌管理** - 创建/更新/删除 API Key
- 🔒 **模型限制** - 为 Key 设置可用模型白名单

---

## 安装

### 从 npm 安装

```bash
openclaw plugins install openclaw-dmxapi
```

### 本地安装（开发测试）

```bash
cd /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi
openclaw plugins install .
```

### 验证安装

```bash
openclaw plugins list | grep dmxapi
```

---

## 配置

### 1️⃣ 获取系统令牌和用户 ID

1. 登录 DMXAPI：https://www.dmxapi.cn
2. 进入：**工作台** → **个人设置** → **更多选项**
3. 复制：
   - **系统令牌**（如：`<YOUR_SYSTEM_TOKEN>`）
   - **用户 ID**（如：`<YOUR_USER_ID>`）

### 2️⃣ 配置插件

```bash
# 设置系统令牌和用户 ID
openclaw dmxapi-token <系统令牌> <用户 ID>

# 示例
openclaw dmxapi-token <YOUR_SYSTEM_TOKEN> <YOUR_USER_ID>
```

### 3️⃣ 验证配置

```bash
# 查询余额验证配置
openclaw dmxapi-balance

# 查看令牌列表
openclaw dmxapi-tokens list
```

### 4️⃣ 配置文件

**位置：** `~/.openclaw/config.json`

**完整配置示例：**

```json
{
  "plugins": {
    "dmxapi": {
      "enabled": true,
      "apiKey": "sk-<YOUR_API_KEY>",
      "systemToken": "<YOUR_SYSTEM_TOKEN>",
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

## 功能列表

| 功能模块 | 命令 | 说明 |
|----------|------|------|
| **模型管理** | `dmxapi-models` | 查看 766+ 个可用模型 |
| **余额查询** | `dmxapi-balance` | 查看账户额度和消耗 |
| **消耗统计** | `dmxapi-stat [mode]` | 按时间查询消耗统计 |
| **日志查询** | `dmxapi-logs [mode]` | 查看详细调用日志 |
| **令牌列表** | `dmxapi-tokens list` | 查看所有 API Key |
| **令牌搜索** | `dmxapi-tokens search` | 搜索特定 Key |
| **令牌创建** | `dmxapi-tokens create` | 创建新的 API Key |
| **令牌更新** | `dmxapi-tokens update` | 修改 Key 配置 |
| **令牌启用** | `dmxapi-tokens enable` | 启用 Key |
| **令牌禁用** | `dmxapi-tokens disable` | 禁用 Key |
| **令牌删除** | `dmxapi-tokens delete` | 删除 Key |
| **模型同步** | `dmxapi-sync` | 手动同步模型列表 |
| **令牌配置** | `dmxapi-token` | 设置系统令牌 |

---

## 命令详解

### 1. 模型管理

#### 查看所有模型

```bash
openclaw dmxapi-models
```

**输出示例：**

```
✅ 共 766 个模型
   💚 免费：37 个
   💰 付费：729 个

📌 CHAT (400 个):
   - GPT-5.2 💚 免费
   - GPT-5.2 Pro 💰 ¥0.5000/K
   - Claude Sonnet 4 💚 免费
   ...
```

#### 搜索模型

```bash
# 按关键词搜索
openclaw dmxapi-model search gpt

# 只看免费模型
openclaw dmxapi-model free

# 只看付费模型
openclaw dmxapi-model paid
```

---

### 2. 余额查询

```bash
openclaw dmxapi-balance
```

**输出示例：**

```
┌─────────────────────────────────┐
│      DMXAPI 余额                │
├─────────────────────────────────┤
│ 用户：github_<YOUR_USER_ID> (Tier 5)      │
│ 账户额度：20,174,699             │
│ 人民币余额：￥40.35              │
└─────────────────────────────────┘
```

---

### 3. 消耗统计

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

### 4. 日志查询

```bash
# 今天的日志
openclaw dmxapi-logs today

# 最近 7 天的日志
openclaw dmxapi-logs week

# 查询特定模型的日志
openclaw dmxapi-logs week gpt-5.2
```

**输出示例：**

```
✅ 找到 150 条记录（显示前 20 条）

┌──────┬────────────────────┬───────────────┬────────────┬──────────┐
│ 时间 │ 模型               │ 消耗额度      │ Token      │ 请求数   │
├──────┼────────────────────┼───────────────┼────────────┼──────────┤
│ 09:30 │ gpt-5.2            │ ￥0.002000    │ 1,250      │ 1        │
│ 09:28 │ claude-sonnet-4    │ ￥0.003000    │ 1,800      │ 1        │
└──────┴────────────────────┴───────────────┴────────────┴──────────┘
```

---

### 5. 令牌管理

#### 查看所有令牌

```bash
openclaw dmxapi-tokens list
```

**输出示例：**

```
✅ 共 7 个令牌（显示前 50 个）

┌──────┬────────────────────┬─────────┬────────────┬──────────┬────────────┐
│ ID   │ 名称               │ 状态    │ 剩余额度   │ 最后访问 │ 过期时间   │
├──────┼────────────────────┼─────────┼────────────┼──────────┼────────────┤
│ 54274 │ 查询               │ ✅      │ ￥1.00     │ 04/01    │ 永不过期   │
│ 50957 │ GLM-4.1V          │ ✅      │ ∞          │ 03/25    │ 永不过期   │
└──────┴────────────────────┴─────────┴────────────┴──────────┴────────────┘
```

#### 创建令牌

```bash
# 无限额度令牌
openclaw dmxapi-tokens create

# 带名称的令牌
openclaw dmxapi-tokens create 我的项目令牌

# 有限额度令牌（50 万 quota = ￥1.00）
openclaw dmxapi-tokens create 测试令牌 500000

# 指定分组
openclaw dmxapi-tokens create 项目 A 1000000 default
```

#### 更新令牌

```bash
# 修改名称
openclaw dmxapi-tokens update 54318 新名称

# 修改额度
openclaw dmxapi-tokens update 54318 "" 1000000

# 修改分组
openclaw dmxapi-tokens update 54318 "" "" default

# 设置模型限制（只允许使用免费模型）
openclaw dmxapi-tokens update 54318 "" "" "" "gpt-5.2,kimi-k2.5-free,gemini-2.5-flash"

# 移除模型限制
openclaw dmxapi-tokens update 54318 "" "" "" ""
```

#### 启用/禁用令牌

```bash
# 启用令牌
openclaw dmxapi-tokens enable 54318

# 禁用令牌
openclaw dmxapi-tokens disable 54318
```

#### 删除令牌

```bash
# 删除令牌（不可恢复！）
openclaw dmxapi-tokens delete 54318
```

#### 搜索令牌

```bash
# 按名称搜索
openclaw dmxapi-tokens search GLM

# 按 Key 搜索
openclaw dmxapi-tokens search sk-abc
```

---

## 使用示例

### 场景 1：新项目初始化

```bash
# 1. 安装插件
openclaw plugins install openclaw-dmxapi

# 2. 配置系统令牌
openclaw dmxapi-token <YOUR_SYSTEM_TOKEN> <YOUR_USER_ID>

# 3. 查看可用模型
openclaw dmxapi-models

# 4. 创建项目专用令牌
openclaw dmxapi-tokens create ProjectA 2000000 default

# 5. 设置模型限制（只允许免费模型）
openclaw dmxapi-tokens update <令牌 ID> "" "" "" "gpt-5.2,kimi-k2.5-free"
```

### 场景 2：日常监控

```bash
# 每天早上查看余额
openclaw dmxapi-balance

# 每周查看消耗统计
openclaw dmxapi-stat week

# 每月导出日志
openclaw dmxapi-logs month
```

### 场景 3：令牌轮换

```bash
# 1. 创建新令牌
openclaw dmxapi-tokens create "Q2_2026_Token" 5000000

# 2. 更新应用配置使用新令牌

# 3. 禁用旧令牌
openclaw dmxapi-tokens disable <旧令牌 ID>

# 4. 确认无误后删除
openclaw dmxapi-tokens delete <旧令牌 ID>
```

### 场景 4：异常排查

```bash
# 1. 查看今天的消耗
openclaw dmxapi-stat today

# 2. 如果 RPM 异常高，查看详细日志
openclaw dmxapi-logs today

# 3. 找到异常的令牌
openclaw dmxapi-tokens list

# 4. 禁用可疑令牌
openclaw dmxapi-tokens disable <令牌 ID>
```

---

## 常见问题

### Q1: 提示"无权访问"

**错误信息：**
```
❌ 查询失败：无权访问，请检查用户 ID 是否正确
```

**解决方法：**
1. 检查系统令牌是否正确
2. 检查用户 ID 是否正确
3. 确保令牌和用户 ID 匹配

### Q2: 模型列表为空

**错误信息：**
```
💭 没有符合条件的日志记录
```

**解决方法：**
1. 检查时间范围是否正确
2. 确认是否有 API 调用记录
3. 尝试查询今天的数据

### Q3: 令牌创建失败

**错误信息：**
```
❌ 创建失败：无权进行此操作
```

**解决方法：**
1. 确认系统令牌有效
2. 确认有创建令牌的权限
3. 检查分组是否存在（使用 `default`）

### Q4: 模型限制不生效

**问题：** 设置了模型限制但还是能调用其他模型

**解决方法：**
1. 确认 `model_limits_enabled` 已设置为 `true`
2. 确认 `model_limits` 已填写模型列表
3. 使用受限 Key 重新测试

### Q5: 额度计算

**Q: quota 和人民币如何换算？**

**A:** 
```
1 元 = 500,000 quota
quota = 元 × 500000
元 = quota / 500000

示例：
500,000 quota = ￥1.00
1,000,000 quota = ￥2.00
5,000,000 quota = ￥10.00
```

---

## 最佳实践

### 1. 令牌管理

**✅ 推荐做法：**
- 为每个项目创建独立令牌
- 设置合理的额度限制
- 定期轮换令牌（每季度）
- 禁用不用的令牌

**❌ 避免做法：**
- 所有项目共用一个令牌
- 使用无限额度令牌用于生产
- 令牌泄露后不及时禁用

### 2. 额度管理

**✅ 推荐做法：**
- 设置额度告警（默认￥10）
- 定期检查消耗统计
- 为测试环境设置低额度
- 为生产环境设置合理额度

**❌ 避免做法：**
- 不监控额度使用
- 测试环境使用无限额度
- 额度用完才发现

### 3. 模型限制

**✅ 推荐做法：**
- 为测试 Key 设置免费模型白名单
- 为生产 Key 设置必要的付费模型
- 定期审查模型使用情况

**❌ 避免做法：**
- 所有 Key 都不设限制
- 测试 Key 可以使用所有付费模型
- 不审查异常模型调用

### 4. 安全建议

**✅ 推荐做法：**
- 系统令牌妥善保管
- 定期更换系统令牌
- 启用 IP 白名单（如支持）
- 监控异常调用

**❌ 避免做法：**
- 系统令牌提交到代码库
- 长期不更换令牌
- 不监控调用日志

---

## 附录

### A. 可用模型列表

**免费模型（37 个）：**
- gpt-5.2, gpt-5.2-flash
- kimi-k2.5-free, kimi-k2.5-cc
- GLM-4.1V-Thinking-Flash
- gemini-2.5-flash, gemini-2.5-flash-ssvip
- qwen3-8b-free, qwen-turbo-2024-09-19
- doubao-1-5-lite-32k-250115, doubao-lite-4k
- 等 37 个免费模型

**付费模型（729 个）：**
- GPT-5.2-Pro, GPT-4o
- Claude-Sonnet-4, Claude-Opus-4
- Gemini-3-Pro, Gemini-3-Flash
- 等 729 个付费模型

### B. 额度换算表

| Quota | 人民币 | 说明 |
|-------|--------|------|
| 500,000 | ￥1.00 | 基础额度 |
| 1,000,000 | ￥2.00 | 标准额度 |
| 5,000,000 | ￥10.00 | 大额额度 |
| 10,000,000 | ￥20.00 | 超大额度 |
| 无限 | - | 无限制 |

### C. 命令速查表

```bash
# 模型管理
openclaw dmxapi-models
openclaw dmxapi-model search <关键词>

# 余额查询
openclaw dmxapi-balance

# 消耗统计
openclaw dmxapi-stat [today|yesterday|week|month]

# 日志查询
openclaw dmxapi-logs [today|yesterday|week|month] [模型]

# 令牌管理
openclaw dmxapi-tokens list
openclaw dmxapi-tokens search <关键词>
openclaw dmxapi-tokens create [名称] [额度] [分组]
openclaw dmxapi-tokens update <ID> [名称] [额度] [分组] [模型]
openclaw dmxapi-tokens enable <ID>
openclaw dmxapi-tokens disable <ID>
openclaw dmxapi-tokens delete <ID>

# 系统配置
openclaw dmxapi-token <系统令牌> <用户 ID>
openclaw dmxapi-sync
```

---

## 联系方式

- 📧 邮箱：support@dmxapi.cn
- 💬 微信：DMXAPI 官方
- 🌐 官网：https://www.dmxapi.cn
- 📚 文档：https://doc.dmxapi.cn

---

## 许可证

MIT License © 2026 DMXAPI Plugin Team

---

**🦞 Happy Coding!**
