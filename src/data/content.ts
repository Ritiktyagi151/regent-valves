export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  image?: string;
  icon: "paper" | "power" | "sugar" | "cement" | "chemical" | "mining" | "water" | "food" | "boiler" | "pharma";
  challenges: string[];
  valves: string[];
};

export const INDUSTRIES: Industry[] = [
  {
    slug: "paper",
    name: "Pulp & Paper",
    icon: "paper",
    image: "/img/industries/pepar-industrie.webp",
    blurb: "High-performance valves tailored for pulp and paper processes, keeping stock flowing and minimising downtime through durable, reliable products.",
    challenges: ["Fibrous, high-consistency stock", "Continuous 24×7 operation", "Chemical dosing & bleaching"],
    valves: ["knife-gate", "control", "butterfly"],
  },
  {
    slug: "power",
    name: "Power",
    icon: "power",
    image: "/img/industries/power---plant.webp",
    blurb: "Precision-engineered valves for power plants, delivering safe, efficient and uninterrupted operation under extreme temperature and pressure.",
    challenges: ["High-temperature steam", "Ash & slurry handling", "Zero-leakage isolation"],
    valves: ["gate", "globe", "check", "knife-gate"],
  },
  {
    slug: "sugar",
    name: "Sugar",
    icon: "sugar",
    image: "/img/industries/sugar-industries.webp",
    blurb: "Valves that support efficient sugar production, handling challenging media such as molasses and juice with smooth flow and minimal maintenance.",
    challenges: ["Viscous molasses & syrup", "Bagasse and sludge", "Seasonal, high-duty cycles"],
    valves: ["knife-gate", "butterfly", "gate", "check"],
  },
  {
    slug: "cement",
    name: "Cement",
    icon: "cement",
    image: "/img/industries/cement-industreis.webp",
    blurb: "Robust valves designed to handle abrasive materials in cement production — reliable and durable in high-wear environments.",
    challenges: ["Abrasive powders & clinker dust", "High wear on seats and blades", "Dust-laden environments"],
    valves: ["knife-gate", "butterfly"],
  },
  {
    slug: "chemical",
    name: "Chemical",
    icon: "chemical",
    image: "/img/industries/chemical-industries.webp",
    blurb: "Valves that meet demanding chemical-process requirements — corrosion resistance, safety and reliable performance in aggressive environments.",
    challenges: ["Corrosive acids & alkalis", "Tight shut-off requirements", "Safety-critical service"],
    valves: ["ball", "butterfly", "control", "globe"],
  },
  {
    slug: "coal-mining",
    name: "Coal & Mining",
    icon: "mining",
    blurb: "Heavy-duty knife gate and slurry valves for tailings, coal washery and mineral processing circuits.",
    challenges: ["Abrasive slurries", "Solids-laden tailings", "Remote, heavy-duty sites"],
    valves: ["knife-gate", "check"],
  },
  {
    slug: "wastewater",
    name: "Wastewater Treatment",
    icon: "water",
    blurb: "Sluice, butterfly, knife gate and check valves for municipal and industrial water and wastewater networks.",
    challenges: ["Sludge and grit", "Long service life", "Low-maintenance operation"],
    valves: ["gate", "butterfly", "knife-gate", "check"],
  },
  {
    slug: "food-processing",
    name: "Food Processing",
    icon: "food",
    blurb: "Reliable shut-off and control for process water, syrups, steam and cleaning lines in food and beverage plants.",
    challenges: ["Hygienic process lines", "Steam & hot-water duty", "Frequent cleaning cycles"],
    valves: ["ball", "butterfly", "specialty"],
  },
  {
    slug: "boiler",
    name: "Boiler Systems",
    icon: "boiler",
    blurb: "IBR-compliant boiler valves, safety valves, steam valves and check valves for boiler houses and steam networks.",
    challenges: ["High-pressure steam", "IBR certification", "Safety-critical protection"],
    valves: ["specialty", "globe", "gate", "check"],
  },
  {
    slug: "pharma",
    name: "Pharma",
    icon: "pharma",
    blurb: "Precision ball, butterfly and control valves in stainless steel and PFA-lined options for clean and corrosive pharma utilities.",
    challenges: ["Purity & corrosion resistance", "Accurate dosing control", "Documentation & traceability"],
    valves: ["ball", "butterfly", "control"],
  },
];

export const PROCESS_STEPS = [
  { title: "Standardisation", text: "Every valve follows world standardisation guidelines — Indian Boiler Regulations (IBR), MSS, API and ASME." },
  { title: "Raw-material procurement", text: "Steel castings of various grades, stainless-steel round bars, forgings, fasteners, gaskets and paints are sourced only from approved suppliers." },
  { title: "Incoming inspection", text: "Our QA department checks every casting and rod. Passed material is stamped “INWARD PASSED”; rejects return to the supplier with a G.I.R. note." },
  { title: "Machining", text: "Bodies, bonnets, seats and spindles are machined on centre lathes and CNC, then verified with vernier calipers and micrometers." },
  { title: "In-process hydrostatic test", text: "Bodies and bonnets are pressure-tested on motorised or hand-operated hydrostatic pumps. Any leakage means rejection." },
  { title: "Assembly & lapping", text: "Components are assembled using jigs and fixtures for uniformity and interchangeability, with seats and plugs lapped where required." },
  { title: "Final testing", text: "Each assembled valve is hydrostatically tested again to the relevant standard before moving to finishing." },
  { title: "Finishing & painting", text: "Surfaces are de-burred and ground, primed with red-oxide, filled with high-temperature putty where needed, then painted twice." },
  { title: "Final inspection", text: "QA — or a third-party inspection agency — reconciles serial numbers and in-process quality records for every valve." },
  { title: "Packing & dispatch", text: "Valves are bagged, cased with a packing note and user manual, and dispatched after the dispatch team verifies the purchase order." },
];

