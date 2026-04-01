# 🚀 推送到 GitHub - 操作指南

> GitHub 用户名：**MuAIGC**  
> 仓库名：**openclaw-dmxapi**

---

## 📋 方式 1：使用 GitHub CLI（最简单）

### 安装 GitHub CLI

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install gh

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
# 4. 在浏览器中登录并确认
```

### 推送代码

```bash
cd /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi

# 推送
git push -u origin main
```

---

## 📋 方式 2：使用 Personal Access Token

### 第 1 步：创建 Token

1. 访问：https://github.com/settings/tokens/new
2. Note: `OpenClaw DMXAPI Plugin`
3. 勾选权限：
   - ✅ `repo` (Full control of private repositories)
   - ✅ `workflow` (Update GitHub Action workflows)
4. 点击 "Generate token"
5. **复制 token**（只显示一次，如：`ghp_xxxxxxxxxxxx`）

### 第 2 步：配置 Git 使用 Token

```bash
# 设置 token（替换为您的 token）
git config --global credential.helper store

# 推送代码
cd /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi
git push -u origin main

# 第一次会提示输入用户名和密码
# Username: MuAIGC
# Password: <粘贴您的 token>
```

---

## 📋 方式 3：网页创建 + Git 推送

### 第 1 步：在 GitHub 创建仓库

1. 访问：https://github.com/new
2. 填写：
   - Repository name: `openclaw-dmxapi`
   - Description: `OpenClaw DMXAPI Plugin - 766+ AI Model Management Tool`
   - ✅ Public
   - ❌ 不要勾选 "Add a README file"
3. 点击 "Create repository"

### 第 2 步：推送代码

```bash
cd /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi

# 如果 remote 已存在，先删除
git remote remove origin

# 添加 remote（替换为您的 token）
git remote add origin https://MuAIGC:<YOUR_TOKEN>@github.com/MuAIGC/openclaw-dmxapi.git

# 推送
git push -u origin main
```

---

## 📋 方式 4：使用 SSH（推荐长期开发）

### 第 1 步：生成 SSH Key

```bash
# 生成 SSH key
ssh-keygen -t ed25519 -C "your_email@example.com"

# 按回车使用默认位置
# 输入 passphrase（可选）
```

### 第 2 步：添加 SSH Key 到 GitHub

1. 复制公钥：
   ```bash
   cat ~/.ssh/id_ed25519.pub
   ```
2. 访问：https://github.com/settings/keys/new
3. 粘贴公钥
4. 点击 "Add SSH key"

### 第 3 步：切换为 SSH 协议

```bash
cd /MMXTools/OpenClaw/workspace/plugins/openclaw-dmxapi

# 删除 HTTPS remote
git remote remove origin

# 添加 SSH remote
git remote add origin git@github.com:MuAIGC/openclaw-dmxapi.git

# 推送
git push -u origin main
```

---

## ✅ 推送成功后

### 创建 Release

1. 访问：https://github.com/MuAIGC/openclaw-dmxapi/releases/new
2. 填写：
   - Tag version: `v1.0.0`
   - Release title: `OpenClaw DMXAPI Plugin v1.0.0`
3. 上传文件：`openclaw-dmxapi-v1.0.0.tar.gz`
4. 点击 "Publish release"

### 更新 README

在 README.md 中添加安装链接：

```markdown
## 📦 安装

```bash
# 下载安装包
wget https://github.com/MuAIGC/openclaw-dmxapi/releases/download/v1.0.0/openclaw-dmxapi-v1.0.0.tar.gz

# 解压安装
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz
cd openclaw-dmxapi
npm install
npm run build
openclaw plugins install .
```
```

---

## 🔧 故障排查

### 问题 1: 认证失败

```bash
# 清除缓存的凭证
git config --global --unset credential.helper

# 重新推送
git push -u origin main
```

### 问题 2: remote 已存在

```bash
# 删除 remote
git remote remove origin

# 重新添加
git remote add origin https://github.com/MuAIGC/openclaw-dmxapi.git
```

### 问题 3: 分支名不对

```bash
# 切换到 main 分支
git branch -M main

# 推送
git push -u origin main
```

---

## 📊 当前状态

```
✅ Git 仓库已初始化
✅ 代码已提交（29 个文件）
✅ 分支：main
✅ Remote: https://github.com/MuAIGC/openclaw-dmxapi.git
⏳ 等待推送
```

---

## 🎯 快速命令

```bash
# 查看提交历史
git log --oneline

# 查看远程仓库
git remote -v

# 查看状态
git status

# 推送更新
git add .
git commit -m "feat: update"
git push origin main
```

---

**选择一种方式推送即可！** 🚀

推荐使用 **方式 2（Personal Access Token）** 或 **方式 4（SSH）**。
