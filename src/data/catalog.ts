export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  blurb: string;
  classes: string[];
};

export type Spec = { label: string; value: string };
export type ProductDetail = {
  intro: string;
  features: string[];
  applications: string[];
  specs: Spec[];
  specsAreFamilyLevel: boolean;
  note?: string;
};

export type Category = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  image: string;
  intro: string;
  how: string;
  features: string[];
  applications: string[];
  specs: { label: string; value: string }[];
  industries: string[];
  faq: { q: string; a: string }[];
};

const img = (id: string) => `/img/products/${id}.webp`;

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[()#/]/g, " ")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function classesOf(name: string): string[] {
  return Array.from(name.matchAll(/(\d{3,4})\s*#/g)).map((m) => `${m[1]}#`);
}

type Raw = [category: string, name: string, imageId: string, blurb: string];

const RAW: Raw[] = [
  // ───────── Knife gate
  ["knife-gate", "Knife Gate Valve (M Series)", "1770107996", "Heavy-duty design for slurry and abrasive media, built for high strength and long service life."],
  ["knife-gate", "Knife Gate Valve (S Series)", "1735043263", "Compact, dependable valve for general industrial flow isolation."],
  ["knife-gate", "Knife Gate Valve Lug Type", "1735043288", "Lug-type body for easy installation and end-of-line maintenance in pipeline systems."],
  ["knife-gate", "Knife Gate Valve (K Series)", "1735043306", "Robust construction engineered for high-pressure and severe service conditions."],
  ["knife-gate", "BI-Directional Knife Gate Valve", "1735043340", "Seals effectively in both flow directions for added operational flexibility."],
  ["knife-gate", "Through Conduit Knife Gate Valve", "1735043400", "Straight-through flow path minimises material build-up and pressure loss."],
  ["knife-gate", "Knife Gate Valve (Deflection Cone)", "1735043417", "Deflection cone redirects flow and reduces blade and seat wear in abrasive duty."],
  ["knife-gate", "Knife Gate Valve (V-Notch Type)", "1735043548", "V-notch port suited to flow regulation where partial opening is needed."],
  ["knife-gate", "Knife Gate Valve (Hand Lever Operated)", "1735043566", "Quick, simple and cost-effective manual isolation with a hand lever."],
  // ───────── Butterfly
  ["butterfly", "High Performance Butterfly Valve", "1735216273", "Offset-disc design for demanding duty, available from 40 mm up to 800 mm."],
  ["butterfly", "PFA Lined Butterfly Valve", "1735216290", "PFA-lined body and disc for corrosive chemical media, typically 50–300 mm."],
  ["butterfly", "Double Flange Butterfly Valve", "1735216308", "Double-flanged body for rigid, leak-tight installation in pipelines."],
  ["butterfly", "Resilient Seated Butterfly Valve", "1770103016", "Resilient seat for bubble-tight shut-off in water, air and general services."],
  // ───────── Ball
  ["ball", "1 Piece Design Ball Valve (150#)", "1770112163", "Economical one-piece body for general on/off service."],
  ["ball", "3 Piece Design Ball Valve (150#)", "1735218026", "Three-piece body allows in-line seat and seal replacement."],
  ["ball", "3 Piece Design Flange End Ball Valve (150# / 300#)", "1735905705", "Flanged-end, three-piece design for on/off isolation in process lines."],
  ["ball", "PFA Lined Flanged Ball Valve (150#)", "1735218070", "PFA-lined flanged ball valve for aggressive, corrosive chemicals."],
  ["ball", "Ball Valve Forged Steel (800#)", "1735218087", "Compact forged-steel ball valve for high-pressure, small-bore lines."],
  // ───────── Gate
  ["gate", "Gate Valve (150# / 300#)", "1770096394", "Flanged gate valve in ASME Class 150 and 300 for general industrial isolation."],
  ["gate", "Gate Valve Forged Steel (800# / 1500# / 2500#)", "1735289214", "Forged-steel gate valves for high-pressure process and steam lines."],
  ["gate", "CI Sluice Gate Valve", "1735289233", "Cast-iron sluice gate valve for water supply and wastewater systems."],
  // ───────── Globe
  ["globe", "ASA Globe Valve (150# / 300#)", "1735548023", "ASA-pattern globe valve for throttling and regulation duty."],
  ["globe", "Globe Valve Forged Steel (800# / 1500# / 2500#)", "1735548043", "Forged-steel globe valve for high-pressure throttling and steam service."],
  ["globe", "DIN Globe Valve", "1735548065", "DIN-pattern globe valve for metric, European-standard pipework."],
  // ───────── Check
  ["check", "Swing Check Valve (150# / 300#)", "1770107023", "Swing-type non-return valve for dependable backflow prevention."],
  ["check", "Wafer Type Check Valve", "1735549107", "Compact wafer check valve that saves space and weight between flanges."],
  ["check", "Dual Plate Check Valve", "1735549186", "Dual-plate wafer check — light, compact and fast-closing."],
  ["check", "Non Slam Disc Check Valve", "1735549170", "Quick-closing disc minimises water hammer and slam on flow reversal."],
  ["check", "Lift Check Valve Forged Steel (800# / 1500# / 2500#)", "1735549080", "Forged-steel lift check valve stops backflow in high-pressure lines."],
  // ───────── Control
  ["control", "Butterfly Control Valve", "1735551074", "High-performance butterfly body with pneumatic actuator and positioner for modulating control."],
  ["control", "Ball Control Valve", "1735551150", "Rotary ball control valve combining tight shut-off with wide rangeability."],
  ["control", "V Notch Ball Control Valve", "1735551172", "V-notch ball characterisation for precise regulation of fibrous and viscous media."],
  ["control", "2 Way Globe Control Valve (150# / 300#)", "1770100549", "Two-way globe control valve for accurate process modulation."],
  // ───────── Specialty
  ["specialty", "Y Strainer (150#)", "1735552555", "Y-type strainer protects pumps, meters and valves from line debris."],
  ["specialty", "Needle Valve", "1735552580", "Fine-adjustment needle valve for precise low-flow and instrument service."],
  ["specialty", "Piston Valve", "1735552604", "Piston valve for steam and abrasive services with long seat life."],
  ["specialty", "Pop Type Safety Valve", "1735552626", "Spring-loaded pop-type safety valve for boiler and pressure-vessel protection."],
  ["specialty", "Pulp Valve", "1750677754", "Valves built for pulp and fibrous stock handling in paper mills."],
  ["specialty", "IBR Valve", "1750680830", "Valves for boiler and steam applications, built to Indian Boiler Regulations."],
  ["specialty", "Forged Steel Valve", "1750682293", "Forged-steel valve range for high-pressure classes from 800# to 2500#."],
  ["specialty", "Steam Valve", "1750682666", "Steam valves engineered for sustained high temperature and pressure."],
];

export const PRODUCTS: Product[] = RAW.map(([category, name, id, blurb]) => ({
  slug: slugify(name),
  name,
  category,
  image: img(id),
  blurb,
  classes: classesOf(name),
}));

// Keep the product dropdown aligned with the product families shown in the catalogue.
// The specialty products share one family page, with a search query selecting each model.
export const PRODUCT_MENU_COLUMNS = [
  [
    { label: "Knife Gate Valve Manufacturer", href: "/products/knife-gate" },
    { label: "Butterfly Valve Manufacturer", href: "/products/butterfly" },
    { label: "Ball Valve Manufacturer", href: "/products/ball" },
    { label: "Gate Valve Manufacturer", href: "/products/gate" },
    { label: "Globe Valve Manufacturer", href: "/products/globe" },
    { label: "Check Valve Manufacturer", href: "/products/check" },
  ],
  [
    { label: "Industrial Control Valve Manufacturer", href: "/products/control" },
    { label: "Y Strainer", href: "/products?category=specialty&q=Y%20Strainer" },
    { label: "Needle Valves", href: "/products?category=specialty&q=Needle%20Valve" },
    { label: "Piston Valves", href: "/products?category=specialty&q=Piston%20Valve" },
    { label: "Pop Type Safety Valves", href: "/products?category=specialty&q=Pop%20Type%20Safety%20Valve" },
    { label: "Pulp Valve Manufacturer", href: "/products?category=specialty&q=Pulp%20Valve" },
  ],
  [
    { label: "Forged Steel Valve Manufacturer", href: "/products?category=specialty&q=Forged%20Steel%20Valve" },
    { label: "IBR Valve Manufacturer", href: "/products?category=specialty&q=IBR%20Valve" },
    { label: "Steam Valve Manufacturer", href: "/products?category=specialty&q=Steam%20Valve" },
  ],
];

export const CATEGORIES: Category[] = [
  {
    slug: "knife-gate",
    name: "Knife Gate Valves",
    short: "Slurry, pulp & powder isolation",
    tagline: "Our founding product — still our flagship.",
    image: img("1735043243"),
    intro:
      "Regent began in 1999 as a knife gate valve manufacturer. Today we build nine knife gate families for slurries, pulp stock, ash, powders and sludge — wherever conventional valves clog or fail.",
    how:
      "A sharp-edged blade moves linearly through the line, cutting through thick or solids-laden media for dependable shut-off. Fully open, the valve offers minimal flow resistance. Knife gate valves are designed for on/off isolation rather than throttling.",
    features: [
      "Blade cuts through fibrous, viscous and solids-laden media",
      "Minimal pressure drop and low maintenance when fully open",
      "Wafer, lug, through-conduit and bi-directional body styles",
      "Handwheel, gear, lever, pneumatic, electric or hydraulic actuation",
      "Custom sizes, materials and actuation on request",
    ],
    applications: ["Mining slurries & tailings", "Pulp & paper stock", "Power-plant ash handling", "Cement powders & bulk solids", "Wastewater & sludge"],
    specs: [
      { label: "Function", value: "On/off isolation (V-notch variant for regulation)" },
      { label: "Body styles", value: "Wafer, lug, through conduit, bi-directional" },
      { label: "Operation", value: "Handwheel · gear · lever · pneumatic · electric · hydraulic" },
      { label: "Materials", value: "Cast iron, carbon steel and stainless steel on request" },
    ],
    industries: ["paper", "power", "cement", "coal-mining", "wastewater", "sugar"],
    faq: [
      { q: "Can a knife gate valve be used for throttling?", a: "Standard knife gate valves are intended for on/off isolation. If you need regulation, our V-Notch type or a control valve from our Industrial Control range is the better fit." },
      { q: "Which knife gate series should I choose?", a: "M Series suits heavy slurry and abrasive duty, S Series covers general isolation, and K Series is built for high-pressure severe service. Send us your media and pressure and we'll recommend one." },
    ],
  },
  {
    slug: "butterfly",
    name: "Butterfly Valves",
    short: "Compact quarter-turn isolation & control",
    tagline: "Light, compact, and built for rugged plant duty.",
    image: img("1735216254"),
    intro:
      "From resilient-seated wafer valves for water services to PFA-lined bodies for aggressive chemicals and high-performance offset designs, our butterfly range covers general isolation through to demanding process duty.",
    how:
      "A disc rotates a quarter turn on a central shaft to open or close the line. The compact face-to-face dimension, low weight and quick operation make butterfly valves a cost-effective choice in larger line sizes.",
    features: [
      "Sizes from 40 mm up to 800 mm in the high-performance range",
      "PFA-lined options for corrosive chemical media",
      "Lever, gear, pneumatic and electric operation",
      "Wafer, lug and double-flange body styles",
      "Control-type versions available with positioners",
    ],
    applications: ["Water & wastewater", "Chemical dosing & transfer", "Air and gas lines", "HVAC & utilities", "Food & pharma process water"],
    specs: [
      { label: "Size range", value: "40 mm – 800 mm (HP range) · 50 – 300 mm (PFA lined)" },
      { label: "Body styles", value: "Wafer, lug, double flange" },
      { label: "Operation", value: "Lever · gear · pneumatic · electric" },
      { label: "Materials", value: "Cast iron, SG iron, carbon & stainless steel" },
    ],
    industries: ["chemical", "wastewater", "food-processing", "pharma", "sugar", "power"],
    faq: [
      { q: "When should I pick a PFA lined butterfly valve?", a: "Choose PFA lined when the media is highly corrosive — acids, alkalis, solvents — where a metal wetted path would degrade. The lining isolates the body and disc from the fluid." },
      { q: "Do you supply automated butterfly valves?", a: "Yes. We supply gear-operated, pneumatic and electric actuated butterfly valves, including control-type units with positioners." },
    ],
  },
  {
    slug: "ball",
    name: "Ball Valves",
    short: "Tight shut-off, 1-piece to 3-piece",
    tagline: "Bubble-tight isolation with low operating torque.",
    image: img("1735218003"),
    intro:
      "Our ball valves span economical one-piece units, serviceable three-piece flanged designs, PFA-lined versions for corrosive media and compact forged-steel valves for high-pressure small-bore lines.",
    how:
      "A bored, rotating ball sits between two seats. A quarter turn aligns the bore with the pipeline for flow or turns it perpendicular to shut off — giving reliable, low-torque, bubble-tight isolation.",
    features: [
      "1-piece, 3-piece and forged-steel (800#) constructions",
      "Flanged, screwed and flange-end connections",
      "PFA-lined flanged option for aggressive chemicals",
      "Manual, pneumatic and electric actuation",
      "In-line serviceable three-piece designs",
    ],
    applications: ["Chemical process lines", "Steam & condensate", "Oil, gas & fuel handling", "Water & utilities", "Pharma & food lines"],
    specs: [
      { label: "Pressure classes", value: "150# · 300# · 800# (forged steel)" },
      { label: "Designs", value: "1 piece · 3 piece · PFA lined · forged" },
      { label: "Connections", value: "Screwed, flanged" },
      { label: "Materials", value: "WCB, CF8 / CF8M, forged carbon & stainless steel" },
    ],
    industries: ["chemical", "pharma", "food-processing", "boiler", "power"],
    faq: [
      { q: "What's the benefit of a 3-piece ball valve?", a: "The body splits so seats and seals can be replaced without removing the valve from the pipeline — ideal for lines that need long-term maintainability." },
    ],
  },
  {
    slug: "gate",
    name: "Gate Valves",
    short: "Full-bore isolation, flanged & forged",
    tagline: "Straight-through flow for dependable isolation.",
    image: img("1735289179"),
    intro:
      "Our gate valves cover ASME Class 150/300 flanged valves, high-pressure forged-steel valves up to 2500#, and cast-iron sluice gate valves for water and wastewater systems.",
    how:
      "A wedge or gate moves perpendicular to the flow to start or stop it. Fully open, gate valves offer an unobstructed bore and very low pressure drop; they are best used fully open or fully closed.",
    features: [
      "Class 150 / 300 flanged and 800 / 1500 / 2500# forged-steel options",
      "CI sluice gate valves for municipal & wastewater lines",
      "Low pressure drop when fully open",
      "Rising and non-rising stem options",
      "Built to MSS, ASME, API and IBR guidelines",
    ],
    applications: ["Boiler & steam systems", "Process isolation", "Water supply networks", "Refinery & petrochemical utilities", "Firewater & utility lines"],
    specs: [
      { label: "Pressure classes", value: "150# · 300# · 800# · 1500# · 2500#" },
      { label: "Types", value: "Flanged gate, forged-steel gate, CI sluice gate" },
      { label: "Operation", value: "Handwheel · gear · electric" },
      { label: "Materials", value: "Cast iron, cast steel, forged steel" },
    ],
    industries: ["power", "boiler", "wastewater", "chemical", "sugar"],
    faq: [
      { q: "Can gate valves be used for flow regulation?", a: "Gate valves are designed for isolation and should be operated fully open or fully closed. For regulation we recommend a globe or control valve." },
    ],
  },
  {
    slug: "globe",
    name: "Globe Valves",
    short: "Throttling & regulation, ASA / DIN / forged",
    tagline: "Precise throttling, positive shut-off.",
    image: img("1735548023"),
    intro:
      "Regent globe valves are available in ASA and DIN patterns plus forged-steel designs up to 2500# — suited to throttling, regulation and steam duty.",
    how:
      "A plug moves along the flow axis onto a seat, providing fine flow adjustment and tight shut-off. The S-shaped flow path creates higher pressure drop than a gate valve, which is what gives globe valves their excellent regulating ability.",
    features: [
      "ASA (150# / 300#), DIN and forged-steel (800–2500#) options",
      "Excellent throttling control and positive shut-off",
      "Renewable seats and plugs",
      "Suitable for steam, water, oil and gas",
      "Outside-screw-and-yoke construction",
    ],
    applications: ["Steam lines", "Boiler feed & blowdown", "Cooling-water regulation", "Fuel and oil systems", "Process bypass lines"],
    specs: [
      { label: "Standards", value: "ASA / ASME pattern · DIN pattern" },
      { label: "Pressure classes", value: "150# · 300# · 800# · 1500# · 2500#" },
      { label: "Operation", value: "Handwheel · gear · electric" },
      { label: "Materials", value: "Cast steel, forged carbon & stainless steel" },
    ],
    industries: ["power", "boiler", "chemical", "sugar", "paper"],
    faq: [
      { q: "Globe or gate — which one?", a: "Choose a globe valve when you need to throttle or regulate flow; choose a gate valve for full-bore on/off isolation with lower pressure drop." },
    ],
  },
  {
    slug: "check",
    name: "Check Valves",
    short: "Swing, wafer, dual-plate & non-slam",
    tagline: "Automatic backflow protection, no operator needed.",
    image: img("1735549059"),
    intro:
      "A complete non-return range: swing check, wafer, dual-plate, non-slam disc and forged-steel lift check valves to protect pumps and pipelines from reverse flow.",
    how:
      "Flow keeps the disc open; when flow stops or reverses, the disc closes automatically. Non-slam and dual-plate designs close quickly to reduce water hammer and pressure surges.",
    features: [
      "Swing check in Class 150 / 300",
      "Wafer, dual-plate and non-slam disc designs",
      "Forged-steel lift check for 800–2500#",
      "Compact, lightweight wafer options",
      "Quick closing to limit water hammer",
    ],
    applications: ["Pump discharge protection", "Boiler feed lines", "Water & wastewater networks", "Process & utility lines", "Compressor outlets"],
    specs: [
      { label: "Pressure classes", value: "150# · 300# · 800# · 1500# · 2500#" },
      { label: "Types", value: "Swing · wafer · dual plate · non-slam · lift" },
      { label: "Operation", value: "Self-acting (no external actuation)" },
      { label: "Materials", value: "Cast iron, cast steel, forged steel" },
    ],
    industries: ["power", "boiler", "wastewater", "sugar", "chemical"],
    faq: [
      { q: "How do I reduce water hammer?", a: "Use a non-slam disc or dual-plate check valve — both close quickly before reverse flow builds up, limiting surge pressures." },
    ],
  },
  {
    slug: "control",
    name: "Industrial Control Valves",
    short: "Pneumatic modulating valves",
    tagline: "Accurate process control, delivered with the right actuator.",
    image: img("1735551057"),
    intro:
      "Butterfly, ball, V-notch ball and two-way globe control valves with pneumatic actuators and positioners — engineered for precise modulation across process industries.",
    how:
      "A control valve modulates flow in response to a signal from your control system. A pneumatic actuator, fed by a positioner, moves the closure element to hold the process variable at set-point.",
    features: [
      "Butterfly, ball, V-notch ball and 2-way globe styles",
      "ANSI Class 150 standard, Class 300 on request",
      "Pneumatic actuators with smart/analog positioners",
      "Fail-open / fail-close configurations",
      "Suitable for water, gas, steam and chemicals",
    ],
    applications: ["Pressure & level control", "Pulp consistency control", "Steam & temperature control", "Chemical dosing", "Utility distribution"],
    specs: [
      { label: "Pressure classes", value: "ANSI 150# (300# on request)" },
      { label: "Styles", value: "Butterfly · ball · V-notch ball · 2-way globe" },
      { label: "Actuation", value: "Pneumatic with positioner (typical air supply 5–7 kg/cm²)" },
      { label: "Finish", value: "Polished / painted as per specification" },
    ],
    industries: ["paper", "power", "chemical", "sugar", "pharma"],
    faq: [
      { q: "What do you need to size a control valve?", a: "Media, flow range (min / normal / max), inlet & outlet pressure, temperature and the signal type (4–20 mA). Share these in an enquiry and we'll propose a valve and actuator." },
    ],
  },
  {
    slug: "specialty",
    name: "Specialty & Process Valves",
    short: "Steam, IBR, safety, strainers & more",
    tagline: "The supporting cast every plant depends on.",
    image: img("1735552604"),
    intro:
      "Beyond our core ranges, Regent manufactures steam valves, IBR-certified boiler valves, pop-type safety valves, piston valves, needle valves, Y strainers and pulp valves.",
    how:
      "These valves are application-specific: protecting boilers, conditioning steam, filtering line debris or handling fibrous pulp. Tell us your duty conditions and we'll recommend the right product.",
    features: [
      "IBR-compliant boiler and steam valves",
      "Pop-type safety valves for pressure protection",
      "Piston valves for steam and abrasive service",
      "Y strainers and needle valves for line protection and fine control",
      "Pulp valves designed for fibrous stock",
    ],
    applications: ["Boiler houses", "Steam distribution", "Pulp & paper mills", "Instrument & sampling lines", "Pump protection"],
    specs: [
      { label: "Compliance", value: "IBR · MSS · API · ASME guidelines" },
      { label: "Pressure classes", value: "150# to 2500# depending on product" },
      { label: "Types", value: "Steam, IBR, safety, piston, needle, Y strainer, pulp" },
      { label: "Materials", value: "Cast steel, forged steel, stainless steel" },
    ],
    industries: ["boiler", "power", "paper", "sugar", "chemical"],
    faq: [
      { q: "Are your boiler valves IBR certified?", a: "Yes — Regent is an IBR-recognised manufacturer of boiler components. Specify IBR on your enquiry and we will supply with the appropriate certification." },
    ],
  },
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function productsIn(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function categoryName(slug: string) {
  return getCategory(slug)?.name ?? slug;
}

const MODEL_DETAIL: Record<string, { intro: string; specs: Spec[]; features?: string[]; applications?: string[]; note?: string }> = {
  "high-performance-butterfly-valve": {
    intro: "RH Series, double-offset wafer butterfly valve for high-performance isolation or control. The source lists lever, gear and pneumatic operation, plus optional control service.",
    specs: [
      { label: "Model", value: "RH Series" }, { label: "Size", value: "40–800 mm" },
      { label: "Design", value: "Wafer type, double eccentric disc" }, { label: "Body", value: "ASTM A216 WCB / ASTM A351 CF8 / CF8M" },
      { label: "Disc", value: "ASTM A351 CF8 / CF8M" }, { label: "Seat", value: "PTFE; metal to metal on request" },
      { label: "Temperature", value: "180°C soft seated; up to 600°C metal seated" }, { label: "Pressure", value: "PN 10 / PN 16; Class 300 on request" },
      { label: "Actuator", value: "Double rack-and-pinion pneumatic; 5 kg/cm² normal, 7 kg/cm² maximum; ISO 5211" },
    ],
    features: ["Double-offset disc reduces seat friction and wear", "Soft or metal seat options", "Manual, pneumatic or control operation"],
  },
  "pfa-lined-butterfly-valve": {
    intro: "PFA model, short wafer, centric-disc butterfly valve with a PFA-lined body for corrosive service.",
    specs: [
      { label: "Model", value: "PFA" }, { label: "Size", value: "50–300 mm" }, { label: "Body", value: "SG iron / WCB / CF8 / CF8M" },
      { label: "Disc", value: "WCB / CF8 / CF8M" }, { label: "Seat / sleeve", value: "PTFE seat; PFA sleeve" },
      { label: "Temperature", value: "Up to 200°C, depending on material" }, { label: "Pressure", value: "PN 6 / PN 10" },
      { label: "Standards", value: "API 609 Category A / API 598" }, { label: "Operation", value: "Lever / gear / pneumatic; ISO 5211 actuator mounting" },
    ],
    features: ["PFA wetted lining for chemical resistance", "Tight shut-off", "Quarter-turn operation"],
    applications: ["Chemical processing", "Water treatment", "Pharmaceuticals", "Pulp and paper"],
  },
  "double-flange-butterfly-valve": {
    intro: "DFBFV series, short wafer-style centric-disc valve with a double-flanged body for pipeline mounting.",
    specs: [
      { label: "Model", value: "DFBFV" }, { label: "Size", value: "80–800 mm" },
      { label: "Body", value: "Cast iron / cast steel / CF8 / CF8M / CF3M" }, { label: "Disc", value: "Cast steel / CF8 / CF8M / CF3M" },
      { label: "Seat", value: "Nitrile / EPDM" }, { label: "Pressure", value: "PN 10 / PN 16" },
      { label: "End connection", value: "Double flange, ASME B16.5 / B16.47 Class 150" },
      { label: "Operation", value: "Lever / gear / pneumatic; quarter-turn" },
    ],
    features: ["Double-flanged connection", "Centric disc with single-piece lined body", "Manual or pneumatic actuation"],
    applications: ["Water treatment", "Power generation", "Oil and gas", "Marine", "HVAC"],
  },
  "resilient-seated-butterfly-valve": {
    intro: "RE Series resilient-seated butterfly valve with a replaceable liner and centric disc.",
    specs: [
      { label: "Model", value: "RE Series" }, { label: "Size", value: "40–600 mm" },
      { label: "Design / testing", value: "API 609 / API 598" }, { label: "Pressure", value: "PN 10 / PN 16" },
      { label: "Temperature", value: "Up to 200°C" }, { label: "Body", value: "Cast iron" },
      { label: "Disc", value: "CF8 / CF8M" }, { label: "Stem", value: "SS 410 / SS 304 / SS 316" },
      { label: "Seat", value: "EPDM / Viton / silicone" }, { label: "Operation", value: "Lever / gear / on-off / control" },
    ],
    features: ["Replaceable resilient liner", "Centric disc", "Tight shut-off with low operating torque"],
    applications: ["Water distribution", "Wastewater", "HVAC", "Chemical processing", "Power generation"],
  },
  "needle-valve": {
    intro: "NVHP high-pressure needle valve for fine adjustment of oil, gas, air or water flow.",
    specs: [
      { label: "Model", value: "NVHP" }, { label: "Size", value: "10–50 mm" }, { label: "Body / bonnet", value: "Forged SS 304 / SS 316" },
      { label: "Leakage", value: "Bubble tight" }, { label: "Temperature", value: "Up to 350°C" },
      { label: "Pressure", value: "Up to 350 kg/cm²" }, { label: "End connection", value: "Screwed end, BSP" },
      { label: "Media", value: "Oil / gas / air / water" },
    ],
    features: ["Fine low-flow adjustment", "Compact forged construction", "Screwed BSP connection"],
    applications: ["Chemical processing", "Oil and gas", "Laboratory lines", "Water treatment", "HVAC"],
  },
  "piston-valve": {
    intro: "PV piston valve for steam, thermic fluids and other demanding services, with a stated Class VI leakage rating.",
    specs: [
      { label: "Model", value: "PV" }, { label: "Body / bonnet", value: "Forged steel / WCB" },
      { label: "Leakage", value: "Class VI, FCI 70-2" }, { label: "Temperature", value: "Up to 400°C maximum" },
      { label: "Pressure", value: "Up to 40 kg/cm²" }, { label: "Piston", value: "ASTM A351 CF8 / CF8M" },
      { label: "Spindle", value: "SS 304" }, { label: "Face-to-face", value: "ASME B16.10 Class 150 / IEC 2001 PN 40" },
      { label: "End connection", value: "Screwed / butt weld / socket weld / flanged 150#" },
      { label: "Media", value: "Steam / thermic fluids / acids / gases / vacuum" },
    ],
    features: ["Piston closure for tight sealing", "Manual or automatic operation", "Suitable for high pressure and temperature"],
  },
  "pop-type-safety-valve": {
    intro: "PTSV pop-type safety valve releases excess pressure rapidly and reseats as system pressure returns to a safe range.",
    specs: [
      { label: "Model", value: "PTSV" }, { label: "Size", value: "15–100 mm" }, { label: "Body / bonnet", value: "WCB / CF8 / CF8M" },
      { label: "Seat", value: "Metal to metal" }, { label: "Temperature", value: "Up to 300°C" }, { label: "Pressure", value: "0–20 bar" },
      { label: "End connection", value: "Screwed BSP (NPT on request) / flanged 150#" }, { label: "Service", value: "Water / steam / oil" },
    ],
    features: ["Rapid pop action at set pressure", "Automatic reseating", "Set pressure can be adjusted"],
    applications: ["Boilers", "Pressure vessels", "Oil and gas", "Chemical processing", "Compressed air"],
  },
  "y-strainer-150": {
    intro: "Y-type strainer for removing pipeline debris before it reaches pumps, meters and valves.",
    specs: [
      { label: "Size", value: "15–300 mm" }, { label: "Body", value: "WCB / CF8 / CF8M" }, { label: "Screen", value: "SS 304, 40 mesh" },
      { label: "Seat seal", value: "PTFE" }, { label: "Temperature", value: "Up to 180°C" }, { label: "Working pressure", value: "Up to 15 kg" },
      { label: "Connections", value: "Flanged and screwed options" },
    ],
    features: ["Y-shaped, two-way strainer body", "Removable screen for cleaning", "Protects downstream equipment from rust and dirt"],
  },
  "1-piece-design-ball-valve-150": {
    intro: "BV-1P/D one-piece, full-bore screwed-end ball valve with a floating ball and blow-out-proof stem.",
    specs: [{ label: "Model", value: "BV-1P/D" }, { label: "Size", value: "6–80 mm" }, { label: "Body", value: "CF8 / CF8M / CF3M" }, { label: "Ball", value: "AISI 304 / 316 / 316L" }, { label: "Seat", value: "PTFE" }, { label: "Temperature", value: "Up to 180°C" }, { label: "Pressure", value: "Class 150" }, { label: "Design / testing", value: "BS 5351 (BS EN ISO 17292) / BS 6755 Part I" }, { label: "End connection", value: "Screwed BSP / BSPT / NPT" }, { label: "Operation", value: "Lever" }],
    features: ["Compact one-piece investment-cast body", "Full bore and floating ball", "Soft seat and blow-out-proof stem"],
  },
  "3-piece-design-ball-valve-150": {
    intro: "BV-3P/D three-piece ball valve for inline service, with screwed or socket-weld connections.",
    specs: [{ label: "Model", value: "BV-3P/D" }, { label: "Size", value: "15–80 mm" }, { label: "Body", value: "WCB / CF8 / CF8M / CF3M" }, { label: "Ball", value: "AISI 304 / 316 / 316L" }, { label: "Seat seal", value: "PTFE / GFT" }, { label: "Temperature", value: "Up to 180–230°C" }, { label: "Pressure", value: "Class 150" }, { label: "Design / test", value: "BS 5351 (BS EN ISO 17292) / BS 6755 Part I" }, { label: "End connection", value: "BSP / BSPT / NPT screwed; socket weld" }, { label: "Operation", value: "Lever / pneumatic / control" }],
    features: ["Three-piece body enables in-line servicing", "Full bore with floating ball", "Screwed and socket-weld connection options"],
  },
  "3-piece-design-flange-end-ball-valve-150-300": {
    intro: "BV-3P/D flanged three-piece ball valve with full bore, floating ball and blow-out-proof stem.",
    specs: [{ label: "Model", value: "BV-3P/D" }, { label: "Size", value: "15–250 mm" }, { label: "Body", value: "WCB / CF8 / CF8M / CF3M" }, { label: "Ball", value: "AISI 304 / 316 / 316L" }, { label: "Seat seal", value: "PTFE / GFT" }, { label: "Temperature", value: "Up to 180–230°C" }, { label: "Pressure", value: "Class 150 / 300" }, { label: "Design / test", value: "BS 5351 (BS EN ISO 17292) / BS 6755 Part I" }, { label: "End connection", value: "ASME B16.5 RF, Class 150 / 300" }, { label: "Operation", value: "Lever / gear / pneumatic / control" }],
    features: ["Serviceable three-piece body", "Full bore and floating ball", "Flanged ends for ASME piping"],
  },
  "ball-valve-forged-steel-800": {
    intro: "Hand-lever operated forged three-piece ball valve with solid ball, for 800-class service.",
    specs: [{ label: "Size", value: "15–50 mm (½–2 in)" }, { label: "Construction", value: "Bolted, three-piece design" }, { label: "Materials", value: "A105N / F304 / F316" }, { label: "Pressure rating", value: "ASME Class 800" }, { label: "Pressure / temperature", value: "ASME B16.34" }, { label: "Design standard", value: "BS EN ISO 17292" }, { label: "Testing standard", value: "BS 12266-1" }, { label: "End connections", value: "Screwed / socket weld / butt weld" }, { label: "Operation", value: "Lever" }],
    features: ["Forged construction for high-pressure duty", "Solid ball and three-piece body", "Screwed, socket-weld and butt-weld ends"],
  },
  "gate-valve-150-300": {
    intro: "Flanged cast-steel gate valve for on-off flow isolation. The source specifies handwheel or gear operation and API 600 design.",
    specs: [{ label: "Size", value: "25–800 mm" }, { label: "Class", value: "150 / 300" }, { label: "Body / bonnet", value: "ASTM A216 WCB / CF8 / CF8M" }, { label: "Trim", value: "13% Cr" }, { label: "Stem", value: "SS 410" }, { label: "End connection", value: "ASME B16.5 RF, Class 150 / 300" }, { label: "Design / test", value: "API 600 / API 598" }, { label: "Face-to-face", value: "ASME B16.10" }, { label: "Operation", value: "Handwheel / gear" }],
    features: ["Straight-through flow when open", "Designed for full isolation", "Manual or gear operation"],
  },
  "gate-valve-forged-steel-800-1500-2500": {
    intro: "Forged-steel gate valve for high-pressure isolation in process, steam and utility lines.",
    specs: [{ label: "Size", value: "15–50 mm" }, { label: "Class", value: "800 / 1500 / 2500" }, { label: "Body / bonnet", value: "A105 / F304 / F316 forged steel" }, { label: "Trim", value: "SS 410" }, { label: "End connection", value: "Threaded / socket weld / butt weld" }, { label: "Design / test", value: "API 602 / API 598" }, { label: "Pressure / temperature", value: "ASME B16.34" }, { label: "Operation", value: "Handwheel" }],
    features: ["Forged body for severe pressure service", "Straight-through gate flow path", "Threaded, socket-weld or butt-weld ends"],
  },
  "ci-sluice-gate-valve": {
    intro: "CI sluice gate valve for large water lines, irrigation and wastewater flow isolation.",
    specs: [{ label: "Body / bonnet", value: "Cast iron / ductile iron" }, { label: "Stuffing box / gland", value: "Cast iron / ductile iron" }, { label: "Wedge", value: "Cast iron / ductile iron" }, { label: "Wedge and body ring", value: "13% Cr" }, { label: "Drilling", value: "IS 1538" }, { label: "Pressure rating", value: "PN 1.6" }],
    features: ["Rising gate for water flow isolation", "Cast or ductile iron construction", "Drilling to IS 1538"],
    applications: ["Water supply", "Irrigation", "Wastewater", "Channels and reservoirs"],
  },
  "asa-globe-valve-150-300": {
    intro: "GLV pattern globe valve for throttling and flow regulation, with handwheel or gear operation.",
    specs: [{ label: "Model", value: "GLV" }, { label: "Size", value: "25–300 mm" }, { label: "Class", value: "150 / 300" }, { label: "Body / bonnet", value: "WCB / CF8 / CF8M" }, { label: "Trim", value: "13% Cr" }, { label: "Stem", value: "SS 410" }, { label: "Design / test", value: "BS 1873 / BS 6755 Part I" }, { label: "Temperature / pressure", value: "ASME B16.34" }, { label: "End connection", value: "ASME B16.5 flanged, Class 150 / 300" }],
    features: ["Linear plug movement for flow regulation", "Handwheel or gear operated", "Soft or metal seating options"],
  },
  "globe-valve-forged-steel-800-1500-2500": {
    intro: "Forged-steel globe valve for high-pressure throttling and steam service; the source page lists the same forged valve range data as the gate valve section.",
    note: "The original globe page labels its forged-steel specification table as a gate valve. Confirm these model specifications with Regent before publishing or ordering.",
    specs: [{ label: "Size", value: "15–50 mm" }, { label: "Class", value: "800 / 1500 / 2500" }, { label: "Body / bonnet", value: "A105 / F304 / F316 forged steel" }, { label: "Stem", value: "SS 410" }, { label: "End connection", value: "Threaded / socket weld / butt weld" }, { label: "Design / test", value: "API 602 / API 598" }, { label: "Pressure / temperature", value: "ASME B16.34" }, { label: "Operation", value: "Handwheel" }],
    features: ["Forged construction", "Linear throttling action", "Options for high-pressure steam and process systems"],
  },
  "din-globe-valve": {
    intro: "DIN-pattern globe valve for precise flow regulation in metric pipework.",
    specs: [{ label: "Size", value: "25–300 mm" }, { label: "Body / bonnet", value: "WCB / CF8 / CF8M" }, { label: "Trim", value: "13% Cr" }, { label: "Stem", value: "SS 410" }, { label: "End connection", value: "DIN 2545 flanges, PN 40" }, { label: "Face-to-face", value: "DIN 3202 Part 1" }, { label: "Design standard", value: "BS 1873 / DIN 3356" }, { label: "Test standard", value: "BS 6755 Part 1" }, { label: "Working pressure", value: "PN 16 / PN 25 / PN 40" }, { label: "Operation", value: "Handwheel / gear" }],
    features: ["DIN flange and face-to-face dimensions", "Handwheel or gear operation", "Flow throttling for process lines"],
  },
  "lift-check-valve-forged-steel-800-1500-2500": {
    intro: "Self-operating forged-steel lift check valve that closes against reverse flow in high-pressure lines.",
    specs: [{ label: "Size", value: "15–50 mm" }, { label: "Class", value: "800 / 1500 / 2500" }, { label: "Body / bonnet", value: "A105 / F304 / F316 forged steel" }, { label: "Operation", value: "Self-acting" }, { label: "End connection", value: "Screwed / socket weld / butt weld" }, { label: "Design / test", value: "API 602 / API 598" }, { label: "Pressure / temperature", value: "ASME B16.34" }],
    features: ["Automatic reverse-flow closure", "Lift disc design", "Forged-steel pressure boundary"],
  },
  "wafer-type-check-valve": {
    intro: "Compact wafer check valve for backflow prevention between flanges.",
    specs: [{ label: "Size", value: "25–600 mm" }, { label: "Design / face-to-face", value: "API 6D / API 594" }, { label: "Inspection / test", value: "BS 6755 Part 1" }, { label: "Body and disc", value: "CI / MS / WCB / SS 304 / SS 316 / SS 317L" }, { label: "Body seal / O-ring", value: "Nitrile / EPDM" }, { label: "End connection", value: "Wafer to BS 10 Table E / PN 10 / ASME B16.5 Class 150" }],
    features: ["Wafer body saves installation space", "Automatic backflow protection", "Flexible horizontal or vertical installation"],
  },
  "non-slam-disc-check-valve": {
    intro: "Spring-assisted non-slam disc check valve designed to control closure and reduce water hammer.",
    specs: [{ label: "Size", value: "15–300 mm" }, { label: "Body / disc", value: "CF8 / CF8M" }, { label: "Seat", value: "Metal to metal; PTFE / EPDM on request" }, { label: "Temperature", value: "Maximum 300°C" }, { label: "Pressure", value: "PN 20 / PN 40" }, { label: "End connection", value: "Screwed end / wafer type" }],
    features: ["Controlled disc closure reduces slam", "Designed to minimize surge pressure", "Compact installation profile"],
  },
  "dual-plate-check-valve": {
    intro: "Wafer-type dual-plate check valve with spring-assisted plates for quick reverse-flow closure.",
    specs: [{ label: "Size", value: "50–600 mm" }, { label: "Design / test", value: "API 6D / API 6D or API 598" }, { label: "Body", value: "Cast iron / cast steel / CF8 / CF8M" }, { label: "Disc plates", value: "ASTM A351 CF8 / CF8M" }, { label: "Spring", value: "Stainless steel" }, { label: "Seat", value: "Nitrile" }, { label: "End connection", value: "Wafer to ANSI B16.5 Class 150" }],
    features: ["Two-plate compact design", "Rapid closure helps reduce water hammer", "Low pressure drop"],
  },
  "swing-check-valve-150-300": {
    intro: "Swing-disc check valve for automatic one-way flow and dependable backflow prevention.",
    specs: [{ label: "Size", value: "25–300 mm" }, { label: "Class", value: "150 / 300" }, { label: "Body / bonnet", value: "ASTM A216 WCB / CF8 / CF8M" }, { label: "Trim", value: "13% Cr" }, { label: "Stem", value: "SS 410" }, { label: "End connection", value: "ASME B16.5 RF flanged, Class 150 / 300" }, { label: "Design / face-to-face", value: "BS 1868 / API 6D / ASME B16.10" }, { label: "Inspection / test", value: "BS 6755 Part 1" }],
    features: ["Hinged disc operates automatically", "Low flow resistance", "No external actuation required"],
  },
  "butterfly-control-valve": {
    intro: "Rubber-lined wafer butterfly control valve with centric disc, replaceable liner and actuator accessories.",
    specs: [{ label: "Size", value: "1–32 in" }, { label: "Body", value: "SG iron / cast iron / WCB / CF8 / CF8M" }, { label: "Disc", value: "WCB / CF8 / CF8M" }, { label: "Seat", value: "EPDM / PTFE" }, { label: "Temperature", value: "−20 to 80°C for EPDM; higher temperature on request" }, { label: "Pressure", value: "PN 6 / PN 10 / PN 16" }, { label: "End connection", value: "Wafer to Table D/E, IS 6392 Table 11" }, { label: "Shaft", value: "AISI 410 / 304 / 316" }],
    features: ["Concentric disc with replaceable liner", "Tight shut-off", "Accessories include positioner, solenoid and limit switch options"],
  },
  "ball-control-valve": {
    intro: "Pneumatic three-piece floating ball valve for automated on-off or control duties.",
    specs: [{ label: "Size", value: "½–4 in screwed; ½–8 in flanged" }, { label: "Body", value: "ASTM A216 WCB / ASTM A351 CF8 / CF8M" }, { label: "Ball", value: "ASTM A351 CF8 / CF8M" }, { label: "Ends", value: "BSP / NPT screwed; flanged Class 150 / 300" }, { label: "Leakage", value: "Class VI" }, { label: "Seals", value: "PTFE / GFT" }, { label: "Temperature", value: "PTFE up to 180°C; GFT up to 230°C" }, { label: "Design standard", value: "ASME B16.34 / BS EN ISO 17292" }, { label: "Media", value: "Air / water / oil / gas / chemicals" }],
    features: ["Three-piece floating ball construction", "Pneumatic actuation and control accessories available", "Class VI shut-off"],
  },
  "v-notch-ball-control-valve": {
    intro: "V-port flanged ball control valve for modulating flow; the V-shaped port is suited to accurate flow-rate control.",
    specs: [{ label: "Size", value: "25–250 mm" }, { label: "Body / ball", value: "SS 304 / SS 316" }, { label: "Temperature", value: "PTFE up to 180°C; reinforced PTFE up to 200°C" }, { label: "Working pressure", value: "Up to 10 kg/cm²" }, { label: "Design standard", value: "BS EN ISO 17292" }, { label: "Flange standard", value: "ASME B16.5 Class 150" }, { label: "Leakage", value: "Class IV" }, { label: "Media", value: "Air / water / oil / gas" }],
    features: ["V-port ball for modulating service", "Compact alternative to globe valves in smaller sizes", "Pneumatic accessories available"],
  },
  "2-way-globe-control-valve-150-300": {
    intro: "Two-way globe control valve for accurate throttling with actuator and positioner accessories.",
    specs: [{ label: "Size", value: "25–300 mm" }, { label: "Temperature", value: "Up to 220°C maximum" }, { label: "Shut-off", value: "Tight shut-off, leakage Class VI" }, { label: "Body", value: "WCB / CF8 / CF8M" }, { label: "Stem / plug", value: "SS 304 / SS 316" }, { label: "Seat", value: "PTFE / CFT / GFT" }, { label: "Pressure class", value: "150 / 300" }, { label: "Design / test", value: "BS 6697 / FCI 70-2" }, { label: "Face-to-face", value: "ISA 75.03 / IEC 534-3" }],
    features: ["Precise regulation with high flow capacity", "In-line repairable design", "Actuator options for direct or reverse action"],
  },
  "knife-gate-valve-s-series": {
    intro: "S Series unidirectional wafer knife gate valve for general industrial isolation, built to MSS SP-81.",
    specs: [{ label: "Model", value: "S Series" }, { label: "Size", value: "25–800 mm" }, { label: "Operation", value: "Handwheel / pneumatic / electric / control" }, { label: "Body / gland", value: "SS 304 / SS 316 / SS 316L / SS 317L" }, { label: "Gate", value: "SS 304 / SS 316 / SS 316L / SS 317L" }, { label: "Seat", value: "Integral SS 304 / EPDM" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }, { label: "Pneumatic actuator", value: "Up to 6.3 bar supply; 85°C maximum" }],
    features: ["Unidirectional wafer design", "Non-clogging shut-off on suspended solids", "Soft-seated or metal-seated options"],
  },
  "knife-gate-valve-k-series": {
    intro: "K Series unidirectional lug knife gate valve with stainless-clad wetted surfaces for abrasive and corrosive service; designed to MSS SP-81.",
    specs: [{ label: "Model", value: "K Series" }, { label: "Size", value: "25–800 mm" }, { label: "Operation", value: "Handwheel / gear / pneumatic / electric / control" }, { label: "Body wetted parts", value: "SS 304 cladding" }, { label: "Gate / seat", value: "SS 304 / SS 316 / SS 316L" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Flanged, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }, { label: "Pneumatic actuator", value: "Up to 6.3 bar supply; 85°C maximum" }],
    features: ["Lug body and metal seat", "Stainless-clad wetted surfaces", "Designed for slurry and suspended solids"],
  },
  "bi-directional-knife-gate-valve": {
    intro: "RB Series soft-seated bi-directional wafer knife gate valve for isolation where flow may approach from either direction.",
    specs: [{ label: "Model", value: "RB Series" }, { label: "Size", value: "25–800 mm" }, { label: "Body / gland", value: "CI / CS / SS 304 / SS 316 / SS 316L / SS 317L" }, { label: "Gate", value: "SS 304 / SS 316 / SS 316L / SS 317L" }, { label: "Seat", value: "Natural rubber / EPDM" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }, { label: "Pneumatic actuator", value: "Up to 6.3 bar supply; 85°C maximum" }],
    features: ["Bidirectional shut-off", "Soft seat for slurry and wastewater", "Manual or pneumatic operation"],
  },
  "knife-gate-valve-deflection-cone": {
    intro: "RM Series metal-seated knife gate valve with a deflection cone to guide abrasive media away from vulnerable wear surfaces.",
    specs: [{ label: "Model", value: "RM Series" }, { label: "Size", value: "50–800 mm" }, { label: "Body / gland", value: "CI / CS / CF8 / CF8M / CF3M" }, { label: "Gate", value: "SS 304 / SS 316 / SS 316L / SS 317L" }, { label: "Seat", value: "Integral with body / SS O-ring" }, { label: "Deflection cone", value: "Ni-Hard / stainless steel" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }],
    features: ["Metal-to-metal sealing", "Wear-resistant deflection cone", "Handwheel / gear / pneumatic operation"],
  },
  "knife-gate-valve-v-notch-type": {
    intro: "RK Series V-notch knife gate valve for controlled modulation as well as isolation of solids-laden process media.",
    specs: [{ label: "Model", value: "RK Series" }, { label: "Size", value: "50–800 mm" }, { label: "Body / gland", value: "CI / CS / CF8 / CF8M / CF3M" }, { label: "Gate / V-notch plate", value: "SS 304 / SS 316 / SS 316L" }, { label: "Seat", value: "SS 304 / SS 316 / SS 316L" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }, { label: "Actuator", value: "Handwheel; pneumatic actuator options listed by manufacturer" }],
    features: ["V-notch gate supports flow regulation", "Metal-to-metal design", "Suitable for fibrous and slurry media"],
  },
  "knife-gate-valve-hand-lever-operated": {
    intro: "RM Series hand-lever knife gate valve in a compact range for manual isolation.",
    specs: [{ label: "Model", value: "RM Series" }, { label: "Size", value: "40–200 mm" }, { label: "Body", value: "Cast iron IS 210 FG260 / WCB ASTM A216" }, { label: "Gate", value: "SS 304 / SS 316 / SS 316L" }, { label: "Seat", value: "Integral with body / SS O-ring" }, { label: "Working pressure", value: "Up to 10 bar" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }, { label: "Operation", value: "Hand lever" }],
    features: ["Manual hand-lever operation", "Metal or soft seat configurations", "Compact line isolation"],
  },
  "knife-gate-valve-m-series": {
    intro: "M Series unidirectional knife gate valve for slurry and heavy industrial isolation, designed to MSS SP-81.",
    specs: [{ label: "Model", value: "M Series" }, { label: "Size", value: "40–800 mm" }, { label: "Operation", value: "Handwheel / gear / pneumatic / electric / control" }, { label: "Body", value: "Cast iron IS 210 FG260 / ASTM A216 WCB" }, { label: "Gate", value: "SS 304 / SS 316 / SS 316L" }, { label: "Seat", value: "Integral with body / EPDM" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }, { label: "Pneumatic actuator", value: "Up to 6.3 bar supply; 85°C maximum" }],
    features: ["Unidirectional, single-piece body", "Metal-to-metal or soft seat", "Designed for pulp, ash, sludge and bulk solids"],
  },
  "knife-gate-valve-lug-type": {
    intro: "Lug-style S Series knife gate valve for mounting and servicing within industrial pipeline systems.",
    specs: [{ label: "Model", value: "S Series lug type" }, { label: "Size", value: "25–800 mm" }, { label: "Operation", value: "Handwheel / pneumatic / electric / control" }, { label: "Body / gland", value: "SS 304 / SS 316 / SS 316L / SS 317L" }, { label: "Gate", value: "SS 304 / SS 316 / SS 316L / SS 317L" }, { label: "Seat", value: "Integral SS 304 / EPDM" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }],
    features: ["Lug body simplifies installation", "Unidirectional wafer pattern", "Seat designed to avoid clogging on suspended solids"],
  },
  "through-conduit-knife-gate-valve": {
    intro: "RT Series through-conduit wafer knife gate valve for high-consistency media. Its double-seat construction is designed to seal without clogging in either flow direction.",
    specs: [{ label: "Model", value: "RT Series" }, { label: "Size", value: "50–600 mm" }, { label: "Operation", value: "Handwheel / pneumatic" }, { label: "Body / gland", value: "Cast iron / cast steel / CF8 / CF8M" }, { label: "Gate", value: "AISI 304 / AISI 316" }, { label: "Seat", value: "Integral with body" }, { label: "Working pressure", value: "10 bar (2–10 in); 6 bar (12–16 in); 5 bar (18 in); 4 bar (20–24 in)" }, { label: "End connection", value: "Lug, BS 10 Table E/D, PN 10, ASME B16.5 Class 150" }, { label: "Pneumatic actuator", value: "Up to 6.3 bar supply; 85°C maximum" }],
    features: ["O-port through-conduit flow path", "Double seat for forward or reverse flow", "Designed for high-consistency solids-bearing media"],
    applications: ["Pulp and paper", "Wastewater treatment", "Power plants", "Chemical plants"],
  },
  "pfa-lined-flanged-ball-valve-150": {
    intro: "PFA-lined flanged ball valve, model BVPFA, for aggressive chemical service.",
    specs: [{ label: "Model", value: "BVPFA" }, { label: "Size", value: "25–200 mm" }, { label: "Body", value: "WCB / CF8 / CF8M / CF3M" }, { label: "Ball and shaft", value: "WCB / SS 304" }, { label: "Seal", value: "PTFE / GFT" }, { label: "Temperature", value: "Up to 180–230°C" }, { label: "Pressure", value: "Class 150" }, { label: "End connection", value: "ASME B16.5 RF flanged, Class 150" }, { label: "Operation", value: "Lever / gear / pneumatic" }],
    features: ["PFA lining for corrosive media", "Full-port design", "Tight shut-off with manual or automated operation"],
    applications: ["Chemical processing", "Pharmaceuticals", "Water treatment", "Food and beverage", "Pulp and paper"],
  },
  "pulp-valve": {
    intro: "Pulp-process valve solutions for fiber-rich stock, abrasive slurry and chemical dosing services. The source lists knife gate, pinch and specially surfaced plug-valve constructions, selected to suit the process duty.",
    specs: [{ label: "Valve types", value: "Knife gate / pinch / surfaced plug" }, { label: "Media", value: "Pulp stock and high-consistency fiber fluids" }, { label: "Actuation", value: "Manual or automated, as configured" }, { label: "Service design", value: "Anti-clogging and abrasion-resistant options" }],
    features: ["Designed for heavy slurry and fiber-rich media", "Options for bleaching chemicals and black liquor services", "Custom configurations for pulping, screening and refining"],
    applications: ["Pulp stock handling", "Bleaching and chemical dosing", "Black liquor recovery", "Paper machine water", "Refining and screening"],
  },
  "ibr-valve": {
    intro: "IBR-compliant boiler and steam valve range, with certified inspection and stamping as specified for the installation.",
    specs: [{ label: "Range", value: "Gate / globe / check / blowdown / stop valves" }, { label: "Pressure range", value: "PN 16–PN 64" }, { label: "Temperature", value: "Up to 600°C, subject to the selected valve and material" }, { label: "Materials", value: "Carbon steel / alloy steel / stainless steel" }, { label: "Compliance", value: "IBR inspection, stamping and documentation" }, { label: "Testing", value: "Hydrostatic testing and material traceability stated by the manufacturer" }],
    features: ["IBR inspection and stamping", "Material traceability and supporting documentation", "For boiler, steam and high-pressure service"],
    applications: ["Power plants", "Boilers", "Refineries", "Petrochemical plants", "Chemical process lines"],
  },
  "forged-steel-valve": {
    intro: "Forged steel gate, globe and check valve range for pressure and temperature duties where strength and low porosity are required.",
    specs: [{ label: "Valve types", value: "Gate / globe / check" }, { label: "Materials", value: "ASTM A105 / A182 F11 / F22 / F304 / F316" }, { label: "Pressure classes", value: "800#–2500#, by valve type" }, { label: "End connections", value: "Socket weld / threaded / butt weld" }, { label: "Standards", value: "API / ANSI / BS, according to configuration" }],
    features: ["Forged construction for high-pressure service", "Material choices for mechanical strength and corrosion resistance", "Custom end connections available"],
    applications: ["Oil and gas", "Power generation", "Chemical and petrochemical plants", "Marine", "Food and pharmaceutical services"],
  },
  "steam-valve": {
    intro: "Steam-service valve range for controlled flow and isolation under high temperature, pressure and cyclic thermal loading.",
    specs: [{ label: "Valve types", value: "Gate / globe / check and related steam valves" }, { label: "Service", value: "High-temperature steam and condensate" }, { label: "Standards", value: "API / ANSI / DIN, by selected design" }, { label: "Configuration", value: "Material, pressure class and end connection depend on the selected valve" }],
    features: ["Designed for steam pressure and thermal cycling", "Tight shut-off and control options across the range", "Material and end-connection options by duty"],
    applications: ["Power generation", "Chemical and petroleum plants", "Paper and textile", "Food and pharma", "HVAC utilities"],
  },
};

export function productDetails(product: Product): ProductDetail {
  const category = getCategory(product.category);
  const specific = MODEL_DETAIL[product.slug];
  return {
    intro: specific?.intro ?? product.blurb,
    features: specific?.features ?? category?.features ?? [],
    applications: specific?.applications ?? category?.applications ?? [],
    specs: specific?.specs ?? [
      { label: "Product", value: product.name },
      ...(product.classes.length ? [{ label: "Pressure class", value: product.classes.join(" / ") }] : []),
      ...(category?.specs ?? []),
    ],
    specsAreFamilyLevel: !specific,
    note: specific?.note,
  };
}
