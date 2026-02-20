/**
 * Конфиг стилевых групп для SEO-страниц /style/[group].
 * По спеке §5.2, маппинг §3.2.
 */
export type SubstyleItem = {
  slug: string;
  nameRu: string;
  presetId: string;
  emoji: string;
  image: string;
};

export type StyleGroupReview = { text: string; name: string; meta: string };

export type StyleGroup = {
  slug: string;
  title: string;
  metaDescription: string;
  h1: string;
  heroSubtitle: string;
  substyles: SubstyleItem[];
  relatedStyles: string[];
  relatedClusterLinks: { href: string; label: string }[];
  ctaSlug: string;
  ctaButtonText: string;
  howItWorksTitle: string;
  howItWorksSteps: { title: string; description: string }[];
  seoTitle: string;
  seoContent: string;
  faq: { q: string; a: string }[];
  /** Уникальные отзывы для страницы этой группы стилей. */
  reviews: StyleGroupReview[];
  /** Pain / Hope — уникальный текст под «Знакомо?» и «Свой пак — реально». */
  painTitle: string;
  painText: string;
  hopeTitle: string;
  hopeText: string;
  hopePoints: string[];
};

const defaultHowItWorksSteps = [
  { title: "Пришли фото", description: "С телефона или галереи в Telegram." },
  { title: "Выбери стиль", description: "ИИ сохраняет черты лица и применяет выбранный стиль." },
  { title: "Получи пак", description: "9 стикеров сразу в твоём стикерпаке." },
];

const fallbackImage = "/images/examples/sticker-klassicheskiy.webp";

