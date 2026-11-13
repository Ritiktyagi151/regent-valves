import type { Metadata } from "next";
import { GALLERY } from "@/data/content";
import { CtaStrip, PageHero } from "@/components/blocks";
import Lightbox from "@/components/Lightbox";

export const metadata: Metadata = {
  title: "Gallery — Factory, Team, Awards & Certifications",
  description: "Inside Regent Hitech: CNC machining, hydrostatic testing, valve assembly, the Regent team, MSME awards and quality certifications.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title={<>Inside <span className="text-signal">Regent</span></>} crumbs={[{ label: "Gallery" }]} image="/img/about/regent2.webp">
        Machining, assembly, testing, people and recognition — a look at how Regent valves are made. Click any image to enlarge.
      </PageHero>
      <section className="py-14 lg:py-20">
        <div className="container-x">
          <Lightbox items={GALLERY} columns="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aspect="aspect-[4/3]" />
        </div>
      </section>
      <CtaStrip title="Want to know more?" text="Ask about facility visits, third-party inspection or documentation. Get in touch and our team will help." label="Get in touch" />
    </>
  );
}
