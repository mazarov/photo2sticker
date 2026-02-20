# Страницы и маршруты

## Иерархия URL

| Уровень | Пример | Источник контента |
|---------|--------|-------------------|
| Главная | `/` | Кластер `main` (MAIN_PAGE_CLUSTER_SLUG), hero — photo_realistic |
| Кластеры | `/bot`, `/telegram`, `/besplatno`, `/s-nadpisyu`, `/iphone`, `/animirovannye`, `/android` | `cluster-pages.ts` по slug |
| Каталог стилей | `/style` | БД (getStyleGroupsForCatalog) + hero по пути |
| Группа стилей | `/style/anime`, `/style/memy`, … | `style-groups.ts` по slug группы |
| Подстиль | `/style/anime/chibi`, `/style/memy/pepe`, … | `style-groups.ts` (group + substyle) |

Редирект: `/stiker-iz-foto` → `/` (постоянный).

## Главная (/)

- **Компоненты:** Hero (h1/sub из UTM-вариантов или дефолт), PainBlock, HopeBlock, SocialProof, Reviews, HowItWorks, StyleGalleryFromApi, Features, PriceBlock, FAQ, RelatedLinks, фиксированная CTA-кнопка.
- **Контент:** `getClusterBySlug(MAIN_PAGE_CLUSTER_SLUG)` — pain/hope/faq/cta. Ссылки «Посмотрите также» — все кластеры кроме главной (`getAllClusterSlugs().filter(slug !== MAIN_PAGE_CLUSTER_SLUG)`).
- **Hero:** при наличии данных из `getHeroPresetForPath("/")` показывается FixedPackCarousel (pack/style/photo_realistic/1..9), иначе EmotionPackCarousel (контент-паки из API).

## Кластерные страницы

- Одна страница на slug: `app/bot/page.tsx`, `app/telegram/page.tsx`, …
- Контент: `getClusterBySlug(SLUG)` из `lib/seo/cluster-pages.ts`. Hero с `getHeroPresetForPath(\`/${SLUG}\`)` — тот же photo_realistic для всех кластерных путей из `landing_hero_paths`.
- RelatedLinks: `cluster.relatedLinks` (в т.ч. ссылка «Стикер из фото» с `href: "/"`).

## Стили

- **/style** — каталог групп стилей из БД (`getStyleGroupsForCatalog`), Hero по пути `/style`.
- **/style/[group]** — одна группа (например «Аниме»), подстили из `getStyleGroupBySlug(slug)`. Галерея подстилей и hero-пак: превью = первый стикер пака `pack/style/{preset_id}/1.webp`.
- **/style/[group]/[substyle]** — страница подстиля (например «Чиби»), hero и блок примеров из пака этого пресета.

Slug групп и подстилей заданы в `style-groups.ts`; маппинг group_id → slug для API — в `api/styles/groups/route.ts` и `landing-style-catalog-db.ts` (GROUP_ID_TO_SLUG).

## Sitemap

`app/sitemap.ts`: главная `/`, все кластеры (кроме slug главной), `/style/`, все группы и подстили. Приоритеты: главная 1, кластеры 0.9, каталог/стили ниже.

## Footer

Компонент `Footer`: ссылки «Главная» (/) и на все кластеры (из `getAllClusterSlugs()` без slug главной), плюс раздел «Стили» — ссылки на `/style` и группы стилей.
