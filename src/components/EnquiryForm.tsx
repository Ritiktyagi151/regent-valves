"use client";

import { useActionState } from "react";
import { submitEnquiry, type EnquiryState } from "@/app/actions";
import { CATEGORIES, PRODUCTS } from "@/data/catalog";
import { INDUSTRIES } from "@/data/content";
import { ArrowRight, Check } from "./Icons";

const initial: EnquiryState = { ok: false };

function Field({ label, error, children, required }: { label: string; error?: string; children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.8rem] font-semibold text-navy">
        {label}
        {required && <span className="text-signal"> *</span>}
      </span>
      {children}
      {error && (
        <span role="alert" className="mt-1 block text-xs font-medium text-signal">
          {error}
        </span>
      )}
    </label>
  );
}

export default function EnquiryForm({
  defaultProduct = "",
  defaultIndustry = "",
  source = "website",
  dark = false,
  compact = false,
}: {
  defaultProduct?: string;
  defaultIndustry?: string;
  source?: string;
  dark?: boolean;
  compact?: boolean;
}) {
  const [state, action, pending] = useActionState(submitEnquiry, initial);
  const v = state.values ?? {};
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div className={`rounded-2xl p-8 text-center ${dark ? "bg-white" : "bg-brand-50"}`} role="status">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-500 text-3xl text-white">
          <Check />
        </span>
        <h3 className="mt-5 font-display text-3xl font-extrabold uppercase text-navy">Enquiry received</h3>
        <p className="mx-auto mt-2 max-w-sm text-sm text-steel">{state.message}</p>
        {state.ref && (
          <p className="mt-5 inline-block rounded-lg border border-dashed border-brand/40 bg-white px-4 py-2 text-sm">
            Your reference: <strong className="font-mono text-navy">{state.ref}</strong>
          </p>
        )}
        <p className="mt-5 text-xs text-steel">Need it urgently? Call +91 98110 99567.</p>
      </div>
    );
  }

  return (
    <form action={action} className={`${compact ? "enquiry-compact p-3 sm:p-4 lg:p-5" : "p-6 sm:p-8 lg:p-10"} ${dark ? "bg-white text-ink" : "border border-line bg-white"}`} noValidate>
      <input type="hidden" name="source" value={source} />
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className={`grid sm:grid-cols-2 ${compact ? "gap-3" : "gap-4"}`}>
        <Field label="Full name" required error={e.name}>
          <input className="field" name="name" autoComplete="name" defaultValue={v.name} aria-invalid={!!e.name} />
        </Field>
        <Field label="Company">
          <input className="field" name="company" autoComplete="organization" defaultValue={v.company} />
        </Field>
        <Field label="Email" required error={e.email}>
          <input className="field" type="email" name="email" autoComplete="email" defaultValue={v.email} aria-invalid={!!e.email} />
        </Field>
        <Field label="Phone / WhatsApp" error={e.phone}>
          <input className="field" type="tel" name="phone" autoComplete="tel" defaultValue={v.phone} aria-invalid={!!e.phone} />
        </Field>
        <Field label="Valve of interest">
          <select className="field" name="product" defaultValue={v.product ?? defaultProduct}>
            <option value="">Not sure yet / multiple</option>
            {CATEGORIES.map((c) => (
              <optgroup key={c.slug} label={c.name}>
                {PRODUCTS.filter((p) => p.category === c.slug).map((p) => (
                  <option key={p.slug} value={p.name}>
                    {p.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </Field>
        <Field label="Industry">
          <select className="field" name="industry" defaultValue={v.industry ?? defaultIndustry}>
            <option value="">Select industry</option>
            {INDUSTRIES.map((i) => (
              <option key={i.slug} value={i.name}>
                {i.name}
              </option>
            ))}
            <option value="Other">Other</option>
          </select>
        </Field>
        <Field label="Country">
          <input className="field" name="country" autoComplete="country-name" defaultValue={v.country} placeholder="India" />
        </Field>
        <Field label="Size / quantity">
          <input className="field" name="quantity" defaultValue={v.quantity} placeholder="e.g. DN200, 10 nos." />
        </Field>
      </div>

      <div className={compact ? "mt-3" : "mt-4"}>
        <Field label="Requirement details" required error={e.message}>
          <textarea
            className={`field resize-y ${compact ? "min-h-[72px]" : "min-h-[120px]"}`}
            name="message"
            defaultValue={v.message}
            placeholder="Media, pressure class, temperature, actuation, standards, delivery timeline…"
            aria-invalid={!!e.message}
          />
        </Field>
      </div>

      {state.message && !state.ok && (
        <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-signal-dark">
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} className={`btn btn-primary w-full disabled:opacity-60 ${compact ? "mt-4 !py-3" : "mt-6 !py-3.5"}`}>
        {pending ? "Sending…" : "Send enquiry"} {!pending && <ArrowRight />}
      </button>
      <p className="mt-3 text-center text-xs text-steel">Your details are only used to respond to your enquiry.</p>
    </form>
  );
}
