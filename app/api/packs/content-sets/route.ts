import { NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export type ContentSetItem = {
  id: string;
  name_ru: string;
  labels: string[];
  sort_order: number;
  /** URL картинок карусели 1..9 (из Storage pack/content/{id}/). */
  image_urls?: string[];
};

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.SUPABASE_SUPABASE_PUBLIC_URL ?? "";
const examplesBucket = process.env.SUPABASE_STORAGE_BUCKET_EXAMPLES || "stickers-examples";

const CONTENT_PREFIX = "pack/content";

function publicUrlForContentSetFile(contentSetId: string, index: number): string {
  const path = `${CONTENT_PREFIX}/${contentSetId}/${index}.webp`;
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${examplesBucket}/${path}`;
}

/**
 * Список пилюль для Hero: берём из Storage (stickers-examples, папка pack/content/).
 * Каждая подпапка = один контент-пак (одна пилюля). name_ru/labels подтягиваем из pack_content_sets при наличии.
 */
export async function GET() {
  const supabase = getSupabase();
  if (!supabase || !supabaseUrl || !examplesBucket) {
    return NextResponse.json([]);
  }
  try {
    const { data: listData, error: listError } = await supabase.storage
      .from(examplesBucket)
      .list(CONTENT_PREFIX, { limit: 50, sortBy: { column: "name", order: "asc" } });

    if (listError) {
      console.warn("[api/packs/content-sets] storage list:", listError.message);
      return NextResponse.json([]);
    }

    const ids: string[] = [];
    for (const item of listData ?? []) {
      const name = (item.name ?? "").trim();
      if (!name || name.startsWith(".")) continue;
      if (name.includes("/")) {
        const firstSegment = name.split("/")[0];
        if (firstSegment && !ids.includes(firstSegment)) ids.push(firstSegment);
      } else {
        if (!ids.includes(name)) ids.push(name);
      }
    }

    if (ids.length === 0) {
      return NextResponse.json([]);
    }

    const dbRows = new Map<string, { name_ru: string; labels: string[]; sort_order: number }>();
    const { data: dbData } = await supabase
      .from("pack_content_sets")
      .select("id, name_ru, labels, sort_order")
      .in("id", ids)
      .eq("is_active", true);

    for (const row of dbData ?? []) {
      const id = row.id as string;
      dbRows.set(id, {
        name_ru: (row.name_ru as string) ?? id,
        labels: Array.isArray(row.labels) ? (row.labels as string[]) : [],
        sort_order: Number(row.sort_order) ?? 0,
      });
    }

    const items: ContentSetItem[] = ids.map((id, index) => {
      const meta = dbRows.get(id);
      return {
        id,
        name_ru: meta?.name_ru ?? id,
        labels: meta?.labels ?? [],
        sort_order: meta?.sort_order ?? index,
        image_urls: Array.from({ length: 9 }, (_, i) => publicUrlForContentSetFile(id, i + 1)),
      };
    });

    items.sort((a, b) => a.sort_order - b.sort_order);
    return NextResponse.json(items);
  } catch (e) {
    console.warn("[api/packs/content-sets]", e);
    return NextResponse.json([]);
  }
}