export const STYLE_GROUPS: StyleGroup[] = [
  {
    slug: "anime",
    title: "Аниме стикеры из фото — 5 стилей | Photo2Sticker",
    metaDescription: "Создайте аниме стикеры из фото за 30 секунд. Классика, тёмный, сёнен, романтика, чиби. ИИ сохраняет черты лица. Первый пак бесплатно.",
    h1: "Аниме стикеры из фото",
    heroSubtitle: "ИИ превратит фото в аниме стикер для Telegram. 5 подстилей на выбор. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется аниме стикеры из своего фото — в стиле чиби, сёнен или романтика. Но непонятно, как сделать без художника. Искать туториалы долго, заказ у иллюстратора дорого. В итоге аниме стикерпак так и остаётся мечтой.",
    hopeTitle: "Аниме стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker делает аниме стикеры из фото за 30 секунд: отправь фото, выбери подстиль (классика, чиби, сёнен, романтика, тёмный) — получи пак из 9 стикеров. ИИ сохраняет черты лица. Первый пак бесплатно.",
    hopePoints: ["Без рисования", "Пак за 30 секунд", "Первый пак бесплатно", "Всё в Telegram"],
    substyles: [
      { slug: "classic", nameRu: "Классический", presetId: "anime_classic", emoji: "🎌", image: fallbackImage },
      { slug: "dark", nameRu: "Тёмный", presetId: "anime_dark", emoji: "🌙", image: fallbackImage },
      { slug: "shonen", nameRu: "Сёнен", presetId: "anime_shonen", emoji: "⚔️", image: fallbackImage },
      { slug: "romance", nameRu: "Романтик", presetId: "anime_romance", emoji: "💗", image: "/images/examples/sticker-romantik.webp" },
      { slug: "chibi", nameRu: "Чиби", presetId: "anime_chibi", emoji: "🍡", image: "/images/examples/sticker-chibi.webp" },
    ],
    relatedStyles: ["memy", "milye", "manhwa"],
    relatedClusterLinks: [{ href: "/", label: "Стикер из фото" }, { href: "/bot", label: "Бот для стикеров" }],
    ctaSlug: "anime",
    ctaButtonText: "Создать аниме стикер",
    howItWorksTitle: "3 шага — аниме стикеры у тебя",
    howItWorksSteps: [
      defaultHowItWorksSteps[0],
      { title: "Выбери аниме стиль", description: "Классика, чиби, сёнен, романтика или тёмный. ИИ сохраняет черты лица." },
      defaultHowItWorksSteps[2],
    ],
    seoTitle: "Аниме стикеры из фото",
    seoContent: `<p>Аниме стикеры из фото — это стикеры в стиле аниме и манги: крупные глаза, выразительные эмоции, узнаваемый стиль. Бот Photo2Sticker создаёт такие стикеры за 30 секунд: отправьте фото, выберите подстиль (классический, тёмный, сёнен, романтика, чиби) — получите пак из 9 стикеров. ИИ сохраняет черты лица.</p><p>Первый пак бесплатно. Подойдёт для личного стикерпака в Telegram в чатах с друзьями.</p>`,
    faq: [
      { q: "Как сделать аниме стикер из фото?", a: "Откройте бота @Photo_2_StickerBot в Telegram, отправьте фото и выберите стиль «Аниме» и подстиль (чиби, классика и др.). Через 30 секунд пак будет готов." },
      { q: "Можно ли сделать чиби стикер?", a: "Да. В разделе аниме есть подстиль «Чиби» — круглое лицо, большие глаза. ИИ сохраняет узнаваемость." },
      { q: "Сохраняются ли черты лица в аниме стиле?", a: "Да. ИИ сохраняет цвет глаз, родинки, причёску — в паке узнаваемо вы, но в аниме-стилистике." },
    ],
    reviews: [
      { text: "Сделала аниме стикеры в стиле чиби — друзья в чате думали, что заказывала у художника. А это бот за полминуты!", name: "Лиза", meta: "2 пака" },
      { text: "Выбрала сёнен и романтик — оба подстиля зашли. В паке узнаваемо я, но в аниме. Супер.", name: "Алина", meta: "1 пак" },
      { text: "Аниме стикеры из фото — мечта с детства. Классика и тёмный попробовал, оба огонь. Рекомендую.", name: "Кирилл", meta: "2 пака" },
    ],
  },
  {
    slug: "memy",
    title: "Стикеры мемы из фото — создать онлайн | Photo2Sticker",
    metaDescription: "Мемные стикеры из фото за 30 секунд. Классика, Пепе, современные, реакция. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Мемные стикеры из фото",
    heroSubtitle: "ИИ превратит фото в мемный стикер для Telegram. 4 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется мемные стикеры из своего фото — в стиле Пепе, реакция или современный мем. Но как сделать без дизайнера? Вручную в редакторе долго, готовые шаблоны не с твоим лицом. Мемный стикерпак откладывается.",
    hopeTitle: "Мемные стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker создаёт мемные стикеры из фото за 30 секунд: пришли фото, выбери подстиль (классика, Пепе, современный, реакция) — получи пак стикеров для чата. ИИ сохраняет черты. Первый пак бесплатно.",
    hopePoints: ["Без дизайнера", "Пак за 30 секунд", "Первый пак бесплатно", "Узнаваемо ты"],
    substyles: [
      { slug: "classic", nameRu: "Классика", presetId: "meme_classic", emoji: "😏", image: fallbackImage },
      { slug: "pepe", nameRu: "Пепе", presetId: "meme_pepe", emoji: "🐸", image: fallbackImage },
      { slug: "modern", nameRu: "Современный", presetId: "meme_modern", emoji: "🔥", image: fallbackImage },
      { slug: "reaction", nameRu: "Реакция", presetId: "meme_reaction", emoji: "😂", image: fallbackImage },
    ],
    relatedStyles: ["anime", "milye", "lyubov"],
    relatedClusterLinks: [{ href: "/bot", label: "Бот для стикеров" }, { href: "/s-nadpisyu", label: "Стикеры с надписями" }],
    ctaSlug: "memy",
    ctaButtonText: "Создать мемный стикер",
    howItWorksTitle: "3 шага — мемные стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Мемные стикеры из фото",
    seoContent: `<p>Мемные стикеры из фото — это стикеры в стиле интернет-мемов: выразительные лица, ирония, узнаваемый юмор. Бот Photo2Sticker создаёт такие стикеры из вашего фото за 30 секунд. Выберите подстиль (классика, Пепе, современный, реакция) — получите пак стикеров для Telegram. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать мемный стикер из фото?", a: "Откройте бота @Photo_2_StickerBot, отправьте фото, выберите стиль «Мемы» и подстиль. Пак будет готов за 30 секунд." },
      { q: "Есть ли стикеры в стиле Пепе?", a: "Да. В группе «Мемы» есть подстиль «Пепе» — стикеры в этой стилистике." },
    ],
    reviews: [
      { text: "Мемные стикеры с собой — для чата одногруппников самое то. Реакция и современный — оба зашли на ура.", name: "Вова", meta: "1 пак" },
      { text: "Пепе стиль попробовал — получилось смешно и узнаваемо. Теперь шлю в общий чат, все ржут.", name: "Стас", meta: "2 пака" },
      { text: "Делала мемные стикеры для подруги — с надписью и в стиле классика. Она в восторге.", name: "Наташа", meta: "1 пак" },
    ],
  },
  {
    slug: "milye",
    title: "Милые стикеры из фото — каваий, котики | Photo2Sticker",
    metaDescription: "Милые стикеры из фото за 30 секунд. Каваий, котики, зверушки, плюш. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Милые стикеры из фото",
    heroSubtitle: "ИИ превратит фото в милый стикер: каваий, котик, зверушка или плюш. 4 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется милые стикеры из фото — каваий, котик или плюш. Но непонятно, как сделать без художника. Готовые стикеры не с твоим лицом, заказ милых стикеров дорог. Свой милый стикерпак так и не появляется.",
    hopeTitle: "Милые стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker делает милые стикеры из фото за 30 секунд: каваий, котик, зверушка, плюш. Отправь фото, выбери подстиль — пак стикеров в Telegram. ИИ сохраняет черты. Первый пак бесплатно.",
    hopePoints: ["Без рисования", "Пак за 30 секунд", "Первый пак бесплатно", "Каваий и котики"],
    substyles: [
      { slug: "kawaii", nameRu: "Каваий", presetId: "cute_kawaii", emoji: "✨", image: "/images/examples/sticker-kavaii.webp" },
      { slug: "cat", nameRu: "Котик", presetId: "cute_cat", emoji: "🐱", image: "/images/examples/sticker-kotik.webp" },
      { slug: "animal", nameRu: "Зверушка", presetId: "cute_animal", emoji: "🐻", image: fallbackImage },
      { slug: "plush", nameRu: "Плюш", presetId: "cute_plush", emoji: "🧸", image: fallbackImage },
    ],
    relatedStyles: ["anime", "memy", "lyubov"],
    relatedClusterLinks: [{ href: "/", label: "Стикер из фото" }, { href: "/besplatno", label: "Бесплатные стикеры" }],
    ctaSlug: "milye",
    ctaButtonText: "Создать милый стикер",
    howItWorksTitle: "3 шага — милые стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Милые стикеры из фото",
    seoContent: `<p>Милые стикеры из фото — каваий, котики, зверушки, плюш. Бот Photo2Sticker создаёт их за 30 секунд. Выберите подстиль, отправьте фото — получите пак стикеров для Telegram. ИИ сохраняет черты лица. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать милый стикер из фото?", a: "Откройте @Photo_2_StickerBot, отправьте фото, выберите стиль «Милые» и подстиль (каваий, котик и др.)." },
      { q: "Есть ли стикеры в стиле котика?", a: "Да. В группе «Милые» есть подстиль «Котик» — вы превращаетесь в милого котика." },
    ],
    reviews: [
      { text: "Каваий и котик — два подстиля сделала. Оба милые, в чате с подругами все спрашивают, где таких делают.", name: "Полина", meta: "2 пака" },
      { text: "Плюш и зверушка попробовал — получилось как из мультика, но лицо моё. Дочка в восторге.", name: "Антон", meta: "1 пак" },
      { text: "Милые стикеры из фото — именно то, что искала для стикерпака. Каваий самый любимый.", name: "Маша", meta: "3 пака" },
    ],
  },
  {
    slug: "3d",
    title: "3D стикеры из фото — объёмный стиль | Photo2Sticker",
    metaDescription: "3D стикеры из фото за 30 секунд. Объёмный и Дисней стиль. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "3D стикеры из фото",
    heroSubtitle: "ИИ превратит фото в объёмный 3D стикер или в стиле Дисней. 2 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется 3D стикеры из своего фото — объёмные или в стиле Дисней. Но 3D и анимация кажутся сложными: нужны программы, навыки. Заказ 3D стикеров у дизайнера дорог. В итоге 3D стикерпак не по карману.",
    hopeTitle: "3D стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker создаёт 3D стикеры из фото за 30 секунд: объёмный стиль и Дисней. Отправь фото, выбери подстиль — получи пак для Telegram. ИИ сохраняет черты. Первый пак бесплатно.",
    hopePoints: ["Без 3D-программ", "Пак за 30 секунд", "Первый пак бесплатно", "Объём и Дисней"],
    substyles: [
      { slug: "3d", nameRu: "Объёмный 3D", presetId: "cartoon_3d", emoji: "🎮", image: fallbackImage },
      { slug: "disney", nameRu: "Дисней", presetId: "tv_disney", emoji: "✨", image: fallbackImage },
    ],
    relatedStyles: ["multfilm", "serialy", "anime"],
    relatedClusterLinks: [{ href: "/bot", label: "Бот для стикеров" }],
    ctaSlug: "3d",
    ctaButtonText: "Создать 3D стикер",
    howItWorksTitle: "3 шага — 3D стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "3D стикеры из фото",
    seoContent: `<p>3D стикеры из фото — объёмный стиль и стиль Дисней. Бот Photo2Sticker создаёт такие стикеры за 30 секунд. Отправьте фото, выберите подстиль — получите пак для Telegram. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать 3D стикер из фото?", a: "Откройте бота @Photo_2_StickerBot, выберите стиль «3D» и подстиль (объёмный или Дисней). Отправьте фото — пак готов за 30 секунд." },
    ],
    reviews: [
      { text: "3D стикер объёмный — как из игры. Выглядит круто, в чате выделяется на фоне плоских.", name: "Денис", meta: "1 пак" },
      { text: "Дисней подстиль попробовала — получилось как персонаж мультика. Дети просили ещё паков.", name: "Оксана", meta: "2 пака" },
      { text: "Сделал и 3D, и Дисней — оба стиля за 30 секунд. Качество норм, лицо узнаваемое.", name: "Илья", meta: "1 пак" },
    ],
  },
  {
    slug: "lyubov",
    title: "Романтические стикеры из фото для пар | Photo2Sticker",
    metaDescription: "Стикеры про любовь из фото за 30 секунд. Мягкий, парные, сердечки, страсть. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Стикеры про любовь из фото",
    heroSubtitle: "ИИ превратит фото в романтический стикер. 4 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется романтические стикеры из фото — парные, с сердечками, для подарка. Но как сделать стикеры про любовь без дизайнера? Готовые шаблоны без твоего лица, заказ дорог. Стикерпак для пары откладывается.",
    hopeTitle: "Стикеры про любовь из фото — реально",
    hopeText: "Бот Photo2Sticker делает стикеры про любовь из фото за 30 секунд: мягкий, парный, сердечки, страсть. Отправь фото, выбери подстиль — пак романтических стикеров в Telegram. Первый пак бесплатно.",
    hopePoints: ["Без дизайнера", "Пак за 30 секунд", "Первый пак бесплатно", "Парные и сердечки"],
    substyles: [
      { slug: "soft", nameRu: "Мягкий", presetId: "love_soft", emoji: "💕", image: fallbackImage },
      { slug: "couple", nameRu: "Парный", presetId: "love_couple", emoji: "💑", image: fallbackImage },
      { slug: "heart", nameRu: "Сердечки", presetId: "love_heart", emoji: "❤️", image: fallbackImage },
      { slug: "passion", nameRu: "Страсть", presetId: "love_passion", emoji: "🔥", image: fallbackImage },
    ],
    relatedStyles: ["anime", "milye", "russkiy"],
    relatedClusterLinks: [{ href: "/", label: "Стикер из фото" }],
    ctaSlug: "lyubov",
    ctaButtonText: "Создать стикер про любовь",
    howItWorksTitle: "3 шага — стикеры про любовь",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Стикеры про любовь из фото",
    seoContent: `<p>Стикеры про любовь из фото — романтика, парные стикеры, сердечки. Бот Photo2Sticker создаёт их за 30 секунд. Выберите подстиль и отправьте фото — пак стикеров в Telegram. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать парные стикеры из фото?", a: "Выберите стиль «Любовь» и подстиль «Парный». Отправьте фото — бот создаст стикеры в романтической стилистике." },
    ],
    reviews: [
      { text: "Парные стикеры с парнем на годовщину — лучший подарок. Мягкий и сердечки оба зашли.", name: "Юля", meta: "1 пак" },
      { text: "Стикеры про любовь — страсть и сердечки. Подарила ему пак, он теперь в чате со мной шлёт только их.", name: "Карина", meta: "2 пака" },
      { text: "Романтические стикеры из фото — сделали с девушкой парный набор. Узнаваемо оба, стиль приятный.", name: "Макс", meta: "1 пак" },
    ],
  },
  {
    slug: "kotiki",
    title: "Стикеры котики из фото — кот-стикер | Photo2Sticker",
    metaDescription: "Стикеры котики из фото за 30 секунд. Превратись в котика. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Стикеры котики из фото",
    heroSubtitle: "ИИ превратит фото в стикер-котика. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется стикер-котика из своего фото — милый, узнаваемый. Но как превратить себя в котика без художника? Готовые котик-стикеры не с твоим лицом. Свой стикерпак котиков так и не делается.",
    hopeTitle: "Стикеры котики из фото — реально",
    hopeText: "Бот Photo2Sticker превращает фото в стикер-котика за 30 секунд. Отправь фото — получи пак милых котик-стикеров для Telegram. ИИ сохраняет черты. Первый пак бесплатно.",
    hopePoints: ["Без рисования", "Пак за 30 секунд", "Первый пак бесплатно", "Узнаваемо ты в образе котика"],
    substyles: [
      { slug: "cat", nameRu: "Котик", presetId: "cute_cat", emoji: "🐱", image: "/images/examples/sticker-kotik.webp" },
    ],
    relatedStyles: ["milye", "memy", "anime"],
    relatedClusterLinks: [{ href: "/", label: "Стикер из фото" }],
    ctaSlug: "kotiki",
    ctaButtonText: "Превратиться в котика",
    howItWorksTitle: "3 шага — стикеры котики",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Стикеры котики из фото",
    seoContent: `<p>Стикеры котики из фото — превратите себя в милого котика. Бот Photo2Sticker создаёт такие стикеры за 30 секунд. Один клик — пак в Telegram. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать стикер котика из фото?", a: "Откройте @Photo_2_StickerBot, выберите стиль «Котики», отправьте фото. Пак стикеров-котиков будет готов за 30 секунд." },
    ],
    reviews: [
      { text: "Превратилась в котика — мило до слёз. В чате кошатников все оценили, уже несколько человек попросили ссылку.", name: "Соня", meta: "1 пак" },
      { text: "Стикеры котики из фото — дочка просила «как кот». Сделала за полминуты, она счастлива.", name: "Таня", meta: "1 пак" },
      { text: "Котик-стикер с моим лицом — теперь шлю в семейный чат вместо обычных эмодзи. Все умиляются.", name: "Галя", meta: "2 пака" },
    ],
  },
  {
    slug: "multfilm",
    title: "Мультяшные стикеры из фото | Photo2Sticker",
    metaDescription: "Мультяшные стикеры из фото за 30 секунд. Американский, ретро, современный, Телеграм. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Мультяшные стикеры из фото",
    heroSubtitle: "ИИ превратит фото в мультяшный стикер. 4 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется мультяшные стикеры из своего фото — американский стиль, ретро или как в Telegram. Но как сделать без дизайнера? Рисовать самому долго, заказ мультяшных стикеров дорог. Стикерпак в мультяшном стиле откладывается.",
    hopeTitle: "Мультяшные стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker создаёт мультяшные стикеры из фото за 30 секунд: американский, ретро, современный, в стиле Telegram. Выбери подстиль, отправь фото — пак в Telegram. Первый пак бесплатно.",
    hopePoints: ["Без дизайнера", "Пак за 30 секунд", "Первый пак бесплатно", "4 подстиля на выбор"],
    substyles: [
      { slug: "american", nameRu: "Американский", presetId: "cartoon_american", emoji: "🇺🇸", image: fallbackImage },
      { slug: "retro", nameRu: "Ретро", presetId: "cartoon_retro", emoji: "📺", image: fallbackImage },
      { slug: "modern", nameRu: "Современный", presetId: "cartoon_modern", emoji: "✨", image: fallbackImage },
      { slug: "telegram", nameRu: "Телеграм", presetId: "cartoon_telegram", emoji: "✈️", image: "/images/examples/sticker-telegram.webp" },
    ],
    relatedStyles: ["3d", "serialy", "igry"],
    relatedClusterLinks: [{ href: "/telegram", label: "Стикеры для Telegram" }],
    ctaSlug: "multfilm",
    ctaButtonText: "Создать мультяшный стикер",
    howItWorksTitle: "3 шага — мультяшные стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Мультяшные стикеры из фото",
    seoContent: `<p>Мультяшные стикеры из фото — американский, ретро, современный, в стиле Telegram. Бот Photo2Sticker создаёт их за 30 секунд. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать мультяшный стикер из фото?", a: "Выберите стиль «Мультфильм» и подстиль в боте @Photo_2_StickerBot. Отправьте фото — пак готов за 30 секунд." },
    ],
    reviews: [
      { text: "Мультяшные стикеры — американский и телеграм стиль. Оба узнаваемые, как из мультика. Класс.", name: "Саша", meta: "1 пак" },
      { text: "Ретро и современный попробовала — для чата с подругами идеально. Лицо сохранилось, стиль разный.", name: "Вика", meta: "2 пака" },
      { text: "Телеграм подстиль — тот самый стиль из ТГ. Сделал пак, теперь в чатах шлю «официальные» стикеры с собой.", name: "Леша", meta: "1 пак" },
    ],
  },
  {
    slug: "igry",
    title: "Игровые стикеры — пиксель, RPG | Photo2Sticker",
    metaDescription: "Игровые стикеры из фото за 30 секунд. Пиксель, RPG, мобильные. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Игровые стикеры из фото",
    heroSubtitle: "ИИ превратит фото в игровой стикер: пиксель, RPG или мобильный стиль. 3 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется игровые стикеры из фото — пиксель, RPG, как в мобилках. Но как сделать без художника? Пиксель-арт вручную долго, заказ игровых стикеров дорог. Свой гик-стикерпак так и не появляется.",
    hopeTitle: "Игровые стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker делает игровые стикеры из фото за 30 секунд: пиксель, RPG, мобильный стиль. Отправь фото, выбери подстиль — пак стикеров для чата геймеров. Первый пак бесплатно.",
    hopePoints: ["Без пиксель-арта вручную", "Пак за 30 секунд", "Первый пак бесплатно", "Пиксель, RPG, мобильный"],
    substyles: [
      { slug: "pixel", nameRu: "Пиксель", presetId: "game_pixel", emoji: "👾", image: fallbackImage },
      { slug: "rpg", nameRu: "RPG", presetId: "game_rpg", emoji: "⚔️", image: fallbackImage },
      { slug: "mobile", nameRu: "Мобильный", presetId: "game_mobile", emoji: "📱", image: fallbackImage },
    ],
    relatedStyles: ["3d", "multfilm", "memy"],
    relatedClusterLinks: [{ href: "/bot", label: "Бот для стикеров" }],
    ctaSlug: "igry",
    ctaButtonText: "Создать игровой стикер",
    howItWorksTitle: "3 шага — игровые стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Игровые стикеры из фото",
    seoContent: `<p>Игровые стикеры из фото — пиксель, RPG, мобильный стиль. Бот Photo2Sticker создаёт такие стикеры за 30 секунд. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать пиксельный стикер из фото?", a: "Выберите стиль «Игры» и подстиль «Пиксель» в боте @Photo_2_StickerBot. Отправьте фото — получите пиксельные стикеры." },
    ],
    reviews: [
      { text: "Пиксель и RPG — два пака сделал. Для гик-чата самое то, все оценили.", name: "Михаил", meta: "2 пака" },
      { text: "Игровые стикеры из фото — мобильный стиль зашёл. Как персонаж из мобилки, но я.", name: "Дима", meta: "1 пак" },
      { text: "Пиксельные стикеры подарил брату-геймеру. Он в восторге, уже ставит в дискорд.", name: "Настя", meta: "1 пак" },
    ],
  },
  {
    slug: "manhwa",
    title: "Манхва стикеры из фото — корейский стиль | Photo2Sticker",
    metaDescription: "Манхва стикеры из фото за 30 секунд. Классика, романтика, экшен. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Манхва стикеры из фото",
    heroSubtitle: "ИИ превратит фото в стикер в стиле манхвы. 3 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется манхва стикеры из своего фото — корейский стиль, как в вебтунах. Но где сделать без заказа у художника? Манхва-стиль специфичный, готовых сервисов мало. Стикерпак в стиле манхвы откладывается.",
    hopeTitle: "Манхва стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker создаёт манхва стикеры из фото за 30 секунд: классика, романтика, экшен. Отправь фото, выбери подстиль — пак в стиле корейских комиксов в Telegram. Первый пак бесплатно.",
    hopePoints: ["Без художника", "Пак за 30 секунд", "Первый пак бесплатно", "Классика, романтика, экшен"],
    substyles: [
      { slug: "classic", nameRu: "Классика", presetId: "manhwa_classic", emoji: "📖", image: fallbackImage },
      { slug: "romance", nameRu: "Романтика", presetId: "manhwa_romance", emoji: "💕", image: fallbackImage },
      { slug: "action", nameRu: "Экшен", presetId: "manhwa_action", emoji: "⚔️", image: fallbackImage },
    ],
    relatedStyles: ["anime", "milye", "risunok"],
    relatedClusterLinks: [{ href: "/", label: "Стикер из фото" }],
    ctaSlug: "manhwa",
    ctaButtonText: "Создать манхва стикер",
    howItWorksTitle: "3 шага — манхва стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Манхва стикеры из фото",
    seoContent: `<p>Манхва стикеры из фото — корейский стиль комиксов. Бот Photo2Sticker создаёт такие стикеры за 30 секунд. Классика, романтика, экшен. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать манхва стикер из фото?", a: "Выберите стиль «Манхва» и подстиль в боте @Photo_2_StickerBot. Отправьте фото — пак готов за 30 секунд." },
    ],
    reviews: [
      { text: "Манхва стикеры — классика и романтика. Люблю корейские вебтуны, теперь и себя в этом стиле.", name: "Аня", meta: "1 пак" },
      { text: "Экшен подстиль попробовал — как из боевой манхвы. Для чата с друзьями по аниме зашло.", name: "Артур", meta: "2 пака" },
      { text: "Романтика манхва — нежная стилистика. Подарила подруге пак, она фанатка дорам и манхвы.", name: "Валерия", meta: "1 пак" },
    ],
  },
  {
    slug: "risunok",
    title: "Рисованные стикеры — скетч, акварель, тушь | Photo2Sticker",
    metaDescription: "Рисованные стикеры из фото за 30 секунд. Скетч, акварель, тушь. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Рисованные стикеры из фото",
    heroSubtitle: "ИИ превратит фото в рисованный стикер: скетч, акварель или тушь. 3 подстиля. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется рисованные стикеры из фото — скетч, акварель, тушь. Но сам не рисуешь, заказ у иллюстратора дорог. Готовые «рисованные» стикеры без твоего лица. Свой стикерпак как рисунок так и не делается.",
    hopeTitle: "Рисованные стикеры из фото — реально",
    hopeText: "Бот Photo2Sticker делает рисованные стикеры из фото за 30 секунд: скетч, акварель, тушь. Отправь фото, выбери подстиль — пак в стиле рисунка в Telegram. ИИ сохраняет черты. Первый пак бесплатно.",
    hopePoints: ["Без умения рисовать", "Пак за 30 секунд", "Первый пак бесплатно", "Скетч, акварель, тушь"],
    substyles: [
      { slug: "sketch", nameRu: "Скетч", presetId: "drawn_sketch", emoji: "✏️", image: fallbackImage },
      { slug: "watercolor", nameRu: "Акварель", presetId: "drawn_watercolor", emoji: "🎨", image: fallbackImage },
      { slug: "ink", nameRu: "Тушь", presetId: "drawn_ink", emoji: "🖌️", image: fallbackImage },
    ],
    relatedStyles: ["anime", "manhwa", "milye"],
    relatedClusterLinks: [{ href: "/", label: "Стикер из фото" }],
    ctaSlug: "risunok",
    ctaButtonText: "Создать рисованный стикер",
    howItWorksTitle: "3 шага — рисованные стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Рисованные стикеры из фото",
    seoContent: `<p>Рисованные стикеры из фото — скетч, акварель, тушь. Бот Photo2Sticker создаёт их за 30 секунд. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать стикер в стиле скетч из фото?", a: "Выберите стиль «Рисунок» и подстиль «Скетч» в боте. Отправьте фото — получите рисованные стикеры." },
    ],
    reviews: [
      { text: "Скетч и акварель — как нарисованные от руки. Для творческого чата идеально, все спрашивают, кто рисовал.", name: "Ксения", meta: "1 пак" },
      { text: "Рисованные стикеры тушью — стильно и не как у всех. Лицо узнаваемое, стиль как из комикса.", name: "Марк", meta: "2 пака" },
      { text: "Акварель попробовала — нежные, как акварельный портрет. Друзья думали, заказывала у художника.", name: "Даша", meta: "1 пак" },
    ],
  },
  {
    slug: "serialy",
    title: "Стикеры в стиле мультсериалов — Дисней, Симпсоны | Photo2Sticker",
    metaDescription: "Стикеры из сериалов и мультфильмов за 30 секунд. Дисней, американский, детский, взрослый. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Стикеры из сериалов и мультфильмов",
    heroSubtitle: "ИИ превратит фото в стикер в стиле мультсериалов. 5 подстилей. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется стикеры как из мультсериалов — Дисней, американский, детский или взрослый. Но как сделать стикер в стиле сериала без дизайнера? Заказ дорог, готовые не с твоим лицом. Стикерпак в стиле мультиков откладывается.",
    hopeTitle: "Стикеры из сериалов из фото — реально",
    hopeText: "Бот Photo2Sticker создаёт стикеры в стиле мультсериалов из фото за 30 секунд: Дисней, американский, детский, взрослый, Хеллаш. Выбери подстиль, отправь фото — пак в Telegram. Первый пак бесплатно.",
    hopePoints: ["Без дизайнера", "Пак за 30 секунд", "Первый пак бесплатно", "5 подстилей"],
    substyles: [
      { slug: "american", nameRu: "Американский", presetId: "tv_american", emoji: "🇺🇸", image: fallbackImage },
      { slug: "adult", nameRu: "Взрослый", presetId: "tv_adult", emoji: "📺", image: fallbackImage },
      { slug: "kids", nameRu: "Детский", presetId: "tv_kids", emoji: "👶", image: fallbackImage },
      { slug: "disney", nameRu: "Дисней", presetId: "tv_disney", emoji: "✨", image: fallbackImage },
      { slug: "hellish", nameRu: "Хеллаш", presetId: "tv_hellish", emoji: "😈", image: fallbackImage },
    ],
    relatedStyles: ["3d", "multfilm", "russkiy"],
    relatedClusterLinks: [{ href: "/telegram", label: "Стикеры для Telegram" }],
    ctaSlug: "serialy",
    ctaButtonText: "Создать стикер из сериала",
    howItWorksTitle: "3 шага — стикеры из сериалов",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Стикеры из сериалов и мультфильмов",
    seoContent: `<p>Стикеры в стиле мультсериалов — Дисней, американский, детский и др. Бот Photo2Sticker создаёт такие стикеры из фото за 30 секунд. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать стикер в стиле Дисней из фото?", a: "Выберите стиль «Сериалы» и подстиль «Дисней» в боте @Photo_2_StickerBot. Отправьте фото — получите стикеры в этой стилистике." },
    ],
    reviews: [
      { text: "Дисней и детский — сделала паки для дочки. Она в восторге, как героиня мультика. Узнаваемо.", name: "Ирина", meta: "2 пака" },
      { text: "Стикеры из сериалов — американский и Хеллаш. Для фанатов сериалов то что надо.", name: "Женя", meta: "1 пак" },
      { text: "Взрослый подстиль — как из взрослого мультсериала. В чате с друзьями все оценили.", name: "Тимур", meta: "1 пак" },
    ],
  },
  {
    slug: "russkiy",
    title: "Русские стикеры — 90-е, СССР, Love Is | Photo2Sticker",
    metaDescription: "Стикеры в русском стиле из фото за 30 секунд. 90-е, Love Is, советский мультик, СССР, богатырь, гопник. ИИ сохраняет черты. Первый пак бесплатно.",
    h1: "Стикеры в русском стиле",
    heroSubtitle: "ИИ превратит фото в стикер в русском стиле. 7 подстилей. Первый пак бесплатно.",
    painTitle: "Знакомо?",
    painText: "Хочется стикеры в русском стиле — 90-е, Love Is, советский мультик, гопник. Но где сделать без дизайнера? Специфичная эстетика, готовых сервисов мало. Русский стикерпак так и не появляется.",
    hopeTitle: "Стикеры в русском стиле из фото — реально",
    hopeText: "Бот Photo2Sticker делает стикеры в русском стиле из фото за 30 секунд: 90-е, Love Is, советский мультик, СССР, богатырь, гопник, криминал. Выбери подстиль — пак в Telegram. Первый пак бесплатно.",
    hopePoints: ["Без дизайнера", "Пак за 30 секунд", "Первый пак бесплатно", "7 подстилей"],
    substyles: [
      { slug: "90s", nameRu: "90-е", presetId: "ru_90s", emoji: "📼", image: fallbackImage },
      { slug: "love-is", nameRu: "Love Is", presetId: "ru_love_is", emoji: "💕", image: fallbackImage },
      { slug: "sovetskiy", nameRu: "Советский мультик", presetId: "ru_soviet_cartoon", emoji: "🇷🇺", image: fallbackImage },
      { slug: "ussr", nameRu: "СССР эстетика", presetId: "ru_ussr_aesthetic", emoji: "⭐", image: fallbackImage },
      { slug: "bogatyr", nameRu: "Богатырь", presetId: "ru_bogatyr", emoji: "⚔️", image: fallbackImage },
      { slug: "gopnik", nameRu: "Гопник", presetId: "ru_gopnik", emoji: "🥤", image: fallbackImage },
      { slug: "criminal", nameRu: "Криминал", presetId: "ru_criminal", emoji: "🎩", image: fallbackImage },
    ],
    relatedStyles: ["lyubov", "serialy", "multfilm"],
    relatedClusterLinks: [{ href: "/", label: "Стикер из фото" }, { href: "/besplatno", label: "Бесплатные стикеры" }],
    ctaSlug: "russkiy",
    ctaButtonText: "Создать русский стикер",
    howItWorksTitle: "3 шага — русские стикеры",
    howItWorksSteps: defaultHowItWorksSteps,
    seoTitle: "Стикеры в русском стиле",
    seoContent: `<p>Стикеры в русском стиле — 90-е, Love Is, советский мультик, СССР, богатырь и др. Бот Photo2Sticker создаёт такие стикеры из фото за 30 секунд. Первый пак бесплатно.</p>`,
    faq: [
      { q: "Как сделать стикер в стиле Love Is из фото?", a: "Выберите стиль «Русский» и подстиль «Love Is» в боте. Отправьте фото — получите стикеры в этой стилистике." },
      { q: "Есть ли советский мультик стиль?", a: "Да. В группе «Русский» есть подстиль «Советский мультик»." },
    ],
    reviews: [
      { text: "90-е и Love Is — ностальгия. В чате с одноклассниками все ржут, стикеры в тему.", name: "Витя", meta: "2 пака" },
      { text: "Советский мультик и богатырь сделал для отца — он фанат наших мультиков. Остался доволен.", name: "Николай", meta: "1 пак" },
      { text: "Русские стикеры — гопник и криминал для прикола. В дружеском чате зашли на ура.", name: "Серёга", meta: "1 пак" },
    ],
  },
];

export function getStyleGroupBySlug(slug: string): StyleGroup | undefined {
  return STYLE_GROUPS.find((g) => g.slug === slug);
}

export function getAllStyleGroupSlugs(): string[] {
  return STYLE_GROUPS.map((g) => g.slug);
}

export function getSubstyle(
  groupSlug: string,
  substyleSlug: string
): { group: StyleGroup; substyle: SubstyleItem } | undefined {
  const group = getStyleGroupBySlug(groupSlug);
  if (!group) return undefined;
  const substyle = group.substyles.find((s) => s.slug === substyleSlug);
  if (!substyle) return undefined;
  return { group, substyle };
}

/** Все пары (group, substyle) для generateStaticParams. */
export function getAllSubstyleParams(): { group: string; substyle: string }[] {
  const result: { group: string; substyle: string }[] = [];
  for (const g of STYLE_GROUPS) {
    for (const s of g.substyles) {
      result.push({ group: g.slug, substyle: s.slug });
    }
  }
  return result;
}
