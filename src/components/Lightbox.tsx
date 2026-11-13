"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight, Close } from "./Icons";

export type LightboxItem = { src: string; caption: string; contain?: boolean };

export default function Lightbox({
  items,
  columns = "sm:grid-cols-2 lg:grid-cols-3",
  aspect = "aspect-[4/3]",
  contain = false,
}: {
  items: LightboxItem[];
  columns?: string;
  aspect?: string;
  contain?: boolean;
}) {
  const [index, setIndex] = useState<number | null>(null);

  const next = useCallback(() => setIndex((i) => (i === null ? i : (i + 1) % items.length)), [items.length]);
  const prev = useCallback(() => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)), [items.length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, next, prev]);

  return (
    <>
      <div className={`grid gap-4 ${columns}`}>
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`group relative overflow-hidden rounded-2xl border border-line bg-mist text-left ${aspect}`}
            aria-label={`Open ${item.caption}`}
          >
            <Image
              src={item.src}
              alt={item.caption}
              fill
              sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
              className={`transition duration-500 group-hover:scale-105 ${contain ? "object-contain p-3" : "object-cover"}`}
            />
            <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-10 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {item.caption}
            </span>
          </button>
        ))}
      </div>

      {index !== null && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/92 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={() => setIndex(null)}>
          <button type="button" onClick={() => setIndex(null)} className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20" aria-label="Close">
            <Close />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 rotate-180 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:left-6"
            aria-label="Previous"
          >
            <ArrowRight />
          </button>
          <figure className="relative h-[80vh] w-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <Image src={items[index].src} alt={items[index].caption} fill sizes="100vw" className="object-contain" priority />
            <figcaption className="absolute -bottom-9 left-0 right-0 text-center text-sm text-white/80">
              {items[index].caption} · {index + 1}/{items.length}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20 sm:right-6"
            aria-label="Next"
          >
            <ArrowRight />
          </button>
        </div>
      )}
    </>
  );
}
