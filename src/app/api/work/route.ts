import { NextResponse } from "next/server";
import { getWorkItems } from "@/db/work";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const vertical = url.searchParams.get("vertical");
  const discipline = url.searchParams.get("discipline");

  try {
    const items = await getWorkItems();
    const filtered = items.filter(
      (item) =>
        (!vertical || vertical === "all" || item.vertical === vertical) &&
        (!discipline || discipline === "all" || item.discipline === discipline),
    );
    return NextResponse.json({ ok: true, count: filtered.length, items: filtered });
  } catch (error) {
    console.error("[work] GET failed:", error);
    return NextResponse.json({ ok: false, error: "Could not load work." }, { status: 503 });
  }
}
