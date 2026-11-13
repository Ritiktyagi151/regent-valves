"use client";

import type { FormEvent } from "react";
import { SITE } from "@/lib/site";
import { ArrowRight } from "./Icons";

export default function CareerForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const role = String(form.get("role") ?? "");
    const resume = String(form.get("resume") ?? "");
    const message = String(form.get("message") ?? "");
    const body = [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone}`, `Area of interest: ${role}`, `Resume / profile link: ${resume}`, "", "About the applicant:", message].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(`Career enquiry - ${name}`)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 border border-line bg-white p-5 sm:grid-cols-2 sm:p-7">
      <label className="block text-sm font-semibold text-navy">Full name *<input className="field mt-1.5" name="name" autoComplete="name" required /></label>
      <label className="block text-sm font-semibold text-navy">Email address *<input className="field mt-1.5" type="email" name="email" autoComplete="email" required /></label>
      <label className="block text-sm font-semibold text-navy">Phone number<input className="field mt-1.5" type="tel" name="phone" autoComplete="tel" /></label>
      <label className="block text-sm font-semibold text-navy">Area of interest *
        <select className="field mt-1.5" name="role" required defaultValue="">
          <option value="" disabled>Select an area</option>
          <option>Engineering</option><option>Production</option><option>Quality</option><option>Sales</option><option>Other</option>
        </select>
      </label>
      <label className="block text-sm font-semibold text-navy sm:col-span-2">Resume or profile link<input className="field mt-1.5" type="url" name="resume" placeholder="https://" /></label>
      <label className="block text-sm font-semibold text-navy sm:col-span-2">A short introduction *<textarea className="field mt-1.5 min-h-28 resize-y" name="message" required minLength={10} placeholder="Tell us about your experience and the role you are looking for." /></label>
      <div className="sm:col-span-2">
        <button type="submit" className="btn btn-primary">Prepare application email <ArrowRight /></button>
        <p className="mt-3 text-xs leading-relaxed text-steel">Your email app will open with these details. Attach your resume before sending.</p>
      </div>
    </form>
  );
}
