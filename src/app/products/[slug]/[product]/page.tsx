import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "@/components/Icons";
import { QuoteBand } from "@/components/blocks";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, PRODUCTS, categoryName, productDetails } from "@/data/catalog";

function findProduct(familySlug: string, productSlug: string) {
  return PRODUCTS.find((product) => product.category === familySlug && product.slug === productSlug);
}

export function generateStaticParams({ params }: { params: { slug: string } }) {
  return PRODUCTS.filter((product) => product.category === params.slug).map((product) => ({ product: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; product: string }> }): Promise<Metadata> {
  const { slug: familySlug, product: productSlug } = await params;
  const product = findProduct(familySlug, productSlug);
  if (!product) return {};
  return {
    title: `${product.name} | Regent Hitech`,
    description: product.blurb,
    alternates: { canonical: `/products/${familySlug}/${product.slug}` },
    openGraph: { title: `${product.name} — Regent Hitech`, description: product.blurb },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string; product: string }> }) {
  const { slug: familySlug, product: productSlug } = await params;
  const product = findProduct(familySlug, productSlug);
  if (!product) notFound();

  const detail = productDetails(product);
  const family = CATEGORIES.find((item) => item.slug === familySlug);
  const related = PRODUCTS.filter((item) => item.category === familySlug && item.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="overflow-hidden bg-ink text-white">
        <div className="container-x grid min-h-[420px] items-center gap-8 py-12 lg:grid-cols-[1.1fr_.9fr] lg:py-16">
          <div>
            <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/55">
              <Link href="/" className="hover:text-white">Home</Link><span className="text-signal">/</span>
              <Link href="/products" className="hover:text-white">Products</Link><span className="text-signal">/</span>
              <Link href={`/products/${familySlug}`} className="hover:text-white">{categoryName(familySlug)}</Link>
            </nav>
            <p className="eyebrow eyebrow-light">{categoryName(familySlug)}</p>
            <h1 className="mt-5 max-w-3xl font-display text-[clamp(2.5rem,5vw,4.75rem)] font-semibold leading-[.98] tracking-[-.04em]">{product.name}<span className="text-signal">.</span></h1>
            <p className="mt-6 max-w-2xl border-l-2 border-signal pl-5 text-base leading-relaxed text-white/75">{detail.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="btn btn-primary">Request a quote <ArrowRight /></Link>
              <Link href={`/products/${familySlug}#models`} className="btn btn-ghost">Back to {categoryName(familySlug)}</Link>
            </div>
          </div>
          <div className="product-tile relative aspect-[5/4] overflow-hidden">
            <Image src={product.image} alt={product.name} fill priority sizes="(min-width:1024px) 550px, 100vw" className="object-contain p-8 lg:p-12" />
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Product overview</p>
            <h2 className="h-section mt-3 text-navy">Designed for the duty</h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-steel">{detail.intro}</p>
            <h3 className="mt-9 font-display text-2xl font-bold text-navy">Key features</h3>
            <ul className="mt-5 space-y-3">
              {detail.features.map((feature) => <li key={feature} className="flex items-start gap-3 text-[15px] leading-relaxed text-navy"><span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal text-white"><Check /></span>{feature}</li>)}
            </ul>
            <h3 className="mt-9 font-display text-xl font-bold text-navy">Typical applications</h3>
            <div className="mt-4 flex flex-wrap gap-2">{detail.applications.map((application) => <span key={application} className="rounded-full bg-brand-50 px-4 py-1.5 text-sm font-semibold text-brand-dark">{application}</span>)}</div>
          </div>

          <div>
            <p className="eyebrow">At a glance</p>
            <h2 className="h-section mt-3 text-navy">Technical specifications</h2>
            {detail.specsAreFamilyLevel && <p className="mt-3 text-sm leading-relaxed text-steel">The original product page gives these specifications for the {categoryName(familySlug)} family. Confirm the exact model configuration against your datasheet.</p>}
            {detail.note && <p className="mt-3 border-l-2 border-signal bg-mist px-4 py-3 text-sm leading-relaxed text-navy">{detail.note}</p>}
            <div className="mt-6 overflow-hidden border border-line">
              <dl className="divide-y divide-line">
                {detail.specs.map((spec) => <div key={spec.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[170px_1fr] sm:gap-6"><dt className="text-xs font-bold uppercase tracking-wide text-steel">{spec.label}</dt><dd className="font-medium leading-relaxed text-navy">{spec.value}</dd></div>)}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && <section className="bg-mist py-14 lg:py-20"><div className="container-x"><p className="eyebrow">More from this range</p><h2 className="h-section mt-3 text-navy">Related {family?.name ?? "products"}</h2><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{related.map((item) => <ProductCard key={item.slug} product={item} showCategory={false} />)}</div></div></section>}

      <QuoteBand defaultProduct={product.name} source={`product:${product.slug}`} />
    </>
  );
}
