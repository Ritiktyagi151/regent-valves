import Image from "next/image";
import Link from "next/link";
import { categoryName, type Product } from "@/data/catalog";
import { ArrowUpRight } from "./Icons";

export default function ProductCard({ product, showCategory = true }: { product: Product; showCategory?: boolean }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-line bg-white transition duration-300 hover:border-signal hover:shadow-[0_18px_35px_-25px_rgba(16,25,34,.35)]">
      <div className="product-tile relative aspect-[5/4] overflow-hidden">
        <Image src={product.image} alt={product.name} fill sizes="(min-width:1280px) 300px, (min-width:768px) 33vw, 50vw" className="object-contain p-4 transition duration-500 group-hover:scale-105" />
        {product.classes.length > 0 && <div className="absolute left-4 top-4 flex flex-wrap gap-1">{product.classes.map((c) => <span key={c} className="border border-ink/15 bg-white/85 px-2 py-1 text-[10px] font-bold text-ink backdrop-blur">{c}</span>)}</div>}
      </div>
      <div className="flex flex-1 flex-col p-5 md:p-6">
        {showCategory && <p className="text-[10px] font-bold uppercase tracking-[.16em] text-steel">{categoryName(product.category)}</p>}
        <h3 className="mt-2 font-display text-[21px] font-semibold leading-[1.1] text-ink">{product.name}</h3>
        <p className="mt-3 flex-1 text-[13px] leading-[1.6] text-steel">{product.blurb}</p>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-[10px] font-extrabold uppercase tracking-[.12em]">
          <Link href={`/products/${product.category}/${product.slug}`} className="text-navy transition hover:text-signal">Full details</Link>
          <Link href={`/contact?product=${encodeURIComponent(product.name)}`} className="inline-flex items-center gap-1 text-signal">
            Request quote <ArrowUpRight className="text-lg transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
