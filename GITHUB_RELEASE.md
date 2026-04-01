# 🚀 OpenClaw DMXAPI 插件 - GitHub 发布指南

> 版本：v1.0.0  
> 发布日期：2026-04-01

---

## 📦 方式 1：手动上传（最简单）

### 步骤 1：创建 GitHub 仓库

1. 访问：https://github.com/new
2. 仓库名：`openclaw-dmxapi`
3. 描述：`OpenClaw DMXAPI 插件 - 766+ AI 模型管理工具`
4. 可见性：Public（公开）
5. 勾选 "Add a README file"
6. 点击 "Create repository"

### 步骤 2：上传代码

**选项 A：网页上传**

```bash
# 在 GitHub 仓库页面
# 点击 "Add file" → "Upload files"
# 拖拽以下文件：
# - src/
# - *.md (所有文档)
# - package.json
# - tsconfig.json
# - install-wizard.sh
# - 其他配置文件
```

**选项 B：使用 Git 命令**

```bash
# 1. 解压插件包
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz
cd openclaw-dmxapi

# 2. 初始化 Git
git init

# 3. 添加远程仓库（替换为您的 GitHub 用户名）
git remote add origin https://github.com/<YOUR_USERNAME>/openclaw-dmxapi.git

# 4. 添加所有文件
git add .

# 5. 提交
git commit -m "feat: initial commit - DMXAPI plugin v1.0.0"

# 6. 推送
git branch -M main
git push -u origin main
```

---

## 📦 方式 2：使用 GitHub CLI（推荐）

### 安装 GitHub CLI

```bash
# Ubuntu/Debian
sudo apt install gh

# macOS
brew install gh

# 验证安装
gh --version
```

### 登录 GitHub

```bash
# 登录
gh auth login

# 按提示操作：
# 1. 选择 GitHub.com
# 2. 选择 HTTPS
# 3. 复制验证码
# 4. 在浏览器中确认
```

### 创建并推送仓库

```bash
# 1. 解压插件包
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz
cd openclaw-dmxapi

# 2. 创建仓库并推送
gh repo create openclaw-dmxapi --public --source=. --remote=origin --push

# 或者手动操作：
# git init
# git add .
# git commit -m "feat: initial commit"
# gh repo create openclaw-dmxapi --public --push
```

---

## 📦 方式 3：使用 Git 客户端（标准流程）

### 完整流程

```bash
# 1. 解压插件包
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz
cd openclaw-dmxapi

# 2. 初始化 Git
git init

# 3. 创建 .gitignore（如果还没有）
cat > .gitignore << 'EOF'
node_modules/
dist/
*.log
.env
.DS_Store
*.tar.gz
EOF

# 4. 添加所有文件
git add .

# 5. 首次提交
git commit -m "feat: OpenClaw DMXAPI plugin v1.0.0

- 模型管理（766+ 模型）
- 余额查询
- 消耗统计
- 日志查询
- 令牌管理（创建/更新/删除）
- 模型限制
- 安装向导

Closes #1"

# 6. 在 GitHub 创建空仓库
# 访问：https://github.com/new
# 仓库名：openclaw-dmxapi
# 不要勾选 "Add a README file"

# 7. 添加远程仓库
git remote add origin https://github.com/<YOUR_USERNAME>/openclaw-dmxapi.git

# 8. 推送代码
git branch -M main
git push -u origin main
```

---

## 🏷️ 打标签（版本管理）

```bash
# 创建 v1.0.0 标签
git tag -a v1.0.0 -m "Release version 1.0.0"

# 推送标签
git push origin --tags

# 查看标签
git tag -l
```

---

## 📝 优化 README for GitHub

### 创建 GitHub 专用 README

```bash
# 创建 README.md（如果还没有）
cat > README.md << 'EOF'
# 🦞 OpenClaw DMXAPI Plugin

> OpenClaw DMXAPI 插件 - 766+ AI 模型管理工具

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/openclaw-dmxapi.svg)](https://badge.fury.io/js/openclaw-dmxapi)
[![OpenClaw](https://img.shields.io/badge/OpenClaw-Plugin-blue)](https://github.com/openclaw/openclaw)

## ✨ 功能特性

- 🎯 **模型管理** - 766+ 个 AI 模型（GPT/Claude/Gemini/国产模型）
- 💰 **余额查询** - 实时查看账户额度和消耗
- 📊 **消耗统计** - 按时间/模型查询使用情况
- 📋 **日志查询** - 详细的 API 调用日志
- 🔑 **令牌管理** - 创建/更新/删除 API Key
- 🔒 **模型限制** - 为 Key 设置可用模型白名单

## 🚀 快速开始

### 安装

```bash
# 从源码安装
git clone https://github.com/<YOUR_USERNAME>/openclaw-dmxapi.git
cd openclaw-dmxapi
npm install
npm run build
openclaw plugins install .

