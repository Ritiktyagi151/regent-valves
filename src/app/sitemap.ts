import type { MetadataRoute } from "next";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPaths = ["", "/products", "/industries", "/manufacturing", "/about", "/gallery", "/contact"];
  return [
    ...staticPaths.map((p) => ({
      url: `${SITE.url}${p}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : 0.8,
    })),
    ...CATEGORIES.map((c) => ({
      url: `${SITE.url}/products/${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...PRODUCTS.map((product) => ({
      url: `${SITE.url}/products/${product.category}/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
