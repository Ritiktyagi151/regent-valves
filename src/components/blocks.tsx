import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE } from "@/lib/site";
import EnquiryForm from "./EnquiryForm";
import { ArrowUpRight, Check, Mail, Phone, Pin } from "./Icons";
import Reveal from "./Reveal";

export function PageHero({ eyebrow, title, children, image, crumbs }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  image?: string;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <section className="relative min-h-[400px] overflow-hidden bg-ink text-white lg:min-h-[465px]">
      {image && <div className="absolute inset-y-0 right-0 w-full lg:w-[55%]"><Image src={image} alt="" fill priority sizes="(min-width:1024px) 55vw, 100vw" className="object-cover opacity-40 lg:opacity-90" /></div>}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/95 to-ink/30" />
      <div className="container-x relative flex min-h-[400px] flex-col justify-center py-14 lg:min-h-[465px] lg:py-20">
        {crumbs && <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/55">
          <Link href="/" className="hover:text-white">Home</Link>
          {crumbs.map((c) => <span key={c.label} className="flex items-center gap-2"><span className="text-signal">/</span>{c.href ? <Link href={c.href} className="hover:text-white">{c.label}</Link> : <span className="text-white">{c.label}</span>}</span>)}
        </nav>}
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-5 max-w-[900px] font-display text-[clamp(2.75rem,10vw,6.3rem)] font-semibold leading-[.92] tracking-[-.045em]">{title}</h1>
        {children && <div className="mt-7 max-w-xl border-l-2 border-signal pl-5 text-[16px] leading-[1.7] text-white/75">{children}</div>}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, children, light = false, center = false }: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  light?: boolean;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{eyebrow}</p>
      <h2 className={`h-section mt-5 ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {children && <p className={`mt-5 text-[16px] leading-[1.75] ${light ? "text-white/65" : "text-steel"}`}>{children}</p>}
    </Reveal>
  );
}

export function FaqList({ items }: { items: { q: string; a: string }[]; light?: boolean }) {
  return (
    <div className="border-t border-line">
      {items.map((item, i) => <details key={item.q} name="faq" className="group border-b border-line" open={i === 0}>
        <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left font-display text-[20px] font-semibold leading-tight text-ink transition hover:text-brand md:py-6 md:text-[25px]">
          {item.q}
          <span className="faq-plus grid h-8 w-8 shrink-0 place-items-center border border-line text-[22px] font-light leading-none text-signal transition-transform">+</span>
        </summary>
        <div className="faq-answer"><div className="faq-answer-inner"><p className="max-w-2xl pb-6 text-[15px] leading-[1.75] text-steel">{item.a}</p></div></div>
      </details>)}
    </div>
  );
}

export function QuoteBand({ defaultProduct, source = "quote-band" }: { defaultProduct?: string; source?: string }) {
  return (
    <section id="quote" className="relative overflow-hidden bg-ink py-8 text-white sm:py-12 lg:py-14">
      <div className="absolute right-0 top-0 h-full w-[46%] bg-[#192c3f] opacity-50" />
      <div className="container-x relative grid items-start gap-6 lg:grid-cols-[.84fr_1.16fr] lg:gap-10">
        <Reveal className="lg:sticky lg:top-32">
          <p className="eyebrow eyebrow-light">Start a conversation</p>
          <h2 className="mt-4 font-display text-[clamp(2.5rem,4vw,3.8rem)] font-semibold leading-[.95] tracking-[-.045em] text-white">Your process.<br />Our priority<span className="text-signal">.</span></h2>
          <p className="mt-7 max-w-md text-[16px] leading-[1.75] text-white/65">Tell us what you need to control — media, pressure, temperature, size and quantity. We&apos;ll help find the right valve for the job.</p>
          <div className="my-6 h-px w-full max-w-md bg-white/20" />
          <div className="space-y-2.5 text-sm">
            <a href={`tel:${SITE.phones[0].href}`} className="flex items-center gap-4 text-white/85 hover:text-white"><span className="grid h-10 w-10 place-items-center border border-white/25 text-xl text-signal"><Phone /></span>{SITE.phones[0].label}</a>
          <a href={`mailto:${SITE.email}`} className="flex min-w-0 items-center gap-4 text-white/85 hover:text-white"><span className="grid h-10 w-10 shrink-0 place-items-center border border-white/25 text-xl text-signal"><Mail /></span><span className="break-all">{SITE.email}</span></a>
            <a href={SITE.mapLink} target="_blank" rel="noreferrer" className="flex items-center gap-4 text-white/85 hover:text-white"><span className="grid h-10 w-10 shrink-0 place-items-center border border-white/25 text-xl text-signal"><Pin /></span><span>{SITE.address.line1}<br />{SITE.address.line2}</span></a>
          </div>
          <p className="mt-10 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.15em] text-white/45"><Check className="text-signal" /> Custom engineered · Hydrostatically tested · Export ready</p>
        </Reveal>
        <Reveal delay={90}>
          <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/20 pb-4">
            <div><p className="text-[10px] font-bold uppercase tracking-[.2em] text-white/50">Enquiry form / 01</p><h3 className="mt-1 font-display text-2xl font-semibold sm:text-3xl">Request a quotation</h3></div>
            <ArrowUpRight className="hidden text-3xl text-signal sm:block" />
          </div>
          <EnquiryForm compact dark defaultProduct={defaultProduct} source={source} />
        </Reveal>
      </div>
    </section>
  );
}

export function CtaStrip({ title, text, href = "/contact", label = "Request a quote" }: { title: string; text: string; href?: string; label?: string }) {
  return (
    <section className="bg-mist py-16">
      <div className="container-x flex flex-col items-start justify-between gap-7 border-t border-ink/20 pt-7 md:flex-row md:items-end">
        <div><p className="eyebrow">Let's work together</p><h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-none text-ink">{title}</h2><p className="mt-4 max-w-xl text-steel">{text}</p></div>
        <Link href={href} className="btn btn-primary shrink-0">{label} <ArrowUpRight /></Link>
      </div>
    </section>
  );
}
