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
  deepseekApiKey: requireEnv('DEEPSEEK_API_KEY'),
  deepseekModel: process.env.DEEPSEEK_MODEL || 'deepseek-chat',
  systemPrompt: process.env.SYSTEM_PROMPT || 'You are a helpful assistant. Answer concisely and clearly.',
  maxHistory: parseInt(process.env.MAX_HISTORY || '20', 10),
};
