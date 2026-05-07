import 'dotenv/config';

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    console.error(`Ошибка: ${key} не задан в .env`);
    process.exit(1);
  }
  return value;
}

export const config = {
  maxBotToken: requireEnv('MAX_BOT_TOKEN'),
  systemPrompt: process.env.SYSTEM_PROMPT || 'You are a helpful assistant. Answer concisely and clearly.',
  maxHistory: parseInt(process.env.MAX_HISTORY || '20', 10),
  defaultModel: process.env.DEFAULT_MODEL || 'deepseek/deepseek-chat',

  openaiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  deepseekApiKey: process.env.DEEPSEEK_API_KEY,
  qwenApiKey: process.env.QWEN_API_KEY,
};
