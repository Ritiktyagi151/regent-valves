import Image from "next/image";
import Reveal from "@/components/Reveal";

const domesticClients = [
  { name: "NTPC", src: "/img/clients/NTPC.png" },
  { name: "ITC", src: "/img/clients/ITC-Ltd--Bhadrachalam.png" },
  { name: "Dabur", src: "/img/clients/Dabur-India-Limited.png" },
  { name: "Haldiram's", src: "/img/clients/Haldiram-Snacks-Pvt.png" },
  { name: "Avadh Sugar & Energy", src: "/img/clients/Avadh-Sugar-&-Energy.png" },
  { name: "Ballarpur Industries", src: "/img/clients/Ballarpur-Industries.png" },
  { name: "Andhra Paper", src: "/img/client-logos/domestic/andhra-paper.png" },
  { name: "Bindal Papers", src: "/img/client-logos/domestic/bindal-paper.png" },
  { name: "Hindustan Bajaj Energy", src: "/img/client-logos/domestic/bajaj-energy.png" },
  { name: "Khanna Paper", src: "/img/client-logos/domestic/khanna-paper.png" },
  { name: "M.P. Power", src: "/img/client-logos/domestic/mp-power.png" },
  { name: "Orient Paper", src: "/img/client-logos/domestic/orient-paper.png" },
  { name: "Simbhaoli Sugars", src: "/img/client-logos/domestic/simbhaoli-sugars.png" },
  { name: "Star Paper Mills", src: "/img/client-logos/domestic/star-paper.png" },
  { name: "Century Pulp & Paper", src: "/img/client-logos/domestic/century-paper.png" },
  { name: "DCM Shriram", src: "/img/client-logos/domestic/dcm-shriram.png" },
  { name: "Jodhani Papers", src: "/img/client-logos/domestic/jodhani-paper.png" },
  { name: "Meja Urja Nigam", src: "/img/client-logos/domestic/meja.png" },
  { name: "NAVA Limited", src: "/img/client-logos/domestic/nava.png" },
  { name: "Satia Industries", src: "/img/client-logos/domestic/satia.png" },
];

const internationalClients = [
  { name: "Bindhyabasini Hydropower Development Company", src: "/img/client-logos/international/bhdc.png" },
  { name: "Emami Paper Mills", src: "/img/client-logos/international/emami-paper.png" },
  { name: "Kibos Sugar", src: "/img/client-logos/international/kibos-sugar.png" },
  { name: "Nithya Packaging", src: "/img/client-logos/international/nithya-packaging.png" },
  { name: "Pulp & Paper", src: "/img/client-logos/international/pulp-paper.png" },
  { name: "Unilever Network", src: "/img/client-logos/international/unilever-network.png" },
  { name: "Union Paper Mills", src: "/img/client-logos/international/union-paper.png" },
];

function ClientLogoGrid({ clients, columns }: { clients: typeof domesticClients; columns: string }) {
  return (
    <div className={`grid min-w-0 ${columns} gap-2 sm:gap-3`}>
      {clients.map((client, index) => (
        <Reveal key={client.name} delay={(index % 8) * 35} className="relative grid h-[72px] min-w-0 place-items-center border border-line bg-white p-2 transition hover:border-ink/30 sm:h-[88px] sm:p-4">
          <Image src={client.src} alt={`${client.name} logo`} fill sizes="(min-width:1280px) 160px, (min-width:640px) 24vw, 44vw" className="object-contain p-3 sm:p-4" />
        </Reveal>
      ))}
    </div>
  );
}

export default function ClientMarkets() {
  return (
    <section className="border-b border-line bg-[#f8f7f3] py-12 sm:py-16 lg:py-20">
      <div className="container-x">
        <div className="mb-8 flex min-w-0 flex-wrap items-end justify-between gap-4 border-t border-ink/20 pt-5 sm:mb-10 md:gap-5 lg:mb-12">
          <div>
            <p className="eyebrow">Our client network</p>
            <h2 className="mt-3 max-w-[18ch] font-display text-[clamp(1.9rem,4vw,4rem)] font-semibold leading-[1.02] tracking-[-.045em] text-ink">Trusted at home and abroad.</h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-steel">A selection of the companies and industrial partners who work with Regent.</p>
        </div>
        <div className="grid min-w-0 items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,.85fr)]">
          <div className="min-w-0 border border-line bg-white/70 p-3 sm:p-5 md:p-6 lg:p-4 2xl:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-display text-2xl font-semibold text-ink">Domestic clients</h3>
              <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel">India</span>
            </div>
            <ClientLogoGrid clients={domesticClients} columns="grid-cols-2 sm:grid-cols-3 2xl:grid-cols-4" />
          </div>
          <div className="min-w-0 border border-line bg-white/70 p-3 sm:p-5 md:p-6 lg:p-4 2xl:p-6">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-4">
              <h3 className="font-display text-2xl font-semibold text-ink">International clients</h3>
              <span className="font-mono text-[10px] uppercase tracking-[.16em] text-steel">Worldwide</span>
            </div>
            <ClientLogoGrid clients={internationalClients} columns="grid-cols-2 sm:grid-cols-3 lg:grid-cols-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
