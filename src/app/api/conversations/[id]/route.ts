import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

type Ctx = { params: Promise<{ id: string }> };

async function verifyOwnership(conversationId: string, userId: string) {
  const { data, error } = await supabaseAdmin
    .from("conversations")
    .select("id")
    .eq("id", conversationId)
    .eq("clerk_user_id", userId)
    .maybeSingle();
  if (error) return { ok: false as const, status: 500, detail: error.message };
  if (!data) return { ok: false as const, status: 404 };
  return { ok: true as const };
}

export async function GET(_req: Request, ctx: Ctx) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const own = await verifyOwnership(id, userId);
  if (!own.ok) {
    return Response.json(
      { error: own.status === 404 ? "Not found" : "Server error" },
      { status: own.status }
    );
  }
  const { data, error } = await supabaseAdmin
    .from("messages")
    .select("id, role, content, created_at")
    .eq("conversation_id", id)
    .order("created_at", { ascending: true });
  if (error) {
    return Response.json(
      { error: "Failed to load messages", detail: error.message },
      { status: 500 }
    );
  }
  return Response.json({ messages: data ?? [] });
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { userId } = await auth();
  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await ctx.params;
  const own = await verifyOwnership(id, userId);
  if (!own.ok) {
    return Response.json(
      { error: own.status === 404 ? "Not found" : "Server error" },
      { status: own.status }
    );
  }
  const { error } = await supabaseAdmin
    .from("conversations")
    .delete()
    .eq("id", id);
  if (error) {
    return Response.json(
      { error: "Failed to delete", detail: error.message },
      { status: 500 }
    );
  }
  return Response.json({ ok: true });
}
