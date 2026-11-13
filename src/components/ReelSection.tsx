"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { SITE } from "@/lib/site";
import { ArrowUpRight } from "./Icons";

const reels = [
  { title: "On the shop floor", image: "/img/about/regent2.webp", video: true },
  { title: "Precision machining", image: "/img/about/regent3.webp" },
  { title: "Quality testing", image: "/img/about/regent1.webp" },
  { title: "Our people", image: "/img/about/team-member.webp" },
];

export default function ReelSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => undefined);
      else video.pause();
    }, { threshold: 0.35 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden bg-ink py-10 text-white sm:py-14 lg:py-16">
      <div aria-hidden="true" className="absolute inset-0 opacity-15">
        <Image src="/img/about/regent2.webp" alt="" fill sizes="100vw" className="object-cover" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-ink/85" />
      <div className="container-x relative">
        <div className="mb-6 flex items-end justify-between gap-4 border-t border-white/20 pt-5 sm:mb-8">
          <div><p className="eyebrow eyebrow-light">Inside Regent</p><h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">Reels from the shop floor.</h2></div>
          <Link href={SITE.social.youtube} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1 pb-1 text-[10px] font-extrabold uppercase tracking-[.14em] text-white/70 transition hover:text-signal">More <ArrowUpRight /></Link>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {reels.map((reel, index) => (
            <Link key={reel.title} href="/gallery" className="group relative aspect-[9/16] overflow-hidden rounded-sm bg-navy ring-1 ring-white/10" aria-label={`View ${reel.title}`}>
              {reel.video ? (
                <video ref={videoRef} className="absolute inset-0 h-full w-full object-cover" muted loop playsInline preload="none" poster={reel.image} aria-label={reel.title}>
                  <source src={SITE.videoSrc} type="video/mp4" />
                </video>
              ) : (
                <Image src={reel.image} alt={reel.title} fill sizes="(min-width:640px) 25vw, 50vw" className="object-cover transition duration-700 group-hover:scale-105" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/15" />
              <span className="absolute left-3 top-3 font-mono text-[9px] text-white/75">0{index + 1}</span>
              <span className="absolute inset-x-3 bottom-3 font-display text-sm font-bold leading-tight text-white sm:inset-x-4 sm:bottom-4 sm:text-lg">{reel.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
