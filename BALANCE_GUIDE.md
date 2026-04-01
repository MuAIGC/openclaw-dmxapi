# 🦞 DMXAPI 插件 - 余额查询功能

> 版本：v1.0.0  
> 更新日期：2026-04-01  
> 状态：✅ 已完成

---

## 📌 余额查询 API

**接口地址：**
```
GET https://www.dmxapi.cn/api/user/self
```

**认证方式：**
- 需要**系统令牌**（不是 API Key）
- 需要**用户 ID**

**获取方式：**
1. 登录 DMXAPI：https://www.dmxapi.cn
2. 进入：工作台 → 个人设置 → 更多选项
3. 复制：**系统令牌** 和 **用户 ID**

**计算公式：**
```
人民币余额（元）= quota / 500000
```

---

## 🚀 使用方法

### 1️⃣ 配置系统令牌

```bash
# 设置系统令牌和用户 ID
openclaw dmxapi-token <系统令牌> <用户 ID>

# 示例
openclaw dmxapi-token sys_xxxxxxxxxxx 123456
```

### 2️⃣ 查询余额

```bash
# 查询余额
openclaw dmxapi-balance
```

**输出示例：**
```
┌─────────────────────────┐
│      DMXAPI 余额        │
├─────────────────────────┤
│ 账户额度：38,250,000      │
│ 人民币余额：￥   76.500000│
└─────────────────────────┘

⚠️  余额不足￥10，请及时充值！
💳 充值地址：https://www.dmxapi.cn/rmb
```

---

## 📋 完整配置流程

### 步骤 1: 获取系统令牌

1. 登录 DMXAPI 官网
2. 进入个人设置
3. 找到"更多选项"
4. 复制系统令牌（如：`sys_xxxxxxxxxxx`）
5. 复制用户 ID（如：`123456`）

### 步骤 2: 配置插件

```bash
# 配置系统令牌
openclaw dmxapi-token sys_xxxxxxxxxxx 123456
```

### 步骤 3: 验证配置

```bash
# 查询余额验证
openclaw dmxapi-balance
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

**配置项说明：**

| 配置项 | 说明 | 必填 |
|--------|------|------|
| `apiKey` | API Key（模型列表） | ✅ |
| `systemToken` | 系统令牌（余额查询） | ✅ |
| `userId` | 用户 ID | ✅ |
| `autoSync` | 自动同步模型 | ❌ |
| `syncInterval` | 同步间隔（秒） | ❌ |
| `enableBalanceNotify` | 余额不足提醒 | ❌ |
| `balanceThreshold` | 余额阈值（元） | ❌ |

---

## 🔔 余额提醒

**自动提醒：**
- 当余额低于阈值时自动提醒
- 默认阈值：10 元
- 可通过配置修改

**修改阈值：**
```bash
openclaw config set plugins.entries.dmxapi.balanceThreshold 20
```

**禁用提醒：**
```bash
openclaw config set plugins.entries.dmxapi.enableBalanceNotify false
```

---

## 📊 余额查询示例

### 示例 1: 余额充足

```bash
$ openclaw dmxapi-balance

💰 正在查询余额...

┌─────────────────────────┐
│      DMXAPI 余额        │
├─────────────────────────┤
│ 账户额度：100,000,000      │
│ 人民币余额：￥  200.000000│
└─────────────────────────┘
```

### 示例 2: 余额不足

```bash
$ openclaw dmxapi-balance

💰 正在查询余额...

┌─────────────────────────┐
│      DMXAPI 余额        │
├─────────────────────────┤
│ 账户额度：2,500,000        │
│ 人民币余额：￥    5.000000│
└─────────────────────────┘

⚠️  余额不足￥10，请及时充值！
💳 充值地址：https://www.dmxapi.cn/rmb
```

### 示例 3: 未配置令牌

```bash
$ openclaw dmxapi-balance

💰 DMXAPI 余额查询

需要系统令牌和用户 ID：

1️⃣  获取系统令牌：
   登录 DMXAPI → 工作台 → 个人设置 → 更多选项 → 系统令牌

2️⃣  获取用户 ID：
   登录 DMXAPI → 个人设置 → 用户 ID

3️⃣  配置：
   openclaw dmxapi-token <系统令牌> <用户 ID>

4️⃣  查询余额：
   openclaw dmxapi-balance
```

---

## 🔧 故障排查

### 问题 1: 系统令牌无效

**错误信息：**
```
❌ 查询失败：系统令牌无效或已过期
```

**解决方法：**
1. 检查系统令牌是否正确
2. 系统令牌可能已过期，重新获取
3. 重新配置：`openclaw dmxapi-token <新令牌> <用户 ID>`

### 问题 2: 用户 ID 错误

**错误信息：**
```
❌ 查询失败：无权访问，请检查用户 ID 是否正确
```

**解决方法：**
1. 检查用户 ID 是否正确
2. 用户 ID 在个人设置页面获取
3. 确保系统令牌和用户 ID 匹配

### 问题 3: 网络错误

**错误信息：**
```
❌ 查询失败：查询失败：timeout of 10000ms exceeded
```

**解决方法：**
1. 检查网络连接
2. 稍后重试
3. 检查 DMXAPI 服务状态

---

## 📞 联系方式

- 📧 邮箱：support@dmxapi.cn
- 💬 微信：DMXAPI 官方
- 🌐 官网：https://www.dmxapi.cn
- 📚 文档：https://doc.dmxapi.cn

---

## 📄 许可证

MIT License © 2026 DMXAPI Plugin Team

---

**🦞 Happy Coding!**
