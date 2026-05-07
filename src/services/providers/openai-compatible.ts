import OpenAI from 'openai';
import type { AIProvider } from './base';
import type { Message } from '../history';

export class OpenAICompatibleProvider implements AIProvider {
  private client: OpenAI;
  private model: string;

  constructor(apiKey: string, baseURL: string, model: string) {
    this.client = new OpenAI({ apiKey, baseURL });
    this.model = model;
  }

  async ask(history: Message[], systemPrompt: string, userText: string): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...history
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: userText },
    ];

    const response = await this.client.chat.completions.create({ model: this.model, messages });
    return response.choices[0]?.message?.content ?? '(нет ответа)';
  }
}
