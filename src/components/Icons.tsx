import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function Svg({ children, ...p }: P) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...p}
    >
      {children}
    </svg>
  );
}

export const ArrowRight = (p: P) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
);
export const ArrowUpRight = (p: P) => (
  <Svg {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Svg>
);
export const Phone = (p: P) => (
  <Svg {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </Svg>
);
export const Mail = (p: P) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);
export const Pin = (p: P) => (
  <Svg {...p}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);
export const Check = (p: P) => (
  <Svg {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const Menu = (p: P) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
);
export const Close = (p: P) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Svg>
);
export const Search = (p: P) => (
  <Svg {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4-4" />
  </Svg>
);
export const Chevron = (p: P) => (
  <Svg {...p}>
    <path d="m6 9 6 6 6-6" />
  </Svg>
);
export const Play = (p: P) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 8 5.5Z" />
  </Svg>
);
export const Shield = (p: P) => (
  <Svg {...p}>
    <path d="M12 3 4.5 6v5.5c0 4.6 3 8.3 7.5 9.5 4.5-1.2 7.5-4.9 7.5-9.5V6L12 3Z" />
    <path d="m9 12 2.2 2.2L15.5 10" />
  </Svg>
);
export const Gear = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
  </Svg>
);
export const Users = (p: P) => (
  <Svg {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5" />
    <path d="M16 5.6a3 3 0 0 1 0 5.8M18 14.8c1.9.6 3 2.2 3 5.2" />
  </Svg>
);
export const Clock = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </Svg>
);
export const Globe = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18" />
  </Svg>
);
export const Factory = (p: P) => (
  <Svg {...p}>
    <path d="M3 21V10l6 3.5V10l6 3.5V6h3l3 .5V21H3Z" />
    <path d="M8 21v-4M13 21v-4M18 21v-4" />
  </Svg>
);
export const Award = (p: P) => (
  <Svg {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="m8.8 13.7-1.6 7 4.8-2.6 4.8 2.6-1.6-7" />
  </Svg>
);
export const Download = (p: P) => (
  <Svg {...p}>
    <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />
  </Svg>
);
export const Whatsapp = (p: P) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.2-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.9-.4-4.2-1.2l-.3-.2-3 .9.9-2.9-.2-.3a8.1 8.1 0 1 1 6.8 3.7Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4.1c1.7.7 2.4.8 3.2.7.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.6-.4Z" />
  </Svg>
);
export const Facebook = (p: P) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M14 8.5V6.8c0-.8.2-1.3 1.4-1.3H17V2.2C16.7 2.2 15.8 2 14.7 2 12.4 2 10.8 3.4 10.8 6v2.5H8.2V12h2.6v10H14V12h2.5l.4-3.5H14Z" />
  </Svg>
);
export const Linkedin = (p: P) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.8h4V21H3V9.8Zm6.5 0h3.8v1.6c.6-1 1.9-1.9 3.8-1.9 4 0 4.7 2.6 4.7 6V21h-4v-4.8c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V21h-4V9.8Z" />
  </Svg>
);
export const Youtube = (p: P) => (
  <Svg {...p} fill="currentColor" stroke="none">
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
  </Svg>
);
export const Wrench = (p: P) => (
  <Svg {...p}>
    <path d="M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 0-2-2Z" />
  </Svg>
);

/* Industry icons */
export const IconPaper = (p: P) => (
  <Svg {...p}>
    <path d="M6 3h9l4 4v14H6V3Z" />
    <path d="M14 3v5h5M9 13h7M9 17h7" />
  </Svg>
);
export const IconPower = (p: P) => (
  <Svg {...p}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
  </Svg>
);
export const IconSugar = (p: P) => (
  <Svg {...p}>
    <path d="M5 20c0-8 5-14 15-16-1 10-7 16-15 16Z" />
    <path d="M5 20 14 11" />
  </Svg>
);
export const IconCement = (p: P) => (
  <Svg {...p}>
    <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
  </Svg>
);
export const IconChemical = (p: P) => (
  <Svg {...p}>
    <path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" />
    <path d="M7.5 15h9" />
  </Svg>
);
export const IconMining = (p: P) => (
  <Svg {...p}>
    <path d="M4 20 12 4l8 16M8 20l4-8 4 8M3 20h18" />
  </Svg>
);
export const IconWater = (p: P) => (
  <Svg {...p}>
    <path d="M12 3s6 6.3 6 11a6 6 0 0 1-12 0c0-4.7 6-11 6-11Z" />
  </Svg>
);
export const IconFood = (p: P) => (
  <Svg {...p}>
    <path d="M7 3v8a2 2 0 0 0 2 2v8M7 3v5M10.5 3v5M4 3v5a3 3 0 0 0 3 3M17 3c-2 2-3 4.5-3 7.5V14h3v7" />
  </Svg>
);
export const IconBoiler = (p: P) => (
  <Svg {...p}>
    <path d="M12 3c1 3 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .2 1.2.8 2 1.6 2.4C10 8.4 10.8 5.5 12 3Z" />
  </Svg>
);
export const IconPharma = (p: P) => (
  <Svg {...p}>
    <rect x="3.5" y="9" width="17" height="6" rx="3" transform="rotate(-35 12 12)" />
    <path d="m9.2 9.6 5.6 4.8" />
  </Svg>
);

export const INDUSTRY_ICONS = {
  paper: IconPaper,
  power: IconPower,
  sugar: IconSugar,
  cement: IconCement,
  chemical: IconChemical,
  mining: IconMining,
  water: IconWater,
  food: IconFood,
  boiler: IconBoiler,
  pharma: IconPharma,
} as const;

export const WHY_ICONS = {
  clock: Clock,
  gear: Gear,
  shield: Shield,
  users: Users,
  factory: Factory,
  globe: Globe,
} as const;
