# 📦 OpenClaw DMXAPI 插件 - 交付说明

> 版本：v1.0.0  
> 交付日期：2026-04-01  
> 打包大小：32KB

---

## 📦 打包内容

**文件名：** `openclaw-dmxapi-v1.0.0.tar.gz`

**包含文件：**

```
openclaw-dmxapi/
├── src/                          # 源代码
│   ├── api/                      # API 模块
│   │   ├── models.ts             # 模型管理
│   │   ├── balance.ts            # 余额查询
│   │   ├── logs.ts               # 日志查询
│   │   └── tokens.ts             # 令牌管理
│   ├── commands/
│   │   └── index.ts              # 命令处理
│   ├── sdk.ts                    # OpenClaw SDK
│   └── index.ts                  # 主入口
├── install-wizard.sh             # 安装向导
├── QUICKSTART.md                 # 快速启动指南
├── README_COMPLETE.md            # 完整使用文档
├── API_USAGE.md                  # API 使用指南
├── BALANCE_GUIDE.md              # 余额查询指南
├── LOGS_GUIDE.md                 # 日志查询指南
├── TOKENS_GUIDE.md               # 令牌管理指南
├── FEATURES.md                   # 功能文档
├── package.json                  # 项目配置
├── tsconfig.json                 # TypeScript 配置
└── config-schema.json            # 配置 Schema
```

---

## 🚀 安装方法

### 方式 1：云镜像预装（推荐）

```bash
# 解压到 OpenClaw 插件目录
cd /MMXTools/OpenClaw/workspace/plugins/
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz

# 执行安装向导
bash openclaw-dmxapi/install-wizard.sh
```

### 方式 2：手动安装

```bash
# 1. 解压
tar -xzf openclaw-dmxapi-v1.0.0.tar.gz

# 2. 进入目录
cd openclaw-dmxapi

# 3. 安装依赖
npm install

# 4. 编译
npm run build

# 5. 安装到 OpenClaw
openclaw plugins install .
```

---

## 📋 配置步骤

### 1. 注册 DMXAPI 账号

访问：https://www.dmxapi.cn/register?aff=LpUa

### 2. 获取系统令牌和用户 ID

登录 DMXAPI → 个人设置 → 更多选项 → 复制

### 3. 配置插件

```bash
openclaw dmxapi-token <系统令牌> <用户 ID>
```

### 4. 验证配置

```bash
openclaw dmxapi-balance
```

---

## 📚 文档说明

| 文档 | 说明 |
|------|------|
| **QUICKSTART.md** | 快速启动指南（3 步完成配置） |
| **README_COMPLETE.md** | 完整使用文档（所有功能详解） |
| **API_USAGE.md** | API 接口使用指南 |
| **BALANCE_GUIDE.md** | 余额查询使用指南 |
| **LOGS_GUIDE.md** | 日志查询使用指南 |
| **TOKENS_GUIDE.md** | 令牌管理使用指南 |
| **FEATURES.md** | 功能列表和特性说明 |

---

## 🎯 常用命令

```bash
# 查看模型
openclaw dmxapi-models

# 查询余额
openclaw dmxapi-balance

# 创建令牌
openclaw dmxapi-tokens create 我的令牌 500000

# 查看消耗
openclaw dmxapi-stat today

# 查看日志
openclaw dmxapi-logs week
```

---

## 🔧 技术栈

- **语言：** TypeScript
- **运行时：** Node.js 18+
- **依赖：** axios
- **平台：** OpenClaw

---

## ✅ 隐私说明

**已移除内容：**
- ✅ 所有测试 API Key
- ✅ 所有系统令牌
- ✅ 所有用户 ID
- ✅ node_modules 目录
- ✅ dist 编译产物

**用户需要：**
- 自行注册 DMXAPI 账号
- 自行配置系统令牌和用户 ID
- 自行安装 npm 依赖
- 自行编译 TypeScript

---

## 📞 支持

- **DMXAPI 官网：** https://www.dmxapi.cn
- **DMXAPI 文档：** https://doc.dmxapi.cn
- **注册链接：** https://www.dmxapi.cn/register?aff=LpUa

---

## 📄 许可证

MIT License

---

**交付完成！祝您使用愉快！** 🎋
