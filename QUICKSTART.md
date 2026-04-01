# 🚀 OpenClaw DMXAPI 插件 - 快速启动指南

> 版本：v1.0.1  
> GitHub：https://github.com/MuAIGC/openclaw-dmxapi

---

## 🎯 快速开始（3 步完成）

### 方式 1：使用安装向导（推荐）

```bash
# 执行安装向导（从 GitHub 获取）
bash <(curl -s https://raw.githubusercontent.com/MuAIGC/openclaw-dmxapi/main/install-wizard.sh)
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

## 📋 常用命令

配置完成后，可以使用以下命令：

### 查看模型

```bash
# 查看所有可用模型
openclaw dmxapi-models

# 搜索特定模型
openclaw dmxapi-model search gpt

# 只看 Gemini 系列
openclaw dmxapi-models --gemini
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

# 创建无限额度令牌
openclaw dmxapi-tokens create 项目令牌 --unlimited
```

---

## 🔧 故障排查

### 问题 1: 配置失败

```bash
# 重新配置
openclaw dmxapi-token <新的系统令牌> <新的用户 ID>

# 验证配置
openclaw dmxapi-balance
```

### 问题 2: 插件未安装

```bash
# 从 GitHub 安装
bash <(curl -s https://raw.githubusercontent.com/MuAIGC/openclaw-dmxapi/main/install-wizard.sh)
```

---

## 📚 完整文档

- **快速入门：** https://github.com/MuAIGC/openclaw-dmxapi/blob/main/README.md
- **使用指南：** https://github.com/MuAIGC/openclaw-dmxapi/blob/main/USAGE.md
- **部署说明：** https://github.com/MuAIGC/openclaw-dmxapi/blob/main/QUICKSTART.md

---

## 🆘 获取帮助

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
