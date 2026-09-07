"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { CREATOR_STATUSES, type CreatorStatus } from "@/lib/constants";
import { getAdminSession } from "@/lib/auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CreatorUpdate } from "@/lib/types/database";

function isStatus(value: unknown): value is CreatorStatus {
  return (
    typeof value === "string" && (CREATOR_STATUSES as readonly string[]).includes(value)
  );
}

/** Every admin action re-checks the session — the UI is not the security boundary. */
async function requireAdmin() {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");
  return session;
}

export async function updateCreatorStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = formData.get("status");

  if (!id || !isStatus(status)) return;

  const patch: CreatorUpdate = { status, reviewed_at: new Date().toISOString() };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("creators").update(patch).eq("id", id);

  if (error) {
    console.error("[admin] status update failed", error);
    return;
  }

  revalidatePath("/admin");
  revalidatePath(`/admin/creators/${id}`);
}

export async function updateCreatorNotes(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const notes = String(formData.get("admin_notes") ?? "").trim();

  if (!id) return;

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("creators")
    .update({ admin_notes: notes || null })
    .eq("id", id);

  if (error) {
    console.error("[admin] notes update failed", error);
    return;
  }

  revalidatePath(`/admin/creators/${id}`);
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
