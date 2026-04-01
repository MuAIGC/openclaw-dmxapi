# 🚀 OpenClaw DMXAPI 插件 - 云镜像快速启动指南

> 适用场景：云镜像预装，用户一键配置使用

---

## 📦 预装内容

云镜像已预装：
- ✅ OpenClaw DMXAPI 插件
- ✅ 完整文档和示例
- ✅ 安装向导脚本

---

## 🎯 快速开始（3 步完成）

### 方式 1：使用安装向导（推荐）

```bash
# 执行安装向导
bash /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/install-wizard.sh
```

**向导会引导您：**
1. 检查插件状态
2. 注册 DMXAPI 账号（如果没有）
3. 配置系统令牌和用户 ID
4. 验证配置并测试

---

### 方式 2：手动配置

```bash
# 1. 注册 DMXAPI 账号（如果没有）
# 访问：https://www.dmxapi.cn/register?aff=LpUa

# 2. 获取系统令牌和用户 ID
# 登录 → 个人设置 → 更多选项 → 复制

# 3. 配置插件
openclaw dmxapi-token <系统令牌> <用户 ID>

# 4. 验证配置
openclaw dmxapi-balance
```

---

### 方式 3：一键命令（最简单）

```bash
# 复制粘贴这一行命令
bash /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/install-wizard.sh
```

---

## 📋 常用命令

配置完成后，可以使用以下命令：

### 查看模型

```bash
# 查看所有可用模型
openclaw dmxapi-models

# 搜索特定模型
openclaw dmxapi-model search gpt
```

### 余额和消耗

```bash
# 查询余额
openclaw dmxapi-balance

# 今日消耗统计
openclaw dmxapi-stat today

# 本周消耗统计
openclaw dmxapi-stat week
```

### 令牌管理

```bash
# 查看所有令牌
openclaw dmxapi-tokens list

# 创建新令牌
openclaw dmxapi-tokens create 我的令牌 500000

# 搜索令牌
openclaw dmxapi-tokens search 关键词
```

### 日志查询

```bash
# 今日日志
openclaw dmxapi-logs today

# 本周日志
openclaw dmxapi-logs week

# 查询特定模型的日志
openclaw dmxapi-logs week gpt-5.2
```

---

## 🔧 故障排查

### 问题 1: 找不到安装向导

```bash
# 检查文件是否存在
ls -lh /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/install-wizard.sh

# 如果没有，手动执行配置
openclaw dmxapi-token <系统令牌> <用户 ID>
```

### 问题 2: 配置失败

```bash
# 重新配置
openclaw dmxapi-token <新的系统令牌> <新的用户 ID>

# 验证配置
openclaw dmxapi-balance
```

### 问题 3: 插件未安装

```bash
# 手动安装
cd /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi
openclaw plugins install .
```

---

## 📚 完整文档

查看完整使用文档：

```bash
# 完整使用指南
cat /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/README_COMPLETE.md

# API 使用指南
cat /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/API_USAGE.md

# 余额查询指南
cat /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/BALANCE_GUIDE.md

# 令牌管理指南
cat /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi/TOKENS_GUIDE.md
```

---

## 💡 使用示例

### 示例 1: 查看可用模型

```bash
openclaw dmxapi-models
```

**输出：**
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

### 示例 2: 查询余额

```bash
openclaw dmxapi-balance
```

**输出：**
```
┌─────────────────────────────────┐
│      DMXAPI 余额                │
├─────────────────────────────────┤
│ 用户：github_<YOUR_USER_ID> (Tier 5)      │
│ 账户额度：20,174,699             │
│ 人民币余额：￥40.35              │
└─────────────────────────────────┘
```

### 示例 3: 创建 API Key

```bash
# 创建测试 Key（1 元额度）
openclaw dmxapi-tokens create 测试 Key 500000

# 创建项目 Key（无限额度）
openclaw dmxapi-tokens create 项目 A 令牌
```

### 示例 4: 设置模型限制

```bash
# 为测试 Key 设置免费模型白名单
openclaw dmxapi-tokens update <Key ID> "" "" "" "gpt-5.2,kimi-k2.5-free"
```

---

## 🆘 获取帮助

### 在线帮助

```bash
# 查看所有可用命令
openclaw dmxapi-help
```

### 官方文档

- DMXAPI 官网：https://www.dmxapi.cn
- DMXAPI 文档：https://doc.dmxapi.cn
- 注册链接：https://www.dmxapi.cn/register?aff=LpUa

### 联系方式

- 📧 邮箱：support@dmxapi.cn
- 💬 微信：DMXAPI 官方

---

## ✅ 检查清单

配置完成后，请确认：

- [ ] 插件已安装：`openclaw plugins list | grep dmxapi`
- [ ] 配置已保存：`openclaw dmxapi-balance` 显示余额
- [ ] 可以查看模型：`openclaw dmxapi-models`
- [ ] 可以创建令牌：`openclaw dmxapi-tokens create 测试`

---

## 🎉 完成！

现在您可以开始使用 DMXAPI 插件了！

**推荐第一步：**
```bash
# 查看可用模型
openclaw dmxapi-models

# 创建第一个 API Key
openclaw dmxapi-tokens create 我的第一个 Key
```

**祝您使用愉快！** 🎋
