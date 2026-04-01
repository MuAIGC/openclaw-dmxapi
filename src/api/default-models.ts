import type { Model } from './models';

/**
 * 默认模型列表（爬取失败时使用）
 */
export function getDefaultModels(): Model[] {
  return [
    { id: 'gpt-5.2', name: 'GPT-5.2', type: 'chat', provider: 'OpenAI', isFree: true },
    { id: 'claude-sonnet-4', name: 'Claude Sonnet 4', type: 'chat', provider: 'Anthropic', isFree: true },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', type: 'chat', provider: 'Google', isFree: true },
    { id: 'qwen-flash', name: 'Qwen Flash', type: 'chat', provider: 'Alibaba', isFree: true },
    { id: 'doubao-seedream-5.0-lite', name: 'Doubao Seedream 5.0 Lite', type: 'image', provider: 'ByteDance', isFree: true },
    { id: 'wan2.6-t2i', name: 'Wan 2.6 T2I', type: 'image', provider: 'Alibaba', isFree: true },
    { id: 'minimax-hailuo-2.3', name: 'MiniMax Hailuo 2.3', type: 'video', provider: 'MiniMax', isFree: true },
    { id: 'mimo-v2-tts', name: 'MiMo V2 TTS', type: 'audio', provider: 'Xiaomi', isFree: true },
    { id: 'whisper-stt', name: 'Whisper STT', type: 'audio', provider: 'OpenAI', isFree: true },
    { id: 'gpt-5.2-pro', name: 'GPT-5.2 Pro', type: 'chat', provider: 'OpenAI', isFree: false, price: 0.5 },
    { id: 'gemini-3.1-flash-image', name: 'Gemini 3.1 Flash Image', type: 'image', provider: 'Google', isFree: false, price: 0.5 },
    { id: 'sora2', name: 'Sora2', type: 'video', provider: 'OpenAI', isFree: false, price: 2.0 },
  ];
}
