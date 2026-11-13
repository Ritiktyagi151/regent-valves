"use server";

import { headers } from "next/headers";
import { createEnquiry } from "@/lib/enquiries";

export type EnquiryState = {
  ok: boolean;
  message?: string;
  ref?: string;
  errors?: Partial<Record<string, string>>;
  values?: Record<string, string>;
};

const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function limited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  return false;
}

const clean = (v: FormDataEntryValue | null, max = 300) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function submitEnquiry(_prev: EnquiryState, formData: FormData): Promise<EnquiryState> {
  const values: Record<string, string> = {
    name: clean(formData.get("name"), 120),
    company: clean(formData.get("company"), 160),
    email: clean(formData.get("email"), 160),
    phone: clean(formData.get("phone"), 40),
    country: clean(formData.get("country"), 80),
    product: clean(formData.get("product"), 200),
    industry: clean(formData.get("industry"), 120),
    quantity: clean(formData.get("quantity"), 120),
    message: clean(formData.get("message"), 3000),
    source: clean(formData.get("source"), 40) || "website",
  };

  // Honeypot: bots fill the hidden field. Pretend success.
  if (clean(formData.get("website"))) {
    return { ok: true, ref: "RQ-RECEIVED", message: "Thank you — we have received your enquiry." };
  }

  const errors: Record<string, string> = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email address.";
  if (values.phone && !/^[+\d][\d\s()-]{6,}$/.test(values.phone)) errors.phone = "Enter a valid phone number.";
  if (values.message.length < 10) errors.message = "Tell us a little more (at least 10 characters).";

  if (Object.keys(errors).length) {
    return { ok: false, errors, values, message: "Please fix the highlighted fields." };
  }

  const h = await headers();
  const ip = (h.get("x-forwarded-for") ?? "local").split(",")[0].trim();
  if (limited(ip)) {
    return { ok: false, values, message: "Too many requests. Please wait a few minutes or call us directly." };
  }

  try {
    const ref = await createEnquiry({
      name: values.name,
      company: values.company || null,
      email: values.email,
      phone: values.phone || null,
      country: values.country || null,
      product: values.product || null,
      industry: values.industry || null,
      quantity: values.quantity || null,
      message: values.message,
      source: values.source,
    });
    return { ok: true, ref, message: "Thank you — our engineering team will respond shortly." };
  } catch (err) {
    console.error("Failed to save enquiry", err);
    return { ok: false, values, message: "We couldn't save your enquiry right now. Please call or email us directly." };
  }
}
