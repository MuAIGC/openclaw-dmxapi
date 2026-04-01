/**
 * DMXAPI 插件主入口
 */

import { definePluginEntry } from 'openclaw/plugin-sdk/plugin-entry';

export default definePluginEntry({
    id: 'openclaw-dmxapi',
    name: 'DMXAPI',
    description: 'DMXAPI 模型聚合插件 - 自动同步模型列表 + 余额查询 + 令牌管理',
    
    configSchema: {
        type: 'object',
        properties: {
            apiKey: { type: 'string', sensitive: true, description: 'API Key（调用模型用）' },
            systemToken: { type: 'string', sensitive: true, description: '系统令牌（管理账户用）' },
            userId: { type: 'string', description: '用户 ID' },
            autoSync: { type: 'boolean', default: true }
        }
    },
    
    register(api) {
        console.log('[DMXAPI] 插件注册中...');
        
        // 注册 CLI 命令
        api.registerCli(({ program, config }) => {
            const dmxapi = program
                .command('dmxapi')
                .description('DMXAPI 模型管理命令');
            
            const cfg = config?.plugins?.entries?.['openclaw-dmxapi']?.config || {};
            
            // dmxapi models 命令
            dmxapi.command('models')
                .description('查看 DMXAPI 可用模型列表')
                .option('--gemini', '只显示 Gemini 系列模型')
                .action(async (opts) => {
                    console.log('[DMXAPI] 执行 models 命令');
                    
                    if (!cfg?.apiKey) {
                        console.log('❌ 未配置 API Key，请先配置：openclaw config edit');
                        return;
                    }
                    
                    try {
                        const response = await fetch('https://www.dmxapi.cn/v1/models', {
                            headers: {
                                'Authorization': cfg.apiKey,
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (!response.ok) {
                            console.log('❌ 查询失败：' + response.status);
                            return;
                        }
                        
                        const data = await response.json();
                        const models = data.data || [];
                        
                        let filteredModels = models;
                        if (opts.gemini) {
                            filteredModels = models.filter(m => 
                                (m.id || '').toLowerCase().includes('gemini')
                            );
                        }
                        
                        console.log('✅ 共 ' + filteredModels.length + ' 个模型');
                        
                        if (opts.gemini && filteredModels.length > 0) {
                            console.log('\n📋 Gemini 模型列表：');
                            filteredModels.forEach((m, i) => {
                                const isFree = m.is_free ? '💚 免费' : '💰 付费';
                                console.log((i + 1) + '. ' + m.id + ' - ' + isFree);
                            });
                        }
                    } catch (err) {
                        console.log('❌ 查询失败：' + err.message);
                    }
                });
            
            // dmxapi balance 命令
            dmxapi.command('balance')
                .description('查询 DMXAPI 账户余额')
                .action(async () => {
                    console.log('[DMXAPI] 执行 balance 命令');
                    
                    if (!cfg?.systemToken || !cfg?.userId) {
                        console.log('❌ 未配置系统令牌或用户 ID');
                        console.log('💡 配置方法：openclaw config edit');
                        console.log('💡 获取方式：登录 DMXAPI → 个人设置 → 更多选项');
                        return;
                    }
                    
                    try {
                        const response = await fetch('https://www.dmxapi.cn/api/user/self', {
                            headers: {
                                'Authorization': cfg.systemToken,
                                'Rix-Api-User': cfg.userId,
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (!response.ok) {
                            console.log('❌ 查询失败：' + response.status);
                            if (response.status === 401) {
                                console.log('💡 系统令牌无效或已过期');
                            } else if (response.status === 403) {
                                console.log('💡 无权访问，请检查用户 ID 是否正确');
                            }
                            return;
                        }
                        
                        const data = await response.json();
                        const quota = data.data?.quota || 0;
                        const balance = quota / 500000; // 人民币 = quota / 500000
                        const username = data.data?.username || 'N/A';
                        
                        console.log('┌─────────────────────────────┐');
                        console.log('│      DMXAPI 账户余额        │');
                        console.log('├─────────────────────────────┤');
                        console.log('│ 用户：' + username);
                        console.log('│ 账户额度：' + quota.toLocaleString());
                        console.log('│ 人民币余额：¥' + balance.toFixed(2));
                        console.log('└─────────────────────────────┘');
                    } catch (err) {
                        console.log('❌ 查询失败：' + err.message);
                    }
                });
            
            // dmxapi tokens 命令
            dmxapi.command('tokens')
                .description('查看令牌列表')
                .option('--limit <n>', '显示数量', parseInt, 20)
                .action(async (opts) => {
                    console.log('[DMXAPI] 执行 tokens 命令');
                    
                    if (!cfg?.systemToken || !cfg?.userId) {
                        console.log('❌ 未配置系统令牌或用户 ID');
                        return;
                    }
                    
                    try {
                        const response = await fetch(`https://www.dmxapi.cn/api/token/?page=1&page_size=${opts.limit || 20}`, {
                            headers: {
                                'Authorization': cfg.systemToken,
                                'Rix-Api-User': cfg.userId,
                                'Accept': 'application/json'
                            }
                        });
                        
                        if (!response.ok) {
                            console.log('❌ 查询失败：' + response.status);
                            return;
                        }
                        
                        const data = await response.json();
                        const tokens = data.data?.items || [];
                        
                        if (tokens.length === 0) {
                            console.log('💭 暂无令牌');
                            return;
                        }
                        
                        console.log('✅ 共 ' + tokens.length + ' 个令牌\n');
                        console.log('┌──────┬────────────────┬────────┬──────────┬────────────┐');
                        console.log('│ ID   │ 名称           │ 状态   │ 剩余额度 │ 最后访问   │');
                        console.log('├──────┼────────────────┼────────┼──────────┼────────────┤');
                        
                        tokens.forEach(t => {
                            const id = String(t.id).padEnd(4);
                            const name = (t.name || 'N/A').substring(0, 14).padEnd(14);
                            const status = t.status === 1 ? '✅ 启用' : '❌ 禁用';
                            const quota = t.unlimited_quota ? '∞' : '¥' + (t.remain_quota / 500000).toFixed(2);
                            const accessed = t.accessed_time ? new Date(t.accessed_time * 1000).toLocaleDateString() : '从未';
                            
                            console.log('│ ' + id + ' │ ' + name + ' │ ' + status + ' │ ' + quota.padEnd(8) + ' │ ' + accessed.padEnd(10) + ' │');
                        });
                        
                        console.log('└──────┴────────────────┴────────┴──────────┴────────────┘');
                    } catch (err) {
                        console.log('❌ 查询失败：' + err.message);
                    }
                });
            
            // dmxapi token create 命令
            dmxapi.command('token-create')
                .description('创建新令牌')
                .argument('[name]', '令牌名称', '默认令牌')
                .option('--quota <n>', '额度（quota，500000=¥1）', parseInt, 500000)
                .option('--unlimited', '无限额度', false)
                .action(async (name, opts) => {
                    console.log('[DMXAPI] 执行 token-create 命令');
                    
                    if (!cfg?.systemToken || !cfg?.userId) {
                        console.log('❌ 未配置系统令牌或用户 ID');
                        return;
                    }
                    
                    try {
                        const body = {
                            name: name || '新令牌',
                            quota: opts.unlimited ? -1 : (opts.quota || 500000),
                            unlimited_quota: opts.unlimited || false,
                            expired_time: -1 // 永不过期
                        };
                        
                        const response = await fetch('https://www.dmxapi.cn/api/token/', {
                            method: 'POST',
                            headers: {
                                'Authorization': cfg.systemToken,
                                'Rix-Api-User': cfg.userId,
                                'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            },
                            body: JSON.stringify(body)
                        });
                        
                        if (!response.ok) {
                            console.log('❌ 创建失败：' + response.status);
                            return;
                        }
                        
                        const data = await response.json();
                        const token = data.data;
                        
                        console.log('✅ 令牌创建成功！\n');
                        console.log('┌─────────────────────────────┐');
                        console.log('│ 令牌信息                    │');
                        console.log('├─────────────────────────────┤');
                        console.log('│ ID: ' + token.id);
                        console.log('│ 名称：' + token.name);
                        console.log('│ Key: sk-' + token.key);
                        console.log('│ 额度：' + (token.unlimited_quota ? '∞ 无限' : '¥' + (token.remain_quota / 500000).toFixed(2)));
                        console.log('│ 过期：永不过期');
                        console.log('└─────────────────────────────┘');
                    } catch (err) {
                        console.log('❌ 创建失败：' + err.message);
                    }
                });
            
            // dmxapi setup 命令
            dmxapi.command('setup')
                .description('配置向导')
                .action(async () => {
                    console.log('┌──────────────────────────────────────┐');
                    console.log('│   DMXAPI 配置向导                    │');
                    console.log('├──────────────────────────────────────┤');
                    console.log('│                                      │');
                    console.log('│  1. 访问 https://www.dmxapi.cn       │');
                    console.log('│  2. 登录账号                         │');
                    console.log('│  3. 进入「个人设置」→「更多选项」    │');
                    console.log('│  4. 复制以下内容：                   │');
                    console.log('│     - 系统令牌                       │');
                    console.log('│     - 用户 ID                        │');
                    console.log('│  5.  运行：openclaw config edit      │');
                    console.log('│  6.  添加配置：                      │');
                    console.log('│     "plugins": {                    │');
                    console.log('│       "entries": {                  │');
                    console.log('│         "openclaw-dmxapi": {        │');
                    console.log('│           "config": {               │');
                    console.log('│             "apiKey": "sk-xxx",     │');
                    console.log('│             "systemToken": "xxx",   │');
                    console.log('│             "userId": "xxx"         │');
                    console.log('│           }                         │');
                    console.log('│         }                           │');
                    console.log('│       }                             │');
                    console.log('│     }                               │');
                    console.log('│                                      │');
                    console.log('└──────────────────────────────────────┘');
                });
            
        }, {
            descriptors: [{
                name: 'dmxapi',
                description: 'DMXAPI 模型管理',
                hasSubcommands: true
            }]
        });
        
        console.log('[DMXAPI] 插件注册完成');
    }
});
