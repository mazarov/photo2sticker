import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

/** Load .env.local (and optionally .env) into process.env so API routes have SUPABASE_* when running Express. */
export function loadEnv(): void {
  const cwd = process.cwd();
  for (const name of [".env.local", ".env"]) {
    const path = resolve(cwd, name);
    if (!existsSync(path)) continue;
    try {
      const content = readFileSync(path, "utf8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;
        const idx = trimmed.indexOf("=");
        if (idx <= 0) continue;
        const key = trimmed.slice(0, idx).trim();
        let value = trimmed.slice(idx + 1).trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        if (!(key in process.env)) process.env[key] = value;
      }
    } catch {
      // ignore
    }
  }
}
