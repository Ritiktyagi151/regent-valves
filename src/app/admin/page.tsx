import Link from "next/link";
import Logo from "@/components/Logo";
import { adminConfigured, isAdmin } from "@/lib/auth";
import { listEnquiries, statusCounts } from "@/lib/enquiries";
import { logout, removeEnquiry, updateStatus } from "./actions";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

const STATUSES = ["new", "contacted", "quoted", "won", "closed"] as const;
const BADGE: Record<string, string> = {
  new: "bg-signal/10 text-signal-dark",
  contacted: "bg-brand-100 text-brand-dark",
  quoted: "bg-amber-100 text-amber-800",
  won: "bg-emerald-100 text-emerald-800",
  closed: "bg-slate-200 text-slate-700",
};

const fmt = new Intl.DateTimeFormat("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" });

export default async function AdminPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  if (!adminConfigured()) {
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
          <h1 className="font-display text-3xl font-extrabold uppercase text-navy">Admin disabled</h1>
          <p className="mt-3 text-sm text-steel">
            Set the <code className="rounded bg-mist px-1.5 py-0.5">ADMIN_PASSWORD</code> environment variable to enable the enquiries dashboard.
          </p>
        </div>
      </div>
    );
  }

  if (!(await isAdmin())) {
    return (
      <div className="grid min-h-screen place-items-center p-6">
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl">
          <Logo />
          <h1 className="mt-8 font-display text-3xl font-extrabold uppercase text-navy">Enquiries dashboard</h1>
          <p className="mt-1 text-sm text-steel">Staff sign-in required.</p>
          <LoginForm />
          <Link href="/" className="mt-6 block text-center text-sm font-semibold text-brand">
            ← Back to website
          </Link>
        </div>
      </div>
    );
  }

  const sp = await searchParams;
  const filter = sp.status && (STATUSES as readonly string[]).includes(sp.status) ? sp.status : "all";
  const [rows, counts] = await Promise.all([listEnquiries(filter), statusCounts()]);

  return (
    <div>
      <header className="border-b border-line bg-white">
        <div className="container-x flex min-h-[72px] flex-wrap items-center justify-between gap-3 py-3">
          <Link href="/" aria-label="Back to website">
            <Logo />
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <a href="/admin/export" className="btn btn-outline !py-2.5">
              Export CSV
            </a>
            <form action={logout}>
              <button className="btn btn-blue !py-2.5">Sign out</button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-x py-10">
        <h1 className="font-display text-[clamp(2rem,8vw,2.5rem)] font-extrabold uppercase leading-none text-navy">Quote requests</h1>
        <p className="mt-1 text-steel">Enquiries submitted through the website, newest first.</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {(["all", ...STATUSES] as string[]).map((s) => (
            <Link
              key={s}
              href={s === "all" ? "/admin" : `/admin?status=${s}`}
              className={`rounded-full px-4 py-2 text-sm font-bold capitalize transition ${
                filter === s ? "bg-navy text-white" : "bg-white text-navy ring-1 ring-line hover:ring-brand"
              }`}
            >
              {s} <span className="ml-1 opacity-60">{counts[s] ?? 0}</span>
            </Link>
          ))}
        </div>

        {rows.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-line bg-white p-14 text-center">
            <p className="font-display text-2xl font-bold text-navy">No enquiries yet</p>
            <p className="mt-1 text-sm text-steel">New submissions from the website will appear here.</p>
          </div>
        ) : (
          <ul className="mt-8 space-y-4">
            {rows.map((r) => (
              <li key={r.id} className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-sm font-bold text-navy">{r.ref}</span>
                      <span className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${BADGE[r.status] ?? BADGE.closed}`}>{r.status}</span>
                      <span className="text-xs text-steel">{fmt.format(r.createdAt)}</span>
                    </div>
                    <h2 className="mt-2 text-xl font-extrabold text-navy">
                      {r.name}
                      {r.company && <span className="font-medium text-steel"> · {r.company}</span>}
                    </h2>
                    <p className="mt-1 flex flex-wrap gap-x-5 text-sm text-brand-dark">
                      <a href={`mailto:${r.email}`} className="font-semibold hover:underline">{r.email}</a>
                      {r.phone && <a href={`tel:${r.phone}`} className="font-semibold hover:underline">{r.phone}</a>}
                      {r.country && <span className="text-steel">{r.country}</span>}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <form action={updateStatus} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={r.id} />
                      <select name="status" defaultValue={r.status} className="field !w-auto !py-2 text-sm capitalize" aria-label="Status">
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button className="btn btn-blue !px-4 !py-2">Update</button>
                    </form>
                    <form action={removeEnquiry}>
                      <input type="hidden" name="id" value={r.id} />
                      <button className="btn btn-outline !px-4 !py-2 hover:!border-signal hover:!text-signal">Delete</button>
                    </form>
                  </div>
                </div>

                <dl className="mt-4 grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    ["Valve", r.product],
                    ["Industry", r.industry],
                    ["Size / qty", r.quantity],
                    ["Source", r.source],
                  ].map(([k, v]) => (
                    <div key={k as string}>
                      <dt className="text-xs font-bold uppercase tracking-wider text-steel">{k}</dt>
                      <dd className="font-medium text-navy">{v || "—"}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 whitespace-pre-wrap rounded-xl bg-mist p-4 text-sm leading-relaxed text-navy">{r.message}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
