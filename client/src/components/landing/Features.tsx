import { Type, Square, Smile, PersonStanding } from "lucide-react";

const features = [
  {
    icon: <Type className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Добавь текст",
    description: "Любая подпись поверх стикера",
    free: true,
  },
  {
    icon: <Square className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Добавь обводку",
    description: "Белый контур для контраста в чате",
    free: true,
  },
  {
    icon: <Smile className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Добавь эмоцию",
    description: "Смех, грусть, злость — стиль сохранится",
    free: false,
  },
  {
    icon: <PersonStanding className="w-5 h-5 sm:w-6 sm:h-6" />,
    title: "Добавь движение",
    description: "Танцует, бежит, машет рукой",
    free: false,
  },
];

export function Features() {
  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-2 sm:mb-3">
          Настрой стикер под себя
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground text-center mb-6 sm:mb-10">
          Текст и обводка — бесплатно
        </p>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 max-w-2xl mx-auto">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl md:rounded-2xl bg-card/40 border border-border p-3 sm:p-4 md:p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="text-primary">{f.icon}</div>
                <span className="text-xs sm:text-sm md:text-base font-bold text-white">
                  {f.title}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2">
                {f.description}
              </p>
              <span
                className={`inline-block text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                  f.free
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-primary/20 text-primary"
                }`}
              >
                {f.free ? "Бесплатно" : "1 кредит"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
