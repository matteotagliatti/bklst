import type { Database } from "$lib/types/supabase";
import type { SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";

export default async function get_userid_from_username(
  supabase: SupabaseClient<Database>,
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
