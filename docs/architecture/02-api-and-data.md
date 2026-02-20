# API и данные

## API-маршруты (Next.js)

| Метод | Путь | Назначение |
|-------|------|------------|
| GET | `/api/styles/groups` | Список групп стилей для блока «Выбери стиль» (главная, кластеры). Превью = `pack/style/{first_preset_id}/1.webp`. |
| GET | `/api/landing/hero-preset` | Query: `path`. Возвращает пресет и URL пака (pack/style/{id}/1..9) для пути из `style_presets_v2.landing_hero_paths`. |
| GET | `/api/packs/content-sets` | Пилюли для Hero (EmotionPackCarousel). **Источник списка:** Storage — перечисление подпапок в `pack/content/` (бакет stickers-examples). Одна подпапка = одна пилюля; `name_ru`/`labels`/`sort_order` подтягиваются из `pack_content_sets` по id при наличии. Файлы: `pack/content/{id}/1..9.webp`. |

Все маршруты используют Supabase из `lib/supabase.ts` (серверный клиент).

## Данные из Supabase

- **style_groups** — группы стилей (id, name_ru, emoji, sort_order, is_active). Используются для списка карточек стилей и каталога /style.
- **style_presets_v2** — пресеты стилей. Поля: id, group_id, landing, landing_hero_paths, sort_order. Для hero: пресет, у которого в `landing_hero_paths` входит путь страницы. Для превью групп берётся первый пресет группы с `landing = true`.
- **pack_content_sets** — метаданные контент-паков (name_ru, labels, sort_order). Список пилюль для Hero определяется по Storage (папки в `pack/content/`), метаданные подставляются из БД по id.

Storage (бакет `stickers-examples` или из env):

- `pack/style/{preset_id}/1.webp` … `9.webp` — пак стиля.
- `pack/content/{content_set_id}/1.webp` … — пак контента.

## Конфиг в коде (без БД)

- **lib/seo/cluster-pages.ts** — массив кластеров: slug, title, metaDescription, h1, heroSubtitle, pain/hope, faq, relatedLinks, ctaSlug, ctaButtonText, reviews, seoContent и т.д. Slug главной — `MAIN_PAGE_CLUSTER_SLUG` (`"main"`), не является URL.
- **lib/seo/style-groups.ts** — группы и подстили для /style/[group] и /style/[group]/[substyle]: slug, title, h1, substyles (slug, nameRu, presetId, emoji, image fallback), faq, reviews, pain/hope тексты.

## Hero-пресет по пути

`lib/landing-hero-preset.ts`: `getHeroPresetForPath(path)`.

1. Запрос к `style_presets_v2`: `landing_hero_paths` содержит `path`, is_active = true, сортировка по sort_order, limit 1.
2. По id пресета формируются URL: `pack/style/{preset_id}/1.webp` … `9.webp`.
3. Возвращается `{ presetId, image_urls }`. Используется в Hero на главной, кластерных страницах и страницах стилей; при наличии `image_urls` рендерится FixedPackCarousel вместо EmotionPackCarousel.

Миграция с путями и пресетами: в корне репо `sql/092_landing_hero_paths.sql`.

## Сборка образа (build args)

Страницы стилей и кластеров генерируются **статически (SSG)** при `next build`. В этот момент вызывается `getHeroPresetForPath()` — нужен доступ к Supabase (таблица `style_presets_v2`, URL бакета). Переменные окружения в **запущенном** контейнере при сборке недоступны, поэтому их передают как **Docker build args** при сборке образа.

В **Dockerfile** (стадия builder) объявлены ARG и ENV:

| ARG / ENV | Назначение |
|-----------|------------|
| `SUPABASE_ANON_KEY` | Ключ для доступа к API Supabase при сборке (чтение `style_presets_v2`). Anon key — публичный, допустим в build args. |
| `SUPABASE_SUPABASE_PUBLIC_URL` | URL Supabase (self-hosted или облако). Используется в `lib/supabase.ts` и для формирования URL картинок Storage. |
| `SUPABASE_STORAGE_BUCKET_EXAMPLES` | Имя бакета с примерами (например `stickers-examples`). Базовый путь: `pack/style/{preset_id}/1..9.webp`. |

**Где задавать значения:** в панели Dockhost (или другом CI) — раздел **Аргументы сборки** / **Build args**. Имена переменных должны совпадать с перечисленными выше. Значения (URL, ключ, имя бакета) в репозиторий не коммитятся.

Если при сборке эти аргументы не переданы, `getHeroPresetForPath` вернёт `null` → в Hero и в блоке «Пример» будут fallback (одна карточка или EmotionPackCarousel). Для проверки в Dockerfile добавлен шаг, который в логах сборки выводит `[landing build] SUPABASE_*: set` или `NOT SET` (без значений).

## Превью стилей (карточки)

- Везде один источник: первый стикер пака стиля — `pack/style/{preset_id}/1.webp`.
- **Главная и кластеры:** `/api/styles/groups` — по одной карточке на группу, превью = первый пресет группы с landing = true.
- **Каталог /style:** `getStyleGroupsForCatalog()` в `landing-style-catalog-db.ts` — то же правило.
- **Страница группы /style/[group]:** галерея подстилей из конфига, `image` = `packStylePreviewUrl(presetId)` из `landing-hero-preset.ts`.

## Связь с основной БД

Таблицы `style_groups`, `style_presets_v2`, контент-паки и Storage — общие с ботом. Описание схемы и миграций — в [../../docs/architecture/04-database.md](../../docs/architecture/04-database.md).
