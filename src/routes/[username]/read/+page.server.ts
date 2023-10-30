import get_username from "$lib/functions/get_username";
import type { Book } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  params: { username },
  locals: { supabase, getSession },
}) => {
  const session = await getSession();

  const user_id = await get_username(supabase, session, username);

  const { data } = await supabase
    .from("books")
    .select()
    .eq("owner", session ? session.user.id : user_id)
    .eq("status", "read")
    .order("updated_at", { ascending: false });

  const books = data as Book[];
  return { books };
};
