import { getSupabase } from "@/lib/supabase";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? "";
const examplesBucket = process.env.SUPABASE_STORAGE_BUCKET_EXAMPLES || "stickers-examples";

function packStyleUrls(presetId: string): string[] {
  if (!supabaseUrl || !examplesBucket) return [];
  const base = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${examplesBucket}`;
  return Array.from({ length: 9 }, (_, i) => `${base}/pack/style/${presetId}/${i + 1}.webp`);
}

/** Превью стиля = первый стикер пака: pack/style/{presetId}/1.webp */
export function packStylePreviewUrl(presetId: string): string | null {
  const urls = packStyleUrls(presetId);
  return urls.length > 0 ? urls[0] : null;
}

export type HeroPresetResult = {
  presetId: string;
  image_urls: string[];
};

/**
 * Возвращает пресет и URL пака (pack/style/{id}/1..9) для пути страницы.
 * Резолв по landing_hero_paths: path должен входить в массив. При нескольких — первый по sort_order.
 */
export async function getHeroPresetForPath(path: string): Promise<HeroPresetResult | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const normalizedPath = path || "/";
  const { data, error } = await supabase
    .from("style_presets_v2")
    .select("id")
    .eq("is_active", true)
    .contains("landing_hero_paths", [normalizedPath])
    .order("sort_order", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error || !data?.id) return null;
  const image_urls = packStyleUrls(data.id as string);
  return { presetId: data.id as string, image_urls };
}
