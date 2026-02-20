/** Один пак эмоций (карусель стикеров). */
export type EmotionPack = {
  id: string;
  name_ru: string;
  labels: string[];
  sort_order: number;
};

/** Паки эмоций из БД (pack_content_sets), сортировка по sort_order ascending. */
export const EMOTION_PACKS: EmotionPack[] = [
  { id: "humor", name_ru: "С юмором", sort_order: 1, labels: ["Опять ты", "Ну привет", "Ну ты даёшь", "Выручай", "Кранты", "Серьёзно?", "Ну давай", "Ок ок", "Ладно"] },
  { id: "everyday", name_ru: "Быт и уют", sort_order: 2, labels: ["Спим?", "Где еда?", "Вырубайся", "Устал", "Диван", "Мимими", "Обнимашки", "Кофе?", "Тихий час"] },
  { id: "reactions", name_ru: "На каждый день", sort_order: 3, labels: ["Доброе утро", "Скучаю", "Устал", "Голоден", "На работе", "Спокойной ночи", "Поехали", "Ок", "Привет"] },
  { id: "support", name_ru: "Поддержка", sort_order: 4, labels: ["Мой герой", "Вместе справимся", "Горжусь", "Ты сможешь", "Рядом", "Верим в тебя", "Держись", "Красавчик", "Сила"] },
  { id: "holiday", name_ru: "Праздник", sort_order: 5, labels: ["С днём рождения", "С 14 февраля", "С годовщиной", "Поздравляю", "За нас", "Любимой", "Любимому", "Праздник", "Ура"] },
  { id: "sass", name_ru: "Сарказм", sort_order: 6, labels: ["Ага конечно", "Ну да", "Всё ясно", "Очень верю", "Да-да", "Конечно", "Как же", "Непременно", "Ага"] },
  { id: "sweet", name_ru: "Ласка и комплименты", sort_order: 7, labels: ["Красотка", "Милый", "Таю", "Обожаю", "Котик", "Солнышко", "Сладкий", "Любимый", "Прелесть"] },
  { id: "romance", name_ru: "Романтика", sort_order: 8, labels: ["Моя", "Люблю", "Спим?", "Чмок", "Вместе", "Красотка", "Мой герой", "Подарок", "Навсегда"] },
].sort((a, b) => a.sort_order - b.sort_order);

export const DEFAULT_EMOTION_PACK_ID = "humor";

/** Названия паков для отображения (совпадают с name_ru). */
export const EMOTION_PACK_NAMES: string[] = EMOTION_PACKS.map((p) => p.name_ru);
