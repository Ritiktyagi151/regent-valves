export const SITE = {
  name: "Regent Hitech Private Limited",
  short: "Regent Valves",
  url: "https://www.regentvalves.com",
  founded: 1999,
  email: "info@regentvalves.com",
  phones: [
    { label: "+91 98110 99567", href: "+919811099567" },
    { label: "+91 99110 33567", href: "+919911033567" },
  ],
  whatsapp: "https://wa.me/919811099567",
  address: {
    line1: "A-6, Sector 59, Near Metro Station",
    line2: "Noida – 201301, Uttar Pradesh, India",
  },
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100082311166476",
    linkedin: "https://www.linkedin.com/in/regent-valves-ba489555/",
    youtube: "https://www.youtube.com/channel/UCZhxWypvWgMSOL6RwKwXbwA",
  },
  mapLink: "https://maps.app.goo.gl/5ThHtB5ENJeiapPq7",
  videoSrc: "/videos/regent-vavles.mp4",
};

export function yearsOfExperience() {
  return new Date().getFullYear() - SITE.founded;
}

export const NAV = [
  { href: "/products", label: "Products", mega: true },
  { href: "/industries", label: "Industries" },
  { href: "/manufacturing", label: "Manufacturing" },
  { href: "/about", label: "About" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
