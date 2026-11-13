"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { PRODUCT_MENU_COLUMNS } from "@/data/catalog";
import { NAV, SITE } from "@/lib/site";
import { ArrowRight, Chevron, Close, Mail, Menu, Phone } from "./Icons";
import Logo from "./Logo";
import EnquiryForm from "./EnquiryForm";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [mega, setMega] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const [mobileProducts, setMobileProducts] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const nextScrolled = window.scrollY > 10;
        setScrolled((current) => current === nextScrolled ? current : nextScrolled);
        const travel = document.documentElement.scrollHeight - window.innerHeight;
        const progress = travel > 0 ? Math.min(1, window.scrollY / travel) : 0;
        if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open || quoteOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open, quoteOpen]);

  useEffect(() => {
    if (!quoteOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setQuoteOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [quoteOpen]);

  if (pathname.startsWith("/admin")) return null;

  const active = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);
  const close = () => { setOpen(false); setMega(false); };

  return (
    <header className="sticky top-0 z-50">
      <div className={`hidden overflow-hidden bg-ink text-[10px] font-semibold uppercase tracking-[.14em] text-white/65 transition-[height,opacity] duration-500 ease-in-out lg:block ${scrolled ? "h-0 opacity-0" : "h-8 opacity-100"}`}>
        <div className="container-x flex h-full items-center justify-between">
          <span>Precision flow control · Noida, India · Since 1999</span>
          <div className="flex items-center gap-8">
            <span>ISO 9001:2015 certified</span>
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 hover:text-white"><Mail className="text-sm text-signal" /> {SITE.email}</a>
            <a href={`tel:${SITE.phones[0].href}`} className="flex items-center gap-2 hover:text-white"><Phone className="text-sm text-signal" /> {SITE.phones[0].label}</a>
          </div>
        </div>
      </div>

      <div className={`relative border-b border-line bg-white transition-shadow ${scrolled ? "shadow-[0_12px_28px_-18px_rgba(16,25,34,.4)]" : ""}`}>
        <div className="container-x flex h-[76px] items-center justify-between gap-6">
          <Link href="/" onClick={close} aria-label="Regent Hitech home" className="shrink-0"><Logo /></Link>

          <nav className="hidden h-full items-center gap-1 xl:flex" aria-label="Primary">
            {NAV.map((item) => item.mega ? (
              <div
                key={item.href}
                className="relative flex h-full items-center"
                onMouseEnter={() => setMega(true)}
                onMouseLeave={() => setMega(false)}
                onFocusCapture={() => setMega(true)}
                onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setMega(false); }}
                onKeyDown={(e) => { if (e.key === "Escape") setMega(false); }}
              >
                <Link href={item.href} onClick={close} className={`flex h-full items-center gap-1.5 border-b-2 px-4 text-[11px] font-extrabold uppercase tracking-[.12em] transition ${active(item.href) || mega ? "border-signal text-ink" : "border-transparent text-navy hover:border-signal hover:text-ink"}`}>
                  {item.label} <Chevron className={`text-sm transition-transform ${mega ? "rotate-180" : ""}`} />
                </Link>
                <div className={`absolute left-0 top-full w-[min(850px,calc(100vw-2rem))] overflow-hidden rounded-b-xl border-t-2 border-signal bg-[linear-gradient(135deg,#192a3e_0%,#142235_100%)] p-3 shadow-[0_28px_60px_-20px_rgba(16,25,34,.7)] transition-all duration-200 ${mega ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0 pointer-events-none"}`}>
                  <div className="grid grid-cols-3 gap-x-2">
                    {PRODUCT_MENU_COLUMNS.map((column, columnIndex) => (
                      <div key={columnIndex} className={`min-w-0 px-1 ${columnIndex > 0 ? "border-l border-white/10 pl-3" : ""}`}>
                        {column.map((entry) => {
                          const isFamilyPage = !entry.href.includes("?");
                          const isActive = isFamilyPage && pathname === entry.href;
                          return (
                            <Link key={entry.href} href={entry.href} onClick={close} className={`group block rounded-md border-l-2 px-3 py-2.5 text-[13px] font-semibold leading-snug transition-all ${isActive ? "border-signal bg-white/10 text-white" : "border-transparent text-white/85 hover:border-signal hover:bg-white/[.07] hover:text-white focus-visible:border-signal focus-visible:bg-white/[.07] focus-visible:text-white focus-visible:outline-none"}`}>
                              {entry.label}
                            </Link>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                  <Link href="/products" onClick={close} className="mt-2 flex items-center justify-end gap-2 border-t border-white/15 px-3 pt-3 text-[10px] font-extrabold uppercase tracking-[.16em] text-white/65 transition hover:text-white">View complete range <ArrowRight /></Link>
                </div>
              </div>
            ) : (
              <Link key={item.href} href={item.href} className={`flex h-full items-center border-b-2 px-4 text-[11px] font-extrabold uppercase tracking-[.12em] transition ${active(item.href) ? "border-signal text-ink" : "border-transparent text-navy hover:border-signal hover:text-ink"}`}>{item.label}</Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setQuoteOpen(true)} className="btn btn-primary hidden !px-5 !py-3 sm:inline-flex">Request a quote <ArrowRight /></button>
            <button type="button" className="grid h-11 w-11 place-items-center border border-line text-2xl text-navy xl:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>{open ? <Close /> : <Menu />}</button>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[2px]" aria-hidden="true">
        <div ref={progressRef} className="h-full origin-left bg-signal" />
      </div>

      <div className={`fixed inset-x-0 bottom-0 top-[76px] z-40 overflow-y-auto bg-white transition-all duration-300 xl:hidden ${open ? "visible translate-x-0 opacity-100" : "invisible translate-x-6 opacity-0 pointer-events-none"}`}>
        <nav className="container-x flex flex-col pb-10 pt-4" aria-label="Mobile">
          {NAV.map((item) => item.mega ? (
            <div key={item.href} className="border-b border-line">
              <button type="button" onClick={() => setMobileProducts((v) => !v)} className="flex w-full items-center justify-between py-5 font-display text-xl font-bold text-navy" aria-expanded={mobileProducts}>Products <Chevron className={`transition-transform ${mobileProducts ? "rotate-180" : ""}`} /></button>
              {mobileProducts && <div className="grid grid-cols-2 gap-2 pb-4">
                {PRODUCT_MENU_COLUMNS.flat().map((entry) => <Link key={entry.href} href={entry.href} onClick={close} className="flex items-center border border-line p-3 text-xs font-semibold leading-snug text-navy transition hover:border-signal hover:text-signal">{entry.label}</Link>)}
                <Link href="/products" onClick={close} className="col-span-2 py-2 text-center text-xs font-extrabold uppercase tracking-widest text-signal">See all valves →</Link>
              </div>}
            </div>
          ) : <Link key={item.href} href={item.href} onClick={close} className={`border-b border-line py-5 font-display text-xl font-bold ${active(item.href) ? "text-signal" : "text-navy"}`}>{item.label}</Link>)}
          <button type="button" onClick={() => { close(); setQuoteOpen(true); }} className="btn btn-primary mt-7">Request a quote <ArrowRight /></button>
          <a href={`tel:${SITE.phones[0].href}`} className="btn btn-outline mt-3"><Phone /> {SITE.phones[0].label}</a>
        </nav>
      </div>

      {quoteOpen && <div className="fixed inset-0 z-[70] grid items-end justify-center bg-ink/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" onMouseDown={(event) => { if (event.target === event.currentTarget) setQuoteOpen(false); }}>
        <section role="dialog" aria-modal="true" aria-labelledby="header-enquiry-title" className="max-h-[92dvh] w-full max-w-2xl overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-white px-5 py-4 sm:px-7">
            <div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-signal">Talk to our team</p><h2 id="header-enquiry-title" className="mt-1 font-display text-2xl font-bold text-ink">Request a quote</h2></div>
            <button type="button" onClick={() => setQuoteOpen(false)} aria-label="Close enquiry form" className="grid h-10 w-10 place-items-center rounded-full border border-line text-xl text-navy transition hover:border-signal hover:text-signal"><Close /></button>
          </div>
          <EnquiryForm source="header-quote" />
        </section>
      </div>}
    </header>
  );
}
