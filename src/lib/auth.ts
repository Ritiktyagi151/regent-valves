import "server-only";
import crypto from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "regent_admin";

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sha(input: string) {
  return crypto.createHash("sha256").update(input).digest();
}

function sessionToken() {
  return crypto
    .createHmac("sha256", process.env.ADMIN_PASSWORD ?? "")
    .update("regent-admin-session-v1")
    .digest("hex");
}

export function passwordMatches(candidate: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return crypto.timingSafeEqual(sha(candidate), sha(expected));
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  return crypto.timingSafeEqual(sha(value), sha(sessionToken()));
}

export async function startSession(secure: boolean) {
  (await cookies()).set(ADMIN_COOKIE, sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export async function endSession() {
  (await cookies()).delete(ADMIN_COOKIE);
}
