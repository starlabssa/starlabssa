import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .select("id, major, title, created_at, updated_at")
    .eq("clerk_user_id", userId)
    .order("updated_at", { ascending: false });
  if (error) {
    return Response.json(
      { error: "Failed to load conversations", detail: error.message },
      { status: 500 }
    );
  }
  return Response.json({ conversations: data ?? [] });
}
