import type { Message } from '../history';

export interface AIProvider {
  ask(history: Message[], systemPrompt: string, userText: string): Promise<string>;
}
