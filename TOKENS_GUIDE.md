# 🦞 DMXAPI 插件 - 令牌管理功能

> 版本：v1.0.0  
> 更新日期：2026-04-01  
> 状态：✅ 已完成

---

## 📌 令牌管理 API

**接口地址：**
```
GET    https://www.dmxapi.cn/api/token/       # 获取所有令牌
POST   https://www.dmxapi.cn/api/token/       # 创建令牌
PUT    https://www.dmxapi.cn/api/token/{id}   # 更新令牌
DELETE https://www.dmxapi.cn/api/token/{id}   # 删除令牌
```

**认证方式：**
- 系统令牌（Bearer Token）
- 用户 ID（Rix-Api-User）

---

## 🚀 使用方法

### 1️⃣ 查看所有令牌

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
│ 50957 │ GLM-4.1V          │ ✅      │ ￥1.00     │ 03/25    │ 永不过期   │
│ 49976 │ mimo-v2-tts       │ ✅      │ ￥1.00     │ 03/20    │ 永不过期   │
└──────┴────────────────────┴─────────┴────────────┴──────────┴────────────┘

💡 提示：使用 openclaw dmxapi-tokens search <关键词> 搜索更多令牌
```

---

### 2️⃣ 搜索令牌

```bash
# 按名称搜索
openclaw dmxapi-tokens search GLM

# 按 Key 搜索
openclaw dmxapi-tokens search sk-abc
```

**输出示例：**
```
🔍 正在搜索 "GLM"...

✅ 找到 2 个匹配的令牌：

┌─────────────────────────────────────────────┐
│ 令牌：GLM-4.1V-Thinking-Flash              │
├─────────────────────────────────────────────┤
│ ID        : 47176                           │
│ Key       : sk-**************************** │
│ 状态      : ✅ 启用                          │
│ 分组      : default                         │
├─────────────────────────────────────────────┤
│ 已用额度  : 0                               │
│ 剩余额度  : 500,000                         │
│ 剩余次数  : 无限制                          │
├─────────────────────────────────────────────┤
│ 创建时间  : 2026-03-25 13:16:47             │
│ 最后访问  : 2026-03-25 13:16:47             │
│ 过期时间  : 永不过期                        │
└─────────────────────────────────────────────┘
```

---

### 3️⃣ 创建令牌

```bash
# 创建无限额度令牌
openclaw dmxapi-tokens create

# 创建带名称的令牌
openclaw dmxapi-tokens create 我的令牌

# 创建有限额度令牌（quota 单位：内部额度）
openclaw dmxapi-tokens create 测试令牌 500000
```

**输出示例：**
```
🔑 正在创建令牌 "我的令牌"...

✅ 令牌创建成功！

┌─────────────────────────────────────────────┐
│ 令牌：我的令牌                              │
├─────────────────────────────────────────────┤
│ ID        : 54275                           │
│ Key       : sk-**************************** │
│ 状态      : ✅ 启用                          │
│ 分组      : default                         │
├─────────────────────────────────────────────┤
│ 已用额度  : 0                               │
│ 剩余额度  : 无限制                          │
│ 剩余次数  : 无限制                          │
├─────────────────────────────────────────────┤
│ 创建时间  : 2026-04-01 09:50:00             │
│ 最后访问  : 从未访问                        │
│ 过期时间  : 永不过期                        │
└─────────────────────────────────────────────┘

⚠️  请妥善保管 Key：sk-<YOUR_API_KEY>
```

---

### 4️⃣ 启用/禁用令牌

```bash
# 启用令牌
openclaw dmxapi-tokens enable 54274

