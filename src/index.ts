import './config';
import { createBot } from './bot';

(async () => {
  const bot = createBot();

  await bot.api.setMyCommands([
    { name: 'start', description: 'Запустить бота' },
    { name: 'reset', description: 'Очистить историю диалога' },
    { name: 'help', description: 'Показать помощь' },
  ]);

  console.log('Запуск MAX-бота с интеграцией DeepSeek...');
  bot.start();
  console.log('Бот запущен (long polling).');
})();
