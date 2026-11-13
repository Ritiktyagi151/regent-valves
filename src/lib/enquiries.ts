import "server-only";
import { desc, eq, sql } from "drizzle-orm";
import { db } from "@/db";
import { enquiries, type Enquiry, type NewEnquiry } from "@/db/schema";

let ready: Promise<void> | null = null;

/** Create the table on first use so the app works on a fresh database. */
export function ensureSchema() {
  if (!ready) {
    ready = db
      .execute(
        sql`CREATE TABLE IF NOT EXISTS enquiries (
          id serial PRIMARY KEY,
          ref text NOT NULL,
          name text NOT NULL,
          company text,
          email text NOT NULL,
          phone text,
          country text,
          product text,
          industry text,
          quantity text,
          message text NOT NULL,
          status text NOT NULL DEFAULT 'new',
          source text NOT NULL DEFAULT 'website',
          created_at timestamptz NOT NULL DEFAULT now()
        )`,
      )
      .then(() => undefined)
      .catch((err) => {
        ready = null;
        throw err;
      });
  }
  return ready;
}

export function makeRef() {
  const d = new Date();
  const stamp = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `RQ-${stamp}-${rand}`;
}

export async function createEnquiry(data: Omit<NewEnquiry, "id" | "createdAt" | "status" | "ref">) {
  await ensureSchema();
  const ref = makeRef();
  await db.insert(enquiries).values({ ...data, ref });
  return ref;
}

export async function listEnquiries(status?: string): Promise<Enquiry[]> {
  await ensureSchema();
  const q = db.select().from(enquiries);
  const rows = status && status !== "all" ? await q.where(eq(enquiries.status, status)).orderBy(desc(enquiries.createdAt)) : await q.orderBy(desc(enquiries.createdAt));
  return rows;
}

export async function setEnquiryStatus(id: number, status: string) {
  await ensureSchema();
  await db.update(enquiries).set({ status }).where(eq(enquiries.id, id));
}

export async function deleteEnquiry(id: number) {
  await ensureSchema();
  await db.delete(enquiries).where(eq(enquiries.id, id));
}

export async function statusCounts() {
  await ensureSchema();
  const rows = await db.execute<{ status: string; count: string }>(sql`SELECT status, count(*)::text AS count FROM enquiries GROUP BY status`);
  const out: Record<string, number> = { all: 0 };
  for (const r of rows.rows) {
    out[r.status] = Number(r.count);
    out.all += Number(r.count);
  }
  return out;
}
