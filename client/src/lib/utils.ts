import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Builds Telegram bot deep link with UTM params + yclid from current URL.
 * Format: {source}_{medium}_{campaign}_{content}_{yclid} (max 64 chars, A-Za-z0-9_- only)
 * Trimming priority: drop content first, then campaign; keep source, medium, yclid.
 * Falls back to "web" if no UTM params present.
 */
export function buildTelegramStartLink(): string {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source") || "";
  const medium = params.get("utm_medium") || "";
  const campaign = params.get("utm_campaign") || "";
  const content = params.get("utm_content") || "";
  const yclid = params.get("yclid") || "";

  let startPayload = "web";
  if (source) {
    const clean = (s: string) => s.replace(/[^A-Za-z0-9\-]/g, "");
    const src = clean(source);
    const med = clean(medium);
    const cmp = clean(campaign);
    const cnt = clean(content);
    const yid = clean(yclid);

    // Build payload with priority trimming to fit 64 chars
    // Must keep: source, medium, yclid. Can drop: content, then campaign.
    const base = [src, med].filter(Boolean).join("_");
    const suffix = yid ? `_${yid}` : "";

    // Try full: source_medium_campaign_content_yclid
    let candidate = [src, med, cmp, cnt].filter(Boolean).join("_") + suffix;
    if (candidate.length <= 64) {
      startPayload = candidate;
    } else {
      // Drop content
      candidate = [src, med, cmp].filter(Boolean).join("_") + suffix;
      if (candidate.length <= 64) {
        startPayload = candidate;
      } else {
        // Drop campaign
        candidate = base + suffix;
        startPayload = candidate.slice(0, 64);
      }
    }
  }

  return `https://t.me/Photo_2_StickerBot?start=${startPayload}`;
}
