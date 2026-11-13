import type { Metadata } from "next";
import Image from "next/image";
import { INDUSTRIES, MILESTONES } from "@/data/content";
import { SITE, yearsOfExperience } from "@/lib/site";
import { CtaStrip, PageHero, SectionHead } from "@/components/blocks";
import { Award, Check } from "@/components/Icons";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About Regent Hitech — Valve Manufacturer in Noida since 1999",
  description:
    "Regent Hitech Private Limited is a first-generation Indian valve manufacturer headquartered in Noida. Learn about our story, vision, leadership and team.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const years = yearsOfExperience();
  return (
    <>
      <PageHero eyebrow="About us" title={<>Welcome to <span className="text-signal">Regent Hitech</span></>} crumbs={[{ label: "About" }]} image="/img/about/team-member.webp">
        {years} years of precision valve manufacturing — a proudly Indian enterprise at the heart of the country&apos;s engineering hub.
      </PageHero>

      {/* Story */}
      <section className="py-16 lg:py-24">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="h-section mt-3 text-navy">Started with knife gate valves. Grew into a full valve house.</h2>
            <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-steel">
              <p>
                Our journey began in {SITE.founded} as a manufacturer of Knife Gate Valves, and we have since evolved into one of India&apos;s leading manufacturers and
                suppliers of industrial valves. Our flagship products include Knife Gate, Butterfly, Ball, Gate, Globe and Check Valves, plus industrial control valves.
              </p>
              <p>
                We proudly serve top-tier companies across Pulp &amp; Paper, Sugar, Power, Cement, Coal &amp; Mining, Wastewater Treatment, Food Processing, Boiler Systems,
                Pharma and Chemicals.
              </p>
              <p>
                Headquartered in Noida — the engineering hub of the country — we have consistently embraced cutting-edge technology and advanced production methods. Our
                growth is fuelled by robust R&amp;D infrastructure and an unwavering dedication to our customers&apos; diverse needs. As a proudly Indian enterprise, Regent
                exemplifies the strength of indigenous manufacturing.
              </p>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-navy/20">
              <Image src="/img/about/regent3.webp" alt="Regent engineers at a CNC machining centre" fill sizes="(min-width:1024px) 480px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="relative overflow-hidden bg-navy py-20 text-white">
        <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
        <div className="container-x relative grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <p className="eyebrow eyebrow-light">Vision</p>
            <h2 className="h-section mt-3">The most trusted partner for flow control</h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="text-xl leading-relaxed text-white/80">
              We aspire to be the most trusted and reliable partner for industrial flow-control solutions. Our business approach aligns with our core principles of
              quality and innovation, supported by a long-term entrepreneurial vision. We position ourselves as a dynamic and proactive solutions provider, fostering
              lasting and mutually beneficial relationships with our customers.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Milestones */}
      <section className="relative overflow-hidden bg-[#f7f7f5] py-20 lg:py-28">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col justify-between gap-5 border-t border-ink/20 pt-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">Our journey</p>
                <h2 className="mt-4 font-display text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[.9] tracking-[-.055em] text-ink">Milestones<span className="text-signal">.</span></h2>
              </div>
              <p className="max-w-sm pb-1 text-sm leading-relaxed text-steel">From a focused start in Noida to flow-control solutions trusted across industries.</p>
            </div>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {MILESTONES.map((m, i) => (
              <Reveal key={m.year} delay={i * 80} className="h-full">
                <article className="group relative flex h-full min-h-[245px] flex-col border border-ink/15 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-xl hover:shadow-ink/5 sm:p-7">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[.18em] text-steel/70">Chapter 0{i + 1}</span>
                    <span className="h-2 w-2 rounded-full bg-signal transition group-hover:scale-125" />
                  </div>
                  <p className="mt-8 font-display text-[clamp(2.5rem,4vw,3.5rem)] font-extrabold leading-none tracking-[-.045em] text-brand">{m.year}</p>
                  <div className="my-5 h-[2px] w-10 bg-signal transition-all duration-300 group-hover:w-16" />
                  <p className="text-[15px] leading-relaxed text-steel">{m.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-mist py-16 lg:py-24">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-2xl shadow-navy/20">
              <Image src="/img/about/mdsir-2.webp" alt="Mr. Sanjay Mishra, Managing Director" fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <p className="eyebrow">Leadership</p>
            <h2 className="h-section mt-3 text-navy">Mr. Sanjay Mishra</h2>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-brand">Managing Director</p>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-steel">
              A first-generation entrepreneur, Mr. Mishra&apos;s dynamic leadership and commitment to customer satisfaction have been instrumental in Regent&apos;s growth
              story. Under his vision we have built a culture of innovation and excellence — and a workforce where many associates have stayed for decades and grown into
              senior roles.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 lg:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Our team" title="Engineers, operators, inspectors — one team" center>
            Highly qualified engineering graduates with 10–12 years of specialised valve-manufacturing experience, working alongside skilled machine operators, technicians and
            quality-control specialists. This team maintains rigorous standards across every stage of production.
          </SectionHead>
          <Reveal className="mt-12">
            <div className="relative aspect-[16/8] overflow-hidden rounded-sm shadow-2xl shadow-navy/20">
              <Image src="/img/about/team-member.webp" alt="The Regent Hitech team" fill sizes="(min-width:1280px) 1200px, 100vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Awards */}
      <section className="relative overflow-hidden bg-ink py-16 text-white lg:py-24">
        <div className="bg-blueprint absolute inset-0" aria-hidden="true" />
        <div className="container-x relative">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-signal text-2xl"><Award /></span>
            <p className="eyebrow eyebrow-light">Recognition</p>
          </div>
          <h2 className="h-section mt-3">India 5000 MSME awards</h2>
          <p className="mt-4 max-w-2xl text-white/70">Regent Hitech has been honoured on the national MSME stage for manufacturing excellence.</p>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {[
              { src: "/img/about/regent5.webp", alt: "Managing Director receiving an India 5000 MSME award" },
              { src: "/img/about/regent6.webp", alt: "India 5000 MSME awards ceremony" },
            ].map((a) => (
              <Reveal key={a.src}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm ring-1 ring-white/10">
                  <Image src={a.src} alt={a.alt} fill sizes="(min-width:768px) 50vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 lg:py-20">
        <div className="container-x">
          <h2 className="font-display text-3xl font-extrabold uppercase text-navy">Industries we serve</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {INDUSTRIES.map((i) => (
              <p key={i.slug} className="flex items-center gap-2.5 rounded-xl bg-mist px-4 py-3 font-semibold text-navy">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand text-xs text-white"><Check /></span>
                {i.name}
              </p>
            ))}
          </div>
        </div>
      </section>

      <CtaStrip title="Let's build your next flow-control project" text="Talk to the engineers who design, machine and test every Regent valve." />
    </>
  );
}