# 禁用令牌
openclaw dmxapi-tokens disable 54274
```

---

### 5️⃣ 删除令牌

```bash
# 删除令牌（不可恢复！）
openclaw dmxapi-tokens delete 54274
```

---

## 📊 令牌信息说明

### 状态说明

| 状态 | 图标 | 说明 |
|------|------|------|
| 启用 | ✅ | 令牌可正常使用 |
| 禁用 | ❌ | 令牌无法使用 |

### 额度说明

| 类型 | 说明 |
|------|------|
| 无限额度 | `unlimited_quota: true` |
| 有限额度 | `remain_quota` 显示剩余额度 |
| 已用额度 | `used_quota` 显示已用额度 |

**换算公式：**
```
1 元 = 500,000 quota
quota = 元 × 500000
```

### 时间说明

| 时间字段 | 说明 |
|----------|------|
| `created_time` | 创建时间 |
| `accessed_time` | 最后访问时间（0=从未访问） |
| `expired_time` | 过期时间（-1=永不过期） |

---

## 🔧 高级功能

### 批量管理

```bash
# 查看所有启用的令牌
openclaw dmxapi-tokens list | grep "✅"

# 查看所有禁用的令牌
openclaw dmxapi-tokens list | grep "❌"
```

### 额度监控

```bash
# 查看额度使用情况
openclaw dmxapi-tokens list

# 查看特定令牌的详细使用情况
openclaw dmxapi-tokens search <令牌名称>
```

---

## 💡 实用场景

### 场景 1: 为不同项目创建独立令牌

```bash
# 为项目 A 创建令牌
openclaw dmxapi-tokens create ProjectA 1000000

# 为项目 B 创建令牌
openclaw dmxapi-tokens create ProjectB 2000000
```

### 场景 2: 临时令牌管理

```bash
# 创建临时测试令牌
openclaw dmxapi-tokens create TempTest 500000

# 测试完成后禁用
openclaw dmxapi-tokens disable <令牌 ID>

# 确认无误后删除
openclaw dmxapi-tokens delete <令牌 ID>
```

### 场景 3: 查找泄露的令牌

```bash
# 搜索所有包含 "test" 的令牌
openclaw dmxapi-tokens search test

# 查看最后访问时间
# 如果发现异常访问，立即禁用
openclaw dmxapi-tokens disable <令牌 ID>
```

---

## ⚙️ 完整命令列表

| 命令 | 说明 | 示例 |
|------|------|------|
| `dmxapi-tokens list` | 查看所有令牌 | `openclaw dmxapi-tokens list` |
| `dmxapi-tokens search <关键词>` | 搜索令牌 | `openclaw dmxapi-tokens search GLM` |
| `dmxapi-tokens create [名称] [额度]` | 创建令牌 | `openclaw dmxapi-tokens create MyToken 500000` |
| `dmxapi-tokens enable <ID>` | 启用令牌 | `openclaw dmxapi-tokens enable 54274` |
| `dmxapi-tokens disable <ID>` | 禁用令牌 | `openclaw dmxapi-tokens disable 54274` |
| `dmxapi-tokens delete <ID>` | 删除令牌 | `openclaw dmxapi-tokens delete 54274` |

---

## 🔒 安全建议

### 1. 定期轮换令牌

```bash
# 每季度创建新令牌
openclaw dmxapi-tokens create "Q2_2026_Token"

# 更新应用配置使用新令牌

# 禁用旧令牌
openclaw dmxapi-tokens disable <旧令牌 ID>
```

### 2. 设置额度限制

```bash
# 为临时用途设置额度限制
openclaw dmxapi-tokens create TempToken 500000
```

### 3. 监控使用情况

```bash
# 每周检查令牌使用情况
openclaw dmxapi-tokens list

# 查看异常访问
openclaw dmxapi-logs week
```

### 4. IP 限制（需要 API 支持）

```bash
# 创建时设置 IP 白名单
# （需要插件支持 allow_ips 参数）
```

---

## 🔧 故障排查

### 问题 1: 无权访问

**错误信息：**
```
❌ 获取失败：无权访问，请检查用户 ID 是否正确
```

**解决方法：**
1. 检查系统令牌是否正确
2. 检查用户 ID 是否正确
3. 确保令牌和用户 ID 匹配

### 问题 2: 令牌不存在

**错误信息：**
```
❌ 操作失败：令牌不存在
```

**解决方法：**
1. 检查令牌 ID 是否正确
2. 使用 `dmxapi-tokens list` 查看所有令牌 ID

### 问题 3: 无法删除令牌

**错误信息：**
```
❌ 删除失败：令牌正在使用中
```

**解决方法：**
1. 先禁用令牌
2. 等待所有使用完成
3. 再次尝试删除

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
