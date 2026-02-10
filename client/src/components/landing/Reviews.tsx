import { Star } from "lucide-react";

const reviews = [
  {
    text: "Сделала стикеры с котом за 2 минуты — теперь все друзья просят ссылку на бота!",
    name: "Аня",
    meta: "23 стикера",
  },
  {
    text: "Подарил девушке стикерпак с нашими фото — лучший подарок на годовщину",
    name: "Максим",
    meta: "15 стикеров",
  },
  {
    text: "Думала будет сложно, а тут просто фото отправила и через минуту стикер в паке. Магия!",
    name: "Катя",
    meta: "8 стикеров",
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5 mb-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className="w-3 h-3 sm:w-4 sm:h-4 fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

export function Reviews() {
  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-6 sm:mb-10">
          Что говорят пользователи
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="rounded-xl md:rounded-2xl bg-card/40 border border-border p-4 sm:p-5"
            >
              <Stars />
              <p className="text-xs sm:text-sm text-white mb-3 leading-relaxed">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="text-[10px] sm:text-xs text-muted-foreground">
                — {r.name},{" "}
                <span className="text-primary">{r.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
