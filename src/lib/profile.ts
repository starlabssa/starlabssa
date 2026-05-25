import "server-only";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "./supabase-admin";

export type Profile = {
  id: string;
  clerk_user_id: string;
  email: string | null;
  created_at: string;
};

/**
 * Returns the Supabase profile for the currently signed-in Clerk user,
 * creating it on first sight. Returns null if no one is signed in.
 */
export async function getOrCreateProfile(): Promise<Profile | null> {
  const user = await currentUser();
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress ?? null;

  const { data: existing, error: selectError } = await supabaseAdmin
    .from("profiles")
    .select("*")
    .eq("clerk_user_id", user.id)
    .maybeSingle();

  if (selectError) {
    throw new Error(`Supabase select failed: ${selectError.message}`);
  }
  if (existing) return existing as Profile;

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from("profiles")
    .insert({ clerk_user_id: user.id, email })
    .select("*")
    .single();

  if (insertError) {
    throw new Error(`Supabase insert failed: ${insertError.message}`);
  }
  return inserted as Profile;
}
