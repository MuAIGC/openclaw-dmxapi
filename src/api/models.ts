/**
 * DMXAPI 模型同步模块
 * 通过官方 API 获取真实模型列表
 */

import axios from 'axios';

export interface Model {
  id: string;
  name: string;
  type: 'chat' | 'image' | 'video' | 'audio' | 'embedding' | 'translation' | 'ocr';
  provider: string;
  isFree: boolean;
  price?: number; // 元/千 tokens
  multiplier?: number; // 倍率
}

/**
 * 通过官方 API 获取模型列表
 */
export async function fetchModels(apiKey: string, userId?: string): Promise<Model[]> {
  try {
    const url = 'https://www.dmxapi.cn/v1/models';
    
    const headers: Record<string, string> = {
      'Authorization': apiKey,
      'Accept': 'application/json',
    };
    
    if (userId) {
      headers['Rix-Api-User'] = userId;
    }
    
    const response = await axios.get(url, {
      headers,
      timeout: 10000
    });
    
    const data = response.data;
    
    // 解析 API 响应
    if (data && Array.isArray(data.data)) {
      return data.data.map((item: any) => parseModel(item));
    }
    
    // 如果响应格式不对，返回空数组
    return [];
    
  } catch (error) {
    console.error('[DMXAPI] 获取模型列表失败:', error);
    throw error;
  }
}

/**
 * 解析单个模型数据
 */
function parseModel(item: any): Model {
  const id = item.id || item.name || 'unknown';
  const name = item.name || id;
  
  // 检测类型
  const type = detectModelType(id, name);
  
  // 检测提供商
  const provider = detectProvider(id, name);
  
  // 判断是否免费
  const isFree = item.is_free ?? (item.multiplier !== undefined && item.multiplier === 0) ?? false;
  
  // 价格（元/千 tokens）
  const price = item.price ?? (item.multiplier ? item.multiplier * 0.004 : undefined);
  
  return {
    id,
    name,
    type,
    provider,
    isFree,
    price,
    multiplier: item.multiplier
  };
}

/**
 * 检测模型类型
 */
function detectModelType(id: string, name: string): Model['type'] {
  const text = (id + ' ' + name).toLowerCase();
  
  if (text.includes('image') || text.includes('draw') || text.includes('绘') || text.includes('t2i')) {
    return 'image';
  }
  if (text.includes('video') || text.includes('t2v') || text.includes('i2v')) {
    return 'video';
  }
  if (text.includes('tts') || text.includes('stt') || text.includes('speech') || text.includes('audio') || text.includes('语音')) {
    return 'audio';
  }
  if (text.includes('embed') || text.includes('rerank')) {
    return 'embedding';
  }
  if (text.includes('ocr') || text.includes('transcribe')) {
    return 'ocr';
  }
  if (text.includes('mt') || text.includes('translat')) {
    return 'translation';
  }
  
  return 'chat';
}

/**
 * 检测模型提供商
 */
function detectProvider(id: string, name: string): string {
  const text = (id + ' ' + name).toLowerCase();
  
  if (text.includes('gpt') || text.includes('openai')) return 'OpenAI';
  if (text.includes('claude')) return 'Anthropic';
  if (text.includes('gemini')) return 'Google';
  if (text.includes('qwen') || text.includes('千问')) return 'Alibaba';
  if (text.includes('doubao') || text.includes('豆包')) return 'ByteDance';
  if (text.includes('minimax') || text.includes('海螺')) return 'MiniMax';
  if (text.includes('glm') || text.includes('智谱')) return 'Zhipu';
  if (text.includes('kling') || text.includes('可灵')) return 'Kuaishou';
  if (text.includes('vidu')) return 'Vidu';
  if (text.includes('sora')) return 'OpenAI';
  if (text.includes('wan') || text.includes('万相')) return 'Alibaba';
  if (text.includes('suno')) return 'Suno';
  if (text.includes('mimo') || text.includes('小米')) return 'Xiaomi';
  if (text.includes('jina')) return 'Jina';
  if (text.includes('bge')) return 'BAAI';
  
  return 'Unknown';
}

/**
 * 默认模型列表（API 调用失败时使用）
 */
export function getDefaultModels(): Model[] {
  return [
    { id: 'gpt-5.2', name: 'GPT-5.2', type: 'chat', provider: 'OpenAI', isFree: true },
    { id: 'gpt-5.2-pro', name: 'GPT-5.2 Pro', type: 'chat', provider: 'OpenAI', isFree: false, price: 0.5 },
    { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', type: 'chat', provider: 'Anthropic', isFree: true },
    { id: 'claude-opus-4', name: 'Claude Opus 4', type: 'chat', provider: 'Anthropic', isFree: false, price: 0.8 },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', type: 'chat', provider: 'Google', isFree: true },
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', type: 'chat', provider: 'Google', isFree: false, price: 0.6 },
    { id: 'gemini-3.1-flash-image', name: 'Gemini 3.1 Flash Image', type: 'image', provider: 'Google', isFree: false, price: 0.5 },
    { id: 'gemini-3-pro-image', name: 'Gemini 3 Pro Image', type: 'image', provider: 'Google', isFree: false, price: 1.0 },
    { id: 'doubao-seedream-5.0-lite', name: 'Doubao Seedream 5.0 Lite', type: 'image', provider: 'ByteDance', isFree: true },
    { id: 'minimax-hailuo-2.3', name: 'MiniMax Hailuo 2.3', type: 'video', provider: 'MiniMax', isFree: true },
    { id: 'mimo-v2-tts', name: 'MiMo V2 TTS', type: 'audio', provider: 'Xiaomi', isFree: true },
    { id: 'sora2', name: 'Sora2', type: 'video', provider: 'OpenAI', isFree: false, price: 2.0 },
  ];
}
