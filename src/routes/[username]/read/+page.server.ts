import get_userid_from_username from "$lib/functions/get_userid_from_username";
import type { Book } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({
  params: { username },
  locals: { supabase },
}) => {
  const user_id = await get_userid_from_username(supabase, username);

  const { data } = await supabase
    .from("books")
    .select()
    .eq("owner", user_id)
    .eq("status", "read")
    .order("finished", { ascending: false });

  const books = data as Book[];
  return { books };
};
