/**
 * DMXAPI 令牌管理模块
 * 提供令牌的创建、查询、更新、删除等功能
 */

import axios from 'axios';

const TOKEN_API = 'https://www.dmxapi.cn/api/token';

export interface TokenInfo {
  id: number;
  name: string;
  key: string;
  status: number;           // 1=启用，0=禁用
  group: string;
  used_quota: number;       // 已用额度
  remain_quota: number;     // 剩余额度
  unlimited_quota: boolean; // 无限额度
  remain_count: number;     // 剩余次数
  unlimited_count: boolean; // 无限次数
  created_time: number;     // Unix timestamp
  accessed_time: number;    // 最后访问时间
  expired_time: number;     // 过期时间 (-1=永不过期)
  model_limits_enabled: boolean;
  rate_limits_enabled: boolean;
  allow_ips: string | null;
  exclude_ips: string | null;
}

export interface TokenList {
  items: TokenInfo[];
  total: number;
  page: number;
  page_size: number;
}

export interface CreateTokenParams {
  name?: string;
  quota?: number;
  count?: number;
  group?: string;         // 令牌分组，如 "default"
  expired_time?: number;  // Unix timestamp, -1=永不过期
  allow_ips?: string;     // IP 白名单，多个用逗号分隔
  exclude_ips?: string;   // IP 黑名单
  unlimited_quota?: boolean;
  unlimited_count?: boolean;
  model_limits_enabled?: boolean;  // 是否启用模型限制
  model_limits?: string;           // 允许的模型列表，逗号分隔
}

export interface UpdateTokenParams {
  id: number;
  name?: string;
  status?: number;
  quota?: number;
  unlimited_quota?: boolean;
  expired_time?: number;
  group?: string;
  model_limits_enabled?: boolean;
  model_limits?: string;
  allow_ips?: string;
  exclude_ips?: string;
}

/**
 * 获取所有令牌
 */
export async function getAllTokens(
  systemToken: string,
  userId: string,
  page: number = 1,
  pageSize: number = 50
): Promise<TokenList> {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${systemToken}`,
      'Rix-Api-User': userId
    };
    
    const params = { page, page_size: pageSize };
    
    const response = await axios.get(`${TOKEN_API}/`, {
      headers,
      params,
      timeout: 10000
    });
    
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || '获取令牌列表失败');
    }
    
    return {
      items: data.data?.items || [],
      total: data.data?.total || 0,
      page: data.data?.page || 1,
      page_size: data.data?.page_size || 50
    };
    
  } catch (error: any) {
    console.error('[DMXAPI] 获取令牌列表失败:', error.message);
    throw error;
  }
}

/**
 * 搜索令牌
 */
export async function searchTokens(
  systemToken: string,
  userId: string,
  keyword: string
): Promise<TokenInfo[]> {
  try {
    const allTokens = await getAllTokens(systemToken, userId, 1, 100);
    
    // 本地搜索（按名称或 Key）
    return allTokens.items.filter(token => 
      token.name.toLowerCase().includes(keyword.toLowerCase()) ||
      token.key.toLowerCase().includes(keyword.toLowerCase())
    );
    
  } catch (error: any) {
    console.error('[DMXAPI] 搜索令牌失败:', error.message);
    throw error;
  }
}

/**
 * 创建令牌
 */
export async function createToken(
  systemToken: string,
  userId: string,
  params: CreateTokenParams
): Promise<TokenInfo> {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${systemToken}`,
      'Rix-Api-User': userId,
      'Content-Type': 'application/json'
    };
    
    const body: any = {
      name: params.name || `Token_${Date.now()}`,
      group: params.group || 'default'  // 默认使用 default 分组
    };
    
    // 额度设置
    if (params.unlimited_quota !== undefined) {
      body.unlimited_quota = params.unlimited_quota;
    } else {
      body.unlimited_quota = params.quota === undefined;
      if (params.quota !== undefined) {
        body.quota = params.quota;
      }
    }
    
    // 次数设置
    if (params.unlimited_count !== undefined) {
      body.unlimited_count = params.unlimited_count;
    } else {
      body.unlimited_count = params.count === undefined;
      if (params.count !== undefined) {
        body.count = params.count;
      }
    }
    
    // 其他参数
    if (params.expired_time !== undefined) {
      body.expired_time = params.expired_time;
    }
    if (params.allow_ips) {
      body.allow_ips = params.allow_ips;
    }
    if (params.exclude_ips) {
      body.exclude_ips = params.exclude_ips;
    }
    
    const response = await axios.post(`${TOKEN_API}/`, body, { headers, timeout: 10000 });
    
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || '创建令牌失败');
    }
    
    return data.data;
    
  } catch (error: any) {
    console.error('[DMXAPI] 创建令牌失败:', error.message);
    throw error;
  }
}

/**
 * 获取单个令牌详情
 */
