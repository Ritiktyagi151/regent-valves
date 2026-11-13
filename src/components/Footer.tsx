"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CATEGORIES } from "@/data/catalog";
import { SITE, yearsOfExperience } from "@/lib/site";
import { ArrowUpRight, Facebook, Linkedin, Mail, Phone, Pin, Youtube } from "./Icons";
import Logo from "./Logo";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="relative overflow-hidden bg-[#0c151d] text-white/65">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-signal/70 to-transparent" aria-hidden="true" />
      <div className="container-x pb-4 pt-10 md:pb-5 md:pt-14">
        <div className="relative flex flex-col items-start justify-between gap-7 overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(115deg,#192b3e_0%,#142132_65%,#1d2d3e_100%)] p-7 sm:p-9 md:flex-row md:items-center md:p-12">
          <span className="pointer-events-none absolute -right-4 -top-12 font-display text-[clamp(10rem,23vw,20rem)] font-semibold leading-none tracking-[-.09em] text-white/[.025]" aria-hidden="true">R</span>
          <div className="relative"><p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.2em] text-white/50"><span className="h-px w-7 bg-signal" /> The next step is simple</p><h2 className="mt-4 font-display text-[clamp(2.3rem,4.5vw,4.8rem)] font-semibold leading-[.92] tracking-[-.04em] text-white">Let&apos;s get things <span className="text-signal">flowing.</span></h2></div>
          <Link href="/contact" className="btn btn-primary relative shrink-0 !px-7 !py-4">Start your enquiry <ArrowUpRight /></Link>
        </div>
        <div className="grid grid-cols-2 gap-x-5 gap-y-10 border-b border-white/10 py-10 sm:gap-10 lg:grid-cols-[1.25fr_.8fr_.8fr_1fr] lg:gap-12 lg:py-14">
          <div className="col-span-2 lg:col-span-1">
            <Logo light />
            <p className="mt-5 max-w-[300px] text-[13px] leading-[1.8] text-white/50">Precision-engineered industrial valves from Noida, India. {yearsOfExperience()} years of experience; one commitment to dependable flow control.</p>
            <div className="mt-6 flex gap-2">
              {[{ href: SITE.social.facebook, label: "Facebook", Icon: Facebook }, { href: SITE.social.linkedin, label: "LinkedIn", Icon: Linkedin }, { href: SITE.social.youtube, label: "YouTube", Icon: Youtube }].map(({ href, label, Icon }) => <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-lg text-white/65 transition hover:border-signal hover:bg-signal hover:text-white"><Icon /></a>)}
            </div>
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[.2em] text-white/90">Valve solutions</h3>
            <ul className="mt-5 space-y-2.5 text-[13px] sm:text-sm">
              {CATEGORIES.map((c) => <li key={c.slug}><Link href={`/products/${c.slug}`} className="transition hover:text-signal">{c.name}</Link></li>)}
            </ul>
          </div>
          <div className="min-w-0">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[.2em] text-white/90">Company</h3>
            <ul className="mt-5 space-y-2.5 text-[13px] sm:text-sm">
              {[["/about", "Our story"], ["/industries", "Industries"], ["/manufacturing", "Manufacturing"], ["/career", "Careers"], ["/gallery", "Gallery"], ["/products", "All products"], ["/contact", "Contact us"]].map(([href, label]) => <li key={href}><Link href={href} className="transition hover:text-white">{label}</Link></li>)}
            </ul>
          </div>
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-[10px] font-extrabold uppercase tracking-[.2em] text-white/90">Get in touch</h3>
            <ul className="mt-5 space-y-4 text-[13px]">
              <li className="flex gap-3"><Pin className="mt-0.5 shrink-0 text-lg text-signal" /><a href={SITE.mapLink} target="_blank" rel="noreferrer" className="leading-relaxed hover:text-white">{SITE.address.line1}<br />{SITE.address.line2}</a></li>
              <li className="flex gap-3"><Phone className="mt-0.5 shrink-0 text-lg text-signal" /><span>{SITE.phones.map((p) => <a key={p.href} href={`tel:${p.href}`} className="block leading-relaxed hover:text-white">{p.label}</a>)}</span></li>
              <li className="flex min-w-0 gap-3"><Mail className="mt-0.5 shrink-0 text-lg text-signal" /><a href={`mailto:${SITE.email}`} className="min-w-0 break-all hover:text-white">{SITE.email}</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row flex-wrap items-center gap-x-5 gap-y-2 pt-6 text-xs text-white/55 sm:justify-between sm:text-[13px]">
          <p>&copy; All Copyrights Reserved by <a href={SITE.url} className="transition hover:text-white">Regent Hitech Pvt Ltd</a></p>
          <p>&copy; 2024 Designed &amp; Developed By <a href="https://www.jaikviktechnology.com/" target="_blank" rel="noreferrer" className="transition hover:text-white">Jaivik Technology India Pvt Ltd</a></p>
        </div>
      </div>
    </footer>
  );
}
