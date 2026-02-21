"use client";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState, useEffect } from "react";
import { buildTelegramStartLink } from "@/lib/utils";

const FALLBACK_TG_URL = "https://t.me/Photo_2_StickerBot";

export function TelegramButton({
  className = "",
  size = "lg",
  text = "Open in Telegram",
  pageSlug,
}: {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  text?: string;
  /** For SEO pages: start param when no UTM (e.g. "bot" → ?start=web_bot). Omit for main page. */
  pageSlug?: string;
}) {
  // Ссылка пересчитывается на клиенте после монтирования, чтобы в неё попали UTM/yclid из текущего URL
  // (после редиректа с Директа на /?utm_source=yandex&... иначе в href попадал бы только web/web_foto с SSR)
  const [telegramUrl, setTelegramUrl] = useState(FALLBACK_TG_URL);
  useEffect(() => {
    setTelegramUrl(buildTelegramStartLink(pageSlug));
  }, [pageSlug]);

  return (
    <div className={className}>
      <Button
        asChild
        size={size}
        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full shadow-[0_0_20px_rgba(168,85,247,0.4)] border-none px-4 sm:px-8 py-3 sm:py-6 h-auto text-sm sm:text-lg gap-2 sm:gap-3 transition-all duration-200 w-full sm:w-auto hover:scale-105 active:scale-95 will-change-transform"
      >
        <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
          <Send className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
          {text}
        </a>
      </Button>
    </div>
  );
}