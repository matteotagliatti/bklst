import type { Session, SupabaseClient } from "@supabase/supabase-js";
import { redirect } from "@sveltejs/kit";

export default async function get_username(
  supabase: SupabaseClient,
  session: Session | null,
  username: string
) {
  if (!session) {
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
}
