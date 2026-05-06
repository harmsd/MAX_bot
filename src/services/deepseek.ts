import OpenAI from 'openai';
import { config } from '../config';
import { getHistory, trimHistory, type Message } from './history';

const client = new OpenAI({
  apiKey: config.deepseekApiKey,
  baseURL: 'https://api.deepseek.com',
});

export async function ask(chatId: string, userText: string): Promise<string> {
  const history = getHistory(chatId);

  const messages: Message[] = [
    { role: 'system', content: config.systemPrompt },
    ...history,
    { role: 'user', content: userText },
  ];

  const response = await client.chat.completions.create({
    model: config.deepseekModel,
    messages,
  });

  const reply = response.choices[0]?.message?.content ?? '(нет ответа)';

  history.push({ role: 'user', content: userText });
  history.push({ role: 'assistant', content: reply });
  trimHistory(history, config.maxHistory);

  return reply;
}
