"use client";

import { useEffect, useRef } from "react";

export default function ScrollStatement() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const bounds = el.getBoundingClientRect();
      if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
      const progress = (window.innerHeight - bounds.top) / (window.innerHeight + bounds.height);
      el.style.setProperty("--scroll-drift", `${(progress - .5) * 110}px`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-ink/10 bg-[#d93332] py-16 text-white sm:py-20 md:py-28" aria-label="Flow is everything">
      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between px-5 pt-5 font-mono text-[10px] uppercase tracking-widest text-white/65 md:px-14 md:pt-8" aria-hidden="true"><span>Regent Hitech / Our belief</span><span>Noida · India</span></div>
      <div className="statement-line statement-left flex w-max items-center whitespace-nowrap font-display text-[clamp(5rem,14vw,14rem)] font-semibold leading-[.84] tracking-[-.065em]" aria-hidden="true">
        <span>FLOW IS EVERYTHING.</span><span className="mx-8 text-white/30">✳</span><span>FLOW IS EVERYTHING.</span>
      </div>
      <div className="statement-line statement-right mt-3 flex w-max items-center whitespace-nowrap font-display text-[clamp(5rem,14vw,14rem)] font-semibold italic leading-[.84] tracking-[-.065em] text-[#19222a] md:mt-6" aria-hidden="true">
        <span>CONTROL IS OURS.</span><span className="mx-8 text-[#19222a]/30">✳</span><span>CONTROL IS OURS.</span>
      </div>
      <div className="container-x relative mt-8 flex items-end justify-between gap-6 border-t border-white/30 pt-5 text-[10px] font-bold uppercase tracking-[.18em] text-white/80 md:mt-14"><span>Designed to perform. Engineered to endure.</span><span className="hidden md:block">Since 1999 — always moving forward</span></div>
    </section>
  );
}
