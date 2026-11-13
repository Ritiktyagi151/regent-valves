"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight } from "./Icons";

const DURATION = 7200;
const SLIDES = [
  {
    image: "/img/hero-industrial.jpg",
    alt: "Precision industrial valve equipment in a manufacturing facility",
    label: "01 / Industrial flow control",
    chapter: "Engineering",
    titleTop: "Flow.",
    titleBottom: "Under control",
    description: "Precision-engineered industrial valves for the places where performance isn’t optional. Built in India. Trusted around the world.",
    href: "/products",
    action: "Explore our valves",
    detail: "Knife gate · Butterfly · Ball · Control",
  },
  {
    image: "/img/hero-precision.jpg",
    alt: "Precision-machined industrial valve in a manufacturing workshop",
    label: "02 / Made to perform",
    chapter: "Manufacturing",
    titleTop: "Precision.",
    titleBottom: "In every detail",
    description: "From material selection to the final pressure test, every Regent valve is made with purpose, discipline and engineering expertise.",
    href: "/manufacturing",
    action: "How we make it",
    detail: "Engineered · Machined · Tested",
  },
  {
    image: "/img/hero-infrastructure.jpg",
    alt: "Industrial power plant pipe network and valve station at twilight",
    label: "03 / Proven in the field",
    chapter: "Applications",
    titleTop: "Built for",
    titleBottom: "the real world",
    description: "Power. Paper. Sugar. Cement. Chemicals. Wherever flow is critical, our valves are engineered to keep your operation moving.",
    href: "/industries",
    action: "Explore industries",
    detail: "Ten industries · Twenty-plus countries",
  },
] as const;

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [manualPaused, setManualPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [inView, setInView] = useState(true);
  const [interaction, setInteraction] = useState(0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + SLIDES.length) % SLIDES.length);
    setInteraction((value) => value + 1);
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(query.matches);
    updateMotion();
    query.addEventListener("change", updateMotion);
    const onVisibility = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      query.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (!heroRef.current || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.05 });
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  const current = SLIDES[active];
  const next = SLIDES[(active + 1) % SLIDES.length];
  const isPlaying = !paused && !manualPaused && !reducedMotion && visible && inView;

  return (
    <section
      ref={heroRef}
      data-playing={isPlaying}
      aria-label="Regent Hitech featured stories"
      aria-roledescription="carousel"
      className="hero-slider relative isolate flex min-h-[690px] flex-col overflow-hidden bg-ink text-white md:min-h-[760px] lg:min-h-[min(850px,calc(100svh-108px))]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setPaused(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") { event.preventDefault(); goTo(active + 1); }
        if (event.key === "ArrowLeft") { event.preventDefault(); goTo(active - 1); }
      }}
      onTouchStart={(event) => {
        touchStart.current = { x: event.touches[0].clientX, y: event.touches[0].clientY };
      }}
      onTouchEnd={(event) => {
        if (!touchStart.current) return;
        const x = event.changedTouches[0].clientX - touchStart.current.x;
        const y = event.changedTouches[0].clientY - touchStart.current.y;
        if (Math.abs(x) > 55 && Math.abs(x) > Math.abs(y) * 1.4) goTo(active + (x < 0 ? 1 : -1));
        touchStart.current = null;
      }}
    >
      {/* Image scenes stay mounted so crossfades never flash to black. */}
      <div className="absolute inset-0" aria-hidden="true">
        {SLIDES.map((slide, index) => (
          <div key={slide.image} className={`hero-scene absolute inset-0 ${index === active ? "hero-scene-active" : ""}`}>
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              className="hero-scene-image object-cover object-[65%_center]"
            />
          </div>
        ))}
      </div>
      <div className="hero-slider-shade pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="hero-grain pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 left-[7.1%] hidden w-px bg-white/10 2xl:block" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-[7.1%] hidden w-px bg-white/10 2xl:block" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[9%] top-10 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[.22em] text-white/55 lg:flex" aria-hidden="true"><span className="h-px w-8 bg-signal" /> Regent / Field Notes</div>
      <div key={`frame-${active}`} className="hero-frame pointer-events-none absolute bottom-[125px] right-[10%] z-[4] hidden font-display text-[clamp(15rem,30vw,34rem)] font-semibold leading-none tracking-[-.1em] text-white/[.055] xl:block" aria-hidden="true">0{active + 1}</div>

      <div className="container-x relative z-10 flex flex-1 items-center py-20 md:py-24">
        <div key={active} className="hero-copy w-full max-w-[1050px] pb-12 md:pb-7">
          <div className="hero-copy-kicker flex items-center gap-4">
            <span className="h-px w-9 bg-signal" aria-hidden="true" />
            <span className="text-[10px] font-bold uppercase tracking-[.25em] text-white/80 md:text-[11px]">{current.label}</span>
          </div>
          <h1 className="mt-7 font-display text-[clamp(4.2rem,8.5vw,8.9rem)] font-semibold leading-[.84] tracking-[-.058em] md:mt-9">
            <span className="hero-copy-line block">{current.titleTop}</span>
            <span className="hero-copy-line hero-copy-line-two mt-2 block text-white/90">{current.titleBottom}<span className="text-signal">.</span></span>
          </h1>
          <div className="hero-copy-detail mt-9 flex max-w-[700px] flex-col gap-6 md:mt-11 md:flex-row md:items-start md:gap-9">
            <span className="hidden pt-1 font-mono text-xs text-white/40 md:block">R / {String(1 + active).padStart(2, "0")}</span>
            <p className="max-w-[500px] border-l-2 border-signal pl-5 text-[15px] leading-[1.7] text-white/80 md:text-[17px]">{current.description}</p>
          </div>
          <div className="hero-copy-actions mt-9 flex flex-wrap items-center gap-x-7 gap-y-5 md:mt-11">
            <Link href={current.href} className="group inline-flex min-h-14 items-center gap-10 bg-signal px-6 text-[11px] font-extrabold uppercase tracking-[.14em] text-white transition hover:bg-signal-dark">
              {current.action} <ArrowUpRight className="text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
            <Link href="/contact" className="group inline-flex min-h-12 items-center gap-2 border-b border-white/50 text-[11px] font-bold uppercase tracking-[.13em] text-white transition hover:border-signal hover:text-signal">
              Talk to an engineer <ArrowRight className="text-base transition group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Small next-scene preview — deliberately separate from the primary message. */}
      <button
        type="button"
        className="group absolute bottom-[125px] right-[max(5%,3.25rem)] z-10 hidden w-[220px] overflow-hidden border border-white/30 text-left backdrop-blur-md transition hover:border-white lg:block 2xl:right-[10%]"
        onClick={() => goTo(active + 1)}
        aria-label={`Next slide: ${next.chapter}`}
      >
        <div className="relative h-[100px] overflow-hidden">
          <Image src={next.image} alt="" fill sizes="220px" className="object-cover transition duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-ink/20" />
          <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center bg-white text-ink transition group-hover:bg-signal group-hover:text-white"><ArrowUpRight /></span>
        </div>
        <div className="flex items-center justify-between bg-ink/80 px-4 py-3">
          <span className="text-[10px] font-bold uppercase tracking-[.16em] text-white/75">Up next</span>
          <span className="font-display text-lg font-semibold text-white">{next.chapter}</span>
        </div>
      </button>

      {/* Carousel navigation / progress rail. */}
      <div className="relative z-10 border-t border-white/20 bg-[#0d151d]/65 backdrop-blur-xl">
        <div className="container-x grid min-h-[93px] grid-cols-[1fr_auto] items-center gap-5 py-3 md:grid-cols-[130px_1fr_auto] md:gap-10">
          <div className="hidden items-baseline gap-2 whitespace-nowrap font-display md:flex">
            <span className="text-3xl font-semibold">{String(active + 1).padStart(2, "0")}</span>
            <span className="text-base text-white/40">/</span>
            <span className="text-base text-white/40">{String(SLIDES.length).padStart(2, "0")}</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6" role="group" aria-label="Choose a featured story">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.chapter}
                type="button"
                aria-current={index === active ? "true" : undefined}
                aria-label={`Show slide ${index + 1}: ${slide.chapter}`}
                onClick={() => goTo(index)}
                className={`group flex min-w-0 flex-1 flex-col gap-2.5 text-left transition-opacity ${index === active ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
              >
                <span className="flex items-center gap-2 truncate text-[10px] font-bold uppercase tracking-[.11em] sm:text-[11px] sm:tracking-[.16em]">
                  <span className="font-mono text-signal">0{index + 1}</span>
                  <span className="truncate">{slide.chapter}</span>
                </span>
                <span className="relative h-[2px] w-full overflow-hidden bg-white/25">
                  {index === active && <span key={`${active}-${interaction}`} className="hero-progress absolute inset-y-0 left-0 bg-signal" style={{ animationDuration: `${DURATION}ms`, animationPlayState: isPlaying ? "running" : "paused" }} onAnimationEnd={() => { if (isPlaying) goTo(active + 1); }} />}
                </span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => setManualPaused((v) => !v)} className="mr-1 grid h-11 w-11 place-items-center border border-white/30 text-sm text-white transition hover:border-signal hover:bg-signal" aria-label={manualPaused ? "Play slideshow" : "Pause slideshow"} title={manualPaused ? "Play slideshow" : "Pause slideshow"}>{manualPaused ? <span className="pl-0.5">▶</span> : <span className="font-mono tracking-[-.25em] pr-1">Ⅱ</span>}</button>
            <button type="button" onClick={() => goTo(active - 1)} className="grid h-11 w-11 place-items-center border border-white/30 text-lg text-white transition hover:border-signal hover:bg-signal" aria-label="Previous slide"><ArrowRight className="rotate-180" /></button>
            <button type="button" onClick={() => goTo(active + 1)} className="grid h-11 w-11 place-items-center border border-white/30 text-lg text-white transition hover:border-signal hover:bg-signal" aria-label="Next slide"><ArrowRight /></button>
          </div>
        </div>
      </div>
      <span className="sr-only" aria-live={isPlaying ? "off" : "polite"} aria-atomic="true">{`Slide ${active + 1} of ${SLIDES.length}: ${current.titleTop} ${current.titleBottom}`}</span>
    </section>
  );
}
