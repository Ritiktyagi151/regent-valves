"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Close, Whatsapp } from "./Icons";
import EnquiryForm from "./EnquiryForm";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-8 right-5 z-[60] flex flex-col items-end gap-3">
      {open && <div className="fixed inset-0 z-50 grid items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="floating-enquiry-title" className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-5 py-4 sm:px-7">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-signal">Talk to our team</p><h2 id="floating-enquiry-title" className="mt-1 font-display text-2xl font-bold text-ink">Request a quote</h2></div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close enquiry form" className="grid h-10 w-10 place-items-center rounded-full border border-line text-xl text-navy transition hover:border-signal hover:text-signal"><Close /></button>
          </div>
          <EnquiryForm source="floating-contact" />
        </section>
      </div>}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close enquiry form" : "Open enquiry form"}
        aria-expanded={open}
        className={`grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl text-white shadow-2xl transition hover:scale-105 ${open ? "" : "animate-pulse-ring"}`}
      >
        {open ? <Close /> : <Whatsapp />}
      </button>
    </div>
  );
}
