export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ ok: true, databaseConfigured: Boolean(process.env.DATABASE_URL) });
}
