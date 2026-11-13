"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

export default function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
  variant = "up",
  repeatOnExit = true,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: ElementType;
  variant?: "up" | "mask" | "scale";
  repeatOnExit?: boolean;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setShown(true);
          else if (repeatOnExit) setShown(false);
        }
        if (!repeatOnExit && entries.some((e) => e.isIntersecting)) io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [repeatOnExit]);

  return (
    <Tag ref={ref} className={`reveal reveal-${variant} ${shown ? "is-in" : ""} ${className}`} style={{ "--d": `${delay}ms` } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
