const DEFAULT_TITLE = "Чем дольше откладываешь — тем дольше без своего пака стикеров";
const DEFAULT_TEXT =
  "Без простого способа есть два пути: тратить время на гайды и редакторы или платить за дизайнера и приложения. Или так и сидеть на чужих стикерпаках, пока другие уже шлют паки стикеров с собой. Свой пак в чатах не появится сам по себе.";

export function MorePainBlock({
  title = DEFAULT_TITLE,
  text = DEFAULT_TEXT,
}: { title?: string; text?: string } = {}) {
  return (
    <section className="py-6 md:py-10 px-4 md:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-xl md:rounded-2xl bg-card/40 border border-border p-5 sm:p-6 md:p-8">
          <h2 className="text-lg sm:text-xl md:text-2xl font-display font-bold text-white text-center mb-3 sm:mb-4">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground text-center leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </section>
  );
}