# 或使用安装向导
bash install-wizard.sh
```

### 配置

```bash
# 获取系统令牌和用户 ID
# 访问：https://www.dmxapi.cn

# 配置插件
openclaw dmxapi-token <系统令牌> <用户 ID>
```

### 使用

```bash
# 查看模型
openclaw dmxapi-models

# 查询余额
openclaw dmxapi-balance

# 创建令牌
openclaw dmxapi-tokens create 我的令牌 500000
```

## 📚 文档

- [完整使用指南](README_COMPLETE.md)
- [快速启动指南](QUICKSTART.md)
- [API 使用指南](API_USAGE.md)
- [余额查询指南](BALANCE_GUIDE.md)
- [日志查询指南](LOGS_GUIDE.md)
- [令牌管理指南](TOKENS_GUIDE.md)

## 📦 发布包

```bash
# 下载最新 release
wget https://github.com/<YOUR_USERNAME>/openclaw-dmxapi/releases/download/v1.0.0/openclaw-dmxapi-v1.0.0.tar.gz

# 解压
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz
```

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 编译
npm run build

# 测试
npm test
```

## 📄 许可证

MIT License

## 📞 支持

- DMXAPI 官网：https://www.dmxapi.cn
- DMXAPI 文档：https://doc.dmxapi.cn
EOF
```

---

## 🎬 创建 GitHub Release

### 方式 1：网页创建

1. 访问：https://github.com/<YOUR_USERNAME>/openclaw-dmxapi/releases/new
2. Tag version: `v1.0.0`
3. Release title: `OpenClaw DMXAPI Plugin v1.0.0`
4. 描述：

```markdown
## 🎉 OpenClaw DMXAPI Plugin v1.0.0

### ✨ 功能特性

- 模型管理（766+ 模型）
- 余额查询
- 消耗统计
- 日志查询
- 令牌管理
- 模型限制
- 安装向导

### 📦 安装

```bash
# 下载安装包
wget https://github.com/<YOUR_USERNAME>/openclaw-dmxapi/releases/download/v1.0.0/openclaw-dmxapi-v1.0.0.tar.gz

# 解压
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz

# 安装
cd openclaw-dmxapi
npm install
npm run build
openclaw plugins install .

# 配置向导
bash install-wizard.sh
```

### 📚 文档

查看 [README.md](README.md) 获取完整使用说明。

### 🔗 链接

- DMXAPI 官网：https://www.dmxapi.cn
- 注册链接：https://www.dmxapi.cn/register?aff=LpUa
```

5. 上传 `openclaw-dmxapi-v1.0.0.tar.gz`
6. 勾选 "Set as the latest release"
7. 点击 "Publish release"

### 方式 2：命令行创建

```bash
# 创建 release
gh release create v1.0.0 \
  --title "OpenClaw DMXAPI Plugin v1.0.0" \
  --notes "Initial release" \
  openclaw-dmxapi-v1.0.0.tar.gz
```

---

## 📊 GitHub Pages（可选）

如果要托管文档网站：

```bash
# 安装 gh-pages
npm install --save-dev gh-pages

# 添加到 package.json scripts
# "deploy": "gh-pages -d docs"

# 部署
npm run deploy
```

---

## ✅ 检查清单

发布前确认：

- [ ] 所有隐私信息已移除
- [ ] .gitignore 已创建
- [ ] README.md 已优化
- [ ] LICENSE 文件已添加
- [ ] 版本号已更新
- [ ] 测试通过
- [ ] 文档完整
- [ ] 打包文件已上传到 Release

---

## 🔗 相关链接

- GitHub: https://github.com
- GitHub CLI: https://cli.github.com
- Git 教程：https://git-scm.com/book
- OpenClaw: https://github.com/openclaw/openclaw

---

**发布成功！** 🎋
