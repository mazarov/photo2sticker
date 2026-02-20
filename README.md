# Landing Photo2Sticker

SEO-лендинг для бота [@Photo_2_StickerBot](https://t.me/Photo_2_StickerBot): стикеры из фото для Telegram. Часть монорепозитория [photo2sticker-bot](../).

## Что это

- **Next.js 15** (App Router), статика + SSR.
- Главная `/`, кластерные страницы (`/bot`, `/telegram`, `/besplatno`, …), каталог стилей `/style`, страницы групп и подстилей `/style/[group]`, `/style/[group]/[substyle]`.
- Данные: конфиг в коде (`lib/seo/`) + Supabase (стили, пресеты, hero-пути, контент-паки).
- CTA ведёт в Telegram с передачей UTM и yclid в deep link для Директа и Метрики.

## Запуск

**Node.js 20+** (в корне проекта есть `.nvmrc`).

```bash
cd landing
npm install
npm run next:dev    # dev-сервер на http://localhost:3000
```

Продакшн:

```bash
npm run next:build
npm run next:start
```

**Docker (прод):** в контейнере собирается и запускается Next.js (standalone), не Vite. Контекст сборки — `landing/`, Dockerfile — `landing/Dockerfile`. После сборки в контейнере задать те же ENV, что в [.env.local.example](.env.local.example), иначе API/картинки/SEO будут пустыми.

## ENV

См. [.env.local.example](.env.local.example). Обязательно:

- `SUPABASE_SUPABASE_PUBLIC_URL` (или `SUPABASE_URL`) — URL Supabase.
- `SUPABASE_SERVICE_ROLE_KEY` (или `SUPABASE_ANON_KEY`) — ключ для API и Storage.
- `SUPABASE_STORAGE_BUCKET_EXAMPLES` — бакет с паками (например `stickers-examples`), пути вида `pack/style/{preset_id}/1.webp`, `pack/content/{content_set_id}/1.webp`.

Остальное — по необходимости (публичный URL лендинга для canonical и т.д.).

### Локально пустые Hero и блок с примерами

Если при `npm run next:dev` в Hero нет пилюль и картинок, а в блоке стилей — пусто, значит API не видит Supabase/Storage:

1. Убедись, что запускаешь **Next.js**: `npm run next:dev` (не `npm run dev` — это другой сервер).
2. Скопируй `.env.local.example` в `.env.local` и подставь реальные значения из того же Supabase-проекта, что и бот (URL, service role key, имя бакета).
3. Проверка: открой в браузере `http://localhost:3000/api/packs/content-sets`. Если в ответе `[]` — нет доступа к Supabase или в бакете нет папок `pack/content/*`. Картинки грузятся из Storage по сформированным URL.

## Структура

```
landing/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Главная
│   ├── style/              # Каталог и страницы стилей
│   ├── bot/, telegram/...   # Кластерные страницы
│   └── api/                # API: styles/groups, landing/hero-preset, packs/content-sets
├── components/landing/     # Hero, FAQ, блоки Pain/Hope, галереи, CTA
├── lib/                    # Supabase, утилиты, SEO-конфиг
│   ├── seo/                # cluster-pages.ts, style-groups.ts
│   ├── landing-hero-preset.ts
│   ├── landing-style-catalog-db.ts
│   └── utils.ts            # buildTelegramStartLink (UTM + yclid)
├── docs/                   # Документация лендинга (аналогично docs/ в корне)
│   ├── README.md           # Индекс
│   ├── architecture/       # Обзор, страницы, API и данные
│   ├── utm-tracking.md     # UTM и deep link
│   └── nvm-auto-load.md    # Настройка nvm
└── server/                 # Express (Vite/legacy, опционально)
```

## Документация

- **Внутри landing:** [docs/README.md](docs/README.md) — индекс, [docs/architecture/](docs/architecture/) — архитектура лендинга.
- **Общая по проекту:** в корне репозитория [docs/](../docs/), [docs/architecture/](../docs/architecture/) — бот, БД, деплой, оплата, Яндекс.Директ и Метрика.

## Связь с ботом

- CTA: `buildTelegramStartLink(pageSlug)` формирует `t.me/Photo_2_StickerBot?start=...` (без UTM — `web` или `web_{pageSlug}`, с UTM/yclid — payload из параметров URL).
- Бот парсит `start` в `parseStartPayload()`, сохраняет UTM и yclid в `users`, при оплате отправляет офлайн-конверсии в Метрику (см. [docs/13-02-yandex-direct-conversions.md](../docs/13-02-yandex-direct-conversions.md)).
