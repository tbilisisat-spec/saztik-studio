import { createHash } from "node:crypto";
import { cookies } from "next/headers";

export const STUDIO_COOKIE = "saztik_studio";

/** Passcode for the internal studio area. Override with STUDIO_PASSCODE. */
export function studioPasscode(): string {
  return process.env.STUDIO_PASSCODE?.trim() || "saztik";
}

export function studioToken(passcode = studioPasscode()): string {
  return createHash("sha256").update(`${passcode}::saztik-studio`).digest("hex");
}

export async function isStudioAuthed(): Promise<boolean> {
  try {
    const store = await cookies();
    return store.get(STUDIO_COOKIE)?.value === studioToken();
  } catch {
    return false;
  }
}
