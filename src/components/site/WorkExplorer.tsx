"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useState } from "react";
import { WorkCard } from "@/components/site/WorkCard";
import type { WorkRecord } from "@/db/work";
import { verticalLabel } from "@/lib/scoring";

const DISCIPLINES = [
  { key: "all", label: "All disciplines" },
  { key: "creative", label: "Creative" },
  { key: "digital", label: "Digital" },
  { key: "ai", label: "AI & Automation" },
];

function Explorer({ items }: { items: WorkRecord[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const verticalParam = params.get("vertical");
  const disciplineParam = params.get("discipline");

  const [vertical, setVertical] = useState<string>(verticalParam ?? "all");
  const [discipline, setDiscipline] = useState<string>(disciplineParam ?? "all");

  useEffect(() => {
    if (verticalParam) setVertical(verticalParam);
    if (disciplineParam) setDiscipline(disciplineParam);
  }, [verticalParam, disciplineParam]);

  const verticalOptions = useMemo(() => {
    const keys = Array.from(new Set(items.map((item) => item.vertical)));
    return [{ key: "all", label: "All markets" }, ...keys.map((key) => ({ key, label: verticalLabel(key) }))];
  }, [items]);

  const filtered = useMemo(
    () =>
      items.filter(
        (item) =>
          (vertical === "all" || item.vertical === vertical) &&
          (discipline === "all" || item.discipline === discipline),
      ),
    [items, vertical, discipline],
  );

  const sync = (nextVertical: string, nextDiscipline: string) => {
    setVertical(nextVertical);
    setDiscipline(nextDiscipline);
    const query = new URLSearchParams();
    if (nextVertical !== "all") query.set("vertical", nextVertical);
    if (nextDiscipline !== "all") query.set("discipline", nextDiscipline);
    const qs = query.toString();
    router.replace(qs ? `/work?${qs}` : "/work", { scroll: false });
  };

  return (
    <div>
      <div className="flex flex-col gap-6 border-y border-white/8 py-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {verticalOptions.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => sync(option.key, discipline)}
              className={`border px-4 py-2 text-[0.625rem] tracking-[0.2em] uppercase transition-all duration-400 ${
                vertical === option.key
                  ? "border-gold-400 bg-gold-400/10 text-gold-300"
                  : "border-white/10 text-bone-400 hover:border-white/30 hover:text-bone-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex gap-2">
            {DISCIPLINES.map((option) => (
              <button
                key={option.key}
                type="button"
                onClick={() => sync(vertical, option.key)}
                className={`text-[0.625rem] tracking-[0.2em] uppercase transition-colors duration-300 ${
                  discipline === option.key ? "text-gold-300" : "text-mute-500 hover:text-bone-200"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
          <span className="text-[0.625rem] tracking-[0.2em] text-mute-500 uppercase">
            {String(filtered.length).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="py-24 text-center text-sm text-mute-500">
          No projects in this combination yet — the archive grows every month.
        </p>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {filtered.map((item, index) => (
            <WorkCard key={item.slug} item={item} index={index} priority={index < 2} />
          ))}
        </div>
      )}
    </div>
  );
}

export function WorkExplorer({ items }: { items: WorkRecord[] }) {
  return (
    <Suspense fallback={<p className="py-20 text-sm text-mute-500">Loading archive…</p>}>
      <Explorer items={items} />
    </Suspense>
  );
}
