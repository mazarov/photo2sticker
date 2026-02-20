import { textWithBotLink } from "@/lib/bot-link";

const DEFAULT_TITLE = "Знакомо?";
const DEFAULT_TEXT =
  "Хочется свой пак стикеров из фото для Telegram — с собой, с разными эмоциями, в любимом стиле. Но непонятно, как сделать без дизайнера и без часов в редакторе. Искать инструкции — муторно, приложения часто дорогие или с подпиской. В итоге пак стикеров так и остаётся «когда-нибудь». Чем дольше откладываешь — тем дольше без своего пака.";

export function PainBlock({
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
            {textWithBotLink(text)}
          </p>
        </div>
      </div>
    </section>
  );
}
