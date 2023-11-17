import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const username = String(url.searchParams.get("username"));
  const status = String(url.searchParams.get("status"));
  const limit = Number(url.searchParams.get("limit") || 10);

  if (!username) {
    throw error(400, "username is required");
  }

  if (!status) {
    throw error(400, "status is required");
  }

  const { data: user, error: user_error } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (user_error) {
    throw error(404, "User not found");
  }

  const { data: books, error: books_error } = await supabase
    .from("books")
    .select()
    .eq("owner", user.id)
    .eq("status", status)
    .order("finished", { ascending: false })
    .limit(limit);

  if (books_error) throw error;

  return new Response(JSON.stringify(books));
};
