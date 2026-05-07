import { config } from '../config';
import { getHistory, trimHistory } from './history';
import { createProvider, availableProviders } from './providers/registry';

const chatModels = new Map<string, string>();

export function getChatModel(chatId: string): string {
  return chatModels.get(chatId) ?? config.defaultModel;
}

export function setChatModel(chatId: string, modelString: string): void {
  createProvider(modelString); // validates format and API key availability
  chatModels.set(chatId, modelString);
}

export { availableProviders };

export async function ask(chatId: string, userText: string): Promise<string> {
  const modelString = getChatModel(chatId);
  const provider = createProvider(modelString);
  const history = getHistory(chatId);

  const reply = await provider.ask(history, config.systemPrompt, userText);

  history.push({ role: 'user', content: userText });
  history.push({ role: 'assistant', content: reply });
  trimHistory(history, config.maxHistory);

  return reply;
}
