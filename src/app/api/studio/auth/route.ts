import { NextResponse } from "next/server";
import { STUDIO_COOKIE, isStudioAuthed, studioPasscode, studioToken } from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const authed = await isStudioAuthed();
  return NextResponse.json({ ok: true, authed });
}

export async function POST(request: Request) {
  let passcode = "";
  try {
    const body = (await request.json()) as { passcode?: unknown };
    passcode = typeof body.passcode === "string" ? body.passcode.trim() : "";
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  if (passcode !== studioPasscode()) {
    return NextResponse.json({ ok: false, error: "Incorrect passcode." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, authed: true });
  response.cookies.set({
    name: STUDIO_COOKIE,
    value: studioToken(passcode),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true, authed: false });
  response.cookies.set({ name: STUDIO_COOKIE, value: "", path: "/", maxAge: 0 });
  return response;
}