export const QUALITY_POINTS = [
  { value: "60+", label: "Calibrated instruments for testing and validation" },
  { value: "100+", label: "Calibrated gauges ensuring precision" },
  { value: "100%", label: "Valves hydrostatically tested before dispatch" },
  { value: "ISO", label: "9001:2015 certified quality management" },
];

export const QUALITY_FACILITIES = [
  "Advanced motorised hydraulic pressure-testing machine",
  "CMM (coordinate measuring machine)",
  "Profile projector & roughness tester",
  "Contour meter & hardness tester",
  "Material Spectrometer",
  "Available for third-party use on a rental basis",
];

export const CERTIFICATES = [
  { src: "/img/quality/02.webp", title: "ISO 9001:2015", text: "Quality management system for manufacture & supply of industrial valves." },
  { src: "/img/quality/01.webp", title: "CE · Pressure Equipment Directive", text: "Conformity declaration for knife gate, butterfly, ball, control, gate, globe & check valves." },
  { src: "/img/quality/03.webp", title: "IBR Certificate", text: "Evaluated and approved as a Class-II Indian Boiler Regulations component manufacturer." },
  { src: "/img/quality/05.webp", title: "MSME Registration", text: "Registered manufacturing enterprise (MSME Udyam)." },
];

export const WHY_US = [
  { title: "Since 1999", text: "A first-generation, Indian-owned manufacturer that started with knife gate valves and grew into a full valve range.", icon: "clock" },
  { title: "In-house R&D", text: "Comprehensive R&D and tooling capability lets us customise size, material, pressure class and actuation.", icon: "gear" },
  { title: "Tested, not assumed", text: "Hydrostatic testing at two stages, 60+ calibrated instruments and third-party inspection support.", icon: "shield" },
  { title: "Engineers, not order-takers", text: "Graduate engineers with 10–12 years in valve manufacturing help you select the right valve.", icon: "users" },
  { title: "One supplier, ten industries", text: "Paper, power, sugar, cement, chemical, mining, water, food, boiler and pharma references.", icon: "factory" },
  { title: "Exporting to 20+ countries", text: "Export-ready packing, documentation and CE / PED conformity for international buyers.", icon: "globe" },
];

export const HOME_FAQ = [
  { q: "What does Regent Hitech manufacture?", a: "We manufacture knife gate, butterfly, ball, gate, globe, check and industrial control valves, along with steam, IBR, safety, piston, needle and pulp valves and Y strainers — over 100 products in total." },
  { q: "Can you supply custom sizes, materials or actuation?", a: "Yes. Custom engineering is a core strength: we build to your pressure class, media, size and actuation (manual, gear, pneumatic, electric or hydraulic) requirements." },
  { q: "Are your products certified?", a: "We are ISO 9001:2015 certified, hold CE / Pressure Equipment Directive conformity, and are an IBR-approved boiler component manufacturer. Every valve follows IBR, MSS, API and ASME guidelines." },
  { q: "Do you export?", a: "Yes — we ship to more than 20 countries with export-grade packing and documentation." },
  { q: "How do I get a quotation?", a: "Use the quote form on this page or call us. Share the valve type, size, pressure class, media and quantity, and our engineering team will respond with a technical-commercial offer." },
  { q: "Do you offer inspection or testing support?", a: "Yes. Valves can be inspected by our QA team or a third-party agency of your choice, and our CMM, profile projector, hardness tester and spectrometer are available on a rental basis." },
];

export const MILESTONES = [
  { year: "1999", text: "Founded in Noida as a knife gate valve manufacturer." },
  { year: "2000s", text: "Expanded into butterfly, ball, gate, globe and check valves for core process industries." },
  { year: "2010s", text: "Built in-house R&D, a motorised hydrostatic test bench and ISO 9001 certified systems." },
  { year: "Today", text: "100+ products, 80+ people, exports to 20+ countries and recognised at the India 5000 MSME awards." },
];

export const GALLERY = [
  { src: "/img/about/regent1.webp", caption: "Hydrostatic pressure-testing bench" },
  { src: "/img/about/regent2.webp", caption: "CNC machining of valve components" },
  { src: "/img/about/regent3.webp", caption: "Precision machining & programming" },
  { src: "/img/about/regent4.webp", caption: "Valve assembly & fitting" },
  { src: "/img/about/regent5.webp", caption: "India 5000 MSME awards" },
  { src: "/img/about/regent6.webp", caption: "India 5000 MSME awards ceremony" },
  { src: "/img/about/team-member.webp", caption: "The Regent Hitech family" },
  { src: "/img/about/mdsir-2.webp", caption: "Mr. Sanjay Mishra, Managing Director" },
  { src: "/img/quality/02.webp", caption: "ISO 9001:2015 certificate" },
  { src: "/img/quality/01.webp", caption: "CE / PED conformity" },
  { src: "/img/quality/03.webp", caption: "IBR certificate" },
  { src: "/img/industries/chemical-industries.webp", caption: "Chemical process plant" },
];

export function industryBySlug(slug: string) {
  return INDUSTRIES.find((i) => i.slug === slug);
}
