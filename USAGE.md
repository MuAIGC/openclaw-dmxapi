# 🦞 DMXAPI 插件使用文档

> 版本：v1.0.1  
> 更新日期：2026-04-01  
> 作者：木木

---

## 📖 快速开始

**3 分钟完成配置，立即使用！**

### 第一步：获取 DMXAPI 凭证

1. 访问 [DMXAPI 官网](https://www.dmxapi.cn)
2. 登录账号
3. 进入 **个人设置** → **更多选项**
4. 复制以下内容：
   - **系统令牌**（如：`你的系统令牌`）
   - **用户 ID**（如：`****`）

### 第二步：配置插件

编辑 OpenClaw 配置文件：

```bash
openclaw config edit
```

添加 DMXAPI 配置：

```json
{
  "plugins": {
    "entries": {
      "openclaw-dmxapi": {
        "enabled": true,
        "config": {
          "apiKey": "sk-你的 API Key",
          "systemToken": "你的系统令牌",
          "userId": "你的用户 ID",
          "autoSync": true
        }
      }
    }
  }
}
```

**配置说明：**

| 配置项 | 用途 | 必填 | 获取方式 |
|--------|------|------|----------|
| `apiKey` | 调用模型用 | ✅ | 令牌管理页面创建 |
| `systemToken` | 账户管理用 | ✅ | 个人设置 → 更多选项 |
| `userId` | 账户管理用 | ✅ | 个人设置 → 更多选项 |
| `autoSync` | 自动同步模型 | ❌ | 默认 true |

### 第三步：验证配置

```bash
# 查询余额（验证系统令牌）
openclaw dmxapi balance

# 查看模型列表（验证 API Key）
openclaw dmxapi models --gemini
```

---

## 📋 命令速查

### 基础命令

| 命令 | 用途 | 示例 |
|------|------|------|
| `openclaw dmxapi balance` | 查询账户余额 | `openclaw dmxapi balance` |
| `openclaw dmxapi models` | 查看模型列表 | `openclaw dmxapi models --gemini` |
| `openclaw dmxapi tokens` | 查看令牌列表 | `openclaw dmxapi tokens --limit 10` |
| `openclaw dmxapi setup` | 配置向导 | `openclaw dmxapi setup` |

### 令牌管理

| 命令 | 用途 | 示例 |
|------|------|------|
| `openclaw dmxapi token-create` | 创建新令牌 | `openclaw dmxapi token-create "项目 A" --quota 500000` |
| `openclaw dmxapi token-create --unlimited` | 创建无限额度令牌 | `openclaw dmxapi token-create "生产令牌" --unlimited` |

---

## 🎯 详细命令说明

### 1. 查询余额

```bash
openclaw dmxapi balance
```

**输出示例：**

```
┌─────────────────────────────┐
│      DMXAPI 账户余额        │
├─────────────────────────────┤
│ 用户：github_****
│ 账户额度：20,161,356
│ 人民币余额：¥40.32
└─────────────────────────────┘
```

**说明：**
- 账户额度单位：quota（500,000 quota = ¥1）
- 人民币余额 = 账户额度 ÷ 500,000

---

### 2. 查看模型列表

```bash
# 查看所有模型
openclaw dmxapi models

# 只看 Gemini 系列
openclaw dmxapi models --gemini

# 只看免费模型
openclaw dmxapi models --free
```

**输出示例：**

```
✅ 共 762 个模型
🎯 Gemini 系列：42 个

📋 Gemini 模型列表：
1. gemini-3.1-flash-lite-preview-ssvip - 💰 付费
2. gemini-2.5-flash-preview-05-20 - 💰 付费
3. gemini-3.1-pro-preview-thinking - 💰 付费
...
```

---

### 3. 查看令牌列表

```bash
# 查看前 10 个令牌
openclaw dmxapi tokens --limit 10

# 查看全部令牌
openclaw dmxapi tokens --limit 100
```

**输出示例：**

```
✅ 共 10 个令牌

┌──────┬────────────────┬────────┬──────────┬────────────┐
│ ID   │ 名称           │ 状态   │ 剩余额度 │ 最后访问   │
├──────┼────────────────┼────────┼──────────┼────────────┤
│ 54341 │ 插件测试令牌    │ ✅ 启用 │ ¥0.00    │ 2026/4/1   │
│ 54318 │ 插件测试令牌    │ ✅ 启用 │ ¥2.00    │ 2026/4/1   │
│ 54317 │ 测试令牌       │ ✅ 启用 │ ∞        │ 2026/4/1   │
└──────┴────────────────┴────────┴──────────┴────────────┘
```

---

### 4. 创建令牌

**创建有限额度令牌：**

```bash
# 创建 ¥1 额度的令牌（500,000 quota）
openclaw dmxapi token-create "测试令牌" --quota 500000

# 创建 ¥10 额度的令牌（5,000,000 quota）
openclaw dmxapi token-create "项目令牌" --quota 5000000
```

**创建无限额度令牌：**

```bash
openclaw dmxapi token-create "生产令牌" --unlimited
```

**输出示例：**

```
✅ 令牌创建成功！

┌─────────────────────────────┐
│ 令牌信息                    │
├─────────────────────────────┤
│ ID: 54560
│ 名称：测试令牌
│ Key: sk-xxxxxxxxxxxxxxx
│ 额度：¥1.00
│ 过期：永不过期
└─────────────────────────────┘
```

**额度换算：**

| Quota | 人民币 | 说明 |
|-------|--------|------|
| 500,000 | ¥1.00 | 基础额度 |
| 1,000,000 | ¥2.00 | 标准额度 |
| 5,000,000 | ¥10.00 | 大额额度 |
| -1 | ∞ | 无限额度 |

---

### 5. 配置向导

```bash
openclaw dmxapi setup
```

**输出：**

```
┌──────────────────────────────────────┐
│   DMXAPI 配置向导                    │
├──────────────────────────────────────┤
│  1. 访问 https://www.dmxapi.cn       │
│  2. 登录账号                         │
│  3. 进入「个人设置」→「更多选项」    │
│  4. 复制系统令牌和用户 ID            │
│  5. 运行：openclaw config edit       │
│  6. 添加配置（见上文）               │
└──────────────────────────────────────┘
```

---

## 🔧 高级功能（curl 命令）

以下功能需要使用 `curl` 直接调用 DMXAPI：

### 1. 修改令牌配置

**完整修改（推荐）：**

```bash
curl -X PUT "https://www.dmxapi.cn/api/token/" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 令牌 ID,
    "name": "新名称",
    "quota": 5000000,
    "unlimited_quota": false,
    "group": "project-a",
    "model_limits_enabled": true,
    "model_limits": "gpt-5.2,kimi-k2.5-free,gemini-2.5-flash",
    "expired_time": -1,
    "allow_ips": "",
    "exclude_ips": ""
  }'
```

**参数说明：**

| 参数 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `id` | number | 令牌 ID | `54318` |
| `name` | string | 令牌名称 | `"项目 A"` |
| `quota` | number | 额度（quota） | `5000000`（¥10） |
| `unlimited_quota` | boolean | 无限额度 | `false` |
| `group` | string | 分组名称 | `"project-a"` |
| `model_limits_enabled` | boolean | 启用模型限制 | `true` |
| `model_limits` | string | 允许的模型列表 | `"gpt-5.2,kimi-k2.5-free"` |
| `expired_time` | number | 过期时间戳 | `-1`（永不过期） |
| `allow_ips` | string | IP 白名单 | `"192.168.1.1,10.0.0.1"` |
| `exclude_ips` | string | IP 黑名单 | `""` |

---

### 2. 设置模型限制

**限制令牌只能使用免费模型：**

```bash
curl -X PUT "https://www.dmxapi.cn/api/token/" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 54318,
    "model_limits_enabled": true,
    "model_limits": "gpt-5.2,kimi-k2.5-free,gemini-2.5-flash,qwen-flash"
  }'
```

**常用免费模型：**
- `gpt-5.2` - OpenAI GPT-5.2 免费
- `kimi-k2.5-free` - Kimi K2.5 免费
- `gemini-2.5-flash` - Gemini 2.5 Flash 免费
- `qwen-flash` - Qwen Flash 免费
- `glm-4.7-flash` - GLM-4.7 Flash 免费

---

### 3. 设置令牌分组

```bash
curl -X PUT "https://www.dmxapi.cn/api/token/" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 54318,
    "group": "project-a"
  }'
```

**分组建议：**
- `default` - 默认分组
- `project-a` - 项目 A
- `production` - 生产环境
- `testing` - 测试环境
- `development` - 开发环境

---

### 4. 删除令牌

```bash
curl -X DELETE "https://www.dmxapi.cn/api/token/令牌 ID" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID"
```

**⚠️ 警告：** 删除后无法恢复！

---

### 5. 查询使用统计

**今日统计：**

```bash
curl "https://www.dmxapi.cn/api/log/self/stat?start_date=2026-04-01&end_date=2026-04-01" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID"
```

**最近 7 天统计：**

```bash
curl "https://www.dmxapi.cn/api/log/self/stat?start_date=2026-03-25&end_date=2026-04-01" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID"
```

**输出示例：**

```json
{
  "success": true,
  "data": {
    "total_quota": 500000,
    "total_count": 100,
    "models": {
      "gpt-5.2": 50,
      "gemini-2.5-flash": 30,
      "kimi-k2.5-free": 20
    }
  }
}
```

---

## 💡 最佳实践

### 1. 令牌管理策略

**生产环境：**
```bash
# 创建无限额度 + 模型限制
openclaw dmxapi token-create "生产_主服务" --unlimited
# 然后设置模型限制为生产用模型
```

**测试环境：**
```bash
# 创建有限额度（¥5-10）
openclaw dmxapi token-create "测试_开发" --quota 2500000
```

**临时使用：**
```bash
# 创建小额度（¥1-2）
openclaw dmxapi token-create "临时_外包" --quota 500000
# 设置过期时间（7 天）
```

### 2. 额度分配建议

| 用途 | 额度 | 说明 |
|------|------|------|
| 开发测试 | ¥1-5 | 日常开发调试 |
| 小项目 | ¥10-50 | 个人项目 |
| 中型项目 | ¥50-200 | 团队项目 |
| 生产环境 | ∞ | 无限额度 + 监控 |

### 3. 安全建议

**✅ 推荐做法：**
- 为每个项目创建独立令牌
- 设置合理的额度限制
- 启用模型限制（只允许必要模型）
- 定期轮换令牌（每季度）
- 禁用不用的令牌

**❌ 避免做法：**
- 所有项目共用一个令牌
- 使用无限额度令牌用于测试
- 令牌泄露后不及时禁用
- 令牌提交到代码库

---

## 🔍 常见问题

### Q1: 提示"未配置 API Key"

**错误信息：**
```
❌ 未配置 API Key，请先配置：openclaw config edit
```

**解决方法：**
1. 运行 `openclaw config edit`
2. 添加 `apiKey` 配置
3. 保存后重试

---

### Q2: 提示"未配置系统令牌"

**错误信息：**
```
❌ 未配置系统令牌或用户 ID
```

**解决方法：**
1. 登录 DMXAPI 官网
2. 进入「个人设置」→「更多选项」
3. 复制系统令牌和用户 ID
4. 添加到配置文件

---

### Q3: 余额为 0 怎么办？

**说明：**
- 余额为 0 仍可使用 **免费模型**
- 付费模型需要充值

**免费模型列表：**
```bash
openclaw dmxapi models | grep "💚 免费"
```

---

### Q4: 如何查看某个令牌的详细信息？

```bash
curl "https://www.dmxapi.cn/api/token/令牌 ID" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID" | python3 -m json.tool
```

---

### Q5: 如何批量删除测试令牌？

```bash
# 先查看要删除的令牌
openclaw dmxapi tokens --limit 20

# 然后逐个删除
curl -X DELETE "https://www.dmxapi.cn/api/token/ID" \
  -H "Authorization: 你的系统令牌" \
  -H "Rix-Api-User: 你的用户 ID"
```

---

## 📞 联系方式

- **DMXAPI 官网：** https://www.dmxapi.cn
- **DMXAPI 文档：** https://doc.dmxapi.cn
- **客服微信：** DMXAPI 官方
- **邮箱：** support@dmxapi.cn

---

## 📝 更新日志

### v1.0.1 (2026-04-01)

**新增功能：**
- ✅ 令牌创建（有限额度/无限额度）
- ✅ 令牌列表查询
- ✅ 余额查询
- ✅ 模型列表查询
- ✅ 配置向导

**高级功能：**
- ✅ 修改令牌配置（curl）
- ✅ 设置模型限制
- ✅ 设置令牌分组
- ✅ 设置过期时间
- ✅ IP 白名单/黑名单
- ✅ 删除令牌
- ✅ 使用统计查询

---

**🦞 Happy Coding!**

_最后更新：2026-04-01 15:20_
