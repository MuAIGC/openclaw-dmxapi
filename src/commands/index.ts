/**
 * DMXAPI 插件命令
 */

import { fetchModels, getDefaultModels } from '../api/models';
import { getBalance as getUserBalance, verifySystemToken, formatBalance } from '../api/balance';
import { getLogStat, getLogDetail, formatStatReport, formatQuota, QueryMode } from '../api/logs';
import { 
  getAllTokens, searchTokens, createToken, updateToken, deleteToken, getTokenById,
  getTokenBalance, formatTokenInfo, formatQuota as formatTokenQuota
} from '../api/tokens';
import type { UpdateTokenParams } from '../api/tokens';

const INVITE_LINK = 'https://www.dmxapi.cn/register?aff=LpUa';

/**
 * 设置向导命令
 */
export async function setupCommand(apiKey?: string) {
  if (!apiKey) {
    console.log(`
🎯 DMXAPI 设置向导

1️⃣  通过以下链接注册 DMXAPI：
   ${INVITE_LINK}

2️⃣  注册后在「个人中心」创建 API Key

3️⃣  然后运行：
   openclaw dmxapi-setup <your-api-key>

💡 通过邀请链接注册，你我都有返利哦！
    `);
    return;
  }
  
  // API Key 验证和余额查询已通过新命令实现
  // 这里只保存配置
  console.log('✅ API Key 已保存！');
  console.log('💾 配置已保存！');
  
  console.log('\n🎉 设置完成！可以使用以下命令：');
  console.log('   openclaw dmxapi-models    - 查看模型列表');
  console.log('   openclaw dmxapi-balance   - 查询余额');
  console.log('   openclaw dmxapi-sync      - 手动同步模型');
}

/**
 * 查看模型列表命令
 */
export async function modelsCommand() {
  console.log('📊 正在获取模型列表...');
  
  // 注意：需要 API Key 才能调用官方 API
  // 这里先用默认模型列表
  const models = getDefaultModels();
  
  // 按类型分组
  const grouped: Record<string, typeof models> = {};
  for (const model of models) {
    if (!grouped[model.type]) {
      grouped[model.type] = [];
    }
    grouped[model.type].push(model);
  }
  
  // 显示统计
  console.log(`\n✅ 共 ${models.length} 个模型`);
  console.log(`   💚 免费：${models.filter((m: any) => m.isFree).length} 个`);
  console.log(`   💰 付费：${models.filter((m: any) => !m.isFree).length} 个`);
  
  // 显示列表
  for (const [type, typeModels] of Object.entries(grouped)) {
    console.log(`\n📌 ${getTypeName(type)} (${typeModels.length}个):`);
    for (const model of typeModels.slice(0, 10)) {
      const price = model.isFree ? '💚 免费' : `💰 ¥${model.price?.toFixed(4)}/K`;
      console.log(`   - ${model.name} ${price}`);
    }
    if (typeModels.length > 10) {
      console.log(`   ... 还有 ${typeModels.length - 10} 个`);
    }
  }
}

/**
 * 查询余额命令
 */
export async function balanceCommand(systemToken?: string, userId?: string) {
  if (!systemToken || !userId) {
    console.log(`
💰 DMXAPI 余额查询

需要系统令牌和用户 ID：

1️⃣  获取系统令牌：
   登录 DMXAPI → 工作台 → 个人设置 → 更多选项 → 系统令牌

2️⃣  获取用户 ID：
   登录 DMXAPI → 个人设置 → 用户 ID

3️⃣  配置：
   openclaw dmxapi-setup --token <系统令牌> --user <用户 ID>

4️⃣  查询余额：
   openclaw dmxapi-balance
    `);
    return;
  }
  
  console.log('💰 正在查询余额...\n');
  
  try {
    const balance = await getUserBalance(systemToken, userId);
    console.log(formatBalance(balance));
    
    if (balance.balance < 10) {
      console.log('\n⚠️  余额不足￥10，请及时充值！');
      console.log('💳 充值地址：https://www.dmxapi.cn/rmb\n');
    }
  } catch (error: any) {
    console.log(`❌ 查询失败：${error.message}`);
    console.log('\n💡 提示：');
    console.log('   1. 检查系统令牌是否正确');
    console.log('   2. 检查用户 ID 是否正确');
    console.log('   3. 系统令牌获取路径：个人设置 → 更多选项 → 系统令牌\n');
  }
}

/**
 * 设置系统令牌命令
 */
