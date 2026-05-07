# MAX Bot

Бот для мессенджера [MAX](https://max.ru) с поддержкой нескольких AI провайдеров: OpenAI, Anthropic, DeepSeek, Qwen. Модель переключается на уровне каждого чата прямо из интерфейса бота.

---

## Команды бота

| Команда | Описание |
|---|---|
| `/start` | Приветствие и краткая инструкция |
| `/model` | Показать текущую модель этого чата |
| `/model provider/name` | Сменить модель для этого чата |
| `/models` | Список провайдеров с настроенными API ключами |
| `/reset` | Очистить историю диалога |
| `/help` | Показать список команд |

### Примеры переключения модели

```
/model openai/gpt-4o
/model anthropic/claude-sonnet-4-5
/model deepseek/deepseek-chat
/model qwen/qwen-max
```

---

## Быстрый старт

### 1. Получить токены

- **MAX_BOT_TOKEN** — создайте бота через `@MasterBot` в мессенджере MAX
- Ключи AI провайдеров — достаточно одного для начала:

| Провайдер | Где получить |
|---|---|
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com) |
| OpenAI | [platform.openai.com](https://platform.openai.com) |
| Anthropic | [console.anthropic.com](https://console.anthropic.com) |
| Qwen | [dashscope.aliyuncs.com](https://dashscope.aliyuncs.com) |

### 2. Настроить окружение

```bash
cp .env.example .env
```

Минимальная конфигурация (пример с DeepSeek):

```env
MAX_BOT_TOKEN=your_max_bot_token_here
DEEPSEEK_API_KEY=your_deepseek_api_key_here
```

### 3. Установить зависимости и запустить

```bash
npm install
npm run dev
```

---

## Переменные окружения

### Обязательные

| Переменная | Описание |
|---|---|
| `MAX_BOT_TOKEN` | Токен бота MAX |

### AI провайдеры

| Переменная | Провайдер |
|---|---|
| `DEEPSEEK_API_KEY` | DeepSeek |
| `OPENAI_API_KEY` | OpenAI / ChatGPT |
| `ANTHROPIC_API_KEY` | Anthropic / Claude |
| `QWEN_API_KEY` | Alibaba Qwen |

### Настройки бота

| Переменная | По умолчанию | Описание |
|---|---|---|
| `DEFAULT_MODEL` | `deepseek/deepseek-chat` | Модель по умолчанию для новых чатов |
| `SYSTEM_PROMPT` | `You are a helpful assistant...` | Системный промпт для AI |
| `MAX_HISTORY` | `20` | Максимум сообщений в истории на чат |

---

## Запуск через Docker

```bash
# Собрать образ
docker build -t max-bot .

# Запустить
docker run -d \
  --name max-bot \
  --restart unless-stopped \
  --env-file .env \
  max-bot
```

---

## Структура проекта

```
src/
  config.ts                    # Валидация env, единый объект конфига
  bot.ts                       # Инициализация бота и регистрация хендлеров
  index.ts                     # Точка входа
  handlers/
    commands.ts                # /start, /reset, /help, /model, /models
    messages.ts                # Обработчик входящих сообщений
  services/
    history.ts                 # Хранилище истории диалогов per-chat
    ai.ts                      # ask() + хранение выбранной модели per-chat
    providers/
      base.ts                  # Интерфейс AIProvider
      openai-compatible.ts     # OpenAI / DeepSeek / Qwen (один клиент)
      anthropic.ts             # Anthropic / Claude (отдельный SDK)
      registry.ts              # Фабрика: "provider/model" → AIProvider
```

---

## Скрипты

| Команда | Описание |
|---|---|
| `npm run dev` | Запуск в режиме разработки (ts-node) |
| `npm run build` | Компиляция TypeScript → dist/ |
| `npm start` | Запуск скомпилированного бота |
| `npm run watch` | Компиляция с отслеживанием изменений |
---
