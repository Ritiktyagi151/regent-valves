import Link from "next/link";
import { CATEGORIES } from "@/data/catalog";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-navy py-28 text-center text-white">
      <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
      <div className="container-x relative">
        <p className="font-display text-[8rem] font-extrabold leading-none text-stroke sm:text-[12rem]">404</p>
        <h1 className="font-display text-4xl font-extrabold uppercase">This line is closed</h1>
        <p className="mx-auto mt-3 max-w-md text-white/70">The page you&apos;re looking for has been shut off or never existed. Try one of these routes instead.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn btn-primary">Back to home <ArrowRight /></Link>
          <Link href="/products" className="btn btn-ghost">Browse valves</Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-2 text-sm">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/products/${c.slug}`} className="rounded-full border border-white/15 px-4 py-1.5 text-white/80 hover:bg-white/10">
              {c.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
