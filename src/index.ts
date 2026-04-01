/**
 * DMXAPI 插件主入口
 */

import { Plugin, PluginConfig } from './sdk';
import { fetchModels } from './api/models';
import { setupCommand, modelsCommand, balanceCommand, syncCommand, setupTokenCommand, statCommand, logsCommand, tokenListCommand, tokenSearchCommand, tokenCreateCommand, tokenStatusCommand, tokenDeleteCommand, tokenUpdateCommand } from './commands';

interface DMXAPIConfig {
  apiKey?: string;         // API Key（用于模型列表）
  systemToken?: string;    // 系统令牌（用于余额查询）
  userId?: string;         // 用户 ID
  autoSync?: boolean;
  syncInterval?: number;
  inviteCode?: string;
  enableBalanceNotify?: boolean;
  balanceThreshold?: number;
}

export default class DMXAPIPlugin extends Plugin {
  name = 'dmxapi';
  version = '1.0.0';
  description = 'DMXAPI 模型聚合插件 - 自动同步模型列表 + 邀请返利追踪';
  
  private config: DMXAPIConfig = {};
  private syncTimer?: NodeJS.Timeout;
  
  /**
   * 插件激活
   */
  async activate() {
    console.log('[DMXAPI] 插件激活中...');
    
    // 加载配置
    this.config = await this.loadConfig();
    
    // 注册命令
    this.registerCommand('dmxapi-setup', this.handleSetup.bind(this));
    this.registerCommand('dmxapi-models', this.handleModels.bind(this));
    this.registerCommand('dmxapi-balance', this.handleBalance.bind(this));
    this.registerCommand('dmxapi-sync', this.handleSync.bind(this));
    this.registerCommand('dmxapi-token', this.handleToken.bind(this));
    this.registerCommand('dmxapi-tokens', this.handleTokens.bind(this));
    this.registerCommand('dmxapi-stat', this.handleStat.bind(this));
    this.registerCommand('dmxapi-logs', this.handleLogs.bind(this));
    
    // 启动自动同步
    if (this.config.autoSync) {
      this.startAutoSync();
    }
    
    console.log('[DMXAPI] 插件激活完成');
  }
  
  /**
   * 插件停用
   */
  async deactivate() {
    console.log('[DMXAPI] 插件停用中...');
    
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }
    
    console.log('[DMXAPI] 插件已停用');
  }
  
  /**
   * 处理 setup 命令
   */
  private async handleSetup(args: string[]) {
    const apiKey = args[0];
    await setupCommand(apiKey);
    
    if (apiKey) {
      // 保存配置
      this.config.apiKey = apiKey;
      await this.saveConfig();
      
      // 启动自动同步
      if (this.config.autoSync) {
        this.startAutoSync();
      }
    }
  }
  
  /**
   * 处理 models 命令
   */
  private async handleModels() {
    await modelsCommand();
  }
  
  /**
   * 处理 balance 命令
   */
  private async handleBalance() {
    if (!this.config.systemToken || !this.config.userId) {
      console.log('❌ 请先配置系统令牌：openclaw dmxapi-token <token> <user-id>');
      return;
    }
    await balanceCommand(this.config.systemToken, this.config.userId);
  }
  
  /**
   * 处理 token 命令
   */
  private async handleToken(args: string[]) {
    const [systemToken, userId] = args;
    await setupTokenCommand(systemToken, userId);
    
    if (systemToken && userId) {
      // 保存配置
      this.config.systemToken = systemToken;
      this.config.userId = userId;
      await this.saveConfig();
    }
  }
  
  /**
   * 处理 sync 命令
   */
  private async handleSync() {
    await syncCommand();
  }
  
  /**
   * 启动自动同步
   */
  private startAutoSync() {
    if (this.syncTimer) {
      clearInterval(this.syncTimer);
    }
    
    const interval = (this.config.syncInterval || 86400) * 1000; // 默认 24 小时
    
    this.syncTimer = setInterval(async () => {
      try {
        if (this.config.apiKey) {
          console.log('[DMXAPI] 自动同步模型列表...');
          const models = await fetchModels(this.config.apiKey, this.config.userId);
          console.log(`[DMXAPI] 同步完成，共 ${models.length} 个模型`);
          
          // 这里可以触发配置更新事件
          this.emit('models-updated', models);
        }
      } catch (error: any) {
        console.error('[DMXAPI] 自动同步失败:', error.message);
      }
    }, interval);
    
    console.log(`[DMXAPI] 自动同步已启动（间隔：${interval / 1000}秒）`);
  }
  
  /**
   * 加载配置
   */
  protected async loadConfig(): Promise<DMXAPIConfig> {
    try {
      return (await this.configService.get('dmxapi')) as DMXAPIConfig || {};
    } catch {
      return {};
    }
  }
  
  /**
   * 保存配置
   */
  protected async saveConfig() {
    try {
      await this.configService.set('dmxapi', this.config);
    } catch (error) {
      console.error('[DMXAPI] 保存配置失败:', error);
    }
  }
  
  /**
   * 处理 stat 命令
   */
  private async handleStat(args: string[]) {
    const mode = (args[0] as any) || 'today';
    await statCommand(this.config.systemToken, this.config.userId, mode);
  }
  
  /**
   * 处理 logs 命令
   */
  private async handleLogs(args: string[]) {
    const mode = (args[0] as any) || 'today';
    const modelName = args[1];
    await logsCommand(this.config.systemToken, this.config.userId, mode, modelName);
  }
  
  /**
   * 处理 tokens 命令
   */
  private async handleTokens(args: string[]) {
    const subCommand = args[0];
    const systemToken = this.config.systemToken;
    const userId = this.config.userId;
    
    switch (subCommand) {
      case 'list':
        await tokenListCommand(systemToken, userId);
        break;
      case 'search':
        await tokenSearchCommand(systemToken, userId, args[1]);
        break;
      case 'create':
        await tokenCreateCommand(
          systemToken,
          userId,
          args[1],  // 名称
          args[2] ? parseInt(args[2]) : undefined,  // 额度
          args[3]   // 分组
        );
        break;
      case 'enable':
        await tokenStatusCommand(systemToken, userId, args[1] ? parseInt(args[1]) : undefined, 'enable');
        break;
      case 'disable':
        await tokenStatusCommand(systemToken, userId, args[1] ? parseInt(args[1]) : undefined, 'disable');
        break;
      case 'delete':
        await tokenDeleteCommand(systemToken, userId, args[1] ? parseInt(args[1]) : undefined);
        break;
      default:
        await tokenListCommand(systemToken, userId);
    }
  }
}
