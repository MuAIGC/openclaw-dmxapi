# 🦞 OpenClaw DMXAPI 插件

> **版本：** v1.0.1  
> **作者：** 木木  
> **许可：** MIT

**DMXAPI 模型聚合插件** - 自动同步 762+ 个 AI 模型，支持余额查询、令牌管理、模型限制等功能。

---

## ⚡ 快速开始

**3 步完成配置：**

```bash
# 1. 安装插件（已安装跳过）
openclaw plugins install openclaw-dmxapi

# 2. 配置凭证
openclaw config edit
# 添加：apiKey, systemToken, userId

# 3. 验证
openclaw dmxapi balance
openclaw dmxapi models --gemini
```

**详细文档：** [USAGE.md](USAGE.md)

---

## 📋 命令速查

| 命令 | 用途 | 示例 |
|------|------|------|
| `openclaw dmxapi balance` | 查询余额 | `openclaw dmxapi balance` |
| `openclaw dmxapi models` | 查看模型 | `openclaw dmxapi models --gemini` |
| `openclaw dmxapi tokens` | 查看令牌 | `openclaw dmxapi tokens --limit 10` |
| `openclaw dmxapi token-create` | 创建令牌 | `openclaw dmxapi token-create "项目" --quota 500000` |
| `openclaw dmxapi setup` | 配置向导 | `openclaw dmxapi setup` |

---

## 🔑 配置说明

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "plugins": {
    "entries": {
      "openclaw-dmxapi": {
        "enabled": true,
        "config": {
          "apiKey": "sk-你的 API Key",
          "systemToken": "你的系统令牌",
          "userId": "你的用户 ID"
        }
      }
    }
  }
}
```

**获取凭证：**
1. 访问 https://www.dmxapi.cn
2. 登录 → 个人设置 → 更多选项
3. 复制 **系统令牌** 和 **用户 ID**

---

## 🎯 核心功能

### 1. 模型查询

```bash
# 查看所有模型（762 个）
openclaw dmxapi models

# 只看 Gemini 系列（42 个）
openclaw dmxapi models --gemini
```

### 2. 余额查询

```bash
openclaw dmxapi balance
```

**输出：**
```
┌─────────────────────────────┐
│      DMXAPI 账户余额        │
├─────────────────────────────┤
│ 用户：github_****
│ 账户额度：20,161,356
│ 人民币余额：¥40.32
└─────────────────────────────┘
```

### 3. 令牌管理

```bash
# 创建有限额度令牌（¥1）
openclaw dmxapi token-create "测试" --quota 500000

# 创建无限额度令牌
openclaw dmxapi token-create "生产" --unlimited

# 查看令牌列表
openclaw dmxapi tokens --limit 10
```

### 4. 高级功能（curl）

**设置模型限制：**
```bash
curl -X PUT "https://www.dmxapi.cn/api/token/" \
  -H "Authorization: 系统令牌" \
  -H "Rix-Api-User: 用户 ID" \
  -d '{"id": 54318, "model_limits_enabled": true, "model_limits": "gpt-5.2,kimi-k2.5-free"}'
```

**删除令牌：**
```bash
curl -X DELETE "https://www.dmxapi.cn/api/token/54318" \
  -H "Authorization: 系统令牌" \
  -H "Rix-Api-User: 用户 ID"
```

---

## 📚 完整文档

- **[USAGE.md](USAGE.md)** - 完整使用指南
- **[QUICKSTART.md](QUICKSTART.md)** - 快速启动指南
- **[API_USAGE.md](API_USAGE.md)** - API 接口文档
- **[BALANCE_GUIDE.md](BALANCE_GUIDE.md)** - 余额查询指南
- **[TOKENS_GUIDE.md](TOKENS_GUIDE.md)** - 令牌管理指南
- **[FEATURES.md](FEATURES.md)** - 功能列表

---

## 💡 最佳实践

**生产环境：**
```bash
openclaw dmxapi token-create "生产_主服务" --unlimited
# 然后设置模型限制
```

**测试环境：**
```bash
openclaw dmxapi token-create "测试_开发" --quota 2500000  # ¥5
```

**临时使用：**
```bash
openclaw dmxapi token-create "临时_外包" --quota 500000  # ¥1
```

---

## 🔍 常见问题

**Q: 提示"未配置 API Key"？**  
A: 运行 `openclaw config edit` 添加配置。

**Q: 余额为 0 能用吗？**  
A: 可以，免费模型随便用（GPT-5.2、Claude-Sonnet-4 等）。

**Q: 如何查看免费模型？**  
A: `openclaw dmxapi models` 找 `💚 免费` 标记。

---

## 📞 支持

- **官网：** https://www.dmxapi.cn
- **文档：** https://doc.dmxapi.cn
- **客服：** DMXAPI 官方 (微信)
- **邮箱：** support@dmxapi.cn

---

## 📝 更新日志

### v1.0.1 (2026-04-01)

**新增：**
- ✅ 令牌创建（有限/无限额度）
- ✅ 余额查询
- ✅ 模型列表查询
- ✅ 配置向导

**高级：**
- ✅ 修改令牌配置
- ✅ 设置模型限制
- ✅ 设置令牌分组
- ✅ 删除令牌

---

**🦞 Happy Coding!**

_最后更新：2026-04-01_
