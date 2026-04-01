/**
 * DMXAPI 余额查询模块
 * 通过官方 API 获取用户余额
 */

import axios from 'axios';

const BALANCE_API = 'https://www.dmxapi.cn/api/user/self';

export interface Balance {
  quota: number;      // 账户额度
  balance: number;    // 人民币余额（元）
  userId?: string;    // 用户 ID
}

/**
 * 查询余额
 * 需要系统令牌（不是 API Key）
 */
export async function getBalance(systemToken: string, userId: string): Promise<Balance> {
  try {
    const response = await axios.get(BALANCE_API, {
      headers: {
        'Accept': 'application/json',
        'Authorization': systemToken,
        'Rix-Api-User': userId
      },
      timeout: 10000
    });
    
    const data = response.data;
    const quota = data?.data?.quota || 0;
    
    // 人民币余额 = quota / 500000
    const balance = quota / 500000;
    
    return {
      quota,
      balance,
      userId
    };
    
  } catch (error: any) {
    console.error('[DMXAPI] 查询余额失败:', error.message);
    
    if (error.response?.status === 401) {
      throw new Error('系统令牌无效或已过期');
    } else if (error.response?.status === 403) {
      throw new Error('无权访问，请检查用户 ID 是否正确');
    } else if (error.response?.status === 404) {
      throw new Error('用户不存在');
    } else {
      throw new Error(`查询失败：${error.message}`);
    }
  }
}

/**
 * 验证系统令牌
 */
export async function verifySystemToken(systemToken: string, userId: string): Promise<boolean> {
  try {
    const balance = await getBalance(systemToken, userId);
    return balance.quota >= 0;
  } catch {
    return false;
  }
}

/**
 * 格式化余额显示
 */
export function formatBalance(balance: Balance): string {
  const lines = [
    '┌─────────────────────────┐',
    '│      DMXAPI 余额        │',
    '├─────────────────────────┤',
    `│ 账户额度：${balance.quota.toLocaleString().padStart(10)}      │`,
    `│ 人民币余额：￥${balance.balance.toFixed(6).padStart(10)}│`,
    '└─────────────────────────┘'
  ];
  
  if (balance.userId) {
    lines.splice(2, 0, `│ 用户 ID: ${balance.userId.toString().padStart(12)}│`);
    lines[1] = '│      DMXAPI 余额        │';
  }
  
  return lines.join('\n');
}
