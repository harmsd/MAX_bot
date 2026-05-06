import type { Context } from '@maxhub/max-bot-api';
import { resetHistory } from '../services/history';

export async function handleStart(ctx: Context): Promise<void> {
  const name = ctx.message?.sender?.name ?? 'друг';
  await ctx.reply(
    `Привет, ${name}! Я ИИ-ассистент на базе DeepSeek.\n\nПросто напиши мне любое сообщение, и я отвечу. Используй /reset для очистки истории диалога.`
  );
}

export async function handleReset(ctx: Context): Promise<void> {
  const chatId = String(ctx.message?.recipient?.chat_id ?? ctx.message?.sender?.user_id);
  resetHistory(chatId);
  await ctx.reply('История диалога очищена. Начинаем заново!');
}

export async function handleHelp(ctx: Context): Promise<void> {
  await ctx.reply(
    'Напиши мне любое сообщение — я отвечу с помощью DeepSeek AI.\n\nКоманды:\n/start — запустить бота\n/reset — очистить историю диалога\n/help — показать это сообщение'
  );
}
