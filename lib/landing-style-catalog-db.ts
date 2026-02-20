import { getSupabase } from "@/lib/supabase";

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? "";
const examplesBucket = process.env.SUPABASE_STORAGE_BUCKET_EXAMPLES || "stickers-examples";

function packStylePreviewUrl(presetId: string): string | null {
  if (!supabaseUrl || !examplesBucket) return null;
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${examplesBucket}/pack/style/${presetId}/1.webp`;
}

/** group_id → slug для URL /style/[group]. */
const GROUP_ID_TO_SLUG: Record<string, string> = {
  anime: "anime",
  meme: "memy",
  cute: "milye",
  love: "lyubov",
  cartoon: "multfilm",
  game: "igry",
  drawn: "risunok",
  manhwa: "manhwa",
  tv: "serialy",
  russian: "russkiy",
  photo: "photo",
};

export type StyleGroupCatalogItem = {
  slug: string;
  name_ru: string;
  emoji: string;
  preview_image: string | null;
  substyles_count: number;
};

/**
 * Список групп стилей для каталога /style из БД.
 * Только группы, у которых есть хотя бы один пресет с landing = true.
 */
export async function getStyleGroupsForCatalog(): Promise<StyleGroupCatalogItem[]> {
  const supabase = getSupabase();
  if (!supabase) return [];

  try {
    const { data: groups, error: groupsError } = await supabase
      .from("style_groups")
      .select("id, name_ru, emoji, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (groupsError || !groups?.length) {
      if (groupsError) console.warn("[getStyleGroupsForCatalog]", groupsError.message);
      return [];
    }

    const { data: presets } = await supabase
      .from("style_presets_v2")
      .select("id, group_id")
      .eq("is_active", true)
      .eq("landing", true)
      .order("group_id", { ascending: true })
      .order("sort_order", { ascending: true });

    const firstPresetByGroup = new Map<string, string>();
    const countByGroup = new Map<string, number>();
    for (const p of presets ?? []) {
      const gid = p.group_id as string;
      if (!firstPresetByGroup.has(gid)) firstPresetByGroup.set(gid, p.id as string);
      countByGroup.set(gid, (countByGroup.get(gid) ?? 0) + 1);
    }

    return groups
      .filter((g) => firstPresetByGroup.has(g.id as string))
      .map((g) => {
        const groupId = g.id as string;
        const slug = GROUP_ID_TO_SLUG[groupId] ?? groupId;
        const firstPresetId = firstPresetByGroup.get(groupId)!;
        const previewUrl = packStylePreviewUrl(firstPresetId);
        return {
          slug,
          name_ru: (g.name_ru as string) ?? "",
          emoji: (g.emoji as string) ?? "✨",
          preview_image: previewUrl ?? null,
          substyles_count: countByGroup.get(groupId) ?? 0,
        };
      });
  } catch (e) {
    console.warn("[getStyleGroupsForCatalog]", e);
    return [];
  }
}
