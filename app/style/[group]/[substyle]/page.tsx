import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getSubstyle,
  getAllSubstyleParams,
  type StyleGroup,
  type SubstyleItem,
} from "@/lib/seo/style-groups";
import { StyleHero } from "@/components/landing/StyleHero";
import { StyleGallery } from "@/components/landing/StyleGallery";
import { PackExampleGrid } from "@/components/landing/PackExampleGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { PainBlock } from "@/components/landing/PainBlock";
import { HopeBlock } from "@/components/landing/HopeBlock";
import { FAQ } from "@/components/landing/FAQ";
import { RelatedLinks } from "@/components/landing/RelatedLinks";
import { Reviews } from "@/components/landing/Reviews";
import { FixedCTA } from "@/components/landing/FixedCTA";
import { FaqSchema } from "@/components/landing/FaqSchema";
import { BreadcrumbSchema } from "@/components/landing/BreadcrumbSchema";
import { withSocialMeta } from "@/lib/seo/metadata";
import { getPackImageUrlsForPresetId } from "@/lib/landing-hero-preset";

const BASE = "https://photo2sticker.ru";

type Props = { params: Promise<{ group: string; substyle: string }> };

export async function generateStaticParams() {
  return getAllSubstyleParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { group: groupSlug, substyle: substyleSlug } = await params;
  const data = getSubstyle(groupSlug, substyleSlug);
  if (!data) return { title: "Не найдено" };
  const { substyle } = data;
  const title = `${substyle.nameRu} стикеры из фото | Photo2Sticker`;
  const description = `Создайте ${substyle.nameRu.toLowerCase()} стикеры из фото за 30 секунд. ИИ сохраняет черты лица. Первый пак бесплатно.`;
  return withSocialMeta({
    title,
    description,
    url: `${BASE}/style/${groupSlug}/${substyleSlug}`,
  });
}

function SubstylePageContent({
  group,
  substyle,
  groupSlug,
  substyleSlug,
  heroPackUrls,
  examplePackUrls,
}: {
  group: StyleGroup;
  substyle: SubstyleItem;
  groupSlug: string;
  substyleSlug: string;
  /** Для Hero-карусели (может быть fallback из getHeroPresetForPath). */
  heroPackUrls?: string[];
  /** Для блока «Примеры» — всегда 9 URL пака этого стиля (pack/style/{presetId}/1..9). 404 → заглушка в ячейке. */
  examplePackUrls: string[];
}) {
  const ctaSlug = substyle.presetId;
  const neighbourSubstyles = group.substyles.filter((s) => s.slug !== substyleSlug).slice(0, 3);
  const relatedLinks = [
    { href: `/style/${groupSlug}`, label: `Все ${group.h1.toLowerCase()}` },
    ...neighbourSubstyles.map((s) => ({
      href: `/style/${groupSlug}/${s.slug}`,
      label: s.nameRu,
    })),
  ];

  const faq = [
    {
      q: `Как сделать ${substyle.nameRu.toLowerCase()} стикер из фото?`,
      a: `Откройте бота @Photo_2_StickerBot в Telegram, выберите стиль «${group.h1}» и подстиль «${substyle.nameRu}». Отправьте фото — пак будет готов за 30 секунд.`,
    },
    {
      q: "Сохраняются ли черты лица?",
      a: "Да. ИИ сохраняет цвет глаз, родинки, причёску — в паке узнаваемо вы в выбранной стилистике.",
    },
  ];

  const breadcrumbItems = [
    { name: "Главная", url: `${BASE}/` },
    { name: "Стили", url: `${BASE}/style/` },
    { name: group.h1, url: `${BASE}/style/${groupSlug}` },
    { name: substyle.nameRu, url: `${BASE}/style/${groupSlug}/${substyleSlug}` },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden relative">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, hsl(var(--primary) / 0.15) 0%, transparent 50%)`,
          backgroundSize: "400px 400px",
          backgroundRepeat: "repeat",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />

      <main className="relative z-10 pb-28">
        <BreadcrumbSchema items={breadcrumbItems} />
        <div className="max-w-4xl mx-auto px-4 md:px-8 pt-6 pb-2">
          <Link
            href={`/style/${groupSlug}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            ← Все {group.h1.toLowerCase()}
          </Link>
        </div>

        <StyleHero
          h1={`${substyle.nameRu} стикеры из фото`}
          subtitle={`ИИ превратит фото в стикер в стиле «${substyle.nameRu}». Первый пак бесплатно.`}
          stickerItems={[{ src: substyle.image, label: substyle.nameRu }]}
          heroPackUrls={heroPackUrls}
        />

        <PainBlock title={group.painTitle} text={group.painText} />
        <HopeBlock
          title={`${substyle.nameRu} стикеры из фото — реально`}
          text={group.hopeText}
          points={group.hopePoints}
        />

        {examplePackUrls.length >= 16 ? (
          <PackExampleGrid
            sectionTitle={`Пример: ${substyle.nameRu}`}
            sectionSubtitle="16 стикеров в этом стиле из примера пака. ИИ сохраняет черты лица."
            footerText="Первый пак бесплатно."
            imageUrls={examplePackUrls}
          />
        ) : (
          <StyleGallery
            sectionTitle={`Пример: ${substyle.nameRu}`}
            sectionSubtitle="ИИ сохраняет черты лица и применяет этот подстиль."
            footerText="Первый пак бесплатно."
            items={[{ name: substyle.nameRu, emoji: substyle.emoji, image: substyle.image }]}
          />
        )}

        <HowItWorks
          sectionTitle="3 шага — стикеры у тебя"
          steps={[
            { title: "Пришли фото", description: "С телефона или галереи в Telegram." },
            { title: "Выбери этот стиль", description: `«${group.h1}» → «${substyle.nameRu}». ИИ сохраняет черты лица.` },
            { title: "Получи пак", description: "9 стикеров сразу в твоём стикерпаке." },
          ]}
        />

        <Reviews reviews={group.reviews} />

        <FaqSchema questions={faq} />
        <FAQ questions={faq} />
        <RelatedLinks links={relatedLinks} />
      </main>

      <FixedCTA
        pageSlug={ctaSlug}
        text={`Создать ${substyle.nameRu.toLowerCase()} стикер`}
      />
    </div>
  );
}

export default async function SubstylePage({ params }: Props) {
  const { group: groupSlug, substyle: substyleSlug } = await params;
  const data = getSubstyle(groupSlug, substyleSlug);
  if (!data) notFound();
  const examplePackUrls = getPackImageUrlsForPresetId(data.substyle.presetId);
  // Hero и блок «Примеры» — только пак этого стиля (pack/style/{presetId}/1..9). Нет в storage → заглушка.
  return (
    <SubstylePageContent
      group={data.group}
      substyle={data.substyle}
      groupSlug={groupSlug}
      substyleSlug={substyleSlug}
      heroPackUrls={examplePackUrls}
      examplePackUrls={examplePackUrls}
    />
  );
}
