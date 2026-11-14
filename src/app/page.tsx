import Image from "next/image";
import Link from "next/link";
import { HOME_FAQ, INDUSTRIES } from "@/data/content";
import { SITE, yearsOfExperience } from "@/lib/site";
import { FaqList, QuoteBand } from "@/components/blocks";
import CountUp from "@/components/CountUp";
import { ArrowRight, ArrowUpRight, INDUSTRY_ICONS } from "@/components/Icons";
import Reveal from "@/components/Reveal";
import VideoPlayer from "@/components/VideoPlayer";
import ProductShowcase from "@/components/ProductShowcase";
import ManufacturingStory from "@/components/ManufacturingStory";
import ReelSection from "@/components/ReelSection";
import ClientMarkets from "@/components/ClientMarkets";

const clients = [
  { name: "NTPC", src: "/img/clients/NTPC.png" },
  { name: "ITC", src: "/img/clients/ITC-Ltd--Bhadrachalam.png" },
  { name: "Dabur", src: "/img/clients/Dabur-India-Limited.png" },
  { name: "Haldiram's", src: "/img/clients/Haldiram-Snacks-Pvt.png" },
  { name: "Avadh Sugar", src: "/img/clients/Avadh-Sugar-&-Energy.png" },
  { name: "Ballarpur", src: "/img/clients/Ballarpur-Industries.png" },
];

const mainIndustries = INDUSTRIES.filter((i) => i.image);
const otherIndustries = INDUSTRIES.filter((i) => !i.image);