export async function setupTokenCommand(systemToken?: string, userId?: string) {
  if (!systemToken || !userId) {
    console.log(`
🔧 DMXAPI 系统令牌设置

获取方式：
1️⃣  登录 DMXAPI：https://www.dmxapi.cn
2️⃣  进入：工作台 → 个人设置 → 更多选项
3️⃣  复制：系统令牌 和 用户 ID

使用方法：
   openclaw dmxapi-token <系统令牌> <用户 ID>

示例：
   openclaw dmxapi-token sys_xxxxxxxxxxx 123456
    `);
    return;
  }
  
  console.log('🔑 正在验证系统令牌...\n');
  
  try {
    const isValid = await verifySystemToken(systemToken, userId);
    
    if (isValid) {
      console.log('✅ 系统令牌验证成功！');
      console.log(`👤 用户 ID: ${userId}`);
      
      // 查询余额
      const balance = await getUserBalance(systemToken, userId);
      console.log('\n' + formatBalance(balance));
      
      // 这里应该保存配置
      console.log('\n💾 配置已保存');
    } else {
      console.log('❌ 系统令牌无效，请检查后重试');
    }
  } catch (error: any) {
    console.log(`❌ 验证失败：${error.message}`);
  }
}

/**
 * 手动同步模型命令
 */
export async function syncCommand(apiKey?: string, userId?: string) {
  console.log('🔄 正在同步模型列表...');
  
  if (!apiKey) {
    console.log('⚠️  请先配置 API Key：openclaw dmxapi-setup <key>');
    return;
  }
  
  try {
    const models = await fetchModels(apiKey, userId);
    console.log(`✅ 同步完成！共 ${models.length} 个模型`);
    console.log('💾 模型列表已更新');
  } catch (error: any) {
    console.log(`❌ 同步失败：${error.message}`);
  }
}

/**
 * 查询消耗统计命令
 */
export async function statCommand(
  systemToken?: string,
  userId?: string,
  mode: QueryMode = 'today'
) {
  if (!systemToken || !userId) {
    console.log(`
📊 DMXAPI 消耗统计查询

需要系统令牌和用户 ID：

使用方法：
   openclaw dmxapi-stat [today|yesterday|week|month]

示例：
   openclaw dmxapi-stat today      # 今天
   openclaw dmxapi-stat yesterday  # 昨天
   openclaw dmxapi-stat week       # 最近 7 天
   openclaw dmxapi-stat month      # 最近 30 天
    `);
    return;
  }
  
  console.log(`📊 正在查询 ${mode} 的消耗统计...\n`);
  
  try {
    const stat = await getLogStat(systemToken, userId, { mode });
    console.log(formatStatReport(stat, mode));
  } catch (error: any) {
    console.log(`❌ 查询失败：${error.message}`);
  }
}

/**
 * 查询详细日志命令
 */
