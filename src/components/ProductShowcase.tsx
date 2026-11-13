"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, productsIn } from "@/data/catalog";
import { ArrowRight, ArrowUpRight } from "./Icons";

export default function ProductShowcase() {
  const [active, setActive] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const category = CATEGORIES[active];

  const moveCategory = (direction: number) => {
    setActive((current) => (current + direction + CATEGORIES.length) % CATEGORIES.length);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % CATEGORIES.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section id="products" className="relative overflow-hidden bg-[#f3f2ee] py-5 md:py-8 lg:min-h-[75svh] lg:py-10">
      <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(90deg,transparent_49.9%,rgba(23,38,56,.07)_50%,transparent_50.1%)]" aria-hidden="true" />
      <div className="container-x relative flex flex-col">
        <div className="grid items-end gap-3 border-t border-ink/20 pt-3 md:grid-cols-[1fr_auto] md:gap-8">
          <div>
            <p className="eyebrow">01 / Engineered solutions</p>
            <h2 className="mt-2 mb-6 font-display text-[clamp(2.15rem,3.4vw,3.5rem)] font-semibold leading-[.9] tracking-[-.055em] text-ink">The right valve <span className="font-light italic text-steel">changes everything.</span></h2>
          </div>
          <p className="max-w-[310px] pb-1 text-[13px] leading-relaxed text-steel">Eight specialised families. Over 100 solutions. One engineering team committed to making flow work for you.</p>
        </div>

        <div className="mt-4 hidden grid-cols-2 gap-1.5 sm:grid sm:grid-cols-4 lg:grid-cols-8">
          {CATEGORIES.map((item, index) => (
            <button key={item.slug} type="button" onClick={() => setActive(index)} aria-pressed={active === index}
              className={`flex min-h-9 items-center gap-2 rounded-md px-2.5 py-2 text-left text-[11px] font-bold leading-tight transition sm:text-xs ${active === index ? "bg-ink text-white shadow-md" : "border border-ink/10 bg-white/70 text-ink hover:border-signal/50 hover:bg-white"}`}>
              <span className={`font-mono text-[9px] ${active === index ? "text-signal" : "text-steel"}`}>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>

        <div
          className="mt-3 grid touch-pan-y overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-[0_20px_55px_-35px_rgba(16,25,34,.4)] lg:min-h-[420px] lg:grid-cols-[.9fr_1.1fr]"
          role="group"
          aria-roledescription="carousel"
          aria-label="Product families"
          onTouchStart={(event) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; }}
          onTouchEnd={(event) => {
            const start = touchStartX.current;
            const end = event.changedTouches[0]?.clientX;
            if (start !== null && end !== undefined && Math.abs(end - start) > 50) moveCategory(end < start ? 1 : -1);
            touchStartX.current = null;
          }}
        >
          <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden bg-[#e8e8e4] sm:min-h-[480px] lg:min-h-[420px]">
            <span className="absolute left-4 top-4 z-10 font-mono text-[9px] uppercase tracking-[.17em] text-ink/45 sm:left-6 sm:top-5">Regent / Product {String(active + 1).padStart(2, "0")}</span>
            <button type="button" onClick={() => moveCategory(-1)} aria-label="Previous product family" className="absolute left-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-ink/65 text-xl text-white backdrop-blur sm:hidden"><ArrowRight /></button>
            <button type="button" onClick={() => moveCategory(1)} aria-label="Next product family" className="absolute right-3 top-1/2 z-20 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-ink/65 text-xl text-white backdrop-blur sm:hidden"><ArrowRight /></button>
            <div className="pointer-events-none absolute inset-[15%] rounded-full border border-ink/10" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-[25%] rounded-full border border-ink/10" aria-hidden="true" />
            <span className="pointer-events-none absolute bottom-[-28%] right-[5%] font-display text-[clamp(12rem,25vw,25rem)] font-semibold leading-none text-ink/[.035]" aria-hidden="true">{String(active + 1).padStart(2, "0")}</span>
            <div key={category.slug} className="showcase-visual absolute inset-0">
              <Image src={category.image} alt={category.name} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" priority={active === 0} unoptimized />
            </div>
            <div className="absolute inset-x-4 bottom-3 flex justify-between border-t border-ink/15 pt-2 font-mono text-[8px] uppercase tracking-wider text-steel sm:inset-x-6 sm:bottom-4 sm:text-[9px]">
              <span>Precision engineered</span><span>Noida, India / Est. 1999</span>
            </div>
          </div>

          <div key={category.slug + "-copy"} className="showcase-copy flex flex-col justify-between p-4 sm:p-6 lg:p-7 xl:p-9">
            <div>
              <div className="flex items-center justify-between border-b border-ink/15 pb-2">
                <p className="font-mono text-[10px] text-signal">{String(active + 1).padStart(2, "0")} / 08</p>
                <p className="text-[9px] font-bold uppercase tracking-widest text-steel">Valve families</p>
              </div>
              <p className="mt-4 text-[9px] font-bold uppercase tracking-[.14em] text-signal">{category.tagline}</p>
              <h3 className="mt-2 font-display text-[clamp(2rem,3.5vw,3.7rem)] font-semibold leading-[.9] tracking-[-.04em] text-ink">{category.name}<span className="text-signal">.</span></h3>
              <p className="mt-3 line-clamp-3 text-[13px] leading-[1.55] text-steel">{category.intro}</p>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-3">
              <div className="flex items-baseline gap-2"><span className="font-display text-3xl font-semibold text-ink">{String(productsIn(category.slug).length).padStart(2, "0")}</span><span className="text-[9px] font-bold uppercase tracking-widest text-steel">Available models</span></div>
              <Link href={`/products/${category.slug}`} className="group inline-flex shrink-0 items-center gap-2 text-[9px] font-extrabold uppercase tracking-[.12em] text-ink transition hover:text-signal">Explore family <ArrowUpRight className="text-lg transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></Link>
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-col items-start gap-2 font-mono text-[9px] uppercase tracking-[.12em] text-steel sm:flex-row sm:items-center sm:justify-between sm:gap-3">
          <p>Engineered for your media. Built for your process.</p>
          <Link href="/products" className="group inline-flex items-center gap-2 font-sans font-extrabold tracking-[.14em] text-signal">View complete catalogue <ArrowRight className="text-base transition group-hover:translate-x-1" /></Link>
        </div>
      </div>
    </section>
  );
}
