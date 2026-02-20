import { BOT_TG_URL, BOT_USERNAME } from "@/lib/bot-link";

function contentWithBotLink(html: string): string {
  const link = `<a href="${BOT_TG_URL}" target="_blank" rel="noopener noreferrer" class="text-primary underline hover:no-underline">${BOT_USERNAME}</a>`;
  return html.replaceAll(BOT_USERNAME, link);
}

export function SeoTextBlock({
  title,
  content,
}: {
  title: string;
  content: string;
}) {
  const safeContent = contentWithBotLink(content.trim());
  return (
    <section className="py-6 md:py-10 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-lg sm:text-2xl md:text-3xl font-display font-bold text-white text-center mb-4 sm:mb-6">
          {title}
        </h2>
        <div
          className="prose prose-invert prose-sm max-w-none text-muted-foreground space-y-4 [&>p]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: safeContent }}
        />
      </div>
    </section>
  );
}
