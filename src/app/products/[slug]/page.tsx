import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, getCategory, productsIn } from "@/data/catalog";
import { industryBySlug } from "@/data/content";
import { FaqList, QuoteBand, SectionHead } from "@/components/blocks";
import { ArrowRight, Check, INDUSTRY_ICONS } from "@/components/Icons";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) return {};
  return {
    title: `${c.name} Manufacturer in India`,
    description: `${c.intro.slice(0, 150)}…`,
    alternates: { canonical: `/products/${c.slug}` },
    openGraph: { title: `${c.name} — Regent Hitech`, description: c.short },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = getCategory(slug);
  if (!c) notFound();

  const items = productsIn(c.slug);
  const others = CATEGORIES.filter((o) => o.slug !== c.slug);
  const industries = c.industries.map(industryBySlug).filter((i): i is NonNullable<ReturnType<typeof industryBySlug>> => Boolean(i));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: c.name,
    itemListElement: items.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.name })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="overflow-hidden bg-ink text-white">
        <div className="container-x grid items-stretch gap-0 lg:grid-cols-[1.1fr_.9fr]">
          <div className="flex min-h-[400px] flex-col justify-center py-12 sm:min-h-[460px] sm:py-14 sm:pr-8 lg:min-h-[560px] lg:py-20 lg:pr-16">
            <nav aria-label="Breadcrumb" className="mb-9 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.18em] text-white/50">
              <Link href="/" className="hover:text-white">Home</Link> <span className="text-signal">/</span>
              <Link href="/products" className="hover:text-white">Products</Link> <span className="text-signal">/</span>
              <span className="text-white">{c.name}</span>
            </nav>
            <p className="eyebrow eyebrow-light">{c.tagline}</p>
            <h1 className="mt-6 max-w-[780px] font-display text-[clamp(2.75rem,9vw,6rem)] font-semibold leading-[.92] tracking-[-.04em]">{c.name}<span className="text-signal">.</span></h1>
            <p className="mt-7 max-w-xl border-l-2 border-signal pl-5 text-[16px] leading-[1.75] text-white/70">{c.intro}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href={`/contact?product=${encodeURIComponent(items[0].name)}`} className="btn btn-primary">Request a quote <ArrowRight /></Link>
              <a href="#models" className="btn btn-ghost">Explore {items.length} models</a>
            </div>
          </div>
          <div className="product-tile relative min-h-[360px] overflow-hidden lg:min-h-full">
            <Image src={c.image} alt={c.name} fill priority sizes="(min-width:1024px) 550px, 100vw" className="object-contain p-8 lg:p-12" />
            <span className="absolute bottom-5 right-5 text-[10px] font-bold uppercase tracking-[.15em] text-steel">Regent / Product family</span>
          </div>
        </div>
      </section>

      {/* How it works + features */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">How it works</p>
            <h2 className="h-section mt-3 text-navy">Principle &amp; purpose</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-steel">{c.how}</p>
            <h3 className="mt-8 font-display text-xl font-bold uppercase text-navy">Typical applications</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {c.applications.map((a) => (
                <span key={a} className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-dark">{a}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="rounded-sm bg-mist p-8">
              <h3 className="font-display text-2xl font-extrabold uppercase text-navy">Key features</h3>
              <ul className="mt-5 space-y-3.5">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.98rem] text-navy">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal text-sm text-white"><Check /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Models */}
      <section id="models" className="bg-mist py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow={`${items.length} models`} title={`${c.name} range`}>
            Every model is available with custom sizes, materials and actuation. Request a quote straight from any card.
          </SectionHead>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 4) * 70}>
                <ProductCard product={p} showCategory={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Specs + industries */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="eyebrow">At a glance</p>
            <h2 className="h-section mt-3 text-navy">Specifications</h2>
            <div className="mt-6 overflow-hidden rounded-sm border border-line">
              <dl className="divide-y divide-line">
                {c.specs.map((s) => (
                  <div key={s.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[170px_1fr] sm:gap-6">
                    <dt className="text-sm font-bold uppercase tracking-wide text-steel">{s.label}</dt>
                    <dd className="font-medium text-navy">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-3 text-xs text-steel">Indicative ranges. Final specification is confirmed against your datasheet. All valves follow IBR, MSS, API and ASME guidelines.</p>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Where it works</p>
            <h2 className="h-section mt-3 text-navy">Industries served</h2>
            <div className="mt-6 grid gap-3">
              {industries.map((ind) => {
                const Icon = INDUSTRY_ICONS[ind.icon];
                return (
                  <Link key={ind.slug} href={`/industries#${ind.slug}`} className="group flex items-center gap-4 rounded-sm border border-line p-4 transition hover:border-brand hover:bg-brand-50">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-navy text-2xl text-white"><Icon /></span>
                    <span className="flex-1">
                      <span className="block font-bold text-navy">{ind.name}</span>
                      <span className="block text-sm text-steel">{ind.challenges[0]}</span>
                    </span>
                    <ArrowRight className="text-brand transition group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHead eyebrow="Buying guide" title={`${c.name} FAQ`} />
          <Reveal><FaqList items={c.faq} /></Reveal>
        </div>
      </section>

      {/* Other families */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <h2 className="font-display text-3xl font-extrabold uppercase text-navy">Explore other valve families</h2>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {others.slice(0, 4).map((o) => (
              <Link key={o.slug} href={`/products/${o.slug}`} className="group overflow-hidden rounded-sm border border-line bg-white transition hover:-translate-y-1 hover:border-brand/50 hover:shadow-lg">
                <div className="product-tile relative aspect-[5/4]">
                  <Image src={o.image} alt={o.name} fill sizes="260px" className="object-contain p-4 transition duration-500 group-hover:scale-105" />
                </div>
                <p className="p-4 font-bold text-navy group-hover:text-brand">{o.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <QuoteBand defaultProduct={items[0].name} source={`category:${c.slug}`} />
    </>
  );
}
