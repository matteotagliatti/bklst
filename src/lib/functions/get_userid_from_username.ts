import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";

export default async function get_userid_from_username(
  supabase: SupabaseClient,
  username: string
) {
  const { data, error } = await supabase
    .from("users")
    .select()
    .eq("username", username)
    .single();

  if (error) {
    throw redirect(302, "/");
  }

  return data?.id as string;
}
