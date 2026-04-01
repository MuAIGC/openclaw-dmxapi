# 🎓 OpenClaw DMXAPI 插件开发经验总结

> 项目：OpenClaw DMXAPI Plugin v1.0.0  
> 开发时间：2026-04-01  
> 完成时间：4 小时  
> 作者：木木 🎋

---

## 📊 项目概览

**插件功能：** DMXAPI 平台管理工具  
**代码规模：** 2,000 行 TypeScript  
**文档规模：** 30,000 字（8 篇文档）  
**打包大小：** 32KB  
**功能数量：** 13 个核心功能

---

## 🎯 开发流程总结

### 阶段 1：需求分析（15 分钟）

**核心需求：**
1. 模型管理 - 查看可用模型
2. 余额查询 - 查看账户额度
3. 消耗统计 - 按时间查询
4. 日志查询 - 详细调用记录
5. 令牌管理 - 创建/更新/删除 API Key
6. 模型限制 - 为 Key 设置白名单

**关键洞察：**
- ✅ DMXAPI 有完整 API 文档
- ✅ 需要系统令牌 + 用户 ID 双重认证
- ✅ 令牌管理是全量更新（先查后改）

---

### 阶段 2：架构设计（30 分钟）

**目录结构：**
```
openclaw-dmxapi/
├── src/
│   ├── api/           # API 模块
│   │   ├── models.ts  # 模型管理
│   │   ├── balance.ts # 余额查询
│   │   ├── logs.ts    # 日志查询
│   │   └── tokens.ts  # 令牌管理
│   ├── commands/      # 命令处理
│   └── index.ts       # 主入口
├── docs/              # 文档
├── install-wizard.sh  # 安装向导
└── package.json       # 项目配置
```

**设计决策：**
- ✅ 模块化设计 - 每个 API 独立文件
- ✅ TypeScript - 类型安全
- ✅ 命令式接口 - OpenClaw 标准

---

### 阶段 3：编码实现（2 小时）

**关键代码片段：**

#### 1. API 调用封装

```typescript
// 通用请求头
const headers = {
  'Accept': 'application/json',
  'Authorization': systemToken,
  'Rix-Api-User': userId
};

// GET 请求
const response = await axios.get(API_URL, { headers });

// POST 请求
const response = await axios.post(API_URL, body, { headers });

// PUT 请求（全量更新）
const current = await getTokenById(id);
const body = { ...current, ...updates };
const response = await axios.put(API_URL, body, { headers });
```

**经验：**
- ⚠️ PUT 是全量更新，必须先查询当前数据
- ⚠️ PUT 到 `/api/token/` 不是 `/api/token/{id}`
- ✅ 使用 axios 统一处理 HTTP

#### 2. 命令注册

```typescript
// 在 index.ts 中
this.registerCommand('dmxapi-models', this.handleModels.bind(this));
this.registerCommand('dmxapi-balance', this.handleBalance.bind(this));
this.registerCommand('dmxapi-tokens', this.handleTokens.bind(this));
```

**经验：**
- ✅ 命令名用 `dmxapi-` 前缀
- ✅ 使用 `bind(this)` 保持上下文
- ✅ 参数通过 `args[]` 传递

#### 3. 错误处理

```typescript
try {
  const result = await apiCall();
  console.log('✅ 成功');
} catch (error: any) {
  if (error.response?.status === 401) {
    console.log('❌ 认证失败');
  } else if (error.response?.status === 403) {
    console.log('❌ 无权访问');
  } else {
    console.log(`❌ 失败：${error.message}`);
  }
}
```

**经验：**
- ✅ 区分 HTTP 状态码
- ✅ 提供清晰的错误信息
- ✅ 给出解决建议

---

### 阶段 4：文档编写（45 分钟）

**文档清单：**

| 文档 | 字数 | 用途 |
|------|------|------|
| README_COMPLETE.md | 14,000 | 完整使用指南 |
| QUICKSTART.md | 5,000 | 快速启动（3 步） |
| API_USAGE.md | 4,000 | API 接口说明 |
| BALANCE_GUIDE.md | 5,000 | 余额查询指南 |
| LOGS_GUIDE.md | 7,000 | 日志查询指南 |
| TOKENS_GUIDE.md | 9,000 | 令牌管理指南 |
| FEATURES.md | 11,000 | 功能列表 |
| GITHUB_RELEASE.md | 6,000 | GitHub 发布指南 |

