import { Check } from "lucide-react";

const points = [
  "Без рисования и дизайнера",
  "От 45₽ за пак из 9 стикеров",
  "Готово за 30 секунд",
  "Всё в Telegram, с телефона",
];

export function HopeBlock() {
  return (
    <section className="py-6 md:py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl md:rounded-2xl bg-card/40 border border-primary/30 p-5 sm:p-6 md:p-8 ring-1 ring-primary/10">
          <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white text-center mb-3 sm:mb-4">
            Свой пак стикеров из фото — реально
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed mb-4 sm:mb-5">
            Многие хотят то же самое — и это нормально решаемо. Не нужно уметь рисовать: пришли фото, выбери стиль (аниме, фото-реалистичный и др.) и эмоции — получи готовый пак стикеров с разными эмоциями и подписями за полминуты.
          </p>
          <p className="text-xs sm:text-sm text-primary font-semibold text-center mb-4">
            Черты и мелочи сохраняются — в паке узнаваемо ты.
          </p>
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-1.5 text-[11px] sm:text-xs text-muted-foreground">
                <Check className="w-3.5 h-3.5 text-primary shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
