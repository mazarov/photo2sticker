import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Builds Telegram bot deep link with UTM params + yclid from current URL.
 * When pageSlug is provided and no UTM/yclid in URL, uses web_{pageSlug}; otherwise same as before.
 * Format: {source}_{medium}_{campaign}_{content}_{yclid} (max 64 chars) or web_{pageSlug}.
 */
export function buildTelegramStartLink(pageSlug?: string): string {
  if (typeof window === "undefined") {
    return `https://t.me/Photo_2_StickerBot?start=${pageSlug ? `web_${pageSlug}` : "web"}`;
  }
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source") || "";
  const medium = params.get("utm_medium") || "";
  const campaign = params.get("utm_campaign") || "";
  const content = params.get("utm_content") || "";
  const yclid = params.get("yclid") || "";

  let startPayload = pageSlug ? `web_${pageSlug}` : "web";
  if (source || yclid) {
    const clean = (s: string) => s.replace(/[^A-Za-z0-9\-]/g, "");
    const src = clean(source);
    const med = clean(medium);
    const cmp = clean(campaign);
    const cnt = clean(content);
    const yid = clean(yclid);

    const base = [src, med].filter(Boolean).join("_");
    const suffix = yid ? `_${yid}` : "";
    let candidate = [src, med, cmp, cnt].filter(Boolean).join("_") + suffix;
    if (candidate.length <= 64) {
      startPayload = candidate;
    } else {
      candidate = [src, med, cmp].filter(Boolean).join("_") + suffix;
      if (candidate.length <= 64) {
        startPayload = candidate;
      } else {
        candidate = base + suffix;
        startPayload = candidate.slice(0, 64);
      }
    }
  }

  return `https://t.me/Photo_2_StickerBot?start=${startPayload}`;
}