export default function HomePage() {
  const years = yearsOfExperience();
  return (
    <>
      {/* Homepage banners paused while the landing hero uses the company video. */}
      {/* <HeroSlider /> */}
      <section className="relative isolate flex h-[min(56.25vw,320px)] min-h-[200px] items-center overflow-hidden bg-ink text-white md:h-auto md:min-h-[720px] lg:min-h-[min(850px,calc(100svh-108px))]">
        <video className="absolute inset-0 -z-10 h-full w-full object-contain object-center md:object-cover" autoPlay muted loop playsInline preload="metadata" aria-hidden="true">
          <source src={SITE.videoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 bg-black/20" aria-hidden="true" />
      </section>

      {/* FACTS — integral to the page rather than floating cards */}
      <section className="bg-ink text-white">
        <div className="container-x grid grid-cols-2 border-x border-white/10 md:grid-cols-4">
          {[
            { n: years, suffix: "+", label: "Years of expertise" },
            { n: 100, suffix: "+", label: "Engineered products" },
            { n: 80, suffix: "+", label: "Team members" },
            { n: 20, suffix: "+", label: "Export countries" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 60} className={`border-r border-white/10 px-3 py-6 last:border-r-0 sm:px-5 sm:py-8 md:px-8 md:py-10 ${i < 2 ? "border-b md:border-b-0" : ""}`}>
              <p className="font-display text-[clamp(2.2rem,4vw,4.7rem)] font-semibold leading-none tracking-tight"><CountUp to={s.n} suffix={s.suffix} /></p>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[.19em] text-white/50">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CUSTOMER MARKS */}
      <section className="border-b border-line bg-white py-8 md:py-11">
        <div className="container-x">
          <Reveal><p className="mb-6 text-center text-[10px] font-extrabold uppercase tracking-[.22em] text-steel">The companies who put our valves to work</p></Reveal>
          <div className="grid grid-cols-3 items-center gap-x-5 gap-y-8 md:grid-cols-6 md:gap-x-10">
            {clients.map((c, i) => (
              <Reveal key={c.name} delay={i * 50} className="relative mx-auto h-16 w-full max-w-[180px] opacity-100 transition duration-300 sm:h-12 sm:max-w-[155px]">
                <Image src={c.src} alt={c.name} fill sizes="(min-width:640px) 155px, 180px" className="object-contain" />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOMEPAGE ABOUT INTRO */}
      <section className="bg-[#f8f7f3] py-16 md:py-24">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <Reveal variant="scale" className="relative min-h-[320px] overflow-hidden bg-ink sm:min-h-[430px]">
              <Image src="/img/about/regent3.webp" alt="Regent Hitech engineers machining industrial valve components" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />
              <span className="absolute bottom-5 left-5 border-l-2 border-signal pl-3 text-[10px] font-bold uppercase tracking-[.16em] text-white">Engineered and tested in Noida, India</span>
            </Reveal>
            <div className="max-w-[650px]">
              <Reveal>
                <p className="eyebrow">About Regent Hitech</p>
                <h2 className="mt-5 font-display text-[clamp(2.2rem,4vw,4rem)] font-semibold leading-[.96] tracking-[-.05em] text-ink">Built on experience.<br /><span className="whitespace-nowrap text-[clamp(1.2rem,3.4vw,3.2rem)] font-light italic text-steel">Made to keep industry moving.</span></h2>
              </Reveal>
              <Reveal delay={100}>
                <p className="mt-7 max-w-xl text-[16px] leading-[1.8] text-steel">Since 1999, Regent Hitech has engineered and manufactured industrial valves for demanding process applications. From design and machining to assembly and pressure testing, our team brings the work together under one roof.</p>
              </Reveal>
              <Reveal delay={170} className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-ink/15 pt-6">
                <div><span className="block font-display text-3xl font-semibold text-ink">100<span className="text-signal">+</span></span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[.15em] text-steel">Engineered products</span></div>
                <div><span className="block font-display text-3xl font-semibold text-ink">20<span className="text-signal">+</span></span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[.15em] text-steel">Export countries</span></div>
                <Link href="/about" className="group inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.16em] text-ink transition hover:text-signal">Get to know Regent <ArrowUpRight className="text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <Reveal><ProductShowcase /></Reveal>
      <Reveal><ReelSection /></Reveal>

      {/* THE REGENT STORY — place, craft, and proof */}
      <section id="our-story" className="relative overflow-hidden bg-[#f8f7f3] pb-20 pt-8 md:pb-28 md:pt-12 lg:pb-36 lg:pt-16">
        <div className="container-x relative">
          <div className="mb-9 flex items-center justify-between gap-6 border-t border-ink/20 pt-5 md:mb-14">
            <p className="eyebrow">02 / The Regent story</p>
            <span className="hidden font-mono text-[10px] uppercase tracking-[.18em] text-steel sm:block">Independent by nature · Indian by origin</span>
          </div>
          <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr] lg:gap-[clamp(3.5rem,7vw,8.5rem)]">
            <Reveal variant="up" className="story-visual relative min-w-0 pb-10 sm:pr-12 sm:pb-14">
              <div className="story-photo relative aspect-[5/5.2] overflow-hidden bg-[#d9d9d2] sm:aspect-[5/5.6] lg:aspect-[5/6]">
                <Image src="/img/about/regent2.webp" alt="Precision machining at the Regent Hitech facility in Noida" fill sizes="(min-width:1024px) 650px, 100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-ink/20" aria-hidden="true" />
                <div className="absolute left-5 top-5 flex items-center gap-3 border border-white/35 bg-ink/65 px-4 py-3 text-[10px] font-bold uppercase tracking-[.17em] text-white backdrop-blur-md sm:left-8 sm:top-8">
                  <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Noida, India <span className="text-white/45">/</span> Est. 1999
                </div>
                <span className="absolute bottom-7 left-6 font-mono text-[10px] uppercase tracking-[.2em] text-white/80 sm:left-8">Inside the Regent workshop</span>
              </div>
              <div className="story-inset absolute bottom-0 right-0 w-[45%] border-[6px] border-[#f8f7f3] bg-ink p-1.5 sm:w-[47%] sm:border-[9px] sm:p-2">
                <div className="relative aspect-[4/3] overflow-hidden"><Image src="/img/about/regent1.webp" alt="Hydrostatic pressure testing of a Regent industrial valve" fill sizes="(min-width:1024px) 300px, 45vw" className="object-cover" /></div>
                <p className="px-2 pb-1 pt-3 font-mono text-[9px] uppercase tracking-[.15em] text-white/70 sm:text-[10px]">02 / Pressure tested</p>
              </div>
            </Reveal>

            <div className="max-w-[610px] lg:py-5">
              <Reveal variant="up" delay={100}>
                <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.17em] text-signal"><span className="h-px w-7 bg-signal" /> A company built on engineering</p>
                <h2 className="mt-6 font-display text-[clamp(2.75rem,4.4vw,5rem)] font-semibold leading-[.95] tracking-[-.052em] text-ink">Rooted here.<br /><span className="text-[.72em] font-light italic text-steel sm:whitespace-nowrap sm:text-[.82em]">Trusted everywhere.</span></h2>
              </Reveal>
              <Reveal delay={180}>
                <p className="mt-9 max-w-[550px] border-l-2 border-signal pl-5 text-[17px] leading-[1.8] text-ink/85">Since 1999, we&apos;ve turned complex flow-control challenges into valves built to work in the real world.</p>
                <p className="mt-6 max-w-[550px] text-[15px] leading-[1.9] text-steel">Regent began with knife gate valves in Noida. Today, our engineers design, machine, assemble and test solutions for power, paper, sugar, cement and chemical plants — with the same hands-on commitment that started it all.</p>
              </Reveal>
              <Reveal delay={250} className="mt-10 grid grid-cols-2 border-y border-ink/20 py-6 sm:mt-12 sm:py-8">
                <div className="border-r border-ink/15 pr-5"><span className="block font-display text-[clamp(2.6rem,4vw,4rem)] font-semibold leading-none tracking-tight text-ink">{years}<span className="text-signal">+</span></span><span className="mt-2 block text-[10px] font-bold uppercase tracking-[.17em] text-steel">Years of expertise</span></div>
                <div className="pl-5 sm:pl-8"><span className="block font-display text-[clamp(2rem,3.5vw,3.4rem)] font-semibold leading-none tracking-tight text-ink">ISO <span className="text-signal">9001</span></span><span className="mt-2 block text-[10px] font-bold uppercase tracking-[.17em] text-steel">2015 certified quality</span></div>
              </Reveal>
              <Reveal delay={320} className="mt-9">
                <Link href="/about" className="group inline-flex items-center gap-5 text-[11px] font-extrabold uppercase tracking-[.17em] text-ink transition hover:text-signal"><span className="story-link-icon grid h-12 w-12 place-items-center rounded-full border border-ink/30 text-lg transition group-hover:border-signal group-hover:bg-signal group-hover:text-white"><ArrowUpRight /></span>Discover our story</Link>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* INDUSTRIES — cinematic image grid */}
      <section className="bg-ink py-20 text-white md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-8 border-t border-white/25 pt-7">
            <div><p className="eyebrow eyebrow-light">03 / Industries we serve</p><h2 className="h-section mt-4 max-w-[800px]">Made for the real world.</h2></div>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">Every process is different. We engineer to the media, the pressure and the challenge — not just the specification sheet.</p>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {mainIndustries.map((ind, i) => {
              const Icon = INDUSTRY_ICONS[ind.icon];
              return (
                <Reveal key={ind.slug} variant="scale" className={i < 2 ? "lg:col-span-3" : "lg:col-span-2"} delay={(i % 3) * 90}>
                  <Link href={`/industries#${ind.slug}`} className={`editorial-image group relative block overflow-hidden bg-navy ${i < 2 ? "h-[310px] md:h-[380px]" : "h-[260px] md:h-[300px]"}`}>
                    <Image src={ind.image!} alt={ind.name} fill sizes={i < 2 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 33vw, 100vw"} className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent transition group-hover:from-ink/95" />
                    <div className="absolute left-6 top-6 grid h-10 w-10 place-items-center border border-white/45 text-xl backdrop-blur-sm"><Icon /></div>
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 md:p-8">
                      <div><p className="mb-1 text-[10px] font-bold uppercase tracking-[.2em] text-white/60">Sector 0{i + 1}</p><h3 className="font-display text-3xl font-semibold leading-none md:text-4xl">{ind.name}</h3></div>
                      <span className="grid h-9 w-9 shrink-0 place-items-center border border-white/60 text-xl transition group-hover:border-signal group-hover:bg-signal"><ArrowUpRight /></span>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/20 pt-7">
            <span className="mr-2 text-[10px] font-bold uppercase tracking-[.16em] text-white/45">Also serving</span>
            {otherIndustries.map((ind) => <Link key={ind.slug} href={`/industries#${ind.slug}`} className="border border-white/25 px-4 py-2 text-xs font-semibold text-white/80 transition hover:border-signal hover:text-white">{ind.name}</Link>)}
            <Link href="/industries" className="ml-auto inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-white hover:text-signal">View all industries <ArrowRight className="text-lg" /></Link>
          </div>
        </div>
      </section>

      <ManufacturingStory />

      {/* QUALITY — a proof point, not another card grid */}
      <section className="relative overflow-hidden bg-[#f3f2ee] py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-12 border-t border-ink/20 pt-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <Reveal className="flex flex-col justify-between">
              <div>
                <p className="eyebrow">05 / Proven quality</p>
                <h2 className="mt-6 font-display text-[clamp(2rem,4vw,4rem)] font-semibold leading-[.95] tracking-[-.052em] text-ink"><span className="sm:whitespace-nowrap">Trust is <span className="font-light italic text-steel">earned.</span></span><br />Then tested.</h2>
                <p className="mt-8 max-w-md text-[16px] leading-[1.8] text-steel">A promise is easy to make. We prefer the evidence: verified materials, calibrated instruments, documented inspections and a pressure test for every valve.</p>
                <Link href="/manufacturing" className="group mt-9 inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[.16em] text-signal">Explore quality &amp; certifications <ArrowUpRight className="text-xl transition group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
              </div>
              <div className="mt-12 flex items-baseline gap-4 border-t border-ink/20 pt-6"><span className="font-display text-[clamp(3.5rem,7vw,7rem)] font-semibold leading-none tracking-[-.07em] text-ink">100<span className="text-signal">%</span></span><span className="max-w-[130px] text-[11px] font-bold uppercase leading-relaxed tracking-[.13em] text-steel">Hydrostatically tested before dispatch</span></div>
            </Reveal>
            <Reveal variant="scale" delay={100} className="relative min-h-[520px] pb-16 sm:pr-20 md:min-h-[660px]">
              <div className="editorial-image relative h-full min-h-[460px] overflow-hidden bg-ink md:min-h-[600px]"><Image src="/img/about/regent1.webp" alt="Hydrostatic pressure testing at Regent Hitech" fill sizes="(min-width:1024px) 700px, 100vw" className="object-cover" /><span className="absolute bottom-5 left-5 border-l-2 border-signal pl-3 text-[10px] font-bold uppercase tracking-[.16em] text-white">Every valve. Every time.</span></div>
              <div className="absolute bottom-0 right-0 hidden h-[280px] w-[205px] border-[10px] border-[#f3f2ee] bg-white p-2 shadow-[0_25px_45px_-18px_rgba(16,25,34,.3)] sm:block md:h-[340px] md:w-[240px]"><div className="relative h-full w-full"><Image src="/img/quality/02.webp" alt="Regent ISO 9001:2015 quality certificate" fill sizes="240px" className="object-contain" /></div></div>
            </Reveal>
          </div>
          <div className="mt-16 grid gap-0 border-y border-ink/20 sm:grid-cols-2 lg:grid-cols-4">
            {[["01", "ISO 9001:2015", "Certified quality management"], ["02", "IBR approved", "Boiler component manufacturing"], ["03", "CE / PED", "International conformity"], ["04", "60+ instruments", "Calibrated for precision"]].map(([number, title, description], i) => (
              <Reveal key={number} delay={i * 80} className="border-b border-ink/15 py-6 pr-5 last:border-b-0 sm:py-8 lg:border-b-0 lg:border-r lg:pl-6 first:lg:pl-0 last:lg:border-r-0">
                <span className="font-mono text-xs text-signal">{number} /</span><h3 className="mt-3 font-display text-2xl font-semibold text-ink">{title}</h3><p className="mt-1 text-[13px] text-steel">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO + HUMAN TOUCH */}
      <section className="relative isolate overflow-hidden bg-mist py-14 md:py-20">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-cover bg-fixed bg-center" style={{ backgroundImage: "url('/img/about/regent4.webp')" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-mist/80" />
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1.15fr_.85fr] lg:gap-20">
          <Reveal variant="scale"><VideoPlayer src={SITE.videoSrc} poster="/img/about/regent2.webp" title="Regent Hitech company film" autoPlay /></Reveal>
          <Reveal delay={80}>
            <p className="eyebrow">People behind the product</p>
            <h2 className="h-section mt-5 text-ink">Engineering is a team sport.</h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-steel">Our engineers and production team bring hands-on experience to every valve. Many have grown with Regent over the years.</p>
            <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[.16em] text-signal transition hover:gap-4">Meet the Regent team <ArrowUpRight className="text-xl" /></Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[.65fr_1.35fr] lg:gap-20">
          <Reveal><div><p className="eyebrow">The essentials</p><h2 className="mt-5 font-display text-[clamp(2rem,3.5vw,3rem)] font-semibold leading-[1.02] tracking-[-.04em] text-ink">Frequently asked<br /><span className="font-light italic text-signal">questions.</span></h2><p className="mt-5 text-sm leading-relaxed text-steel">Need help with a specific application? Talk to our engineering team.</p></div></Reveal>
          <Reveal><FaqList items={HOME_FAQ.slice(0, 5)} /></Reveal>
        </div>
      </section>

      <ClientMarkets />

      <QuoteBand source="home" />
    </>
  );
}