export async function getTokenById(
  systemToken: string,
  userId: string,
  tokenId: number
): Promise<TokenInfo> {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${systemToken}`,
      'Rix-Api-User': userId
    };
    
    const response = await axios.get(`${TOKEN_API}/${tokenId}`, {
      headers,
      timeout: 10000
    });
    
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || '获取令牌详情失败');
    }
    
    return data.data;
    
  } catch (error: any) {
    console.error('[DMXAPI] 获取令牌详情失败:', error.message);
    throw error;
  }
}

/**
 * 更新令牌（全量更新）
 */
export async function updateToken(
  systemToken: string,
  userId: string,
  params: UpdateTokenParams
): Promise<TokenInfo> {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${systemToken}`,
      'Rix-Api-User': userId,
      'Content-Type': 'application/json'
    };
    
    // 先查询当前令牌数据，防止全量更新覆盖未修改的字段
    const currentToken = await getTokenById(systemToken, userId, params.id);
    
    // 合并修改
    const body: any = {
      ...currentToken,
      ...params
    };
    
    // 删除不需要的字段
    delete body.user_id;
    delete body.key;
    delete body.created_time;
    delete body.accessed_time;
    
    // PUT 到 /api/token/（不是 /api/token/{id}）
    const response = await axios.put(TOKEN_API, body, { headers, timeout: 10000 });
    
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || '更新令牌失败');
    }
    
    return data.data;
    
  } catch (error: any) {
    console.error('[DMXAPI] 更新令牌失败:', error.message);
    throw error;
  }
}

/**
 * 删除令牌
 */
export async function deleteToken(
  systemToken: string,
  userId: string,
  tokenId: number
): Promise<void> {
  try {
    const headers = {
      'Accept': 'application/json',
      'Authorization': `Bearer ${systemToken}`,
      'Rix-Api-User': userId
    };
    
    const response = await axios.delete(`${TOKEN_API}/${tokenId}`, { headers, timeout: 10000 });
    
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || '删除令牌失败');
    }
    
  } catch (error: any) {
    console.error('[DMXAPI] 删除令牌失败:', error.message);
    throw error;
  }
}

/**
 * 获取令牌余额
 */
export async function getTokenBalance(
  systemToken: string,
  userId: string,
  tokenId: number
): Promise<{ quota: number, remain: number, used: number }> {
  try {
    const allTokens = await getAllTokens(systemToken, userId, 1, 1);
    const token = allTokens.items.find(t => t.id === tokenId);
    
    if (!token) {
      throw new Error('令牌不存在');
    }
    
    return {
      quota: token.unlimited_quota ? -1 : (token.remain_quota + token.used_quota),
      remain: token.unlimited_quota ? -1 : token.remain_quota,
      used: token.used_quota
    };
    
  } catch (error: any) {
    console.error('[DMXAPI] 查询令牌余额失败:', error.message);
    throw error;
  }
}

/**
 * 格式化令牌信息
 */
export function formatTokenInfo(token: TokenInfo): string {
  const status = token.status === 1 ? '✅ 启用' : '❌ 禁用';
  const quota = token.unlimited_quota ? '无限制' : token.remain_quota.toLocaleString();
  const count = token.unlimited_count ? '无限制' : token.remain_count.toLocaleString();
  const created = formatTime(token.created_time);
  const expired = token.expired_time === -1 ? '永不过期' : formatTime(token.expired_time);
  const accessed = token.accessed_time === 0 ? '从未访问' : formatTime(token.accessed_time);
  
  return `
┌─────────────────────────────────────────────┐
│ 令牌：${token.name.padEnd(32)}│
├─────────────────────────────────────────────┤
│ ID        : ${token.id.toString().padEnd(32)}│
│ Key       : sk-${token.key.padEnd(31)}│
│ 状态      : ${status.padEnd(32)}│
│ 分组      : ${token.group.padEnd(32)}│
├─────────────────────────────────────────────┤
│ 已用额度  : ${token.used_quota.toLocaleString().padEnd(32)}│
│ 剩余额度  : ${quota.padEnd(32)}│
│ 剩余次数  : ${count.padEnd(32)}│
├─────────────────────────────────────────────┤
│ 创建时间  : ${created.padEnd(32)}│
│ 最后访问  : ${accessed.padEnd(32)}│
│ 过期时间  : ${expired.padEnd(32)}│
├─────────────────────────────────────────────┤
│ 模型限制  : ${token.model_limits_enabled ? '是' : '否'.padEnd(32)}│
│ 速率限制  : ${token.rate_limits_enabled ? '是' : '否'.padEnd(32)}│
│ IP 白名单 : ${(token.allow_ips || '无').padEnd(32)}│
│ IP 黑名单 : ${(token.exclude_ips || '无').padEnd(32)}│
└─────────────────────────────────────────────┘
`;
}

/**
 * 格式化时间戳
 */
function formatTime(timestamp: number): string {
  if (timestamp === -1 || timestamp === 0) {
    return timestamp === -1 ? '永不过期' : '从未访问';
  }
  return new Date(timestamp * 1000).toLocaleString('zh-CN');
}

/**
 * 格式化额度
 */
export function formatQuota(quota: number): string {
  if (quota === -1) return '无限制';
  const rmb = quota / 500000;
  return `￥${rmb.toFixed(6)} (${quota.toLocaleString()})`;
}
