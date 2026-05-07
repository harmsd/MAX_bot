import type { Context } from '@maxhub/max-bot-api';
import { resetHistory } from '../services/history';
import { getChatModel, setChatModel, availableProviders } from '../services/ai';

function getChatId(ctx: Context): string {
  return String(ctx.message?.recipient?.chat_id ?? ctx.message?.sender?.user_id);
}

export async function handleStart(ctx: Context): Promise<void> {
  const name = ctx.message?.sender?.name ?? 'друг';
  await ctx.reply(
    `Привет, ${name}! Я ИИ-ассистент с поддержкой нескольких AI-моделей.\n\n` +
    `Просто напиши мне любое сообщение, и я отвечу.\n\n` +
    `Используй /help для списка команд.`
  );
}

export async function handleReset(ctx: Context): Promise<void> {
  resetHistory(getChatId(ctx));
  await ctx.reply('История диалога очищена. Начинаем заново!');
}

export async function handleHelp(ctx: Context): Promise<void> {
  await ctx.reply(
    'Напиши мне любое сообщение — я отвечу с помощью AI.\n\n' +
    'Команды:\n' +
    '/start — запустить бота\n' +
    '/reset — очистить историю диалога\n' +
    '/model — показать текущую модель\n' +
    '/model provider/name — сменить модель (например: /model openai/gpt-4o)\n' +
    '/models — список доступных провайдеров\n' +
    '/help — показать это сообщение'
  );
}

export async function handleModel(ctx: Context): Promise<void> {
  const chatId = getChatId(ctx);
  const text = ctx.message?.body.text ?? '';
  const arg = text.trim().split(/\s+/).slice(1).join(' ');

  if (!arg) {
    const current = getChatModel(chatId);
    await ctx.reply(`Текущая модель: ${current}`);
    return;
  }

  try {
    setChatModel(chatId, arg);
    await ctx.reply(`Модель изменена на: ${arg}`);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    await ctx.reply(`Ошибка: ${msg}`);
  }
}

export async function handleModels(ctx: Context): Promise<void> {
  const available = availableProviders();

  if (available.length === 0) {
    await ctx.reply('Нет настроенных провайдеров. Добавь API ключи в .env');
    return;
  }

  const examples: Record<string, string[]> = {
    openai:    ['gpt-4o', 'gpt-4o-mini', 'o3-mini'],
    anthropic: ['claude-opus-4-5', 'claude-sonnet-4-5', 'claude-haiku-4-5'],
    deepseek:  ['deepseek-chat', 'deepseek-reasoner'],
    qwen:      ['qwen-plus', 'qwen-max', 'qwen-turbo'],
  };

  const lines = available.map(p => {
    const models = (examples[p] ?? []).map(m => `  /model ${p}/${m}`).join('\n');
    return `${p}:\n${models}`;
  });

  await ctx.reply(`Доступные провайдеры:\n\n${lines.join('\n\n')}`);
}
