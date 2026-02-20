# Документация лендинга Photo2Sticker

Документация подпроекта `landing/` организована по тому же принципу, что и в корне репозитория: общая архитектура в `architecture/`, отдельные темы — в корне `docs/`.

## Архитектура лендинга

| Файл | Содержание |
|------|------------|
| [architecture/00-overview.md](architecture/00-overview.md) | Обзор: стек, структура каталогов, потоки, связь с ботом |
| [architecture/01-pages-and-routes.md](architecture/01-pages-and-routes.md) | Страницы и маршруты: главная, кластеры, стили, группы, подстили |
| [architecture/02-api-and-data.md](architecture/02-api-and-data.md) | API-маршруты, данные из Supabase, hero-пресеты, галереи стилей |

## Отдельные темы

| Файл | Содержание |
|------|------------|
| [utm-tracking.md](utm-tracking.md) | UTM на лендинге, формат start-параметра, передача в бота |
| [nvm-auto-load.md](nvm-auto-load.md) | Настройка nvm для авто-переключения Node в каталоге |

## Документация основного проекта

Общая архитектура бота, БД, оплата, Яндекс.Директ и Метрика, деплой:

- [../../docs/README.md](../../docs/) — корневая папка с документами
- [../../docs/architecture/00-overview.md](../../docs/architecture/00-overview.md) — обзор сервиса Photo2Sticker
- [../../docs/13-02-yandex-direct-conversions.md](../../docs/13-02-yandex-direct-conversions.md) — UTM, yclid, офлайн-конверсии в Метрику

Спеки и планы по лендингу (SEO, контент, БД) лежат в `../../docs/` (например `seo-landing-pages-spec.md`, `landing-db-content-requirements.md`).
