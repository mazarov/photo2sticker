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

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (или аналог) — для API и hero-пресетов.
- `SUPABASE_STORAGE_BUCKET_EXAMPLES` — бакет с паками (например `stickers-examples`), пути вида `pack/style/{preset_id}/1.webp`, `pack/content/{content_set_id}/1.webp`.

Остальное — по необходимости (публичный URL лендинга для canonical и т.д.).

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
