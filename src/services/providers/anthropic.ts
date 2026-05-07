import Anthropic from '@anthropic-ai/sdk';
import type { AIProvider } from './base';
import type { Message } from '../history';

export class AnthropicProvider implements AIProvider {
  private client: Anthropic;
  private model: string;

  constructor(apiKey: string, model: string) {
    this.client = new Anthropic({ apiKey });
    this.model = model;
  }

  async ask(history: Message[], systemPrompt: string, userText: string): Promise<string> {
    const messages: Anthropic.MessageParam[] = [
      ...history
        .filter(m => m.role !== 'system')
        .map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })),
      { role: 'user', content: userText },
    ];

    const response = await this.client.messages.create({
      model: this.model,
      max_tokens: 4096,
      system: systemPrompt,
      messages,
    });

    const block = response.content[0];
    return block?.type === 'text' ? block.text : '(нет ответа)';
  }
}