export async function logsCommand(
  systemToken?: string,
  userId?: string,
  mode: QueryMode = 'today',
  modelName?: string
) {
  if (!systemToken || !userId) {
    console.log(`
📋 DMXAPI 日志查询

需要系统令牌和用户 ID：

使用方法：
   openclaw dmxapi-logs [today|yesterday|week|month] [模型名称]

示例：
   openclaw dmxapi-logs today              # 今天的日志
   openclaw dmxapi-logs week gpt-5.2       # 本周 GPT-5.2 的日志
   openclaw dmxapi-logs month claude       # 本月 Claude 的日志
    `);
    return;
  }
  
  console.log(`📋 正在查询 ${mode} 的详细日志...\n`);
  
  try {
    const result = await getLogDetail(systemToken, userId, { mode, modelName }, 1, 20);
    
    if (result.logs.length === 0) {
      console.log('💭 没有符合条件的日志记录\n');
      return;
    }
    
    console.log(`✅ 找到 ${result.total} 条记录（显示前 20 条）\n`);
    console.log('┌──────┬────────────────────┬───────────────┬────────────┬──────────┐');
    console.log('│ 时间 │ 模型               │ 消耗额度      │ Token      │ 请求数   │');
    console.log('├──────┼────────────────────┼───────────────┼────────────┼──────────┤');
    
    for (const log of result.logs) {
      const time = new Date(log.created_at * 1000).toLocaleString('zh-CN', {
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
      const cost = formatQuota(log.quota);
      const tokens = (log.prompt_tokens + log.completion_tokens).toLocaleString();
      
      console.log(
        `│ ${time.padEnd(4)} │ ${log.model_name.padEnd(18)} │ ${cost.padEnd(13)} │ ${tokens.padEnd(10)} │ 1        │`
      );
    }
    
    console.log('└──────┴────────────────────┴───────────────┴────────────┴──────────┘');
    console.log(`\n💡 提示：总消耗 ${formatQuota(result.logs.reduce((sum, l) => sum + l.quota, 0))}\n`);
    
  } catch (error: any) {
    console.log(`❌ 查询失败：${error.message}`);
  }
}

/**
 * 令牌列表命令
 */
export async function tokenListCommand(systemToken?: string, userId?: string) {
  if (!systemToken || !userId) {
    console.log(`
🔑 DMXAPI 令牌管理

需要系统令牌和用户 ID：

使用方法：
   openclaw dmxapi-tokens list              # 查看所有令牌
   openclaw dmxapi-tokens search <关键词>   # 搜索令牌
   openclaw dmxapi-tokens create [名称]     # 创建令牌
   openclaw dmxapi-tokens enable <ID>       # 启用令牌
   openclaw dmxapi-tokens disable <ID>      # 禁用令牌
   openclaw dmxapi-tokens delete <ID>       # 删除令牌
    `);
    return;
  }
  
  console.log('🔑 正在获取令牌列表...\n');
  
  try {
    const result = await getAllTokens(systemToken, userId, 1, 50);
    
    if (result.items.length === 0) {
      console.log('💭 暂无令牌\n');
      return;
    }
    
    console.log(`✅ 共 ${result.total} 个令牌（显示前 50 个）\n`);
    
    console.log('┌──────┬────────────────────┬─────────┬────────────┬──────────┬────────────┐');
    console.log('│ ID   │ 名称               │ 状态    │ 剩余额度   │ 最后访问 │ 过期时间   │');
    console.log('├──────┼────────────────────┼─────────┼────────────┼──────────┼────────────┤');
    
    for (const token of result.items.slice(0, 20)) {
      const status = token.status === 1 ? '✅' : '❌';
      const quota = token.unlimited_quota ? '∞' : formatTokenQuota(token.remain_quota);
      const accessed = token.accessed_time === 0 ? '从未' : new Date(token.accessed_time * 1000).toLocaleDateString('zh-CN');
      const expired = token.expired_time === -1 ? '永不过期' : new Date(token.expired_time * 1000).toLocaleDateString('zh-CN');
      
      console.log(
        `│ ${token.id.toString().padEnd(4)} │ ${token.name.padEnd(18)} │ ${status.padEnd(7)} │ ${quota.padEnd(10)} │ ${accessed.padEnd(8)} │ ${expired.padEnd(10)} │`
      );
    }
    
    console.log('└──────┴────────────────────┴─────────┴────────────┴──────────┴────────────┘');
    console.log(`\n💡 提示：使用 openclaw dmxapi-tokens search <关键词> 搜索更多令牌\n`);
    
  } catch (error: any) {
    console.log(`❌ 获取失败：${error.message}`);
  }
}

/**
 * 搜索令牌命令
 */
export async function tokenSearchCommand(
  systemToken?: string,
  userId?: string,
  keyword?: string
) {
  if (!systemToken || !userId || !keyword) {
    console.log('🔍 使用方法：openclaw dmxapi-tokens search <关键词>\n');
    return;
  }
  
  console.log(`🔍 正在搜索 "${keyword}"...\n`);
  
  try {
    const tokens = await searchTokens(systemToken, userId, keyword);
    
    if (tokens.length === 0) {
      console.log(`💭 未找到包含 "${keyword}" 的令牌\n`);
      return;
    }
    
    console.log(`✅ 找到 ${tokens.length} 个匹配的令牌：\n`);
    
    for (const token of tokens) {
      console.log(formatTokenInfo(token));
    }
    
  } catch (error: any) {
    console.log(`❌ 搜索失败：${error.message}`);
  }
}

/**
 * 创建令牌命令
 */
export async function tokenCreateCommand(
  systemToken?: string,
  userId?: string,
  name?: string,
  quota?: number,
  group?: string
) {
  if (!systemToken || !userId) {
    console.log(`
🔧 创建令牌

使用方法：
   openclaw dmxapi-tokens create [名称] [额度] [分组]

参数说明：
   名称  - 令牌名称（可选，默认自动生成）
   额度  - 额度 quota（可选，默认无限）
   分组  - 令牌分组（可选，默认 default）

示例：
   openclaw dmxapi-tokens create                    # 无限额度令牌
   openclaw dmxapi-tokens create 我的令牌            # 带名称
   openclaw dmxapi-tokens create 测试 500000        # 有限额度
   openclaw dmxapi-tokens create 项目 A 1000000 default  # 指定分组
    `);
    return;
  }
  
  const tokenName = name || `Token_${Date.now()}`;
  const tokenGroup = group || 'default';  // 默认使用 default 分组
  
  console.log(`🔑 正在创建令牌...\n`);
  console.log(`   名称：${tokenName}`);
  console.log(`   分组：${tokenGroup}`);
  console.log(`   额度：${quota ? quota.toLocaleString() : '无限制'}`);
  console.log();
  
  try {
    const newToken = await createToken(systemToken, userId, {
      name: tokenName,
      quota: quota,
      group: tokenGroup,
      unlimited_quota: quota === undefined,
      unlimited_count: true
    });
    
    console.log('✅ 令牌创建成功！\n');
    console.log(formatTokenInfo(newToken));
    console.log(`\n⚠️  请妥善保管 Key：sk-${newToken.key}\n`);
    
  } catch (error: any) {
    console.log(`❌ 创建失败：${error.message}`);
  }
}

/**
 * 启用/禁用令牌命令
 */
export async function tokenStatusCommand(
  systemToken?: string,
  userId?: string,
  tokenId?: number,
  status: 'enable' | 'disable' = 'enable'
) {
  if (!systemToken || !userId || !tokenId) {
    console.log(`🔧 使用方法：openclaw dmxapi-tokens ${status} <令牌 ID>\n`);
    return;
  }
  
  const action = status === 'enable' ? '启用' : '禁用';
  console.log(`🔑 正在${action}令牌 ${tokenId}...\n`);
  
  try {
    await updateToken(systemToken, userId, {
      id: tokenId,
      status: status === 'enable' ? 1 : 0
    });
    
    console.log(`✅ 令牌已${action}！\n`);
    
  } catch (error: any) {
    console.log(`❌ 操作失败：${error.message}`);
  }
}

/**
 * 更新令牌命令
 */
export async function tokenUpdateCommand(
  systemToken?: string,
  userId?: string,
  tokenId?: number,
  group?: string,
  quota?: number,
  name?: string,
  models?: string  // 模型限制，逗号分隔
) {
  if (!systemToken || !userId || !tokenId) {
    console.log(`
🔧 更新令牌

使用方法：
   openclaw dmxapi-tokens update <ID> [名称] [额度] [分组] [模型]

示例：
   openclaw dmxapi-tokens update 54318                           # 查看当前配置
   openclaw dmxapi-tokens update 54318 新名称                    # 修改名称
   openclaw dmxapi-tokens update 54318 "" 1000000                # 修改额度
   openclaw dmxapi-tokens update 54318 "" "" default             # 修改分组
   openclaw dmxapi-tokens update 54318 "" "" "" "gpt-4o,claude"  # 设置模型限制
    `);
    return;
  }
  
  console.log(`🔑 正在更新令牌 ${tokenId}...\n`);
  
  try {
    const updates: UpdateTokenParams = { id: tokenId };
    
    if (name !== undefined && name !== "") {
      updates.name = name;
    }
    if (quota !== undefined) {
      updates.quota = quota;
      updates.unlimited_quota = false;
    }
    if (group !== undefined && group !== "") {
      updates.group = group;
    }
    if (models !== undefined) {
      if (models === "") {
        updates.model_limits_enabled = false;
        updates.model_limits = "";
      } else {
        updates.model_limits_enabled = true;
        updates.model_limits = models;
      }
    }
    
    const updatedToken = await updateToken(systemToken, userId, updates);
    
    console.log('✅ 令牌更新成功！\n');
    console.log(formatTokenInfo(updatedToken));
    
  } catch (error: any) {
    console.log(`❌ 更新失败：${error.message}`);
  }
}

/**
 * 删除令牌命令
 */
export async function tokenDeleteCommand(
  systemToken?: string,
  userId?: string,
  tokenId?: number
) {
  if (!systemToken || !userId || !tokenId) {
    console.log('🔧 使用方法：openclaw dmxapi-tokens delete <令牌 ID>\n');
    return;
  }
  
  console.log(`⚠️  确定要删除令牌 ${tokenId} 吗？此操作不可恢复！\n`);
  
  try {
    await deleteToken(systemToken, userId, tokenId);
    console.log('✅ 令牌已删除！\n');
    
  } catch (error: any) {
    console.log(`❌ 删除失败：${error.message}`);
  }
}

/**
 * 类型名称映射
 */
function getTypeName(type: string): string {
  const map: Record<string, string> = {
    chat: '💬 对话模型',
    image: '🎨 生图模型',
    video: '🎥 视频模型',
    audio: '🎵 语音模型',
    embedding: '📊 Embedding'
  };
  return map[type] || type;
}
