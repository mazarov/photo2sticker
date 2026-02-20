export function SocialProof() {
  return (
    <section className="py-4 md:py-7 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center text-sm sm:text-base md:text-lg font-bold text-white mb-3 sm:mb-4">
          🔥 1 000+ паков стикеров уже создано
        </div>
        <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="text-base sm:text-lg">⚡</span>
            <span>30 сек на создание</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="text-base sm:text-lg">🎨</span>
            <span>8 стилей</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
          <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-muted-foreground">
            <span className="text-base sm:text-lg">🤖</span>
            <span>Без дизайнера</span>
          </div>
        </div>
      </div>
    </section>
  );
}
