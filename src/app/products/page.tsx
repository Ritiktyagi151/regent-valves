import type { Metadata } from "next";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { CtaStrip, PageHero } from "@/components/blocks";
import ProductExplorer from "@/components/ProductExplorer";

export const metadata: Metadata = {
  title: "Industrial Valves — Knife Gate, Butterfly, Ball, Gate, Globe, Check & Control",
  description:
    "Browse Regent Hitech's industrial valve range: knife gate, butterfly, ball, gate, globe, check, control, steam, IBR and safety valves. Filter by family and pressure class.",
  alternates: { canonical: "/products" },
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string; q?: string }> }) {
  const sp = await searchParams;
  const category = CATEGORIES.some((c) => c.slug === sp.category) ? sp.category! : "all";

  return (
    <>
      <PageHero eyebrow="Product catalogue" title={<>The complete <span className="text-signal">valve range</span></>} crumbs={[{ label: "Products" }]} image="/img/industries/power---plant.webp">
        {PRODUCTS.length} models across {CATEGORIES.length} families — designed, machined, assembled and tested at our Noida facility. Filter by family or pressure class, or search for the
        valve you need.
      </PageHero>
      <section className="py-14 lg:py-20">
        <div className="container-x">
          <ProductExplorer initialCategory={category} initialQuery={sp.q ?? ""} />
        </div>
      </section>
      <CtaStrip title="Can't find the exact valve?" text="We build to custom sizes, materials, pressure classes and actuation. Send us your datasheet and we'll engineer it." />
    </>
  );
}
