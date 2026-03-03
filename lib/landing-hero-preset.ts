import { getSupabase } from "@/lib/supabase";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? "";
const examplesBucket = process.env.SUPABASE_STORAGE_BUCKET_EXAMPLES || "stickers-examples";

function packStyleUrls(presetId: string): string[] {
  if (!supabaseUrl || !examplesBucket) return [];
  const base = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${examplesBucket}`;
  return Array.from({ length: 16 }, (_, i) => `${base}/pack/style/${presetId}/${i + 1}.webp`);
}

/** Превью стиля = первый стикер пака: pack/style/{presetId}/1.webp */
export function packStylePreviewUrl(presetId: string): string | null {
  const urls = packStyleUrls(presetId);
  return urls.length > 0 ? urls[0] : null;
}

export type HeroPresetResult = {
  presetId: string;
  image_urls: string[];
  /** true, если пресет подставлен по fallback (path не найден в landing_hero_paths). */
  isFallback?: boolean;
};

const DEFAULT_HERO_PRESET_ID = "photo_realistic";

/**
 * URL пака стиля (pack/style/{presetId}/1..9) для блока «Примеры» на страницах подстиля.
 * Всегда 9 URL; если файлов нет в storage — в ячейках показывается заглушка (StickerImageWithFallback).
 */
export function getPackImageUrlsForPresetId(presetId: string): string[] {
  return packStyleUrls(presetId);
}

/**
 * Возвращает пресет и URL пака (pack/style/{id}/1..9) для пути страницы.
 * Резолв по landing_hero_paths: path должен входить в массив. При нескольких — первый по sort_order.
 * Если в БД нет подходящего пресета, но заданы SUPABASE_URL и бакет — возвращаем дефолтный пак (photo_realistic).
 */
export async function getHeroPresetForPath(path: string): Promise<HeroPresetResult | null> {
  const supabase = getSupabase();
  const normalizedPath = path || "/";

  if (supabase) {
    const { data, error } = await supabase
      .from("style_presets_v2")
      .select("id")
      .eq("is_active", true)
      .contains("landing_hero_paths", [normalizedPath])
      .order("sort_order", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (!error && data?.id) {
      const image_urls = packStyleUrls(data.id as string);
      if (image_urls.length > 0) return { presetId: data.id as string, image_urls };
    }
  }

  const fallbackUrls = packStyleUrls(DEFAULT_HERO_PRESET_ID);
  if (fallbackUrls.length > 0) {
    return { presetId: DEFAULT_HERO_PRESET_ID, image_urls: fallbackUrls, isFallback: true };
  }
  return null;
}
