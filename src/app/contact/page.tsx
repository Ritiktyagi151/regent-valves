import type { Metadata } from "next";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/blocks";
import EnquiryForm from "@/components/EnquiryForm";
import { Clock, Mail, Phone, Pin, Whatsapp } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description: "Request a valve quotation from Regent Hitech, Noida. Call +91 98110 99567, email info@regentvalves.com or send us your requirement.",
  alternates: { canonical: "/contact" },
};

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ product?: string; industry?: string }> }) {
  const sp = await searchParams;

  const cards = [
    {
      Icon: Pin,
      title: "Visit us",
      body: (
        <a href={SITE.mapLink} target="_blank" rel="noreferrer" className="hover:text-brand">
          {SITE.address.line1}
          <br />
          {SITE.address.line2}
        </a>
      ),
    },
    {
      Icon: Phone,
      title: "Call us",
      body: (
        <>
          {SITE.phones.map((p) => (
            <a key={p.href} href={`tel:${p.href}`} className="block hover:text-brand">
              {p.label}
            </a>
          ))}
        </>
      ),
    },
    {
      Icon: Mail,
      title: "Email",
      body: (
        <a href={`mailto:${SITE.email}`} className="break-all hover:text-brand">
          {SITE.email}
        </a>
      ),
    },
    {
      Icon: Whatsapp,
      title: "WhatsApp",
      body: (
        <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="hover:text-brand">
          Chat with our sales team
        </a>
      ),
    },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title={<>Request a <span className="text-signal">quote</span></>} crumbs={[{ label: "Contact" }]} image="/img/industries/power---plant.webp">
        Tell us about your application — media, size, pressure class and quantity — and our engineers will respond with a technical-commercial offer.
      </PageHero>

      <section className="py-14 lg:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">
              {cards.map(({ Icon, title, body }) => (
                <div key={title} className="rounded-sm border border-line bg-white p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-2xl text-brand">
                    <Icon />
                  </span>
                  <h2 className="mt-4 font-display text-xl font-extrabold uppercase text-navy">{title}</h2>
                  <div className="mt-1 text-sm leading-relaxed text-steel">{body}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 rounded-sm bg-navy p-5 text-white">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/10 text-2xl text-signal">
                <Clock />
              </span>
              <p className="text-sm leading-relaxed text-white/80">
                <strong className="text-white">Urgent requirement?</strong> Call or WhatsApp us directly — every enquiry submitted here also receives a reference number you can quote.
              </p>
            </div>

            <div className="mt-4 overflow-hidden rounded-sm border border-line">
              <iframe
                title="Regent Hitech location map"
                src="https://maps.google.com/maps?q=Regent+Hitech+Pvt+Ltd+A-6+Sector+59+Noida&output=embed"
                className="h-[320px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <EnquiryForm defaultProduct={sp.product ?? ""} defaultIndustry={sp.industry ?? ""} source="contact-page" />
          </div>
        </div>
      </section>
    </>
  );
}
