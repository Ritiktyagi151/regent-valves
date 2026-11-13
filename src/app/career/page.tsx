import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/blocks";
import { ArrowRight, Check } from "@/components/Icons";
import CareerForm from "@/components/CareerForm";
import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Careers at Regent Hitech",
  description: "Explore career opportunities in industrial valve engineering and manufacturing at Regent Hitech, Noida.",
  alternates: { canonical: "/career" },
};

const values = [
  { title: "Engineering that matters", text: "Work on flow-control products used in demanding industrial processes." },
  { title: "Learn through doing", text: "Build practical skills alongside experienced engineers, machinists and quality teams." },
  { title: "Quality as a team", text: "Contribute at every stage, from material checks and machining to testing and dispatch." },
];

export default function CareerPage() {
  return (
    <>
      <PageHero eyebrow="Careers at Regent" title={<>Build what&apos;s <span className="text-signal">next</span></>} crumbs={[{ label: "Careers" }]} image="/img/about/team-member.webp">
        Join a Noida-based team building industrial flow-control solutions for customers in India and around the world.
      </PageHero>

      <section className="py-14 sm:py-20 lg:py-24">
        <div className="container-x">
          <Reveal>
            <div className="grid gap-6 border-t border-ink/20 pt-6 md:grid-cols-[.9fr_1.1fr] md:gap-12">
              <div>
                <p className="eyebrow">Make an impact</p>
                <h2 className="h-section mt-4 text-ink">Good work is built together.</h2>
              </div>
              <div className="max-w-2xl text-[15px] leading-[1.8] text-steel sm:text-base">
                <p>Regent brings engineering, production and quality teams together to solve real flow-control challenges. We value curiosity, craftsmanship, accountability and a willingness to keep learning.</p>
                <p className="mt-4">We are not listing a specific vacancy right now. If your experience could be a good fit, send us your resume and a short note about the work you are looking for.</p>
              </div>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={index * 70}>
                <article className="h-full border border-line bg-white p-6 sm:p-7">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-50 text-lg text-brand"><Check /></span>
                  <h3 className="mt-5 font-display text-2xl font-bold text-ink">{value.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-steel">{value.text}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-14 sm:py-20">
        <div className="container-x grid items-start gap-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-14">
          <div>
            <p className="eyebrow">Join the team</p>
            <h2 className="h-section mt-4 text-ink">Tell us about yourself.</h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-steel">Share your interests and experience. We&apos;ll keep your details on hand for relevant opportunities.</p>
          </div>
          <CareerForm />
        </div>
      </section>

      <section className="bg-ink py-12 text-white sm:py-16">
        <div className="container-x flex flex-col items-start justify-between gap-6 border-t border-white/20 pt-6 sm:flex-row sm:items-center">
          <div>
            <p className="eyebrow eyebrow-light">Start a conversation</p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Share your profile with us.</h2>
            <p className="mt-2 text-sm text-white/65">Email your resume to <a className="break-all text-white underline decoration-signal underline-offset-4" href={`mailto:${SITE.email}?subject=${encodeURIComponent("Career enquiry - Regent Hitech")}`}>{SITE.email}</a></p>
          </div>
          <Link href="/contact" className="btn btn-primary shrink-0">Contact our team <ArrowRight /></Link>
        </div>
      </section>
    </>
  );
}
