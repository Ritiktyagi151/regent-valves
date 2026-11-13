"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { endSession, isAdmin, passwordMatches, startSession } from "@/lib/auth";
import { deleteEnquiry, setEnquiryStatus } from "@/lib/enquiries";

export type LoginState = { error?: string };

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) {
    return { error: "Incorrect password." };
  }
  const h = await headers();
  const secure = h.get("x-forwarded-proto") === "https";
  await startSession(secure);
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin");
}

const STATUSES = ["new", "contacted", "quoted", "won", "closed"];

export async function updateStatus(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!Number.isInteger(id) || !STATUSES.includes(status)) return;
  await setEnquiryStatus(id, status);
  revalidatePath("/admin");
}

export async function removeEnquiry(formData: FormData) {
  if (!(await isAdmin())) redirect("/admin");
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await deleteEnquiry(id);
  revalidatePath("/admin");
}
