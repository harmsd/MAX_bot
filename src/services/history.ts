export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

const histories = new Map<string, Message[]>();

export function getHistory(chatId: string): Message[] {
  if (!histories.has(chatId)) {
    histories.set(chatId, []);
  }
  return histories.get(chatId)!;
}

export function resetHistory(chatId: string): void {
  histories.delete(chatId);
}

export function trimHistory(history: Message[], maxMessages: number): void {
  // Remove in pairs (user + assistant) to preserve conversation structure
  while (history.length > maxMessages) {
    history.splice(0, 2);
  }
}
