import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

const CONFIG_PATH = path.join(process.cwd(), "src", "components", "ui", "vip-badge-config.json");

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;
const GLOW_RE = /^(rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}(?:\s*,\s*(?:0|1|0?\.\d+|1\.0+))?\s*\)|#[0-9a-fA-F]{6})$/;
const VALID_WINGS = new Set([0, 2, 3, 4]);
const VALID_ARMOR = new Set(["bastion", "cheek-prow", "bastion-cheek"]);
const VALID_TOP = new Set(["cap", "crown", "rays-3", "rays-5", "battlements"]);
const VALID_CORE = new Set(["crown-drop", "diamond", "radial-matrix", "keep-arch", "flask"]);

const COLOR_FIELDS = [
  "metalLight",
  "metalMid",
  "metalDark",
  "wellLight",
  "wellDark",
  "elixirBright",
  "elixirMid",
  "elixirDeep",
  "crownLight",
  "crownDark",
] as const;

interface TierEntry {
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  metalLight: string;
  metalMid: string;
  metalDark: string;
  wellLight: string;
  wellDark: string;
  elixirBright: string;
  elixirMid: string;
  elixirDeep: string;
  crownLight: string;
  crownDark: string;
  glow: string;
}

interface SpecEntry {
  wings: 0 | 2 | 3 | 4;
  armor: string;
  top: string;
  tails: boolean;
  core: string;
  onProw: boolean;
}

function validatePayload(body: unknown): { tiers: TierEntry[]; specs: Record<string, SpecEntry> } | null {
  if (!body || typeof body !== "object") return null;
  const { tiers, specs } = body as { tiers?: unknown; specs?: unknown };

  if (!Array.isArray(tiers) || tiers.length !== 5) return null;
  if (!specs || typeof specs !== "object" || Array.isArray(specs)) return null;

  const cleanTiers: TierEntry[] = [];
  for (let i = 0; i < 5; i++) {
    const raw = tiers[i];
    if (!raw || typeof raw !== "object") return null;
    const t = raw as Record<string, unknown>;
    if (typeof t.name !== "string" || !t.name.trim() || t.name.length > 24) return null;
    if (t.level !== i + 1) return null;

    const cleanTier: Record<string, unknown> = {
      name: t.name.trim(),
      level: i + 1,
    };

    for (const field of COLOR_FIELDS) {
      const val = t[field];
      if (typeof val !== "string" || !HEX_COLOR_RE.test(val)) return null;
      cleanTier[field] = val;
    }

    if (typeof t.glow !== "string" || !GLOW_RE.test(t.glow)) return null;
    cleanTier.glow = t.glow;

    cleanTiers.push(cleanTier as unknown as TierEntry);
  }

  const cleanSpecs: Record<string, SpecEntry> = {};
  const specsObj = specs as Record<string, unknown>;
  for (let lvl = 1; lvl <= 5; lvl++) {
    const key = String(lvl);
    const raw = specsObj[key];
    if (!raw || typeof raw !== "object") return null;
    const s = raw as Record<string, unknown>;
    if (typeof s.wings !== "number" || !VALID_WINGS.has(s.wings)) return null;
    if (typeof s.armor !== "string" || !VALID_ARMOR.has(s.armor)) return null;
    if (typeof s.top !== "string" || !VALID_TOP.has(s.top)) return null;
    if (typeof s.core !== "string" || !VALID_CORE.has(s.core)) return null;
    if (typeof s.tails !== "boolean" || typeof s.onProw !== "boolean") return null;

    cleanSpecs[key] = {
      wings: s.wings as 0 | 2 | 3 | 4,
      armor: s.armor,
      top: s.top,
      tails: s.tails,
      core: s.core,
      onProw: s.onProw,
    };
  }

  return { tiers: cleanTiers, specs: cleanSpecs };
}

export async function GET() {
  try {
    const raw = await fs.readFile(CONFIG_PATH, "utf8");
    return NextResponse.json(JSON.parse(raw));
  } catch {
    return NextResponse.json({ error: "Failed to read VIP badge config." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Saving to source config is only available in local development." },
      { status: 403 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const validated = validatePayload(body);
  if (!validated) {
    return NextResponse.json({ error: "Invalid VIP badge configuration payload." }, { status: 400 });
  }

  try {
    await fs.writeFile(CONFIG_PATH, `${JSON.stringify(validated, null, 2)}\n`, "utf8");
    return NextResponse.json({ ok: true, config: validated });
  } catch {
    return NextResponse.json({ error: "Failed to write VIP badge config file." }, { status: 500 });
  }
}
