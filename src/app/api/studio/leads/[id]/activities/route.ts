import { NextResponse } from "next/server";
import { addActivity, listActivities } from "@/db/leads";
import { isStudioAuthed } from "@/lib/studio-auth";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

const KINDS = ["note", "stage", "outreach", "sample"] as const;

export async function GET(_request: Request, { params }: Params) {
  if (!(await isStudioAuthed())) {
    return NextResponse.json({ ok: false, error: "Studio access required." }, { status: 401 });
  }
  const { id } = await params;
  const activities = await listActivities(id);
  return NextResponse.json({
    ok: true,
    activities: activities.map((activity) => ({
      ...activity,
      createdAt: activity.createdAt.toISOString(),
    })),
  });
}

export async function POST(request: Request, { params }: Params) {
  if (!(await isStudioAuthed())) {
    return NextResponse.json({ ok: false, error: "Studio access required." }, { status: 401 });
  }
  const { id } = await params;

  let body: { kind?: unknown; body?: unknown };
  try {
    body = (await request.json()) as { kind?: unknown; body?: unknown };
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON body." }, { status: 400 });
  }

  const kind = typeof body.kind === "string" && KINDS.includes(body.kind as (typeof KINDS)[number])
    ? body.kind
    : "note";
  const text = typeof body.body === "string" ? body.body.trim().slice(0, 2000) : "";

  if (!text) {
    return NextResponse.json({ ok: false, error: "Note is empty." }, { status: 400 });
  }

  try {
    const created = await addActivity(id, kind, text);
    return NextResponse.json({
      ok: true,
      activity: { ...created, createdAt: created.createdAt.toISOString() },
    });
  } catch (error) {
    console.error("[studio/activities] POST failed:", error);
    return NextResponse.json({ ok: false, error: "Could not save note." }, { status: 503 });
  }
}
