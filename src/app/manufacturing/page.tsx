import type { Metadata } from "next";
import Image from "next/image";
import { CERTIFICATES, PROCESS_STEPS, QUALITY_FACILITIES, QUALITY_POINTS } from "@/data/content";
import { CtaStrip, PageHero, SectionHead } from "@/components/blocks";
import { Check } from "@/components/Icons";
import Lightbox from "@/components/Lightbox";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Manufacturing Process & Quality Assurance",
  description:
    "From raw-material inspection to hydrostatic testing and third-party final inspection — see how Regent Hitech manufactures ISO 9001:2015 certified industrial valves in Noida.",
  alternates: { canonical: "/manufacturing" },
};

const PHOTOS = [
  { src: "/img/about/regent2.webp", alt: "CNC machining of valve bodies", caption: "CNC machining" },
  { src: "/img/about/regent4.webp", alt: "Valve assembly", caption: "Assembly & fitting" },
  { src: "/img/about/regent1.webp", alt: "Hydrostatic test bench", caption: "Hydrostatic testing" },
];

export default function ManufacturingPage() {
  return (
    <>
      <PageHero eyebrow="Manufacturing & quality" title={<>From casting to <span className="text-signal">certified valve</span></>} crumbs={[{ label: "Manufacturing" }]} image="/img/about/regent3.webp">
        Ten controlled stages, two hydrostatic tests and a documented trail for every valve — so what leaves Noida is what you specified.
      </PageHero>

      {/* Standards */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <SectionHead eyebrow="Standardisation" title="Built to world standards">
            All products are manufactured in accordance with the guidelines set by standardisation institutes worldwide.
          </SectionHead>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["IBR", "Indian Boiler Regulations"],
              ["MSS", "Manufacturers Standardization Society"],
              ["API", "American Petroleum Institute"],
              ["ASME", "American Society of Mechanical Engineers"],
            ].map(([a, b], i) => (
              <Reveal key={a} delay={i * 70}>
                <div className="h-full rounded-sm border border-line bg-white p-6 text-center transition hover:-translate-y-1 hover:border-brand hover:shadow-lg">
                  <p className="font-display text-5xl font-extrabold text-brand">{a}</p>
                  <p className="mt-2 text-sm font-medium text-steel">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process timeline */}
      <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
        <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <SectionHead light eyebrow="Our process" title="Ten stages. Zero shortcuts." center />
          <ol className="relative mx-auto mt-16 max-w-4xl space-y-6 before:absolute before:bottom-4 before:left-[27px] before:top-4 before:w-px before:bg-gradient-to-b before:from-brand before:via-brand/40 before:to-transparent md:before:left-1/2">
            {PROCESS_STEPS.map((s, i) => (
              <Reveal as="li" key={s.title} delay={60} className="relative md:grid md:grid-cols-2 md:gap-14">
                <span className="absolute left-0 top-1 z-10 grid h-14 w-14 place-items-center rounded-full border-4 border-ink bg-signal font-display text-xl font-extrabold md:left-1/2 md:-translate-x-1/2">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className={`ml-20 rounded-sm border border-white/10 bg-white/5 p-6 backdrop-blur md:ml-0 ${i % 2 === 0 ? "md:col-start-1 md:text-right" : "md:col-start-2"}`}>
                  <h3 className="font-display text-2xl font-extrabold uppercase">{s.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-white/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Photos */}
      <section className="py-16 lg:py-20">
        <div className="container-x grid gap-5 md:grid-cols-3">
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={i * 80}>
              <figure className="group relative aspect-[4/3] overflow-hidden rounded-sm shadow-lg">
                <Image src={p.src} alt={p.alt} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent p-5 pt-12 font-display text-xl font-bold uppercase text-white">{p.caption}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quality */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Quality assurance" title="Measured, calibrated, documented">
              REGENT HITECH is dedicated to complete customer satisfaction through consistent product excellence and competitive pricing. Our quality-control team
              monitors production at every stage to ensure defect-free products.
            </SectionHead>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {QUALITY_POINTS.map((q) => (
                <div key={q.label} className="rounded-sm bg-white p-5 ring-1 ring-line">
                  <p className="font-display text-4xl font-extrabold text-brand">{q.value}</p>
                  <p className="mt-1 text-sm text-steel">{q.label}</p>
                </div>
              ))}
            </div>
          </div>
          <Reveal delay={100}>
            <div className="rounded-sm bg-navy p-8 text-white shadow-2xl shadow-navy/30 sm:p-10">
              <h3 className="font-display text-3xl font-extrabold uppercase">Testing &amp; inspection facilities</h3>
              <ul className="mt-6 space-y-4">
                {QUALITY_FACILITIES.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[0.98rem] text-white/85">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-signal text-sm"><Check /></span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Certificates */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Certifications" title="Approvals you can verify" center>
            Click any certificate to enlarge. Copies of current certificates are available on request.
          </SectionHead>
          <div className="mt-12">
            <Lightbox items={CERTIFICATES.map((c) => ({ src: c.src, caption: c.title }))} columns="grid-cols-2 lg:grid-cols-4" aspect="aspect-[3/4]" contain />
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATES.map((c) => (
              <div key={c.title}>
                <p className="font-display text-xl font-bold text-navy">{c.title}</p>
                <p className="mt-1 text-sm text-steel">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip title="Need a documentation pack?" text="Ask for material test certificates, hydro-test reports, CE / PED or IBR documentation with your quote." />
    </>
  );
}
