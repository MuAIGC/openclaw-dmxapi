/**
 * DMXAPI 日志查询模块
 * 通过官方 API 获取用户日志和消耗统计
 */

import axios from 'axios';

const LOG_STAT_API = 'https://www.dmxapi.cn/api/log/self/stat';
const LOG_DETAIL_API = 'https://www.dmxapi.cn/api/log/self';

export interface LogStat {
  quota: number;        // 总消耗额度
  rpm: number;          // Requests Per Minute
  tpm: number;          // Tokens Per Minute
  mpm: number;          // Messages Per Minute
}

export interface LogDetail {
  id: number;
  user_id: number;
  token_name: string;
  model_name: string;
  quota: number;
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
  created_at: number;
}

export type QueryMode = 'today' | 'yesterday' | 'week' | 'month' | 'custom';

export interface QueryOptions {
  mode?: QueryMode;
  startTime?: number;  // Unix timestamp (seconds)
  endTime?: number;    // Unix timestamp (seconds)
  tokenName?: string;
  modelName?: string;
}

/**
 * 查询消耗统计
 */
export async function getLogStat(
  systemToken: string,
  userId: string,
  options: QueryOptions = {}
): Promise<LogStat> {
  try {
    const { startTime, endTime, mode = 'today' } = options;
    
    // 计算时间范围
    const timeRange = getTimeRange(mode, startTime, endTime);
    
    const headers = {
      'Accept': 'application/json',
      'Authorization': systemToken,
      'Rix-Api-User': userId
    };
    
    const params: Record<string, any> = {
      type: 0,  // 0 = 全部统计
      start_timestamp: timeRange.start,
      end_timestamp: timeRange.end
    };
    
    // 可选筛选条件
    if (options.tokenName) {
      params.token_name = options.tokenName;
    }
    if (options.modelName) {
      params.model_name = options.modelName;
    }
    
    const response = await axios.get(LOG_STAT_API, {
      headers,
      params,
      timeout: 10000
    });
    
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || '查询失败');
    }
    
    return {
      quota: data.data?.quota || 0,
      rpm: data.data?.rpm || 0,
      tpm: data.data?.tpm || 0,
      mpm: data.data?.mpm || 0
    };
    
  } catch (error: any) {
    console.error('[DMXAPI] 查询消耗统计失败:', error.message);
    
    if (error.response?.status === 401) {
      throw new Error('系统令牌无效或已过期');
    } else if (error.response?.status === 403) {
      throw new Error('无权访问，请检查用户 ID 是否正确');
    } else {
      throw new Error(`查询失败：${error.message}`);
    }
  }
}

/**
 * 查询详细日志
 */
export async function getLogDetail(
  systemToken: string,
  userId: string,
  options: QueryOptions = {},
  page: number = 1,
  pageSize: number = 20
): Promise<{ logs: LogDetail[], total: number }> {
  try {
    const { startTime, endTime, mode = 'today' } = options;
    const timeRange = getTimeRange(mode, startTime, endTime);
    
    const headers = {
      'Accept': 'application/json',
      'Authorization': systemToken,
      'Rix-Api-User': userId
    };
    
    const params: Record<string, any> = {
      start_timestamp: timeRange.start,
      end_timestamp: timeRange.end,
      page,
      page_size: pageSize
    };
    
    if (options.tokenName) {
      params.token_name = options.tokenName;
    }
    if (options.modelName) {
      params.model_name = options.modelName;
    }
    
    const response = await axios.get(LOG_DETAIL_API, {
      headers,
      params,
      timeout: 10000
    });
    
    const data = response.data;
    
    if (!data.success) {
      throw new Error(data.message || '查询失败');
    }
    
    return {
      logs: data.data?.items || [],
      total: data.data?.total || 0
    };
    
  } catch (error: any) {
    console.error('[DMXAPI] 查询详细日志失败:', error.message);
    throw error;
  }
}

/**
 * 计算时间范围
 */
function getTimeRange(mode: QueryMode, customStart?: number, customEnd?: number): { start: number, end: number } {
  const now = Math.floor(Date.now() / 1000);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStart = Math.floor(today.getTime() / 1000);
  
  switch (mode) {
    case 'today':
      return {
        start: todayStart,
        end: now
      };
    
    case 'yesterday':
      return {
        start: todayStart - 86400,
        end: todayStart - 1
      };
    
    case 'week':
      return {
        start: todayStart - 6 * 86400,
        end: now
      };
    
    case 'month':
      return {
        start: todayStart - 29 * 86400,
        end: now
      };
    
    case 'custom':
    default:
      return {
        start: customStart || todayStart,
        end: customEnd || now
      };
  }
}

/**
 * 格式化额度显示
 */
export function formatQuota(quota: number): string {
  const actual = quota / 500000;
  return `￥${actual.toFixed(6)}`;
}

/**
 * 格式化统计报告
 */
export function formatStatReport(stat: LogStat, mode: QueryMode): string {
  const modeText = {
    today: '今天',
    yesterday: '昨天',
    week: '最近 7 天',
    month: '最近 30 天',
    custom: '自定义时间'
  }[mode];
  
  const lines = [
    '┌─────────────────────────────────┐',
    '│      DMXAPI 消耗统计报告        │',
    '├─────────────────────────────────┤',
    `│ 查询范围：${modeText.padEnd(20)}│`,
    '├─────────────────────────────────┤',
    `│ 总消耗额度：${formatQuota(stat.quota).padEnd(16)}│`,
    `│ 原始值：${stat.quota.toString().padEnd(20)}│`,
    '├─────────────────────────────────┤',
    `│ RPM (请求/分钟): ${stat.rpm.toString().padEnd(11)}│`,
    `│ TPM (Token/分钟): ${stat.tpm.toString().padEnd(9)}│`,
    `│ MPM (消息/分钟): ${stat.mpm.toString().padEnd(11)}│`,
    '└─────────────────────────────────┘'
  ];
  
  return lines.join('\n');
}
