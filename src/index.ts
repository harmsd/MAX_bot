import './config';
import { createBot } from './bot';

(async () => {
  const bot = createBot();

  await bot.api.setMyCommands([
    { name: 'start',  description: 'Запустить бота' },
    { name: 'reset',  description: 'Очистить историю диалога' },
    { name: 'model',  description: 'Показать или сменить модель AI' },
    { name: 'models', description: 'Список доступных провайдеров' },
    { name: 'help',   description: 'Показать помощь' },
  ]);

  console.log('Запуск MAX-бота...');
  bot.start();
  console.log('Бот запущен (long polling).');
})();
