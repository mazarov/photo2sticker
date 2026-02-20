const useCases = [
  {
    emoji: "🤳",
    title: "Себя",
    description: "Стикерпак с твоим лицом для переписок",
  },
  {
    emoji: "🐱",
    title: "Питомца",
    description: "Кот или пёс теперь тоже стикер",
  },
  {
    emoji: "💑",
    title: "Пары",
    description: "Романтические стикеры для двоих",
  },
  {
    emoji: "🎁",
    title: "Подарок",
    description: "Уникальный стикерпак другу на ДР",
  },
  {
    emoji: "😂",
    title: "Мемы",
    description: "Свои лица — свои мемы в чатах",
  },
  {
    emoji: "👨‍👩‍👧",
    title: "Семья",
    description: "Мама, папа, бабушка — все в стикерах",
  },
];

export function UseCases() {
  return (
    <section className="py-8 md:py-14 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-2 sm:mb-3">
          Стикеры из своих фото — для всего
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground text-center mb-6 sm:mb-10">
          Каждый найдёт применение
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {useCases.map((uc) => (
            <div
              key={uc.title}
              className="rounded-xl md:rounded-2xl bg-card/40 border border-border p-3 sm:p-4 md:p-5 text-center hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl sm:text-3xl md:text-4xl mb-2">
                {uc.emoji}
              </div>
              <div className="text-xs sm:text-sm md:text-base font-bold text-white mb-1">
                {uc.title}
              </div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">
                {uc.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
