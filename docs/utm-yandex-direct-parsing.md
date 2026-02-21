# Проверка логики парсинга UTM из ссылок Яндекс.Директа

**Проблема:** в таблице `users` перестали заполняться поля `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `yclid` для пользователей, пришедших по рекламным ссылкам (например с полным набором UTM и yclid в URL).

**Пример ссылки из Директа:**
```
https://photo2sticker.ru/?utm_source=yandex&utm_medium=cpc&utm_campaign=706852522&utm_content=17612446143.other.1&utm_term=...&yclid=14264778086066946047
```

**Пример пользователя из БД (ожидалось UTM, пришло web_foto):**
- `start_payload` = `web_foto`
- `utm_source` = `web_foto` (т.е. бот получил только payload без UTM-сегментов)

---

## 1. Редирект на главную (middleware)

**Файл:** `landing/middleware.ts`

При неизвестном пути (например переход из Директа на `/какой-то-урл`) выполняется редирект на главную **с сохранением query**:

```ts
const url = new URL(request.url);
url.pathname = "/";
return NextResponse.redirect(url);
```

`request.url` в Next.js middleware содержит полный URL включая query, поэтому после редиректа пользователь попадает на `/?utm_source=yandex&utm_medium=cpc&...`. **Query при редиректе не теряется.**

---

## 2. Формирование CTA-ссылки (подозрение)

**Файлы:** `landing/lib/utils.ts` (buildTelegramStartLink), `landing/components/landing/TelegramButton.tsx`

- В `buildTelegramStartLink(pageSlug)` при `typeof window === "undefined"` (SSR) возвращается ссылка **без UTM**: `start=web` или `start=web_${pageSlug}` (например `web_foto`).
- В `TelegramButton` ссылка считается так:
  ```ts
  const telegramUrl = useMemo(() => buildTelegramStartLink(pageSlug), [pageSlug]);
  ```
  Зависимость только от `pageSlug`. **Текущий `window.location.search` в зависимости не участвует.**

В результате:

1. При SSR в HTML попадает ссылка с `start=web` или `start=web_foto` (без UTM).
2. Если пользователь успевает нажать кнопку до гидратации или при первом кадре после гидратации, в Telegram уходит именно эта ссылка — бот получает только `web_foto`, парсит как один сегмент и пишет `utm_source=web_foto`, остальные UTM пустые.

**Вывод:** нужно, чтобы ссылка «Открыть в Telegram» всегда строилась на клиенте по **текущему** URL (в т.ч. после редиректа с UTM), а не по закешированному значению из SSR.

---

## 3. Рекомендуемое исправление (лендинг)

Сделать так, чтобы CTA-ссылка после монтирования компонента пересчитывалась по `window.location.search`:

**Вариант A (рекомендуется):** в `TelegramButton` считать ссылку в `useEffect` после монтирования и хранить в state, чтобы на клиенте всегда использовался актуальный URL:

```ts
"use client";
import { useState, useEffect } from "react";
import { buildTelegramStartLink } from "@/lib/utils";

export function TelegramButton({ pageSlug, ... }) {
  const [telegramUrl, setTelegramUrl] = useState(() =>
    typeof window !== "undefined" ? buildTelegramStartLink(pageSlug) : "https://t.me/Photo_2_StickerBot"
  );

  useEffect(() => {
    setTelegramUrl(buildTelegramStartLink(pageSlug));
  }, [pageSlug]);

  return (
    <a href={telegramUrl} ...>
```

Так после загрузки страницы (в т.ч. после редиректа на `/?utm_source=yandex&...`) ссылка будет содержать payload с UTM и yclid.

**Вариант B:** не рендерить `href` до первого клиентского рендера (например по флагу `const [mounted, setMounted] = useState(false)`, в `useEffect` выставить `true`), и тогда использовать `buildTelegramStartLink(pageSlug)` только когда `mounted === true`. Так мы избежим неверной ссылки в первом HTML, но возможен краткий момент без ссылки или с заглушкой.

---

## 4. Бот: парсинг payload

**Файл:** `src/index.ts`, функция `parseStartPayload()`.

- В `knownSources` есть `"yandex"` — payload вида `yandex_cpc_706852522_...` разбирается корректно.
- Последний сегмент, полностью числовой и длиной > 8, считается `yclid` — для `14264778086066946047` это выполняется.
- В лендинге в payload попадают только `A-Za-z0-9\-` (функция `clean()`), точки в `utm_content` убираются (например `17612446143.other.1` → `17612446143other1`). На стороне бота это допустимо.

Проверка парсинга на боте при текущем формате payload не выявила ошибок; проблема в том, что с лендинга приходит payload без UTM (`web_foto`), а не с UTM.

---

## 5. Чеклист

- [x] **Лендинг:** поправить `TelegramButton` — считать `telegramUrl` на клиенте после монта (useEffect + state), чтобы в CTA всегда использовался текущий `window.location.search` (UTM + yclid). **Сделано:** ссылка задаётся в `useEffect` после монтирования.
- [ ] **Проверка:** открыть лендинг с полным URL из Директа (с utm_* и yclid), убедиться, что кнопка ведёт на `t.me/...?start=yandex_cpc_..._yclid`, затем в боте выполнить `/start` по этой ссылке и проверить в БД запись в `users` (utm_source, utm_medium, utm_campaign, utm_content, yclid).
- [ ] При необходимости проверить другие точки входа (фиксированная шапка/подвал, другие страницы), что везде используется один и тот же компонент/логика построения ссылки с учётом текущего URL.
