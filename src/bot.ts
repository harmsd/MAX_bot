import { Bot } from '@maxhub/max-bot-api';
import { config } from './config';
import { handleStart, handleReset, handleHelp, handleModel, handleModels } from './handlers/commands';
import { handleMessage } from './handlers/messages';

export function createBot(): Bot {
  const bot = new Bot(config.maxBotToken);

  bot.command('start', handleStart);
  bot.command('reset', handleReset);
  bot.command('help', handleHelp);
  bot.command('model', handleModel);
  bot.command('models', handleModels);
  bot.on('message_created', handleMessage);

  bot.catch((err) => {
    console.error('Ошибка бота:', err);
  });

  return bot;
}