**文档原则：**
- ✅ 每个功能都有独立文档
- ✅ 提供复制粘贴的命令
- ✅ 包含故障排查
- ✅ 使用 emoji 增加可读性

---

### 阶段 5：测试与打包（30 分钟）

**测试清单：**

```bash
# 1. 编译测试
npm run build

# 2. 功能测试
openclaw dmxapi-models
openclaw dmxapi-balance
openclaw dmxapi-tokens list

# 3. 隐私检查
grep -r "sk-[a-zA-Z0-9]" .  # 检查 API Key
grep -r "pLgV58" .          # 检查系统令牌
grep -r "****" .            # 检查用户 ID

# 4. 打包
tar -czvf openclaw-dmxapi-v1.0.0.tar.gz .
```

**打包内容：**
- ✅ 源代码（src/）
- ✅ 文档（*.md）
- ✅ 配置文件（package.json 等）
- ✅ 安装向导（install-wizard.sh）
- ❌ node_modules（用户自己安装）
- ❌ dist（用户自己编译）
- ❌ 测试数据

---

### 阶段 6：GitHub 发布（15 分钟）

**步骤：**

```bash
# 1. 初始化 Git
git init
git add .
git commit -m "feat: initial commit"

# 2. 生成 SSH Key
ssh-keygen -t ed25519 -C "email@example.com"

# 3. 添加 SSH Key 到 GitHub
# https://github.com/settings/ssh-keys/new

# 4. 创建 GitHub 仓库
# https://github.com/new

# 5. 推送代码
git remote add origin git@github.com:User/repo.git
git push -u origin main

# 6. 创建 Release
# https://github.com/User/repo/releases/new
```

**经验：**
- ✅ SSH 比 HTTPS 更方便（不用每次输 token）
- ✅ 仓库名用小写 + 连字符
- ✅ README 要详细（用户第一印象）

---

## 💡 关键技术点

### 1. DMXAPI API 设计

**认证方式：**
```
Authorization: <系统令牌>
Rix-Api-User: <用户 ID>
```

**关键 API：**
```
GET  /v1/models              # 模型列表
GET  /api/user/self          # 用户信息/余额
GET  /api/log/self/stat      # 消耗统计
GET  /api/log/self           # 详细日志
GET  /api/token/             # 令牌列表
POST /api/token/             # 创建令牌
PUT  /api/token/             # 更新令牌（全量）
DELETE /api/token/{id}       # 删除令牌
```

**注意事项：**
- ⚠️ PUT 是全量更新，必须包含所有字段
- ⚠️ PUT 到 `/api/token/` 不是 `/api/token/{id}`
- ✅ 先 GET 查询，合并修改，再 PUT 提交

---

### 2. OpenClaw 插件规范

**命令格式：**
```
openclaw <插件名>-<功能> [参数]
```

**示例：**
```bash
openclaw dmxapi-models
openclaw dmxapi-balance
openclaw dmxapi-tokens create 名称 额度
```

**配置 Schema：**
```json
{
  "plugins": {
    "dmxapi": {
      "systemToken": "xxx",
      "userId": "123",
      "autoSync": true
    }
  }
}
```

---

### 3. TypeScript 最佳实践

**接口定义：**
```typescript
interface TokenInfo {
  id: number;
  name: string;
  key: string;
  status: number;
  quota: number;
}
```

**错误处理：**
```typescript
try {
  await riskyOperation();
} catch (error: any) {
  console.error(`操作失败：${error.message}`);
  throw error; // 或返回错误对象
}
```

**类型安全：**
```typescript
// ✅ 好的做法
async function getToken(id: number): Promise<TokenInfo> {
  // ...
}

// ❌ 避免
async function getToken(id) {
  // ...
}
```

---

## ⚠️ 踩坑记录

### 坑 1：PUT 更新失败

**问题：** 更新令牌时只发送了修改的字段

**错误：**
```typescript
// ❌ 错误做法
await axios.put('/api/token/', {
  id: 123,
  group: 'default'
});
```

**正确：**
```typescript
// ✅ 正确做法
const current = await getTokenById(123);
const updates = { ...current, group: 'default' };
await axios.put('/api/token/', updates);
```

**教训：** 全量更新接口必须先查询再合并

---

### 坑 2：隐私信息泄露

