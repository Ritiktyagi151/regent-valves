"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "./Icons";

const DURATION = 6000;
const STAGES = [
  {
    number: "01",
    title: "A better beginning.",
    label: "Material selection",
    text: "It starts before the first cut. We source from approved suppliers and inspect incoming castings, forgings and components against the job specification.",
    image: "/img/about/regent3.webp",
    alt: "Regent Hitech machining facility",
  },
  {
    number: "02",
    title: "Made with intent.",
    label: "Precision machining",
    text: "Bodies, bonnets, seats and spindles are machined to tight tolerances and measured throughout production — not just at the end.",
    image: "/img/about/regent2.webp",
    alt: "Precision machining a Regent valve component",
  },
  {
    number: "03",
    title: "Built to belong.",
    label: "Assembly & fitting",
    text: "Skilled technicians fit each component with care, using controlled processes to keep every part aligned, interchangeable and ready for service.",
    image: "/img/about/regent4.webp",
    alt: "Regent technicians assembling industrial valves",
  },
  {
    number: "04",
    title: "Confidence, tested.",
    label: "Quality assurance",
    text: "Every assembled valve faces hydrostatic pressure testing and final inspection before it earns the Regent name and leaves our Noida facility.",
    image: "/img/about/regent1.webp",
    alt: "Hydrostatic pressure testing at Regent Hitech",
  },
] as const;

export default function ManufacturingStory() {
  const [active, setActive] = useState(0);
  const [iteration, setIteration] = useState(0);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const playing = inView && !reduced;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    if (ref.current) io.observe(ref.current);
    return () => { media.removeEventListener("change", update); io.disconnect(); };
  }, []);

  const goTo = (index: number) => {
    setActive((index + STAGES.length) % STAGES.length);
    setIteration((n) => n + 1);
  };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink text-white"
      aria-label="The Regent manufacturing process"
    >
      <div className="grid lg:grid-cols-[52%_48%]">
        <div className="relative min-h-[320px] overflow-hidden bg-[#25323b] sm:min-h-[400px] lg:min-h-[60vh]">
          {STAGES.map((stage, index) => (
            <div key={stage.number} className={`process-scene absolute inset-0 ${index === active ? "process-scene-active" : ""}`}>
              <Image src={stage.image} alt={stage.alt} fill sizes="(min-width:1024px) 52vw, 100vw" className="process-image object-cover object-left" />
            </div>
          ))}
          <div className="absolute inset-0 z-[2] bg-gradient-to-t from-ink/80 via-transparent to-ink/25" />
          <div className="absolute left-6 top-7 z-[3] flex items-center gap-4 text-[10px] font-bold uppercase tracking-[.2em] sm:left-12 sm:top-12"><span className="h-px w-8 bg-signal" /> The making of Regent</div>
          <div className="absolute bottom-8 left-6 right-6 z-[3] flex items-end justify-between gap-5 sm:bottom-12 sm:left-12 sm:right-12">
            <div><span className="block font-mono text-xs text-white/60">{STAGES[active].number} / 04</span><p className="mt-2 font-display text-2xl font-semibold">{STAGES[active].label}</p></div>
            <span className="font-display text-[clamp(6rem,15vw,14rem)] font-light leading-[.65] tracking-tighter text-white/20" aria-hidden="true">{STAGES[active].number}</span>
          </div>
        </div>
        <div className="flex flex-col justify-between px-6 py-10 sm:px-12 sm:py-12 lg:px-[clamp(3rem,6vw,8rem)] lg:py-12">
          <div>
            <p className="eyebrow eyebrow-light">04 / How we make it</p>
            <div key={active} className="process-copy mt-8 md:mt-12">
              <span className="font-mono text-xs uppercase tracking-widest text-signal">Stage {STAGES[active].number} — {STAGES[active].label}</span>
              <h2 className="mt-5 max-w-[580px] font-display text-[clamp(3.4rem,5.4vw,6.4rem)] font-semibold leading-[.9] tracking-[-.045em]">{STAGES[active].title}</h2>
              <p className="mt-6 max-w-md text-[15px] leading-[1.7] text-white/65">{STAGES[active].text}</p>
            </div>
          </div>
          <div className="mt-10">
            <div className="grid grid-cols-4 gap-2 border-t border-white/20 pt-6 sm:gap-5" role="group" aria-label="Manufacturing stages">
              {STAGES.map((stage, index) => (
                <button key={stage.number} type="button" onClick={() => goTo(index)} aria-current={index === active ? "step" : undefined} className={`group min-w-0 text-left transition-opacity ${index === active ? "opacity-100" : "opacity-45 hover:opacity-80"}`} aria-label={`Show stage ${stage.number}: ${stage.label}`}>
                  <span className="block font-mono text-[10px] text-signal">{stage.number}</span>
                  <span className="mt-2 block truncate text-[10px] font-bold uppercase tracking-[.08em] sm:text-xs">{stage.label}</span>
                  <span className="relative mt-3 block h-[2px] overflow-hidden bg-white/20">{index === active && <span key={`${active}-${iteration}`} className="hero-progress absolute inset-y-0 left-0 bg-signal" style={{ animationDuration: `${DURATION}ms`, animationPlayState: playing ? "running" : "paused" }} onAnimationEnd={() => { if (playing) goTo(active + 1); }} />}</span>
                </button>
              ))}
            </div>
            <Link href="/manufacturing" className="group mt-7 inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[.17em] text-white transition hover:text-signal">Discover our process <ArrowUpRight className="text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
}
