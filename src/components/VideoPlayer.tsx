"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Play } from "./Icons";

export default function VideoPlayer({ src, poster, title, autoPlay = false }: { src: string; poster: string; title: string; autoPlay?: boolean }) {
  const [playing, setPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  const start = () => {
    setPlaying(true);
    requestAnimationFrame(() => ref.current?.play().catch(() => undefined));
  };

  if (autoPlay) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-2xl shadow-ink/40 ring-1 ring-white/10">
        <video className="h-full w-full object-cover" controls autoPlay muted loop playsInline preload="auto" poster={poster} aria-label={title}>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink shadow-2xl shadow-ink/40 ring-1 ring-white/10">
      {playing ? (
        <video ref={ref} className="h-full w-full" controls autoPlay playsInline preload="auto" poster={poster}>
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <button type="button" onClick={start} className="group absolute inset-0 block h-full w-full" aria-label={`Play video: ${title}`}>
          <Image src={poster} alt="" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
          <span className="absolute inset-0 bg-ink/35 transition group-hover:bg-ink/20" />
          <span className="absolute left-1/2 top-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-signal pl-1 text-3xl text-white shadow-2xl transition group-hover:scale-110 animate-pulse-ring">
            <Play />
          </span>
        </button>
      )}
    </div>
  );
}