**问题：** 文档中包含了测试用的 Key 和令牌

**解决：**
```bash
# 搜索隐私信息
grep -r "sk-[a-zA-Z0-9]" .
grep -r "pLgV58" .
grep -r "****" .

# 替换为占位符
sed -i 's/sk-xxx/sk-<YOUR_API_KEY>/g' *.md
```

**教训：** 打包前必须检查隐私信息

---

### 坑 3：node_modules 太大

**问题：** 打包时包含了 node_modules（100MB+）

**解决：**
```bash
# .gitignore
node_modules/
dist/
*.log
```

**教训：** 让用户自己安装依赖

---

### 坑 4：GitHub 推送失败

**问题 1：** HTTPS 认证失败
```bash
fatal: could not read Username for 'https://github.com'
```

**解决：** 使用 SSH
```bash
git remote set-url origin git@github.com:User/repo.git
```

**问题 2：** 仓库不存在
```bash
ERROR: Repository not found.
```

**解决：** 先在 GitHub 创建空仓库

---

## 🎯 最佳实践

### 1. 代码组织

```
✅ 按功能分模块（api/models.ts, api/balance.ts）
✅ 命令处理集中（commands/index.ts）
✅ 配置集中管理（config-schema.json）
❌ 避免单文件过大（>500 行）
```

### 2. 文档编写

```
✅ 每个功能独立文档
✅ 提供复制粘贴的命令
✅ 包含故障排查
✅ 使用 emoji 增加可读性
❌ 避免长篇大论（分章节）
```

### 3. 测试流程

```
✅ 编译测试（npm run build）
✅ 功能测试（每个命令）
✅ 隐私检查（grep 搜索）
✅ 打包测试（tar -czvf）
❌ 避免跳过任何一步
```

### 4. GitHub 发布

```
✅ 使用 SSH 协议
✅ README 详细
✅ .gitignore 完整
✅ Release 带安装包
❌ 避免提交敏感信息
```

---

## 📈 下次改进

### 功能方面

1. **批量操作** - 批量创建/删除令牌
2. **定时任务** - 自动余额提醒
3. **Web 界面** - 可视化管理面板
4. **多账号** - 支持多个 DMXAPI 账号

### 技术方面

1. **单元测试** - Jest 测试覆盖率 >80%
2. **CI/CD** - GitHub Actions 自动发布
3. **TypeScript 严格模式** - 更严格的类型检查
4. **日志系统** - 统一的日志记录

### 文档方面

1. **视频教程** - 安装和使用视频
2. **FAQ** - 常见问题集合
3. **示例项目** - 完整使用示例
4. **多语言** - 英文文档

---

## 🎓 学习收获

### 技术收获

1. **OpenClaw 插件开发** - 完整流程掌握
2. **TypeScript 实践** - 类型安全的重要性
3. **API 设计** - RESTful 最佳实践
4. **文档编写** - 用户友好的重要性

### 工程收获

1. **模块化设计** - 代码可维护性
2. **错误处理** - 用户体验关键
3. **隐私保护** - 安全意识提升
4. **自动化** - 安装向导的价值

### 沟通收获

1. **需求确认** - 先理解再开发
2. **进度汇报** - 及时同步状态
3. **文档先行** - 减少重复解释
4. **用户视角** - 站在用户角度思考

---

## 🚀 复用清单

**下次开发可直接复用：**

```
✅ 项目结构模板
✅ TypeScript 配置
✅ 文档模板
✅ 安装向导脚本
✅ GitHub 发布流程
✅ 隐私检查脚本
✅ 打包脚本
```

**代码片段：**
```
✅ API 调用封装
✅ 命令注册模式
✅ 错误处理模板
✅ 配置管理
```

---

## 📞 快速参考

### 常用命令

```bash
# 开发
npm install
npm run build
npm run dev

# 测试
openclaw plugins install .
openclaw dmxapi-models

# 打包
tar -czvf openclaw-dmxapi-v1.0.0.tar.gz .

# 发布
git add .
git commit -m "feat: update"
git push origin main
```

### 关键链接

- DMXAPI 官网：https://www.dmxapi.cn
- DMXAPI 文档：https://doc.dmxapi.cn
- OpenClaw 文档：https://docs.openclaw.ai
- GitHub：https://github.com

---

**总结完成！** 🎋

_经验是拿来用的，不是拿来囤的。下次开发更高效！_
