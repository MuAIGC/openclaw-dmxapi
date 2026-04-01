# DMXAPI 插件开发文档

## 项目结构

```
openclaw-dmxapi/
├── src/
│   ├── index.ts              # 主入口
│   ├── api/
│   │   ├── models.ts         # 模型同步
│   │   └── balance.ts        # 余额查询
│   └── commands/
│       └── index.ts          # 命令处理
├── docs/
│   └── api.md                # API 文档
├── package.json
├── tsconfig.json
├── config-schema.json
└── README.md
```

## API 参考

### 模型同步

```typescript
import { scrapeModels, getDefaultModels } from './api/models';

// 爬取官网模型列表
const models = await scrapeModels();

// 获取默认模型（爬取失败时使用）
const defaults = getDefaultModels();
```

### 余额查询

```typescript
import { getBalance, getUsage, verifyApiKey } from './api/balance';

// 验证 API Key
const isValid = await verifyApiKey(apiKey);

// 查询余额
const balance = await getBalance(apiKey);

// 查询用量
const usage = await getUsage(apiKey, 7); // 最近 7 天
```

## 命令注册

```typescript
// 注册命令
this.registerCommand('dmxapi-setup', this.handleSetup.bind(this));
this.registerCommand('dmxapi-models', this.handleModels.bind(this));
this.registerCommand('dmxapi-balance', this.handleBalance.bind(this));
this.registerCommand('dmxapi-sync', this.handleSync.bind(this));
```

## 配置管理

```typescript
// 加载配置
this.config = await this.loadConfig();

// 保存配置
await this.saveConfig();
```

## 事件系统

```typescript
// 发出事件
this.emit('models-updated', models);

// 监听事件
this.on('models-updated', (models) => {
  console.log('模型列表已更新');
});
```

## 发布流程

1. 更新版本号
   ```bash
   npm version patch  # 1.0.0 -> 1.0.1
   ```

2. 编译
   ```bash
   npm run build
   ```

3. 发布
   ```bash
   npm publish
   ```

4. 通知用户更新
   ```bash
   openclaw plugins update openclaw-dmxapi
   ```

## 故障排查

### 模型同步失败

检查网络连通性：
```bash
curl https://www.dmxapi.cn/rmb
```

检查日志：
```bash
openclaw logs | grep DMXAPI
```

### API Key 无效

1. 确认 Key 格式正确
2. 检查 Key 是否过期
3. 重新创建 Key

## 性能优化

- 模型列表缓存（减少爬取频率）
- 余额查询限流（避免频繁调用）
- 增量同步（只更新变化的模型）

## 安全注意

- API Key 加密存储
- 不记录敏感信息到日志
- 定期更新依赖包
