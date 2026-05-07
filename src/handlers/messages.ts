import type { Context } from '@maxhub/max-bot-api';
import { ask } from '../services/ai';

export async function handleMessage(ctx: Context): Promise<void> {
  const message = ctx.message;
  if (!message) return;

  const text = message.body?.text;
  if (!text || text.startsWith('/')) return;

  const chatId = String(message.recipient.chat_id ?? message.sender?.user_id);

  try {
    const reply = await ask(chatId, text);
    await ctx.reply(reply);
  } catch (err: unknown) {
    console.error('Ошибка AI провайдера:', err);
    await ctx.reply('Извини, произошла ошибка при обращении к ИИ. Попробуй ещё раз.');
  }
}
