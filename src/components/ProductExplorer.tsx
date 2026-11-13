"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { ArrowRight, Close, Search } from "./Icons";
import ProductCard from "./ProductCard";

const CLASS_OPTIONS = ["150#", "300#", "800#", "1500#", "2500#"];

export default function ProductExplorer({ initialCategory = "all", initialQuery = "" }: { initialCategory?: string; initialQuery?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [klass, setKlass] = useState<string | null>(null);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: PRODUCTS.length };
    for (const p of PRODUCTS) m[p.category] = (m[p.category] ?? 0) + 1;
    return m;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (klass && !p.classes.includes(klass)) return false;
      if (q && !`${p.name} ${p.blurb}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [category, query, klass]);

  const reset = () => { setCategory("all"); setQuery(""); setKlass(null); };

  return (
    <div className="grid gap-12 lg:grid-cols-[240px_1fr] xl:grid-cols-[270px_1fr]">
      <aside className="lg:sticky lg:top-32 lg:self-start">
        <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[.2em] text-signal">Refine selection</p>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-lg text-steel" />
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search valves…" aria-label="Search valves" className="field !pl-10" />
        </div>
        <div className="mt-8 border-t border-ink/25 pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-steel">Product family</p>
          <div className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
            {[{ slug: "all", name: "All valves" }, ...CATEGORIES].map((c) => (
              <button key={c.slug} type="button" onClick={() => setCategory(c.slug)} aria-pressed={category === c.slug} className={`flex shrink-0 items-center justify-between gap-3 whitespace-nowrap border-b px-3 py-3 text-left text-[13px] font-semibold transition lg:w-full lg:whitespace-normal lg:px-0 ${category === c.slug ? "border-signal text-signal" : "border-line text-navy hover:text-signal"}`}>
                <span>{c.name}</span><span className="font-mono text-[11px] text-steel">{String(counts[c.slug] ?? 0).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 border-t border-ink/25 pt-5">
          <p className="text-[10px] font-bold uppercase tracking-[.18em] text-steel">Pressure class</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {CLASS_OPTIONS.map((c) => <button key={c} type="button" aria-pressed={klass === c} onClick={() => setKlass(klass === c ? null : c)} className={`border px-3 py-2 text-[11px] font-bold transition ${klass === c ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}>{c}</button>)}
          </div>
        </div>
      </aside>

      <div>
        <div className="mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-5">
          <p className="font-display text-2xl font-semibold text-ink" aria-live="polite"><span className="text-signal">{String(results.length).padStart(2, "0")}</span> valves found</p>
          {(category !== "all" || query || klass) && <button type="button" onClick={reset} className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-signal"><Close /> Clear filters</button>}
        </div>
        {results.length === 0 ? (
          <div className="border border-dashed border-line bg-mist p-12 text-center"><p className="font-display text-2xl font-semibold text-ink">No valves match those filters</p><p className="mt-2 text-sm text-steel">We also build custom valves — tell us what you need.</p><Link href="/contact" className="btn btn-primary mt-6">Ask our engineers <ArrowRight /></Link></div>
        ) : <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{results.map((p) => <ProductCard key={p.slug} product={p} />)}</div>}
      </div>
    </div>
  );
}
