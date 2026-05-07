import { config } from '../../config';
import type { AIProvider } from './base';
import { OpenAICompatibleProvider } from './openai-compatible';
import { AnthropicProvider } from './anthropic';

type ProviderConfig = {
  baseURL: string;
  apiKey: string | undefined;
};

const OPENAI_COMPATIBLE: Record<string, ProviderConfig> = {
  openai:   { baseURL: 'https://api.openai.com/v1',                              apiKey: config.openaiApiKey },
  deepseek: { baseURL: 'https://api.deepseek.com',                               apiKey: config.deepseekApiKey },
  qwen:     { baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',      apiKey: config.qwenApiKey },
};

export function createProvider(modelString: string): AIProvider {
  const slash = modelString.indexOf('/');
  if (slash === -1) {
    throw new Error(`Неверный формат: "${modelString}". Используй provider/model, например: openai/gpt-4o`);
  }

  const prefix = modelString.slice(0, slash);
  const model  = modelString.slice(slash + 1);

  if (!model) {
    throw new Error(`Не указана модель после провайдера "${prefix}"`);
  }

  if (prefix === 'anthropic') {
    if (!config.anthropicApiKey) throw new Error('ANTHROPIC_API_KEY не задан в .env');
    return new AnthropicProvider(config.anthropicApiKey, model);
  }

  const providerCfg = OPENAI_COMPATIBLE[prefix];
  if (!providerCfg) {
    const available = [...Object.keys(OPENAI_COMPATIBLE), 'anthropic'].join(', ');
    throw new Error(`Неизвестный провайдер "${prefix}". Доступны: ${available}`);
  }
  if (!providerCfg.apiKey) {
    throw new Error(`${prefix.toUpperCase()}_API_KEY не задан в .env`);
  }

  return new OpenAICompatibleProvider(providerCfg.apiKey, providerCfg.baseURL, model);
}

export function availableProviders(): string[] {
  const result: string[] = [];
  for (const [name, cfg] of Object.entries(OPENAI_COMPATIBLE)) {
    if (cfg.apiKey) result.push(name);
  }
  if (config.anthropicApiKey) result.push('anthropic');
  return result;
}
