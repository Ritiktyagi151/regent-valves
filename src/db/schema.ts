import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  ref: text("ref").notNull(),
  name: text("name").notNull(),
  company: text("company"),
  email: text("email").notNull(),
  phone: text("phone"),
  country: text("country"),
  product: text("product"),
  industry: text("industry"),
  quantity: text("quantity"),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"),
  source: text("source").notNull().default("website"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Enquiry = typeof enquiries.$inferSelect;
export type NewEnquiry = typeof enquiries.$inferInsert;
