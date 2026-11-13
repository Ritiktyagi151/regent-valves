import { isAdmin } from "@/lib/auth";
import { listEnquiries } from "@/lib/enquiries";

export const dynamic = "force-dynamic";

function csv(value: unknown) {
  const s = value === null || value === undefined ? "" : String(value);
  const safe = /^[=+\-@]/.test(s) ? `'${s}` : s; // neutralise spreadsheet formulas
  return `"${safe.replace(/"/g, '""')}"`;
}

export async function GET() {
  if (!(await isAdmin())) {
    return new Response("Unauthorized", { status: 401 });
  }
  const rows = await listEnquiries();
  const header = ["Reference", "Created", "Status", "Name", "Company", "Email", "Phone", "Country", "Valve", "Industry", "Size/Qty", "Message", "Source"];
  const lines = rows.map((r) =>
    [r.ref, r.createdAt.toISOString(), r.status, r.name, r.company, r.email, r.phone, r.country, r.product, r.industry, r.quantity, r.message, r.source].map(csv).join(","),
  );
  const body = [header.map(csv).join(","), ...lines].join("\r\n");
  return new Response(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="regent-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
