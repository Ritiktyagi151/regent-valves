import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { categoryName } from "@/data/catalog";
import { INDUSTRIES } from "@/data/content";
import { CtaStrip, PageHero } from "@/components/blocks";
import { ArrowRight, Check, INDUSTRY_ICONS } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Industries We Serve — Paper, Power, Sugar, Cement, Chemical & More",
  description:
    "Regent Hitech supplies valves to Pulp & Paper, Power, Sugar, Cement, Chemical, Coal & Mining, Wastewater, Food Processing, Boiler and Pharma industries.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageHero eyebrow="Industries we cater" title={<>Valves for <span className="text-signal">every process</span></>} crumbs={[{ label: "Industries" }]} image="/img/industries/cement-industreis.webp">
        We proudly serve top-tier companies across ten industries. Each has its own media, pressure and wear challenges — and our valves are engineered around them.
      </PageHero>

      <section className="py-16 lg:py-24">
        <div className="container-x space-y-16 lg:space-y-24">
          {INDUSTRIES.map((ind, i) => {
            const Icon = INDUSTRY_ICONS[ind.icon];
            const flip = i % 2 === 1;
            return (
              <Reveal key={ind.slug} repeatOnExit>
                <article id={ind.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
                  <div className={flip ? "lg:order-2" : ""}>
                    {ind.image ? (
                      <div className="relative aspect-[16/11] overflow-hidden rounded-sm shadow-2xl shadow-navy/20">
                        <Image src={ind.image} alt={ind.name} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
                        <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-xl bg-white text-2xl text-navy shadow-lg"><Icon /></span>
                      </div>
                    ) : (
                      <div className="bg-blueprint relative grid aspect-[16/11] place-items-center overflow-hidden rounded-sm bg-navy shadow-2xl shadow-navy/20">
                        <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-brand/40 blur-[80px]" />
                        <Icon className="relative text-[7rem] text-white/90" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="eyebrow">Industry {String(i + 1).padStart(2, "0")}</p>
                    <h2 className="h-section mt-3 text-navy">{ind.name}</h2>
                    <p className="mt-4 text-[1.05rem] leading-relaxed text-steel">{ind.blurb}</p>
                    <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-steel">Process challenges</h3>
                    <ul className="mt-3 space-y-2">
                      {ind.challenges.map((c) => (
                        <li key={c} className="flex items-center gap-3 font-medium text-navy">
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-brand text-xs text-white"><Check /></span>
                          {c}
                        </li>
                      ))}
                    </ul>
                    <h3 className="mt-6 text-sm font-bold uppercase tracking-[0.14em] text-steel">Recommended valves</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {ind.valves.map((v) => (
                        <Link key={v} href={`/products/${v}`} className="rounded-full border border-line px-4 py-1.5 text-sm font-semibold text-navy transition hover:border-brand hover:bg-brand-50 hover:text-brand">
                          {categoryName(v)}
                        </Link>
                      ))}
                    </div>
                    <Link href={`/contact?industry=${encodeURIComponent(ind.name)}`} className="btn btn-blue mt-8">
                      Discuss your {ind.name.toLowerCase()} project <ArrowRight />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CtaStrip title="Don't see your industry?" text="We engineer to the media and duty, not the industry label. Talk to us about your application." />
    </>
  );
}
