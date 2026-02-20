"use client";

import { useMemo } from "react";
import { EmotionPackCarousel } from "@/components/landing/EmotionPackCarousel";
import { FixedPackCarousel } from "@/components/landing/FixedPackCarousel";

const UTM_VARIANTS: {
  match: string[];
  h1: string;
  sub: string;
}[] = [
  {
    match: ["free", "online"],
    h1: "Бесплатный пак стикеров из фото — за 30 секунд",
    sub: "Без регистрации, без оплаты. Узнаваемое сходство — черты сохраняются. Просто пришли фото боту.",
  },
  {
    match: ["bot"],
    h1: "Telegram бот: фото → пак стикеров за 30 секунд",
    sub: "Выбери стиль и эмоции. ИИ сохранит твои черты. От 45₽ за пак из 9 стикеров.",
  },
  {
    match: ["ai", "neural"],
    h1: "ИИ превращает фото в пак стикеров",
    sub: "Сохраняем твои черты — цвет глаз, родинки. Выбери стиль и эмоции. Готовый пак за 30 сек.",
  },
  {
    match: ["telegram", "tg"],
    h1: "Пак стикеров для Telegram из твоих фото",
    sub: "Пришли фото — получи пак с разными эмоциями. Узнаваемо ты. За 30 сек. От 45₽ за пак из 9 стикеров.",
  },
];

const DEFAULT_H1 = "Поможем сделать стикеры из фото для Telegram";
const DEFAULT_SUB =
  "ИИ превращает фото в стикеры за 30 секунд. Сохраняем цвет глаз, родинки, причёску — в паке узнаваемо ты. От 45₽ за пак из 9 стикеров.";

function getHeadlines(defaultH1: string, defaultSub: string): { h1: string; sub: string } {
  if (typeof window === "undefined") return { h1: defaultH1, sub: defaultSub };
  const params = new URLSearchParams(window.location.search);
  const campaign = (params.get("utm_campaign") || "").toLowerCase();

  if (campaign) {
    for (const v of UTM_VARIANTS) {
      if (v.match.some((k) => campaign.includes(k))) {
        return { h1: v.h1, sub: v.sub };
      }
    }
  }

  return { h1: defaultH1, sub: defaultSub };
}

type HeroProps = {
  /** H1 и подзаголовок из SEO-конфига (cluster). При наличии utm_campaign — UTM-варианты имеют приоритет. */
  h1?: string;
  subtitle?: string;
  /** Пак стиля для Hero (pack/style/{preset_id}/1..9). Если задан — показываем его вместо контент-паков. */
  heroPackUrls?: string[] | null;
};

export function Hero({ h1: h1FromProps, subtitle: subFromProps, heroPackUrls }: HeroProps = {}) {
  const defaultH1 = h1FromProps ?? DEFAULT_H1;
  const defaultSub = subFromProps ?? DEFAULT_SUB;
  const { h1, sub } = useMemo(() => getHeadlines(defaultH1, defaultSub), [defaultH1, defaultSub]);
  const showFixedPack = Array.isArray(heroPackUrls) && heroPackUrls.length > 0;

  return (
    <section className="px-4 md:px-8 pt-16 md:pt-24 pb-8 md:pb-14">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-xl sm:text-3xl md:text-5xl font-display font-bold text-white mb-2 sm:mb-4 leading-tight">
            {h1}
          </h1>
          <h2 className="text-xs sm:text-base md:text-lg text-muted-foreground px-2 max-w-2xl mx-auto">
            {sub}
          </h2>
        </div>

        {showFixedPack ? <FixedPackCarousel imageUrls={heroPackUrls} /> : <EmotionPackCarousel />}
      </div>
    </section>
  );
}
